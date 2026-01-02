const fs = require('fs');
const path = require('path');

function readDirectoryRecursive(dirPath, basePath) {
  const stats = fs.statSync(dirPath);

  if (stats.isDirectory()) {
    const dirContents = fs.readdirSync(dirPath);

    // Check if this is a "leaf folder" with one image and one text file
    const images = dirContents.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    const texts = dirContents.filter(file => /\.txt$/i.test(file));

    if (images.length === 1 && texts.length === 1 && dirContents.length === 2) {
      return {
        image: path.relative(basePath, path.join(dirPath, images[0])),
        text: path.relative(basePath, path.join(dirPath, texts[0]))
      };
    }

    // Otherwise, recursively go deeper
    const result = {};
    dirContents.forEach(item => {
      const itemPath = path.join(dirPath, item);
      result[item] = readDirectoryRecursive(itemPath, basePath);
    });

    return result;
  } else {
    // Files outside leaf folders can be ignored or handled differently if needed
    return null;
  }
}

// Change this to your folder path
const baseFolder = path.join(__dirname, 'assets');

const folderStructure = readDirectoryRecursive(baseFolder, baseFolder);

fs.writeFileSync(
  'data.json',
  JSON.stringify(folderStructure, null, 2),
  'utf-8'
);

console.log('JSON file created successfully!');
