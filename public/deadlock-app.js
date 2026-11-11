/*
  Deadlock Mongolia — build generator (vanilla JS).

  Item каталог, item хуудас, counter helper нь React (components/, lib/items.ts).
  Энд зөвхөн hero build generator, дээш очих товч, төлбөрийн мэдэгдэл үлдсэн.
  window.ITEM_DATA-г components/deadlock-guide.tsx inline script-ээр өгнө.
*/

      const DATA = window.ITEM_DATA || {};

      // 2026 оны playable roster. Шинэ hero нэмэгдэхэд энэ жагсаалт болон
      // тохирох role pool-ийг шинэчлэхэд бүх item guide дагаж шинэчлэгдэнэ.
      const ALL_HEROES = [
        "Abrams",
        "Apollo",
        "Bebop",
        "Billy",
        "Calico",
        "Celeste",
        "Drifter",
        "Dynamo",
        "Fathom",
        "Graves",
        "Grey Talon",
        "Haze",
        "Holliday",
        "Infernus",
        "Ivy",
        "Kelvin",
        "Lady Geist",
        "Lash",
        "McGinnis",
        "Mina",
        "Mirage",
        "Mo & Krill",
        "Paige",
        "Paradox",
        "Pocket",
        "Rem",
        "Seven",
        "Shiv",
        "Silver",
        "Sinclair",
        "The Doorman",
        "Venator",
        "Victor",
        "Vindicta",
        "Viscous",
        "Vyper",
        "Warden",
        "Wraith",
        "Yamato",
      ];

      const HERO_POOLS = {
        weapon: [
          "Haze",
          "Wraith",
          "Infernus",
          "Ivy",
          "McGinnis",
          "Venator",
          "Victor",
          "Silver",
          "Vyper",
        ],
        precision: [
          "Vindicta",
          "Grey Talon",
          "Paradox",
          "Holliday",
          "Venator",
          "Victor",
        ],
        close: [
          "Abrams",
          "Shiv",
          "Mo & Krill",
          "Yamato",
          "Silver",
          "Apollo",
          "Calico",
          "Fathom",
        ],
        spirit: [
          "Seven",
          "Lady Geist",
          "Bebop",
          "Pocket",
          "Dynamo",
          "Graves",
          "Celeste",
          "Sinclair",
          "Mina",
          "Rem",
        ],
        mobility: [
          "Lash",
          "Pocket",
          "Yamato",
          "Ivy",
          "Celeste",
          "Calico",
          "Drifter",
          "Vyper",
        ],
        tank: [
          "Abrams",
          "Mo & Krill",
          "Shiv",
          "Kelvin",
          "Silver",
          "Warden",
          "The Doorman",
          "Viscous",
        ],
        support: [
          "Dynamo",
          "Ivy",
          "Kelvin",
          "McGinnis",
          "Rem",
          "Paige",
          "The Doorman",
          "Viscous",
        ],
        sustain: [
          "Abrams",
          "Shiv",
          "Infernus",
          "Dynamo",
          "Lady Geist",
          "Silver",
          "Fathom",
          "Rem",
        ],
      };

      const API_BASE = "https://api.deadlock-api.com/v1";
      const META_WINDOW_DAYS = 30;
      const API_CACHE_HOURS = 6;
      let liveHeroes = [];
      let liveItems = [];

      function readCache(key) {
        try {
          const cached = JSON.parse(localStorage.getItem(key));
          if (
            !cached ||
            Date.now() - cached.savedAt > API_CACHE_HOURS * 3600000
          )
            return null;
          return cached.data;
        } catch {
          return null;
        }
      }

      function writeCache(key, data) {
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ savedAt: Date.now(), data }),
          );
        } catch {}
      }

      async function fetchJson(path, cacheKey) {
        const cached = readCache(cacheKey);
        if (cached) return cached;
        const controller =
          typeof AbortController !== "undefined" ? new AbortController() : null;
        const timeout = setTimeout(() => controller?.abort(), 10000);
        try {
          const response = await fetch(`${API_BASE}${path}`, {
            headers: { Accept: "application/json" },
            signal: controller?.signal,
          });
          if (!response.ok) throw new Error(`API ${response.status}`);
          const data = await response.json();
          writeCache(cacheKey, data);
          return data;
        } finally {
          clearTimeout(timeout);
        }
      }

      async function fetchAssetData(localPath, remotePath, cacheKey) {
        try {
          const response = await fetch(localPath, {
            headers: { Accept: "application/json" },
          });
          if (!response.ok) throw new Error(`Local asset ${response.status}`);
          return await response.json();
        } catch {
          return fetchJson(remotePath, cacheKey);
        }
      }

      function heroName(hero) {
        return (
          hero.name ||
          hero.localized_name ||
          hero.display_name ||
          hero.class_name ||
          `Hero ${hero.id}`
        );
      }

      function itemName(item) {
        return (
          item.name ||
          item.localized_name ||
          item.display_name ||
          item.class_name ||
          `Item ${item.id}`
        );
      }

      function normalizeName(value) {
        return String(value || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "");
      }

      function itemTier(item) {
        const cost = Number(item.cost || item.shop_price || item.price || 0);
        return Number(
          item.tier ||
            item.item_tier ||
            (cost <= 800 ? 1 : cost <= 1600 ? 2 : cost <= 3200 ? 3 : 4),
        );
      }

      function itemSlot(item) {
        return String(
          item.item_slot_type ||
            item.slot_type ||
            item.shop_category ||
            "utility",
        ).toLowerCase();
      }

      function isPlayableHero(hero) {
        return (
          hero &&
          hero.id != null &&
          hero.disabled !== true &&
          hero.in_development !== true &&
          hero.is_selectable !== false &&
          hero.player_selectable !== false
        );
      }

      function localFallbackHeroes() {
        return ALL_HEROES.map((name, index) => ({
          id: `local-${index}`,
          name,
          fallback: true,
        }));
      }

      function heroImage(hero) {
        const images = hero?.images || {};
        const candidates = [images.icon_hero_card, images.hero_card, images.icon, images.portrait, hero?.icon_hero_card, hero?.hero_card, hero?.image, hero?.image_url, hero?.portrait, hero?.portrait_url];
        return candidates.find((value) => typeof value === "string" && /^(?:https?:\/\/|\/)/i.test(value)) || "";
      }

      function renderHeroPicker(heroes) {
        const picker = document.getElementById("heroPicker");
        if (!picker) return;
        const sorted = [...heroes].sort((a, b) => heroName(a).localeCompare(heroName(b)));
        picker.innerHTML = sorted.map((hero) => {
          const name = heroName(hero), image = heroImage(hero);
          const selected = String(hero.id) === document.getElementById("heroSelect").value;
          return `<button class="hero-pick${selected ? " selected" : ""}" type="button" data-hero-id="${escapeHtml(hero.id)}" aria-pressed="${selected}" aria-label="${escapeHtml(name)}" title="${escapeHtml(name)}"><span class="hero-pick-image">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}<span class="hero-pick-initial">${escapeHtml(name.slice(0, 1))}</span></span><span class="hero-pick-name">${escapeHtml(name)}</span></button>`;
        }).join("");
      }
      function populateHeroSelect(heroes) {
        const select = document.getElementById("heroSelect");
        const sorted = [...heroes].sort((a, b) =>
          heroName(a).localeCompare(heroName(b)),
        );
        select.innerHTML =
          '<option value="">Hero-оо сонгоно уу</option>' +
          sorted
            .map(
              (hero) =>
                `<option value="${escapeHtml(hero.id)}">${escapeHtml(heroName(hero))}</option>`,
            )
            .join("");
        renderHeroPicker(heroes);
        document.getElementById("generateBuild").disabled = false;
      }

      async function initializeLiveMeta() {
        const status = document.getElementById("apiStatus");
        try {
          const [heroes, items] = await Promise.all([
            fetchAssetData(
              "/data/deadlock-heroes.json",
              "/assets/heroes?language=english",
              "deadlock-heroes-v1",
            ),
            fetchAssetData(
              "/data/deadlock-items.json",
              "/assets/items/by-type/upgrade?language=english",
              "deadlock-items-v1",
            ),
          ]);
          liveHeroes = (
            Array.isArray(heroes) ? heroes : heroes.heroes || []
          ).filter(isPlayableHero);
          liveItems = Array.isArray(items) ? items : items.items || [];
          populateHeroSelect(
            liveHeroes.length ? liveHeroes : localFallbackHeroes(),
          );
          status.textContent = `${liveHeroes.length || ALL_HEROES.length} hero · Мэдээлэл бэлэн`;
          status.classList.add("live");
        } catch (error) {
          liveHeroes = localFallbackHeroes();
          populateHeroSelect(liveHeroes);
          status.textContent = "Offline fallback · Дараа дахин шинэчилнэ";
          status.classList.add("offline");
        }
      }

      function statNumber(stat, keys) {
        for (const key of keys)
          if (Number.isFinite(Number(stat[key]))) return Number(stat[key]);
        return 0;
      }

      function scoreItemStat(stat) {
        const matches = statNumber(stat, [
          "matches",
          "matches_played",
          "match_count",
          "total_matches",
          "count",
        ]);
        const wins = statNumber(stat, ["wins", "win_count"]);
        const rawRate = statNumber(stat, ["winrate", "win_rate"]);
        const rate = rawRate
          ? rawRate > 1
            ? rawRate / 100
            : rawRate
          : matches
            ? wins / matches
            : 0.5;
        // Бага sample-тай, санамсаргүй өндөр win rate-ийг хэт дээгүүр эрэмбэлэхээс хамгаална.
        const confidence = matches / (matches + 250);
        return {
          matches,
          rate,
          score:
            rate * confidence +
            0.5 * (1 - confidence) +
            Math.log10(matches + 1) * 0.008,
        };
      }

      function resolveStatItem(stat) {
        const id = stat.item_id ?? stat.id;
        return liveItems.find((item) => String(item.id) === String(id)) || null;
      }

      function fallbackBuildForHero(name) {
        const pool = HERO_POOLS.precision.includes(name)
          ? HERO_POOLS.precision
          : HERO_POOLS.close.includes(name)
            ? HERO_POOLS.close
            : HERO_POOLS.spirit.includes(name)
              ? HERO_POOLS.spirit
              : HERO_POOLS.tank.includes(name)
                ? HERO_POOLS.tank
                : HERO_POOLS.weapon;
        const keywords =
          pool === HERO_POOLS.precision
            ? /headshot|long range|sharpshooter|express shot/i
            : pool === HERO_POOLS.close
              ? /close quarters|melee|point blank|lifestrike|colossus/i
              : pool === HERO_POOLS.spirit
                ? /spirit|mystic|cooldown|expansion|exposure/i
                : pool === HERO_POOLS.tank
                  ? /health|resilience|barrier|fortitude|armor/i
                  : /magazine|rounds|burst fire|ricochet|silencer/i;
        return Object.values(DATA)
          .flatMap((shop) => shop.items)
          .filter((item) => keywords.test(item.n));
      }

      function selectBuildItems(stats, heroNameValue) {
        let ranked = stats
          .map((stat) => {
            const remote = resolveStatItem(stat);
            const metric = scoreItemStat(stat);
            return remote
              ? {
                  remote,
                  metric,
                  name: itemName(remote),
                  tier: itemTier(remote),
                  slot: itemSlot(remote),
                }
              : null;
          })
          .filter(Boolean)
          .filter((entry) => entry.metric.matches >= 20)
          .sort((a, b) => b.metric.score - a.metric.score);

        if (!ranked.length) {
          ranked = fallbackBuildForHero(heroNameValue).map((item) => ({
            name: item.n,
            tier: item.t,
            slot: "recommended",
            metric: { matches: 0, rate: 0, score: 0 },
            fallback: true,
          }));
        }

        const used = new Set();
        const take = (tier, limit) =>
          ranked
            .filter((entry) => entry.tier === tier && !used.has(entry.name))
            .slice(0, limit)
            .map((entry) => {
              used.add(entry.name);
              return entry;
            });
        return [
          { title: "Lane үе", items: take(1, 3) },
          { title: "Эхэн үе", items: take(2, 3) },
          { title: "Дунд үе", items: take(3, 3) },
          { title: "Late game", items: take(4, 3) },
        ];
      }

      function itemSlug(name) {
        const key = normalizeName(name);
        for (const shop of Object.values(DATA)) {
          const found = shop.items.find((item) => normalizeName(item.n) === key || (item.alias && normalizeName(item.alias) === key));
          if (found) return found.slug;
        }
        return null;
      }

      function buildItemHtml(entry) {
        const meta = entry.metric.matches
          ? `${(entry.metric.rate * 100).toFixed(1)}% WR · ${entry.metric.matches.toLocaleString()} тоглолт`
          : "Hero-гийн role-д тохирсон";
        const slug = itemSlug(entry.name);
        const body = `<span>${escapeHtml(entry.name)}</span><small>${escapeHtml(meta)}</small>`;
        // Item хуудас байвал линк болгоно — build-ээс шууд тайлбар руу орно.
        return slug
          ? `<a class="build-item-row" href="/items/${slug}">${body}</a>`
          : `<div class="build-item-row">${body}</div>`;
      }

      function renderGeneratedBuild(hero, phases, isLive) {
        const output = document.getElementById("buildOutput");
        output.innerHTML = `
          <p class="build-summary"><strong>${escapeHtml(heroName(hero))}</strong>-д тохирох build. Яг энэ дарааллаар авах албагүй — lane болон дайсны hero-уудаасаа хамаараад хамгаалалтын эсвэл counter item-ээр сольж болно.</p>
          <div class="build-phases">${phases.map((phase) => `<div class="build-phase"><h3>${escapeHtml(phase.title)}</h3>${phase.items.length ? phase.items.map(buildItemHtml).join("") : '<div class="build-item-row"><span>Дата хангалтгүй</span></div>'}</div>`).join("")}</div>
          <p class="build-footnote">${isLive ? "Сүүлийн 30 хоногийн тоглолтуудаас хэр олон авсан, хэр их хожсоноор нь эрэмбэлсэн. Чиглэл болгож ашиглаарай — тоглолт болгон өөр." : "Live дата түр ирэхгүй байгаа тул hero-гийн role болон item-уудын зохицол дээр үндэслэсэн build харуулж байна. Чиглэл болгож ашиглаарай — тоглолт болгон өөр."}</p>`;
        output.classList.add("visible");
      }

      async function generateHeroBuild() {
        const select = document.getElementById("heroSelect");
        const button = document.getElementById("generateBuild");
        const hero = liveHeroes.find(
          (entry) => String(entry.id) === select.value,
        );
        if (!hero) {
          document.getElementById("buildOutput").innerHTML =
            '<p class="build-summary">Эхлээд hero-гоо сонго.</p>';
          document.getElementById("buildOutput").classList.add("visible");
          return;
        }
        button.disabled = true;
        button.textContent = "Тооцоолж байна…";
        let stats = [];
        let isLive = false;
        try {
          if (!hero.fallback) {
            const since = Math.floor(
              (Date.now() - META_WINDOW_DAYS * 86400000) / 1000,
            );
            const dayBucket = new Date().toISOString().slice(0, 10);
            const key = `deadlock-item-stats-${hero.id}-${dayBucket}`;
            stats = await fetchJson(
              `/analytics/item-stats?hero_ids=${encodeURIComponent(hero.id)}&min_unix_timestamp=${since}&min_matches=20`,
              key,
            );
            stats = Array.isArray(stats) ? stats : stats.items || [];
            isLive = stats.length > 0;
          }
          renderGeneratedBuild(
            hero,
            selectBuildItems(stats, heroName(hero)),
            isLive,
          );
        } catch {
          renderGeneratedBuild(
            hero,
            selectBuildItems([], heroName(hero)),
            false,
          );
        } finally {
          button.disabled = false;
          button.textContent = "Build гаргах";
        }
      }

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      document
        .getElementById("generateBuild")
        .addEventListener("click", generateHeroBuild);
      document.getElementById("heroPicker").addEventListener("click", (event) => {
        const button = event.target.closest("[data-hero-id]");
        if (!button) return;
        const select = document.getElementById("heroSelect");
        select.value = button.dataset.heroId;
        renderHeroPicker(liveHeroes);
        document.getElementById("buildOutput").classList.remove("visible");
      });
      document.getElementById("heroSelect").addEventListener("change", () => {
        renderHeroPicker(liveHeroes);
        document.getElementById("buildOutput").classList.remove("visible");
      });

      const backToTop = document.getElementById("backToTop");

      window.addEventListener(
        "scroll",
        () => {
          backToTop.classList.toggle("visible", window.scrollY > 520);
        },
        { passive: true },
      );
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      function showPaymentResult() {
        const url = new URL(window.location.href);
        const result = url.searchParams.get("payment");
        if (result !== "success" && result !== "cancelled") return;

        const notice = document.createElement("div");
        notice.className = `payment-result ${result}`;
        notice.setAttribute("role", "status");

        const message = document.createElement("div");
        const title = document.createElement("strong");
        const description = document.createElement("span");
        title.textContent =
          result === "success" ? "Төлбөр амжилттай боллоо ✓" : "Төлбөр цуцлагдлаа";
        description.textContent =
          result === "success"
            ? "Deadlock Mongolia-г дэмжсэнд баярлалаа!"
            : "Хүсвэл item-ийн дэлгэрэнгүйгээс дахин оролдоорой.";
        message.append(title, description);

        const close = document.createElement("button");
        close.type = "button";
        close.setAttribute("aria-label", "Мэдэгдэл хаах");
        close.textContent = "×";
        close.addEventListener("click", () => notice.remove());

        notice.append(message, close);
        document.body.appendChild(notice);

        url.searchParams.delete("payment");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
        setTimeout(() => notice.remove(), 8000);
      }

      initializeLiveMeta();
      showPaymentResult();
