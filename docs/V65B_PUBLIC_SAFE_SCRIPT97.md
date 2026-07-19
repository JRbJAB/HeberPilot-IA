# V65B - Public-safe script 97

Status: `OK_HPIA_V65B_PUBLIC_SAFE_SCRIPT97_AND_BACKUP_DCG_READY`

## What changed

The raw historical script `97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE.gs` was audited in V65 and found operationally read-only, but not suitable for raw public publication because it contains internal Google Drive folder IDs.

V65B publishes a public-safe variant:

```text
apps-script/97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_PUBLIC_SAFE.gs
```

## Safety

- No private Drive folder IDs hardcoded.
- No spreadsheet mutation.
- No Drive mutation.
- No external HTTP fetch.
- No menu creation.
- No trigger creation.
- No CLASP operation.
- No Apps Script active project mutation.

## Required private Apps Script properties

The following values must be configured only in Apps Script Script Properties:

```text
GDVG_V44A2_BOOKING_ROOT_FOLDER_ID
GDVG_V44A2_BOOKING_2023_FOLDER_ID
GDVG_V44A2_BOOKING_2024_FOLDER_ID
GDVG_V44A2_BOOKING_2025_FOLDER_ID
GDVG_V44A2_BOOKING_2026_FOLDER_ID
```

Do not commit the property values.

## Backup Drive + CLASP + GitHub

The backup process remains:

```text
Apps Script live -> ZIP Drive -> hash verification -> CLASP/GitHub mirror
```

The existing Drive backup target remains:

```text
HPIA — Backups live Apps Script
```

The GitHub repository remains:

```text
JRbJAB/HeberPilot-IA
```

No `clasp push` is allowed without an explicit human gate.
