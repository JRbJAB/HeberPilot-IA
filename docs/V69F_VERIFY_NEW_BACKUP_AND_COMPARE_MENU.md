# HPIA V69F - Fresh live backup verification and menu comparison

Status: `OK_HPIA_V69F_NEW_LIVE_BACKUP_VERIFIED_MENU_HOST_STABLE_NO_APPLY`

## Fresh live backup

- Trace: `21449c49`
- Drive file id: `1bwmBlQrNvcZ3F3wey9ahP3jbVzcZRGa2`
- Drive URL: https://drive.google.com/file/d/1bwmBlQrNvcZ3F3wey9ahP3jbVzcZRGa2/view?usp=drivesdk
- File name: `hpia_apps_script_live_source_backup_20260721_034146_21449c49.zip`
- Size: `74219` bytes
- Apps Script log: STATUS OK, APPLY OK
- `fileCount`: `16`
- `blobCount`: `21`

## Previous reference

- Trace: `d85a1fb4`
- Drive file id: `1vOfbzba2D_Ek5Xtu6T5nIjQ4UPlrz_6z`
- Size: `70224` bytes
- SHA-256: `5d7a1f657280110f2f194eac25807039db642a6270986eec8d8bf6a25ec5cb98`

## Observed delta

The fresh backup contains `21` ZIP entries versus `19` entries in `d85a1fb4`.

Added entries:

1. `apps-script/HPIA_P0A_READINESS_AUDIT_DRY_RUN.gs`
2. `apps-script/97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE_INSTALL_READY.gs`

No deletion was observed from the central ZIP listing.

## Menu host stability

Menu host:

`apps-script/GDVG Cockpit - Controles & Reservations.gs`

Fresh backup observed ZIP entry values:

- CRC32: `1167336014`
- Uncompressed length: `33269`
- Compressed length: `9695`

These match the previous `d85a1fb4` reference values.

Decision: the menu host is stable. The V69D candidate does not require rebase on this fresh backup.

## Safety

- Apps Script active project modified: NO
- CLASP operation: NO
- Menu applied: NO
- Active GitHub code push: NO

Next: V69G may prepare a controlled manual installation plan for the existing `onOpen` only, still gated by explicit approval.