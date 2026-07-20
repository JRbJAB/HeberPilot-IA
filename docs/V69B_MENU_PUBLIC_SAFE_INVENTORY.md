# HPIA V69B - Inventaire public-safe du menu

Status: OK_HPIA_V69B_MENU_PUBLIC_SAFE_INVENTORY_READY_NO_MUTATION

## Objet

Transformer l'audit V69 en inventaire actionnable du menu, sans publier le code brut privé.

V69B ne modifie rien :

```text
NO_APPS_SCRIPT_MUTATION
NO_CLASP
NO_RENAME
NO_INSTALL
NO_RAW_PRIVATE_SOURCE_PUBLICATION
```

## Décision

Le menu actuel doit être séparé en deux surfaces :

1. menu utilisateur simple ;
2. menu admin/dev avancé.

Le fichier menu actuel reste source de vérité dans le ZIP Drive `d85a1fb4`, mais son code brut ne doit pas être publié tel quel sur GitHub public car il contient une configuration Drive privée.

## Menu utilisateur recommandé

Surface courte, utile, non anxiogène.

```text
🏡 HéberPilot IA
├── Contrôles rapides
│   ├── Statut sécurité
│   ├── Contrôler dashboard
│   └── Ouvrir mode d'emploi
├── Réservations
│   └── Contrôler import 2025 test
└── Aide
    ├── Version script
    └── Ouvrir mode d'emploi
```

Règle :

- pas d'entrée qui scanne Drive ;
- pas d'entrée qui écrit staging ;
- pas d'entrée protection/MEP/apply ;
- pas d'entrée de migration technique.

## Menu admin/dev recommandé

Surface technique, assumée.

```text
🛠️ HPIA Admin Dev
├── Gouvernance
│   ├── Contrôler gouvernance onglets
│   ├── Vérifier dernier lot script avant MAJ
│   └── Écrire log QA dry-run
├── Imports & staging
│   ├── Lire ZIP Booking 2025 / CSV vers staging
│   ├── Scanner dépôt partenaires
│   ├── Contrôler registre fichiers
│   └── Upsert réservation cadrage dry-run
├── Avis & réputation
│   ├── Import avis multi-source dry-run
│   └── Matrice livre d'or dry-run
├── UI / protections
│   ├── Audit UI onglets clés
│   ├── Contrôler notice HTML
│   └── Cartographier protections
└── Diagnostics
    ├── Statut sécurité
    └── Version script
```

## Fonctions à cacher du menu utilisateur

À retirer du menu utilisateur ou déplacer admin/dev :

- `gdvgWriteManualQaDryRun`
- `gdvgAuditGouvernanceOngletsDryRun`
- `gdvgAuditScriptLotsBeforeUpdateDryRun`
- `gdvgLireZipBooking2025DryRun`
- `gdvgScanDepotPartenairesDryRun`
- `gdvgUpsertReservationDryRun`
- `gdvgApplyUiProDryRun`
- `gdvgProtectReferencesDryRun`

## Fonctions à garder visibles utilisateur

Conserver côté utilisateur :

- `gdvgShowSafetyStatus`
- `gdvgDryRunDashboard`, si garde read/log clarifiée ;
- `gdvgDryRunImport2025`, si libellé clarifié ;
- `gdvgVersion`
- `gdvgOpenHelp`

## Fonctions à migrer hors menu central à terme

À sortir progressivement du menu host :

- parsing ZIP Booking ;
- parsing CSV Booking ;
- scan dépôt partenaires Drive ;
- append registre fichiers ;
- append logs QA ;
- helpers import.

Modules cibles :

```text
HPIA_IMPORT_BOOKING_PARTNERS_STAGING_vXX.gs
HPIA_QA_LOGGING_COMMON_vXX.gs
HPIA_AUDIT_DASHBOARD_READONLY_v90.gs
```

## Libellés à clarifier

Remplacer les libellés ambigus :

```text
Lire ZIP Booking 2025 / CSV → staging
```

par :

```text
Admin - Importer ZIP Booking vers staging test
```

Remplacer :

```text
Écrire log QA dry-run
```

par :

```text
Admin - Ajouter une trace QA
```

Remplacer :

```text
Audit UI onglets clés
```

par :

```text
Admin - Prévisualiser audit UI
```

## Gate avant patch

Avant tout patch menu :

1. créer un nouveau ZIP live Drive ;
2. vérifier que `onOpen` est toujours unique ;
3. préparer un patch candidat sans apply ;
4. vérifier que toutes les fonctions appelées existent ;
5. valider la séparation user/admin ;
6. installer seulement après validation humaine.

## Next

V69C recommandé :

```text
V69C_CANDIDATE_MENU_MAP_NO_APPLY
```

Objectif : produire la carte finale de menu candidat, toujours sans patch.
