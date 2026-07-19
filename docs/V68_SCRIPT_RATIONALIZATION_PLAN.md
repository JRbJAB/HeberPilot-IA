# HPIA V68 - Plan de rationalisation des scripts installés

Status: OK_HPIA_V68_SCRIPT_RATIONALIZATION_PLAN_READY_NO_INSTALL

## Objectif

Transformer la doctrine V67 en plan opérationnel pour les scripts Apps Script actuels.

V68 ne renomme rien et n'installe rien.

V68 répond à trois questions :

1. quels scripts doivent rester séparés ;
2. quels scripts doivent être fusionnés par métier, fonction ou UI ;
3. dans quel ordre migrer sans casser les menus, les fonctions existantes ni les protections.

## Verdict

Multiplier les scripts n'est pas utile par défaut.

Le projet doit converger vers des modules HPIA cohérents :

- un module menu central ;
- un module backup Drive / CLASP / GitHub ;
- des modules UI dédiés ;
- des modules métier dédiés ;
- des audits read-only regroupés ou archivés après usage ;
- des patchs write-controlled gelés hors menu utilisateur.

## Règles avant toute migration

- Aucun renommage physique sans nouveau ZIP live Drive préalable.
- Aucun renommage sans test de compatibilité des fonctions publiques.
- Aucun second `onOpen`.
- Aucun script write-controlled exposé dans le menu utilisateur.
- Aucune valeur privée Drive / propriété / token dans GitHub public.
- Les fonctions publiques existantes doivent garder des alias de compatibilité pendant au moins une vague de migration.

## Vagues recommandées

### Vague 0 - Gel immédiat

But : empêcher l'empilement.

Décision :

- V66 reste prêt mais non installé.
- Tout nouveau script doit déclarer sa cible de fusion ou son statut temporaire.

### Vague 1 - Backup et gouvernance source

But : garder une base restaurable.

Cible :

```text
HPIA_BACKUP_LIVE_DRIVE_DCG_v57.gs
```

Action :

- renommer proprement le module backup actuel plus tard ;
- garder un seul module backup installé ;
- ne pas créer de variante V58/V59/V60 installée.

### Vague 2 - Menu central

But : stabiliser l'entrée utilisateur.

Cible :

```text
HPIA_CORE_MENU_CONTROLES_RESERVATIONS_vXX.gs
```

Action :

- auditer le fichier menu existant ;
- garder un seul `onOpen` ;
- déplacer progressivement les items techniques vers admin/dev ;
- ne jamais créer un second menu concurrent.

### Vague 3 - UI dédiées

But : garder les UI séparées quand elles ont une vraie surface.

Cibles :

```text
HPIA_UI_GOVERNANCE_TABS_v70.gs
HPIA_UI_ACTIONS_PLANNING_v80.gs
```

Action :

- conserver ces modules séparés ;
- renommer seulement après audit dépendances ;
- ajouter alias de compatibilité pour les anciennes fonctions.

### Vague 4 - Audits read-only

But : éviter un fichier par audit ponctuel.

Cibles possibles :

```text
HPIA_AUDITS_READONLY_DASHBOARD_REVIEWS_TAXE_vXX.gs
```

ou maintien séparé si le domaine est encore actif :

```text
HPIA_AUDIT_DASHBOARD_READONLY_v90.gs
HPIA_REVIEWS_REPUTATION_AUDIT_v92.gs
HPIA_TAXE_SEJOUR_AUDIT_v96.gs
HPIA_IMPORT_BOOKING_SOURCE_AUDIT_v66.gs
```

Action :

- publier / installer seulement les audits utiles ;
- archiver les audits scellés qui ne servent plus ;
- ne pas mélanger lecture seule et écriture contrôlée dans le même module.

### Vague 5 - Modules métier write-controlled

But : isoler le risque.

Cibles :

```text
HPIA_REVIEWS_SOURCE_SEED_CONTROLLED_v94.gs
HPIA_REVIEWS_LAYOUT_MAINTENANCE_v95.gs
HPIA_PATCH_DASHBOARD_CONTROLLED_v91.gs
HPIA_ADMIN_PRODUCT_TABS_SETUP_v100.gs
```

Action :

- garder hors menu utilisateur ;
- appliquer uniquement via fonction explicite APPROVED_MANUAL ;
- supprimer ou archiver la surface apply après scellage quand possible.

### Vague 6 - Publication GitHub progressive

But : publier proprement, sans données privées.

Action :

- publier les variantes public-safe ;
- ne jamais publier les IDs Drive privés ;
- documenter les scripts non publiés mais conservés dans le ZIP live Drive.

## Décision V68 sur V66

V66 est techniquement prêt, mais ne doit pas être installé comme script supplémentaire isolé.

Décision recommandée :

```text
HOLD_UNTIL_IMPORT_BOOKING_SOURCE_MODULE_DECISION
```

Choix possibles ensuite :

```text
MERGE_INTO_HPIA_IMPORT_BOOKING_SOURCE_AUDIT_v66
MERGE_INTO_HPIA_BACKUP_LIVE_DRIVE_DCG_v57_AS_ADMIN_AUDIT
INSTALL_TEMPORARY_READONLY_THEN_RENAME
ABANDON_IF_SUPERSEDED_BY_NEW_IMPORT_MODULE
```

## Sortie attendue après V68

La prochaine étape propre est V69 :

```text
V69 = audit du fichier menu central + plan de séparation menu utilisateur/admin
```

Sans mutation Apps Script, sans CLASP, sans renommage.
