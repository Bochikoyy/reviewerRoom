# Sunroom

A responsive yellow-themed Endocrinology reviewer built with Vite and plain JavaScript. It opens directly into the lesson workspace, without a dashboard or account requirement.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates the production site in `dist`; `npm run preview` serves that build. Deploy to Vercel with build command `npm run build` and output directory `dist`.

## Study material

The three supplied PDFs map to three lessons. Each includes 8 summarized note sections, 25 flashcards, and 30 original practice questions: 15 multiple choice, 10 identification, and 5 essays. Every section and practice question links to the relevant original PDF page. Full PDFs remain available under `public/lessons/`.

Content is in `src/data.js`. The notes are educational summaries for the supplied veterinary course, not a clinical reference. Potentially changing prevalence, test-availability claims, and treatment instructions are not presented as current guidance. Essay responses are self-reviewed against model answers and three-point rubrics; only the 25 objective questions receive an automatic score. Identification accepts configured synonyms and ignores capitalization, punctuation, and spacing; it does not use fuzzy or AI grading.

## Saved state

Read status, bookmarks, learned cards, current quiz answers, best objective scores, essay self-review, and timer state are stored in localStorage on the current device. There is no account, server-side database, or synchronization. Export progress downloads a JSON record for safekeeping; it is not an import/restore feature. Browser storage failures leave the active in-memory session usable.

The focus timer offers 25/5, 50/10, 90/20, and custom intervals. Its absolute deadline survives refresh and inactive tabs. Breaks start only when chosen. Completion sounds require browser audio support and may be delayed in suspended tabs.

Fonts use Google Fonts with local sans-serif fallbacks. No analytics or external study APIs are used.

## Validation

`npm test` runs Playwright against the Vite server. The test configuration uses locally installed Chrome by default. Set `CHROME_PATH` if Chrome is installed elsewhere. Tests cover content counts, persisted quiz answers, scoring, essay self-review, flashcards, note bookmarks, timer transitions, and mobile overflow.

`scripts/extract.cjs` is a development helper for extracting the original PDFs into `sources/`; it uses the original local Downloads paths and is not needed to run or deploy the site.
