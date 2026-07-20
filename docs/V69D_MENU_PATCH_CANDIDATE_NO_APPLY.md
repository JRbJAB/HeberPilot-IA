# HPIA V69D - Patch candidat menu, sans application

Status: OK_HPIA_V69D_MENU_PATCH_CANDIDATE_NO_APPLY_READY

## Objet

Préparer un remplacement candidat du bloc `onOpen()` du menu host existant, sans modifier Apps Script.

## Règles

- Ne pas ajouter ce fichier comme nouveau fichier Apps Script.
- Ne pas installer sans backup live frais.
- Ne pas installer sans validation humaine explicite.
- Ne pas créer un deuxième `onOpen`.
- Remplacer uniquement le bloc `onOpen()` existant du fichier menu host, si V69D est un jour validé.

## Base inspectée

Source: ZIP live Drive trace `d85a1fb4`.
Menu host: `GDVG Cockpit — Contrôles & Réservations.gs`.

Préflight sur cette base :

- `onOpen` unique : OK.
- fonctions candidates trouvées : OK.
- séparation menu utilisateur / admin-dev : préparée.
- backup live frais du jour : BLOQUANT avant apply.

## Décision

V69D est seulement un candidat code-only. Aucun patch n'est appliqué.

## Next

V69E doit commencer par créer un nouveau backup live Drive, puis comparer le menu host installé avec la base d85a1fb4 avant toute installation.
