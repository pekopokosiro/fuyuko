// ============================================================
// タロット 78枚データ
// ============================================================

// スート名 → ファイル名プレフィックス
const SUIT_IMG = { "ワンド": "Wands", "カップ": "Cups", "ソード": "Swords", "ペンタクル": "Pentacles" };
// ピップ → ファイル番号
const PIP_IMG  = { "エース":"01","2":"02","3":"03","4":"04","5":"05","6":"06","7":"07","8":"08","9":"09","10":"10" };
// コート → ファイル番号
const COURT_IMG = { "ペイジ":"11","ナイト":"12","クイーン":"13","キング":"14" };

const MAJOR_ARCANA = [
  { id:  0, name: "愚者",       en: "The Fool",           img: "00-TheFool.png",           element: "風", colors: ["白","黄"],  upright_kw: "新しい出発・自由・可能性",   rev_kw: "無謀・現実逃避" },
  { id:  1, name: "魔術師",     en: "The Magician",       img: "01-TheMagician.png",        element: "火", colors: ["赤","黄"],  upright_kw: "意志・創造・実現力",         rev_kw: "詐欺・力の空回り" },
  { id:  2, name: "女教皇",     en: "The High Priestess", img: "02-TheHighPriestess.png",   element: "水", colors: ["青","銀"],  upright_kw: "直感・神秘・内なる声",       rev_kw: "秘密・表面的" },
  { id:  3, name: "女帝",       en: "The Empress",        img: "03-TheEmpress.png",         element: "土", colors: ["緑","金"],  upright_kw: "豊かさ・母性・創造",         rev_kw: "停滞・依存・過保護" },
  { id:  4, name: "皇帝",       en: "The Emperor",        img: "04-TheEmperor.png",         element: "火", colors: ["赤","金"],  upright_kw: "権威・安定・構造",           rev_kw: "支配・頑固・柔軟性欠如" },
  { id:  5, name: "教皇",       en: "The Hierophant",     img: "05-TheHierophant.png",      element: "土", colors: ["赤","白"],  upright_kw: "伝統・教え・精神的指導",     rev_kw: "因習・異端・束縛" },
  { id:  6, name: "恋人",       en: "The Lovers",         img: "06-TheLovers.png",          element: "風", colors: ["橙","金"],  upright_kw: "選択・愛・調和",             rev_kw: "不一致・誘惑・優柔不断" },
  { id:  7, name: "戦車",       en: "The Chariot",        img: "07-TheChariot.png",         element: "水", colors: ["青","黄"],  upright_kw: "前進・意志・勝利",           rev_kw: "暴走・方向喪失" },
  { id:  8, name: "力",         en: "Strength",           img: "08-Strength.png",           element: "火", colors: ["黄","白"],  upright_kw: "内なる力・勇気・忍耐",       rev_kw: "自信喪失・感情の暴走" },
  { id:  9, name: "隠者",       en: "The Hermit",         img: "09-TheHermit.png",          element: "土", colors: ["灰","黄"],  upright_kw: "内省・孤独・光を灯す",       rev_kw: "孤立・引きこもり" },
  { id: 10, name: "運命の輪",   en: "Wheel of Fortune",   img: "10-WheelOfFortune.png",     element: "火", colors: ["青","橙"],  upright_kw: "転換・巡り・チャンス",       rev_kw: "逆風・抵抗・悪循環" },
  { id: 11, name: "正義",       en: "Justice",            img: "11-Justice.png",            element: "風", colors: ["赤","緑"],  upright_kw: "公正・均衡・因果",           rev_kw: "不公平・偏見・責任回避" },
  { id: 12, name: "吊られた男", en: "The Hanged Man",     img: "12-TheHangedMan.png",       element: "水", colors: ["青","赤"],  upright_kw: "待機・視点の転換・犠牲",     rev_kw: "停滞への抵抗・執着" },
  { id: 13, name: "死神",       en: "Death",              img: "13-Death.png",              element: "水", colors: ["黒","白"],  upright_kw: "終わりと始まり・変容",       rev_kw: "変化への恐れ・腐敗" },
  { id: 14, name: "節制",       en: "Temperance",         img: "14-Temperance.png",         element: "火", colors: ["青","橙"],  upright_kw: "調和・バランス・癒し",       rev_kw: "過剰・不均衡・焦り" },
  { id: 15, name: "悪魔",       en: "The Devil",          img: "15-TheDevil.png",           element: "土", colors: ["黒","赤"],  upright_kw: "束縛・物質・欲望",           rev_kw: "解放・執着を手放す" },
  { id: 16, name: "塔",         en: "The Tower",          img: "16-TheTower.png",           element: "火", colors: ["黒","橙"],  upright_kw: "崩壊・急変・解放",           rev_kw: "大難を小難に・内的崩壊" },
  { id: 17, name: "星",         en: "The Star",           img: "17-TheStar.png",            element: "風", colors: ["青","白"],  upright_kw: "希望・癒し・導き",           rev_kw: "失望・自信喪失" },
  { id: 18, name: "月",         en: "The Moon",           img: "18-TheMoon.png",            element: "水", colors: ["紺","銀"],  upright_kw: "幻想・不安・無意識",         rev_kw: "混乱の解消・真実が見える" },
  { id: 19, name: "太陽",       en: "The Sun",            img: "19-TheSun.png",             element: "火", colors: ["黄","橙"],  upright_kw: "喜び・成功・エネルギー",     rev_kw: "過信・疲弊・曇り" },
  { id: 20, name: "審判",       en: "Judgement",          img: "20-Judgement.png",          element: "火", colors: ["青","白"],  upright_kw: "覚醒・再生・呼び声",         rev_kw: "自己批判・後悔・過去への固執" },
  { id: 21, name: "世界",       en: "The World",          img: "21-TheWorld.png",           element: "土", colors: ["紫","緑"],  upright_kw: "完成・統合・達成",           rev_kw: "未完成・停滞・完璧主義" },
];

