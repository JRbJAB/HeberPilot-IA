# HPIA V69C - Carte candidate du menu, sans application

Status: OK_HPIA_V69C_CANDIDATE_MENU_MAP_NO_APPLY_READY

## Objet

Produire la carte candidate du futur menu HPIA à partir de V69 et V69B.

V69C ne modifie rien :

```text
NO_APPS_SCRIPT_MUTATION
NO_CLASP
NO_RENAME
NO_INSTALL
NO_PATCH
```

## Décision

Le futur menu doit rester porté par un seul `onOpen`.

La surface doit être séparée visuellement en deux menus :

```text
🏡 HéberPilot IA
🛠️ HPIA Admin Dev
```

Cela peut rester techniquement dans le même fichier menu host, tant que l'unicité de `onOpen` est conservée.

## Menu candidat utilisateur

```text
🏡 HéberPilot IA
├── Contrôles rapides
│   ├── Statut sécurité
│   └── Contrôler dashboard
├── Réservations
│   └── Contrôler import 2025 test
├── Aide
│   ├── Ouvrir mode d'emploi
│   └── Version script
```

### Fonctions appelées

```text
gdvgShowSafetyStatus
gdvgDryRunDashboard
gdvgDryRunImport2025
gdvgOpenHelp
gdvgVersion
```

### Conditions

- `gdvgDryRunDashboard` doit être clarifié comme contrôle avec trace QA éventuelle.
- `gdvgDryRunImport2025` doit être libellé comme contrôle de staging, pas import réel.
- Aucune entrée Drive scan, protection, MEP ou upsert dans le menu utilisateur.

## Menu candidat admin/dev

```text
🛠️ HPIA Admin Dev
├── Gouvernance
│   ├── Contrôler gouvernance onglets
│   ├── Vérifier dernier lot script avant MAJ
│   └── Ajouter une trace QA
├── Imports & staging
│   ├── Importer ZIP Booking vers staging test
│   ├── Scanner dépôt partenaires
│   ├── Contrôler registre fichiers
│   └── Upsert réservation cadrage dry-run
├── Avis & réputation
│   ├── Import avis multi-source dry-run
│   └── Matrice livre d'or dry-run
├── UI / protections
│   ├── Prévisualiser audit UI
│   ├── Contrôler notice HTML
│   └── Cartographier protections
├── Diagnostics
│   ├── Statut sécurité
│   └── Version script
```

### Fonctions appelées

```text
gdvgAuditGouvernanceOngletsDryRun
gdvgAuditScriptLotsBeforeUpdateDryRun
gdvgWriteManualQaDryRun
gdvgLireZipBooking2025DryRun
gdvgScanDepotPartenairesDryRun
gdvgCheckFilesRegistryDryRun
gdvgUpsertReservationDryRun
gdvgImportReviewsDryRun
gdvgCreateLivreOrTemplateDryRun
gdvgApplyUiProDryRun
gdvgCheckHtmlNoticeDryRun
gdvgProtectReferencesDryRun
gdvgShowSafetyStatus
gdvgVersion
```

## Entrées à ne pas exposer au menu utilisateur

```text
gdvgLireZipBooking2025DryRun
gdvgScanDepotPartenairesDryRun
gdvgUpsertReservationDryRun
gdvgApplyUiProDryRun
gdvgProtectReferencesDryRun
gdvgWriteManualQaDryRun
gdvgAuditScriptLotsBeforeUpdateDryRun
```

## Préflight obligatoire avant patch futur

Avant V69D :

1. nouveau backup live Drive ;
2. vérification `onOpen` unique ;
3. vérification existence de toutes les fonctions appelées ;
4. vérification absence de deuxième menu automatique ;
5. validation des libellés ;
6. plan de rollback ;
7. patch candidat code-only, sans apply.

## Décision sur V69D

V69D peut être préparé uniquement comme patch candidat.

V69D ne doit pas être appliqué sans :

- backup live récent ;
- accord humain explicite ;
- vérification que le fichier menu installé est toujours identique à la base auditée ou que le diff est compris.

## Statut V66

V66 reste en attente.

Le sujet V66 ne doit pas être mélangé avec le patch menu.

```text
V66_STATUS = HOLD_UNTIL_IMPORT_BOOKING_SOURCE_MODULE_DECISION
```
