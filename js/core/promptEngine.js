/**
 * js/core/promptEngine.js
 * 根據傳入的 gameState、卡牌資料庫與角色設定檔，組合出給 LLM 的完整 System Prompt。
 * 採用動態提示詞組裝 (Dynamic Prompt Assembly)，只注入當前觸發的異常狀態戰術。
 */

const conditionTactics = {
  disarm: "- 繳械 (Disarm)：角色本回合無法執行任何攻擊 (Attack)。請謹慎評估卡牌效益：有時寧願打出一張功能性差的攻擊牌並使其攻擊失效，藉此將關鍵好牌保留到後續回合使用。若評估後決定打出包含攻擊的卡牌，請務必在 reasoning 中提醒玩家該攻擊將會失效。",
  immobilize: "- 定身 (Immobilize)：角色本回合無法執行任何移動 (Move)。請【降低】依賴移動才能發揮作用的行動優先級；若被迫打出帶有移動的卡牌，請提醒玩家移動將失效。",
  bane: "- 禍殃 (Bane)：角色即將受到致命傷害。請將自補 (Heal) 或解除狀態的行動排入【極高優先級】。",
  wound: "- 流血 (Wound)：每回合開始會扣除 1 滴血。請隨時注意剩餘血量，但【不需要】急迫自補，有時優先將敵人擊殺以減少後續傷害來源更為重要。",
  stun: "- 暈眩 (Stun)：本回合無法執行任何有效行動。請優先挑選【兩張最不重要、無戰略價值的卡牌】作為消耗，避免浪費關鍵好牌；若手牌或血量見底，才考慮建議宣告長休 (LONG_REST)。請務必在 reasoning 中說明暈眩導致本回合行動無效。",
  muddle: "- 混亂 (Muddle)：所有攻擊皆處於劣勢 (Disadvantage)。由於已經處於劣勢，請【完全忽略】遠程攻擊打相鄰敵人會劣勢的限制，可自由進行貼臉射擊。",
  poison: "- 中毒 (Poison)：受到的治療將無效（僅能解毒），且受擊傷害必定 +1。若血量危急，請優先建議自補以解除中毒；若血量健康，則維持正常戰鬥方針。",
  brittle: "- 脆弱 (Brittle)：下一次受擊傷害變為兩倍。角色處於極度危險狀態。請將拉開距離、護盾 (Shield) 或隱形等防禦走位排入【最高優先級】，絕對避免近身肉搏。",
  invisible: "- 隱形 (Invisible)：角色無法被敵人指定為目標。在確保沒有禍殃 (Bane) 等致命狀態或緊急自補需求的前提下，可忽略常規的防禦需求，大膽進行高風險的侵略性行動。請特別注意，隱形狀態會在行動結束時消失，若要進行貼身肉搏，請務必挑選【先攻值較高 (數字大、行動慢)】的卡牌，確保在怪物行動完畢後才現身。",
  strengthen: "- 強化 (Strengthen)：攻擊擁有優勢 (Advantage)。請【提高】攻擊輸出的優先級，優先挑選高基礎傷害或多目標的強力攻擊牌，將此增益轉化為實質傷害。",
  ward: "- 防護 (Ward)：可將下一次受到的傷害減半。角色抗傷容錯率極佳，請鼓勵進行需要貼身肉搏或高回報的侵略性戰術，無需過度退縮。",
  regenerate: "- 再生 (Regenerate)：每回合自動回血，但受到傷害便會解除。請盡量配合長距離移動拉開距離，或優先疊加護盾 (Shield) 以避免受擊，藉此維持長時間的治療效益。"
};

