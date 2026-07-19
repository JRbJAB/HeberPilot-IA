# HPIA V67 - Doctrine scripts, fusion et nomenclature

Status: OK_HPIA_V67_SCRIPT_DOCTRINE_NAMING_FUSION_SEALED

## Decision

Do not multiply Apps Script files by default.

New scripts are allowed only when they are justified by one of these boundaries:

- a distinct business domain;
- a distinct technical function;
- a distinct UI surface;
- a temporary migration or audit pack that will later be removed or merged.

## Fusion rule

Prefer fusion when it reduces risk and improves maintenance.

Target grouping:

- business domain: reservations, taxes, reviews, partner imports, backups;
- technical function: registry, aliases, logging, backup, GitHub/CLASP handoff;
- UI surface: dashboard, governance, planning, reviews, admin dev;
- shared helpers: only if neutral, reusable, and registry-based.

## Anti-sprawl rule

Every temporary script must declare one of these outcomes:

```text
MERGE_INTO_TARGET_MODULE
REPLACE_EXISTING_MODULE
DELETE_AFTER_SEAL
KEEP_AS_READONLY_AUDIT
```

No script should remain installed only because it was useful once.

## One menu rule

There must be only one real `onOpen`.

Menu integration must patch the existing menu host after review. No second competing menu, no hidden onOpen, no automatic trigger.

## HeberPilot naming convention

Installed HPIA/GDVG Apps Script filenames should converge to this pattern:

```text
HPIA_<DOMAIN>_<ROLE>_<SCOPE>_vNN.gs
```

Examples:

```text
HPIA_BACKUP_LIVE_DRIVE_DCG_v57.gs
HPIA_IMPORT_BOOKING_SOURCE_AUDIT_v66.gs
HPIA_UI_GOVERNANCE_TABS_v70.gs
HPIA_UI_ACTIONS_PLANNING_v80.gs
HPIA_AUDIT_DASHBOARD_READONLY_v90.gs
HPIA_REVIEWS_REPUTATION_AUDIT_v92.gs
HPIA_TAXE_SEJOUR_AUDIT_v96.gs
```

Where:

- `HPIA` is the product namespace;
- `DOMAIN` is the business or technical domain;
- `ROLE` says what the script does;
- `SCOPE` clarifies read-only, UI, import, backup, install, or apply;
- `vNN` preserves lineage.

## Public repository rule

Public GitHub files must not include:

- private Drive IDs;
- property values;
- tokens;
- customer data;
- raw business documents;
- temporary operator secrets.

Private IDs and operational configuration stay in Apps Script properties, Drive-only docs, or private registries.

## V66 correction

The V66 install-ready script is not automatically approved for installation as another standalone script.

Before installation, V67 requires a fusion decision:

```text
INSTALL_STANDALONE_TEMPORARY_READONLY
MERGE_INTO_HPIA_IMPORT_BOOKING_SOURCE_AUDIT
MERGE_INTO_BACKUP_DCG_ADMIN_TOOLS
HOLD_UNTIL_SCRIPT_RENAMING_PLAN
```

Recommended current state:

```text
HOLD_UNTIL_SCRIPT_RENAMING_PLAN
```

Reason:
The script is safe, but the project should first converge on a clean naming/fusion plan instead of installing another isolated file.

## Final doctrine

V67 supersedes any prior habit of adding one file per patch.

Future work must start with:

```text
1. Is there an existing module to merge into?
2. Is this temporary or permanent?
3. What final script name will it converge to?
4. What function names must be kept for compatibility?
5. What obsolete functions/files will be removed after seal?
```
