# HPIA V69 - Audit du menu central Apps Script

Status: OK_HPIA_V69_MENU_HOST_AUDIT_READY_NO_MUTATION

## Objet

Auditer le fichier menu central issu du ZIP live vérifié `d85a1fb4`.

Fichier audité :

```text
GDVG Cockpit — Contrôles & Réservations.gs
```

V69 ne modifie rien.

## Verdict

Le fichier est bien le menu host principal.

Il contient :

- le seul vrai `onOpen` détecté dans le projet ;
- le menu utilisateur `GDVG Cockpit` ;
- des fonctions de contrôle ;
- des fonctions d'import Booking/staging ;
- des scans Drive ;
- des écritures dans les registres QA/fichiers/staging ;
- des helpers partagés.

Conclusion :

```text
DO_NOT_RENAME_OR_PATCH_DIRECTLY_BEFORE_MENU_SPLIT_PLAN
```

## Risques détectés

### 1. Un seul `onOpen`, donc fichier sensible

Toute modification imprudente peut casser le menu entier.

Décision :

- ne jamais créer un second `onOpen` ;
- ne jamais remplacer ce fichier par un menu court ;
- patcher uniquement après plan de compatibilité.

### 2. Menu utilisateur et admin/dev mélangés

Le menu expose ou regroupe :

- contrôles simples ;
- import Booking ;
- scan Drive ;
- avis ;
- MEP ;
- protections ;
- admin/version/help.

Certains éléments sont utiles à l'utilisateur, d'autres relèvent du dev/admin.

Décision :

```text
SPLIT_USER_MENU_AND_ADMIN_DEV_MENU
```

### 3. Fonctions dites dry-run avec écritures

Certaines fonctions écrivent quand même dans des onglets de suivi :

- log QA ;
- registre fichiers ;
- staging import.

Ce n'est pas une mutation finale de réservation, mais ce n'est pas strictement read-only.

Décision :

```text
CLASSIFY_AS_STAGING_OR_APPEND_LOG_WRITE
```

### 4. Configuration Drive privée

Le fichier contient une configuration Drive opérationnelle.

Décision :

- ne pas publier brut en GitHub public ;
- migrer vers Script Properties ou registry privée avant publication public-safe ;
- garder le brut dans le ZIP Drive source de vérité.

## Classification V69

| Zone | Nature | Risque | Décision |
|---|---|---:|---|
| `onOpen` | Menu host | Très élevé | Garder unique, audit avant patch |
| `gdvgVersion` | Info UI | Faible | Garder utilisateur |
| `gdvgShowSafetyStatus` | Info sécurité | Faible | Garder utilisateur/admin |
| `gdvgDryRunDashboard` | Contrôle dashboard | Moyen | Garder utilisateur si lecture |
| `gdvgAuditGouvernanceOngletsDryRun` | Audit + log QA | Moyen | Admin/dev ou utilisateur avancé |
| `gdvgWriteManualQaDryRun` | Log QA | Moyen | Admin/dev |
| `gdvgLireZipBooking2025DryRun` | Drive + ZIP + staging | Élevé | Admin/dev import |
| `gdvgScanDepotPartenairesDryRun` | Drive + registre fichiers | Élevé | Admin/dev import |
| `gdvgImportReviewsDryRun` | Placeholder avis | Faible | À remplacer par module reviews |
| `gdvgApplyUiProDryRun` | Placeholder MEP | Moyen | Admin/dev |
| `gdvgProtectReferencesDryRun` | Placeholder protections | Élevé | Admin/dev |
| Helpers parsing/import | Métier import | Élevé | Migrer vers module import Booking |

## Architecture cible

### Module menu central

```text
HPIA_CORE_MENU_CONTROLES_RESERVATIONS_v69.gs
```

Rôle :

- porter l'unique `onOpen` ;
- afficher uniquement les entrées validées ;
- appeler des fonctions publiques stables ;
- ne contenir aucun parsing métier lourd à terme.

### Module import Booking / partenaires

```text
HPIA_IMPORT_BOOKING_PARTNERS_STAGING_vXX.gs
```

Rôle :

- lire Drive ;
- parser ZIP/CSV ;
- écrire staging ;
- écrire registre fichiers ;
- jamais écrire directement dans `01_Reservations_CA`.

### Module QA / logs

```text
HPIA_QA_LOGGING_COMMON_vXX.gs
```

Rôle :

- centraliser append log QA ;
- éviter duplication `writeQaDryRun_` / `gdvgWriteV09Qa_`.

### Module dashboard audit

```text
HPIA_AUDIT_DASHBOARD_READONLY_v90.gs
```

Rôle :

- garder les contrôles dashboard hors menu lourd ;
- exposer une fonction stable appelée par menu.

## Plan de séparation recommandé

### V69A - Documentation et gate

État actuel.

```text
NO_MUTATION
NO_CLASP
NO_RENAME
```

### V69B - Public-safe menu inventory

Créer un inventaire public-safe des entrées menu sans IDs privés.

### V69C - Candidate menu map

Préparer une nouvelle carte :

- menu utilisateur ;
- menu admin/dev ;
- fonctions cachées ;
- fonctions à archiver.

### V69D - Candidate patch, no apply

Préparer un patch candidat du menu, sans installation.

### V69E - Installation contrôlée après backup live

Seulement après nouveau ZIP live Drive et validation humaine.

## Décision finale V69

Ne pas fusionner maintenant.

Ne pas renommer maintenant.

Ne pas installer V66 maintenant.

Prochain lot recommandé :

```text
V69B_MENU_PUBLIC_SAFE_INVENTORY
```

Objectif : produire l'inventaire détaillé du menu et décider ce qui appartient à utilisateur vs admin/dev.
