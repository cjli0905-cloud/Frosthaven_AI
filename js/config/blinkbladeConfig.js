// js/config/blinkbladeConfig.js

window.characterConfig = {
  "class_id": "blinkblade",
  "class_name": "Blinkblade",
  "hand_limit": 10,


  // 修改：Blinkblade 的時間行者明亮青綠/科技湖水色系
  "theme": {
    "--bg-color": "#0d2633",         /* 提亮後的深青色背景 */
    "--panel-bg": "#15384c",         /* 帶有明顯湖水綠調的面板 */
    "--panel-border": "#285d7d",     /* 科技感的青色邊框 */
    "--primary": "#0e9ec9",          /* 你指定的核心青/亮湖水藍 */
    "--primary-hover": "#25bbf0",    /* 更明亮的青色懸停，強化發光感 */
    "--secondary": "#1f4a63",        /* 偏青色的次要按鈕 */
    "--secondary-hover": "#2d6687"   /* 提亮後的青灰色懸停 */
  },
  
  "ui_modules": {
    "time_tokens": {
      "type": "standalone_counter",
      "name": "時間指示物 (Time Tokens)",
      "default": 1, 
      "max": 5
    },
    "allies_count": {
      "type": "standalone_counter",
      "name": "場上盟友數量 (Allies)",
      "default": 2,
      "max": null 
    }
  },

  "heuristics": `
  【Blinkblade 專屬決策提示】
  1. 快慢模式宣告 (Fast/Slow Protocol)：你必須在每回合決定宣告 快 (Fast) 模式 還是 慢 (Slow) 模式。
     - 若宣告 快 (Fast) 模式：必須消耗 1 個時間指示物 (若當前時間指示物為 0，則絕對不可宣告 Fast)。請讀取卡牌的 fast_summary 並使用 fast 先攻值。
     - 若宣告 慢 (Slow) 模式：不消耗指示物。若當前時間指示物小於 2 個，宣告 Slow 可自動增加 1 個指示物 (若已達 2 個以上則不增加，但仍可合法宣告 Slow)。請讀取卡牌的 slow_summary 並使用 slow 先攻值。
     - 指示物上限區分：透過「宣告 慢 (Slow) 模式」獲取的指示物最多只能累積到 2 個；但透過「卡牌效果」獲取的指示物不受此限，最多可累積至絕對上限 5 個。
  2. 忽略慢效果例外 (Ignore Slow Effect)：若手牌中的特定卡牌效果或「持續效果區 (Active Buffs)」中的常駐能力影響而必須「忽略慢 (Slow) 效果」時，請讀取該卡牌內的 ignore_slow_summary 來評估效益，而非 slow_summary。
  3. 何時選 Fast vs Slow：評估當下手牌的 Fast 與 Slow 能力哪個最契合當前戰局。當 Fast 的爆發效益不高、需要安全拉開距離或囤積時間指示物時，應適度宣告 Slow 模式。
  4. 盟友數量感知：計算 Borrowed Time 等依賴場上盟友數量的卡牌效益時，請參考戰況 JSON 中的 allies_count 數值。
  `,
  
  "special_mechanics_schema": {
    "type": "BLINKBLADE_SPEED",
    "description": "提醒玩家本回合的快慢宣告與指示物變動，由玩家手動結算。",
    "fields": {
      "declared_speed": "快 (Fast) 模式 或 慢 (Slow) 模式",
      "token_change": "token-1 (宣告 快 (Fast) 模式), token+1 (宣告 慢 (Slow) 模式 且總數小於2，或透過卡牌額外獲取), 或 token不變",
      "note": "請極度精簡（限 10 字以內）說明為何選擇此速度模式"
    }
  }
};