function buildPrompt(gameState, cardsDatabase, characterConfig) {
  
  // 輔助函數：將卡牌 ID 轉換為詳細資訊
  function getCardDetails(cardIds) {
    if (!cardIds) return [];
    return cardIds.map(cardId => {
      const cardData = cardsDatabase.find(c => c.id === cardId);
      return cardData ? {
        name: cardData.name,
        initiative: cardData.initiative,
        top: cardData.top,
        bottom: cardData.bottom
      } : null;
    }).filter(c => c !== null);
  }

  // 1. 抽取並轉換【四大分區】的卡牌資訊！
  const availableHand = getCardDetails(gameState.character.cards.hand);
  const discardPile = getCardDetails(gameState.character.cards.discard);
  const lostPile = getCardDetails(gameState.character.cards.lost);
  const activeBuffs = getCardDetails(gameState.character.cards.active_buffs);

  const readyItems = gameState.character.items
    .filter(item => item.state === "ready")
    .map(item => item.id);

  const canRest = gameState.battlefield.turn_input.strategy_flags.can_rest_if_needed;

  // 2. 動態組裝異常狀態規則 (Dynamic Prompt Assembly)
  const activeConditionRules = [];
  for (const [cond, rule] of Object.entries(conditionTactics)) {
    if (gameState.character.conditions[cond]) {
      activeConditionRules.push(rule);
    }
  }
  const activeConditionsText = activeConditionRules.length > 0 
    ? `\n  6. 當前異常狀態權衡 (【極度重要】目前處於以下狀態)：\n     ${activeConditionRules.join("\n     ")}` 
    : "";

  // 3. 【全職業通用決策提示】
  const genericHeuristics = `
  【通用戰術與底層規則】
  1. 出牌規則 (Play Cards Rules)：
     - 一次出兩張不同的牌，一張使用上半部，一張使用下半部。嚴禁使用同一張牌的上半部跟下半部。
     - 打出的兩張牌中，選擇其中一張牌的先攻值。先攻值決定了這回合的行動優先順序，數字越小有越高的機會優先行動。
  2. 基本行動 (Basic Actions)：如果卡牌上半部或下半部的行動不適合使用時，要記得還有基本行動可以選擇：卡牌的上半部可以當成攻擊2、卡牌的下半部可以當成移動2。
  3. 流失卡控管 (Lost Cards)：
     - 【單次爆發流失卡】(is_lost: true 且 is_persistent: false)：前期 (手牌 >= 8) 嚴禁使用，除非能帶來決定性戰略優勢。
     - 【持續效果 Buff 卡】(is_lost: true 且 is_persistent: true)：【強烈鼓勵】在遊戲前期優先打出 1~2 張來建立核心 Buff！不要因為它們會流失就捨不得用，這是角色發揮戰力的關鍵。
  4. 遠程攻擊劣勢 (Ranged Disadvantage)：【極度重要】除非沒有其他選擇，否則請盡力避免使用遠程攻擊 (Ranged Attack) 打擊相鄰 (距離 1) 的敵人，因為這會導致劣勢。若玩家方針指定目標距離為 1，請優先挑選近戰攻擊 (Melee Attack)，或者先安排移動 (Move) 拉開距離後再進行遠程攻擊。 (唯一例外：處於混亂狀態時，可忽略此規則，因為無論如何都處劣勢。)
  5. 主動隱形戰術 (Invisibility Timing)：如果卡牌的行動能為自己附加隱形 (Invisible) 狀態，代表行動後將處於絕對安全。此時請優先搭配【先攻值極低 (數字小、行動快)】的卡牌，藉此搶先在怪物攻擊前行動並進入隱形，完美規避傷害。${activeConditionsText}
  6. 持續效果連動 (Active Buffs Synergy)：【極度重要】請務必檢查上方的【當前持續效果區 (Active Buffs)】陣列。這裡列出的卡牌代表你當下正享有的常駐增益（無論該職業是否有實體指示物/刻度）。請精準以"is_persistent": true來判斷是該卡牌的上半部還是下半部為常駐增益的確切內容。決策時，請務必將這些常駐增益的加成一併納入考量，極大化你的戰術優勢。
  `;

  // 4. 動態注入角色專屬決策提示與 JSON 輸出格式
  const classHeuristics = characterConfig.heuristics;
  const specialMechanicsSchemaText = JSON.stringify(characterConfig.special_mechanics_schema, null, 4);

  // 5. 組合最終 Prompt
  const prompt = `
你是一個專業的 Frosthaven 桌遊 AI 助理。你的任務是根據當下的戰局狀態與玩家指示，從玩家的手牌中挑選出最適合的【兩張牌】，並指定哪張提供先攻、哪張執行上半部、哪張執行下半部。

【當前戰況 JSON】
玩家血量: ${gameState.character.hp.current} / ${gameState.character.hp.max}
異常狀態: ${JSON.stringify(gameState.character.conditions)}
當前可用手牌詳細資訊: ${JSON.stringify(availableHand, null, 2)}
當前棄牌堆 (Discard): ${JSON.stringify(discardPile, null, 2)}
當前流失區 (Lost): ${JSON.stringify(lostPile, null, 2)}
當前持續效果區 (Active Buffs): ${JSON.stringify(activeBuffs, null, 2)}
當前可用裝備: ${JSON.stringify(readyItems)}
場上元素狀態: ${JSON.stringify(gameState.battlefield.elements)}

【玩家方針與戰略目標】
玩家自然語言方針: "${gameState.battlefield.turn_input.player_directive}"
允許系統建議休整: ${canRest}

${genericHeuristics}

${classHeuristics}

【決策邏輯指示】
1. 仔細閱讀玩家的自然語言方針，這是這回合最高的戰略目標。
2. 【距離與位移判定】：從玩家的方針中，分析出所需的「移動距離」與「攻擊目標距離/數量」。確保你挑選的卡牌組合（包含裝備補足）能盡量達成這些條件。
3. 若允許休整 (${canRest}) 為 false，無論如何都必須生出兩張牌。若為 true，則進行以下判斷：
   - 若你判斷手牌或血量見底，你可以直接建議 LONG_REST。
   - 若手牌不足以達成玩家的方針需求(或效率不佳)，而棄牌區有更好的選擇，你可以直接建議 SHORT_REST。
4. 【資料絕對保真】：你挑選的卡牌與 action_summary，必須「100% 完全符合」上方【當前手牌庫 (Hand)】提供的 JSON 內容。
5. 【嚴禁幻覺】：絕對禁止張冠李戴、混淆不同卡牌的能力，或捏造不存在的效果。如果卡牌上沒有寫移動，你就絕對不能把它當作移動卡來搭配！

【強制輸出格式】
你【必須】只輸出一個合法的 JSON 物件，不要包含任何 markdown 語法 (如 \`\`\`json)，不要有任何額外的文字。
JSON 結構必須嚴格符合以下格式：
{
  "action_type": "PLAY_CARDS" | "LONG_REST" | "SHORT_REST",
  "initiative_card": "卡牌名稱",
  "initiative_value": 數字,
  "top_action": {
    "card_name": "卡牌名稱",
    "action_summary": "執行的動作簡述",
    "is_lost": boolean
  },
  "bottom_action": {
    "card_name": "卡牌名稱",
    "action_summary": "執行的動作簡述",
    "is_lost": boolean
  },
  "special_mechanics": [
    ${specialMechanicsSchemaText}
  ],
  "item_suggestions": ["建議文字"],
  "reasoning": "1~2句自然語言解釋為什麼這樣選牌"
}
`;

  return prompt;
}