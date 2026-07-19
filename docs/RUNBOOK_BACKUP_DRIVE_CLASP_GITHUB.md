# Runbook - Backup Drive + CLASP + GitHub

## Doctrine

Source of truth:

```text
Apps Script live
-> ZIP Drive created by Apps Script
-> verified ZIP
-> CLASP/GitHub mirror from verified ZIP
```

Do not use a local CLASP pull as the first source of truth.

## Existing backup core

The installed backup core remains the single one-file module:

```text
HPIA_BACKUP_V57_ONE_FILE.gs
```

Do not install another backup module unless V57 is explicitly deprecated and removed.

## Drive backup folder

Target folder:

```text
HPIA — Backups live Apps Script
```

Folder ID:

```text
13Vg7j5z4BkboQNHmNxW_rTuZXXwtlZAd
```

This folder is for live Apps Script backup ZIP files only.

## Required V57 properties

```text
HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE = FALSE
HPIA_V57_SOURCE_BACKUP_FOLDER_ID = 13Vg7j5z4BkboQNHmNxW_rTuZXXwtlZAd
HPIA_V57_BACKUP_NAME_PREFIX = hpia_apps_script_live_source_backup
```

Set `HPIA_V57_ALLOW_SOURCE_BACKUP_WRITE = TRUE` only after a successful dry-run and only for the apply run. Set it back to `FALSE` immediately after.

## CLASP rule

CLASP can consume the generated source tree, but no `clasp push` is allowed until:

```text
1. live ZIP exists in Drive;
2. ZIP hash is verified;
3. static audit is clean;
4. GitHub mirror is reviewed;
5. explicit human GO is given.
```

## GitHub rule

Repository:

```text
JRbJAB/HeberPilot-IA
```

Public repo rule:

```text
No secrets.
No raw private Drive IDs.
No property values.
No customer/private documents.
```

Raw scripts with private IDs must be sanitized before publication.

## Script 97 V65B rule

Publish only the public-safe variant:

```text
97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_PUBLIC_SAFE.gs
```

Keep private folder IDs in Apps Script properties only.
