/*
  ЗУРАГ НЭМЭХ ЗААВАР:
  Доорх DATA дотор item бүрийн { } дотор img: "ТАНЫ_ЗУРГИЙН_URL"
  гэж нэмбэл тэр item дээр зураг харагдана. img талбар байхгүй бол
  зурагны байрлалд хоосон placeholder box л харагдана.

  Жишээ:
  {t:1,n:"Close Quarters",d:"...", img:"https://example.com/close-quarters.png"}
*/

      const WIRE_SUPPORT_URL =
        "https://pay.wire.mn/link/plink_krd6jmuhq3y6mrrkog7o43mvne";

      const DATA = {
        fairfax: {
          label: "Fairfax",
          accent: "#c9852f",
          tierPrices: { 1: "$800", 2: "$1600", 3: "$3200", 4: "$6400" },
          tierNote: { 4: "Experts Only" },
          items: [
            {
              t: 1,
              n: "Close Quarters",
              d: "Ойрын зайд бууны хохирол нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/4/43/Close_Quarters.png",
            },
            {
              t: 1,
              n: "Extended Magazine",
              d: "Сумны багтаамж нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/8/8a/Extended_Magazine.png",
            },
            {
              t: 1,
              n: "Headshot Booster",
              d: "Толгойн цохилтын хохирол нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/a/ac/Headshot_Booster.png",
            },
            {
              t: 1,
              n: "High-Velocity Rounds",
              d: "Сумны хурд болон алсын зайн хохирол сайжирна.",
              img: "https://deadlock.wiki/images/0/0e/High-Velocity_Rounds.png",
            },
            {
              t: 1,
              n: "Monster Rounds",
              d: "NPC/creep зэрэг чөтгөрт илүү их хохирол өгнө.",
              img: "https://deadlock.wiki/images/f/f8/Monster_Rounds.png",
            },
            {
              t: 1,
              n: "Rapid Rounds",
              d: "Буудах хурд (fire rate) нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/6/6e/Rapid_Rounds.png",
            },
            {
              t: 1,
              n: "Restorative Shot",
              d: "Бууны хохиролоор бага хэмжээний life steal өгнө.",
              img: "https://deadlock.wiki/images/4/4c/Restorative_Shot.png",
            },
            {
              t: 2,
              n: "Active Reload",
              d: "Идэвхтэй чадвар: цэнэглэлтийг хурдасгана.",
              active: 1,
              img: "https://deadlock.wiki/images/b/b4/Active_Reload.png",
            },
            {
              t: 2,
              n: "Fleetfoot",
              d: "Буудсаны дараа хөдөлгөөний хурд түр нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/c/cf/Fleetfoot.png",
            },
            {
              t: 2,
              n: "Intensifying Magazine",
              d: "Магазин дуусах тусам сум бүрийн хохирол нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/6/65/Intensifying_Magazine.png",
            },
            {
              t: 2,
              n: "Kinetic Dash",
              d: "Dash хийхэд нэмэлт бонус эффект өгнө.",
              img: "https://deadlock.wiki/images/3/3e/Kinetic_Dash.png",
            },
            {
              t: 2,
              n: "Long Range",
              d: "Алсын зайн бууны хохирол мэдэгдэхүйц сайжирна.",
              img: "https://deadlock.wiki/images/0/0a/Long_Range.png",
            },
            {
              t: 2,
              n: "Melee Charge",
              d: "Melee цохилт цэнэглэгддэг болж, дараагийн цохилт хүчтэй болно.",
              img: "https://deadlock.wiki/images/e/ea/Melee_Charge.png",
            },
            {
              t: 2,
              n: "Mystic Shot",
              d: "Бууны сум нэмэлт spirit хохирол өгдөг болно.",
              img: "https://deadlock.wiki/images/5/5a/Mystic_Shot.png",
            },
            {
              t: 2,
              n: "Opening Rounds",
              d: "Магазины эхний сум(ууд) илүү их хохиролтой.",
              img: "https://deadlock.wiki/images/8/8d/Opening_Rounds.png",
            },
            {
              t: 2,
              n: "Recharging Rush",
              d: "Идэвхтэй: түр хугацаанд буудах хурд, reload хурдасна.",
              active: 1,
              img: "https://deadlock.wiki/images/1/17/Recharging_Rush.png",
            },
            {
              t: 2,
              n: "Slowing Bullets",
              d: "Сум онох бүрт өрсөлдөгчийг удаашруулна.",
              img: "https://deadlock.wiki/images/d/db/Slowing_Bullets.png",
            },
            {
              t: 2,
              n: "Spirit Shredder",
              d: "Spirit shield-тэй өрсөлдөгчид эффектив хохирол.",
              img: "https://deadlock.wiki/images/9/96/Spirit_Shredder_Bullets.png",
            },
            {
              t: 2,
              n: "Split Shot",
              d: "Идэвхтэй: буудсан сум задарч олон чиглэлд тархана.",
              active: 1,
              img: "https://deadlock.wiki/images/0/04/Split_Shot.png",
            },
            {
              t: 2,
              n: "Stalker",
              d: "Хол зайд байгаа дайсанд нэмэлт хохирол.",
              img: "https://deadlock.wiki/images/4/4b/Stalker.png",
            },
            {
              t: 2,
              n: "Swift Striker",
              d: "Attack speed нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/e/e4/Swift_Striker.png",
            },
            {
              t: 2,
              n: "Titanic Magazine",
              d: "Магазины багтаамж их хэмжээгээр нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/d/d8/Titanic_Magazine.png",
            },
            {
              t: 2,
              n: "Weakening Headshot",
              d: "Толгойн цохилт дайсанд debuff (сулруулах) эффект өгнө.",
              img: "https://deadlock.wiki/images/a/ad/Weakening_Headshot.png",
            },
            {
              t: 3,
              n: "Alchemical Fire",
              d: "Идэвхтэй: заасан талбайд гал тавьж тасралтгүй хохирол өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/f/fc/Alchemical_Fire.png",
            },
            {
              t: 3,
              n: "Ballistic Enchantment",
              d: "Сумыг spirit damage-тай холино.",
              imbue: 1,
              img: "https://deadlock.wiki/images/d/d4/Ballistic_Enchantment.png",
            },
            {
              t: 3,
              n: "Berserker",
              d: "HP багасах тусам бууны хохирол нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/a/a8/Berserker.png",
            },
            {
              t: 3,
              n: "Blood Tribute",
              d: "Идэвхтэй: өөрийн HP зарцуулж их хохирол/бонус авна.",
              active: 1,
              img: "https://deadlock.wiki/images/a/af/Blood_Tribute.png",
            },
            {
              t: 3,
              n: "Burst Fire",
              d: "Дарахад хэд хэдэн сум цуваагаар гардаг болно.",
              img: "https://deadlock.wiki/images/b/b0/Burst_Fire.png",
            },
            {
              t: 3,
              n: "Cultist Sacrifice",
              d: "Идэвхтэй: HP зарцуулж хүчирхэг бонус эффект авна.",
              active: 1,
              img: "https://deadlock.wiki/images/e/eb/Cultist_Sacrifice.png",
            },
            {
              t: 3,
              n: "Escalating Resilience",
              d: "Хохирол авах тусам resistance (тэсвэржилт) нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/5/57/Escalating_Resilience.png",
            },
            {
              t: 3,
              n: "Express Shot",
              d: "Магазины эхний сум илүү хурдтай бөгөөд хохиролтой.",
              img: "https://deadlock.wiki/images/e/e6/Express_Shot.png",
            },
            {
              t: 3,
              n: "Headhunter",
              d: "Бага HP-той (сул) дайсанд нэмэлт хохирол.",
              img: "https://deadlock.wiki/images/0/06/Headhunter.png",
            },
            {
              t: 3,
              n: "Heroic Aura",
              d: "Идэвхтэй: ойролцоох багийн гишүүдэд buff аура өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/6/60/Heroic_Aura.png",
            },
            {
              t: 3,
              n: "Hollow Point",
              d: "Маш ойр зайд хохирол нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/3/30/Hollow_Point.png",
            },
            {
              t: 3,
              n: "Hunter's Aura",
              d: "Ойролцоох дайсныг илрүүлдэг (wallhack төрлийн) эффект.",
              img: "https://deadlock.wiki/images/0/08/Hunter%27s_Aura.png",
            },
            {
              t: 3,
              n: "Point Blank",
              d: "Маш ойрхон зайд асар их хохирол өгнө.",
              img: "https://deadlock.wiki/images/7/79/Point_Blank.png",
            },
            {
              t: 3,
              n: "Shadow Weave",
              d: "Идэвхтэй: түр хугацаанд нуугдаж/арчлагдаж чадна.",
              active: 1,
              img: "https://deadlock.wiki/images/4/4e/Shadow_Weave.png",
            },
            {
              t: 3,
              n: "Sharpshooter",
              d: "Алсын зайн бонус хохирол улам нэмэгдсээр байна.",
              img: "https://deadlock.wiki/images/2/25/Sharpshooter.png",
            },
            {
              t: 3,
              n: "Spirit Rend",
              d: "Дайсны spirit shield-ийг устгаж/сулруулна.",
              img: "https://deadlock.wiki/images/4/42/Spirit_Rend.png",
            },
            {
              t: 3,
              n: "Tesla Bullets",
              d: "Сум онсон дайсны ойролцоох бусад дайсан руу цахилгаан chain хийнэ.",
              img: "https://deadlock.wiki/images/5/56/Tesla_Bullets.png",
            },
            {
              t: 3,
              n: "Toxic Bullets",
              d: "Сум онсон дайсанд хор нэмж, тасралтгүй хохирол өгнө.",
              img: "https://deadlock.wiki/images/f/f0/Toxic_Bullets.png",
            },
            {
              t: 3,
              n: "Weighted Shots",
              d: "Сум онохоор knockback/удаашруулах эффект нэмнэ.",
              img: "https://deadlock.wiki/images/8/88/Weighted_Shots.png",
            },
            {
              t: 4,
              n: "Armor Piercing Rounds",
              d: "Дайсны armor-ийг тоохгүйгээр шууд хохирол өгнө.",
              img: "https://deadlock.wiki/images/1/10/Armor_Piercing_Rounds.png",
            },
            {
              t: 4,
              n: "Capacitor",
              d: "Идэвхтэй: цэнэглэгдсэний дараа асар их хохиролтой цохилт.",
              active: 1,
              img: "https://deadlock.wiki/images/b/b5/Capacitor.png",
            },
            {
              t: 4,
              n: "Crippling Headshot",
              d: "Толгойн цохилт онсон дайсныг disable (хөдөлгөөнгүй) болгоно.",
              img: "https://deadlock.wiki/images/6/6c/Crippling_Headshot.png",
            },
            {
              t: 4,
              n: "Crushing Fists",
              d: "Melee чадварыг эрс сайжруулна.",
              img: "https://deadlock.wiki/images/c/ca/Crushing_Fists.png",
            },
            {
              t: 4,
              n: "Frenzy",
              d: "Kill хийх бүрт хурд/хохирол нэмэгдэнэ (killing streak).",
              img: "https://deadlock.wiki/images/f/f1/Frenzy.png",
            },
            {
              t: 4,
              n: "Glass Cannon",
              d: "Бууны хохирол ихээр нэмэгдэнэ, харин өөрийн эмзэг байдал нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/6/6e/Glass_Cannon.png",
            },
            {
              t: 4,
              n: "Lucky Shot",
              d: "Санамсаргүй байдлаар crit хохирол өгдөг магазин.",
              img: "https://deadlock.wiki/images/0/06/Lucky_Shot.png",
            },
            {
              t: 4,
              n: "Ricochet",
              d: "Сум нэг дайснаас нөгөө дайсан руу секээд шилждэг болно.",
              img: "https://deadlock.wiki/images/8/87/Ricochet.png",
            },
            {
              t: 4,
              n: "Silencer",
              d: "Дайсны spirit ур чадварыг хааж (silence) идэвхгүй болгоно.",
              img: "https://deadlock.wiki/images/4/43/Silencer.png",
            },
            {
              t: 4,
              n: "Spellslinger",
              d: "Бууны хохирлыг spirit ур чадварт хувиргаж нэмнэ.",
              img: "https://deadlock.wiki/images/a/a8/Spellslinger.png",
            },
            {
              t: 4,
              n: "Spiritual Overflow",
              d: "Илүү зогсоосон spirit item-ийн (6-р слот) эффектийг сайжруулна.",
              img: "https://deadlock.wiki/images/4/46/Spiritual_Overflow.png",
            },
          ],
        },
        mps: {
          label: "MPS",
          accent: "#4f9a63",
          tierPrices: { 1: "$800", 2: "$1600", 3: "$3200", 4: "$6400" },
          tierNote: { 4: "Experts Only" },
          items: [
            {
              t: 1,
              n: "Extra Health",
              d: "Max HP нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/6/69/Extra_Health.png",
            },
            {
              t: 1,
              n: "Extra Regen",
              d: "HP сэргэх (regen) хурд нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/6/60/Extra_Regen.png",
            },
            {
              t: 1,
              n: "Extra Stamina",
              d: "Dash/sprint-ийн нэмэлт цэнэг өгнө.",
              img: "https://deadlock.wiki/images/2/28/Extra_Stamina.png",
            },
            {
              t: 1,
              n: "Grit",
              d: "Идэвхтэй: debuff-ийн үргэлжлэх хугацааг богиносгоно.",
              active: 1,
              img: "https://deadlock.wiki/images/1/17/Grit.png",
            },
            {
              t: 1,
              n: "Healing Rite",
              d: "Идэвхтэй: өөрийгөө болон ойролцоох багийнхныг эмчилнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/7/72/Healing_Rite.png",
            },
            {
              t: 1,
              n: "Melee Lifesteal",
              d: "Melee цохилтоор HP сэргээнэ.",
              img: "https://deadlock.wiki/images/2/24/Melee_Lifesteal.png",
            },
            {
              t: 1,
              n: "Rebuttal",
              d: "Дайсан ойролцоо байх үед buff идэвхждэг.",
              img: "https://deadlock.wiki/images/4/4c/Rebuttal.png",
            },
            {
              t: 1,
              n: "Sprint Boots",
              d: "Хөдөлгөөний хурд нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/d/da/Sprint_Boots.png",
            },
            {
              t: 2,
              n: "Battle Vest",
              d: "HP болон бууны хохирлын resistance хамтад нь нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/7/7d/Battle_Vest.png",
            },
            {
              t: 2,
              n: "Bullet Lifesteal",
              d: "Бууны сумаар HP сэргээнэ.",
              img: "https://deadlock.wiki/images/5/57/Bullet_Lifesteal_%28item%29.png",
            },
            {
              t: 2,
              n: "Debuff Reducer",
              d: "Дайсны debuff-ийн үргэлжлэх хугацааг богиносгоно.",
              img: "https://deadlock.wiki/images/c/c3/Debuff_Reducer.png",
            },
            {
              t: 2,
              n: "Enchanter's Emblem",
              d: "Ойролцоох дайсанд тасралтгүй бага хохирол (аура) өгнө.",
              img: "https://deadlock.wiki/images/0/03/Enchanter%27s_Emblem.png",
            },
            {
              t: 2,
              n: "Enduring Speed",
              d: "Хөдөлгөөний хурд болон damage resistance нэгтгэсэн бонус.",
              img: "https://deadlock.wiki/images/c/cd/Enduring_Speed.png",
            },
            {
              t: 2,
              n: "Guardian Ward",
              d: "Идэвхтэй: түр зуурын shield нэмж өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/6/60/Guardian_Ward.png",
            },
            {
              t: 2,
              n: "Healbane",
              d: "Дайсны эмчилгээний (heal) үр дүнг бууруулна.",
              img: "https://deadlock.wiki/images/6/62/Healbane.png",
            },
            {
              t: 2,
              n: "Healing Booster",
              d: "Өөрийн авах эмчилгээний эффект сайжирна.",
              img: "https://deadlock.wiki/images/b/b0/Healing_Booster.png",
            },
            {
              t: 2,
              n: "Reactive Barrier",
              d: "Хохирол авахад автоматаар түр shield үүсгэнэ.",
              img: "https://deadlock.wiki/images/f/f2/Reactive_Barrier.png",
            },
            {
              t: 2,
              n: "Restorative Locket",
              d: "Идэвхтэй: их хэмжээний эмчилгээ хийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/0/07/Restorative_Locket.png",
            },
            {
              t: 2,
              n: "Return Fire",
              d: "Идэвхтэй: авсан хохирлын нэг хэсгийг буцаана (reflect).",
              active: 1,
              img: "https://deadlock.wiki/images/7/7c/Return_Fire.png",
            },
            {
              t: 2,
              n: "Spirit Lifesteal",
              d: "Spirit хохиролоор HP сэргээнэ.",
              img: "https://deadlock.wiki/images/d/d9/Spirit_Lifesteal_%28item%29.png",
            },
            {
              t: 2,
              n: "Spirit Shielding",
              d: "Spirit-ээс хүлээн авах хохирлыг бууруулна.",
              img: "https://deadlock.wiki/images/4/4a/Spirit_Shielding.png",
            },
            {
              t: 2,
              n: "Trophy Collector",
              d: "Kill хийхэд нэмэлт бонус эффект авна.",
              img: "https://deadlock.wiki/images/b/b0/Trophy_Collector.png",
            },
            {
              t: 2,
              n: "Weapon Shielding",
              d: "Бууны хохирлыг бууруулна.",
              img: "https://deadlock.wiki/images/f/f4/Weapon_Shielding.png",
            },
            {
              t: 3,
              n: "Bullet Resilience",
              d: "Бууны хохирлын эсрэг resistance ихээхэн нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/4/4d/Bullet_Resilience.png",
            },
            {
              t: 3,
              n: "Counterspell",
              d: "Дайсны spirit ур чадварыг блоклоно.",
              img: "https://deadlock.wiki/images/5/51/Counterspell.png",
            },
            {
              t: 3,
              n: "Dispel Magic",
              d: "Идэвхтэй: өөрийн дээрх debuff-үүдийг арилгана.",
              active: 1,
              img: "https://deadlock.wiki/images/d/da/Dispel_Magic.png",
            },
            {
              t: 3,
              n: "Fortitude",
              d: "Их хэмжээний HP болон resistance хамтад нь өгнө.",
              img: "https://deadlock.wiki/images/c/c6/Fortitude.png",
            },
            {
              t: 3,
              n: "Fury Trance",
              d: "Идэвхтэй: HP багасах тусам түр хугацаанд хүчирхэгжинэ.",
              active: 1,
              img: "https://deadlock.wiki/images/1/15/Fury_Trance.png",
            },
            {
              t: 3,
              n: "Healing Nova",
              d: "Идэвхтэй: ойролцоох талбайд эмчилгээ тарааж өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/a/ae/Healing_Nova.png",
            },
            {
              t: 3,
              n: "Lifestrike",
              d: "Идэвхтэй: их хохирол өгөөд эргээд их хэмжээний heal авна.",
              active: 1,
              img: "https://deadlock.wiki/images/6/6a/Lifestrike.png",
            },
            {
              t: 3,
              n: "Majestic Leap",
              d: "Идэвхтэй: хол зайд үсэрч шилжинэ.",
              active: 1,
              img: "https://deadlock.wiki/images/d/d7/Majestic_Leap.png",
            },
            {
              t: 3,
              n: "Metal Skin",
              d: "Идэвхтэй: түр хугацаанд асар их damage reduction авна.",
              active: 1,
              img: "https://deadlock.wiki/images/f/fa/Metal_Skin.png",
            },
            {
              t: 3,
              n: "Rescue Beam",
              d: "Идэвхтэй: багийн гишүүнийг өөр рүүгээ татаж авчирна.",
              active: 1,
              img: "https://deadlock.wiki/images/c/c2/Rescue_Beam.png",
            },
            {
              t: 3,
              n: "Spirit Resilience",
              d: "Spirit хохирлын эсрэг resistance ихээхэн нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/7/7f/Spirit_Resilience.png",
            },
            {
              t: 3,
              n: "Stamina Mastery",
              d: "Dash/sprint-ийн цэнэгийн тоо нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/e/eb/Stamina_Mastery.png",
            },
            {
              t: 3,
              n: "Veil Walker",
              d: "Идэвхтэй: түр хугацаанд үл үзэгдэгч (invisible) болно.",
              active: 1,
              img: "https://deadlock.wiki/images/6/69/Veil_Walker.png",
            },
            {
              t: 3,
              n: "Warp Stone",
              d: "Идэвхтэй: богино зайд шуурхай teleport хийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/4/4f/Warp_Stone.png",
            },
            {
              t: 4,
              n: "Cheat Death",
              d: "Үхэх ёстой цохилтыг зорчиж, бага хэмжээний HP-тэй амьд үлдэнэ.",
              img: "https://deadlock.wiki/images/f/f7/Cheat_Death.png",
            },
            {
              t: 4,
              n: "Colossus",
              d: "Их хэмжээний HP, resistance авч, биеийн хэмжээ томорно.",
              img: "https://deadlock.wiki/images/b/bb/Colossus.png",
            },
            {
              t: 4,
              n: "Divine Barrier",
              d: "Идэвхтэй: маш их HP-тэй shield үүсгэнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/7/74/Divine_Barrier.png",
            },
            {
              t: 4,
              n: "Diviner's Kevlar",
              d: "Идэвхтэй: прожектайл төрлийн бууны хохирлын эсрэг resist өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/0/0a/Diviner%27s_Kevlar.png",
            },
            {
              t: 4,
              n: "Healing Tempo",
              d: "Идэвхтэй: шуурхай их хэмжээний heal (burst) хийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/7/70/Healing_Tempo.png",
            },
            {
              t: 4,
              n: "Indomitable",
              d: "Crowd control (CC) эффектийн эсрэг resistance ихээхэн нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/f/ff/Indomitable.png",
            },
            {
              t: 4,
              n: "Infuser",
              d: "Идэвхтэй: ойролцоох багийнхандаа buff/heal аура тараана.",
              active: 1,
              img: "https://deadlock.wiki/images/c/c3/Infuser.png",
            },
            {
              t: 4,
              n: "Inhibitor",
              d: "Идэвхтэй: дайсны эмчилгээг бүрэн блоклоно.",
              active: 1,
              img: "https://deadlock.wiki/images/9/99/Inhibitor.png",
            },
            {
              t: 4,
              n: "Juggernaut",
              d: "Kill хийх streak үргэлжлэх тусам хүчирхэг buff авна.",
              img: "https://deadlock.wiki/images/0/07/Juggernaut.png",
            },
            {
              t: 4,
              n: "Leech",
              d: "Идэвхтэй: маш их хэмжээний lifesteal авна.",
              active: 1,
              img: "https://deadlock.wiki/images/3/32/Leech.png",
            },
            {
              t: 4,
              n: "Phantom Strike",
              d: "Идэвхтэй: дайсан руу шуурхай dash хийж хохирол өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/e/e6/Phantom_Strike.png",
            },
            {
              t: 4,
              n: "Plated Armor",
              d: "Бууны хохирлын эсрэг маш их resistance өгнө.",
              img: "https://deadlock.wiki/images/4/4c/Plated_Armor.png",
            },
            {
              t: 4,
              n: "Siphon Bullets",
              d: "Бууны сумны lifesteal ихээхэн нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/2/2c/Siphon_Bullets.png",
            },
            {
              t: 4,
              n: "Spellbreaker",
              d: "Идэвхтэй: бүх debuff-ээ цэвэрлээд CC-ийн эсрэг resist авна.",
              active: 1,
              img: "https://deadlock.wiki/images/2/27/Spellbreaker.png",
            },
            {
              t: 4,
              n: "Unstoppable",
              d: "Идэвхтэй: түр хугацаанд CC-д огт үл нөлөөлдөг болно.",
              active: 1,
              img: "https://deadlock.wiki/images/e/eb/Unstoppable.png",
            },
            {
              t: 4,
              n: "Vampiric Burst",
              d: "Идэвхтэй: ойролцоох талбайд их хэмжээний AoE lifesteal хийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/d/dc/Vampiric_Burst.png",
            },
            {
              t: 4,
              n: "Witchmail",
              d: "Дайсан spirit ур чадвар ашиглахад тэднийг удаашруулна.",
              img: "https://deadlock.wiki/images/0/09/Witchmail.png",
            },
          ],
        },
        cc: {
          label: "Curiosity Catalog",
          accent: "#8b5fc9",
          tierPrices: { 1: "$800", 2: "$1600", 3: "$3200", 4: "$6400" },
          tierNote: { 4: "Experts Only" },
          items: [
            {
              t: 1,
              n: "Extra Charge",
              d: "Ур чадварын цэнэгийн тоо нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/4/4a/Extra_Charge.png",
            },
            {
              t: 1,
              n: "Extra Spirit",
              d: "Spirit power нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/9/94/Extra_Spirit.png",
            },
            {
              t: 1,
              n: "Golden Goose Egg",
              d: "Идэвхтэй: алт олох бонус өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/a/a8/Golden_Goose_Egg.png",
            },
            {
              t: 1,
              n: "Mystic Burst",
              d: "Ур чадвар ашиглахад дэлбэрэлтийн нэмэлт хохирол өгнө.",
              img: "https://deadlock.wiki/images/9/95/Mystic_Burst.png",
            },
            {
              t: 1,
              n: "Mystic Expansion",
              d: "Ур чадварын нөлөөллийн радиус томорно.",
              imbue: 1,
              img: "https://deadlock.wiki/images/d/df/Mystic_Expansion.png",
            },
            {
              t: 1,
              n: "Mystic Regeneration",
              d: "Spirit power-тэй холбоотой HP сэргэлт нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/1/17/Mystic_Regeneration.png",
            },
            {
              t: 1,
              n: "Rusted Barrel",
              d: "Идэвхтэй: их хохиролтой прожектайл шидэнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/5/54/Rusted_Barrel.png",
            },
            {
              t: 1,
              n: "Spirit Strike",
              d: "Melee цохилтод spirit хохирол нэмж өгнө.",
              img: "https://deadlock.wiki/images/7/7c/Spirit_Strike.png",
            },
            {
              t: 2,
              n: "Arcane Surge",
              d: "Ур чадвар ашигласны дараа түр хугацаанд buff идэвхжинэ.",
              img: "https://deadlock.wiki/images/b/bb/Arcane_Surge.png",
            },
            {
              t: 2,
              n: "Bullet Resist Shredder",
              d: "Дайсны бууны resistance-ийг бууруулна.",
              img: "https://deadlock.wiki/images/7/7d/Bullet_Resist_Shredder.png",
            },
            {
              t: 2,
              n: "Cold Front",
              d: "Идэвхтэй: заасан талбайг мөслөж, удаашруулна.",
              active: 1,
              img: "https://deadlock.wiki/images/4/4d/Cold_Front.png",
            },
            {
              t: 2,
              n: "Compress Cooldown",
              d: "Ур чадварын cooldown-г богиносгодог imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/d/d4/Compress_Cooldown.png",
            },
            {
              t: 2,
              n: "Duration Extender",
              d: "Ур чадварын үргэлжлэх хугацааг сунгадаг imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/f/fb/Duration_Extender.png",
            },
            {
              t: 2,
              n: "Improved Spirit",
              d: "Spirit power их хэмжээгээр нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/c/c9/Improved_Spirit.png",
            },
            {
              t: 2,
              n: "Mystic Slow",
              d: "Ур чадвар онох бүрт дайсныг удаашруулна.",
              img: "https://deadlock.wiki/images/6/65/Mystic_Slow.png",
            },
            {
              t: 2,
              n: "Mystic Vulnerability",
              d: "Ур чадвараар онсон дайсан нэмэлт хохирол хүлээж авдаг болно.",
              img: "https://deadlock.wiki/images/c/c7/Mystic_Vulnerability.png",
            },
            {
              t: 2,
              n: "Quicksilver Reload",
              d: "Reload-ийн хурдыг нэмэгдүүлдэг imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/3/3b/Quicksilver_Reload.png",
            },
            {
              t: 2,
              n: "Slowing Hex",
              d: "Идэвхтэй: target-ийг чиглүүлж удаашруулна.",
              active: 1,
              img: "https://deadlock.wiki/images/1/18/Slowing_Hex.png",
            },
            {
              t: 2,
              n: "Spirit Sap",
              d: "Идэвхтэй: дайсны spirit power-ийг авч өөртөө шилжүүлнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/0/03/Spirit_Sap.png",
            },
            {
              t: 2,
              n: "Suppressor",
              d: "Дайсны ур чадварыг түр хугацаанд disable хийнэ.",
              img: "https://deadlock.wiki/images/2/21/Suppressor.png",
            },
            {
              t: 3,
              n: "Decay",
              d: "Идэвхтэй: дайсны эмчилгээг блоклож, тасралтгүй хохирол өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/9/93/Decay.png",
            },
            {
              t: 3,
              n: "Disarming Hex",
              d: "Идэвхтэй: дайсны бууг түр хугацаанд disable хийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/2/2d/Disarming_Hex.png",
            },
            {
              t: 3,
              n: "Greater Expansion",
              d: "Ур чадварын нөлөөллийн радиус ихээхэн томорно.",
              img: "https://deadlock.wiki/images/4/4e/Greater_Expansion.png",
            },
            {
              t: 3,
              n: "Knockdown",
              d: "Идэвхтэй: том хэмжээний knockback эффект өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/3/36/Knockdown.png",
            },
            {
              t: 3,
              n: "Radiant Regeneration",
              d: "Spirit power-тэй холбоотой HP regen ихээхэн нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/c/c7/Radiant_Regeneration.png",
            },
            {
              t: 3,
              n: "Rapid Recharge",
              d: "Ур чадварын цэнэг хурдан дүүрдэг болно.",
              img: "https://deadlock.wiki/images/a/a9/Rapid_Recharge.png",
            },
            {
              t: 3,
              n: "Silence Wave",
              d: "Идэвхтэй: том талбайд silence эффект тараана.",
              active: 1,
              img: "https://deadlock.wiki/images/8/88/Silence_Wave.png",
            },
            {
              t: 3,
              n: "Spirit Snatch",
              d: "Ур чадвараар дайсны spirit power авна.",
              img: "https://deadlock.wiki/images/8/83/Spirit_Snatch.png",
            },
            {
              t: 3,
              n: "Superior Cooldown",
              d: "Ур чадварын cooldown ихээхэн богиносно.",
              img: "https://deadlock.wiki/images/9/93/Superior_Cooldown.png",
            },
            {
              t: 3,
              n: "Superior Duration",
              d: "Ур чадварын үргэлжлэх хугацаа ихээхэн сунгагдана.",
              img: "https://deadlock.wiki/images/c/c7/Superior_Duration.png",
            },
            {
              t: 3,
              n: "Surge of Power",
              d: "Ур чадвар ашигласны дараа spirit burst нэмдэг imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/d/d4/Surge_of_Power.png",
            },
            {
              t: 3,
              n: "Tankbuster",
              d: "Их HP-той дайсанд нэмэлт хохирол.",
              img: "https://deadlock.wiki/images/d/d8/Tankbuster.png",
            },
            {
              t: 3,
              n: "Torment Pulse",
              d: "Дайсныг тасралтгүй damage over time-д оруулна.",
              img: "https://deadlock.wiki/images/4/42/Torment_Pulse.png",
            },
            {
              t: 4,
              n: "Arctic Blast",
              d: "Идэвхтэй: том хэмжээний мөс/удаашруулах бөмбөг шиднэ.",
              active: 1,
              img: "https://deadlock.wiki/images/3/30/Arctic_Blast.png",
            },
            {
              t: 4,
              n: "Boundless Spirit",
              d: "Spirit power ихээхэн хэмжээгээр нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/9/97/Boundless_Spirit.png",
            },
            {
              t: 4,
              n: "Cursed Relic",
              d: "Идэвхтэй: дайсны spirit power-ийг авна.",
              active: 1,
              img: "https://deadlock.wiki/images/6/61/Cursed_Relic.png",
            },
            {
              t: 4,
              n: "Echo Shard",
              d: "Идэвхтэй: сүүлд ашигласан ур чадвараа давтан идэвхжүүлнэ.",
              active: 1,
              imbue: 1,
              img: "https://deadlock.wiki/images/a/ab/Echo_Shard.png",
            },
            {
              t: 4,
              n: "Escalating Exposure",
              d: "Дайсныг олон удаа онох тусам эмзэг байдал нь нэмэгдэнэ.",
              img: "https://deadlock.wiki/images/2/21/Escalating_Exposure.png",
            },
            {
              t: 4,
              n: "Ethereal Shift",
              d: "Идэвхтэй: түр хугацаанд материаллаг бус болж attack-аас зайлсхийнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/3/3c/Ethereal_Shift.png",
            },
            {
              t: 4,
              n: "Focus Lens",
              d: "Ур чадварын алсын зай, нарийвчлал сайжирна.",
              img: "https://deadlock.wiki/images/3/3c/Focus_Lens.png",
            },
            {
              t: 4,
              n: "Lightning Scroll",
              d: "Идэвхтэй: цахилгаан chain хохирол дайснуудад дамжуулна.",
              active: 1,
              img: "https://deadlock.wiki/images/b/b8/Lightning_Scroll.png",
            },
            {
              t: 4,
              n: "Magic Carpet",
              d: "Идэвхтэй: түр хугацаанд нисдэг болно.",
              active: 1,
              img: "https://deadlock.wiki/images/2/25/Magic_Carpet.png",
            },
            {
              t: 4,
              n: "Mercurial Magnum",
              d: "Бууг spirit-тэй хослуулдаг imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/a/af/Mercurial_Magnum.png",
            },
            {
              t: 4,
              n: "Mystic Reverb",
              d: "Ур чадвар давхар удаа идэвхждэг imbue.",
              imbue: 1,
              img: "https://deadlock.wiki/images/0/07/Mystic_Reverb.png",
            },
            {
              t: 4,
              n: "Refresher",
              d: "Идэвхтэй: бүх ур чадварын cooldown-г шууд цэвэрлэнэ.",
              active: 1,
              img: "https://deadlock.wiki/images/5/53/Refresher.png",
            },
            {
              t: 4,
              n: "Scourge",
              d: "Идэвхтэй: их хэмжээний AoE spirit хохирол өгнө.",
              active: 1,
              img: "https://deadlock.wiki/images/5/58/Scourge.png",
            },
            {
              t: 4,
              n: "Spirit Burn",
              d: "Идэвхтэй: дайсны spirit power-ийг шатааж багасгана.",
              active: 1,
              img: "https://deadlock.wiki/images/e/ef/Spirit_Burn.png",
            },
            {
              t: 4,
              n: "Transcendent Cooldown",
              d: "Ур чадварын cooldown маш ихээр богиносно.",
              img: "https://deadlock.wiki/images/b/bd/Transcendent_Cooldown.png",
            },
            {
              t: 4,
              n: "Vortex Web",
              d: "Идэвхтэй: дайсныг татаж, торонд бариулна.",
              active: 1,
              img: "https://deadlock.wiki/images/8/85/Vortex_Web.png",
            },
          ],
        },
      };

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

      // Component -> шууд upgrade. Нэг item олон салаа upgrade-тай байж болно.
      const ITEM_UPGRADES = {
        "Close Quarters": ["Point Blank"],
        "Extended Magazine": ["Titanic Magazine"],
        "Headshot Booster": ["Headhunter"],
        "Rapid Rounds": ["Swift Striker"],
        "Long Range": ["Sharpshooter"],
        "Spirit Shredder": ["Spirit Rend"],
        "Split Shot": ["Ricochet"],
        Headhunter: ["Crippling Headshot"],
        Grit: [
          "Weapon Shielding",
          "Spirit Shielding",
          "Reactive Barrier",
          "Guardian Ward",
        ],
        "Extra Health": ["Fortitude"],
        "Extra Stamina": ["Stamina Mastery"],
        "Sprint Boots": ["Enduring Speed"],
        "Melee Lifesteal": ["Lifestrike"],
        "Bullet Lifesteal": ["Fury Trance"],
        "Enchanter's Emblem": ["Spirit Resilience"],
        "Battle Vest": ["Bullet Resilience"],
        "Healing Rite": ["Healing Nova"],
        "Extra Charge": ["Rapid Recharge"],
        "Extra Spirit": ["Improved Spirit"],
        "Improved Spirit": ["Boundless Spirit"],
        "Mystic Expansion": ["Greater Expansion"],
        "Mystic Regeneration": ["Radiant Regeneration"],
        "Cold Front": ["Arctic Blast"],
        "Compress Cooldown": ["Superior Cooldown"],
        "Superior Cooldown": ["Transcendent Cooldown"],
        "Duration Extender": ["Superior Duration"],
        "Mystic Vulnerability": ["Escalating Exposure"],
        Suppressor: ["Silence Wave"],
        "Slowing Hex": ["Vortex Web"],
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
        document.getElementById("generateBuild").disabled = false;
      }

      function syncLocalItemAssets(items) {
        const byName = new Map(
          items.map((item) => [normalizeName(itemName(item)), item]),
        );
        Object.values(DATA).forEach((shop) =>
          shop.items.forEach((localItem) => {
            const remote = byName.get(normalizeName(localItem.n));
            if (!remote) return;
            // API-г ID/statistics холбоход л ашиглана. Зургийн URL-ийг API-аас
            // дарж солихгүй; шалгасан хуучин local URL хамгийн найдвартай.
            localItem.apiId = remote.id;
          }),
        );
      }

      async function initializeLiveMeta() {
        const status = document.getElementById("apiStatus");
        try {
          const [heroes, items] = await Promise.all([
            fetchJson("/assets/heroes?language=english", "deadlock-heroes-v1"),
            fetchJson(
              "/assets/items/by-type/upgrade?language=english",
              "deadlock-items-v1",
            ),
          ]);
          liveHeroes = (
            Array.isArray(heroes) ? heroes : heroes.heroes || []
          ).filter(isPlayableHero);
          liveItems = Array.isArray(items) ? items : items.items || [];
          syncLocalItemAssets(liveItems);
          populateHeroSelect(
            liveHeroes.length ? liveHeroes : localFallbackHeroes(),
          );
          status.textContent = `${liveHeroes.length || ALL_HEROES.length} hero · Live мэдээлэл холбогдлоо`;
          status.classList.add("live");
          render();
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
          .filter((item) => keywords.test(`${item.n} ${item.d}`));
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
          { title: "Шугамын эхлэл", items: take(1, 3) },
          { title: "Тоглолтын эхэн", items: take(2, 3) },
          { title: "Тоглолтын дунд үе", items: take(3, 3) },
          { title: "Тоглолтын төгсгөл", items: take(4, 3) },
        ];
      }

      function buildItemHtml(entry) {
        const meta = entry.metric.matches
          ? `${(entry.metric.rate * 100).toFixed(1)}% WR · ${entry.metric.matches.toLocaleString()} тоглолт`
          : "Баатрын үүрэгтэй тохирсон";
        return `<div class="build-item-row"><span>${escapeHtml(entry.name)}</span><small>${escapeHtml(meta)}</small></div>`;
      }

      function renderGeneratedBuild(hero, phases, isLive) {
        const output = document.getElementById("buildOutput");
        output.innerHTML = `
          <p class="build-summary"><strong>${escapeHtml(heroName(hero))}</strong>-д санал болгож буй хэрэгслийн бүрдэл. Заавал яг энэ дарааллаар авах албагүй. Тоглож буй шугам, дайсны баатрууд болон өөрт тулгарсан асуудалд тааруулж хамгаалах эсвэл сөрөх хэрэгслээр сольж болно.</p>
          <div class="build-phases">${phases.map((phase) => `<div class="build-phase"><h3>${escapeHtml(phase.title)}</h3>${phase.items.length ? phase.items.map(buildItemHtml).join("") : '<div class="build-item-row"><span>Мэдээлэл хангалтгүй</span></div>'}</div>`).join("")}</div>
          <p class="build-footnote">${isLive ? "Сүүлийн 30 хоногийн бодит тоглолтод хэдэн удаа ашигласан болон ялалтын хувийг хамтад нь харьцуулж эрэмбэлэв." : "Шинэ мэдээлэл түр ирээгүй тул баатрын үндсэн үүрэг болон хэрэгслүүдийн зохицолд тулгуурласан санал харуулж байна."} Энэ нь баримжаа болохоос тоглолт бүрт өөрчлөхгүй хатуу дараалал биш.</p>`;
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
            '<p class="build-summary">Эхлээд баатраа сонгоно уу.</p>';
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
          button.textContent = "Бүрдэл гаргах";
        }
      }

      const SHOP_GUIDES = {
        fairfax: {
          role: "Weapon / Bullet",
          heroes: HERO_POOLS.weapon,
          builds: ["Bullet carry", "Fire-rate", "Magazine scaling"],
          counter:
            "Удаан, том hitbox-той frontline hero болон удаан үргэлжлэх teamfight-д bullet pressure үүсгэхэд ашигтай.",
          caution:
            "Spirit-focused build дээр weapon item-д хэт их soul зарцуулах нь үндсэн power spike-ийг хойшлуулж болно.",
        },
        mps: {
          role: "Vitality / Survival",
          heroes: [...HERO_POOLS.tank, ...HERO_POOLS.support].filter(
            (v, i, a) => a.indexOf(v) === i,
          ),
          builds: ["Frontline", "Brawler", "Support sustain"],
          counter:
            "Burst damage эсвэл удаан poke хийдэг багийн эсрэг амьд үлдэх хугацааг нэмэгдүүлэхэд тохиромжтой.",
          caution:
            "Зөвхөн defense авах нь damage болон objective pressure-ийг багасгана. Нэг хамгаалалтын item-ийг build-ийнхээ гол scaling-тэй хослуул.",
        },
        cc: {
          role: "Spirit / Ability",
          heroes: HERO_POOLS.spirit,
          builds: ["Spirit burst", "Cooldown", "Ability range"],
          counter:
            "Ability-д түшиглэдэг teamfight болон бөөгнөрсөн дайснуудын эсрэг spirit pressure үүсгэхэд хүчтэй.",
          caution:
            "Ability-ийн cooldown болон combo timing таарахгүй бол item-ийн үр ашиг бүрэн гарахгүй.",
        },
      };

      const GUIDE_OVERRIDES = {
        "Close Quarters": {
          heroes: ["Abrams", "Shiv", "Mo & Krill", "Yamato"],
          builds: ["Close-range bullet", "Brawler", "Melee hybrid"],
          counter:
            "Vindicta, Grey Talon зэрэг зай барьдаг hero руу gap close хийж чаддаг үед илүү үр дүнтэй.",
          caution:
            "Дайсандаа хүрч чадахгүй matchup дээр bonus тогтмол ажиллахгүй.",
        },
        "Headshot Booster": {
          heroes: ["Vindicta", "Wraith", "Paradox", "Haze"],
          builds: ["Headshot", "Precision bullet", "Lane poke"],
          counter:
            "Том hitbox-той эсвэл хөдөлгөөн багатай hero-г lane дээр дарамтлахад тохиромжтой.",
          caution:
            "Headshot тогтмол онодоггүй бол өөр item илүү найдвартай value өгнө.",
        },
        "Long Range": {
          heroes: ["Vindicta", "Grey Talon", "Paradox", "McGinnis"],
          builds: ["Long-range bullet", "Poke", "High-ground control"],
          counter:
            "Abrams, Mo & Krill зэрэг ойртож байж damage хийдэг hero-г зайнаас элээхэд ашигтай.",
          caution: "Close-range fight олон бол passive bonus-оо алдана.",
        },
        Healbane: {
          heroes: ["Infernus", "Seven", "Lady Geist", "Pocket"],
          builds: ["Anti-heal", "Spirit damage", "DoT pressure"],
          counter:
            "Abrams, Shiv, Infernus, Dynamo зэрэг их heal/sustain-тэй hero болон healing-heavy багийн эсрэг авна.",
          caution:
            "Дайсны багт мэдэгдэхүйц heal байхгүй бол өөр damage эсвэл utility item сонго.",
        },
        "Debuff Reducer": {
          heroes: ["Abrams", "Shiv", "Yamato", "Mo & Krill"],
          builds: ["Frontline", "Anti-CC", "Dive survival"],
          counter:
            "Stun, slow, silence ихтэй Seven, Kelvin, Dynamo, Warden төрлийн control composition-ийн эсрэг.",
          caution:
            "Burst damage-ийг өөрөө бууруулахгүй; зөвхөн debuff timing-д value өгнө.",
        },
        "Bullet Resist Shredder": {
          heroes: ["Seven", "Infernus", "Ivy", "McGinnis"],
          builds: ["Hybrid damage", "Team bullet amp", "Anti-frontline"],
          counter:
            "Bullet resist давхарласан Abrams, Mo & Krill, McGinnis зэрэг frontline hero-г багийн bullet carry-тайгаа хамт хайлуулахад.",
          caution:
            "Багийн чинь damage бараг бүхэлдээ spirit бол shred-ийн team value бага байна.",
        },
        Silencer: {
          heroes: ["Haze", "Wraith", "Infernus", "Ivy"],
          builds: ["Bullet carry", "Anti-caster", "Pick-off"],
          counter:
            "Seven, Bebop, Pocket, Lash зэрэг ability-гаар зугтах эсвэл combo хийх hero-г богино хугацаанд хаахад.",
          caution:
            "Silence хийх мөчөө алдахад өндөр үнэтэй item-ийн гол value алдагдана.",
        },
        Ricochet: {
          heroes: ["Haze", "Infernus", "Ivy", "McGinnis"],
          builds: ["Teamfight bullet", "Wave clear", "On-hit"],
          counter:
            "Ойр бөөгнөрч тоглодог баг, summon болон олон target-тэй fight-д өндөр value өгнө.",
          caution:
            "Ганц target pick хийхэд pure single-target item-аас сул байж болно.",
        },
        "Tesla Bullets": {
          heroes: ["Haze", "Ivy", "McGinnis", "Infernus"],
          builds: ["Fire-rate", "Wave clear", "Hybrid AoE"],
          counter:
            "Creep wave, summon болон бөөгнөрсөн teamfight-д chain damage-аар дарамт үүсгэнэ.",
          caution:
            "Удаан fire-rate-тэй build дээр proc-ийн давтамж бага байна.",
        },
        "Extra Stamina": {
          heroes: ["Lash", "Pocket", "Yamato", "Dynamo"],
          builds: ["Mobility", "Roam", "Dive / escape"],
          counter:
            "Skillshot болон удаан AoE-оос зайлсхийх, lane дээр аюултай engage-ээс гарахад найдвартай.",
          caution:
            "Stamina-гаа дэмий үрвэл item-ийн хамгаалалтын value мэдэгдэхгүй.",
        },
        "Mystic Expansion": {
          heroes: ["Seven", "Dynamo", "Bebop", "Kelvin"],
          builds: ["Area control", "Teamfight spirit", "Imbue"],
          counter:
            "Бөөгнөрсөн дайсан болон нарийн corridor-д AoE ability-гаа олон target-д хүргэхэд.",
          caution:
            "Imbue хийх ability-гаа зөв сонго; жижиг utility skill дээр value алдаж болно.",
        },
        "Transcendent Cooldown": {
          heroes: ["Seven", "Pocket", "Dynamo", "Lady Geist", "Bebop"],
          builds: ["Late-game caster", "Cooldown loop", "Teamfight utility"],
          counter:
            "Удаан үргэлжлэх late-game fight-д гол ability-гаа дахин ашиглаж tempo авахад.",
          caution:
            "Tier 4 тул core survivability/damage бэлэн болсны дараа авах luxury сонголт.",
        },
      };

      const STAGE_GUIDE = {
        1: "Шугамын эхлэл — бага үнээр эрт хүч авах эсвэл өөрийн сул талыг нөхөх үед.",
        2: "Тоглолтын эхэн үе — үндсэн хэрэгслүүдийн нэг болгон авч, ямар чиглэлээр тоглохоо тогтоох үед.",
        3: "Тоглолтын дунд үе — багийн тулаан эхлэх үед тодорхой дайсан эсвэл өөрийн гол дайралтад зориулж авна.",
        4: "Тоглолтын төгсгөл — үндсэн хэрэгслүүдээ авсны дараа хүчээ гүйцээх үнэтэй сонголт болгон авна.",
      };

      function getTriggerCondition(item) {
        const text = `${item.n} ${item.d}`.toLowerCase();
        if (item.active)
          return "Хэрэгслийн тусгай товчийг өөрөө дарахад ажиллана. Нэг ашигласны дараа дэлгэц дээрх хүлээлгийн хугацаа дуусах хүртэл дахин ашиглаж болохгүй.";
        if (item.imbue)
          return "Худалдаж авах үедээ нэг чадвар сонгож энэ хэрэгсэлтэй холбоно. Үүнээс хойш гол нөлөө нь зөвхөн сонгосон чадварт үйлчилнэ.";
        if (/headshot|толгой/.test(text))
          return "Дайсны толгойд сумаа оновол нэмэлт нөлөө автоматаар ажиллана. Бие рүү оносон сум энэ нөхцөлийг идэвхжүүлэхгүй.";
        if (/reload|цэнэгл|magazine|магазин/.test(text))
          return "Сумаа дахин цэнэглэх үед, эсвэл дайзанд үлдсэн сум заасан хэмжээнд хүрэх үед нөлөө нь ажиллана.";
        if (/dash|stamina|leap|үср|гулс|sprint|хөдөлгөөн/.test(text))
          return "Огцом бултах, хурдан гүйх, үсрэх зэрэг хөдөлгөөн хийсний дараа нөлөө нь автоматаар ажиллана.";
        if (/melee|цохилт/.test(text))
          return "Ойрын гар цохилтоо дайсанд оновол гол нөлөө нь идэвхжинэ.";
        if (/low hp|hp баг|health баг|багасах тусам/.test(text))
          return "Таны HP заасан хэмжээнээс доош ороход нөхцөл автоматаар идэвхжинэ.";
        if (/damage авах|хохирол авах|on damage|resilience/.test(text))
          return "Дайснаас хохирол авах бүрт хамгаалалт эсвэл нэмэлт нөлөө тодорхой хэмжээгээр давхарлан нэмэгдэнэ.";
        if (/kill|алах|үхэл|assist/.test(text))
          return "Дайсныг өөрөө алах эсвэл алахад нь туслах нөхцөл биелэхэд автоматаар ажиллана.";
        if (/close|ойр зай|point blank|hollow/.test(text))
          return "Дайсантай хангалттай ойрхон байх үед нэмэлт хүч автоматаар орно. Зай холдвол тэр нэмэлт хүч ажиллахгүй.";
        if (/long range|хол зай|алсын зай|stalker/.test(text))
          return "Дайснаас хангалттай хол байх үед нэмэлт хүч автоматаар орно. Хэт ойртвол тэр нэмэлт хүч ажиллахгүй.";
        if (/ability|spirit|mystic|spell/.test(text))
          return "Чадвараа ашиглаж дайсанд хохирол өгөх үед тайлбарт байгаа нөхцөл таарвал автоматаар ажиллана.";
        if (/bullet|сум|буу|shot|round/.test(text))
          return "Бууны сум дайсанд онох бүрт нэмэлт нөлөө ажиллах эсэхийг тоглоом автоматаар шалгана.";
        return "Хэрэгслийг авсан даруйд үндсэн нэмэгдэл нь байнга ажиллана. Харин нэмэлт нөлөө нь тайлбарт дурдсан нөхцөл биелэх үед өөрөө асна.";
      }

      function getMechanicGuide(item) {
        const text = `${item.n} ${item.d}`.toLowerCase();
        const type = item.active
          ? "Гараар идэвхжүүлнэ"
          : item.imbue
            ? "Нэг чадварт холбож өгнө"
            : "Өөрөө автоматаар ажиллана";
        const icon = item.active ? "⚡" : item.imbue ? "✦" : "∞";
        const trigger = getTriggerCondition(item);
        let timing = item.active
          ? "Тулаан эхлэхийн яг өмнө, эсвэл дайсан гол дайралтаа эхлүүлэх мөчид дар. Хэт эрт дарвал үйлчлэх хугацаа дэмий дуусна. Хэт орой дарвал хамгаалалт авч амжихгүй."
          : "Товч дарах шаардлагагүй. Харин нэмэлт нөлөө ажиллах зай, байрлал эсвэл үйлдлээ урьдчилан бүрдүүлэх хэрэгтэй.";
        let signal = item.active
          ? "Дэлгэц дээрх хэрэгслийн тэмдэг гэрэлтэй байвал ашиглахад бэлэн. Дарсны дараа тэмдэг нь бүдгэрч, дахин ашиглах хүртэл үлдсэн хугацааг харуулна."
          : "Таны эсвэл дайсны дээр гарсан жижиг тэмдэг, дүрсний нөлөө, хохирлын тоо өөрчлөгдөх зэргээр ажилласныг мэдэж болно.";

        if (/heal|regen|lifesteal|restorative|leech/.test(text)) {
          timing =
            "Амь дүүрэн үед бүү ашигла. Хохирол авсны дараа, гэхдээ дараагийн хүчтэй дайралтад үхэхээсээ өмнө ашиглавал хамгийн их амь нөхнө.";
          signal =
            "Амийн зурвас нэмэгдэх, ногоон тоо эсвэл эмчилгээний дүрс гарах үед ажиллаж байна. Эмчилгээ бууруулах нөлөөнд орсон бол нөхөгдөх амь багасна.";
        } else if (/silence|disarm|knockdown|slow|hex|inhibitor/.test(text)) {
          timing =
            "Дайсан зугтах чадвар эсвэл гол дайралтаа ашиглахаас өмнө тавь. Багийн хүний саатуулах чадвартай яг зэрэг ашиглалгүй, араас нь залгуулбал дайсныг удаан барина.";
          signal =
            "Дайсны дээр сулруулах тэмдэг гарч, хөдөлгөөн удаашрах эсвэл тухайн үйлдлээ хийж чадахгүй болоход нөлөө ажилласан байна.";
        } else if (
          /barrier|resist|armor|metal skin|unstoppable|ethereal/.test(text)
        ) {
          timing =
            "Дайсны хамгийн хүчтэй хохирол эсвэл саатуулах чадвар ирэхийн яг өмнө ашигла. Их хохирол авсныхаа дараа дарах нь оройтсон байж болно.";
          signal =
            "Баатрын бие дээр хамгаалалтын бүрхүүл, жижиг тэмдэг эсвэл өнгөний өөрчлөлт гарна. Тэр тэмдэг алга болоход хамгаалалтын хугацаа дууссан гэсэн үг.";
        } else if (/reload|magazine|round/.test(text)) {
          timing =
            "Тулаанд орохоосоо өмнө нэмэлт хүч нь эхний суманд уу, сүүлийн суманд уу гэдгийг шалга. Сумаа цэнэглэхдээ халхавчны ард ор.";
          signal =
            "Сумны тоо, цэнэглэх зурвас болон эхний эсвэл сүүлийн сумны хохирол өөрчлөгдөхөд нөлөө ажилласныг мэднэ.";
        } else if (
          /headshot|long range|stalker|close quarters|point blank/.test(text)
        ) {
          timing =
            "Эхлээд хэрэгслийн шаардсан зай, өнцөг болон онилолтоо бүрдүүл. Буруу байрлалд байвал хэрэгсэл авсан ч нэмэлт хүч нь ажиллахгүй.";
          signal =
            "Толгойд оносон тэмдэг, хохирлын тоо эсвэл зай өөрчлөгдөхөд гардаг жижиг тэмдгээр нэмэлт хүч орсныг шалга.";
        }

        const steps = item.active
          ? [
              "Тулаанд орохоосоо өмнө хэрэгслийн тэмдэг гэрэлтэй, ашиглахад бэлэн эсэхийг шалга.",
              "Зөв дайсан, зөв зай эсвэл дайсны хүчтэй дайралтыг хүлээгээд хэрэгслийн товчийг нэг удаа дар.",
              "Нөлөө ажиллаж байх хугацаанд довтлох, зугтах эсвэл хамгаалах үйлдлээ хий. Тэмдэг бүдгэрсэн бол дахин ашиглах боломжгүй.",
            ]
          : item.imbue
            ? [
                "Худалдаж авах үедээ хамгийн чухал бөгөөд тогтмол ашигладаг чадвараа сонго.",
                "Сонгосон чадвараа тайлбарт тохирох дайсан болон зайд ашигла.",
                "Дэлгэц дээрх тэмдгийг ажиглаад нөлөө дууссаны дараа дараагийн дайралтаа бэлд.",
              ]
            : [
                "Тайлбараас нэмэлт нөлөө яг ямар нөхцөлд ажиллахыг эхлээд унш.",
                "Шаардлагатай зай, амийн хэмжээ, толгойн оновч эсвэл хөдөлгөөнийг зориудаар бүрдүүл.",
                "Тэмдэг болон хохирлын тоо өөрчлөгдсөн эсэхийг хараад нөлөө ажилласныг шалга.",
              ];

        return {
          type,
          icon,
          trigger,
          timing,
          signal,
          steps,
          effect: `${item.d} Энэ нөлөө ${item.active ? "тусгай товч дарсны дараа богино хугацаанд" : item.imbue ? "таны сонгосон нэг чадварт" : "шаардлагатай нөхцөл биелэхэд өөрөө"} ажиллана.`,
        };
      }

      function getItemGuide(item, shopKey) {
        const base = SHOP_GUIDES[shopKey];
        const guide = {
          role: base.role,
          heroes: [...base.heroes],
          builds: [...base.builds],
          counter: base.counter,
          caution: base.caution,
          when: STAGE_GUIDE[item.t],
        };
        const text = `${item.n} ${item.d}`.toLowerCase();

        if (
          /headshot|sharpshooter|long range|stalker|express shot/.test(text)
        ) {
          guide.heroes = HERO_POOLS.precision;
          guide.builds = ["Precision", "Long-range", "Poke"];
          guide.counter =
            "Ойртохоосоо өмнө зайнаас damage авахад эмзэг frontline болон хөдөлгөөн багатай hero-гийн эсрэг.";
        }
        if (/close quarters|point blank|melee|fist|hollow point/.test(text)) {
          guide.heroes = HERO_POOLS.close;
          guide.builds = ["Brawler", "Close-range", "Melee hybrid"];
          guide.counter =
            "Gap close хийж чаддаг бол зай барьдаг marksman/caster hero-г тулгаж тоглоход.";
        }
        if (/lifesteal|healing|regen|restorative|rite|booster/.test(text)) {
          guide.heroes = HERO_POOLS.sustain;
          guide.builds = ["Sustain", "Extended fight", "Lane recovery"];
          guide.counter =
            "Poke damage ихтэй, fight-ийг удаан сунгадаг багийн эсрэг HP-гаа тогтвортой барихад.";
          guide.caution =
            "Healbane, Toxic Bullets зэрэг anti-heal авсан дайсны эсрэг үр ашиг нь буурна.";
        }
        if (/stamina|sprint|fleet|dash|speed|leap/.test(text)) {
          guide.heroes = HERO_POOLS.mobility;
          guide.builds = ["Mobility", "Roam", "Dive / escape"];
          guide.counter =
            "Skillshot, slow zone болон positioning шийддэг matchup-д dodge/rotation хийхэд.";
        }
        if (/spirit|mystic|arcane|spell|enchant|cooldown/.test(text)) {
          guide.heroes = HERO_POOLS.spirit;
          guide.builds = ["Spirit scaling", "Ability burst", "Cooldown combo"];
        }
        if (
          /barrier|resilience|armor|health|fortitude|shield|vest/.test(text)
        ) {
          guide.heroes = HERO_POOLS.tank;
          guide.builds = ["Frontline", "Anti-burst", "Dive survival"];
          guide.counter =
            "Burst damage ихтэй enemy carry-гийн эхний combo-г давж, fight-д удаан үлдэхэд.";
        }
        if (/ricochet|tesla|split shot|area|vortex|alchemical/.test(text)) {
          guide.builds = ["Teamfight AoE", "Wave clear", "Multi-target"];
          guide.counter =
            "Бөөгнөрсөн баг, summon, creep wave болон objective орчмын teamfight-д.";
        }
        if (/healbane|toxic/.test(text)) {
          guide.counter =
            "Abrams, Shiv, Infernus, Dynamo зэрэг heal болон sustain ихтэй hero-гийн эсрэг.";
          guide.builds = ["Anti-heal", "DoT", "Teamfight utility"];
        }

        return Object.assign(guide, GUIDE_OVERRIDES[item.n] || {});
      }

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function plainMongolianText(value) {
        const replacements = [
          [
            /Active item-ийг fight эхлэхээс өмнө/gi,
            "Гараар ажиллуулдаг хэрэгслийг тулаан эхлэхээс өмнө",
          ],
          [
            /Tier 4 тул core survivability\s*\/\s*damage бэлэн болсны дараа авах luxury сонголт\./gi,
            "Түвшин 4-ийн үнэтэй сонголт тул амь, хамгаалалт болон хохирлын үндсэн хэрэгслүүдээ авсны дараа сонго.",
          ],
          [
            /lane дээр аюултай engage-ээс гарахад/gi,
            "шугам дээр аюултай дайралтаас зугтахад",
          ],
          [/skillshot/gi, "гараар онилдог чадвар"],
          [/bullet carry/gi, "буугаар гол хохирол гаргах"],
          [/sustain build/gi, "удаан тулалдахад чиглэсэн бүрдэл"],
          [/Imbue хийх ability-гаа/gi, "Хэрэгслээ холбох чадвараа"],
          [/active item/gi, "гараар ажиллуулдаг хэрэгсэл"],
          [/damage over time|DoT/gi, "хугацааны турш үргэлжлэх хохирол"],
          [/teamfight timing/gi, "багийн тулаанд ашиглах мөчөө"],
          [/олон target-тэй/gi, "олон дайсантай"],
          [/utility skill/gi, "туслах зориулалтын чадвар"],
          [
            /core survivability\s*\/\s*damage/gi,
            "амь, хамгаалалт болон хохирлын үндсэн хэрэгслүүд",
          ],
          [/survivability/gi, "амьд үлдэх чадвар"],
          [/fight/gi, "тулаан"],
          [/burst damage/gi, "богино хугацаанд өгөх их хохирол"],
          [/spirit damage/gi, "чадвараас өгөх хохирол"],
          [/bullet damage/gi, "бууны сумны хохирол"],
          [/power spike/gi, "хүч мэдэгдэхүйц нэмэгдэх үе"],
          [/teamfight/gi, "багийн тулаан"],
          [/frontline/gi, "багийн урд талд тулалддаг"],
          [/late game/gi, "тоглолтын төгсгөл"],
          [/mid game/gi, "тоглолтын дунд үе"],
          [/early game/gi, "тоглолтын эхэн үе"],
          [/weapon/gi, "зэвсэг"],
          [/vitality/gi, "амь ба хамгаалалт"],
          [/survival/gi, "амьд үлдэх чадвар"],
          [/support/gi, "багаа дэмжих"],
          [/hybrid/gi, "хосолсон"],
          [/precision/gi, "оновчтой буудалт"],
          [/mobility/gi, "хөдөлгөөн"],
          [/active/gi, "гараар ажиллуулах"],
          [/hero/gi, "баатар"],
          [/role/gi, "үүрэг"],
          [/tier/gi, "түвшин"],
          [/core/gi, "үндсэн"],
          [/skill/gi, "чадвар"],
          [/sample/gi, "ашигласан тоглолтын тоо"],
          [/fallback/gi, "нөөц хувилбар"],
          [/synergy/gi, "хоорондын зохицол"],
          [/area of effect|AoE/gi, "талбай хамарсан нөлөө"],
          [/crowd control|CC/gi, "хөдөлгөөн болон чадварыг хязгаарлах нөлөө"],
          [/incoming damage/gi, "ирж буй хохирол"],
          [/core build/gi, "үндсэн хэрэгслийн бүрдэл"],
          [/core item/gi, "үндсэн хэрэгсэл"],
          [/wave clear/gi, "цэргүүдийг хурдан цэвэрлэх"],
          [/pick-off/gi, "ганцаар явсан дайсныг барих"],
          [/gap close/gi, "дайсанд хурдан ойртох"],
          [/chain damage/gi, "нэгээс нөгөөд дамжих хохирол"],
          [/single-target/gi, "нэг дайсанд чиглэсэн"],
          [/on-hit/gi, "онох бүрд ажиллах"],
          [/point blank/gi, "тулсан зай"],
          [/slow zone/gi, "удаашруулах талбай"],
          [/marksman/gi, "холын буудагч"],
          [/caster/gi, "чадвараар голлон тоглодог баатар"],
          [/summon/gi, "дуудсан туслах нэгж"],
          [/corridor/gi, "нарийн зам"],
          [/matchup/gi, "эсрэг таарсан баатар"],
          [/finisher/gi, "хүчээ гүйцээх сонголт"],
          [/luxury/gi, "үндсэн хэрэгслээс хойш авах үнэтэй нэмэлт"],
          [/tempo/gi, "тоглолтын давуу хэмнэл"],
          [/roam/gi, "шугам хооронд явж туслах"],
          [/dive/gi, "дайсны дунд гүн орох"],
          [/pure/gi, "цэвэр"],
          [/value/gi, "үр ашиг"],
          [/carry/gi, "гол хохирол гаргах"],
          [/scaling/gi, "тоглолт ахих тусам хүчжих"],
          [/utility/gi, "багт туслах нэмэлт хэрэгцээ"],
          [/engage/gi, "тулаан эхлүүлэх"],
          [/escape/gi, "аюулаас гарах"],
          [/indicator/gi, "ажиллаж буйг харуулах тэмдэг"],
          [/effect/gi, "нөлөө"],
          [/damage/gi, "хохирол"],
          [/build/gi, "хэрэгслийн бүрдэл"],
          [/anti-heal/gi, "эмчилгээ болон амь нөхөлтийг бууруулах нөлөө"],
          [/lifesteal/gi, "өгсөн хохирлоосоо амь нөхөх"],
          [/fire rate/gi, "буудах хурд"],
          [/attack speed/gi, "буудах хурд"],
          [/movement speed/gi, "хөдөлгөөний хурд"],
          [/move speed/gi, "хөдөлгөөний хурд"],
          [/active товч/gi, "хэрэгслийн товч"],
          [/passive/gi, "автоматаар ажиллах нөлөө"],
          [/imbue/gi, "нэг чадварт холбох"],
          [/cooldown/gi, "дахин ашиглах хүлээлгийн хугацаа"],
          [/duration/gi, "үйлчлэх хугацаа"],
          [/HUD/gi, "дэлгэц дээрх төлөвийн тэмдэг"],
          [/buff/gi, "хүч нэмэх нөлөө"],
          [/debuff/gi, "сулруулах нөлөө"],
          [/headshot/gi, "толгойн оновчтой буудалт"],
          [/reload/gi, "сумаа дахин цэнэглэх"],
          [/magazine/gi, "сумны дайз"],
          [/spirit/gi, "чадварын хүч"],
          [/bullet/gi, "бууны сум"],
          [/ability/gi, "чадвар"],
          [/dash/gi, "огцом бултах хөдөлгөөн"],
          [/sprint/gi, "хурдан гүйлт"],
          [/melee/gi, "ойрын гар цохилт"],
          [/stamina/gi, "хөдөлгөөний цэнэг"],
          [/range/gi, "зай"],
          [/target/gi, "сонгосон бай"],
          [/timing/gi, "ашиглах зөв мөч"],
          [/combo/gi, "дараалсан дайралт"],
          [/barrier/gi, "түр хамгаалалтын бүрхүүл"],
          [/resistance/gi, "хохирол тэсвэрлэх чадвар"],
          [/proc/gi, "нэмэлт нөлөө идэвхжих"],
          [/stack/gi, "давхарга"],
          [/sustain/gi, "удаан тулалдах тэсвэр"],
          [/poke/gi, "зайнаас бага багаар хохироох"],
          [/lane/gi, "тоглож буй шугам"],
          [/counter/gi, "сөрөх сонголт"],
          [/item/gi, "хэрэгсэл"],
        ];
        const translated = replacements.reduce(
          (text, [pattern, replacement]) => text.replace(pattern, replacement),
          String(value || ""),
        );
        return translated
          .replaceAll("хэрэгсэл-ийг", "хэрэгслийг")
          .replaceAll("хэрэгсэл-ийн", "хэрэгслийн")
          .replaceAll("баатар-гийн", "баатрын")
          .replaceAll("баатар баатар", "баатар")
          .replaceAll("чадвар-гаа", "чадвараа")
          .replaceAll("чадвар-тай", "чадвартай")
          .replaceAll("тэмдэг-ийг", "тэмдгийг")
          .replaceAll("нөлөө-ийг", "нөлөөг")
          .replaceAll("хохирол-оор", "хохирлоор")
          .replaceAll("сонгосон бай-тэй", "сонгосон байтай")
          .replaceAll("тулаан-д", "тулаанд")
          .replaceAll("нөлөө-оос", "нөлөөнөөс")
          .replaceAll("эхлүүлэх-ээс", "эхлүүлэхээс")
          .replaceAll("чадвар-ийг", "чадварыг");
      }

      function formatGuideText(value) {
        const safe = escapeHtml(plainMongolianText(value));
        const keywords =
          /(гараар ажиллуулдаг|автоматаар ажиллах|нэг чадварт холбох|дахин ашиглах хүлээлгийн хугацаа|үйлчлэх хугацаа|толгойн оновчтой буудалт|сумаа дахин цэнэглэх|сумны дайз|чадварын хүч|бууны сум|амь нөхөх|эмчилгээ|HP|чадвар|огцом бултах хөдөлгөөн|хөдөлгөөний цэнэг|ашиглах зөв мөч|дараалсан дайралт|хамгаалалтын бүрхүүл|давхарга|хохирол)/gi;
        return safe.replace(
          keywords,
          '<strong class="guide-keyword">$1</strong>',
        );
      }

      function tagList(values) {
        return values
          .map(
            (value) =>
              `<span class="guide-tag">${escapeHtml(plainMongolianText(value))}</span>`,
          )
          .join("");
      }

      function findItemByName(name) {
        for (const [shopKey, shop] of Object.entries(DATA)) {
          const item = shop.items.find((entry) => entry.n === name);
          if (item) return { item, shopKey, shop };
        }
        return null;
      }

      function getUpgradeInfo(itemName) {
        const next = (ITEM_UPGRADES[itemName] || [])
          .map(findItemByName)
          .filter(Boolean);
        const previous = Object.entries(ITEM_UPGRADES)
          .filter(([, upgrades]) => upgrades.includes(itemName))
          .map(([name]) => findItemByName(name))
          .filter(Boolean);
        return { previous, next };
      }

      function upgradeButton(found) {
        const { item, shop } = found;
        return `<button class="upgrade-item" type="button" data-upgrade-name="${escapeHtml(item.n)}">
          ${item.img ? `<img src="${escapeHtml(item.img)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ""}
          <span><strong>${escapeHtml(item.n)}</strong><small>Түвшин ${item.t} · ${escapeHtml(shop.tierPrices[item.t])}</small></span>
        </button>`;
      }

      function renderUpgradePath(itemName) {
        const { previous, next } = getUpgradeInfo(itemName);
        if (!previous.length && !next.length) return "";
        const parts = [];
        previous.forEach((entry) =>
          parts.push(
            upgradeButton(entry),
            '<span class="upgrade-arrow">→</span>',
          ),
        );
        parts.push(
          `<span class="guide-tag">${escapeHtml(itemName)} · одоо</span>`,
        );
        next.forEach((entry) =>
          parts.push(
            '<span class="upgrade-arrow">→</span>',
            upgradeButton(entry),
          ),
        );
        return `<div class="guide-section wide"><h3>↗ Дараагийн хүчтэй хувилбар</h3><div class="upgrade-path">${parts.join("")}</div></div>`;
      }

      function readableItemSummary(item, guide) {
        const description = String(item.d || "").trim();
        const purpose = guide.builds.slice(0, 2).join(" болон ");
        if (!description)
          return `${item.n} нь ${purpose} чиглэлийн хэрэгслийн бүрдэлд ашиглагдана.`;
        return `${description} Ерөнхийдөө ${purpose} чиглэлээр тоглоход илүү тохиромжтой.`;
      }

      let lastFocusedCard = null;

      function openItemGuide(item, shopKey) {
        const shop = DATA[shopKey];
        const guide = getItemGuide(item, shopKey);
        const mechanic = getMechanicGuide(item);
        const modal = document.getElementById("itemModal");
        const body = document.getElementById("itemModalBody");
        const visual = item.img
          ? `<img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.n)}" referrerpolicy="no-referrer" />`
          : '<div class="modal-placeholder">Зураг оруулаагүй</div>';

        body.innerHTML = `
          <aside class="modal-visual">
            ${visual}
            <div class="modal-meta">
              <span class="meta-pill">${escapeHtml(shop.label)}</span>
              <span class="meta-pill">Түвшин ${item.t}</span>
              <span class="meta-pill">${escapeHtml(shop.tierPrices[item.t])}</span>
              <span class="meta-pill">${escapeHtml(mechanic.type)}</span>
            </div>
          </aside>
          <section>
            <div class="modal-kicker">${escapeHtml(plainMongolianText(guide.role))} · Хэрэгслийн тайлбар</div>
            <h2 class="modal-title" id="itemModalTitle">${escapeHtml(item.n)}</h2>
            <div class="summary-card">
              <span class="summary-label">Товч ойлголт</span>
              <p class="modal-summary">${formatGuideText(readableItemSummary(item, guide))}</p>
            </div>
            <div class="quick-glance" aria-label="Хэрэгслийн хурдан мэдээлэл">
              <div class="glance-card"><small>Механик</small><strong>${escapeHtml(mechanic.type.split(" · ")[0])}</strong></div>
              <div class="glance-card"><small>Авах үе</small><strong>Түвшин ${item.t} · ${escapeHtml(String(guide.when).split("—")[0].trim())}</strong></div>
              <div class="glance-card"><small>Гол чиглэл</small><strong>${escapeHtml(plainMongolianText(guide.builds[0] || guide.role))}</strong></div>
            </div>
            <div class="guide-grid">
              <div class="mechanic-hero">
                <span class="mechanic-icon" aria-hidden="true">${mechanic.icon}</span>
                <div>
                  <strong>Яг яаж ажилладаг вэ?</strong>
                  <p>${formatGuideText(mechanic.effect)}</p>
                </div>
              </div>
              <div class="guide-section wide">
                <h3>⚡ Ямар үед, яаж идэвхждэг вэ?</h3>
                <p>${formatGuideText(mechanic.trigger)}</p>
              </div>
              <div class="guide-section wide">
                <h3>1 → 2 → 3 Хэрэглэх дараалал</h3>
                <ol class="usage-steps">
                  ${mechanic.steps.map((step) => `<li>${formatGuideText(step)}</li>`).join("")}
                </ol>
              </div>
              <div class="guide-section">
                <h3>◉ Ажиллаж байгааг яаж мэдэх вэ?</h3>
                <p>${formatGuideText(mechanic.signal)}</p>
              </div>
              <div class="guide-section">
                <h3>⏱ Ашиглах зөв мөч</h3>
                <p>${formatGuideText(mechanic.timing)}</p>
              </div>
              <div class="guide-section">
                <h3>◎ Хэзээ худалдаж авах вэ?</h3>
                <p>${formatGuideText(guide.when)}</p>
              </div>
              <div class="guide-section">
                <h3>◇ Ямар хэрэгслийн бүрдэлд тохирох вэ?</h3>
                <div class="tag-list">${tagList(guide.builds)}</div>
              </div>
              <div class="guide-section">
                <h3>♟ Аль баатарт илүү тохирох вэ?</h3>
                <div class="tag-list">${tagList(guide.heroes)}</div>
              </div>
              <div class="guide-section">
                <h3>⚔ Ямар дайсны эсрэг авах вэ?</h3>
                <p>${formatGuideText(guide.counter)}</p>
              </div>
              ${renderUpgradePath(item.n)}
              <div class="guide-section wide">
                <h3>! Сонгохын өмнө анхаарах зүйл</h3>
                <p>${formatGuideText(guide.caution)}</p>
              </div>
            </div>
            <div class="wire-support-card">
              <div>
                <span class="wire-support-kicker">Wire · QPay</span>
                <strong>Deadlock Mongolia-г дэмжих</strong>
                <p>Энэ тайлбар хэрэг болсон бол хүссэн дүнгээрээ төслийг дэмжээрэй.</p>
              </div>
              <a class="wire-support-button" href="${WIRE_SUPPORT_URL}" target="_blank" rel="noopener noreferrer">
                QPay-аар дэмжих
              </a>
            </div>
            <div class="guide-actions">
              <button class="guide-action" id="copyItemGuide" type="button">Тайлбар хуулах</button>
            </div>
            <details class="term-help">
              <summary>Үг ойлгомжгүй байвал энд дар</summary>
              <div class="term-help-grid">
                <p><strong>Гараар идэвхжүүлнэ</strong><br />Хэрэгслийн тусгай товчийг өөрөө дарж ажиллуулна.</p>
                <p><strong>Өөрөө автоматаар ажиллана</strong><br />Тайлбарт байгаа нөхцөл биелмэгц товч дарахгүйгээр асна.</p>
                <p><strong>Нэг чадварт холбоно</strong><br />Худалдаж авах үедээ нэг чадвар сонгоход зөвхөн тэр чадварт нөлөөлнө.</p>
                <p><strong>Түвшин</strong><br />Хэрэгслийн үнэ болон хүчний ангилал. Түвшин өндөр байх тусам ихэвчлэн үнэтэй.</p>
              </div>
            </details>
            <p class="guide-note">Энэ бол ерөнхий зөвлөмж. Тоглоомын шинэчлэлт, хоёр багийн баатар, тоглож буй шугам болон тухайн тулааны нөхцөлд тааруулж сонголтоо өөрчлөөрэй.</p>
          </section>
        `;

        lastFocusedCard = document.activeElement;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        body.querySelectorAll("[data-upgrade-name]").forEach((button) => {
          button.addEventListener("click", () => {
            const found = findItemByName(button.dataset.upgradeName);
            if (found) openItemGuide(found.item, found.shopKey);
          });
        });
        document
          .getElementById("copyItemGuide")
          ?.addEventListener("click", async (event) => {
            const button = event.currentTarget;
            const copyText = `${item.n} — ${mechanic.type}\n\nЯаж ажилладаг: ${plainMongolianText(mechanic.effect)}\nИдэвхжих нөхцөл: ${plainMongolianText(mechanic.trigger)}\nАшиглах зөв мөч: ${plainMongolianText(mechanic.timing)}\nТохирох баатар: ${guide.heroes.join(", ")}\nХэрэгслийн бүрдэл: ${guide.builds.map(plainMongolianText).join(", ")}\nАнхаарах зүйл: ${plainMongolianText(guide.caution)}`;
            try {
              await navigator.clipboard.writeText(copyText);
              button.textContent = "Хуулагдлаа ✓";
              setTimeout(() => (button.textContent = "Тайлбар хуулах"), 1600);
            } catch {
              button.textContent = "Хуулж чадсангүй";
            }
          });
        document.getElementById("itemClose").focus();
      }

      function closeItemGuide() {
        const modal = document.getElementById("itemModal");
        if (!modal.classList.contains("open")) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (lastFocusedCard && typeof lastFocusedCard.focus === "function") {
          lastFocusedCard.focus();
        }
      }

      let currentShop = "fairfax";
      let currentTier = "all";
      let currentSearch = "";

      function render() {
        const shop = DATA[currentShop];
        document.documentElement.style.setProperty(
          "--shop-accent",
          shop.accent,
        );
        const content = document.getElementById("content");
        content.innerHTML = "";

        const tiers = [1, 2, 3, 4].filter(
          (t) => currentTier === "all" || currentTier == String(t),
        );
        let anyResults = false;

        tiers.forEach((t) => {
          const items = shop.items.filter((it) => {
            if (it.t !== t) return false;
            if (
              currentSearch &&
              !it.n.toLowerCase().includes(currentSearch) &&
              !it.d.toLowerCase().includes(currentSearch)
            )
              return false;
            return true;
          });
          if (items.length === 0) return;
          anyResults = true;

          const block = document.createElement("div");
          block.className = "tier-block";

          const head = document.createElement("div");
          head.className = "tier-head";
          head.innerHTML = `
      <span class="tier-num">Түвшин ${t}</span>
      <span class="tier-price">${shop.tierPrices[t]}</span>
      ${shop.tierNote[t] ? `<span class="tier-note">${shop.tierNote[t]}</span>` : ""}
    `;
          block.appendChild(head);

          const grid = document.createElement("div");
          grid.className = "grid";
          items.forEach((it) => {
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute(
              "aria-label",
              `${it.n} item-ийн дэлгэрэнгүй тайлбарыг нээх`,
            );

            const imgSlot = it.img
              ? `<div class="item-img-slot"><img src="${it.img}" alt="${it.n}" loading="lazy"></div>`
              : `<div class="item-img-slot placeholder">ЗУРАГ<br>ОРУУЛААГҮЙ</div>`;

            card.innerHTML = `
        ${imgSlot}
        <div class="card-top">
          <div class="item-name">${it.n}</div>
          <div class="badges">
            ${it.active ? '<span class="badge active">Гараар</span>' : ""}
            ${it.imbue ? '<span class="badge imbue">Чадварт</span>' : ""}
          </div>
        </div>
        <div class="item-desc">${formatGuideText(it.d)}</div>
        <div class="guide-link">Дэлгэрэнгүй тайлбар</div>
      `;
            card.addEventListener("click", () =>
              openItemGuide(it, currentShop),
            );
            card.addEventListener("keydown", (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openItemGuide(it, currentShop);
              }
            });
            grid.appendChild(card);
          });
          block.appendChild(grid);
          content.appendChild(block);
        });

        document.getElementById("emptyMsg").style.display = anyResults
          ? "none"
          : "block";
      }

      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          currentShop = tab.dataset.shop;
          render();
        });
      });

      document.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          document
            .querySelectorAll(".chip")
            .forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          currentTier = chip.dataset.tier;
          render();
        });
      });

      document.getElementById("searchInput").addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase();
        render();
      });
      document
        .getElementById("generateBuild")
        .addEventListener("click", generateHeroBuild);
      document.getElementById("heroSelect").addEventListener("change", () => {
        document.getElementById("buildOutput").classList.remove("visible");
      });

      const donationQr = document.getElementById("donationQr");
      const qrModal = document.getElementById("qrModal");
      const qrClose = document.getElementById("qrClose");
      const itemModal = document.getElementById("itemModal");
      const itemClose = document.getElementById("itemClose");
      const backToTop = document.getElementById("backToTop");

      function closeQr() {
        qrModal.classList.remove("open");
        qrModal.setAttribute("aria-hidden", "true");
      }

      donationQr.addEventListener("click", () => {
        qrModal.classList.add("open");
        qrModal.setAttribute("aria-hidden", "false");
      });

      qrClose.addEventListener("click", closeQr);
      qrModal.addEventListener("click", (e) => {
        if (e.target === qrModal) closeQr();
      });
      itemClose.addEventListener("click", closeItemGuide);
      itemModal.addEventListener("click", (e) => {
        if (e.target === itemModal) closeItemGuide();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeQr();
          closeItemGuide();
        }
      });

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

      render();
      initializeLiveMeta();
      showPaymentResult();
