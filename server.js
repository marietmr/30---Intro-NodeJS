import fs from "fs";
import path from "path";
import os from "os";

console.log("Architecture du système: ", os.platform());
//Créer dossier et y ajoutet fichier
function createFolderAndFile(folderPath, fileName, content = ''){
  //Créer le dossier s'il n'existe pas
  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true});
  }

  //Créer le fichier et y ajouter du contenu
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, content);
}

//Créer fichier à la racine
createFolderAndFile('.', 'index.html', '<html><body><h1>Welcome</h1></body></html>');
createFolderAndFile('.', 'style.css', '* { font-family: Arial, sans-serif; }');

// Créer les dossiers et fichiers pour contact
createFolderAndFile('contact', 'index.html', '<html><body><h1>Contact Page</h1></body></html>');
createFolderAndFile('contact', 'style.css', '* { background-color: lightblue; }');

// Créer les dossiers et fichiers pour about
createFolderAndFile('about', 'index.html', '<html><body><h1>About Page</h1></body></html>');
createFolderAndFile('about', 'style.css', '* { background-color: lightgreen; }');

// Créer les dossiers et fichiers pour blog
createFolderAndFile('blog', 'index.html', '<html><body><h1>Blog Page</h1></body></html>');
createFolderAndFile('blog', 'style.css', '* { background-color: lightyellow; }');

console.log("La structure de fichiers a été créée avec succès !");