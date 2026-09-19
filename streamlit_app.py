"""Latitude — a trip, on one map.

The product is a static page: index.html is the engine, data/<edition>.js is
the trip. This file exists only so it can be hosted on Streamlit Community
Cloud, which is where it lives for now. It reads the two files, inlines the
edition into the page (a srcdoc iframe cannot fetch a relative script), hands
in anything the page cannot see from inside a frame — the day to open on and
the URL to share — and renders the result full-bleed with Streamlit's own
chrome hidden.

Deliberately a single file with no local imports: Streamlit Cloud runs page
scripts without the app root on sys.path, so `from shared import ...` works
locally and raises ModuleNotFoundError on deploy.

Deep links are ?day=d03 rather than #d03. The page is rendered into a srcdoc
iframe, which has its own empty location, so a fragment on this URL never
reaches it. A query parameter can be read here and injected before render.
"""

import re
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).parent
EDITION = "data/ibiza.js"
PAPER = "#F6F1E7"
ACCENT = "#C8442A"
DAY_RE = re.compile(r"(ov|d0[2-9])")

st.set_page_config(
    page_title="Latitude · Ibiza",
    page_icon="🧭",
    layout="wide",
    initial_sidebar_state="collapsed",
)


@st.cache_data(show_spinner=False)
def _read(path: str, mtime: float) -> str:
    # `mtime` is part of the cache key on purpose, so an edited file is picked
    # up on the next rerun. It must not start with an underscore: Streamlit
    # leaves underscore-prefixed arguments out of the key.
    return Path(path).read_text(encoding="utf-8")


def read(rel: str) -> str:
    p = ROOT / rel
    return _read(str(p), p.stat().st_mtime)


def host_url() -> str | None:
    """The public URL of this app, without query or fragment, if Streamlit
    can tell us (1.44+). Falls back to nothing; the page then uses its own
    referrer, which is this same URL."""
    try:
        url = str(st.context.url)  # type: ignore[attr-defined]
    except Exception:
        return None
    return url.split("#", 1)[0].split("?", 1)[0] or None


def build(day: str | None, share: str | None) -> str:
    page = read("index.html")
    data = read(EDITION)
    if "</script" in data.lower():
        # would terminate the inline tag early and hand half the edition to the DOM
        raise ValueError(f"{EDITION} contains a script end tag and cannot be inlined")
    tag = f'<script src="{EDITION}"></script>'
    if tag not in page:
        raise ValueError(f"index.html no longer references {EDITION}")
    page = page.replace(tag, "<script>\n" + data + "\n</script>", 1)

    inject = []
    if day and DAY_RE.fullmatch(day):
        inject.append(f"window.__ATLAS_DAY={day!r};")
    if share:
        inject.append(f"window.__ATLAS_URL={share!r};")
    if inject:
        page = page.replace("</head>", "<script>" + "".join(inject) + "</script></head>", 1)
    return page


st.markdown(
    f"""
    <style>
      /* This is a single full-bleed page: no header, no footer, no menu, no
         padding. The iframe is the whole viewport and scrolls internally. */
      #MainMenu, footer, header[data-testid="stHeader"],
      [data-testid="stDecoration"], [data-testid="stStatusWidget"],
      [data-testid="stToolbar"], [data-testid="stSidebar"],
      [data-testid="stSidebarCollapsedControl"] {{ display: none !important; }}
      .stApp, [data-testid="stAppViewContainer"], [data-testid="stMain"] {{ background: {PAPER}; }}
      .block-container, [data-testid="stMainBlockContainer"] {{
        padding: 0 !important; margin: 0 !important; max-width: 100% !important;
      }}
      [data-testid="stMain"] {{ padding: 0 !important; }}
      [data-testid="stVerticalBlock"], [data-testid="element-container"] {{ gap: 0 !important; }}
      [data-testid="stElementContainer"]:has(> [data-testid="stIFrame"]),
      [data-testid="stElementContainer"]:has(> iframe),
      [data-testid="stIFrame"] {{
        height: 100vh !important; height: 100dvh !important; overflow: hidden !important;
      }}
      [data-testid="stMain"], [data-testid="stMainBlockContainer"], [data-testid="stVerticalBlock"] {{
        height: 100vh !important; height: 100dvh !important; overflow: hidden !important;
      }}
      [data-testid="stAppViewContainer"] iframe {{
        height: 100vh !important; height: 100dvh !important;
        width: 100% !important; border: none !important; display: block;
      }}
      html, body {{ overflow: hidden; background: {PAPER}; }}
      a {{ color: {ACCENT}; }}
    </style>
    """,
    unsafe_allow_html=True,
)

day = st.query_params.get("day")
html = build(str(day) if day else None, host_url())

if hasattr(st, "iframe"):
    st.iframe(html, height=900)
else:  # older Streamlit
    import streamlit.components.v1 as components

    components.html(html, height=900, scrolling=False)
