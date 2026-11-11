"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Language = "mn" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "mn",
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

const translations: Record<string, string> = {
  // Home redesign
  "Hero бүрийн build":
    "Builds for every hero",
  "Өндөр rank-ийн тоглогчид юу авч, хэнийг хэцүү гэж үздэгийг бодит датагаар.":
    "What high-rank players buy and who they struggle against, from real match data.",
  "Crosshair-аа тохируулаад тоглоомд шууд оруулах code аваарай.":
    "Tune your crosshair and get a code to import in-game.",
  "Item-ийн бүтэн тайлбар →":
    "Full item guide →",
  "Дайсандаа юу авах вэ?":
    "What should I buy?",
  "Дайсны hero-уудыг сонгоход эсрэг нь авах item-уудыг тайлбартай нь санал болгоно.":
    "Pick the enemy heroes and get counter items, with reasons.",
  "Шинэ тоглогчид":
    "New players",
  "Deadlock-ийн үндэс":
    "Deadlock basics",
  "Soul, lane, item slot, objective — эхлэхэд хэрэгтэй бүх зүйл монголоор.":
    "Souls, lanes, item slots, objectives — everything you need to get started.",
  "Item тайлбар":
    "Item Guide",
  "Item бүр юу хийдэг, хэзээ авах, ямар hero-д тохирохыг монголоор энгийнээр тайлбарлана. Hero-гоо сонгоод бодит тоглолтын дата дээр суурилсан build аваарай.":
    "What every item does, when to buy it and which heroes it suits — explained simply. Pick a hero to get a build based on real match data.",
  "Hero-доо тохирох build":
    "Find a build for your hero",
  "Hero-гоо сонгоход сүүлийн 30 хоногийн бодит тоглолтуудаас хамгийн их авсан, хамгийн их хожсон item-уудыг харьцуулж, lane-аас late game хүртэлх build санал болгоно.":
    "Pick a hero and we'll compare the most-bought and highest-winning items from the last 30 days, then suggest a build from lane to late game.",
  "Зургаар hero сонгох":
    "Pick a hero by portrait",
  "Шинэ hero":
    "New hero",
  "Тайлбаруудыг тоглолтод хэрэгтэй байдлаар нь товчилсон. Шинэ patch гарахад шинэчилнэ.":
    "Summaries focus on what matters in a match and are updated with each new patch.",
  "Lane үе":
    "Laning",
  "Эхэн үе":
    "Early game",
  "Дунд үе":
    "Mid game",
  "Late game":
    "Late game",
  "Hero-гийн role-д тохирсон":
    "Fits the hero's role",
  "Дата хангалтгүй":
    "Not enough data",
  "Эхлээд hero-гоо сонго.":
    "Pick a hero first.",
  "-д тохирох build. Яг энэ дарааллаар авах албагүй — lane болон дайсны hero-уудаасаа хамаараад хамгаалалтын эсвэл counter item-ээр сольж болно.":
    " build. You don't have to follow this order exactly — swap in defensive or counter items based on your lane and the enemy heroes.",
  "Сүүлийн 30 хоногийн тоглолтуудаас хэр олон авсан, хэр их хожсоноор нь эрэмбэлсэн. Чиглэл болгож ашиглаарай — тоглолт болгон өөр.":
    "Ranked by how often each item was bought and how often it won over the last 30 days. Use it as a guide — every match is different.",
  "Live дата түр ирэхгүй байгаа тул hero-гийн role болон item-уудын зохицол дээр үндэслэсэн build харуулж байна. Чиглэл болгож ашиглаарай — тоглолт болгон өөр.":
    "Live data isn't available right now, so this build is based on the hero's role and item synergy. Use it as a guide — every match is different.",
  "Тайлбар хуулах":
    "Copy guide",
  "Active · товч дарна":
    "Active · press to use",
  "Imbue · чадварт холбоно":
    "Imbue · attach to an ability",
  "Passive · өөрөө ажиллана":
    "Passive · always on",
  "Товч дарна":
    "Press to use",
  "Чадварт холбоно":
    "Attach to an ability",
  "Өөрөө ажиллана":
    "Always on",
  "Дарж дэлгэрэнгүйг үз":
    "Click for the full guide",
  "АШИГЛАХ":
    "USE",
  "Юу хийдэг вэ?":
    "What it does",
  "Яаж ашиглах вэ?":
    "How to use it",
  "Хэзээ авах вэ?":
    "When to buy",
  "Хэнд тохирох вэ?":
    "Good on",
  "Санамж":
    "Pro tip",
  "Дараагийн хүчтэй хувилбар":
    "Upgrades into",
  "Lane-ийн эхэнд. Хямд тул эрт аваад хурдан хүч ав.":
    "Early in lane — it's cheap, so grab it for a quick power boost.",
  "Lane дуусах үе буюу эхний 10 минут орчимд.":
    "Around the end of laning, roughly the first 10 minutes.",
  "Дунд үед, teamfight эхлэх үед гол item болгож ав.":
    "Mid game, as a core item once teamfights start.",
  "Сүүлд, үндсэн item-уудаа бүрдүүлсний дараа.":
    "Late, after your core items are done.",
  "Үндсэн агуулга руу шилжих": "Skip to main content",
  "Deadlock · Монгол гарын авлага": "Deadlock · Mongolian Guide",
  "Item хайх": "Browse items",
  "Build гаргах": "Generate a build",
  "Хэрхэн ашиглах вэ": "How to use",
  "Дэлгүүрээ сонго": "Pick a shop",
  "Fairfax, MPS эсвэл Curiosity Catalog.": "Fairfax, MPS or Curiosity Catalog.",
  "Item дээр дар": "Tap an item",
  "Нэрээр хайх эсвэл түвшингээр шүүх боломжтой.": "Search by name or filter by tier.",
  "Тайлбараа унш": "Read the guide",
  "Хэзээ авах, хэрхэн ашиглах, ямар hero-д тохирох.": "When to buy, how to use it, which heroes it suits.",
  "Item каталог": "Item catalog",
  "Бүх item нэг дор": "Every item in one place",
  "Дэлгүүр болон түвшингээр шүүгээд item дээр дарж дэлгэрэнгүй тайлбарыг харна.":
    "Filter by shop and tier, then select an item to see its full guide.",
  "Дэлгүүр": "Shop",
  "Тоглоом сонгох": "Choose a game",
  "Item тайлбарыг хаах": "Close item details",
  "Hero-оо сонгоно уу": "Choose a hero",
  "Тоглоомын сонголт": "Game selection",
  "Live meta · Сүүлийн 30 хоног": "Live Meta · Last 30 Days",
  "Монгол тоглогчидтой танилцаж, хамт тоглох хүн олох, build болон item-ийн мэдээлэл солилцох community-д нэгдээрэй.":
    "Meet Mongolian players, find teammates, and share builds and item tips with the community.",
  "Deadlock Mongolia Discord серверт нэгдэх": "Join the Deadlock Mongolia Discord server",
  "Discord-д нэгдэх": "Join Discord",
  "Сүүлийн 30 хоног": "Last 30 days",
  "Шинэ мэдээлэл шалгаж байна…": "Checking for recent data…",
  "Hero сонгох": "Choose a hero",
  "Hero мэдээлэл ачаалж байна…": "Loading hero data…",
  "Тооцоолж байна…": "Calculating…",
  "Item нэрээр хайх...": "Search items...",
  "Бүгд": "All",
  "Түвшин 1": "Tier 1",
  "Түвшин 2": "Tier 2",
  "Түвшин 3": "Tier 3",
  "Түвшин 4": "Tier 4",
  "Тохирох item олдсонгүй.": "No matching items found.",
  "Дэмжлэг үзүүлэх": "Support the project",
  "Хуудасны хэсгүүд": "Page sections",
  "Каталог": "Catalog",
  "Тоглогч": "Players",
  "Сүүлийн өөрчлөлтүүд": "Latest Updates",
  "City Never Sleeps цувралын шинэ баатрууд болон item-ийн meta өөрчлөлтийг Монгол хэлээр товчлоод нэг дор цуглууллаа.":
    "A quick overview of new City Never Sleeps heroes and item meta changes.",
  "Шинэчлэл идэвхтэй": "Live update",
  "Leech Therapy, Wretched Vapors, Healing Needles, Lurking Terrors — sustain болон teamfight control дээр төвлөрнө.":
    "Built around sustain and teamfight control with Leech Therapy, Wretched Vapors, Healing Needles, and Lurking Terrors.",
  "Ойрын зайны дарамт, хурдан reposition, ганцаарчилсан pick хийхэд чиглэсэн.":
    "Focused on close-range pressure, fast repositioning, and picking off isolated enemies.",
  "Бууны burst болон зайнаас дарамтлах playstyle-тэй шинэ сонголт.":
    "A new option for a weapon-burst, ranged-pressure playstyle.",
  "Удаан үргэлжлэх тулаан, хамгаалалт, frontline space үүсгэхэд зориулагдсан.":
    "Designed for extended fights, durability, and creating space on the frontline.",
  "Тэсвэр, ойрын зайн дарамт, тогтвортой trade хийхэд хүчтэй.":
    "Excels at durability, close-range pressure, and consistent trades.",
  "Гэнэтийн дайралт, map pressure, жижиг зайд chaos үүсгэнэ.":
    "Creates ambushes, map pressure, and chaos in tight spaces.",
  "Дайсанд онох бүрд bullet resistance цэнэглэгдэнэ. Удаан үргэлжлэх буудалцаанд хүч нь нэмэгдэнэ.":
    "Builds bullet resistance with each hit, growing stronger in extended gunfights.",
  "Буудсан үед charge цуглуулж fire rate, spirit power, spirit lifesteal-ийг өсгөнө.":
    "Builds charge while firing to increase fire rate, Spirit Power, and Spirit Lifesteal.",
  "Идэвхжүүлж дайсны хөдөлгөөн болон чадварын хэмнэлийг таслахад ашиглана.":
    "Activate it to disrupt enemy movement and ability timing.",
  "Сөрөг эффект цэвэрлэж, crowd control-д орсон үед дахин тоглолтод орох боломж өгнө.":
    "Removes negative effects and helps you re-enter a fight after being crowd-controlled.",
  "Тоглогчийн статистик": "Player Stats",
  "Steam нэр, Account ID, SteamID64 эсвэл профайлын холбоосоор хайж тоглогчийн үзүүлэлтээ харна.":
    "Search by Steam name, Account ID, SteamID64, or profile link to view player stats.",
  "🇲🇳 Монгол тоглогчдыг хай": "🇲🇳 Find Mongolian players",
  "Steam нэр эсвэл ID": "Steam name or ID",
  "Steam нэр, ID эсвэл Steam профайлын холбоос...":
    "Steam name, ID, or profile link...",
  "Хайж байна...": "Searching...",
  "Тоглогч хайх": "Search players",
  "Steam дээрх нэрээ эсвэл профайлаа хуваалцахад ашигладаг холбоосоо оруулна.":
    "Enter your Steam name or the link you use to share your profile.",
  "Профайлаа олох зөвлөгөө": "Tips for finding your profile",
  "Steam профайлаа нээгээд visibility нь Public эсэхийг шалга.":
    "Open your Steam profile and make sure its visibility is set to Public.",
  "Нэрээр олдохгүй бол Steam-ийн профайлын холбоос эсвэл 17 оронтой SteamID64-аа хуулж хай.":
    "If your name does not work, search using your Steam profile link or 17-digit SteamID64.",
  "Steam-ийн холбоос `/id/нэр` хэлбэртэй бол public нэрээр хайж үз; хамгийн найдвартай нь `/profiles/`-ийн дараах 17 оронтой SteamID64.":
    "For a Steam `/id/name` link, try searching your public name. The most reliable option is the 17-digit SteamID64 after `/profiles/`.",
  "Хайлтын үр дүн": "Search results",
  "Монгол": "Mongolian",
  "Steam тоглогч": "Steam Player",
  "тоглолт": "matches",
  "Статистик ачаалж байна...": "Loading stats...",
  "МОНГОЛ ТОГЛОГЧ": "MONGOLIAN PLAYER",
  "STEAM ПРОФАЙЛ": "STEAM PROFILE",
  "Steam профайл нээх ↗": "Open Steam Profile ↗",
  "Төлбөрийн цонх хаах": "Close checkout",
  "Төлбөр амжилттай боллоо ✓": "Payment successful ✓",
  "Төлбөр цуцлагдлаа": "Payment cancelled",
  "Deadlock Mongolia-г дэмжсэнд баярлалаа!": "Thanks for supporting Deadlock Mongolia!",
  "Хүсвэл item-ийн дэлгэрэнгүйгээс дахин оролдоорой.":
    "You can try again from the item details.",
  "Сүүлийн тоглолтууд": "Recent Matches",
  "Тоглолтын хугацаа": "Match period",
  "Статистикийн тоглолтын тоо": "Number of matches for stats",
  "тоглолтын win rate": "match win rate",
  "Тоглолтын win rate": "Match win rate",
  "Дундаж K / D / A": "Average K / D / A",
  "Сонгосон тоглолтын цонх": "Selected match window",
  "30 хоногт": "Last 30 days",
  "нийт тоглолт": "total matches",
  "Сонгосон": "Selected",
  "Steam profile location-оо нийтэд харуулсан үед л 🇲🇳 тэмдэг гарна. Одоогийн Deadlock API бүх Монгол тоглогчийн жагсаалт өгдөггүй тул бүрэн Монгол leaderboard гаргах боломжгүй байна.":
    "The 🇲🇳 badge appears only when a player publicly lists Mongolia as their Steam profile location. The current Deadlock API does not provide a complete list of Mongolian players, so a full Mongolia leaderboard is not available.",
  "Deadlock Mongolia-г дэмжих": "Support Deadlock Mongolia",
  "Төлбөр амжилттай болсны дараа энэ хаяг руу баярласан имэйл автоматаар очно.":
    "A thank-you email will be sent to this address after a successful payment.",
  "Имэйл хаяг": "Email address",
  "Дэмжлэгийн дүн (₮)": "Support amount (₮)",
  "Төлбөрийн хуудас бэлдэж байна…": "Preparing checkout…",
  "QPay-аар үргэлжлүүлэх": "Continue with QPay",
  "Имэйл хаягийг зөвхөн энэ төлбөрийн баталгаажуулалт, талархлын имэйлд ашиглана.":
    "Your email is used only to confirm this payment and send a thank-you message.",
  "Дэмжлэг өгөх": "Support",
  "Шинэ мэдээлэл түр ирээгүй": "Live data is temporarily unavailable",
  "Дараа дахин шинэчилнэ": "Try again later",
  "Offline fallback · Дараа дахин шинэчилнэ": "Offline fallback · Try again later",
  "Хуулагдлаа ✓": "Copied ✓",
  "Хуулж чадсангүй": "Could not copy",
  "Мэдэгдэл хаах": "Close notification",
  "Төлбөрийн хуудас нээж чадсангүй.": "Could not open the checkout page.",
  "Түр хүлээгээд дахин оролдоно уу.": "Please wait and try again.",
  "Тоглогч хайж чадсангүй.": "Could not search for players.",
  "Тохирох Steam профайл олдсонгүй.": "No matching Steam profile found.",
  "Тоглогч хайхад алдаа гарлаа.": "An error occurred while searching for players.",
  "Тоглогч хайхад алдаа гарлаа. Дахин оролдоно уу.": "An error occurred while searching. Please try again.",
  "Профайл нээж чадсангүй.": "Could not open the profile.",
  "Профайл ачаалахад алдаа гарлаа.": "An error occurred while loading the profile.",
  "Тоглогчийн мэдээллийг ачаалж чадсангүй. Дахин оролдоно уу.": "Could not load player data. Please try again.",
  "Хайлт 2–100 тэмдэгт байх ёстой.": "Search must be between 2 and 100 characters.",
  "Тухайн Steam ID-аар тоглогч олдсонгүй.": "No player found for that Steam ID.",
  "Steam профайлыг ачаалж чадсангүй.": "Could not load the Steam profile.",
  "Custom Steam холбоосыг танихгүй байна. STEAM_API_KEY тохируулах эсвэл SteamID64-аа ашиглана уу.":
    "Could not resolve this custom Steam link. Set STEAM_API_KEY or search using your SteamID64.",
  "Тоглогчийн хайлтын үйлчилгээ түр ажиллахгүй байна.": "The player search service is temporarily unavailable.",
  "Steam ID эсвэл тоглогчийн нэр оруулна уу.": "Enter a Steam ID or player name.",
  "Steam профайлын мэдээлэл олдсонгүй.": "Steam profile information was not found.",
  "Rank мэдээлэл одоогоор олдсонгүй.": "Rank data is currently unavailable.",
  "Match history мэдээлэл одоогоор олдсонгүй.": "Match history is currently unavailable.",
  "Steam холбоосыг шалгаж чадсангүй.": "Could not verify the Steam link.",
  "Steam нэр эсвэл ID оруулна уу.": "Enter a Steam name or ID.",
  "Тоглолтын дата олдсонгүй.": "No match data found.",
  "Мэдээлэл бэлэн": "Data ready",
  "Гараар": "Active",
  "Чадварт": "Imbue",
  "Дэлгэрэнгүй тайлбар": "Details",
  "ТҮВШИН": "TIER",
  "ХЭЗЭЭ": "WHEN",
  "Таны үзүүлэлт": "Your stats",
};

