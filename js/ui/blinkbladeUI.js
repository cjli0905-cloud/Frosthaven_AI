// js/ui/blinkbladeUI.js

document.addEventListener('DOMContentLoaded', () => {
  const mechanicsContainer = document.getElementById('class-mechanics-container');
  if (!mechanicsContainer) return;

  // 1. 狀態暫存：從 Config 讀取預設值
  let timeTokens = window.characterConfig.ui_modules.time_tokens.default || 1;
  let alliesCount = window.characterConfig.ui_modules.allies_count.default || 2;
  const maxTokens = window.characterConfig.ui_modules.time_tokens.max || 5;

  // 2. 渲染專屬 UI
  function renderBlinkbladeUI() {
    mechanicsContainer.innerHTML = `
      <div class="tracker-row">
        <span class="tracker-name" style="color: #4dabf7;">⏳ 時間指示物 (Time Tokens)</span>
        <div class="tracker-controls">
          <button id="btn-token-minus" class="secondary">-</button>
          <span style="display:inline-block; width:50px; text-align:center; font-weight:bold;">${timeTokens} / ${maxTokens}</span>
          <button id="btn-token-plus" class="secondary">+</button>
        </div>
      </div>
      <div class="tracker-row">
        <span class="tracker-name" style="color: #4CAF50;">🛡️ 場上盟友數量 (Allies)</span>
        <div class="tracker-controls">
          <button id="btn-ally-minus" class="secondary">-</button>
          <span style="display:inline-block; width:50px; text-align:center; font-weight:bold;">${alliesCount}</span>
          <button id="btn-ally-plus" class="secondary">+</button>
        </div>
      </div>
    `;

    // 3. 綁定加減事件
    document.getElementById('btn-token-minus').addEventListener('click', () => {
      if (timeTokens > 0) { timeTokens--; renderBlinkbladeUI(); }
    });
    document.getElementById('btn-token-plus').addEventListener('click', () => {
      if (timeTokens < maxTokens) { timeTokens++; renderBlinkbladeUI(); }
    });
    
    document.getElementById('btn-ally-minus').addEventListener('click', () => {
      if (alliesCount > 0) { alliesCount--; renderBlinkbladeUI(); }
    });
    document.getElementById('btn-ally-plus').addEventListener('click', () => {
      alliesCount++; renderBlinkbladeUI(); // 無上限
    });
  }

  // 初始繪製
  renderBlinkbladeUI();

  // 4. 註冊給大總管 (renderInput.js) 呼叫的對接介面
  window.getCharacterMechanicsState = function() {
    return {
      time_tokens: timeTokens,
      allies_count: alliesCount
    };
  };

  // 5. 存檔支援：匯出原始資料給主引擎打包
  window.getRawPluginState = function() {
    return { 
      timeTokens: timeTokens, 
      alliesCount: alliesCount 
    };
  };

  // 6. 存檔支援：竊聽主引擎的「載入完畢」廣播，覆寫自身狀態
  document.addEventListener('gameStateLoaded', (e) => {
    if (e.detail) {
      if (e.detail.timeTokens !== undefined) timeTokens = e.detail.timeTokens;
      if (e.detail.alliesCount !== undefined) alliesCount = e.detail.alliesCount;
      renderBlinkbladeUI(); // 資料覆寫後，強制重繪畫面
    }
  });
});