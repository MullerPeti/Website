Quick frontend scaffold for the MQLBusiness site

Install dependencies:

```bash
cd frontend
npm install
# or using pnpm/yarn
# pnpm install
# yarn install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Notes:
- This scaffold uses Vite + React + TypeScript.
- You can add `src/` with `main.tsx` and `index.html` (Vite conventions).
- Add ESLint/Prettier configs if needed.
 
Tailwind + shadcn/ui setup
- Tailwind is preconfigured. Source files are scanned from `index.html` and `src/**/*.{js,jsx,ts,tsx}`.
- To scaffold shadcn components run the CLI (interactive):

```bash
cd frontend
# install the shadcn CLI and run init interactively
npx shadcn@latest init
# then add components, for example:
npx shadcn@latest add button
```

Notes:
- The shadcn CLI will add Radix-based components and required packages; follow prompts.
- If you prefer, install the CLI as a dev dependency: `npm i -D shadcn` and run `npx shadcn init`.
