# AWS Architecture Quiz

Static React application for the AWS certification course. It contains 100
original questions:

- 25 Level 100 questions
- 25 Level 200 questions
- 25 Level 300 questions
- 25 Level 400 questions

Live site: **https://naytron.github.io/aws-certification/**

Learners can take one level or a mixed 100-question attempt, use timed or untimed
mode, flag questions, resume locally, and review explanations after submitting.

## Local development

Requirements: Node.js 20 or later.

```powershell
npm ci
npm run dev
```

The Vite base path is `/aws-certification/` to match the GitHub Pages project
site.

## Validation

```powershell
npm run validate
```

This runs linting, TypeScript checks, 30 behavior/content tests, and the
production build.

Question-bank tests enforce exactly 100 questions, exactly 25 per level, valid
answer references, multiple-response counts, feature-selection coverage, and
existing course references.

## Local data

The application has no backend, authentication, analytics, cookies, or remote
data API. Attempts and the latest ten results are stored in browser
`localStorage`. Learners can export that state as JSON or reset it.

Answers are part of the downloaded static JavaScript, so this is a self-assessment
tool rather than a proctored or authoritative exam.