const dynamicTranslations: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
  [/^Item тай\uFFFD{2}барыг хаах$/, () => "Close item details"],
  [/^(.+) item-ийн дэлгэрэнгүй тайлбарыг нээх$/, (match) => `Open ${match[1]} item details`],
  [/^Шинэ patch гарсан: (.+)$/, (match) => `New patch released: ${match[1]}`],
  [
    /^Доорх товчлол (.+)-ны байдлаар\. Албан ёсны тэмдэглэлийг унших ↗$/,
    (match) => `The summary below is from ${match[1]}. Read the official notes ↗`,
  ],
  [/^(.+) баатрын зураг$/, (match) => `${match[1]} hero portrait`],
  [/^(.+) профайлын зураг$/, (match) => `${match[1]} profile picture`],
  [/^(\d+(?:\.\d+)?% WR · [\d,]+) тоглолт$/, (match) => `${match[1]} matches`],
  [/^(\d+) hero · Мэдээлэл бэлэн$/, (match) => `${match[1]} heroes · Data ready`],
  [/^(\d+) тоглолтын win rate$/, (match) => `${match[1]}-match win rate`],
  [/^(\d+) хоногт (\d+) тоглолт$/, (match) => `${match[1]} days · ${match[2]} matches`],
  [/^(\d+) тоглолт$/, (match) => `${match[1]} matches`],
  [/^Сонгосон (\d+) тоглолт$/, (match) => `${match[1]} matches selected`],
  [/^(.+)-д санал болгож буй хэрэгслийн бүрдэл\./, (match) => `Recommended build for ${match[1]}.`],
];

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function translate(value: string, language: Language) {
  if (language === "mn") {
    if (/^Item тай\uFFFD{2}барыг хаах$/.test(value)) {
      return "Item тайлбарыг хаах";
    }
    return value
      .replace(/хохирол тэсвэрлэх чадвар/gi, "damage resistance")
      .replace(/хохирол(?:оор|лоор|оос|лын|той|д|ыг|гүй)?/gi, (term) => {
        const suffix = term.slice("хохирол".length).toLowerCase();
        if (suffix === "оор" || suffix === "лоор") return "damage-аар";
        if (suffix === "оос") return "damage-аас";
        if (suffix === "ын") return "damage-ийн";
        if (suffix === "той") return "damage-тай";
        if (suffix === "д") return "damage-д";
        if (suffix === "ыг") return "damage-ийг";
        if (suffix === "гүй") return "damage-гүй";
        return "damage";
      });
  }
  const normalized = normalizeText(value);
  const exact = translations[normalized];
  if (exact) return exact;
  for (const [pattern, render] of dynamicTranslations) {
    const match = normalized.match(pattern);
    if (match) return render(match);
  }
  return value;
}

