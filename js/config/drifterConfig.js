// js/config/drifterConfig.js
window.characterConfig = {
  "class_id": "drifter",
  "class_name": "Drifter",
  "hand_limit": 12,

  // Drifter 專屬色系 (灰褐/咖啡大地色系)
  "theme": {
    "--bg-color": "#1c1a18",         /* 極深的大地黑褐背景 */
    "--panel-bg": "#2b2725",         /* 沉穩的暗灰咖啡面板 */
    "--panel-border": "#4a433d",     /* 粗曠的皮革泥褐邊框 */
    "--primary": "#8d6e63",          /* Drifter 標誌性的暖棕咖啡主色 */
    "--primary-hover": "#6d4c41",    /* 較深實的暖咖啡色懸停 */
    "--secondary": "#3e3833",        /* 深灰褐次要按鈕 */
    "--secondary-hover": "#544c45"   /* 略亮的泥灰色懸停 */
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

  
  // 提供給 drifterUI.js 使用的靜態設定
  "trackers_mapping": {
    "drifter_001": { "name": "近戰攻擊 +2", "max": 6 },
    "drifter_002": { "name": "移動 +2", "max": 6 },
    "drifter_003": { "name": "遠程射程+1 / 攻擊+1", "max": 6 },
    "drifter_004": { "name": "治療 +2", "max": 6 },
    "drifter_005": { "name": "反擊 2, 射程 2", "max": 6 },
    "drifter_006": { "name": "護盾 1", "max": 6 }
  },

  "heuristics": `
  【Drifter 專屬決策提示】
  1. 刻度維護 (Tracker Management)：檢查當前活躍的 trackers。如果有任何 tracker 的 current <= 2，請【提高】帶有 'has_tracker_effect: true' 卡牌的回拉動作優先級。但請務必依據當下戰況進行綜合評估。若決定使用帶有條件的回拉效果（如擊殺敵人），請在 reasoning 中提醒玩家風險。
  2. 無效刻度防堵 (Empty Tracker Constraint)：若當前戰況完全沒有活躍的 trackers，則視任何卡牌的「回拉/推進」效果為無效。此時若仍為了攻擊或移動數值而挑選該卡牌，請確保 special_mechanics 陣列完全留空。
  `,
  
  "special_mechanics_schema": {
    "type": "TRACKER",
    "description": "用於回拉或推進持續效果刻度。",
    "fields": {
      "target": "要回拉或推進的 Tracker 名稱",
      "change": "+1 或 -1",
      "note": "操作原因說明"
    }
  }
};