# Latitude

A trip, on one map.

Every place, every bus and boat, every night — day by day — and, after the trip, the photographs
pinned where they were taken. One link, given before you go, that becomes the memory when you're
back.

Each edition carries the real latitude of where you slept as its mark. Ibiza is **38°58′ N**. The
engine computes it from the edition's base camp; nobody types it.

## What is in this repo

| File | What it is |
|---|---|
| `index.html` | The **engine**. Knows nothing about any destination. Reads `window.ATLAS`. |
| `data/ibiza.js` | The **Ibiza edition**: 78 places, 14 GPS route geometries, 12 lines, eight days. |
| `streamlit_app.py` | A thin host so the page can run on Streamlit Community Cloud. Inlines the edition into the page and renders it full-bleed. |
| `.streamlit/config.toml` | Theme matched to the page's paper, so nothing flashes on load. |

The engine/edition split is the product. A new destination is a new data file; the engine does
not change. Places and routes for a destination are reusable across every customer going there —
the days are per customer.

## The three phases of one URL

| Phase | When | What Latitude is |
|---|---|---|
| **Plan** | before | The itinerary on a map, built from what the customer told us they want: places, lines, days, the last bus, the traps. |
| **Live** | during | The same map on a phone at a bus stop. Today's day, the next bus, where am I. |
| **Memory** | after | The plan overlaid with what actually happened. Photographs and clips pin themselves to the map and the timeline. Shared with friends by the same link. |

Plan / Memory is already in the top bar. Memory mode renders its empty state today — the structure
photographs will land in — so the shape of the third phase exists before a single photo does.

## Running it locally

The product is a static page, so any web server that serves a folder works:

```bash
python -m http.server 8608
```

The Streamlit host, as it will run in the cloud:

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

## Deploying to Streamlit Community Cloud

On [share.streamlit.io](https://share.streamlit.io) → **Create app** → this repo, branch `main`,
main file `streamlit_app.py`. No secrets. Python 3.12 or 3.13 both work.

Two things about running inside Streamlit, both handled in `streamlit_app.py`:

- The page is rendered into a **`srcdoc` iframe**, which cannot fetch a relative file — so the
  edition is inlined into the page before rendering. The engine still references `data/ibiza.js`
  when served as a static page.
- A `srcdoc` frame has no URL of its own, so it cannot see a `#d03` fragment or build a share
  link. Deep links are therefore **`?day=d03`**, read by the host and handed to the page, and the
  host's own URL is handed in for the share button.

**The map tiles need a key**, and it is already in `data/ibiza.js`. It is restricted by a domain
allow-list rather than by secrecy, and `*.streamlit.app` is on that list — so tiles render
correctly on Community Cloud out of the box. Any future custom domain must be added at carto.com
first, or tiles come back stamped *"API KEY REQUIRED"* with an HTTP 200, so nothing looks broken
in logs. Keep the OpenStreetMap and CARTO attribution on the map: it is the condition of the free
tier.

**Known limitation of Community Cloud:** idle apps are put to sleep and show a "wake up" screen
to the next visitor. Fine for now; worth revisiting before memory links are shared widely, since
the same static files can be hosted anywhere.

## The data model

`data/ibiza.js` sets `window.ATLAS = { meta, ROUTES, LINE, P, DAYS, memories }`.

- **`meta`** — `product`, `edition`, `dates`, `centre`, `zoom`, `base` (a place id; its latitude
  becomes the edition mark), `tilesKey`. Optional `latitude` overrides the computed mark.
- **`P`** — places. `id: [name, category, lat, lon, note, area]`. Categories: `base beach night
  eat stop port air sight town taxi`.
- **`ROUTES`** — named GPS polylines for every bus, ferry, boat and taxi run.
- **`LINE`** — colour, label, description and dash pattern per line.
- **`DAYS`** — the plan. Each day has a title, a lede, the places it touches, its **legs** (`t`
  time · `ph` day|night · `mode` · `line` · `h` heading · `from`/`to` place ids · `geom` · `r` note
  · `fx` fact chips · optional `alt`/`altgeom`) and any notes (`calls`).
- **`memories`** — the third phase. `{id, ts, day, place, lat, lng, type: 'photo'|'video', src,
  thumb, caption}`. `ts` is an ISO datetime. Given `place`, `lat`/`lng` can be omitted.

### Adding the photographs

Phone photographs carry GPS and a timestamp in their EXIF data. An ingest script (to come) reads
a folder, resizes, writes thumbnails, and emits the `memories` array — pinned to the nearest
planned place, sorted by time. No manual tagging: dump the camera roll, and the atlas assembles
the week.

## Engine notes

Two behaviours that came from real bugs and are worth knowing before touching the map code:

- **A map is never fitted before its container has a size.** Leaflet's fit maths divides by the
  container size, so a container that has not been laid out yet (an opening pane, an iframe, a
  phone mid-rotation) produces a NaN centre. The bounds are held and applied from a
  `ResizeObserver` the moment the container is measured.
- **A hidden document takes the instant path.** There are no animation frames while a tab is
  hidden, so a fly would never land — and nobody is watching anyway.

When verifying in a browser pane that runs pages hidden, animations and CSS transitions do not
advance and the console buffer can persist across reloads; check logic from the DOM and use a
fresh tab for a clean console.
