/*
  Player names come straight from Valve's leaderboard / Steam, so some are
  crude. Names matching this list are shown as "hidden" instead.

  Matching is done on a normalised copy (lower-case, common leetspeak undone,
  separators removed) so "f.u.c.k" or "sh1t" are caught too.
  Add words here if something slips through.
*/
const BLOCKED = [
  // sexual
  "fuck", "shit", "bitch", "cunt", "dick", "cock", "pussy", "penis", "vagina", "porn", "boob",
  "titty", "titties", "whore", "slut", "cum", "jizz", "dildo", "anal", "feeton", "sex",
  // slurs & hate
  "nigg", "nigga", "fag", "retard", "tranny", "kike", "chink", "spic",
  "hitler", "nazi", "heil", "kkk", "1488", "epstein", "rape", "rapist", "pedo", "molest",
];

// Words that contain a blocked fragment but are fine on their own.
const ALLOWED = ["sussex", "essex", "analys", "scunthorpe", "cocktail", "peacock", "hancock", "dickens", "cumul", "document"];

function normalise(value: string) {
  return value
    .toLowerCase()
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-zа-яөүё0-9]/gi, "");
}

export function isOffensiveName(name: string) {
  const plain = normalise(name);
  if (ALLOWED.some((word) => plain.includes(word))) return false;
  return BLOCKED.some((word) => plain.includes(word));
}
