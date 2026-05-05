# Version Control Guide

## Issue Workflow (for auto-closing)
1) Create GitHub issue for each task in the implementation plan.
2) Name the issue clearly and keep scope small.
3) Use closing keywords in commit messages to auto-close issues.

## Branching
- If PR merge is unavailable, work directly on main and rely on commit messages.
- If PR merge is available, create a feature branch per issue:
  - format: feature/<short-title-slug>
  - example: feature/user-and-crypto-models

## Commit Message Format
- Use: "type: short summary (closes #ISSUE_NUMBER)"
- Examples:
  - "feat: add user model (closes #3)"
  - "fix: handle duplicate email (closes #7)"

## Pull Request Flow (if enabled)
1) Push branch to GitHub.
2) Open a PR referencing the issue number.
3) Review checklist:
  - Tests pass
  - No secrets committed
  - Code follows project structure
4) Squash and merge the PR.
5) Delete the branch on GitHub.
6) Run git pull on main to update locally.

## Direct-to-Main Flow (if PR merge is blocked)
1) Work on main.
2) Run tests.
3) Commit with closing keywords.
4) Push to origin main.

## Suggested Issue Template (Short)
- Summary:
- Acceptance Criteria:
- Notes:

## Local Commands (Typical Flow)
- git status
- git add .
- git commit -m "feat: add user model (closes #3)"
- git push origin main

## PR Description Hint
- "Closes #3" in the PR description auto-closes on merge.
