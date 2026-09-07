// js/config/geminateConfig.js

window.characterConfig = {
  "class_id": "geminate",
  "class_name": "Geminate",
  "hand_limit": 14,

  // 新增：Geminate 的蟲巢意志深暗洋紅色系
  "theme": {
    "--bg-color": "#17040a",         /* 極深的暗洋紅/黑背景 */
    "--panel-bg": "#260b14",         /* 帶有血色調的暗色面板 */
    "--panel-border": "#6e1435",     /* 指定的核心洋紅/勃根地邊框 */
    "--primary": "#d81b60",          /* 保持標誌性的高對比亮洋紅 */
    "--primary-hover": "#f0246d",    /* 更亮的粉紅色懸停 */
    "--secondary": "#4a0d23",        /* 深邃的暗洋紅次要按鈕 */
    "--secondary-hover": "#6e1435"   /* 懸停時呈現指定的洋紅質感 */
  },
  
  "ui_modules": {
    "current_form": {
      "type": "state_toggle",
      "name": "當前形態 (Current Form)",
      "options": [
        { "value": "melee", "label": "近戰形態 (Melee)" },
        { "value": "ranged", "label": "遠程形態 (Ranged)" }
      ],
      "default": "melee"
    }
  },

  "heuristics": `
  【Geminate 專屬決策提示】
  1. 嚴格形態鎖定 (Strict Form Lock)：你【絕對只能】從與玩家「當前形態」(參考 class_mechanics.current_form) 相符的卡牌池中挑選卡牌。若當前為 melee，嚴禁挑選 form: ranged 的卡牌，反之亦然。
  2. 形態平衡權重 (Form Balance Weight)：
     2-1. 請隨時監控近戰與遠程手牌的剩餘數量差異，盡量平衡兩種形態的卡片數量。
     2-2. 若兩者數量差異過大，請【提高】帶有 "is_transform": true 卡牌的使用優先級，以引導玩家在回合結束時切換形態。
     2-3. 若當前形態這回合出完2張牌後，下回合只剩1張或0張，而另一個形態還有2張以上的牌，請【大幅提高】帶有 "is_transform": true 卡牌的使用優先級，以避免提早短休。
     2-4. 以上3點的戰術建議，若當下戰況（如保命、達成玩家的緊急擊殺方針）有更極端的單一形態需求，可暫緩切換。
  3. 預告切換 (Switch Warning)：若你本回合挑選的兩張牌中，包含 "is_transform": true 的行動，請務必在 reasoning 中提醒玩家「回合結束後將強制切換為另一形態」，並確保該切換不會導致下回合無牌可用的死局。
  4. 雙形態持久戰 (Longevity)：避免過早流失 (is_lost: true) 太多單一形態的卡牌，這會導致該形態的手牌池枯竭，進而引發提早精疲力竭 (Exhaustion)。
  `,
  
  "special_mechanics_schema": {
    "type": "GEMINATE_FORM_SWITCH",
    "description": "提醒玩家本回合的形態狀態，以及回合結束後是否發生形態轉換。",
    "fields": {
      "starting_form": "Melee 或 Ranged (對應回合開始時的形態)",
      "ending_form": "Melee 或 Ranged (若使用了 is_transform: true 的卡牌，則會變成另一形態)",
      "note": "簡述維持或切換形態的戰術權衡"
    }
  }
};