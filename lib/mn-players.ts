/*
  МОНГОЛ ТОГЛОГЧДЫН LEADERBOARD

  Deadlock API улсаар хайх боломжгүй тул Монгол тоглогчдыг энд гараар нэмнэ.
  Rank, тоглолт, win rate, top hero зэрэг нь API-аас цаг тутам автоматаар
  шинэчлэгдэнэ.

  Нэмэх: тоглогч Discord дээр өөрөө хүсэлт гаргаж, Account ID-гаа өгсөн байх
  ёстой (зөвшөөрөлгүй хэнийг ч нэмэхгүй). Account ID = SteamID3 буюу
  /players хайлтад гардаг дугаар. Хасуулах хүсэлт ирвэл шууд устгана.

  Жишээ:
    { accountId: 123456789, addedAt: "2026-11-11" },
*/
export type MongolianPlayer = { accountId: number; addedAt: string };

export const MONGOLIAN_PLAYERS: MongolianPlayer[] = [];
