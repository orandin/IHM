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
