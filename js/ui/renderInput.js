document.addEventListener('DOMContentLoaded', () => {
  const config = window.characterConfig || {};
  const cardsDb = window.cardsDatabase || [];
  if (config.class_name) {
    document.getElementById('character-name-display').innerText = config.class_name;
  }

  // 【新增】動態套用角色專屬主題色
  if (config.theme) {
    Object.keys(config.theme).forEach(cssVar => {
      document.documentElement.style.setProperty(cssVar, config.theme[cssVar]);
    });
  }

  const btnStateDrawer = document.getElementById('btn-state-drawer');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const stateModal = document.getElementById('state-modal');
  const btnSettings = document.getElementById('btn-settings');
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  
  const btnHpMinus = document.getElementById('btn-hp-minus');
  const btnHpPlus = document.getElementById('btn-hp-plus');
  const hpDisplay = document.getElementById('hp-display');
  const btnAskAi = document.getElementById('btn-ask-ai');
  const resultPanel = document.getElementById('result-panel');
  const rawOutput = document.getElementById('raw-json-output');

  const btnOpenDeckBuilder = document.getElementById('btn-open-deck-builder');
  const btnCloseDeckBuilder = document.getElementById('btn-close-deck-builder');
  const deckBuilderModal = document.getElementById('deck-builder-modal');
  const deckBuilderGrid = document.getElementById('deck-builder-grid');
  const deckLimitCounter = document.getElementById('deck-limit-counter');

  const btnExportSave = document.getElementById('btn-export-save');
  const btnImportSave = document.getElementById('btn-import-save');
  const importFile = document.getElementById('import-file');
  
  // 替換原本的 const maxHp = 10;
  let currentHp = 10;
  let maxHp = 10; 
  const inputMaxHp = document.getElementById('input-max-hp');

  if (inputMaxHp) {
    inputMaxHp.addEventListener('change', (e) => {
      let newVal = parseInt(e.target.value, 10);
      if (isNaN(newVal) || newVal < 1) newVal = 1;
      maxHp = newVal;
      // 若當前血量超過新設定的上限，自動往下修正
      if (currentHp > maxHp) currentHp = maxHp; 
      updateHpDisplay();
      if (typeof window.forceAutoSave === 'function') window.forceAutoSave();
    });
  }
  let cardState = {};
  
  // === 元素輪盤狀態管理 ===
  let elementData = { fire: 'inert', ice: 'inert', air: 'inert', earth: 'inert', light: 'inert', dark: 'inert' };
  const stateOrder = ['inert', 'strong', 'waning'];
  const stateLabels = { inert: '惰性', waning: '漸隱', strong: '強烈' };
  
  function renderElements() {
    ['fire', 'ice', 'air', 'earth', 'light', 'dark'].forEach(el => {
      const btn = document.getElementById(`btn-el-${el}`);
      if (!btn) return;
      const state = elementData[el];
      btn.className = `element-btn ${state}`;
      btn.querySelector('.el-state').innerText = stateLabels[state];
    });
  }

  ['fire', 'ice', 'air', 'earth', 'light', 'dark'].forEach(el => {
    const btn = document.getElementById(`btn-el-${el}`);
    if (btn) {
      btn.addEventListener('click', () => {
        let nextIdx = (stateOrder.indexOf(elementData[el]) + 1) % 3;
        elementData[el] = stateOrder[nextIdx];
        renderElements();
      });
    }
  });

  cardsDb.forEach(card => {
    cardState[card.id] = card.level === "1" ? "hand" : "pool";
  });

  window.changeCardZone = function(cardId, newZone) {
    const oldZone = cardState[cardId];
    cardState[cardId] = newZone;
    renderModalCards();
    document.dispatchEvent(new CustomEvent('cardZoneChanged', { detail: { cardId, newZone, oldZone } }));
  };

  function renderModalCards() {
    const zones = { hand: [], active: [], discard: [], lost: [], pool: [] };
    
    cardsDb.forEach(card => { 
      // 【修復】極限防呆，防止因跨職業讀取舊存檔導致 undefined 崩潰
      const currentState = cardState[card.id] || 'pool'; 
      if (zones[currentState]) {
        zones[currentState].push(card); 
      }
    });

    Object.keys(zones).forEach(zoneKey => {
      const container = document.getElementById(`zone-${zoneKey}`);
      if (!container) return;
      container.innerHTML = ""; 
      if (zones[zoneKey].length === 0) {
        container.innerHTML = '<div style="color:#777; font-size:0.85em; text-align:center;">此區為空</div>';
        return;
      }
      zones[zoneKey].forEach(card => {
        const div = document.createElement('div');
        div.className = 'mini-card';
        div.innerHTML = `
          <span>${card.name} <small style="color:#aaa;">(先攻:${card.initiative})</small></span>
          <select onchange="changeCardZone('${card.id}', this.value)">
            <option value="hand" ${zoneKey === 'hand' ? 'selected' : ''}>手牌 (Hand)</option>
            <option value="active" ${zoneKey === 'active' ? 'selected' : ''}>持續 (Active)</option>
            <option value="discard" ${zoneKey === 'discard' ? 'selected' : ''}>棄牌 (Discard)</option>
            <option value="lost" ${zoneKey === 'lost' ? 'selected' : ''}>流失 (Lost)</option>
          </select>
        `;
        container.appendChild(div);
      });
    });
  }

  // === 攜帶卡牌管理 (Deck Builder) 邏輯 ===
  function renderDeckBuilder() {
    deckBuilderGrid.innerHTML = "";
    const handLimit = config.hand_limit || 10;
    
    // 計算目前已攜帶的卡牌總數 (非 pool 的皆算)
    const carriedCount = Object.values(cardState).filter(zone => zone !== 'pool').length;
    
    deckLimitCounter.innerText = `已選攜帶: ${carriedCount} / ${handLimit}`;
    if (carriedCount !== handLimit) {
      deckLimitCounter.classList.add('limit-warning');
    } else {
      deckLimitCounter.classList.remove('limit-warning');
    }

    // 依賴 drifterCards.js 的預設順序依序畫出
    cardsDb.forEach(card => {
      const isCarried = cardState[card.id] !== 'pool';
      const div = document.createElement('div');
      div.className = `deck-card-btn ${isCarried ? 'selected' : ''}`;
      div.innerHTML = `
        <span class="lvl">Level ${card.level}</span>
        <span class="name">${card.name}</span>
        <span class="init">先攻: ${card.initiative}</span>
      `;
      
      div.addEventListener('click', () => {
        // 方案 A：取消再重新勾選，一律強制重置回 'hand'
        const newZone = isCarried ? 'pool' : 'hand';
        window.changeCardZone(card.id, newZone);
        renderDeckBuilder(); // 重新計算與高亮
      });
      deckBuilderGrid.appendChild(div);
    });
  }

  // 綁定 Deck Builder 開關
  btnOpenDeckBuilder.addEventListener('click', () => {
    renderDeckBuilder();
    deckBuilderModal.classList.remove('hidden');
  });
  btnCloseDeckBuilder.addEventListener('click', () => deckBuilderModal.classList.add('hidden'));

  // === 各區一鍵收回與防呆確認邏輯 ===
  function setupRecoverButton(btnId, sourceZone, zoneName) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    
    btn.addEventListener('click', () => {
      // 篩選出該區域的所有卡牌
      const cardsToRecover = Object.keys(cardState).filter(cardId => cardState[cardId] === sourceZone);
      
      if (cardsToRecover.length === 0) {
        return alert(`目前「${zoneName}」沒有卡牌可以收回！`);
      }
      
      // 跳出確認視窗防呆
      if (confirm(`確定要將「${zoneName}」的 ${cardsToRecover.length} 張卡牌全部收回手牌嗎？`)) {
        cardsToRecover.forEach(cardId => {
          // 呼叫全域函數，確保正確觸發 UI 重繪與刻度刪除邏輯
          window.changeCardZone(cardId, 'hand');
        });
      }
    });
  }

  // 綁定三個區塊的按鈕
  setupRecoverButton('btn-recover-active', 'active', '持續效果區');
  setupRecoverButton('btn-recover-discard', 'discard', '棄牌堆');
  setupRecoverButton('btn-recover-lost', 'lost', '流失區');

  btnStateDrawer.addEventListener('click', () => stateModal.classList.remove('hidden'));
  btnCloseModal.addEventListener('click', () => stateModal.classList.add('hidden'));
  stateModal.addEventListener('click', (event) => { if (event.target === stateModal) stateModal.classList.add('hidden'); });
  
  btnSettings.addEventListener('click', () => settingsModal.classList.remove('hidden'));
  btnCloseSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));
  settingsModal.addEventListener('click', (event) => { if (event.target === settingsModal) settingsModal.classList.add('hidden'); });

  // 血量增減邏輯
  function updateHpDisplay() { hpDisplay.innerText = `${currentHp} / ${maxHp}`; }
  btnHpMinus.addEventListener('click', () => { if (currentHp > 0) currentHp--; updateHpDisplay(); });
  btnHpPlus.addEventListener('click', () => { if (currentHp < maxHp) currentHp++; updateHpDisplay(); });

  // 【新增】動態渲染快捷標籤 (字典架構版)
  const quickTagsContainer = document.getElementById('quick-tags-container');
  const selectedTags = new Set();

  if (config.quick_tags && quickTagsContainer) {
    Object.keys(config.quick_tags).forEach(tag => {
      const btn = document.createElement('div');
      btn.className = 'quick-tag-btn';
      btn.innerText = tag;
      btn.addEventListener('click', () => {
        if (selectedTags.has(tag)) {
          selectedTags.delete(tag);
          btn.classList.remove('active');
        } else {
          selectedTags.add(tag);
          btn.classList.add('active');
        }
      });
      quickTagsContainer.appendChild(btn);
    });
  }

  // --- 存檔與讀檔核心邏輯 ---
  function createSaveData() {
    return {
      hp: currentHp,
      maxHp: maxHp, // 【新增】讓最大血量跟著角色存檔
      cardState: cardState,
      pluginData: window.getRawPluginState ? window.getRawPluginState() : {}
    };
  }

  // 暴露全域存檔函數，供 index.html 在切換角色前呼叫
  window.forceAutoSave = function() {
    const saveKey = `frosthaven_autosave_${config.class_id || 'default'}`;
    localStorage.setItem(saveKey, JSON.stringify(createSaveData()));
  };

  function loadSaveData(data) {
    // 【新增】優先讀取最大血量並同步更新畫面輸入框
    if (data.maxHp !== undefined) {
      maxHp = data.maxHp;
      if (inputMaxHp) inputMaxHp.value = maxHp;
    }
    
    if (data.hp !== undefined) currentHp = data.hp;
    
    // 防呆合併邏輯
    if (data.cardState) {
      cardsDb.forEach(card => {
        cardState[card.id] = data.cardState[card.id] || (card.level === "1" ? "hand" : "pool");
      });
    }

    updateHpDisplay();
    renderModalCards();
    if (typeof renderDeckBuilder === 'function') renderDeckBuilder(); // 同步更新攜帶管理
    document.dispatchEvent(new CustomEvent('gameStateLoaded', { detail: data.pluginData || {} }));
  }

  // 1. 初始化與讀取暫存
  const saveKey = `frosthaven_autosave_${config.class_id || 'default'}`;
  const autoSave = localStorage.getItem(saveKey);
  
  if (autoSave) {
    try {
      loadSaveData(JSON.parse(autoSave));
    } catch(e) {
      console.warn("無法解析自動存檔");
      renderModalCards();
    }
  } else {
    // 【修復】全新開局時，必須主動把該角色等級 1 的卡牌塞進手牌！
    cardsDb.forEach(card => {
      cardState[card.id] = card.level === "1" ? "hand" : "pool";
    });
    
    renderModalCards();
    if (typeof renderDeckBuilder === 'function') renderDeckBuilder();
  }

  // 2. 【修復】重新綁定匯出/載入事件，徹底消滅 ReferenceError
  if (btnExportSave) {
    btnExportSave.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(createSaveData()));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      
      const fileName = `${config.class_name || 'Frosthaven'}_Save_${new Date().toISOString().slice(0,10)}.json`;
      downloadAnchor.setAttribute("download", fileName);
      
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (btnImportSave) {
    btnImportSave.addEventListener('click', () => {
      if (!importFile.files.length) return alert("請先選擇存檔檔案！");
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          loadSaveData(JSON.parse(e.target.result));
          alert("戰局載入成功！");
          document.getElementById('settings-modal').classList.add('hidden');
        } catch (err) {
          alert("檔案格式錯誤！");
        }
      };
      reader.readAsText(importFile.files[0]);
    });
  }

  function renderAiDecision(decision) {
    resultPanel.classList.remove('hidden');
    rawOutput.innerText = JSON.stringify(decision, null, 2);
    const cardsContainer = document.getElementById('cards-container');

    if (decision.action_type === "LONG_REST") {
      document.getElementById('initiative-display').innerText = "[ 先攻: 99 (長休) ]";
      cardsContainer.innerHTML = `<div class="card-slot" style="border-left-color: #2196F3;"><strong>系統建議：宣告長休 (Long Rest)</strong></div>`;
      document.getElementById('decision-reasoning').innerText = decision.reasoning;
      return;
    }
    if (decision.action_type === "SHORT_REST") {
      document.getElementById('initiative-display').innerText = "[ 戰術建議: 短休 ]";
      cardsContainer.innerHTML = `<div class="card-slot" style="border-left-color: #FFC107;"><strong>系統建議：請進行短休 (Short Rest) 取回棄牌</strong></div>`;
      document.getElementById('decision-reasoning').innerText = decision.reasoning;
      return;
    }

    // 1. 渲染先攻值
    const initCard = cardsDb.find(c => c.id === decision.initiative_card_id) || cardsDb.find(c => c.name === decision.initiative_card_id) || {};
    const initValue = initCard.initiative || decision.initiative_value || "??";
    const initName = initCard.name || decision.initiative_card_id || decision.initiative_card;
    document.getElementById('initiative-display').innerText = `[ 先攻卡: ${initName} (先攻值: ${initValue}) ]`;

    // 2. 渲染通用外掛機制 (Special Mechanics)
    let mechanicsHtml = '';
    if (decision.special_mechanics && decision.special_mechanics.length > 0) {
      decision.special_mechanics.forEach(mech => {
        // 解構 AI 回傳的嵌套 fields 物件
        const sourceData = mech.fields || mech; 
        
        let tags = '';
        Object.entries(sourceData).forEach(([key, val]) => {
          if (key !== 'type' && key !== 'note' && key !== 'description') {
            tags += `<span style="display:inline-block; margin-right:8px; background:#2c2c2c; padding:3px 8px; border-radius:4px; font-weight:bold;">${val}</span>`;
          }
        });

        // 確保精準抓到 note，無論 AI 放在外層還是內層
        const noteText = mech.note || sourceData.note || '';
          
        mechanicsHtml += `
          <div class="card-slot" style="border-left-color: #9C27B0; margin-bottom: 15px; background: #1e1324;">
            <div style="color: #E040FB; font-weight: bold; margin-bottom: 8px;">✨ 專屬機制觸發 (${mech.type || '機制'})</div>
            <div style="margin-bottom: 5px;">${tags}</div>
            <div style="font-size: 0.85em; color: #b0bec5; line-height: 1.4;">${noteText}</div>
          </div>
        `;
      });
    }
    
    // 3. 渲染上半部與下半部
    const topCard = cardsDb.find(c => c.id === decision.top_action.card_id) || {};
    const topName = topCard.name || decision.top_action.card_name;
    const topSummary = topCard.top?.summary || decision.top_action.action_summary;
    const topLost = topCard.top?.is_lost || decision.top_action.is_lost;

    const topHtml = `
      <div id="top-action-card" class="card-slot" style="margin-bottom: 15px;">
        <div style="color: #4CAF50; font-weight: bold; margin-bottom: 5px;">▲ 上半部 (Top)</div>
        <strong>${topName}</strong>
        <div style="font-size: 0.9em; margin-top: 5px;">${topSummary}</div>
        ${topLost ? '<span style="color: #f44336; font-size: 0.8em; border: 1px solid #f44336; padding: 2px 4px; border-radius: 3px; margin-top: 5px; display: inline-block;">此行動流失</span>' : ''}
      </div>
    `;

    const bottomCard = cardsDb.find(c => c.id === decision.bottom_action.card_id) || {};
    const bottomName = bottomCard.name || decision.bottom_action.card_name;
    const bottomSummary = bottomCard.bottom?.summary || decision.bottom_action.action_summary;
    const bottomLost = bottomCard.bottom?.is_lost || decision.bottom_action.is_lost;

    const bottomHtml = `
      <div id="bottom-action-card" class="card-slot">
        <div style="color: #4CAF50; font-weight: bold; margin-bottom: 5px;">▼ 下半部 (Bottom)</div>
        <strong>${bottomName}</strong>
        <div style="font-size: 0.9em; margin-top: 5px;">${bottomSummary}</div>
        ${bottomLost ? '<span style="color: #f44336; font-size: 0.8em; border: 1px solid #f44336; padding: 2px 4px; border-radius: 3px; margin-top: 5px; display: inline-block;">此行動流失</span>' : ''}
      </div>
    `;

    cardsContainer.innerHTML = mechanicsHtml + topHtml + bottomHtml;
    document.getElementById('decision-reasoning').innerText = `【戰術分析】\n${decision.reasoning}`;
  }


  btnAskAi.addEventListener('click', async () => {
    const rawDirective = document.getElementById('player-directive').value.trim();
    const apiKey = document.getElementById('api-key').value.trim();
    const canRest = document.getElementById('flag-can-rest').checked;
    const selectedModel = document.getElementById('ai-model-select').value;

    // 【新增】將點選的標籤與輸入框的文字合併，並動態注入標籤含義
    const tagsString = Array.from(selectedTags).map(t => `[${t}]`).join(' ');
    let finalDirective = `${tagsString} ${rawDirective}`.trim();

    // 【修改】防呆條件放寬：只要有選標籤「或」有打字都可以
    if (!finalDirective) return alert("請選擇快捷標籤，或輸入行動方針！");
    if (!apiKey) return alert("請貼上你的 API Key！");

    // 動態提取並組裝標籤詳細含義，改用 config 讀取
    if (selectedTags.size > 0) {
      const activeTagRules = Array.from(selectedTags)
        .map(tag => `- ${tag}：${config.quick_tags[tag]}`)
        .join('\n');
      finalDirective += `\n\n【當下戰略標籤指示】\n${activeTagRules}`;
    }

    // 每次請求 AI 時自動寫入【該角色專屬】快取
    localStorage.setItem(saveKey, JSON.stringify(createSaveData()));

    btnAskAi.disabled = true;
    btnAskAi.innerText = selectedModel.includes("lite") ? "Lite 極速運算中..." : "深度運算中...";
    resultPanel.classList.add('hidden');
    
    try {
      const currentConditions = {
        wound: document.getElementById('cond-wound').checked,
        poison: document.getElementById('cond-poison').checked,
        disarm: document.getElementById('cond-disarm').checked,
        immobilize: document.getElementById('cond-immobilize').checked,
        stun: document.getElementById('cond-stun').checked,
        bane: document.getElementById('cond-bane').checked,
        muddle: document.getElementById('cond-muddle').checked,
        brittle: document.getElementById('cond-brittle').checked,
        invisible: document.getElementById('cond-invisible').checked,
        strengthen: document.getElementById('cond-strengthen').checked,
        ward: document.getElementById('cond-ward').checked,
        regenerate: document.getElementById('cond-regenerate').checked
      };

      const currentHand = Object.keys(cardState).filter(id => cardState[id] === 'hand');
      const currentDiscard = Object.keys(cardState).filter(id => cardState[id] === 'discard');
      const currentLost = Object.keys(cardState).filter(id => cardState[id] === 'lost');
      const currentActive = Object.keys(cardState).filter(id => cardState[id] === 'active');

      if (currentHand.length === 0 && currentDiscard.length === 0) throw new Error("手牌與棄牌皆空，您已精疲力竭！");

      const mechanicsState = window.getCharacterMechanicsState ? window.getCharacterMechanicsState() : {};

      const currentState = {
        character: {
          hp: { current: currentHp, max: maxHp },
          conditions: currentConditions,
          class_mechanics: mechanicsState,
          cards: { hand: currentHand, discard: currentDiscard, lost: currentLost, active_buffs: currentActive },
          items: []
        },
        battlefield: { elements: elementData, turn_input: { player_directive: finalDirective, strategy_flags: { can_rest_if_needed: canRest } } }
      };

      const client = new GeminiClient(apiKey, selectedModel);
      const prompt = buildPrompt(currentState, cardsDb, config);
      const result = await client.getAiDecision(prompt);
      
      renderAiDecision(result);
    } catch (err) {
      alert("執行發生錯誤：\n" + err.message);
    } finally {
      btnAskAi.disabled = false;
      btnAskAi.innerText = "請 AI 決策";
    }
  });
});
