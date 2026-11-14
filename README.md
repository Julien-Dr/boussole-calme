# Boussole calme

Petite appli web pour traverser les crises et les tempêtes d'émotions en famille. Elle s'installe sur le téléphone et fonctionne hors connexion.

## Ce qu'elle contient (V1.2)

- **Mon temps pour me calmer** : un minuteur visuel de 20 minutes (« je vais dans ma chambre »). Il propose aussi des repères pour le parent pendant la crise et une note rapide : déclencheur, lieu, intensité, ce qui s'est passé.
- **En reparler à froid** : un rappel programmé après la crise, puis une discussion guidée en 5 étapes (ce qui s'est passé, ressenti, la prochaine fois, réparation, réconciliation).
- **Temps mort** : un minuteur neutre de 3 à 5 minutes, avec un bouton « il s'est levé, on recommence ».
- **Ma météo** : soleil, nuage, orage ou tornade, avec des outils proposés selon le temps choisi.
- **Ma boîte pour me calmer** : respiration du dragon animée, 5 choses que je vois, serrer son coussin, compter jusqu'à 10, boire un verre d'eau.
- **Je m'ennuie** : « De quoi j'ai besoin ? » (bouger, du nouveau, être avec quelqu'un, fatigué), une pioche de cartes en 5 familles (bouger, construire, créer, réfléchir, imaginer) avec un mode défi chronométré, des cartes personnelles, un nuage de rêverie de 5 minutes, un sac d'attente avec des jeux sans matériel, et un minuteur d'écran avec préavis à 5 puis 2 minutes.
- **Mon minuteur** : un disque qui se vide, avec une durée réglable de 1 à 120 minutes (boutons + et −, ou durées toutes prêtes) et une étiquette facultative (devoirs, rangement…). On peut faire pause et ajouter 1 minute. Une vibration et une notification signalent la fin.
- **Espace parent** (protégé par un code à 4 chiffres) : journal des crises avec quelques chiffres, réglages, export et import des données.

## Vie privée

Les données restent uniquement dans le navigateur de l'appareil (`localStorage`). Rien n'est envoyé sur Internet, et rien n'est enregistré dans ce dépôt. Pour garder une copie ou changer d'appareil, utilisez **Réglages → Exporter**.

## Limites connues

- Les rappels utilisent les notifications du navigateur. Si l'appli est fermée, surtout avec l'économie de batterie d'Android, l'heure exacte n'est pas garantie. Le rappel s'affiche aussi en bandeau à chaque ouverture de l'appli.
- Le code parent sert seulement à tenir les petites mains à l'écart. Ce n'est pas une vraie protection.

## Technique

HTML, CSS et JavaScript, sans dépendance ni étape de compilation. Un service worker (`sw.js`) permet l'usage hors connexion. Les polices Fredoka et Nunito (SIL Open Font License) sont incluses dans le dossier `fonts/`.

Pour tester en local : `python3 -m http.server`, puis ouvrir `http://localhost:8000`.

Repères inspirés de lectures sur le TDAH de l'enfant (notamment N. Franc, *L'hyperactivité chez l'enfant, 100 questions-réponses*). Cette appli ne remplace pas l'avis d'un professionnel de santé.
