/**
 * js/ui/geminateUI.js
 * Geminate 專屬 UI 外掛模組
 * 負責渲染形態切換按鈕，並將當前形態交接給 API 大腦與存檔系統
 */
document.addEventListener('DOMContentLoaded', () => {
  const mechanicsContainer = document.getElementById('class-mechanics-container');
  // 預設為近戰形態
  let currentForm = 'melee'; 

  // 1. 渲染雙子專屬的形態切換 UI (單一按鈕切換版)
  function renderGeminateUI() {
    if (!mechanicsContainer) return;
    
    // 依照當前形態決定按鈕文字與主題色
    const isMelee = currentForm === 'melee';
    const btnText = isMelee ? '⚔️ 當前形態：近戰 (Melee)' : '🏹 當前形態：遠程 (Ranged)';
    const btnColor = isMelee ? '#ab5c7d' : '#6a6573'; // 洋紅 vs 暗灰
    
    mechanicsContainer.innerHTML = `
      <div class="tracker-row" style="border-left: 4px solid ${btnColor}; padding-left: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; transition: border-color 0.3s;">
        <span class="tracker-name" style="color: ${btnColor}; font-weight: bold; transition: color 0.3s;">🔄 雙子形態開關 (Form Toggle)</span>
        <button id="btn-form-toggle" style="width: 100%; background: ${btnColor}; color: white; border: none; padding: 12px; border-radius: 4px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: background 0.3s;">
          ${btnText}
        </button>
      </div>
    `;

    // 監聽按鈕點擊，一鍵反轉狀態並重繪
    document.getElementById('btn-form-toggle').addEventListener('click', () => {
      currentForm = currentForm === 'melee' ? 'ranged' : 'melee';
      renderGeminateUI();
    });
  }

  renderGeminateUI();

  // 2. 定義 API 對接點：當總管索要資料時，拋出當前形態
  window.getCharacterMechanicsState = function() {
    return {
      current_form: currentForm
    };
  };

  // 3. 存檔支援：匯出原始資料給主引擎打包
  window.getRawPluginState = function() {
    return { 
      currentForm: currentForm 
    };
  };

  // 4. 存檔支援：竊聽主引擎的「載入完畢」廣播，覆寫自身狀態
  document.addEventListener('gameStateLoaded', (e) => {
    if (e.detail && e.detail.currentForm !== undefined) {
      currentForm = e.detail.currentForm;
      // 資料覆寫後，強制重繪畫面以更新按鈕顯示
      renderGeminateUI(); 
    }
  });
});