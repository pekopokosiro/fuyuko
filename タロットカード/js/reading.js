// ============================================================
// リーディング生成ロジック（APIなし・テンプレートエンジン）
// ============================================================

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── テンプレートライブラリ ────────────────────────────────

const T_OPENING = {
  upright: [
    "{name}が、正位置で現れました。「{keyword}」——今のあなたに届いているメッセージです。",
    "選ばれたのは{name}（正位置）。{keyword}のエネルギーが、あなたのそばにあります。",
    "{name}・正位置。{keyword}というチカラが、今あなたの周りに満ちています。",
    "カードはあなたのために{name}を選びました。{keyword}——それが今のキーワードです。",
    "{name}が正位置で応えました。{keyword}、このエネルギーがあなたを支えています。",
  ],
  reversed: [
    "{name}が、逆位置で出ました。「{keyword}」——少し立ち止まって、内側を見てみましょう。",
    "逆位置の{name}。{keyword}のテーマが、今のあなたに問いかけています。",
    "{name}（逆位置）。{keyword}という側面が、まだ育ちきっていないのかもしれません。",
    "カードは{name}の逆位置を示しています。{keyword}——内側に眠るものへの気づきが求められています。",
    "逆位置で現れた{name}。{keyword}というメッセージが、やさしく問いかけてきます。",
  ],
};

const T_COLOR = [
  "このカードの{color}は、{psych}——そのエネルギーが今のあなたに働いています。",
  "{color}の色彩が語るのは「{psych}」。カードはそこからもメッセージを送っています。",
  "カードを彩る{color}は「{psych}」を意味します。あなたの今に重なるものがあるでしょうか。",
];

const T_IMPRESSION = {
  bright_moving: [
    "あなた自身が感じた「明るさ」と「動き」——その直感は正しいと思います。前へ進む準備は、すでに整っています。",
    "光と躍動感を受け取ったのは、あなたの中に前進するエネルギーが満ちているから。",
    "明るく動くイメージを感じたなら、今はまさに動きどき。あなたの直感を信じて。",
  ],
  bright_still: [
    "明るいけれど静か——それは焦らなくていい、という合図かもしれません。",
    "光はあるけど穏やか。今は動くより、ゆっくり受け取る時間なのかもしれません。",
    "明るさの中の静けさ。それは嵐の前の穏やかさではなく、満ちている状態です。",
  ],
  dark_moving: [
    "暗さの中にも動きを感じたなら、それはトンネルの中の光が動いているサインです。",
    "重さと躍動感が共存している——それは変化の始まりに特有のエネルギーです。",
    "影の中にも動くものを感じたのは、あなたの中に変わりたいという意志があるから。",
  ],
  dark_still: [
    "少し重たい印象を受けたなら、それはカードがあなたに正直に向き合っているからです。",
    "暗く静かな感覚。今は無理に動こうとせず、その感情をそのまま認めてあげましょう。",
    "重さと静けさを感じた——それは今のあなたが抱えているものを映しています。まず、それでいい。",
  ],
  neutral: [
    "どちらとも言えない感覚——それはまだ答えが育っている最中なのかもしれません。",
    "中立的な印象は、偏りのない視点を持っているサイン。今は見守るときかもしれません。",
    "はっきりしない感覚も、ひとつの答えです。霧が晴れるのを待つ余裕が、今のあなたには必要かも。",
  ],
};

