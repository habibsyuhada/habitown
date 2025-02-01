const fs = require('fs');
const path = require('path');

// Create fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, 'web/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Copy MaterialCommunityIcons font file
const sourceFile = path.join(
  __dirname,
  'node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
);
const targetFile = path.join(fontsDir, 'MaterialCommunityIcons.ttf');

fs.copyFileSync(sourceFile, targetFile);
console.log('Fonts copied successfully!');
