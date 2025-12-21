**Project Overview**

- **Type:** Minimal FastAPI service (single-file) - see `app.py`.
- **Entrypoint:** `app.py` exposes an ASGI `FastAPI` app as `app` and is launched with Uvicorn (`uvicorn.run("app:app", ...)`).
- **Endpoints:** `/` (root) and `/health` — use these for quick local smoke tests.

**What to change and why**

- **Small, focused edits:** This repository is a tiny HTTP service. Keep changes minimal and localized to `app.py` unless adding integration/tests or packaging.
- **Preserve run semantics:** The file currently calls `uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)` when executed as `__main__`. If you change host/port or reload behavior, ensure local dev workflow is preserved.

**Local developer workflows (explicit commands)**

- **Create & activate venv (PowerShell):**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate
```

- **Install runtime deps (explicit from imports):**

```powershell
pip install fastapi uvicorn
```

- **Run dev server (equivalent to current `if __name__ == '__main__'`):**

```powershell
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

- **Quick smoke test:** Visit `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/health`.

**Project-specific conventions & patterns**

- **Single-file service:** All behavior lives in `app.py`. New modules are allowed but prefer small, orthogonal modules rather than broad refactors.
- **ASGI app object name:** The app is exported as `app` (i.e., `app:app` for Uvicorn). Don't rename the exported symbol unless updating run commands/tests accordingly.
- **Dev reload enabled:** `reload=True`/`--reload` is used for developer productivity; CI or production runs should disable reload.

**Dependencies & integration points**

- **Explicit imports:** From the code we require `fastapi` and `uvicorn`. There are no other discovered external integrations (databases, queues, cloud SDKs) in the repository.
- **Packaging/build:** No `requirements.txt`, `pyproject.toml`, or CI config detected — add them if you introduce packaging or CI steps.

**When editing, give these examples in PR descriptions**

- **Change scope:** "Small change — add X endpoint to `app.py` and update README with example curl".
- **Run instructions:** Include the PowerShell commands above to reproduce locally.

**Files to inspect for context**

- `app.py` — runtime & endpoints (source of truth for app behavior)
- `.venv/` — ignore; environment artifacts may exist locally

If anything in this summary looks incorrect for your environment (missing packaging, tests, or infra integrations), tell me which files or services to inspect and I will update this guidance.  
