import fs from "fs";
import path from "path";
import os from "os";
import http from 'http';

const server = http.createServer();

//Surveille les évenements de requêtes
server.on("request", (request, response) => {
  console.log("A request has been submitted");
  // Récupère le chemin de l'url
  let requestedPath = request.url;
  // Si l'url est "/", on redirige vers "index.html"
  if (requestedPath === "/") {
      requestedPath = "/index.html";
  }

  // Résoudre chemin absolu du fichier demandé
  const filePath = path.join('.', requestedPath);
  // Vérifie si le fichier existe
  fs.exists(filePath, exists => {
      if (!exists) {
          response.statusCode = 404;
          response.end("Page non trouvée");
      } else {
          fs.readFile(filePath, (err, data) => {
              if (err) {
                  response.statusCode = 500;
                  response.end("Erreur lors de la lecture du fichier");
              } else {
                  response.setHeader('Content-Type', 'text/html');
                  response.end(data);
              }
          });
      }
  });
});

//Fait en sorte que le serveur écoute sur le port 3000
server.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000");
});

//Créer un fichier si nécessaire
function createFolderAndFile(folderPath, fileName, content = ''){
  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true});
  }
  const filePath = path.join(folderPath, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
}

//Créer fichier à la racine
createFolderAndFile('.', 'index.html', '<html><link rel="stylesheet" href="style.css"><body><h1>Welcome</h1></body></html>');
createFolderAndFile('.', 'style.css', '* { font-family: Arial, sans-serif; }');

// Créer les dossiers et fichiers pour contact
createFolderAndFile('contact', 'index-contact.html', '<html><link rel="stylesheet" href="style.css"><body><h1>Contact Page</h1></body></html>');
createFolderAndFile('contact', 'style-contact.css', '* { background-color: lightblue; }');

// Créer les dossiers et fichiers pour about
createFolderAndFile('about', 'index-about.html', '<html><link rel="stylesheet" href="style.css"><body><h1>About Page</h1></body></html>');
createFolderAndFile('about', 'style-about.css', '* { background-color: lightgreen; }');

// Créer les dossiers et fichiers pour blog
createFolderAndFile('blog', 'index-blog.html', '<html><link rel="stylesheet" href="style.css"><body><h1>Blog Page</h1></body></html>');
createFolderAndFile('blog', 'style-blog.css', '* { background-color: lightyellow; }');

console.log("La structure de fichiers a été créée avec succès !");