type TranslationRecord = { source: string; output: string };
type ElementTranslationRecord = {
  sourceHtml: string;
  sourceText: string;
  outputText: string;
};

function translateNode(
  node: Node,
  language: Language,
  textRecords: WeakMap<Node, TranslationRecord>,
  attrRecords: WeakMap<Element, Map<string, TranslationRecord>>,
  elementRecords: WeakMap<Element, ElementTranslationRecord>,
) {
  if (node.nodeType === Node.TEXT_NODE) {
    const current = node.nodeValue ?? "";
    const record = textRecords.get(node);
    const source = record && current === record.output ? record.source : current;
    const output = translate(source, language);
    if (output !== current) node.nodeValue = output;
    textRecords.set(node, { source, output });
    return;
  }

  if (node instanceof Element) {
    // Components that already render both languages opt out of DOM translation.
    if (node.closest("[data-no-translate]")) return;
    if (node.matches(".localized-guide-text")) {
      const currentText = node.textContent ?? "";
      const record = elementRecords.get(node);
      const sourceHtml =
        record && currentText === record.outputText
          ? record.sourceHtml
          : node.innerHTML;
      const sourceText =
        node.getAttribute("data-source-text") ??
        (record && currentText === record.outputText
          ? record.sourceText
          : currentText);
      const outputText = translate(sourceText, language);
      if (language === "en") {
        if (currentText !== outputText) node.textContent = outputText;
      } else if (node.innerHTML !== sourceHtml) {
        node.innerHTML = sourceHtml;
      }
      elementRecords.set(node, { sourceHtml, sourceText, outputText });
    }

    for (const attribute of ["aria-label", "alt", "placeholder", "title"]) {
      if (!node.hasAttribute(attribute)) continue;
      const current = node.getAttribute(attribute) ?? "";
      let records = attrRecords.get(node);
      if (!records) {
        records = new Map();
        attrRecords.set(node, records);
      }
      const record = records.get(attribute);
      const source = record && current === record.output ? record.source : current;
      const output = translate(source, language);
      if (output !== current) node.setAttribute(attribute, output);
      records.set(attribute, { source, output });
    }
  }

  for (const child of node.childNodes) {
    translateNode(child, language, textRecords, attrRecords, elementRecords);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("mn");
  const textRecords = useRef(new WeakMap<Node, TranslationRecord>());
  const attrRecords = useRef(new WeakMap<Element, Map<string, TranslationRecord>>());
  const elementRecords = useRef(new WeakMap<Element, ElementTranslationRecord>());

  useEffect(() => {
    const saved = window.localStorage.getItem("deadlock-language");
    if (saved === "en" || saved === "mn") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const localizedTitle =
      language === "en"
        ? "Deadlock Item Guide — Mongolia"
        : "Deadlock хэрэгслийн тайлбар — Монгол";
    const localizedDescription =
      language === "en"
        ? "Deadlock item guide with hero builds, item tips, and player stats for the Mongolian Deadlock community."
        : "Deadlock item бүрийн Монгол тайлбар, hero/build тохироо, counter зөвлөмж болон Монгол тоглогчдын Deadlock Mongolia Discord community.";
    const updateTitle = () => {
      // Sub-pages (e.g. /privacy) manage their own titles.
      if (window.location.pathname !== "/") return;
      if (document.title !== localizedTitle) document.title = localizedTitle;
    };
    updateTitle();
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", localizedDescription);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute("content", localizedTitle);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute("content", localizedDescription);
    window.localStorage.setItem("deadlock-language", language);

    const titleObserver = new MutationObserver(updateTitle);
    titleObserver.observe(document.head, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    const translateSubtree = (node: Node) =>
      translateNode(
        node,
        language,
        textRecords.current,
        attrRecords.current,
        elementRecords.current,
      );
    translateSubtree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          translateSubtree(mutation.target);
        } else if (mutation.type === "characterData") {
          translateSubtree(mutation.target);
        } else {
          mutation.addedNodes.forEach(translateSubtree);
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "alt", "placeholder", "title"],
    });

    return () => {
      observer.disconnect();
      titleObserver.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switcher" role="group" aria-label="Language" data-no-translate>
      <button
        type="button"
        aria-pressed={language === "mn"}
        title="Монгол"
        onClick={() => setLanguage("mn")}
      >
        MN
      </button>
      <button
        type="button"
        aria-pressed={language === "en"}
        title="English"
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
