// js/ui/drifterUI.js
/**
 * Drifter 專屬 UI 外掛模組
 * 負責渲染與管理動態刻度軌 (Trackers)
 */
document.addEventListener('DOMContentLoaded', () => {
  const mechanicsContainer = document.getElementById('class-mechanics-container');
  const trackersMapping = window.characterConfig.trackers_mapping;
  let trackersState = {};

  // 1. 竊聽卡牌移動事件 (Event Listener)
  document.addEventListener('cardZoneChanged', (e) => {
    const { cardId, newZone, oldZone } = e.detail;

    if (newZone === 'active' && trackersMapping[cardId]) {
      if (!trackersState[cardId]) trackersState[cardId] = { current: trackersMapping[cardId].max };
    } else if (oldZone === 'active' && newZone !== 'active') {
      delete trackersState[cardId];
    }
    renderTrackers();
  });

  // 2. 自己畫專屬的 UI
  function renderTrackers() {
    if (!mechanicsContainer) return;
    mechanicsContainer.innerHTML = "";
    
    const activeTrackerIds = Object.keys(trackersState);
    if (activeTrackerIds.length === 0) return;

    activeTrackerIds.forEach(cardId => {
      const config = trackersMapping[cardId];
      const state = trackersState[cardId];
      const isDepleted = state.current === 0;

      const div = document.createElement('div');
      div.className = 'tracker-row';
      div.innerHTML = `
        <span class="tracker-name ${isDepleted ? 'tracker-warning' : ''}">
          ${config.name} ${isDepleted ? '(已耗盡)' : ''}
        </span>
        <div class="tracker-controls">
          <button onclick="drifterUpdateTracker('${cardId}', -1)">-</button>
          <span style="display:inline-block; width:40px; text-align:center; font-weight:bold; ${isDepleted ? 'color:#ff6b6b;' : ''}">${state.current} / ${config.max}</span>
          <button onclick="drifterUpdateTracker('${cardId}', 1)">+</button>
        </div>
      `;
      mechanicsContainer.appendChild(div);
    });
  }

  // 3. 專屬加減函數
  window.drifterUpdateTracker = function(cardId, change) {
    const config = trackersMapping[cardId];
    let newVal = trackersState[cardId].current + change;
    if (newVal < 0) newVal = 0;
    if (newVal > config.max) newVal = config.max;
    trackersState[cardId].current = newVal;
    renderTrackers();
  };

  // 4. 定義 API：當總管索要資料時，拋出格式化後的專屬機制資料
  window.getCharacterMechanicsState = function() {
    let formattedTrackers = {};
    Object.keys(trackersState).forEach(cardId => {
      const config = trackersMapping[cardId];
      formattedTrackers[config.name] = { 
        current: trackersState[cardId].current, 
        max: config.max 
      };
    });
    return { trackers: formattedTrackers };
  };

  // 5. 存檔支援：匯出原始資料給主引擎
  window.getRawPluginState = function() {
    return { trackersState };
  };

  // 6. 存檔支援：竊聽主引擎的「載入完畢」廣播，覆寫自身狀態
  document.addEventListener('gameStateLoaded', (e) => {
    if (e.detail && e.detail.trackersState) {
      trackersState = e.detail.trackersState;
      renderTrackers();
    }
  });
});