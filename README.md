# Boussole calme

Petite appli web pour traverser les crises et les tempêtes d'émotions en famille. Elle s'installe sur le téléphone et fonctionne hors connexion.

## Ce qu'elle contient (V2.0)

- **Mon temps pour me calmer** : un minuteur visuel de 20 minutes (« je vais dans ma chambre »). Il propose aussi des repères pour le parent pendant la crise et une note rapide : déclencheur, lieu, intensité, ce qui s'est passé.
- **En reparler à froid** : un rappel programmé après la crise, puis une discussion guidée en 5 étapes (ce qui s'est passé, ressenti, la prochaine fois, réparation, réconciliation).
- **Temps mort** : un minuteur neutre de 3 à 5 minutes, avec un bouton « il s'est levé, on recommence ».
- **Ma météo** : soleil, nuage, orage ou tornade, avec des outils proposés selon le temps choisi.
- **Ma boîte pour me calmer** : respiration du dragon animée, 5 choses que je vois, serrer son coussin, compter jusqu'à 10, boire un verre d'eau.
- **Je m'ennuie** : « De quoi j'ai besoin ? » (bouger, du nouveau, être avec quelqu'un, fatigué), une pioche de cartes en 5 familles (bouger, construire, créer, réfléchir, imaginer) avec un mode défi chronométré, des cartes personnelles, un nuage de rêverie de 5 minutes, un sac d'attente avec des jeux sans matériel, et un minuteur d'écran avec préavis à 5 puis 2 minutes.
- **Mon bruit blanc** : un générateur de bruit blanc, rose ou brun fabriqué dans le navigateur (aucun fichier à télécharger). Durée de 5 min à 2 h, montée progressive sur 20 s, extinction progressive sur les dernières minutes, et l'heure d'extinction affichée en grand. Volume réglable, + ou − 15 min, arrêt immédiat.
- **Mon minuteur** : un disque qui se vide, avec une durée réglable de 1 à 120 minutes (boutons + et −, ou durées toutes prêtes) et une étiquette facultative (devoirs, rangement…). On peut faire pause et ajouter 1 minute. Une vibration et une notification signalent la fin.
- **Je range ma chambre** : des missions une par une, chacune avec une image et un petit minuteur. On gagne une étoile par mission réussie, et le total s'accumule. Le parent modifie la liste avec son code : il peut ajouter, réordonner, supprimer et régler les durées.
- **Je m'habille** : le même principe, vêtement par vêtement, dans l'ordre. La liste se modifie aussi par le parent, et l'écran rappelle qu'on peut préparer les vêtements la veille.
- **Ma toilette** : toilettes, mains, visage, dents (pendant tout le cercle du minuteur), coiffure, rangement du lavabo. La liste se modifie par le parent.
- **Mes étoiles** : chaque étoile gagnée (missions et défis réussis) est enregistrée avec sa date. On voit le compte du jour, de la semaine (du lundi au dimanche) et du mois, avec un graphique, le détail par rubrique et les périodes précédentes. Le compteur du jour est affiché sur l'accueil.
- **Expliquer le TDAH à mon enfant** (dans Pour le parent) : des repères pour en parler, des vidéos et des lectures, et la possibilité d'ajouter ses propres liens.
- **Mes devoirs** : goûter d'abord, puis une étape à la fois (routine inspirée des conseils de l'association TDAH Partout Pareil).
- **Ils en parlent** (dans « Expliquer le TDAH ») : dix personnes qui ont parlé elles-mêmes de leur diagnostic (Louane, Philippe Katerine, Simone Biles, Michel Cymes, Jérémy Ferrari, Manu Payet, Maïtena Biraben, Laure Bailacq, Alice Gendron, Catherine Testa), avec un lien vers leur interview. Les trois premières se regardent avec un enfant.
- **Fiches pour le parent** : résumés de fiches sur les devoirs, l'opposition (TOP), le sommeil, l'école, la fratrie et les aides (répit, dispositifs, MDPH). Les documents complets sont sur le site de l'association.
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
