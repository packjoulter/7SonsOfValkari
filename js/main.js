/**
 * D&D Tools JavaScript Module
 * Handles NPC Generator, Loot Generator, Dice Roller, and Fantasy Tensions
 */

class ToolsApp {
  constructor() {
    this.npcGenerator = new NPCGenerator();
    this.lootGenerator = new LootGenerator();
    this.diceRoller = new DiceRoller();
    this.tensionsGenerator = new FantasyTensionsGenerator();
    
    this.init();
  }

  init() {
    console.log('D&D Tools initialized');
  }

  /**
   * Show notification to user
   * @param {string} message - Message to display
   * @param {string} type - Type of notification (success, error, warning)
   */
  static showNotification(message, type = 'success') {
    const container = document.getElementById('toast-container') || document.body;
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    
    container.appendChild(toast);

    // Remove toast after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  /**
   * Show/hide loading indicator
   * @param {string} elementId - ID of loading element
   * @param {boolean} show - Whether to show or hide
   */
  static toggleLoading(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
      element.hidden = !show;
      element.setAttribute('aria-hidden', show ? 'false' : 'true');
    }
  }
}

class NPCGenerator {
  constructor() {
    this.data = {
      firstNames: [
        "Aric", "Bryn", "Caelen", "Dara", "Eryn", "Faelar", "Gorin", "Hale", 
        "Isolde", "Jarek", "Lira", "Milo", "Nyssa", "Orin", "Pip", "Quinn", 
        "Rian", "Syl", "Tess", "Vorn", "Wren", "Xan", "Yara", "Zed", "Kora",
        "Thane", "Vera", "Aldric", "Ember", "Finnick", "Gaia", "Hendrix"
      ],
      lastNames: [
        "Stormborn", "Nightshade", "Ironfist", "Swiftfoot", "Duskwalker", 
        "Brightstar", "Shadowalker", "Oakenshield", "Flameheart", "Silverhand",
        "Underbough", "Fizzlespark", "Strongjaw", "Hogsbottom", "Pebblepocket",
        "Mugmuncher", "Snoreblaster", "Picklefarmer", "Fumblefoot", "Butterbuns",
        "Moonwhisper", "Ironforge", "Goldleaf", "Stormcrow", "Fireborn"
      ],
      races: [
        "🧙‍♂️ Human", "🌿 Elf", "⛏️ Dwarf", "👣 Halfling", "😈 Tiefling",
        "🐲 Dragonborn", "💪 Half-Orc", "🧠 Gnome", "🏹 Half-Elf", 
        "🌙 Genasi", "🐾 Tabaxi", "🦅 Aarakocra"
      ],
      classes: [
        "⚔️ Fighter", "🪄 Wizard", "🗡️ Rogue", "⛪ Cleric", "🏹 Ranger",
        "🎻 Bard", "🛡️ Paladin", "🔥 Warlock", "🌿 Druid", "⚡ Sorcerer",
        "👊 Monk", "🎭 Jester", "🍳 Chef", "📚 Scholar"
      ],
      alignments: [
        "Lawful Good", "Neutral Good", "Chaotic Good",
        "Lawful Neutral", "True Neutral", "Chaotic Neutral",
        "Lawful Evil", "Neutral Evil", "Chaotic Evil"
      ],
      professions: [
        "blacksmith", "innkeeper", "merchant", "herbalist", "thief", 
        "monster hunter", "alchemist", "fisherman", "farmer",
        "rat catcher", "bard-for-hire", "fortune teller", "goblin negotiator",
        "beekeeper", "gravedigger", "local fool", "tavern owner", "guard",
        "scribe", "jeweler", "baker", "carpenter", "shipwright"
      ],
      traits: [
        "has a pet raven that speaks only insults",
        "is always humming funeral dirges",
        "collects shiny rocks they believe are dragon eggs",
        "speaks in rhymes when nervous",
        "is missing a finger from a card game gone wrong",
        "has a mysterious tattoo that glows faintly",
        "is afraid of magic but pretends not to be",
        "wears mismatched boots as a fashion statement",
        "insists they are royalty from a distant land",
        "laughs at their own jokes, even the terrible ones",
        "thinks they're invisible when they close their eyes",
        "is obsessed with cheese and knows 47 varieties",
        "believes their hat grants them magical powers",
        "challenges everyone to arm wrestling contests",
        "only speaks in third person when excited",
        "is convinced they're cursed to stub their toe daily",
        "writes terrible poetry about their daily activities",
        "owns exactly 12 cats and knows all their birthdays",
        "has a chicken sidekick named 'Sir Clucks-a-lot'",
        "wears a fake mustache that everyone pretends not to notice"
      ]
    };

    this.init();
  }

