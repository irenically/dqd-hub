# The Project Intake Office

## GitHub projects

1. Set `github.owner` in `config/department.json` to the real account. Optionally change the discovery topic.
2. Add the `dqd-project` topic to a public repository.
3. Run **Project Intake Office** in GitHub Actions or wait for its daily 07:00 UTC run.
4. Review the PR. New records have stable numeric repository IDs and case numbers, but start hidden.
5. Edit the case file's display name, department, description, observation, status, tags and links. Set `visible: true` only when ready.
6. Merge the PR and confirm the GitHub Pages deployment succeeded.

To associate a seeded case file with its real repository without a duplicate, edit that record before discovery: change `source` to `github`, set `id` to `github-<numeric repository ID>`, add the `github` object with that same ID and real metadata, and set `repositoryUrl` to the real URL. Keep its `caseId` and editorial fields. Validate with `npm run project:validate`. The numeric ID is available through the GitHub API repository endpoint.

## Manual projects

Run `npm run project:add`. It prompts for metadata and writes the catalog atomically. It requires no GitHub credentials. Choose `classification: "public"` for a public repository or `classification: "secret"` for an internal repository. A secret record remains manual and cannot contain a repository URL or GitHub metadata, but may link to a public live website. Set `visible: true` only if its title and description are safe to reveal on the public site; use `visible: false` to keep it off the site entirely. Commit or open a PR with the JSON change, then confirm deployment. The GitHub issue form is only a request for human review; it executes nothing. You can also edit `src/data/projects.json` through GitHub's web editor and open a PR.

## Ongoing operations

- Update: edit the existing record, retaining its case ID.
- Hide: set `visible` to `false`.
- Archive: set `status` to `archived`.
- Exclude a discovered repository: add its numeric repository ID to `config/ignored-repositories.json`.
- Remove: delete deliberately. Keep its case number in `config/case-numbers.json`; the intake scripts never reuse reserved numbers.
- Refresh metadata only: run `npm run project:sync`.

Not discovered means a repository is private, lacks the topic, or is excluded by fork/archive settings. Ignored means its numeric ID is in the ignore file. Imported but hidden means it is in the catalog with `visible: false`. Approved means it is in the catalog with `visible: true` after PR review.

GitHub-owned metadata refreshes without changing Department descriptions, status, visibility, custom live URLs, tags, or case IDs. Discovery considers public repositories only. Missing or inaccessible repositories remain in the catalog and are reported. A public card opens its live site when `liveUrl` is configured; otherwise it remains a case file without a fake destination. The public **Questionable Proposal Form** is fictional and never registers a project.
