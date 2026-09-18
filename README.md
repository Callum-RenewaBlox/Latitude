# Ibiza Atlas

A week in Ibiza, on one map. Every place, every bus and boat, every night — day by day — and,
after the trip, the photographs pinned where they were taken.

This is the first edition of a product, not a one-off page. The **engine** (`index.html`) knows
nothing about Ibiza. The **edition** (`data/ibiza.js`) is the whole trip. A new destination is a
new data file; the engine does not change.

## The three phases of one URL

The whole idea is that the customer gets **one link**, and it grows through the trip.

| Phase | When | What the atlas is |
|---|---|---|
| **Plan** | before | The itinerary on a map: places, lines, days, the last bus, the traps. Built from what the customer told us they want. |
| **Live** | during | The same atlas on a phone at a bus stop. Today's day, the next bus, "where am I", tap to call a taxi. |
| **Memory** | after | The plan overlaid with what actually happened. Photographs and clips pin themselves to the map and to the timeline. Shareable with friends by the same link. |

The Plan / Memory toggle is already in the top bar. Memory mode currently renders its empty state —
the structure that photographs will land in — so the shape of phase three is visible before a single
photo exists.

## Running it

It is static HTML. Any web server that can serve a folder will do:

```bash
python -m http.server 8608
```

In the desktop app, `preview_start` with the `ibiza-atlas` launch entry does the same.

## Hosting — and why not Streamlit for this one

The itinerary pages live in a Streamlit app, and that was right for them. It is wrong for this
product, for reasons a customer would feel:

- **Streamlit Community Cloud puts idle apps to sleep.** A friend opening a shared memory link and
  meeting "this app is sleeping — wake it up" is fatal for something meant to be passed around.
- **The page ran inside a `srcdoc` iframe**, which is why deep links had to be smuggled in as a
  query parameter and every outbound link needed `target="_blank"`. Served as a real page,
  `#d03` simply works, sharing works, and pinch-zoom on a phone works.
- Static hosting is instant, free, and takes a custom domain in one step.

**Recommended: GitHub Pages** on this repo (Settings → Pages → deploy from `main`, root). Then a
custom domain such as `atlas.renewablox.com` when the name is settled.

### One thing that will bite: the map-tile key

The CARTO basemap key in `data/ibiza.js` is not secret — it is restricted by a **domain
allow-list**, currently the Streamlit subdomains and `renewablox.com`. Tiles requested from any
other domain come back stamped **"API KEY REQUIRED"** across the image, with HTTP 200, so nothing
looks broken in logs. Before the first public deploy, either add the new host to the allow-list at
carto.com or deploy under `renewablox.com`, which is already allowed. Keep the OpenStreetMap and
CARTO attribution on the map — it is the condition of the free tier.

## The data model

`data/ibiza.js` sets `window.ATLAS = { meta, ROUTES, LINE, P, DAYS, memories }`.

- **`P`** — places. `id: [name, category, lat, lon, note, area]`. Categories: `base beach night eat
  stop port air sight town taxi`.
- **`ROUTES`** — named GPS polylines for every bus, ferry, boat and taxi run.
- **`LINE`** — colour, label, description and dash pattern per line.
- **`DAYS`** — the plan. Each day has a title, a lede, the places it touches, a list of **legs**
  (`t` time · `ph` day|night · `mode` · `line` · `h` heading · `from`/`to` place ids · `geom` ·
  `r` note · `fx` fact chips · optional `alt`/`altgeom`) and any notes (`calls`).
- **`memories`** — phase three. `{id, ts, day, place, lat, lng, type: 'photo'|'video', src,
  thumb, caption}`. `ts` is an ISO datetime. Given `place`, `lat`/`lng` can be omitted.

The places and routes for a destination are reusable across every customer going there. The days
are per customer. That split is the scalable part of the business.

### Adding the photographs (phase three)

Phone photographs carry GPS and a timestamp in their EXIF data. A small ingest script (to come)
reads a folder, resizes, writes thumbnails, and emits the `memories` array — pinned to the nearest
planned place, sorted by time. **No manual tagging.** Dump the camera roll; the atlas assembles the
week.

## Verifying it

The desktop app's browser pane often runs the page **hidden**, which pauses
`requestAnimationFrame` — so animated map fits never complete there, and screenshots time out.
That is the pane, not the page. The engine detects a hidden document and takes the instant path,
so the fit logic can still be proven from the DOM (tile zoom levels change per day). Check real
animation in an ordinary browser tab.

The engine also refuses to fit a map whose container has no size yet (an opening pane, an iframe
laying out, a phone mid-rotation): Leaflet's fit maths divides by the container size and would
produce a NaN centre. The bounds are held and applied the moment the container is measured.
