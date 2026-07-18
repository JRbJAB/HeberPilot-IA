# HPIA V64 — Historical scripts audit

Source trace: `d85a1fb4`
Source ZIP SHA-256: `5d7a1f657280110f2f194eac25807039db642a6270986eec8d8bf6a25ec5cb98`

Historical scripts audited: 12.

## Classification

Wave 1 — read-only candidates:
- `90_GDVG_V42_AUDIT_NO_WRITE.gs`
- `91_GDVG_V42R1_DASHBOARD_PATCH_SAFE.gs`
- `92_GDVG_V43_AVIS_REPUTATION_NO_BREAK_AUDIT.gs`
- `96_GDVG_V44A_TAXE_SEJOUR_DEEP_AUDIT_NO_WRITE.gs`

Wave 2 — external read/manual review:
- `97_GDVG_V44A2_SOURCE_PIECES_AND_IMPORT_MODELS_AUDIT_NO_WRITE.gs`

Wave 3 — write-capable and held:
- `100_HEBERPILOT_V45B_R2_RESUME_ADMIN_PRODUCT_TABS_SAFE.gs`
- `70_GDVG_GOUVERNANCE_ONGLETS_UI.gs`
- `80_GDVG_ACTIONS_PLANNING_UI.gs`
- `81_GDVG_PLANNING_VISUEL_IMPORT_STAGING_SAFE.gs`
- `94_GDVG_V43R2_AVIS_GITESFR_AND_SCRAPING_FINAL_COMPLETE.gs`
- `95_GDVG_V43R3_AVIS_LAYOUT_MEF_MEP_MAINTENANCE_FINAL_COMPLETE.gs`
- `GDVG Cockpit — Contrôles & Réservations.gs`

## Publication result

Published in V64A:
- `90_GDVG_V42_AUDIT_NO_WRITE.gs`

The remaining Wave 1 files passed static read-only classification but were rejected by the connected publication channel during payload safety validation. They remain preserved in the verified Drive ZIP.

No Apps Script mutation and no CLASP operation were performed.