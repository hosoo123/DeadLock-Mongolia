"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Language = "mn" | "en";

const translations: Record<string, string> = {
  "Тоглоом сонгох": "Choose a game",
  "Item тайлбарыг хаах": "Close item details",
  "Hero-оо сонгоно уу": "Choose a hero",
  "Тоглоомын сонголт": "Game selection",
  "Live meta · Сүүлийн 30 хоног": "Live Meta · Last 30 Days",
  "Deadlock · Reference No. 03": "Deadlock · Reference No. 03",
  "Хэрэгслийн тайлбар": "Item Guide",
  "Хэрэгсэл дээр дараад яаж ажилладаг, ямар баатарт тохирдог, хэзээ авах болон ямар дайсны эсрэг ашиглахыг нэг дороос хараарай.":
    "Select an item to see how it works, which heroes it suits, when to buy it, and what it counters.",
  "Монгол тоглогчидтой танилцаж, хамт тоглох хүн олох, build болон item-ийн мэдээлэл солилцох community-д нэгдээрэй.":
    "Meet Mongolian players, find teammates, and share builds and item tips with the community.",
  "Deadlock Mongolia Discord серверт нэгдэх": "Join the Deadlock Mongolia Discord server",
  "Discord-д нэгдэх": "Join Discord",
  "Сүүлийн 30 хоног": "Last 30 days",
  "Баатрын хэрэгслийн бүрдэл гаргах": "Hero Build Generator",
  "Баатраа сонгоход сүүлийн үеийн бодит тоглолтын хэрэгслийн сонголт, ялалтын хувь болон ашигласан тоглолтын тоог харьцуулна. Дараа нь тоглолтын эхнээс төгсгөл хүртэл авахад хялбар дараалал санал болгоно.":
    "Choose a hero to compare recent item picks, win rates, and match counts. Get a suggested item order from lane start to late game.",
  "Шинэ мэдээлэл шалгаж байна…": "Checking for recent data…",
  "Hero сонгох": "Choose a hero",
  "Hero мэдээлэл ачаалж байна…": "Loading hero data…",
  "Зургаар баатар сонгох": "Choose a hero by portrait",
  "Бүрдэл гаргах": "Generate build",
  "Тооцоолж байна…": "Calculating…",
  "Item нэрээр хайх...": "Search items...",
  "Бүгд": "All",
  "Түвшин 1": "Tier 1",
  "Түвшин 2": "Tier 2",
  "Түвшин 3": "Tier 3",
  "Түвшин 4": "Tier 4",
  "Тохирох item олдсонгүй.": "No matching items found.",
  "Дэмжлэг үзүүлэх": "Support the project",
  "Энэ каталог хэрэг болсон бол QR кодыг уншуулж хүссэн дүнгээрээ дэмжлэг үзүүлээрэй. Баярлалаа ❤️":
    "If this catalog helped you, scan the QR code to support the project with any amount. Thank you ❤️",
  "энэ QR код нь зөвхөн SocialPay-тэй хүмүүст л болно":
    "This QR code is only available to SocialPay users.",
  "Хуудасны хэсгүүд": "Page sections",
  "Каталог": "Catalog",
  "Тоглогч": "Players",
  "Сүүлийн өөрчлөлтүүд": "Latest Updates",
  "City Never Sleeps цувралын шинэ баатрууд болон item-ийн meta өөрчлөлтийг Монгол хэлээр товчлоод нэг дор цуглууллаа.":
    "A quick overview of new City Never Sleeps heroes and item meta changes.",
  "Шинэчлэл идэвхтэй": "Live update",
  "Шинэ баатар": "New Hero",
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
  "Тайлбарууд нь тоглолтын практик хэрэглээгээр хөрвүүлсэн. Patch өөрчлөгдөхөд дахин шинэчилнэ.":
    "Descriptions focus on practical use and will be updated as the patch changes.",
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
  "Юу хийдэг вэ?": "What does it do?",
  "Яаж ашиглах вэ?": "How to use",
  "Хэзээ авах вэ?": "When to buy",
  "Хэнд тохирох вэ?": "Who is it for?",
  "Санамж": "Tip",
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
  "☕ Дэмжлэг үзүүлэх": "☕ Support the project",
  "Банк:": "Bank:",
  "Голомт банк": "Golomt Bank",
  "QR-аар шууд уншуулж төлнө": "Pay by scanning the QR code.",
  "QR код дээр дарвал томоор нээгдэнэ.": "Click the QR code to enlarge it.",
  "Шугамын эхлэл": "Lane Start",
  "Тоглолтын эхэн": "Early Game",
  "Тоглолтын дунд үе": "Mid Game",
  "Тоглолтын төгсгөл": "Late Game",
  "Баатрын үүрэгтэй тохирсон": "Matches the hero's role",
  "Мэдээлэл хангалтгүй": "Not enough data",
  "Эхлээд баатраа сонгоно уу.": "Choose a hero first.",
  "Сүүлийн 30 хоногийн бодит тоглолтод хэдэн удаа ашигласан болон ялалтын хувийг хамтад нь харьцуулж эрэмбэлэв.":
    "Ranked using recent 30-day match counts and win rates.",
  "Шинэ мэдээлэл түр ирээгүй тул баатрын үндсэн үүрэг болон хэрэгслүүдийн зохицолд тулгуурласан санал харуулж байна.":
    "Live data is temporarily unavailable; this build is based on the hero's role and item synergy.",
  "Энэ нь баримжаа болохоос тоглолт бүрт өөрчлөхгүй хатуу дараалал биш.":
    "Use this as a guide, not a fixed order for every match.",
  "Шинэ мэдээлэл түр ирээгүй": "Live data is temporarily unavailable",
  "Дараа дахин шинэчилнэ": "Try again later",
  "Offline fallback · Дараа дахин шинэчилнэ": "Offline fallback · Try again later",
  "-д санал болгож буй хэрэгслийн бүрдэл. Заавал яг энэ дарааллаар авах албагүй. Тоглож буй шугам, дайсны баатрууд болон өөрт тулгарсан асуудалд тааруулж хамгаалах эсвэл сөрөх хэрэгслээр сольж болно.":
    " recommended build. This order is not mandatory. Adjust it to your lane, enemy heroes, and the situation by swapping in defensive or counter items.",
  "Хуулагдлаа ✓": "Copied ✓",
  "Товч тайлбар хуулах": "Copy quick guide",
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
  "Дэлгэрэнгүй тайлбар хуулах": "Copy quick guide",
  "Дараагийн хүчтэй хувилбар": "Next upgrade",
  "ТҮВШИН": "TIER",
  "АШИГЛАХ": "ACTIVATE",
  "ХЭЗЭЭ": "WHEN",
  "Товч дарна": "Press the item key",
  "Чадварт холбоно": "Imbue an ability",
  "Өөрөө ажиллана": "Activates automatically",
  "Автоматаар ажиллана": "Activates automatically",
  "Дарж бүрэн тайлбарыг үзнэ": "Click to view full details",
  "Таны үзүүлэлт": "Your stats",
  "Бууны хохирол": "Weapon Damage",
  "Сумны багтаамж": "Max Ammo",
  "Буудах хурд": "Fire Rate",
  "Буугаар амь нөхөх": "Bullet Lifesteal",
  "Чадвараар амь нөхөх": "Spirit Lifesteal",
  "Чадварын хүч": "Spirit Power",
  "Хөдөлгөөний хурд": "Move Speed",
  "Гүйлтийн хурд": "Sprint Speed",
  "Нэмэгдэх амь": "Bonus Health",
  "Амь нөхөлт": "Health Regen",
  "Бууны хамгаалалт": "Bullet Resist",
  "Чадварын хамгаалалт": "Spirit Resist",
  "Дахин бэлэн болох": "Cooldown",
  "Үйлчлэх хугацаа": "Duration",
  "Хүрэх зай": "Range",
  "Хөдөлгөөний цэнэг": "Stamina",
  "Гар цохилтын хохирол": "Melee Damage",
  "Melee хамгаалалт": "Melee Resist",
  "Тоглолтын эхэнд, хямдхан хүч авахдаа.": "Buy early for an affordable power boost.",
  "Эхэн–дунд үед build-ээ хүчтэй болгохдоо.": "Buy in the early-to-mid game to strengthen your build.",
  "Дунд үед гол build-ээ гүйцээхдээ.": "Buy in the mid game to complete your core build.",
  "Сүүлд, үндсэн item-уудаа авсны дараа.": "Buy late, after completing your core items.",
  "Item бэлэн эсэхийг шалга.": "Check that the item is ready.",
  "Тулааны чухал мөчид item-ийн товчоо дар.": "Use the item key at a critical moment in a fight.",
  "Авахдаа хамгийн их ашигладаг чадвартайгаа холбо.": "Imbue the ability you use most.",
  "Тэр чадвараа ашиглахад item-ийн нөлөө орно.": "The item effect activates when you use that ability.",
  "Товч дарахгүй.": "No key press required.",
  "Толгойд оноход нэмэлт нөлөө орно.": "Landing a headshot activates the bonus effect.",
  "Сумаа цэнэглэх үед нөлөө нь ажиллана.": "The effect activates when you reload.",
  "Дайсандаа ойр байхад хүч нь орно.": "The bonus applies at close range.",
  "Дайснаас зайтай байхад хүч нь орно.": "The bonus applies at long range.",
  "Авсан даруйдаа өөрөө ажиллана.": "Activates automatically when purchased.",
  "Дайсан heal багасгах item авбал хүч нь буурна.": "Less effective against enemies with anti-heal items.",
  "Толгойд тогтмол онодог бол илүү ашигтай.": "More effective if you can consistently land headshots.",
  "Дайсандаа ойртож чаддаг үедээ ав.": "Buy when you can reliably get into close range.",
  "Зайгаа сайн барьж тоглодог үедээ ав.": "Buy when you can maintain distance.",
  "Буугаар гол damage гаргадаг build-д тохирно.": "Best suited for weapon-damage builds.",
  "Хэт олон хамгаалалтын item авбал damage дутаж магадгүй.": "Too many defensive items may leave you short on damage.",
  "Чадвараа ойр ойрхон ашигладаг build-д илүү тохирно.": "Best suited for builds that use abilities frequently.",
  "Хэрэгслийг авсан даруйд үндсэн нэмэгдэл нь байнга ажиллана.":
    "The item's base bonus is always active once purchased.",
};

