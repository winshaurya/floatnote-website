# fwebsite (FloatNote)

This is a Create React App-based project. These are quick instructions to run, build and deploy.

## Local development

Install dependencies:

```powershell
npm install
```

Run development server:

```powershell
npm start
```

Build for production:

```powershell
npm run build
```

## Vercel deployment

This project includes a `vercel.json` configured to use the `build` output created by `npm run build`.

1. Install the Vercel CLI (optional):

```powershell
npm i -g vercel
```

2. Deploy:

```powershell
vercel --prod
```

## Environment

Copy `.env.example` to `.env` and set any `REACT_APP_*` variables.