const T_CONCERN = {
  "恋愛": [
    "恋愛のことを想いながら引いたこのカード——「焦らず、あなたらしくいること」が一番のメッセージです。",
    "心のことは、このカードが「あるがままの自分でいてほしい」と伝えているようです。",
    "恋愛に迷っているなら、このカードは「答えはもう、あなたの中にある」と言っています。",
  ],
  "仕事": [
    "仕事のことなら、このカードは「一歩ずつ、着実に」という姿勢を後押ししています。",
    "仕事の悩みに対して、このカードは「あなたの力を信じて」と伝えています。",
    "仕事のことで迷っているなら——このカードは「積み重ねてきたものは、消えていない」と言っています。",
  ],
  "人間関係": [
    "人間関係については、「相手の言葉より、自分の感覚を大事に」とこのカードは伝えています。",
    "誰かとの関係に悩んでいるなら、このカードは「距離感を整えることが大事」と語りかけています。",
    "人との繋がりに疲れを感じているなら——このカードは「一旦、自分に戻っていい」と言っています。",
  ],
  "自分自身": [
    "自分自身のことなら、このカードは「もうすでに、あなたは十分」と伝えています。",
    "自分に問いかけた今日。このカードは「あなたはちゃんと、前に進んでいる」と見えています。",
    "自分と向き合っているあなたへ——このカードは「気づいていること、それが強さ」と言っています。",
  ],
  "その他": [
    "このカードが伝えるのは、「今のあなたのままで、次の扉は開く」ということです。",
    "問いかけに、このカードはこう答えます——「見えていないものも、ちゃんと動いている」。",
    "カードはあなたの問いに正直に向き合っています。答えは少しずつ、形になっていくでしょう。",
  ],
};

const T_CLOSING = [
  "カードのメッセージは、あなたの中にすでにある答えを映しています。",
  "答えはいつも、あなたの中にあります。このカードはただ、それを照らすだけ。",
  "タロットは決めてくれません。でも、気づかせてくれます。直感を、大切に。",
  "どう受け取るかは、あなた次第。でも、このカードはあなたの味方です。",
  "このカードをどう解釈するかは自由です。ただ、心に残るものがあれば、それがメッセージです。",
  "カードはあなたを裁きません。ただ今のあなたに、そっと寄り添っています。",
];

// ── 印象スコアリング ────────────────────────────────────

function getMoodKey(impressions) {
  const bright = impressions.brightness; // 'bright' | 'dark' | 'neutral'
  const energy = impressions.energy;     // 'moving' | 'still' | 'neutral'
  if (bright === 'bright' && energy === 'moving') return 'bright_moving';
  if (bright === 'bright' && energy === 'still')  return 'bright_still';
  if (bright === 'dark'   && energy === 'moving') return 'dark_moving';
  if (bright === 'dark'   && energy === 'still')  return 'dark_still';
  return 'neutral';
}

// ── メイン生成関数 ─────────────────────────────────────

function generateReading(concern, category, card, impressions) {
  const isReversed = card.is_reversed;
  const keyword    = isReversed ? card.rev_kw : card.upright_kw;
  const colors     = card.colors || [];

  // 1. カード紹介
  const openingPool = isReversed ? T_OPENING.reversed : T_OPENING.upright;
  const opening = pick(openingPool)
    .replace(/\{name\}/g, card.name)
    .replace(/\{keyword\}/g, keyword);

  // 2. 色彩メッセージ（最初の色を使う）
  let colorLine = '';
  const primaryColor = colors.find(c => COLOR_PSYCH[c]);
  if (primaryColor) {
    const psych = COLOR_PSYCH[primaryColor].split('。')[0];
    colorLine = pick(T_COLOR)
      .replace(/\{color\}/g, primaryColor)
      .replace(/\{psych\}/g, psych);
  }

  // 3. 印象への共鳴
  const moodKey = getMoodKey(impressions);
  const impressionLine = pick(T_IMPRESSION[moodKey] || T_IMPRESSION.neutral);

  // 4. 相談カテゴリへのメッセージ
  const concernLine = pick(T_CONCERN[category] || T_CONCERN['その他']);

  // 5. 締め
  const closing = pick(T_CLOSING);

  // 組み立て
  const parts = [opening];
  if (colorLine) parts.push(colorLine);
  parts.push(impressionLine);
  parts.push(concernLine);
  parts.push(closing);

  return parts.join('\n\n');
}