const itemDescriptionTranslations: Record<string, string> = {
  "Ойрын зайд бууны хохирол нэмэгдэнэ.": "Increases weapon damage at close range.",
  "Сумны багтаамж нэмэгдэнэ.": "Increases ammo capacity.",
  "Толгойн цохилтын хохирол нэмэгдэнэ.": "Increases headshot damage.",
  "Сумны хурд болон алсын зайн хохирол сайжирна.": "Increases bullet velocity and long-range damage.",
  "NPC/creep зэрэг чөтгөрт илүү их хохирол өгнө.": "Deals bonus damage to NPCs and creeps.",
  "Буудах хурд (fire rate) нэмэгдэнэ.": "Increases fire rate.",
  "Бууны хохиролоор бага хэмжээний life steal өгнө.": "Grants a small amount of bullet lifesteal.",
  "Идэвхтэй чадвар: цэнэглэлтийг хурдасгана.": "Active: Speeds up your reload.",
  "Буудсаны дараа хөдөлгөөний хурд түр нэмэгдэнэ.": "Temporarily increases movement speed after firing.",
  "Магазин дуусах тусам сум бүрийн хохирол нэмэгдэнэ.": "Each shot deals more damage as your magazine empties.",
  "Dash хийхэд нэмэлт бонус эффект өгнө.": "Grants an additional bonus when you dash.",
  "Алсын зайн бууны хохирол мэдэгдэхүйц сайжирна.": "Significantly increases weapon damage at long range.",
  "Melee цохилт цэнэглэгддэг болж, дараагийн цохилт хүчтэй болно.": "Charges your melee attack, empowering the next strike.",
  "Бууны сум нэмэлт spirit хохирол өгдөг болно.": "Your bullets deal bonus Spirit damage.",
  "Магазины эхний сум(ууд) илүү их хохиролтой.": "The first shot(s) in your magazine deal increased damage.",
  "Идэвхтэй: түр хугацаанд буудах хурд, reload хурдасна.": "Active: Temporarily increases fire rate and reload speed.",
  "Сум онох бүрт өрсөлдөгчийг удаашруулна.": "Your bullets slow enemies on hit.",
  "Spirit shield-тэй өрсөлдөгчид эффектив хохирол.": "Deals increased damage to enemies with Spirit Shields.",
  "Идэвхтэй: буудсан сум задарч олон чиглэлд тархана.": "Active: Your shots split and spread in multiple directions.",
  "Хол зайд байгаа дайсанд нэмэлт хохирол.": "Deals bonus damage to distant enemies.",
  "Attack speed нэмэгдэнэ.": "Increases attack speed.",
  "Магазины багтаамж их хэмжээгээр нэмэгдэнэ.": "Greatly increases magazine capacity.",
  "Толгойн цохилт дайсанд debuff (сулруулах) эффект өгнө.": "Headshots apply a debuff to enemies.",
  "Идэвхтэй: заасан талбайд гал тавьж тасралтгүй хохирол өгнө.": "Active: Sets an area on fire, dealing damage over time.",
  "Сумыг spirit damage-тай холино.": "Adds Spirit damage to your bullets.",
  "HP багасах тусам бууны хохирол нэмэгдэнэ.": "Increases weapon damage as your health decreases.",
  "Идэвхтэй: өөрийн HP зарцуулж их хохирол/бонус авна.": "Active: Sacrifices health for greatly increased damage and bonuses.",
  "Дарахад хэд хэдэн сум цуваагаар гардаг болно.": "Firing releases a rapid burst of multiple bullets.",
  "Идэвхтэй: HP зарцуулж хүчирхэг бонус эффект авна.": "Active: Sacrifices health to gain a powerful bonus.",
  "Хохирол авах тусам resistance (тэсвэржилт) нэмэгдэнэ.": "Taking damage increases your damage resistance.",
  "Магазины эхний сум илүү хурдтай бөгөөд хохиролтой.": "The first shot in your magazine has increased velocity and damage.",
  "Бага HP-той (сул) дайсанд нэмэлт хохирол.": "Deals bonus damage to low-health enemies.",
  "Идэвхтэй: ойролцоох багийн гишүүдэд buff аура өгнө.": "Active: Grants an aura buff to nearby allies.",
  "Маш ойр зайд хохирол нэмэгдэнэ.": "Increases damage at point-blank range.",
  "Ойролцоох дайсныг илрүүлдэг (wallhack төрлийн) эффект.": "Reveals nearby enemies through walls.",
  "Маш ойрхон зайд асар их хохирол өгнө.": "Deals massive damage at point-blank range.",
  "Идэвхтэй: түр хугацаанд нуугдаж/арчлагдаж чадна.": "Active: Temporarily become invisible.",
  "Алсын зайн бонус хохирол улам нэмэгдсээр байна.": "Further increases your bonus damage at long range.",
  "Дайсны spirit shield-ийг устгаж/сулруулна.": "Shreds enemy Spirit Shields.",
  "Сум онсон дайсны ойролцоох бусад дайсан руу цахилгаан chain хийнэ.": "Bullets chain lightning to nearby enemies.",
  "Сум онсон дайсанд хор нэмж, тасралтгүй хохирол өгнө.": "Bullets poison enemies, dealing damage over time.",
  "Сум онохоор knockback/удаашруулах эффект нэмнэ.": "Hits knock enemies back and slow them.",
  "Дайсны armor-ийг тоохгүйгээр шууд хохирол өгнө.": "Deals damage that ignores enemy armor.",
  "Идэвхтэй: цэнэглэгдсэний дараа асар их хохиролтой цохилт.": "Active: Charge up a devastating attack.",
  "Толгойн цохилт онсон дайсныг disable (хөдөлгөөнгүй) болгоно.": "Headshots disable enemies.",
  "Melee чадварыг эрс сайжруулна.": "Greatly improves your melee capabilities.",
  "Kill хийх бүрт хурд/хохирол нэмэгдэнэ (killing streak).": "Kills build a streak that increases your speed and damage.",
  "Бууны хохирол ихээр нэмэгдэнэ, харин өөрийн эмзэг байдал нэмэгдэнэ.": "Greatly increases weapon damage but makes you more vulnerable.",
  "Санамсаргүй байдлаар crit хохирол өгдөг магазин.": "Your magazine has a chance to deal critical damage.",
  "Сум нэг дайснаас нөгөө дайсан руу секээд шилждэг болно.": "Bullets ricochet from one enemy to another.",
  "Дайсны spirit ур чадварыг хааж (silence) идэвхгүй болгоно.": "Silences enemies, disabling their Spirit abilities.",
  "Бууны хохирлыг spirit ур чадварт хувиргаж нэмнэ.": "Converts weapon damage into bonus Spirit damage.",
  "Илүү зогсоосон spirit item-ийн (6-р слот) эффектийг сайжруулна.": "Enhances the effect of the Spirit item in your sixth slot.",
  "Max HP нэмэгдэнэ.": "Increases maximum health.",
  "HP сэргэх (regen) хурд нэмэгдэнэ.": "Increases health regeneration.",
  "Dash/sprint-ийн нэмэлт цэнэг өгнө.": "Grants an additional dash or sprint charge.",
  "Идэвхтэй: debuff-ийн үргэлжлэх хугацааг богиносгоно.": "Active: Reduces the duration of debuffs.",
  "Идэвхтэй: өөрийгөө болон ойролцоох багийнхныг эмчилнэ.": "Active: Heals you and nearby allies.",
  "Melee цохилтоор HP сэргээнэ.": "Melee attacks restore health.",
  "Дайсан ойролцоо байх үед buff идэвхждэг.": "Activates a buff when enemies are nearby.",
  "Хөдөлгөөний хурд нэмэгдэнэ.": "Increases movement speed.",
  "HP болон бууны хохирлын resistance хамтад нь нэмэгдэнэ.": "Increases health and bullet damage resistance.",
  "Бууны сумаар HP сэргээнэ.": "Bullets restore health.",
  "Дайсны debuff-ийн үргэлжлэх хугацааг богиносгоно.": "Reduces the duration of enemy debuffs.",
  "Ойролцоох дайсанд тасралтгүй бага хохирол (аура) өгнө.": "Deals low damage over time to nearby enemies.",
  "Хөдөлгөөний хурд болон damage resistance нэгтгэсэн бонус.": "Increases movement speed and damage resistance.",
  "Идэвхтэй: түр зуурын shield нэмж өгнө.": "Active: Grants a temporary shield.",
  "Дайсны эмчилгээний (heal) үр дүнг бууруулна.": "Reduces healing received by enemies.",
  "Өөрийн авах эмчилгээний эффект сайжирна.": "Increases healing received.",
  "Хохирол авахад автоматаар түр shield үүсгэнэ.": "Taking damage automatically grants a temporary shield.",
  "Идэвхтэй: их хэмжээний эмчилгээ хийнэ.": "Active: Restores a large amount of health.",
  "Идэвхтэй: авсан хохирлын нэг хэсгийг буцаана (reflect).": "Active: Reflects a portion of the damage you take.",
  "Spirit хохиролоор HP сэргээнэ.": "Spirit damage restores health.",
  "Spirit-ээс хүлээн авах хохирлыг бууруулна.": "Reduces damage taken from Spirit.",
  "Kill хийхэд нэмэлт бонус эффект авна.": "Gain an additional bonus when you secure a kill.",
  "Бууны хохирлыг бууруулна.": "Reduces bullet damage taken.",
  "Бууны хохирлын эсрэг resistance ихээхэн нэмэгдэнэ.": "Greatly increases bullet damage resistance.",
  "Дайсны spirit ур чадварыг блоклоно.": "Blocks enemy Spirit abilities.",
  "Идэвхтэй: өөрийн дээрх debuff-үүдийг арилгана.": "Active: Removes debuffs from yourself.",
  "Их хэмжээний HP болон resistance хамтад нь өгнө.": "Grants a large amount of health and damage resistance.",
  "Идэвхтэй: HP багасах тусам түр хугацаанд хүчирхэгжинэ.": "Active: Temporarily grows stronger as your health decreases.",
  "Идэвхтэй: ойролцоох талбайд эмчилгээ тарааж өгнө.": "Active: Heals allies in a nearby area.",
  "Идэвхтэй: их хохирол өгөөд эргээд их хэмжээний heal авна.": "Active: Deals heavy damage and restores a large amount of health.",
  "Идэвхтэй: хол зайд үсэрч шилжинэ.": "Active: Leap a long distance.",
  "Идэвхтэй: түр хугацаанд асар их damage reduction авна.": "Active: Greatly reduces damage taken for a short time.",
  "Идэвхтэй: багийн гишүүнийг өөр рүүгээ татаж авчирна.": "Active: Pulls an ally to your location.",
  "Spirit хохирлын эсрэг resistance ихээхэн нэмэгдэнэ.": "Greatly increases Spirit damage resistance.",
  "Dash/sprint-ийн цэнэгийн тоо нэмэгдэнэ.": "Increases your dash or sprint charges.",
  "Идэвхтэй: түр хугацаанд үл үзэгдэгч (invisible) болно.": "Active: Become invisible for a short time.",
  "Идэвхтэй: богино зайд шуурхай teleport хийнэ.": "Active: Instantly teleport a short distance.",
  "Үхэх ёстой цохилтыг зорчиж, бага хэмжээний HP-тэй амьд үлдэнэ.": "Survive a lethal hit with a small amount of health.",
  "Их хэмжээний HP, resistance авч, биеийн хэмжээ томорно.": "Gain a large amount of health and resistance, and grow in size.",
  "Идэвхтэй: маш их HP-тэй shield үүсгэнэ.": "Active: Create a shield with a large amount of health.",
  "Идэвхтэй: прожектайл төрлийн бууны хохирлын эсрэг resist өгнө.": "Active: Grants resistance to projectile-based weapon damage.",
  "Идэвхтэй: шуурхай их хэмжээний heal (burst) хийнэ.": "Active: Quickly restores a large amount of health.",
  "Crowd control (CC) эффектийн эсрэг resistance ихээхэн нэмэгдэнэ.": "Greatly increases resistance to crowd control.",
  "Идэвхтэй: ойролцоох багийнхандаа buff/heal аура тараана.": "Active: Grants nearby allies a buff and healing aura.",
  "Идэвхтэй: дайсны эмчилгээг бүрэн блоклоно.": "Active: Completely blocks enemy healing.",
  "Kill хийх streak үргэлжлэх тусам хүчирхэг buff авна.": "Builds a stronger buff as your kill streak continues.",
  "Идэвхтэй: маш их хэмжээний lifesteal авна.": "Active: Grants a large amount of lifesteal.",
  "Идэвхтэй: дайсан руу шуурхай dash хийж хохирол өгнө.": "Active: Dash to an enemy and deal damage.",
  "Бууны хохирлын эсрэг маш их resistance өгнө.": "Greatly increases resistance to bullet damage.",
  "Бууны сумны lifesteal ихээхэн нэмэгдэнэ.": "Greatly increases bullet lifesteal.",
  "Идэвхтэй: бүх debuff-ээ цэвэрлээд CC-ийн эсрэг resist авна.": "Active: Removes all debuffs and grants crowd control resistance.",
  "Идэвхтэй: түр хугацаанд CC-д огт үл нөлөөлдөг болно.": "Active: Become immune to crowd control for a short time.",
  "Идэвхтэй: ойролцоох талбайд их хэмжээний AoE lifesteal хийнэ.": "Active: Deals area damage and grants substantial lifesteal.",
  "Дайсан spirit ур чадвар ашиглахад тэднийг удаашруулна.": "Slows enemies when they use Spirit abilities.",
  "Ур чадварын цэнэгийн тоо нэмэгдэнэ.": "Increases ability charges.",
  "Spirit power нэмэгдэнэ.": "Increases Spirit Power.",
  "Идэвхтэй: алт олох бонус өгнө.": "Active: Grants bonus souls.",
  "Ур чадвар ашиглахад дэлбэрэлтийн нэмэлт хохирол өгнө.": "Using an ability triggers an additional damage explosion.",
  "Ур чадварын нөлөөллийн радиус томорно.": "Increases ability radius.",
  "Spirit power-тэй холбоотой HP сэргэлт нэмэгдэнэ.": "Increases health regeneration based on Spirit Power.",
  "Идэвхтэй: их хохиролтой прожектайл шидэнэ.": "Active: Launches a high-damage projectile.",
  "Melee цохилтод spirit хохирол нэмж өгнө.": "Melee attacks deal bonus Spirit damage.",
  "Ур чадвар ашигласны дараа түр хугацаанд buff идэвхжинэ.": "Using an ability grants a temporary buff.",
  "Дайсны бууны resistance-ийг бууруулна.": "Reduces enemy bullet resistance.",
  "Идэвхтэй: заасан талбайг мөслөж, удаашруулна.": "Active: Freezes and slows enemies in a targeted area.",
  "Ур чадварын cooldown-г богиносгодог imbue.": "Imbues an ability to reduce its cooldown.",
  "Ур чадварын үргэлжлэх хугацааг сунгадаг imbue.": "Imbues an ability to increase its duration.",
  "Spirit power их хэмжээгээр нэмэгдэнэ.": "Greatly increases Spirit Power.",
  "Ур чадвар онох бүрт дайсныг удаашруулна.": "Abilities slow enemies on hit.",
  "Ур чадвараар онсон дайсан нэмэлт хохирол хүлээж авдаг болно.": "Enemies hit by your abilities take bonus damage.",
  "Reload-ийн хурдыг нэмэгдүүлдэг imbue.": "Imbues an ability to increase reload speed.",
  "Идэвхтэй: target-ийг чиглүүлж удаашруулна.": "Active: Targets and slows an enemy.",
  "Идэвхтэй: дайсны spirit power-ийг авч өөртөө шилжүүлнэ.": "Active: Steals Spirit Power from an enemy.",
  "Дайсны ур чадварыг түр хугацаанд disable хийнэ.": "Temporarily disables an enemy ability.",
  "Идэвхтэй: дайсны эмчилгээг блоклож, тасралтгүй хохирол өгнө.": "Active: Blocks enemy healing and deals damage over time.",
  "Идэвхтэй: дайсны бууг түр хугацаанд disable хийнэ.": "Active: Temporarily disables an enemy's weapon.",
  "Ур чадварын нөлөөллийн радиус ихээхэн томорно.": "Greatly increases ability radius.",
  "Идэвхтэй: том хэмжээний knockback эффект өгнө.": "Active: Applies a powerful knockback.",
  "Spirit power-тэй холбоотой HP regen ихээхэн нэмэгдэнэ.": "Greatly increases health regeneration based on Spirit Power.",
  "Ур чадварын цэнэг хурдан дүүрдэг болно.": "Abilities recharge faster.",
  "Идэвхтэй: том талбайд silence эффект тараана.": "Active: Silences enemies in a large area.",
  "Ур чадвараар дайсны spirit power авна.": "Abilities steal Spirit Power from enemies.",
  "Ур чадварын cooldown ихээхэн богиносно.": "Greatly reduces ability cooldowns.",
  "Ур чадварын үргэлжлэх хугацаа ихээхэн сунгагдана.": "Greatly increases ability duration.",
  "Ур чадвар ашигласны дараа spirit burst нэмдэг imbue.": "Imbues an ability to trigger a Spirit burst after use.",
  "Их HP-той дайсанд нэмэлт хохирол.": "Deals bonus damage to enemies with high health.",
  "Дайсныг тасралтгүй damage over time-д оруулна.": "Inflicts damage over time on enemies.",
  "Идэвхтэй: том хэмжээний мөс/удаашруулах бөмбөг шиднэ.": "Active: Throws a large freezing orb that slows enemies.",
  "Spirit power ихээхэн хэмжээгээр нэмэгдэнэ.": "Greatly increases Spirit Power.",
  "Идэвхтэй: дайсны spirit power-ийг авна.": "Active: Steals Spirit Power from an enemy.",
  "Идэвхтэй: сүүлд ашигласан ур чадвараа давтан идэвхжүүлнэ.": "Active: Recasts your most recently used ability.",
  "Дайсныг олон удаа онох тусам эмзэг байдал нь нэмэгдэнэ.": "Repeated hits make enemies more vulnerable.",
  "Идэвхтэй: түр хугацаанд материаллаг бус болж attack-аас зайлсхийнэ.": "Active: Become ethereal and avoid attacks for a short time.",
  "Ур чадварын алсын зай, нарийвчлал сайжирна.": "Increases ability range and accuracy.",
  "Идэвхтэй: цахилгаан chain хохирол дайснуудад дамжуулна.": "Active: Chains electric damage between enemies.",
  "Идэвхтэй: түр хугацаанд нисдэг болно.": "Active: Fly for a short time.",
  "Бууг spirit-тэй хослуулдаг imbue.": "Imbues an ability to combine it with your weapon.",
  "Ур чадвар давхар удаа идэвхждэг imbue.": "Imbues an ability to activate twice.",
  "Идэвхтэй: бүх ур чадварын cooldown-г шууд цэвэрлэнэ.": "Active: Instantly refreshes all ability cooldowns.",
  "Идэвхтэй: их хэмжээний AoE spirit хохирол өгнө.": "Active: Deals heavy area-of-effect Spirit damage.",
  "Идэвхтэй: дайсны spirit power-ийг шатааж багасгана.": "Active: Burns away an enemy's Spirit Power.",
  "Ур чадварын cooldown маш ихээр богиносно.": "Massively reduces ability cooldowns.",
  "Идэвхтэй: дайсныг татаж, торонд бариулна.": "Active: Pulls enemies in and traps them in a cage.",
};

const dynamicTranslations: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
  [/^Item тай\uFFFD{2}барыг хаах$/, () => "Close item details"],
  [/^(.+) item-ийн дэлгэрэнгүй тайлбарыг нээх$/, (match) => `Open ${match[1]} item details`],
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
  const exact = translations[normalized] ?? itemDescriptionTranslations[normalized];
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
    <>
      {children}
      <nav className="language-switcher" aria-label="Language">
        <button
          type="button"
          aria-pressed={language === "en"}
          aria-label="English"
          title="English"
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
        <button
          type="button"
          aria-pressed={language === "mn"}
          aria-label="Mongolian"
          title="Mongolian"
          onClick={() => setLanguage("mn")}
        >
          MN
        </button>
      </nav>
    </>
  );
}
