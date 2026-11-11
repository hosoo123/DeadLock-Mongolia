/*
  PATCH RADAR

  1) PATCH_SUMMARY — гараар бичсэн монгол товчлол. Шинэ patch гарахад
     updatedAt-ийг солиод доорх жагсаалтуудыг шинэчилнэ.
  2) getOfficialPatches() — Deadlock API-аас албан ёсны patch notes-ийн
     жагсаалтыг цаг тутам автоматаар татна. Товчлол хоцорвол сайт өөрөө
     "шинэ patch гарсан" гэж харуулна.
*/

export type HeroUpdate = {
  name: string;
  role: string;
  change: string;
  detail: string;
  tone: "violet" | "pink" | "amber" | "cyan" | "lime" | "red";
  image?: string;
};

export type ItemUpdate = { name: string; type: string; detail: string };

export const PATCH_SUMMARY: {
  updatedAt: string; // YYYY-MM-DD
  title: string;
  intro: string;
  heroUpdates: HeroUpdate[];
  itemUpdates: ItemUpdate[];
} = {
  updatedAt: "2026-10-20",
  title: "Сүүлийн өөрчлөлтүүд",
  intro:
    "City Never Sleeps цувралын шинэ баатрууд болон item-ийн meta өөрчлөлтийг Монгол хэлээр товчлоод нэг дор цуглууллаа.",
  heroUpdates: [
    { name: "Nurse Harrow", role: "Support / Control", change: "Шинэ hero", detail: "Leech Therapy, Wretched Vapors, Healing Needles, Lurking Terrors — sustain болон teamfight control дээр төвлөрнө.", tone: "violet", image: "/heroes/Nurse%20Harrow.webp" },
    { name: "Violet", role: "Skirmisher", change: "Шинэ hero", detail: "Ойрын зайны дарамт, хурдан reposition, ганцаарчилсан pick хийхэд чиглэсэн.", tone: "pink" },
    { name: "Deadman Danny", role: "Gunslinger", change: "Шинэ hero", detail: "Бууны burst болон зайнаас дарамтлах playstyle-тэй шинэ сонголт.", tone: "amber", image: "/heroes/Deadman%20Danny.webp" },
    { name: "Solomon", role: "Frontline", change: "Шинэ hero", detail: "Удаан үргэлжлэх тулаан, хамгаалалт, frontline space үүсгэхэд зориулагдсан.", tone: "cyan", image: "/heroes/Solomon.webp" },
    { name: "Baba", role: "Bruiser", change: "Шинэ hero", detail: "Тэсвэр, ойрын зайн дарамт, тогтвортой trade хийхэд хүчтэй.", tone: "lime" },
    { name: "Rat King", role: "Ambush", change: "Шинэ hero", detail: "Гэнэтийн дайралт, map pressure, жижиг зайд chaos үүсгэнэ.", tone: "red", image: "/heroes/Rat%20King.webp" },
  ],
  itemUpdates: [
    { name: "Escalating Resilience", type: "Weapon / Defense", detail: "Дайсанд онох бүрд bullet resistance цэнэглэгдэнэ. Удаан үргэлжлэх буудалцаанд хүч нь нэмэгдэнэ." },
    { name: "Spiritual Overflow", type: "Spirit", detail: "Буудсан үед charge цуглуулж fire rate, spirit power, spirit lifesteal-ийг өсгөнө." },
    { name: "Curse", type: "Spirit / Active", detail: "Идэвхжүүлж дайсны хөдөлгөөн болон чадварын хэмнэлийг таслахад ашиглана." },
    { name: "Debuff Remover", type: "Vitality / Active", detail: "Сөрөг эффект цэвэрлэж, crowd control-д орсон үед дахин тоглолтод орох боломж өгнө." },
  ],
};

export type OfficialPatch = { title: string; date: string; link: string };

/** "09-29-2026 Update" → "2026-09-29"; falls back to the feed's publish date. */
function patchDate(title: string, pubDate: string) {
  const match = title.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (match) return `${match[3]}-${match[1]}-${match[2]}`;
  return pubDate.slice(0, 10);
}

export async function getOfficialPatches(limit = 4): Promise<OfficialPatch[]> {
  try {
    const response = await fetch("https://api.deadlock-api.com/v1/patches", {
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
    });
    if (!response.ok) return [];
    const feed = (await response.json()) as { title?: string; pub_date?: string; link?: string }[];
    return feed
      .filter((entry) => entry.title && entry.link?.startsWith("https://forums.playdeadlock.com/"))
      .map((entry) => ({
        title: entry.title!,
        date: patchDate(entry.title!, entry.pub_date || ""),
        link: entry.link!,
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit);
  } catch {
    return [];
  }
}
