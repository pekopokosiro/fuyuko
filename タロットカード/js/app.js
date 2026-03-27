// ============================================================
// アプリケーション制御
// ============================================================

let deck = [];
let selectedCard = null;
let userImpressions = {};
let userConcern = '';
let userCategory = 'その他';

// ── 画面遷移 ───────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ── STEP 1: Welcome ────────────────────────────────────

document.getElementById('btn-start').addEventListener('click', () => {
  const concern  = document.getElementById('concern-input').value.trim();
  const category = document.querySelector('input[name="category"]:checked')?.value || 'その他';

  userConcern  = concern || '今日の自分の状態';
  userCategory = category;

  deck = dealDeck();
  buildCardGrid();
  showScreen('screen-select');
});

// ── STEP 2: カード選択 ─────────────────────────────────

function buildCardGrid() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  deck.forEach((card, i) => {
    const el = document.createElement('button');
    el.className = 'card-btn';
    el.textContent = card.position;
    el.addEventListener('click', () => selectCard(i, el));
    grid.appendChild(el);
  });
}

function selectCard(index, el) {
  document.querySelectorAll('.card-btn').forEach(b => b.classList.remove('chosen'));
  el.classList.add('chosen');
  selectedCard = deck[index];

  setTimeout(() => {
    revealCard();
    showScreen('screen-reveal');
  }, 400);
}

// ── STEP 3: カード開封 ─────────────────────────────────

function revealCard() {
  const card = selectedCard;
  const orientation = card.is_reversed ? '逆位置' : '正位置';

  // カード画像をセット（逆位置は180度回転）
  const cardImg = document.getElementById('card-img');
  cardImg.src = `Cards-png/${card.img}`;
  cardImg.alt = card.name;
  cardImg.classList.toggle('reversed', card.is_reversed);

  // テキスト
  document.getElementById('reveal-name-ja').textContent = card.name;
  document.getElementById('reveal-orient').textContent  = orientation;

  // フリップアニメーション
  const flipEl = document.getElementById('card-flip');
  flipEl.classList.remove('flipped');
  void flipEl.offsetWidth;
  setTimeout(() => flipEl.classList.add('flipped'), 100);
}

document.getElementById('btn-to-impression').addEventListener('click', () => {
  buildImpressionForm();
  showScreen('screen-impression');
});

// ── STEP 4: 印象ヒアリング ────────────────────────────

const QUESTIONS = [
  {
    key: 'brightness',
    text: 'このカードを見た瞬間の明るさは？',
    choices: [
      { value: 'bright',  label: '明るい・光がある' },
      { value: 'dark',    label: '暗い・影がある' },
      { value: 'neutral', label: 'どちらでもない' },
    ],
  },
  {
    key: 'temperature',
    text: 'このカードから受け取る温度感は？',
    choices: [
      { value: 'warm',    label: '温かい・熱い' },
      { value: 'cold',    label: '冷たい・涼しい' },
      { value: 'neutral', label: 'どちらでもない' },
    ],
  },
  {
    key: 'energy',
    text: 'このカードのエネルギーは？',
    choices: [
      { value: 'moving',  label: '動いている・躍動感' },
      { value: 'still',   label: '静止している・落ち着き' },
      { value: 'neutral', label: 'どちらでもない' },
    ],
  },
  {
    key: 'attention',
    text: '目が止まった部分はありましたか？',
    choices: [
      { value: 'yes',     label: 'はっきりある' },
      { value: 'some',    label: '少しある' },
      { value: 'no',      label: '特になかった' },
    ],
  },
];

function buildImpressionForm() {
  const container = document.getElementById('impression-questions');
  container.innerHTML = '';
  QUESTIONS.forEach(q => {
    const block = document.createElement('div');
    block.className = 'q-block';
    block.innerHTML = `<p class="q-text">${q.text}</p>`;
    const btnRow = document.createElement('div');
    btnRow.className = 'q-choices';
    q.choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'q-btn';
      btn.textContent = c.label;
      btn.dataset.key   = q.key;
      btn.dataset.value = c.value;
      btn.addEventListener('click', () => {
        document.querySelectorAll(`.q-btn[data-key="${q.key}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userImpressions[q.key] = c.value;
        checkImpressionComplete();
      });
      btnRow.appendChild(btn);
    });
    block.appendChild(btnRow);
    container.appendChild(block);
  });

  // フリーテキスト
  const freeBlock = document.createElement('div');
  freeBlock.className = 'q-block';
  freeBlock.innerHTML = `
    <p class="q-text">このカードを見て浮かんだことを、自由に書いてください。<span class="q-optional">（任意）</span></p>
    <textarea id="free-text" placeholder="直感で OK。どんな言葉でも。" rows="3"></textarea>
  `;
  container.appendChild(freeBlock);

  document.getElementById('btn-to-reading').disabled = true;
}

function checkImpressionComplete() {
  const answered = QUESTIONS.every(q => userImpressions[q.key]);
  document.getElementById('btn-to-reading').disabled = !answered;
}

document.getElementById('btn-to-reading').addEventListener('click', () => {
  userImpressions.freeText = document.getElementById('free-text')?.value.trim() || '';
  showReading();
  showScreen('screen-reading');
});

// ── STEP 5: リーディング表示 ──────────────────────────

function showReading() {
  const card        = selectedCard;
  const orientation = card.is_reversed ? '逆位置' : '正位置';
  const keyword     = card.is_reversed ? card.rev_kw : card.upright_kw;

  // カード画像（結果画面）
  const resultImg = document.getElementById('result-card-img');
  resultImg.src = `Cards-png/${card.img}`;
  resultImg.alt = card.name;
  resultImg.classList.toggle('reversed', card.is_reversed);

  // カードサマリー
  document.getElementById('result-card-name').textContent    = `${card.name}（${orientation}）`;
  document.getElementById('result-card-en').textContent      = card.en;
  document.getElementById('result-card-element').textContent = `${card.element}のエレメント`;
  document.getElementById('result-keyword').textContent      = keyword;
  document.getElementById('result-concern').textContent      = userConcern;

  // フリーテキスト表示
  const freeWrap = document.getElementById('result-free-wrap');
  if (userImpressions.freeText) {
    document.getElementById('result-free').textContent = `「${userImpressions.freeText}」`;
    freeWrap.style.display = 'block';
  } else {
    freeWrap.style.display = 'none';
  }

  // リーディング本文生成
  const reading = generateReading(userConcern, userCategory, card, userImpressions);
  const readingEl = document.getElementById('reading-text');
  readingEl.innerHTML = '';

  // 段落に分けて表示
  reading.split('\n\n').forEach(para => {
    const p = document.createElement('p');
    p.textContent = para;
    readingEl.appendChild(p);
  });

  // フェードイン
  readingEl.style.opacity = '0';
  setTimeout(() => {
    readingEl.style.transition = 'opacity 1s ease';
    readingEl.style.opacity = '1';
  }, 300);
}

// もう一枚引く
document.getElementById('btn-restart').addEventListener('click', () => {
  userImpressions = {};
  selectedCard    = null;
  document.getElementById('concern-input').value = '';
  document.querySelector('input[name="category"][value="その他"]').checked = true;
  showScreen('screen-welcome');
});
