const heroImg = document.getElementById("heroImg");
const heroName = document.getElementById("heroName");
const modal = document.getElementById("modal");
const heroGrid = document.getElementById("heroGrid");
const result = document.getElementById("result");
const rightPanel = document.querySelector(".right");

/* ================= HERO UTILS ================= */

function heroToFile(name) {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}
function heroPickerImg(name) {
  return `Assets/hero/${heroToFile(name)}.png`;
}
function heroDisplayImg(name) {
  return `Assets/DisplayIcon/${heroToFile(name)}.png`;
}

/* ================= HERO LIST ================= */

const heroNames = ["Adam Warlock","Angela","Black Panther","Black Widow","Blade","Bruce Banner",
  "Captain America","Cloak & Dagger","Daredevil","Doctor Strange",
  "Emma Frost","Gambit","Groot","Hawkeye","Hela","Human Torch",
  "Invisible Woman","Iron Fist","Iron Man","Jeff the Land Shark",
  "Loki","Luna Snow","Magik","Magneto","Mantis","Mister Fantastic",
  "Moon Knight","Namor","Peni Parker","Phoenix","Psylocke",
  "Rocket Raccoon","Rogue","Scarlet Witch","Spider-Man",
  "Squirrel Girl","Star-Lord","Storm","The Punisher","The Thing",
  "Thor","Ultron","Venom","Winter Soldier","Wolverine"];
const heroes = heroNames.map(name => ({
  name,
  pickerImg: heroPickerImg(name),
  displayImg: heroDisplayImg(name)
}));

let currentHero = null;

/* ================= RANK SYSTEM ================= */

const rankOrder = ["Agent","Knight","Captain","Centurion","Lord"];
const rankCaps = {
  Agent: 500,
  Knight: 1200,
  Captain: 2000,
  Centurion: 2400
};

/* ================= HERO MISSIONS ================= */