  init() {
    const generateBtn = document.getElementById('generate-npc-btn');
    const copyBtn = document.getElementById('copy-npc-btn');
    
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.generateNPC());
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyNPC());
    }
  }

  getRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  async generateNPC() {
    try {
      ToolsApp.toggleLoading('npc-loading', true);
      
      // Add small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const firstName = this.getRandomFrom(this.data.firstNames);
      const lastName = this.getRandomFrom(this.data.lastNames);
      const race = this.getRandomFrom(this.data.races);
      const npcClass = this.getRandomFrom(this.data.classes);
      const alignment = this.getRandomFrom(this.data.alignments);
      const profession = this.getRandomFrom(this.data.professions);
      const trait = this.getRandomFrom(this.data.traits);

      const npcData = {
        name: `${firstName} ${lastName}`,
        race: race,
        class: npcClass,
        alignment: alignment,
        profession: profession,
        trait: trait
      };

      this.displayNPC(npcData);
      ToolsApp.showNotification('NPC generated successfully!');
      
    } catch (error) {
      console.error('Error generating NPC:', error);
      ToolsApp.showNotification('Failed to generate NPC. Please try again.', 'error');
    } finally {
      ToolsApp.toggleLoading('npc-loading', false);
    }
  }

  displayNPC(npcData) {
    const resultEl = document.getElementById('npc-result');
    if (!resultEl) return;

    resultEl.innerHTML = `
      <div class="npc-card">
        <strong>Name:</strong> ${this.escapeHtml(npcData.name)}<br/>
        <strong>Race:</strong> ${this.escapeHtml(npcData.race)}<br/>
        <strong>Class:</strong> ${this.escapeHtml(npcData.class)}<br/>
        <strong>Alignment:</strong> ${this.escapeHtml(npcData.alignment)}<br/>
        <strong>Profession:</strong> ${this.escapeHtml(npcData.profession)}<br/>
        <strong>Trait:</strong> ${this.escapeHtml(npcData.trait)}
      </div>
    `;
    
    resultEl.classList.add('has-content');
    this.animateResult(resultEl);
  }

  animateResult(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  async copyNPC() {
    try {
      const resultEl = document.getElementById('npc-result');
      const textContent = resultEl?.textContent;
      
      if (!textContent?.trim()) {
        ToolsApp.showNotification('Generate an NPC first!', 'warning');
        return;
      }

      await navigator.clipboard.writeText(textContent);
      ToolsApp.showNotification('NPC copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      ToolsApp.showNotification('Failed to copy NPC.', 'error');
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

class LootGenerator {
  constructor() {
    this.lootTables = new Map();
    this.init();
  }

  init() {
    const form = document.getElementById('loot-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.generateLoot();
      });
    }
  }

  async loadLootTable(tableName) {
    if (this.lootTables.has(tableName)) {
      return this.lootTables.get(tableName);
    }

    try {
      const response = await fetch(`/data/${tableName}_loot.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${tableName} loot table`);
      }
      
      const data = await response.json();
      this.lootTables.set(tableName, data);
      return data;
    } catch (error) {
      console.error('Error loading loot table:', error);
      throw error;
    }
  }

  filterByRarity(data, rarity) {
    return data.filter(entry => 
      entry.rarity.toLowerCase() === rarity.toLowerCase()
    );
  }

  lookupLoot(data, roll) {
    for (const entry of data) {
      const [start, end] = entry.range;
      if (roll >= start && roll <= end) {
        return entry;
      }
    }
    return null;
  }

  async generateLoot() {
    const tableName = document.getElementById('table-select').value;
    const rarity = document.getElementById('rarity-select').value;
    const rollInput = document.getElementById('roll-input');
    const roll = parseInt(rollInput.value, 10);
    const resultEl = document.getElementById('loot-result');

    // Clear previous results
    resultEl.textContent = '';
    resultEl.classList.remove('has-content');

    // Validation
    if (!tableName) {
      ToolsApp.showNotification('Please select a loot table.', 'warning');
      document.getElementById('table-select').focus();
      return;
    }
    if (!rarity) {
      ToolsApp.showNotification('Please select a rarity.', 'warning');
      document.getElementById('rarity-select').focus();
      return;
    }
    if (isNaN(roll) || roll < 1 || roll > 100) {
      ToolsApp.showNotification('Please enter a roll between 1 and 100.', 'warning');
      rollInput.focus();
      return;
    }

    try {
      ToolsApp.toggleLoading('loot-loading', true);
      
      const tableData = await this.loadLootTable(tableName);
      const filtered = this.filterByRarity(tableData, rarity);
      
      if (filtered.length === 0) {
        resultEl.textContent = `No items found for rarity '${rarity}' in the ${tableName} table.`;
        ToolsApp.showNotification(`No ${rarity.toLowerCase()} items found in ${tableName} table.`, 'warning');
        return;
      }

      const loot = this.lookupLoot(filtered, roll);
      
      if (loot) {
        resultEl.innerHTML = `
          <div class="loot-result">
            <div class="loot-item">🎲 <strong>${roll}</strong></div>
            <div class="loot-name"><strong>${this.escapeHtml(loot.item)}</strong></div>
            <div class="loot-rarity rarity-${loot.rarity.toLowerCase().replace(' ', '-')}">${loot.rarity}</div>
          </div>
        `;
        resultEl.classList.add('has-content');
        ToolsApp.showNotification('Loot generated successfully!');
      } else {
        resultEl.textContent = `No item found for roll ${roll} in ${rarity} rarity.`;
        ToolsApp.showNotification('No item found for this roll and rarity combination.', 'warning');
      }
    } catch (error) {
      console.error('Error generating loot:', error);
      ToolsApp.showNotification('Failed to generate loot. Please try again.', 'error');
    } finally {
      ToolsApp.toggleLoading('loot-loading', false);
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

class FantasyTensionsGenerator {
  constructor() {
    this.tensionsData = [];
    this.init();
  }

  async init() {
    try {
      await this.loadTensionsData();
      this.populateRaceDropdown();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize Fantasy Tensions Generator:', error);
    }
  }

  async loadTensionsData() {
    try {
      // Since we don't have the original slurs.json, create appropriate fantasy tensions
      this.tensionsData = [
        {
          title: "Elves",
          list: [
            "Tree-huggers who think they're better than everyone",
            "Pointy-eared perfectionists",
            "Immortal snobs with too much time on their hands",
            "Bow-obsessed forest dwellers",
            "Ancient beings who can't let go of the past"
          ]
        },
        {
          title: "Dwarves", 
          list: [
            "Underground hermits obsessed with shiny rocks",
            "Beard-braiding ale-guzzlers",
            "Short-tempered miners with trust issues",
            "Axe-wielding traditionalists",
            "Stone-stubborn craft masters"
          ]
        },
        {
          title: "Humans",
          list: [
            "Short-lived troublemakers who rush into everything",
            "Ambitious land-grabbers",
            "Jack-of-all-trades, master of none",
            "Adaptable but unreliable wanderers",
            "Political schemers with no respect for tradition"
          ]
        },
        {
          title: "Halflings",
          list: [
            "Food-obsessed homebodies",
            "Small folk with big appetites and small ambitions",
            "Pipe-smoking comfort seekers",
            "Peaceful to a fault, avoiding all conflict",
            "Farmers who think adventure is a dirty word"
          ]
        },
        {
          title: "Orcs",
          list: [
            "Brutish raiders who solve everything with violence",
            "Tribal savages with no appreciation for civilization",
            "Strength-obsessed bullies",
            "Warlike nomads who destroy more than they create",
            "Honor-bound warriors stuck in the past"
          ]
        },
        {
          title: "Tieflings",
          list: [
            "Devil-touched outcasts with trust issues",
            "Horned harbingers of bad luck",
            "Infernal-blooded troublemakers",
            "Cursed beings who can't escape their heritage",
            "Fire-touched souls with abandonment issues"
          ]
        }
      ];
    } catch (error) {
      throw new Error('Failed to load tensions data');
    }
  }

  populateRaceDropdown() {
    const select = document.getElementById('race-select');
    if (!select) return;

    // Clear existing options except the first
    select.innerHTML = '<option value="">Select a fantasy race</option>';
    
    this.tensionsData.forEach(group => {
      const option = document.createElement('option');
      option.value = group.title;
      option.textContent = group.title;
      select.appendChild(option);
    });
  }

  setupEventListeners() {
    const generateBtn = document.getElementById('generate-tension');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.generateTension());
    }
  }

  async generateTension() {
    const selectedRace = document.getElementById('race-select').value;
    const resultEl = document.getElementById('tension-result');

    if (!selectedRace) {
      ToolsApp.showNotification('Please select a race first.', 'warning');
      document.getElementById('race-select').focus();
      return;
    }

    try {
      ToolsApp.toggleLoading('tension-loading', true);
      
      // Add small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));

      const raceData = this.tensionsData.find(group => group.title === selectedRace);
      
      if (!raceData || raceData.list.length === 0) {
        resultEl.textContent = 'No tensions found for this race.';
        ToolsApp.showNotification('No tensions available for selected race.', 'warning');
        return;
      }

      const randomTension = raceData.list[Math.floor(Math.random() * raceData.list.length)];
      
      resultEl.innerHTML = `
        <div class="tension-result">
          <div class="tension-race"><strong>${selectedRace}</strong> are often viewed as:</div>
          <div class="tension-description">"${this.escapeHtml(randomTension)}"</div>
          <div class="tension-note"><em>Use this as a story hook for character development and world-building</em></div>
        </div>
      `;
      
      resultEl.classList.add('has-content');
      ToolsApp.showNotification('Race tension generated!');
      
    } catch (error) {
      console.error('Error generating tension:', error);
      ToolsApp.showNotification('Failed to generate tension. Please try again.', 'error');
    } finally {
      ToolsApp.toggleLoading('tension-loading', false);
    }
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

class DiceRoller {
  constructor() {
    this.rollHistory = [];
    this.maxHistory = 20;
    this.init();
  }

  init() {
    const form = document.getElementById('dice-form');
    const clearHistoryBtn = document.getElementById('clear-history');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.rollDice();
      });
    }

    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => this.clearHistory());
    }

    this.loadHistory();
    this.updateHistoryDisplay();
  }

  async rollDice() {
    const diceInput = document.getElementById('dice-input').value.trim();
    const advantageType = document.querySelector('input[name="advantage"]:checked').value;
    const resultEl = document.getElementById('dice-result');

    if (!diceInput) {
      ToolsApp.showNotification('Please enter a dice expression.', 'warning');
      document.getElementById('dice-input').focus();
      return;
    }

    try {
      const result = this.parseDiceExpression(diceInput, advantageType);
      this.displayDiceResult(result);
      this.addToHistory(result);
      ToolsApp.showNotification('Dice rolled successfully!');
    } catch (error) {
      console.error('Error rolling dice:', error);
      resultEl.textContent = `Error: ${error.message}`;
      ToolsApp.showNotification('Invalid dice expression.', 'error');
    }
  }

  parseDiceExpression(expression, advantageType) {
    // Simple dice parser - supports formats like "1d20+5", "3d6", "2d8-1"
    const diceRegex = /(\d+)d(\d+)([+-]\d+)?/gi;
    let totalResult = 0;
    let rolls = [];
    let formula = expression;

    let match;
    while ((match = diceRegex.exec(expression)) !== null) {
      const numDice = parseInt(match[1]);
      const diceSize = parseInt(match[2]);
      const modifier = match[3] ? parseInt(match[3]) : 0;

      if (numDice > 100) {
        throw new Error('Maximum 100 dice per roll');
      }
      if (diceSize > 1000) {
        throw new Error('Maximum d1000 dice size');
      }

      let diceRolls = [];
      for (let i = 0; i < numDice; i++) {
        diceRolls.push(Math.floor(Math.random() * diceSize) + 1);
      }

      // Handle advantage/disadvantage for d20 rolls
      if (diceSize === 20 && numDice === 1 && advantageType !== 'normal') {
        const secondRoll = Math.floor(Math.random() * 20) + 1;
        diceRolls.push(secondRoll);
        
        if (advantageType === 'advantage') {
          diceRolls = [Math.max(...diceRolls)];
        } else if (advantageType === 'disadvantage') {
          diceRolls = [Math.min(...diceRolls)];
        }
      }

      const diceSum = diceRolls.reduce((sum, roll) => sum + roll, 0);
      const subtotal = diceSum + modifier;
      totalResult += subtotal;

      rolls.push({
        expression: match[0],
        rolls: diceRolls,
        modifier: modifier,
        subtotal: subtotal
      });
    }

    return {
      formula: formula,
      total: totalResult,
      rolls: rolls,
      advantageType: advantageType,
      timestamp: new Date().toLocaleTimeString()
    };
  }

  displayDiceResult(result) {
    const resultEl = document.getElementById('dice-result');
    
    let rollsDisplay = result.rolls.map(roll => {
      const rollsText = roll.rolls.join(', ');
      const modifierText = roll.modifier !== 0 ? ` ${roll.modifier >= 0 ? '+' : ''}${roll.modifier}` : '';
      return `${roll.expression}: [${rollsText}]${modifierText} = ${roll.subtotal}`;
    }).join('<br/>');

    const advantageText = result.advantageType !== 'normal' 
      ? ` <em>(${result.advantageType})</em>` 
      : '';

    resultEl.innerHTML = `
      <div class="dice-result">
        <div class="dice-total">Total: <strong>${result.total}</strong>${advantageText}</div>
        <div class="dice-breakdown">${rollsDisplay}</div>
        <div class="dice-formula">Formula: ${result.formula}</div>
      </div>
    `;
    
    resultEl.classList.add('has-content');
  }

  addToHistory(result) {
    this.rollHistory.unshift(result);
    if (this.rollHistory.length > this.maxHistory) {
      this.rollHistory = this.rollHistory.slice(0, this.maxHistory);
    }
    this.saveHistory();
    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    const historyList = document.getElementById('dice-history-list');
    if (!historyList) return;

    if (this.rollHistory.length === 0) {
      historyList.innerHTML = '<li><em>No rolls yet</em></li>';
      return;
    }

    historyList.innerHTML = this.rollHistory.map(roll => `
      <li>
        <div class="history-time">${roll.timestamp}</div>
        <div class="history-formula">${roll.formula} = <strong>${roll.total}</strong></div>
      </li>
    `).join('');
  }

  clearHistory() {
    this.rollHistory = [];
    this.saveHistory();
    this.updateHistoryDisplay();
    ToolsApp.showNotification('Dice history cleared.');
  }

  saveHistory() {
    try {
      localStorage.setItem('diceRollHistory', JSON.stringify(this.rollHistory));
    } catch (error) {
      console.warn('Could not save dice history:', error);
    }
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('diceRollHistory');
      if (saved) {
        this.rollHistory = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Could not load dice history:', error);
      this.rollHistory = [];
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ToolsApp();
});

// Export classes for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToolsApp, NPCGenerator, LootGenerator, DiceRoller, FantasyTensionsGenerator };
}