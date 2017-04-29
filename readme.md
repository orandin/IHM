# Prototype Jarbis

## Remarques
* Pour faire fonctionner les commandes vocales, il faut faire tourner l'application sur un serveur web *(Apache, Nginx, etc.)*.
* Si vous avez Docker sur votre machine, vous pouvez vous référer à la section "Docker" pour instancier un container avec un serveur web *(Nginx)*.
* Il faut ensuite exécuter la commande ```npm install``` pour installer les dépendances.

## Commandes disponibles
|Commandes vocales|Résultat|
|-----------------|--------|
|"Bonjour", "Salut" | "Salut"|
|"Au revoir", "Fermeture" | "A bientôt"|
|"Peux-tu me trouver une route alternative" | "Bien sûr ! La voici. Tapotes sur ton volant 3 fois pour valider." |
| "J'ai besoin d'information" | active l'écran sur le pare-brise |
| "Je n'ai besoin d'information" | désactive l'écran sur le pare-brise |

## Scénarios
### Fatigue
__Etape 1__ : Première avertissement sur la fatigue    
__Etape 2__ : Deuxième avertissement + question sur la redirection vers une aire de repos. Réponse vocale attendue : ["Oui", "Ouais", "Non", "Plus tard"]    
__Etape 3__ : (Si l'utilisateur a choisi Non ou Plus tard à l'étape précédente) Passage en pilote automatique après quelques secondes    
__Etape 4__ : (Si l'utilisateur a choisi Oui à l'étape précédente) Jarbis demande si l'utilisateur souhaite passer pilote automatique. Réponse attendue via clique sur le volant. Côté gauche pou refuser et côté droit pour accepter.

### Détection d'anomalie : essence
__Etape 1__ : avertissement sur le niveau d'essence du véhicule    
__Etape 2__ : Choix de la destination via clique sur le volant.    

### Prévention pour embouteillages
__Etape 1__ : avertissement sur un futur embouteillage. Réponse vocale attendue pour recherche d'itinéraire alternatif : ["Oui", "Ouais", "Non", "Plus tard", "Pas tout de suite"]    
__Etape 2__ : Question sur la validation de l'itinéraire trouvé. Réponse vocale attendue : ["Oui", "Ouais", "Non", "Plus tard", "Pas tout de suite"] ou réponse attendue via clique sur le volant. Côté gauche pou refuser et côté droit pour accepter.    
__Etape 3__ : (Si l'utilisateur a choisi Oui à l'étape précédente) Affichage des informations sur le pare brise     
__Etape 4__ : (Si l'utilisateur a choisi Non à l'étape précédente) Fin du scénario     

### Recherche de stationnement
__Etape 1__ : Jarbis se réveille et nous demande ce que nous voulons faire     
__Etape 2__ : Réponse vocale attendue : ["Recherche parking gratuit", "Oui", "Ouais", "Non", "Non merci", "Non merci Jarbis", "Ce sera tout", "Ce sera tout Jarbis", "Pas pour l'instant", "Pas pour le moment"]    
__Etape 3__ : En fonction de la réponse à l'étape précédente. Jarbis nous guide vers le stationnement le plus proche.    

## Docker

### Créer et démarrer le container :

Éxecutez les commandes suivantes au sein de votre terminal pour créer et démarrer le container :

```bash
docker build -t m1_ihm .
docker run -v $(pwd):/usr/share/nginx/html -p 80:8080 m1_ihm
```

### Arrêter le container

Les commandes ci-dessous permettent d'arrêter tous les containers en cours d'exécution et de les supprimer. Si vous utilisez d'autres containers, n'exécutez pas ces commandes. Arrêtez individuellement le(s) container(s).

```bash
docker kill $(docker ps -aq)
docker rm $(docker ps -aq)
```

### Supprimer l'image docker m1_ihm

Après vous être assuré que tous les containers associés à l'image `m1_ihm` sont arrêtés, vous pouvez executer la commande suivante :

```bash
docker rmi m1_ihm
```
