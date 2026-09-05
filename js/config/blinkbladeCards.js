// js/config/drifterCards.js

window.cardsDatabase = [
  {
    "id": "blinkblade_032",
    "name": "Blurry Jab",
    "level": "1",
    "initiative": { "fast": 20, "slow": 50 },
    "top": {
      "fast_summary": "近戰攻擊 4，附加 流血 (Wound)。",
      "slow_summary": "近戰攻擊 2，附加 混亂 (Muddle)。",
      "ignore_slow_summary":"近戰攻擊 3。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 5。",
      "slow_summary": "移動 2。使一名相鄰敵人受到 1 點傷害。",
      "ignore_slow_summary": "移動 3。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_040",
    "name": "Cascading Reaction",
    "level": "1",
    "initiative": { "fast": 19, "slow": 49 },
    "top": {
      "fast_summary": "近戰攻擊 3，附加 流血 (Wound)。接著 移動 3。接著 近戰攻擊 3，附加 流血 (Wound)。【此行動流失】",
      "slow_summary": "近戰攻擊 3。接著 移動 2。接著 近戰攻擊 3。【此行動流失】",
      "ignore_slow_summary": "近戰攻擊 3。接著 移動 3。接著 近戰攻擊 3。【此行動流失】",
      "is_lost": true,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 4。【本回合持續】所有盟友在執行「從與你相鄰的格子，移動到不與你相鄰的格子」的移動行動時，移動數值 +1。",
      "slow_summary": "移動 3。",
      "ignore_slow_summary": "移動 4。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_039",
    "name": "Drive Recharge",
    "level": "1",
    "initiative": { "fast": 69, "slow": 99 },
    "top": {
      "fast_summary": "獲得 2 個時間指示物 (Time Token)。獲得 防護 (Ward)以及 祝福 (Bless)。【此行動流失】",
      "slow_summary": "獲得 2 個時間指示物 (Time Token)。獲得 防護 (Ward)以及 祝福 (Bless)。【此行動流失】",
      "ignore_slow_summary": "獲得 2 個時間指示物 (Time Token)。獲得 防護 (Ward)以及 祝福 (Bless)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "治療 2 (自己)。",
      "slow_summary": "治療 2 (自己)。獲得 再生 (Regenerate)。",
      "ignore_slow_summary": "治療 2 (自己)。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_038",
    "name": "Hit and Run",
    "level": "1",
    "initiative": { "fast": 41, "slow": 71 },
    "top": {
      "fast_summary": "近戰攻擊 3，定身 (Immobilize)。移動 2。",
      "slow_summary": "近戰攻擊 2，定身 (Immobilize)。",
      "ignore_slow_summary": "近戰攻擊 3，定身 (Immobilize)。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "【持續效果】接下來的 5 次你在 快 (Fast) 模式下的攻擊行動結束時，執行 移動 3。",
      "slow_summary": "【持續效果】接下來的 5 次你在 快 (Fast) 模式下的攻擊行動結束時，執行 移動 3。",
      "ignore_slow_summary": "【持續效果】接下來的 5 次你在 快 (Fast) 模式下的攻擊行動結束時，執行 移動 3。",
      "is_lost": true,
      "is_persistent": true
    }
  },
  {
    "id": "blinkblade_035",
    "name": "Kinetic Transfer",
    "level": "1",
    "initiative": { "fast": 36, "slow": 66 },
    "top": {
      "fast_summary": "移動 2。近戰攻擊 2，推開 (Push) 3。產生 火元素 (Fire)。",
      "slow_summary": "移動 1。遠程攻擊 2，射程 1。產生 冰元素 (Ice)。",
      "ignore_slow_summary": "移動 2。近戰攻擊 2。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 4。所有相鄰的盟友與敵人受到 1 點傷害。你可以選擇消耗 1 個時間指示物 (Time Token)：將所有距離 1 的敵人推開 (Push) 3。",
      "slow_summary": "移動 3。你可以選擇消耗 1 個時間指示物 (Time Token)：將所有距離 1 的敵人推開 (Push) 3。",
      "ignore_slow_summary": "移動 4。你可以選擇消耗 1 個時間指示物 (Time Token)：將所有距離 1 的敵人推開 (Push) 3。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_036",
    "name": "Overdrive",
    "level": "1",
    "initiative": { "fast": 60, "slow": 90 },
    "top": {
      "fast_summary": "【持續效果】只要你處於 慢 (Slow) 模式，獲得護盾 (Shield) 1。只要你處於 快 (Fast) 模式，你所有的移動行動獲得 跳躍 (Jump)。",
      "slow_summary": "【持續效果】只要你處於 慢 (Slow) 模式，獲得護盾 (Shield) 1。只要你處於 快 (Fast) 模式，你所有的移動行動獲得 跳躍 (Jump)。",
      "ignore_slow_summary": "【持續效果】只要你處於 慢 (Slow) 模式，獲得護盾 (Shield) 1。只要你處於 快 (Fast) 模式，你所有的移動行動獲得 跳躍 (Jump)。",
      "is_lost": true,
      "is_persistent": true
    },
    "bottom": {
      "fast_summary": "混亂 (Muddle) 射程 2 內的所有敵人。【本回合持續】你對擁有 混亂 (Muddle) 狀態的敵人進行的所有攻擊，無視其反擊 (Retaliate) 效果。",
      "slow_summary": "混亂 (Muddle) 射程 3 內的所有敵人。",
      "ignore_slow_summary": "混亂 (Muddle) 射程 2 內的所有敵人。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_037",
    "name": "Power Leak",
    "level": "1",
    "initiative": { "fast": 17, "slow": 47 },
    "top": {
      "fast_summary": "近戰攻擊 4。如果你沒有 中毒 (Poison) 狀態，你可以使自己獲得 中毒 (Poison) 狀態，來為此攻擊獲得 目標 (Target) +1。",
      "slow_summary": "近戰攻擊 4。使自己獲得 混亂 (Muddle) 狀態。",
      "ignore_slow_summary": "近戰攻擊 4。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 7。【此行動流失】",
      "slow_summary": "移動 3。治療 2，目標：射程 1 內的所有盟友。【此行動流失】",
      "ignore_slow_summary": "移動 3。【此行動流失】",
      "is_lost": true,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_034",
    "name": "Sap Speed",
    "level": "1",
    "initiative": { "fast": 45, "slow": 75 },
    "top": {
      "fast_summary": "近戰攻擊 3，優勢 (Advantage)，範圍：前方 3 格三角形 (不含自身，最多 2 個目標)。",
      "slow_summary": "近戰攻擊 2，範圍：前方 3 格三角形 (不含自身，最多 2 個目標)。",
      "ignore_slow_summary": "近戰攻擊 2，範圍：前方 3 格三角形 (不含自身，最多 2 個目標)。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "使射程 1 內的 3 名敵人附加 定身 (Immobilize)。",
      "slow_summary": "使射程 1 內的 1 名敵人附加 定身 (Immobilize)。本回合忽略你其他行動的 慢 (Slow) 效果。",
      "ignore_slow_summary": "使射程 1 內的 1 名敵人附加 定身 (Immobilize)。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_041",
    "name": "Temporal Displacement",
    "level": "1",
    "initiative": { "fast": 44, "slow": 74 },
    "top": {
      "fast_summary": "移動 2。拾取 (Loot) 1。",
      "slow_summary": "拾取 (Loot) 1。",
      "ignore_slow_summary": "拾取 (Loot) 1。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "遠程攻擊 3，射程 2。",
      "slow_summary": "近戰攻擊 2。",
      "ignore_slow_summary": "近戰攻擊 3。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_033",
    "name": "Twin Strike",
    "level": "1",
    "initiative": { "fast": 24, "slow": 54 },
    "top": {
      "fast_summary": "近戰攻擊 2。移動 2。近戰攻擊 3。",
      "slow_summary": "近戰攻擊 1。近戰攻擊 2。",
      "ignore_slow_summary": "近戰攻擊 2。近戰攻擊 3。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 3。【本回合持續】你本回合的所有攻擊獲得 穿透 (Pierce) 2。產生 風元素 (Wind)。",
      "slow_summary": "移動 1。治療 2 (自己)。產生 土元素 (Earth)。",
      "ignore_slow_summary": "移動 3。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_044",
    "name": "Borrowed Time",
    "level": "X",
    "initiative": { "fast": 2, "slow": 32 },
    "top": {
      "fast_summary": "【持續效果】接下來的 6 次你在 慢 (Slow) 模式下的行動，忽略所有 慢 (Slow) 效果，並在行動結束時執行：附加 定身 (Immobilize)，射程 3。",
      "slow_summary": "【持續效果】接下來的 6 次你在 慢 (Slow) 模式下的行動，忽略所有 慢 (Slow) 效果，並在行動結束時執行：附加 定身 (Immobilize)，射程 3。",
      "ignore_slow_summary": "【持續效果】接下來的 6 次你在 慢 (Slow) 模式下的行動，忽略所有 慢 (Slow) 效果，並在行動結束時執行：附加 定身 (Immobilize)，射程 3。",
      "is_lost": true,
      "is_persistent": true
    },
    "bottom": {
      "fast_summary": "【本回合持續】所有盟友在本回合的移動數值 -1。移動 X (X為你盟友數量的兩倍)。",
      "slow_summary": "【本回合持續】所有盟友在本回合的移動數值 +1。",
      "ignore_slow_summary": "移動 2。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_042",
    "name": "Experimental Adjustment",
    "level": "X",
    "initiative": { "fast": 12, "slow": 42 },
    "top": {
      "fast_summary": "自己受到傷害 2。射程 2 內的所有敵人受到 1 點傷害。獲得 隱形 (Invisible)。",
      "slow_summary": "自己受到傷害 2。使射程 2 內的所有敵人附加 定身 (Immobilize) 與 混亂 (Muddle)。",
      "ignore_slow_summary": "自己受到傷害 2。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "移動 2。拾取 (Loot) 1。",
      "slow_summary": "移動 4。使自己附加 定身 (Immobilize)。",
      "ignore_slow_summary": "移動 2。",
      "is_lost": false,
      "is_persistent": false
    }
  },
  {
    "id": "blinkblade_043",
    "name": "Sand in the Hourglass",
    "level": "X",
    "initiative": { "fast": 52, "slow": 82 },
    "top": {
      "fast_summary": "附加 流血 (Wound)，射程 1。所有擁有 流血 (Wound) 狀態的敵人受到 2 點傷害。你可以消耗 光元素 來產生 暗元素，或消耗 暗元素 來產生 光元素。",
      "slow_summary": "所有擁有 流血 (Wound) 狀態的敵人受到 2 點傷害。你可以消耗 光元素 來產生 暗元素，或消耗 暗元素 來產生 光元素。",
      "ignore_slow_summary": "所有擁有 流血 (Wound) 狀態的敵人受到 2 點傷害。你可以消耗 光元素 來產生 暗元素，或消耗 暗元素 來產生 光元素。",
      "is_lost": false,
      "is_persistent": false
    },
    "bottom": {
      "fast_summary": "治療 2，目標：射程 1 內的所有盟友與自己。你可以選擇消耗 1 個時間指示物 (Time Token)：在你的回合結束時，從手牌中打出一張牌，並立刻執行其上半部或下半部行動。",
      "slow_summary": "治療 2，目標：射程 1 內的所有盟友與自己。",
      "ignore_slow_summary": "治療 2，目標：射程 1 內的所有盟友與自己。",
      "is_lost": false,
      "is_persistent": false
    }
  }
];