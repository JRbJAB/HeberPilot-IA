# HPIA V70 - Menu Backup Drive / CLASP / GitHub candidate

Status: `READY_HPIA_V70_MENU_BACKUP_CLASP_GITHUB_CANDIDATE_NO_APPLY`

## Purpose

V70 corrects the V69D menu candidate by adding an Admin Dev submenu for Backup Drive / CLASP / GitHub.

The candidate remains documentation-only. It is not published under `apps-script/`, because adding a new file with `onOpen()` would create a second menu entry point.

## Script delivery doctrine

For Apps Script work, future deliverables must provide a complete current replacement script or complete replacement block, plus action details, rollback, and status.

No isolated constants or partial snippets should be treated as final install material.

## Runtime state

Backup Drive is active through the installed V57 backup module:

- `HPIA_V57_backupStatus`
- `HPIA_V57_backupSourceDryRun`
- `HPIA_V57_backupSourceToDriveApply`

CLASP is not active from Apps Script. Apps Script cannot execute the local `clasp` binary. CLASP remains an operator-controlled path using the generated live ZIP / CLASP structure.

GitHub auto-push is not active from Apps Script. GitHub is initialized, but no Apps Script menu item performs a GitHub write.

## Candidate behavior

The V70 menu candidate adds this Admin Dev submenu:

- `Backup live Drive status`
- `Backup live Drive dry-run`
- `Create live backup ZIP in Drive`
- `CLASP / GitHub status`
- `Open backup Drive folder`
- `Open GitHub repository`

## Safety

- No Apps Script mutation by Codex.
- No CLASP operation.
- No GitHub write from Apps Script.
- No second `onOpen`.
- No script sprawl.
- Keep one menu host.
- Keep fusion/rationalization by business domain, technical function, or UI surface.

## Install rule

Install only by replacing the existing single `onOpen()` in the existing menu host, then appending the `HPIA_V70_*` helpers to that same host file if absent.

Do not create a new Apps Script file containing this `onOpen()`.
