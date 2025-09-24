/**
 * Quick fix script for loot data encoding and formatting issues
 */

function fixLootData(data) {
  const encodingFixes = {
    'â€™': "'",
    'â€œ': '"',
    'â€': '"',
    'â€˜': "'",
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ'
  };

  const specificFixes = {
    'Ring ofFeather Falling': 'Ring of Feather Falling',
    'Ring ofSpell Storing': 'Ring of Spell Storing'
  };

  return data.map(item => {
    let fixedItem = { ...item };
    
    // Fix encoding in item name
    if (fixedItem.item) {
      let itemName = fixedItem.item;
      
      // Apply encoding fixes
      Object.keys(encodingFixes).forEach(bad => {
        itemName = itemName.replace(new RegExp(bad, 'g'), encodingFixes[bad]);
      });
      
      // Apply specific fixes
      Object.keys(specificFixes).forEach(bad => {
        if (itemName === bad) {
          itemName = specificFixes[bad];
        }
      });
      
      fixedItem.item = itemName;
    }
    
    return fixedItem;
  });
}

// Usage
async function fixAllLootFiles() {
  const files = ['arcana_loot.json', 'armaments_loot.json', 'implements_loot.json', 'relics_loot.json'];
  
  for (const filename of files) {
    try {
      const response = await fetch(`/data/${filename}`);
      const data = await response.json();
      const fixedData = fixLootData(data);
      
      console.log(`Fixed ${filename}`);
      console.log('Copy this to your file:');
      console.log(JSON.stringify(fixedData, null, 2));
      
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
}

// For Node.js/development use
if (typeof module !== 'undefined' && module.exports) {
  const fs = require('fs').promises;
  
  async function fixLootFile(inputPath, outputPath) {
    try {
      const content = await fs.readFile(inputPath, 'utf8');
      const data = JSON.parse(content);
      const fixedData = fixLootData(data);
      
      await fs.writeFile(outputPath || inputPath, JSON.stringify(fixedData, null, 2));
      console.log(`Fixed and saved: ${outputPath || inputPath}`);
      
    } catch (error) {
      console.error('Error fixing file:', error);
    }
  }
  
  module.exports = { fixLootData, fixLootFile };
}