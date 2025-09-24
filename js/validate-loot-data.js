/**
 * Data validation script for loot tables
 * Run this to check for encoding issues, missing ranges, duplicates, etc.
 */

class LootDataValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateLootTable(data, filename) {
    console.log(`\n🔍 Validating ${filename}...`);
    
    this.errors = [];
    this.warnings = [];
    
    // Check for encoding issues
    this.checkEncoding(data);
    
    // Check data structure
    this.checkStructure(data);
    
    // Check for range overlaps and gaps
    this.checkRanges(data);
    
    // Check for duplicates
    this.checkDuplicates(data);
    
    // Report results
    this.reportResults(filename);
    
    return this.errors.length === 0;
  }

  checkEncoding(data) {
    const encodingIssues = [
      'â€™', 'â€œ', 'â€', 'â€˜', 'â€™', 'â€œ', 'â€', 
      'Ã¡', 'Ã©', 'Ã­', 'Ã³', 'Ãº', 'Ã±'
    ];
    
    const jsonString = JSON.stringify(data);
    
    encodingIssues.forEach(issue => {
      if (jsonString.includes(issue)) {
        this.errors.push(`Encoding issue found: "${issue}" - check UTF-8 encoding`);
      }
    });
  }

  checkStructure(data) {
    if (!Array.isArray(data)) {
      this.errors.push('Data should be an array of items');
      return;
    }

    data.forEach((item, index) => {
      if (!item.range || !Array.isArray(item.range) || item.range.length !== 2) {
        this.errors.push(`Item ${index}: Invalid range format`);
      }
      
      if (!item.item || typeof item.item !== 'string') {
        this.errors.push(`Item ${index}: Missing or invalid item name`);
      }
      
      if (!item.rarity || typeof item.rarity !== 'string') {
        this.errors.push(`Item ${index}: Missing or invalid rarity`);
      }

      // Check for suspicious formatting
      if (item.item && item.item.includes('of') && !item.item.includes(' of')) {
        this.warnings.push(`Item ${index}: Possible spacing issue in "${item.item}"`);
      }
    });
  }

  checkRanges(data) {
    // Group by rarity first
    const byRarity = {};
    
    data.forEach((item, index) => {
      if (!item.rarity) return;
      
      if (!byRarity[item.rarity]) {
        byRarity[item.rarity] = [];
      }
      
      byRarity[item.rarity].push({ ...item, originalIndex: index });
    });

    // Check each rarity for range issues
    Object.keys(byRarity).forEach(rarity => {
      const items = byRarity[rarity].sort((a, b) => a.range[0] - b.range[0]);
      
      // Check for overlaps
      for (let i = 0; i < items.length - 1; i++) {
        const current = items[i];
        const next = items[i + 1];
        
        if (current.range[1] >= next.range[0]) {
          this.errors.push(
            `${rarity}: Range overlap between "${current.item}" (${current.range}) and "${next.item}" (${next.range})`
          );
        }
      }
      
      // Check for gaps
      for (let i = 0; i < items.length - 1; i++) {
        const current = items[i];
        const next = items[i + 1];
        
        if (current.range[1] + 1 < next.range[0]) {
          this.warnings.push(
            `${rarity}: Gap in ranges between ${current.range[1]} and ${next.range[0]}`
          );
        }
      }
      
      // Check if ranges cover 1-100
      if (items.length > 0) {
        const first = items[0];
        const last = items[items.length - 1];
        
        if (first.range[0] > 1) {
          this.warnings.push(`${rarity}: Ranges don't start at 1 (starts at ${first.range[0]})`);
        }
        
        if (last.range[1] < 100) {
          this.warnings.push(`${rarity}: Ranges don't end at 100 (ends at ${last.range[1]})`);
        }
      }
    });
  }

  checkDuplicates(data) {
    const itemNames = new Map();
    
    data.forEach((item, index) => {
      if (!item.item) return;
      
      const name = item.item.toLowerCase();
      if (itemNames.has(name)) {
        this.warnings.push(
          `Possible duplicate: "${item.item}" at index ${index} and ${itemNames.get(name)}`
        );
      } else {
        itemNames.set(name, index);
      }
    });
  }

  reportResults(filename) {
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(`✅ ${filename}: No issues found`);
      return;
    }

    if (this.errors.length > 0) {
      console.log(`❌ ${filename}: ${this.errors.length} errors found:`);
      this.errors.forEach(error => console.log(`  • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log(`⚠️  ${filename}: ${this.warnings.length} warnings:`);
      this.warnings.forEach(warning => console.log(`  • ${warning}`));
    }
  }

  // Utility function to fix common encoding issues
  fixEncoding(jsonString) {
    const fixes = {
      'â€™': "'",
      'â€œ': '"',
      'â€': '"',
      'â€˜': "'",
      'â€™': "'",
      'â€œ': '"',
      'â€': '"',
    };

    let fixed = jsonString;
    Object.keys(fixes).forEach(bad => {
      fixed = fixed.replace(new RegExp(bad, 'g'), fixes[bad]);
    });

    return fixed;
  }
}

// Usage example:
async function validateAllLootTables() {
  const validator = new LootDataValidator();
  const tables = ['arcana_loot.json', 'armaments_loot.json', 'implements_loot.json'];
  
  let allValid = true;
  
  for (const table of tables) {
    try {
      const response = await fetch(`/data/${table}`);
      const data = await response.json();
      const isValid = validator.validateLootTable(data, table);
      allValid = allValid && isValid;
    } catch (error) {
      console.error(`Failed to load ${table}:`, error);
      allValid = false;
    }
  }
  
  console.log(`\n${allValid ? '✅' : '❌'} Overall validation: ${allValid ? 'PASSED' : 'FAILED'}`);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LootDataValidator;
}