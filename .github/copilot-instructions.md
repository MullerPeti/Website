**Project Overview**

- **Type:** FastAPI web scraper service (single-file) - see [app.py](app.py).
- **Purpose:** Scrapes MQL5 marketplace (`https://www.mql5.com/en/users/mullerp04/seller`) for MT4/MT5 trading product listings.
- **Entrypoint:** `app.py` exposes an ASGI `FastAPI` app as `app`, launched with Uvicorn.

**API Endpoints**

- `GET /` — Health check root; returns `{"status": "success", "message": "FastAPI is running"}`.
- `GET /health` — Health check; returns `{"status": "ok"}`.
- `GET /mql5/products/MT4` — Scrapes MQL5 seller page and filters MT4 products (title contains "MT4").
- `GET /mql5/products/MT5` — Scrapes MQL5 seller page and filters MT5 products (title contains "MT5").

**Scraping Pattern & Data Flow**

1. Both `/mql5/products/*` endpoints use async HTTP client (`httpx.AsyncClient`) to fetch MQL5 page.
2. Parse HTML with BeautifulSoup; select `<span class="product-card__title-wrapper">` elements.
3. Filter by string matching `.text.strip().__contains__("MT4")` or `.text.strip().__contains__("MT5")`.
4. Return filtered list as `{"products": [...]}`; **note:** no deduplication or sorting applied.

**Project-specific conventions & patterns**

- **Single-file service:** All endpoints in [app.py](app.py); new logic should integrate here unless creating orthogonal modules (e.g., test files).
- **Scraping helpers:** Use `httpx.AsyncClient` for HTTP; `BeautifulSoup` for HTML parsing. External URL is hardcoded—consider parametrizing if endpoints expand.
- **Function naming:** Two routes (`/MT4` and `/MT5`) currently define identically-named functions `free_products()`. Rename to `mt4_products()` / `mt5_products()` if adding more endpoints.
- **ASGI export:** App exported as `app`; Uvicorn command is `uvicorn app:app ...`.

**Local developer workflows (PowerShell)**

```powershell
# Create & activate venv
python -m venv .venv
.\.venv\Scripts\Activate

# Install runtime deps (explicit from imports)
pip install fastapi uvicorn httpx beautifulsoup4

# Run dev server with reload
uvicorn app:app --reload --host 127.0.0.1 --port 8000

# Quick smoke tests
curl http://127.0.0.1:8000/
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/mql5/products/MT4
```

**Dependencies & integration points**

- **Runtime:** `fastapi`, `uvicorn`, `httpx`, `beautifulsoup4`.
- **External:** Hardcoded scrape target `https://www.mql5.com/en/users/mullerp04/seller`—subject to site structure changes.
- **Note:** No `requirements.txt` or `pyproject.toml` currently; add if packaging or CI is needed.

**When editing**

- Keep endpoint logic in [app.py](app.py); extract scraping to separate module only if complexity grows.
- Test scraping locally before deployment; MQL5 HTML structure changes will break selectors.
- Avoid renaming `app` symbol; update Uvicorn commands/docs if changed.  