const heroMissions = {
// ===== HERO MISSIONS (A–H) =====

  "Adam Warlock": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 20, pts: 50, name: "KOs + Assists" },
      task4: { req: 5, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 12, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 80, pts: 50, name: "KOs + Assists" },
      task4: { req: 20, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 100, pts: 50, name: "KOs + Assists" },
      task4: { req: 25, pts: 50, name: "Revives (Karmic Revival)" }
    }
  },

  "Angela": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 3000, pts: 50, name: "Attack Charge" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 7500, pts: 50, name: "Attack Charge" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 60000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 12000, pts: 50, name: "Attack Charge" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 75000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 15000, pts: 50, name: "Attack Charge" }
    }
  },

  "Adam Warlock": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 20, pts: 50, name: "KOs + Assists" },
      task4: { req: 5, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 12, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 80, pts: 50, name: "KOs + Assists" },
      task4: { req: 20, pts: 50, name: "Revives (Karmic Revival)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 100, pts: 50, name: "KOs + Assists" },
      task4: { req: 25, pts: 50, name: "Revives (Karmic Revival)" }
    }
  },

  "Angela": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 3000, pts: 50, name: "Attack Charge" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 7500, pts: 50, name: "Attack Charge" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 60000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 12000, pts: 50, name: "Attack Charge" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 75000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 15000, pts: 50, name: "Attack Charge" }
    }
  },

  "Black Panther": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 7500, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 30, pts: 50, name: "Spirit Rend Uses" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 70, pts: 50, name: "Spirit Rend Uses" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 120, pts: 50, name: "Spirit Rend Uses" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 38000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 150, pts: 50, name: "Spirit Rend Uses" }
    }
  },

  "Black Widow": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 6000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 5, pts: 50, name: "Critical KOs" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 15, pts: 50, name: "Critical KOs" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 25, pts: 50, name: "Critical KOs" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 30, pts: 50, name: "Critical KOs" }
    }
  },

  "Blade": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 2500, pts: 50, name: "Lifesteal (Bloodline Awakening)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 6250, pts: 50, name: "Lifesteal (Bloodline Awakening)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 10000, pts: 50, name: "Lifesteal (Bloodline Awakening)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 12500, pts: 50, name: "Lifesteal (Bloodline Awakening)" }
    }
  },

  "Bruce Banner": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 21000, pts: 50, name: "Damage Blocked" },
      task3: { req: 10, pts: 50, name: "KOs" },
      task4: { req: 20, pts: 50, name: "Indestructible Guard Allies" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Blocked" },
      task3: { req: 25, pts: 50, name: "KOs" },
      task4: { req: 50, pts: 50, name: "Indestructible Guard Allies" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 85000, pts: 50, name: "Damage Blocked" },
      task3: { req: 42, pts: 50, name: "KOs" },
      task4: { req: 80, pts: 50, name: "Indestructible Guard Allies" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 110000, pts: 50, name: "Damage Blocked" },
      task3: { req: 55, pts: 50, name: "KOs" },
      task4: { req: 100, pts: 50, name: "Indestructible Guard Allies" }
    }
  },

  "Captain America": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 3500, pts: 50, name: "Bonus Health (Freedom Charge)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 9000, pts: 50, name: "Bonus Health (Freedom Charge)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 70000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 14000, pts: 50, name: "Bonus Health (Freedom Charge)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 90000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 18000, pts: 50, name: "Bonus Health (Freedom Charge)" }
    }
  },

  "Cloak & Dagger": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 15, pts: 50, name: "KOs + Assists" },
      task4: { req: 10, pts: 50, name: "Terror Cape Hits" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 40, pts: 50, name: "KOs + Assists" },
      task4: { req: 24, pts: 50, name: "Terror Cape Hits" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 65, pts: 50, name: "KOs + Assists" },
      task4: { req: 36, pts: 50, name: "Terror Cape Hits" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 80, pts: 50, name: "KOs + Assists" },
      task4: { req: 45, pts: 50, name: "Terror Cape Hits" }
    }
  },

  "Daredevil": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 7500, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 140, pts: 50, name: "Fury" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 350, pts: 50, name: "Fury" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 560, pts: 50, name: "Fury" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 38000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 700, pts: 50, name: "Fury" }
    }
  },

  "Doctor Strange": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 21000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 6, pts: 50, name: "Souls Released (Eye of Agamotto)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 15, pts: 50, name: "Souls Released (Eye of Agamotto)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 85000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 24, pts: 50, name: "Souls Released (Eye of Agamotto)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 110000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 30, pts: 50, name: "Souls Released (Eye of Agamotto)" }
    }
  },

  "Emma Frost": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 21000, pts: 50, name: "Damage Blocked" },
      task3: { req: 15, pts: 50, name: "KOs" },
      task4: { req: 6, pts: 50, name: "Sentiences Controlled (Psychic Spear)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Blocked" },
      task3: { req: 35, pts: 50, name: "KOs" },
      task4: { req: 15, pts: 50, name: "Sentiences Controlled (Psychic Spear)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 85000, pts: 50, name: "Damage Blocked" },
      task3: { req: 60, pts: 50, name: "KOs" },
      task4: { req: 24, pts: 50, name: "Sentiences Controlled (Psychic Spear)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 110000, pts: 50, name: "Damage Blocked" },
      task3: { req: 75, pts: 50, name: "KOs" },
      task4: { req: 30, pts: 50, name: "Sentiences Controlled (Psychic Spear)" }
    }
  },

  "Gambit": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 9000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 50, pts: 50, name: "Sleight of Hand Stacks" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 23000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 125, pts: 50, name: "Sleight of Hand Stacks" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Healing" },
      task3: { req: 95, pts: 50, name: "KOs + Assists" },
      task4: { req: 200, pts: 50, name: "Sleight of Hand Stacks" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Healing" },
      task3: { req: 120, pts: 50, name: "KOs + Assists" },
      task4: { req: 250, pts: 50, name: "Sleight of Hand Stacks" }
    }
  },

  "Groot": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 27000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 50, pts: 50, name: "Wooden Walls Built" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 70000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 120, pts: 50, name: "Wooden Walls Built" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 110000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 200, pts: 50, name: "Wooden Walls Built" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 140000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 250, pts: 50, name: "Wooden Walls Built" }
    }
  },

  "Hawkeye": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 12, pts: 50, name: "Final Hits" },
      task4: { req: 40, pts: 50, name: "Hypersonic Arrow Hits" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 30, pts: 50, name: "Final Hits" },
      task4: { req: 100, pts: 50, name: "Hypersonic Arrow Hits" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 45, pts: 50, name: "Final Hits" },
      task4: { req: 150, pts: 50, name: "Hypersonic Arrow Hits" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 55, pts: 50, name: "Final Hits" },
      task4: { req: 180, pts: 50, name: "Hypersonic Arrow Hits" }
    }
  },

  "Hela": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 11000, pts: 50, name: "Damage Dealt" },
      task3: { req: 12, pts: 50, name: "Final Hits" },
      task4: { req: 6, pts: 50, name: "Enemies Stunned (Soul Drainer)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 28000, pts: 50, name: "Damage Dealt" },
      task3: { req: 30, pts: 50, name: "Final Hits" },
      task4: { req: 15, pts: 50, name: "Enemies Stunned (Soul Drainer)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 25, pts: 50, name: "Enemies Stunned (Soul Drainer)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Dealt" },
      task3: { req: 65, pts: 50, name: "Final Hits" },
      task4: { req: 32, pts: 50, name: "Enemies Stunned (Soul Drainer)" }
    }
  },

  "Human Torch": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Flame Fields Created" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 500, pts: 50, name: "Flame Fields Created" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 800, pts: 50, name: "Flame Fields Created" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 1000, pts: 50, name: "Flame Fields Created" }
    }
  },

  "Invisible Woman": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 5000, pts: 50, name: "Damage Blocked (Guardian Shield)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 12500, pts: 50, name: "Damage Blocked (Guardian Shield)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 95, pts: 50, name: "KOs + Assists" },
      task4: { req: 20000, pts: 50, name: "Damage Blocked (Guardian Shield)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 120, pts: 50, name: "KOs + Assists" },
      task4: { req: 25000, pts: 50, name: "Damage Blocked (Guardian Shield)" }
    }
  },

  "Iron Fist": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 6000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 1500, pts: 50, name: "Bonus Health (Dragon's Defense)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 3700, pts: 50, name: "Bonus Health (Dragon's Defense)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 6000, pts: 50, name: "Bonus Health (Dragon's Defense)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 45, pts: 50, name: "Final Hits" },
      task4: { req: 7500, pts: 50, name: "Bonus Health (Dragon's Defense)" }
    }
  },

  "Iron Man": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 50, pts: 50, name: "Repulsor Blast Hits" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 120, pts: 50, name: "Repulsor Blast Hits" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Repulsor Blast Hits" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 250, pts: 50, name: "Repulsor Blast Hits" }
    }
  },

  "Jeff the Land Shark": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 20, pts: 50, name: "KOs + Assists" },
      task4: { req: 4, pts: 50, name: "Heroes Swallowed (It's Jeff!)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 50, pts: 50, name: "KOs + Assists" },
      task4: { req: 10, pts: 50, name: "Heroes Swallowed (It's Jeff!)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 80, pts: 50, name: "KOs + Assists" },
      task4: { req: 16, pts: 50, name: "Heroes Swallowed (It's Jeff!)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 100, pts: 50, name: "KOs + Assists" },
      task4: { req: 20, pts: 50, name: "Heroes Swallowed (It's Jeff!)" }
    }
  },

  "Loki": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 40, pts: 50, name: "Illusions Conjured" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 100, pts: 50, name: "Illusions Conjured" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 95, pts: 50, name: "KOs + Assists" },
      task4: { req: 150, pts: 50, name: "Illusions Conjured" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 120, pts: 50, name: "KOs + Assists" },
      task4: { req: 180, pts: 50, name: "Illusions Conjured" }
    }
  },

  "Luna Snow": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 12000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 4, pts: 50, name: "Enemies Frozen (Absolute Zero)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 10, pts: 50, name: "Enemies Frozen (Absolute Zero)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Healing" },
      task3: { req: 95, pts: 50, name: "KOs + Assists" },
      task4: { req: 16, pts: 50, name: "Enemies Frozen (Absolute Zero)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 60000, pts: 50, name: "Healing" },
      task3: { req: 120, pts: 50, name: "KOs + Assists" },
      task4: { req: 20, pts: 50, name: "Enemies Frozen (Absolute Zero)" }
    }
  },

  "Magik": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 2500, pts: 50, name: "Bonus Health (Limbo's Might)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 6000, pts: 50, name: "Bonus Health (Limbo's Might)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 10000, pts: 50, name: "Bonus Health (Limbo's Might)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 13000, pts: 50, name: "Bonus Health (Limbo's Might)" }
    }
  },

  "Magneto": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Blocked" },
      task3: { req: 15, pts: 50, name: "KOs" },
      task4: { req: 2000, pts: 50, name: "Damage Absorbed (Meteor M)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Blocked" },
      task3: { req: 35, pts: 50, name: "KOs" },
      task4: { req: 5000, pts: 50, name: "Damage Absorbed (Meteor M)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 70000, pts: 50, name: "Damage Blocked" },
      task3: { req: 60, pts: 50, name: "KOs" },
      task4: { req: 8000, pts: 50, name: "Damage Absorbed (Meteor M)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 90000, pts: 50, name: "Damage Blocked" },
      task3: { req: 75, pts: 50, name: "KOs" },
      task4: { req: 10000, pts: 50, name: "Damage Absorbed (Meteor M)" }
    }
  },

  "Mantis": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 5, pts: 50, name: "Enemies Sedated (Spore Slumber)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 65, pts: 50, name: "KOs + Assists" },
      task4: { req: 12, pts: 50, name: "Enemies Sedated (Spore Slumber)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 100, pts: 50, name: "KOs + Assists" },
      task4: { req: 20, pts: 50, name: "Enemies Sedated (Spore Slumber)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 130, pts: 50, name: "KOs + Assists" },
      task4: { req: 25, pts: 50, name: "Enemies Sedated (Spore Slumber)" }
    }
  },

  "Mister Fantastic": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 15, pts: 50, name: "Inflated State Entries" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 35, pts: 50, name: "Inflated State Entries" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 60, pts: 50, name: "Inflated State Entries" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 75, pts: 50, name: "Inflated State Entries" }
    }
  },

  "Moon Knight": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 400, pts: 50, name: "Ankh Bounces" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 1000, pts: 50, name: "Ankh Bounces" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 1500, pts: 50, name: "Ankh Bounces" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 2000, pts: 50, name: "Ankh Bounces" }
    }
  },

  "Namor": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 50, pts: 50, name: "Monstro Spawns Summoned" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 120, pts: 50, name: "Monstro Spawns Summoned" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Monstro Spawns Summoned" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 250, pts: 50, name: "Monstro Spawns Summoned" }
    }
  },

  "Peni Parker": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Blocked" },
      task3: { req: 15, pts: 50, name: "KOs" },
      task4: { req: 2500, pts: 50, name: "Arachno-Mine Damage" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Blocked" },
      task3: { req: 35, pts: 50, name: "KOs" },
      task4: { req: 6000, pts: 50, name: "Arachno-Mine Damage" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 60000, pts: 50, name: "Damage Blocked" },
      task3: { req: 60, pts: 50, name: "KOs" },
      task4: { req: 10000, pts: 50, name: "Arachno-Mine Damage" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 75000, pts: 50, name: "Damage Blocked" },
      task3: { req: 75, pts: 50, name: "KOs" },
      task4: { req: 15000, pts: 50, name: "Arachno-Mine Damage" }
    }
  },

  "Psylocke": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 7500, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 40, pts: 50, name: "Invisibility Seconds (Psychic Stealth)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 100, pts: 50, name: "Invisibility Seconds (Psychic Stealth)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 160, pts: 50, name: "Invisibility Seconds (Psychic Stealth)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 38000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Invisibility Seconds (Psychic Stealth)" }
    }
  },

  "Rocket Raccoon": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 6, pts: 50, name: "Revives (B.R.B.)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 60, pts: 50, name: "KOs + Assists" },
      task4: { req: 15, pts: 50, name: "Revives (B.R.B.)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 95, pts: 50, name: "KOs + Assists" },
      task4: { req: 25, pts: 50, name: "Revives (B.R.B.)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 120, pts: 50, name: "KOs + Assists" },
      task4: { req: 30, pts: 50, name: "Revives (B.R.B.)" }
    }
  },

  "Rogue": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 10, pts: 50, name: "Ability Absorptions" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 25, pts: 50, name: "Ability Absorptions" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 70000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 40, pts: 50, name: "Ability Absorptions" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 90000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 50, pts: 50, name: "Ability Absorptions" }
    }
  },

  "Scarlet Witch": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 7500, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 6, pts: 50, name: "Enemies Stunned (Dark Seal)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 15, pts: 50, name: "Enemies Stunned (Dark Seal)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 25, pts: 50, name: "Enemies Stunned (Dark Seal)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 38000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 35, pts: 50, name: "Enemies Stunned (Dark Seal)" }
    }
  },

  "Spider-Man": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 6000, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 40, pts: 50, name: "Spider-Tracer Triggers" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 15000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 100, pts: 50, name: "Spider-Tracer Triggers" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 160, pts: 50, name: "Spider-Tracer Triggers" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Spider-Tracer Triggers" }
    }
  },

  "Squirrel Girl": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 10, pts: 50, name: "Enemies Immobilized (Squirrel Blockade)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 28, pts: 50, name: "Enemies Immobilized (Squirrel Blockade)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 45, pts: 50, name: "Enemies Immobilized (Squirrel Blockade)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 55, pts: 50, name: "Enemies Immobilized (Squirrel Blockade)" }
    }
  },

  "Star-Lord": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 1000, pts: 50, name: "Magazines Switched (Stellar Shift)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 2500, pts: 50, name: "Magazines Switched (Stellar Shift)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 4000, pts: 50, name: "Magazines Switched (Stellar Shift)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 5000, pts: 50, name: "Magazines Switched (Stellar Shift)" }
    }
  },

  "Storm": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 75, pts: 50, name: "Heroes Boosted (Goddess Boost)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 200, pts: 50, name: "Heroes Boosted (Goddess Boost)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 300, pts: 50, name: "Heroes Boosted (Goddess Boost)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 370, pts: 50, name: "Heroes Boosted (Goddess Boost)" }
    }
  },

  "The Punisher": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 20, pts: 50, name: "Enemies Enveloped (Scourge Grenade)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 50, pts: 50, name: "Enemies Enveloped (Scourge Grenade)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 40000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 80, pts: 50, name: "Enemies Enveloped (Scourge Grenade)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 50000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 100, pts: 50, name: "Enemies Enveloped (Scourge Grenade)" }
    }
  },

  "The Thing": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 21000, pts: 50, name: "Damage Blocked" },
      task3: { req: 15, pts: 50, name: "KOs" },
      task4: { req: 30, pts: 50, name: "Enemies Hit (Yancy Street Charge)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Blocked" },
      task3: { req: 35, pts: 50, name: "KOs" },
      task4: { req: 75, pts: 50, name: "Enemies Hit (Yancy Street Charge)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 85000, pts: 50, name: "Damage Blocked" },
      task3: { req: 60, pts: 50, name: "KOs" },
      task4: { req: 120, pts: 50, name: "Enemies Hit (Yancy Street Charge)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 110000, pts: 50, name: "Damage Blocked" },
      task3: { req: 75, pts: 50, name: "KOs" },
      task4: { req: 150, pts: 50, name: "Enemies Hit (Yancy Street Charge)" }
    }
  },

  "Thor": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 120, pts: 50, name: "Thorforce Accumulated" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 300, pts: 50, name: "Thorforce Accumulated" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 70000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 500, pts: 50, name: "Thorforce Accumulated" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 90000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 650, pts: 50, name: "Thorforce Accumulated" }
    }
  },

  "Ultron": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 10000, pts: 50, name: "Healing" },
      task3: { req: 25, pts: 50, name: "KOs + Assists" },
      task4: { req: 4000, pts: 50, name: "Bonus Health (Imperative: Firewall)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 25000, pts: 50, name: "Healing" },
      task3: { req: 65, pts: 50, name: "KOs + Assists" },
      task4: { req: 10000, pts: 50, name: "Bonus Health (Imperative: Firewall)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 42000, pts: 50, name: "Healing" },
      task3: { req: 100, pts: 50, name: "KOs + Assists" },
      task4: { req: 16000, pts: 50, name: "Bonus Health (Imperative: Firewall)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 54000, pts: 50, name: "Healing" },
      task3: { req: 130, pts: 50, name: "KOs + Assists" },
      task4: { req: 20000, pts: 50, name: "Bonus Health (Imperative: Firewall)" }
    }
  },

  "Venom": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Blocked" },
      task3: { req: 12, pts: 50, name: "KOs" },
      task4: { req: 8000, pts: 50, name: "Bonus Health (Symbiotic Resilience)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 55000, pts: 50, name: "Damage Blocked" },
      task3: { req: 30, pts: 50, name: "KOs" },
      task4: { req: 20000, pts: 50, name: "Bonus Health (Symbiotic Resilience)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 85000, pts: 50, name: "Damage Blocked" },
      task3: { req: 50, pts: 50, name: "KOs" },
      task4: { req: 32000, pts: 50, name: "Bonus Health (Symbiotic Resilience)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 100000, pts: 50, name: "Damage Blocked" },
      task3: { req: 65, pts: 50, name: "KOs" },
      task4: { req: 40000, pts: 50, name: "Bonus Health (Symbiotic Resilience)" }
    }
  },

  "Winter Soldier": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 7500, pts: 50, name: "Damage Dealt" },
      task3: { req: 8, pts: 50, name: "Final Hits" },
      task4: { req: 15, pts: 50, name: "Enemies Grabbed (Bionic Hook)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 20, pts: 50, name: "Final Hits" },
      task4: { req: 35, pts: 50, name: "Enemies Grabbed (Bionic Hook)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 30000, pts: 50, name: "Damage Dealt" },
      task3: { req: 35, pts: 50, name: "Final Hits" },
      task4: { req: 60, pts: 50, name: "Enemies Grabbed (Bionic Hook)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 38000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 75, pts: 50, name: "Enemies Grabbed (Bionic Hook)" }
    }
  },

  "Wolverine": {
    Agent: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 8000, pts: 50, name: "Damage Dealt" },
      task3: { req: 10, pts: 50, name: "Final Hits" },
      task4: { req: 10, pts: 50, name: "Enemies Knocked Down (Feral Leap)" }
    },
    Knight: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 20000, pts: 50, name: "Damage Dealt" },
      task3: { req: 25, pts: 50, name: "Final Hits" },
      task4: { req: 25, pts: 50, name: "Enemies Knocked Down (Feral Leap)" }
    },
    Captain: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 35000, pts: 50, name: "Damage Dealt" },
      task3: { req: 40, pts: 50, name: "Final Hits" },
      task4: { req: 40, pts: 50, name: "Enemies Knocked Down (Feral Leap)" }
    },
    Centurion: {
      time:  { req: 60, pts: 60, name: "Minutes Played" },
      task2: { req: 45000, pts: 50, name: "Damage Dealt" },
      task3: { req: 50, pts: 50, name: "Final Hits" },
      task4: { req: 50, pts: 50, name: "Enemies Knocked Down (Feral Leap)" }
    }
  }

};

