// === モード切り替えの処理 ===
const toggleBtn = document.getElementById('mode-toggle-btn');
const toggleImg = document.getElementById('toggle-img');
const penlightView = document.getElementById('penlight-view');
const uchiwaView = document.getElementById('uchiwa-view');
let isPenlightMode = true;

toggleBtn.addEventListener('click', () => {
  isPenlightMode = !isPenlightMode;
  if (isPenlightMode) {
    penlightView.classList.add('active');
    uchiwaView.classList.remove('active');
    // 画像をうちわモードボタンに変更
    toggleImg.src = 'image/uchiwa.btn.png'; 
    toggleImg.alt = 'うちわモードへ';
  } else {
    penlightView.classList.remove('active');
    uchiwaView.classList.add('active');
    // 画像をペンライトモードボタンに変更
    toggleImg.src = 'image/penlight.btn.png'; 
    toggleImg.alt = 'ペンライトモードへ';
  }
});

// === ペンライトの処理 ===
const colors = ['#ff0000', '#0000ff', '#ffff00', '#00ff00', '#ff00ff', '#ffffff'];
let currentColorIndex = 0;

function updatePenlightColor() {
  penlightView.style.backgroundColor = colors[currentColorIndex];
}
updatePenlightColor(); // 初期化

// 右側タップ：次の色へ
document.getElementById('zone-right').addEventListener('click', () => {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  updatePenlightColor();
});

// 左側タップ：前の色へ
document.getElementById('zone-left').addEventListener('click', () => {
  currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
  updatePenlightColor();
});

// 好きな色（カラーピッカー）が変更された時の処理
const colorPicker = document.getElementById('custom-color');
colorPicker.addEventListener('input', (e) => {
  const newColor = e.target.value;
  colors[currentColorIndex] = newColor;
  updatePenlightColor();
});

// === うちわ（動画・カスタムテキスト切り替え）の処理 ===
const videoElement = document.getElementById('uchiwa-video');
const videoButtons = document.querySelectorAll('.vid-btn');

// 新しく追加した要素を取得
const customTextDisplay = document.getElementById('custom-text-display');
const customTextInput = document.getElementById('custom-text-input');
const customTextColor = document.getElementById('custom-text-color');

// テキスト入力または色変更があった時の処理
function updateCustomText() {
  const text = customTextInput.value;
  customTextDisplay.innerText = text;
  customTextDisplay.style.color = customTextColor.value;

  if (text.trim() !== '') {
    // 文字が入力されている場合：テキストを表示し、動画を非表示＆一時停止
    customTextDisplay.style.display = 'flex';
    videoElement.style.display = 'none';
    videoElement.pause();
  } else {
    // 文字が消された場合：動画に戻す
    customTextDisplay.style.display = 'none';
    videoElement.style.display = 'block';
    videoElement.play();
  }
}

// 入力欄やカラーピッカーが変更されるたびに updateCustomText を実行
customTextInput.addEventListener('input', updateCustomText);
customTextColor.addEventListener('input', updateCustomText);

// 既存の動画切り替えボタンの処理
videoButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const newSrc = e.target.getAttribute('data-src');
    videoElement.src = newSrc;
    
    // 動画ボタンが押されたら、入力されている文字を消して動画を優先する
    customTextInput.value = '';
    customTextDisplay.style.display = 'none';
    videoElement.style.display = 'block';
    videoElement.play();
  });
});