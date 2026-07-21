# HPIA V72 - Backup Drive / CLASP / GitHub full loop

Status: READY_COMPLETE_SCRIPT_NO_SCRIPT_SPRAWL
Date: 2026-07-21

## Purpose

V72 provides a single complete Apps Script backup orchestrator for the full loop:

1. capture live Apps Script source with `projects.getContent`;
2. create a Drive ZIP backup;
3. generate a CLASP-ready structure inside the ZIP;
4. sync the text source package to GitHub via the GitHub API when explicitly enabled.

## Important distinction

V72 does not execute the local `clasp` binary, because Apps Script cannot run local machine commands.

Instead, V72 generates the CLASP-compatible project tree:

- `.clasp.json`
- `apps-script/`
- `CLASP_GITHUB_HANDOFF.md`
- `_backup_manifest.json`
- `_file_index.csv`
- `README.md`

## Install policy

Do not create another backup script variant.

Replace the existing backup script content with the complete V72 file and optionally rename the Apps Script file to:

`HPIA_BACKUP_DRIVE_CLASP_GITHUB_FULL_LOOP`

The old V57 public functions are preserved as aliases:

- `HPIA_V57_backupStatus`
- `HPIA_V57_backupSourceDryRun`
- `HPIA_V57_backupSourceToDriveApply`

They call the V72 engine to avoid menu breakage.

## Runtime functions

- `HPIA_V72_fullLoopStatus()`
- `HPIA_V72_fullLoopDryRun()`
- `HPIA_V72_fullLoopApply_APPROVED()`

## Required Script Properties

The token must never be committed or written in docs/sheets/chat.

```text
HPIA_V72_ALLOW_BACKUP_DRIVE_WRITE = FALSE
HPIA_V72_ALLOW_GITHUB_WRITE = FALSE
HPIA_V72_SOURCE_BACKUP_FOLDER_ID = <Drive backup folder id>
HPIA_V72_BACKUP_NAME_PREFIX = hpia_apps_script_full_loop_backup
HPIA_V72_GITHUB_OWNER = JRbJAB
HPIA_V72_GITHUB_REPO = HeberPilot-IA
HPIA_V72_GITHUB_BRANCH = main
HPIA_V72_GITHUB_PATH_PREFIX =
HPIA_V72_GITHUB_COMMIT_PREFIX = HPIA full-loop backup sync
HPIA_V72_GITHUB_TOKEN = <stored only in Script Properties>
```

## Gates

Drive write requires:

`HPIA_V72_ALLOW_BACKUP_DRIVE_WRITE = TRUE`

GitHub write requires:

`HPIA_V72_ALLOW_GITHUB_WRITE = TRUE`

After a successful apply, both should be returned to `FALSE`.

## Safety

V72 creates no menu, no trigger and no sheet mutation.

V72 blocks if it detects obvious API tokens/private keys in the source package.