/* ================= HERO PICKER ================= */

function openPicker() {
  modal.style.display = "flex";
}

modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

heroes.forEach(hero => {
  const card = document.createElement("div");
  card.className = "hero-card";
  card.innerHTML = `<img src="${hero.pickerImg}"><div>${hero.name}</div>`;
  card.onclick = () => selectHero(hero);
  heroGrid.appendChild(card);
});

function selectHero(hero) {
  currentHero = hero;
  heroName.innerText = hero.name;
  heroImg.src = hero.displayImg;
  modal.style.display = "none";
  buildInputs();
}

/* ================= DYNAMIC INPUTS ================= */

function buildInputs() {
  const old = document.getElementById("dynamicInputs");
  if (old) old.remove();

  const rank = document.getElementById("rank").value;
  const missions = heroMissions[currentHero.name]?.[rank];
  if (!missions) return;

  const wrap = document.createElement("div");
  wrap.id = "dynamicInputs";

  for (const key in missions) {
    if (key === "time") continue;

    wrap.innerHTML += `
      <label>${missions[key].name} per 10 minutes</label>
      <input type="number" id="${key}">
    `;
  }

  rightPanel.insertBefore(wrap, document.querySelector("button"));
}


/* ================= SIMULATION ================= */

function simulate() {
  if (!currentHero) {
    alert("Pick a hero first");
    return;
  }

  let rank = document.getElementById("rank").value;
  let points = Number(document.getElementById("currentPoints").value) || 0;

  const missions = heroMissions[currentHero.name][rank];

  const avg = {};
  let prog = { time: 0 };

  // build avg + progress dynamically
  for (const key in missions) {
    if (key === "time") continue;

    avg[key] = (Number(document.getElementById(key).value) || 0) / 10;
    prog[key] = 0;
  }

  let minutes = 0;
  let gained = 0;

  while (rank !== "Lord" && minutes < 200000) {
    minutes++;
    points++;

    const m = heroMissions[currentHero.name][rank];

    prog.time++;

    // handle time mission
    if (prog.time >= m.time.req) {
      gained += m.time.pts;
      points += m.time.pts;
      prog.time = 0;
    }

    // handle all other tasks
    for (const key in avg) {
      prog[key] += avg[key];

      if (prog[key] >= m[key].req) {
        gained += m[key].pts;
        points += m[key].pts;
        prog[key] = 0;
      }
    }

    // rank up
    if (points >= rankCaps[rank]) {
      points -= rankCaps[rank];
      rank = rankOrder[rankOrder.indexOf(rank) + 1];

      // reset progress on rank up
      prog = { time: 0 };
      for (const key in avg) prog[key] = 0;
    }
  }

  result.innerText =
`Hero: ${currentHero.name}
Time to Lord: ${minutes} minutes
Hours: ${(minutes / 60).toFixed(2)}
Proficiency gained: ${gained}`;
}