const SUITS = [
  { name: "ワンド",     element: "火", theme: "情熱・行動・創造", colors: ["赤","橙"] },
  { name: "カップ",     element: "水", theme: "感情・直感・関係", colors: ["青","銀"] },
  { name: "ソード",     element: "風", theme: "思考・葛藤・真実", colors: ["灰","白"] },
  { name: "ペンタクル", element: "土", theme: "物質・仕事・安定", colors: ["緑","金"] },
];

const PIP_NAMES   = ["エース","2","3","4","5","6","7","8","9","10"];
const COURT_RANKS = ["ペイジ","ナイト","クイーン","キング"];

function buildMinorArcana() {
  const cards = [];
  SUITS.forEach(suit => {
    PIP_NAMES.forEach(pip => {
      const num = PIP_IMG[pip];
      cards.push({
        name: `${pip}・オブ・${suit.name}`,
        en:   `${pip} of ${suit.name}`,
        img:  `${SUIT_IMG[suit.name]}${num}.png`,
        element: suit.element,
        colors:  suit.colors,
        upright_kw: `${suit.theme}の展開`,
        rev_kw:     `${suit.theme}の乱れ・停滞`,
      });
    });
    COURT_RANKS.forEach(rank => {
      const num = COURT_IMG[rank];
      cards.push({
        name: `${rank}・オブ・${suit.name}`,
        en:   `${rank} of ${suit.name}`,
        img:  `${SUIT_IMG[suit.name]}${num}.png`,
        element: suit.element,
        colors:  suit.colors,
        upright_kw: `${suit.theme}を体現する人物・側面`,
        rev_kw:     "その資質の歪み・未熟さ",
      });
    });
  });
  return cards;
}

const ALL_CARDS = [...MAJOR_ARCANA, ...buildMinorArcana()];

function dealDeck() {
  const indices = Array.from({ length: 78 }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.map((idx, pos) => ({
    ...ALL_CARDS[idx],
    is_reversed: Math.random() < 0.5,
    position: pos + 1,
  }));
}
