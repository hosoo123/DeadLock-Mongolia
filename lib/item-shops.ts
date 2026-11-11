// Item shops and their items (name, tier, wiki image fallback).
// Descriptions live in ./item-copy.ts; stats come from public/data/deadlock-items.json.

export type ShopKey = "fairfax" | "mps" | "cc";

export type ShopItemBase = { name: string; tier: 1 | 2 | 3 | 4; remoteImg?: string };

export type Shop = {
  key: ShopKey;
  label: string;
  accent: string;
  tierPrices: Record<1 | 2 | 3 | 4, string>;
  tierNote: Partial<Record<1 | 2 | 3 | 4, string>>;
  items: ShopItemBase[];
};

export const SHOPS: Shop[] = [
  {
    "key": "fairfax",
    "label": "Fairfax",
    "accent": "#c9852f",
    "tierPrices": {
      "1": "$800",
      "2": "$1600",
      "3": "$3200",
      "4": "$6400"
    },
    "tierNote": {
      "4": "Experts Only"
    },
    "items": [
      {
        "name": "Close Quarters",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/4/43/Close_Quarters.png"
      },
      {
        "name": "Extended Magazine",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/8/8a/Extended_Magazine.png"
      },
      {
        "name": "Headshot Booster",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/a/ac/Headshot_Booster.png"
      },
      {
        "name": "High-Velocity Rounds",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/0/0e/High-Velocity_Rounds.png"
      },
      {
        "name": "Monster Rounds",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/f/f8/Monster_Rounds.png"
      },
      {
        "name": "Rapid Rounds",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/6/6e/Rapid_Rounds.png"
      },
      {
        "name": "Restorative Shot",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/4/4c/Restorative_Shot.png"
      },
      {
        "name": "Active Reload",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/b/b4/Active_Reload.png"
      },
      {
        "name": "Fleetfoot",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/c/cf/Fleetfoot.png"
      },
      {
        "name": "Intensifying Magazine",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/6/65/Intensifying_Magazine.png"
      },
      {
        "name": "Kinetic Dash",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/3/3e/Kinetic_Dash.png"
      },
      {
        "name": "Long Range",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/0/0a/Long_Range.png"
      },
      {
        "name": "Melee Charge",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/e/ea/Melee_Charge.png"
      },
      {
        "name": "Mystic Shot",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/5/5a/Mystic_Shot.png"
      },
      {
        "name": "Opening Rounds",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/8/8d/Opening_Rounds.png"
      },
      {
        "name": "Recharging Rush",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/1/17/Recharging_Rush.png"
      },
      {
        "name": "Slowing Bullets",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/d/db/Slowing_Bullets.png"
      },
      {
        "name": "Spirit Shredder",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/9/96/Spirit_Shredder_Bullets.png"
      },
      {
        "name": "Split Shot",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/0/04/Split_Shot.png"
      },
      {
        "name": "Stalker",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/4/4b/Stalker.png"
      },
      {
        "name": "Swift Striker",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/e/e4/Swift_Striker.png"
      },
      {
        "name": "Titanic Magazine",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/d/d8/Titanic_Magazine.png"
      },
      {
        "name": "Weakening Headshot",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/a/ad/Weakening_Headshot.png"
      },
      {
        "name": "Alchemical Fire",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/f/fc/Alchemical_Fire.png"
      },
      {
        "name": "Ballistic Enchantment",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/d/d4/Ballistic_Enchantment.png"
      },
      {
        "name": "Berserker",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/a/a8/Berserker.png"
      },
      {
        "name": "Blood Tribute",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/a/af/Blood_Tribute.png"
      },
      {
        "name": "Burst Fire",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/b/b0/Burst_Fire.png"
      },
      {
        "name": "Cultist Sacrifice",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/e/eb/Cultist_Sacrifice.png"
      },
      {
        "name": "Escalating Resilience",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/5/57/Escalating_Resilience.png"
      },
      {
        "name": "Express Shot",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/e/e6/Express_Shot.png"
      },
      {
        "name": "Headhunter",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/0/06/Headhunter.png"
      },
      {
        "name": "Heroic Aura",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/6/60/Heroic_Aura.png"
      },
      {
        "name": "Hollow Point",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/3/30/Hollow_Point.png"
      },
      {
        "name": "Hunter's Aura",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/0/08/Hunter%27s_Aura.png"
      },
      {
        "name": "Point Blank",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/7/79/Point_Blank.png"
      },
      {
        "name": "Shadow Weave",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/4e/Shadow_Weave.png"
      },
      {
        "name": "Sharpshooter",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/2/25/Sharpshooter.png"
      },
      {
        "name": "Spirit Rend",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/42/Spirit_Rend.png"
      },
      {
        "name": "Tesla Bullets",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/5/56/Tesla_Bullets.png"
      },
      {
        "name": "Toxic Bullets",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/f/f0/Toxic_Bullets.png"
      },
      {
        "name": "Weighted Shots",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/8/88/Weighted_Shots.png"
      },
      {
        "name": "Armor Piercing Rounds",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/1/10/Armor_Piercing_Rounds.png"
      },
      {
        "name": "Capacitor",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/b/b5/Capacitor.png"
      },
      {
        "name": "Crippling Headshot",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/6/6c/Crippling_Headshot.png"
      },
      {
        "name": "Crushing Fists",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/c/ca/Crushing_Fists.png"
      },
      {
        "name": "Frenzy",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/f/f1/Frenzy.png"
      },
      {
        "name": "Glass Cannon",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/6/6e/Glass_Cannon.png"
      },
      {
        "name": "Lucky Shot",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/0/06/Lucky_Shot.png"
      },
      {
        "name": "Ricochet",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/8/87/Ricochet.png"
      },
      {
        "name": "Silencer",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/4/43/Silencer.png"
      },
      {
        "name": "Spellslinger",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/a/a8/Spellslinger.png"
      },
      {
        "name": "Spiritual Overflow",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/4/46/Spiritual_Overflow.png"
      }
    ]
  },
  {
    "key": "mps",
    "label": "MPS",
    "accent": "#4f9a63",
    "tierPrices": {
      "1": "$800",
      "2": "$1600",
      "3": "$3200",
      "4": "$6400"
    },
    "tierNote": {
      "4": "Experts Only"
    },
    "items": [
      {
        "name": "Extra Health",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/6/69/Extra_Health.png"
      },
      {
        "name": "Extra Regen",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/6/60/Extra_Regen.png"
      },
      {
        "name": "Extra Stamina",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/2/28/Extra_Stamina.png"
      },
      {
        "name": "Grit",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/1/17/Grit.png"
      },
      {
        "name": "Healing Rite",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/7/72/Healing_Rite.png"
      },
      {
        "name": "Melee Lifesteal",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/2/24/Melee_Lifesteal.png"
      },
      {
        "name": "Rebuttal",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/4/4c/Rebuttal.png"
      },
      {
        "name": "Sprint Boots",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/d/da/Sprint_Boots.png"
      },
      {
        "name": "Battle Vest",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/7/7d/Battle_Vest.png"
      },
      {
        "name": "Bullet Lifesteal",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/5/57/Bullet_Lifesteal_%28item%29.png"
      },
      {
        "name": "Debuff Reducer",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/c/c3/Debuff_Reducer.png"
      },
      {
        "name": "Enchanter's Emblem",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/0/03/Enchanter%27s_Emblem.png"
      },
      {
        "name": "Enduring Speed",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/c/cd/Enduring_Speed.png"
      },
      {
        "name": "Guardian Ward",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/6/60/Guardian_Ward.png"
      },
      {
        "name": "Healbane",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/6/62/Healbane.png"
      },
      {
        "name": "Healing Booster",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/b/b0/Healing_Booster.png"
      },
      {
        "name": "Reactive Barrier",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/f/f2/Reactive_Barrier.png"
      },
      {
        "name": "Restorative Locket",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/0/07/Restorative_Locket.png"
      },
      {
        "name": "Return Fire",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/7/7c/Return_Fire.png"
      },
      {
        "name": "Spirit Lifesteal",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/d/d9/Spirit_Lifesteal_%28item%29.png"
      },
      {
        "name": "Spirit Shielding",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/4/4a/Spirit_Shielding.png"
      },
      {
        "name": "Trophy Collector",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/b/b0/Trophy_Collector.png"
      },
      {
        "name": "Weapon Shielding",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/f/f4/Weapon_Shielding.png"
      },
      {
        "name": "Bullet Resilience",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/4d/Bullet_Resilience.png"
      },
      {
        "name": "Counterspell",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/5/51/Counterspell.png"
      },
      {
        "name": "Dispel Magic",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/d/da/Dispel_Magic.png"
      },
      {
        "name": "Fortitude",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/c/c6/Fortitude.png"
      },
      {
        "name": "Fury Trance",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/1/15/Fury_Trance.png"
      },
      {
        "name": "Healing Nova",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/a/ae/Healing_Nova.png"
      },
      {
        "name": "Lifestrike",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/6/6a/Lifestrike.png"
      },
      {
        "name": "Majestic Leap",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/d/d7/Majestic_Leap.png"
      },
      {
        "name": "Metal Skin",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/f/fa/Metal_Skin.png"
      },
      {
        "name": "Rescue Beam",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/c/c2/Rescue_Beam.png"
      },
      {
        "name": "Spirit Resilience",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/7/7f/Spirit_Resilience.png"
      },
      {
        "name": "Stamina Mastery",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/e/eb/Stamina_Mastery.png"
      },
      {
        "name": "Veil Walker",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/6/69/Veil_Walker.png"
      },
      {
        "name": "Warp Stone",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/4f/Warp_Stone.png"
      },
      {
        "name": "Cheat Death",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/f/f7/Cheat_Death.png"
      },
      {
        "name": "Colossus",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/b/bb/Colossus.png"
      },
      {
        "name": "Divine Barrier",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/7/74/Divine_Barrier.png"
      },
      {
        "name": "Diviner's Kevlar",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/0/0a/Diviner%27s_Kevlar.png"
      },
      {
        "name": "Healing Tempo",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/7/70/Healing_Tempo.png"
      },
      {
        "name": "Indomitable",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/f/ff/Indomitable.png"
      },
      {
        "name": "Infuser",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/c/c3/Infuser.png"
      },
      {
        "name": "Inhibitor",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/9/99/Inhibitor.png"
      },
      {
        "name": "Juggernaut",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/0/07/Juggernaut.png"
      },
      {
        "name": "Leech",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/3/32/Leech.png"
      },
      {
        "name": "Phantom Strike",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/e/e6/Phantom_Strike.png"
      },
      {
        "name": "Plated Armor",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/4/4c/Plated_Armor.png"
      },
      {
        "name": "Siphon Bullets",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/2/2c/Siphon_Bullets.png"
      },
      {
        "name": "Spellbreaker",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/2/27/Spellbreaker.png"
      },
      {
        "name": "Unstoppable",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/e/eb/Unstoppable.png"
      },
      {
        "name": "Vampiric Burst",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/d/dc/Vampiric_Burst.png"
      },
      {
        "name": "Witchmail",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/0/09/Witchmail.png"
      }
    ]
  },
  {
    "key": "cc",
    "label": "Curiosity Catalog",
    "accent": "#8b5fc9",
    "tierPrices": {
      "1": "$800",
      "2": "$1600",
      "3": "$3200",
      "4": "$6400"
    },
    "tierNote": {
      "4": "Experts Only"
    },
    "items": [
      {
        "name": "Extra Charge",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/4/4a/Extra_Charge.png"
      },
      {
        "name": "Extra Spirit",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/9/94/Extra_Spirit.png"
      },
      {
        "name": "Golden Goose Egg",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/a/a8/Golden_Goose_Egg.png"
      },
      {
        "name": "Mystic Burst",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/9/95/Mystic_Burst.png"
      },
      {
        "name": "Mystic Expansion",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/d/df/Mystic_Expansion.png"
      },
      {
        "name": "Mystic Regeneration",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/1/17/Mystic_Regeneration.png"
      },
      {
        "name": "Rusted Barrel",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/5/54/Rusted_Barrel.png"
      },
      {
        "name": "Spirit Strike",
        "tier": 1,
        "remoteImg": "https://deadlock.wiki/images/7/7c/Spirit_Strike.png"
      },
      {
        "name": "Arcane Surge",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/b/bb/Arcane_Surge.png"
      },
      {
        "name": "Bullet Resist Shredder",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/7/7d/Bullet_Resist_Shredder.png"
      },
      {
        "name": "Cold Front",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/4/4d/Cold_Front.png"
      },
      {
        "name": "Compress Cooldown",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/d/d4/Compress_Cooldown.png"
      },
      {
        "name": "Duration Extender",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/f/fb/Duration_Extender.png"
      },
      {
        "name": "Improved Spirit",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/c/c9/Improved_Spirit.png"
      },
      {
        "name": "Mystic Slow",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/6/65/Mystic_Slow.png"
      },
      {
        "name": "Mystic Vulnerability",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/c/c7/Mystic_Vulnerability.png"
      },
      {
        "name": "Quicksilver Reload",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/3/3b/Quicksilver_Reload.png"
      },
      {
        "name": "Slowing Hex",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/1/18/Slowing_Hex.png"
      },
      {
        "name": "Spirit Sap",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/0/03/Spirit_Sap.png"
      },
      {
        "name": "Suppressor",
        "tier": 2,
        "remoteImg": "https://deadlock.wiki/images/2/21/Suppressor.png"
      },
      {
        "name": "Decay",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/9/93/Decay.png"
      },
      {
        "name": "Disarming Hex",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/2/2d/Disarming_Hex.png"
      },
      {
        "name": "Greater Expansion",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/4e/Greater_Expansion.png"
      },
      {
        "name": "Knockdown",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/3/36/Knockdown.png"
      },
      {
        "name": "Radiant Regeneration",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/c/c7/Radiant_Regeneration.png"
      },
      {
        "name": "Rapid Recharge",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/a/a9/Rapid_Recharge.png"
      },
      {
        "name": "Silence Wave",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/8/88/Silence_Wave.png"
      },
      {
        "name": "Spirit Snatch",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/8/83/Spirit_Snatch.png"
      },
      {
        "name": "Superior Cooldown",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/9/93/Superior_Cooldown.png"
      },
      {
        "name": "Superior Duration",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/c/c7/Superior_Duration.png"
      },
      {
        "name": "Surge of Power",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/d/d4/Surge_of_Power.png"
      },
      {
        "name": "Tankbuster",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/d/d8/Tankbuster.png"
      },
      {
        "name": "Torment Pulse",
        "tier": 3,
        "remoteImg": "https://deadlock.wiki/images/4/42/Torment_Pulse.png"
      },
      {
        "name": "Arctic Blast",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/3/30/Arctic_Blast.png"
      },
      {
        "name": "Boundless Spirit",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/9/97/Boundless_Spirit.png"
      },
      {
        "name": "Cursed Relic",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/6/61/Cursed_Relic.png"
      },
      {
        "name": "Echo Shard",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/a/ab/Echo_Shard.png"
      },
      {
        "name": "Escalating Exposure",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/2/21/Escalating_Exposure.png"
      },
      {
        "name": "Ethereal Shift",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/3/3c/Ethereal_Shift.png"
      },
      {
        "name": "Focus Lens",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/3/3c/Focus_Lens.png"
      },
      {
        "name": "Lightning Scroll",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/b/b8/Lightning_Scroll.png"
      },
      {
        "name": "Magic Carpet",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/2/25/Magic_Carpet.png"
      },
      {
        "name": "Mercurial Magnum",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/a/af/Mercurial_Magnum.png"
      },
      {
        "name": "Mystic Reverb",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/0/07/Mystic_Reverb.png"
      },
      {
        "name": "Refresher",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/5/53/Refresher.png"
      },
      {
        "name": "Scourge",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/5/58/Scourge.png"
      },
      {
        "name": "Spirit Burn",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/e/ef/Spirit_Burn.png"
      },
      {
        "name": "Transcendent Cooldown",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/b/bd/Transcendent_Cooldown.png"
      },
      {
        "name": "Vortex Web",
        "tier": 4,
        "remoteImg": "https://deadlock.wiki/images/8/85/Vortex_Web.png"
      }
    ]
  }
];
