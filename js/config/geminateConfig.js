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

  // 戰術標籤
  "quick_tags": [
    "戰前整備", 
    "快速移動", 
    "全力攻擊", 
    "輔助隊友", 
    "控制敵人", 
    "戰後休整"
  ],
  
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
  1. 強制休整防線 (Forced Rest Protocol)：【最高優先級】請計算上方【當前手牌庫 (Hand)】中，其 form 屬性與玩家「當前形態 (current_form)」完全相符的卡牌數量。若相符的卡牌數量小於 2 張 (0 張或 1 張)，你【絕對不可】輸出 PLAY_CARDS，必須強制建議 SHORT_REST 或 LONG_REST 來挽救精疲力竭的死局。
  2. 嚴格形態鎖定 (Strict Form Lock)：你【絕對只能】從與玩家「當前形態」(參考 class_mechanics.current_form) 相符的卡牌池中挑選卡牌。若當前為 melee，嚴禁挑選 form: ranged 的卡牌，反之亦然。
  3. 形態平衡權重 (Form Balance Weight)：
     3-1. 請隨時監控近戰與遠程手牌的剩餘數量差異，盡量平衡兩種形態的卡片數量。
     3-2. 若兩者數量差異過大，請【提高】帶有 "is_transform": true 卡牌的使用優先級，以引導玩家在回合結束時切換形態。
     3-3. 若當前形態這回合出完2張牌後，下回合只剩1張或0張，而另一個形態還有2張以上的牌，請【大幅提高】帶有 "is_transform": true 卡牌的使用優先級，以避免提早短休。
     3-4. 以上3點的戰術建議，若當下戰況（如保命、達成玩家的緊急擊殺方針）有更極端的單一形態需求，可暫緩切換。
  4. 預告切換 (Switch Warning)：若你本回合挑選的兩張牌中，包含 "is_transform": true 的行動，請務必在 reasoning 中提醒玩家「回合結束後將強制切換為另一形態」，並確保該切換不會導致下回合無牌可用的死局。
  5. 雙形態持久戰 (Longevity)：避免過早流失 (is_lost: true) 太多單一形態的卡牌，這會導致該形態的手牌池枯竭，進而引發提早精疲力竭 (Exhaustion)。
  `,
  
  "special_mechanics_schema": {
    "type": "GEMINATE_FORM_SWITCH",
    "description": "提醒玩家本回合的形態狀態，以及回合結束後是否發生形態轉換。",
    "fields": {
      "starting_form": "原始型態：Melee 或 Ranged (對應回合開始時的形態)",
      "ending_form": "結束型態：Melee 或 Ranged (若使用了 is_transform: true 的卡牌，則會變成另一形態)",
      "note": "請極度精簡（限 10 字以內）簡述維持或切換形態的戰術權衡"
    }
  }
};