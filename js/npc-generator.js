// NPC Generator Module
class NPCGenerator {
  constructor() {
    this.npcData = {
      firstNames: [
        "Aric", "Bryn", "Caelen", "Dara", "Eryn", "Faelar", "Gorin", "Hale", 
        "Isolde", "Jarek", "Lira", "Milo", "Nyssa", "Orin", "Pip", "Quinn", 
        "Rian", "Syl", "Tess", "Vorn", "Wren", "Xan", "Yara", "Zed"
      ],
      lastNames: [
        "Stormborn", "Nightshade", "Ironfist", "Swiftfoot", "Duskwalker", 
        "Brightstar", "Shadowalker", "Oakenshield", "Flameheart", "Silverhand",
        "Underbough", "Fizzlespark", "Strongjaw", "Hogsbottom", "Pebblepocket",
        "Mugmuncher", "Snoreblaster", "Picklefarmer", "Fumblefoot", "Butterbuns"
      ],
      races: [
        "🧙‍♂️ Human", "🌿 Elf", "⛏️ Dwarf", "👣 Halfling", "😈 Tiefling",
        "🐲 Dragonborn", "💪 Half-Orc", "🧠 Gnome"
      ],
      classes: [
        "⚔️ Fighter", "🪄 Wizard", "🗡️ Rogue", "⛪ Cleric", "🏹 Ranger",
        "🎻 Bard", "🛡️ Paladin", "🔥 Warlock", "🍳 Chef", "🎪 Jester"
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
        "beekeeper", "gravedigger", "local fool"
      ],
      traits: [
        "has a pet raven", "is always humming", "collects shiny rocks",
        "speaks in rhymes", "is missing a finger", "has a mysterious tattoo",
        "is afraid of magic", "wears mismatched boots",
        "insists they are a prince/princess", "laughs at their own jokes",
        "thinks they're invisible when they close their eyes",
        "is obsessed with cheese", "believes their hat is magical",
        "challenges everyone to arm wrestle", "only speaks in third person"
      ]
    };

    this.init();
  }

  init() {
    const generateBtn = document.getElementById("generate-npc-btn");
    const copyBtn = document.getElementById("copy-npc-btn");
    
    if (generateBtn) generateBtn.addEventListener("click", () => this.generateNPC());
    if (copyBtn) copyBtn.addEventListener("click", () => this.copyNPC());
  }

  getRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateNPC() {
    try {
      const firstName = this.getRandomFrom(this.npcData.firstNames);
      const lastName = this.getRandomFrom(this.npcData.lastNames);
      const race = this.getRandomFrom(this.npcData.races);
      const npcClass = this.getRandomFrom(this.npcData.classes);
      const alignment = this.getRandomFrom(this.npcData.alignments);
      const profession = this.getRandomFrom(this.npcData.professions);
      const trait = this.getRandomFrom(this.npcData.traits);

      const npcResultText = `
        <strong>Name:</strong> ${firstName} ${lastName}<br/>
        <strong>Race:</strong> ${race}<br/>
        <strong>Class:</strong> ${npcClass}<br/>
        <strong>Alignment:</strong> ${alignment}<br/>
        <strong>Profession:</strong> ${profession}<br/>
        <strong>Trait:</strong> ${trait}
      `;

      const resultEl = document.getElementById("npc-result");
      if (resultEl) {
        resultEl.innerHTML = npcResultText;
        this.animateResult(resultEl);
      }
    } catch (error) {
      console.error('Error generating NPC:', error);
      this.showError('Failed to generate NPC. Please try again.');
    }
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
      const text = document.getElementById("npc-result")?.innerText;
      if (!text?.trim()) {
        this.showError("Generate an NPC first!");
        return;
      }

      await navigator.clipboard.writeText(text);
      this.showSuccess("NPC copied to clipboard!");
    } catch (error) {
      console.error('Failed to copy:', error);
      this.showError("Failed to copy NPC.");
    }
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showNotification(message, type) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      background-color: ${type === 'error' ? '#e74c3c' : '#27ae60'};
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NPCGenerator();
});