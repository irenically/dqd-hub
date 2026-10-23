# The Department of Questionable Decisions

A public case file for side projects, built with Vite, React, TypeScript, Tailwind CSS, and GitHub Pages. Project content lives in version-controlled JSON. No backend or browser GitHub token is required.

## Quick start

```sh
npm ci
npm run dev
```

Node 22 is recommended. Use `npm run project:validate`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` before merging.

## Publishing

Set `github.owner` in `config/department.json` to the GitHub user whose public repositories should be discovered. Tag a repository with `dqd-project`, run the **Project Intake Office** workflow from Actions or wait for its daily 07:00 UTC schedule, review the generated PR, customize the case file, set `visible: true`, and merge. The deployment workflow publishes on pushes to `main`. The GitHub Pages base path is derived from the repository name.

In repository settings, enable **Actions: Allow GitHub Actions to create and approve pull requests** and configure **Pages: GitHub Actions** as the source. The built-in `GITHUB_TOKEN` is used for intake; no personal token is required. Token-created PRs might not trigger normal PR workflows, so the intake job validates before creating its PR and deployment validates again on merge.

For manual records run `npm run project:add`, then commit the JSON change. Public records can link to a verified live site and repository. Secret records can appear with an **ABSOLUTELY SECRET PROJECT** label and link to a public live site, but never expose a private repository link; `visible: false` hides any record entirely. `npm run project:list` prints the current catalog. See [Project Intake](docs/PROJECT-INTAKE.md) for all owner operations.

The theme follows the operating system until a visitor toggles it, then saves the choice locally. The public proposal form is a joke interaction and sends nothing. No API credentials or private repository data belong in frontend variables. `VITE_GITHUB_OWNER` only sets the optional public GitHub link.

If discovery shows no changes, check the configured owner, exact repository topic, fork/archive exclusions, and public visibility. If a PR is not created, check Actions pull-request permission. GitHub Pages also requires the `main` default branch or a workflow trigger adjustment.
