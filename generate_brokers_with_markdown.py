"""
generate_brokers_with_markdown.py

Read `mql5/brokers.json`, load each broker's `description_file` markdown
and output `mql5/brokers_full.json` with an added `long_description` field
containing the raw markdown text.

Usage:
  python mql5/generate_brokers_with_markdown.py
  python mql5/generate_brokers_with_markdown.py --in mql5/brokers.json --out mql5/brokers_full.json

This script is safe (writes a new file by default) and uses UTF-8.
"""
from pathlib import Path
import json
import argparse
import sys


def load_markdown_text(base_dir: Path, desc_path: str):
    # desc_path may be relative to repo root or to mql5/ directory
    if not desc_path:
        return None
    p = Path(desc_path)
    if p.is_absolute():
        candidate = p
    else:
        candidate = base_dir / desc_path
        if not candidate.exists():
            # try relative to repo root
            candidate = Path.cwd() / desc_path
    if not candidate.exists():
        return None
    try:
        return candidate.read_text(encoding='utf-8')
    except Exception:
        return None


def main():
    parser = argparse.ArgumentParser()
    # Defaults are relative to this script's directory so the script works
    # regardless of the current working directory.
    script_dir = Path(__file__).parent
    parser.add_argument('--in', dest='infile', default=str(script_dir / 'mql5' / 'brokers.json'))
    parser.add_argument('--out', dest='outfile', default=str(script_dir / 'mql5' / 'brokers_full.json'))
    args = parser.parse_args()

    infile = Path(args.infile)
    outfile = Path(args.outfile)
    if not infile.exists():
        print(f"Input file not found: {infile}")
        sys.exit(1)

    base_dir = infile.parent

    data = json.loads(infile.read_text(encoding='utf-8'))
    updated = []
    missing = []

    for entry in data:
        desc_file = entry.get('description_file')
        md = load_markdown_text(base_dir, desc_file) if desc_file else None
        if md is None:
            # preserve existing long_description if present
            md = entry.get('long_description')
        if md is None:
            missing.append(entry.get('slug') or entry.get('name'))
            entry['long_description'] = ''
        else:
            entry['long_description'] = md
        updated.append(entry)

    outfile.write_text(json.dumps(updated, ensure_ascii=False, indent=2), encoding='utf-8')

    print(f"Wrote {len(updated)} broker entries to {outfile}")
    if missing:
        print(f"Warning: {len(missing)} entries had no markdown found: {', '.join(missing)}")


if __name__ == '__main__':
    main()
