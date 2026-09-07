// js/config/geminateCards.js

window.cardsDatabase = [
  {
    "id": "geminate_154",
    "name": "Changeling's Boon",
    "level": "1",
    "form": "melee",
    "initiative": 40,
    "top": {
      "summary": "近戰攻擊 2。近戰攻擊 2。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "【立即結算】得到 祝福 (Bless) (自己)。【強制切換至遠程形態】【此行動流失】\n【持續效果】在你的每個回合結束時，可消耗任意元素來產生 火元素 (Fire) 或 光元素 (Light)。",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": true
    }
  },
  {
    "id": "geminate_156",
    "name": "Drag Down",
    "level": "1",
    "form": "melee",
    "initiative": 34,
    "top": {
      "summary": "近戰攻擊 2，範圍：前方弧狀 3 格 (最多 3 個目標)，附加 定身 (Immobilize)。【強制切換至遠程形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    },
    "bottom": {
      "summary": "移動 4，跳躍 (Jump)。使射程 1 內的 2 名敵人附加 繳械 (Disarm)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_152",
    "name": "Draining Pincers",
    "level": "1",
    "form": "melee",
    "initiative": 72,
    "top": {
      "summary": "近戰攻擊 3，範圍：前方 3 格直線 (最多 3 個目標)。可消耗 光元素 (Light) 獲得 優勢 (Advantage)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "移動 3，跳躍 (Jump)。【強制切換至遠程形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    }
  },
  {
    "id": "geminate_162",
    "name": "Firefly Swarm",
    "level": "1",
    "form": "ranged",
    "initiative": 76,
    "top": {
      "summary": "遠程攻擊 3，範圍：3 格三角形 (最多 3 個目標)。只能以距離 3 或 4 格的敵人為目標。你可以選擇消耗 火元素 (Fire)：獲得 +1 攻擊力。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "移動 4。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_155",
    "name": "Flailing Tendrils",
    "level": "1",
    "form": "melee",
    "initiative": 12,
    "top": {
      "summary": "近戰攻擊 1，附加 混亂 (Muddle)，範圍：圖示 6 格 (Y字型放射，最多 6 個目標)。你可以選擇消耗 光元素 (Light)：獲得 +1 攻擊力。\n使攻擊範圍內的所有盟友附加 混亂 (Muddle)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "使射程 2 內的所有盟友與敵人附加 流血 (Wound)。產生 火元素 (Fire)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_166",
    "name": "Hail of Thorns",
    "level": "1",
    "form": "ranged",
    "initiative": 88,
    "top": {
      "summary": "遠程攻擊 2，附加 混亂 (Muddle)，目標：射程 2 內的所有敵人。使射程 2 內的所有盟友附加 混亂 (Muddle)。產生 冰元素 (Ice)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "移動 3。你可以選擇消耗 光元素 (Light)：使射程 1 內的一名敵人附加 流血 (Wound)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_165",
    "name": "Harvest the Essence",
    "level": "1",
    "form": "ranged",
    "initiative": 60,
    "top": {
      "summary": "【立即結算】獲得 防護 (Ward) (自己)。【強制切換至近戰形態】【此行動流失】\n【持續效果】在你的每個回合結束時，可消耗任意元素來產生 冰元素 (Ice) 或 光元素 (Light)。",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": true
    },
    "bottom": {
      "summary": "移動 2。治療 2 (自己)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_157",
    "name": "Hornbeetle Carapace",
    "level": "1",
    "form": "melee",
    "initiative": 20,
    "top": {
      "summary": "【持續效果】在你的接下來 4 次攻擊中，如果你處於近戰形態，攻擊力 +1；如果你處於遠程形態，攻擊力 +2。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": false
    },
    "bottom": {
      "summary": "移動 1。護盾 (Shield) 1。你可以選擇消耗 冰元素 (Ice)：獲得 +1 護盾。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_153",
    "name": "Hornet Stingers",
    "level": "1",
    "form": "melee",
    "initiative": 23,
    "top": {
      "summary": "近戰攻擊 1，穿透 (Pierce) 3，附加 中毒 (Poison)，範圍：左右1格與前方三角3格共 5 格 (最多 5 個目標)。使攻擊範圍內的所有盟友附加 中毒 (Poison)。【強制切換至遠程形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    },
    "bottom": {
      "summary": "移動 3。【本回合持續】本回合所有以你為目標的攻擊均獲得 劣勢 (Disadvantage)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_151",
    "name": "Icebound Quills",
    "level": "1",
    "form": "melee",
    "initiative": 14,
    "top": {
      "summary": "近戰攻擊 5，穿透 (Pierce) 1。你可以選擇消耗 冰元素 (Ice)：獲得 +1 攻擊力與 +1 穿透 (Pierce)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "【本回合持續】護盾 (Shield) 1。反擊 (Retaliate) 1。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_161",
    "name": "Into My Embrace",
    "level": "1",
    "form": "ranged",
    "initiative": 36,
    "top": {
      "summary": "遠程攻擊 3，只能以距離 3 或 4 格的敵人為目標。拉近 (Pull) 2。【強制切換至近戰形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    },
    "bottom": {
      "summary": "治療 4 (自己)，獲得 再生 (Regenerate)。你可以選擇消耗 火元素 (Fire) 或 光元素 (Light)：獲得 強化 (Strengthen)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_164",
    "name": "Mind Spike",
    "level": "1",
    "form": "ranged",
    "initiative": 18,
    "top": {
      "summary": "使距離 4 或 5 格的 3 個敵人附加 定身 (Immobilize)。被附加 定身 (Immobilize)的所有目標受到 1 點傷害。你可以選擇消耗 光元素 (Light)：傷害 +1 。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "遠程攻擊 2，只能以距離 3 或 4 格的敵人為目標。【強制切換至近戰形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    }
  },
  {
    "id": "geminate_163",
    "name": "Scarab Flight",
    "level": "1",
    "form": "ranged",
    "initiative": 30,
    "top": {
      "summary": "遠程攻擊 2，只能以距離 3 或 4 格的敵人為目標，並將目標推開 (Push) 1格，範圍：3 格直線 (最多 3 個目標)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "【持續效果】在接下來的 4 次受到以你為目標的攻擊傷害時，如果你處於近戰形態，獲得護盾 (Shield) 2；如果你處於遠程形態，獲得護盾 (Shield) 1。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": false
    }
  },
  {
    "id": "geminate_160",
    "name": "Selfless Offering",
    "level": "1",
    "form": "ranged",
    "initiative": 27,
    "top": {
      "summary": "治療 3，目標 1 名盟友，射程 3。你可以選擇消耗 火元素 (Fire)：使目標附加 再生 (Regenerate)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "移動 3。【強制切換至近戰形態】",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": true
    }
  },
  {
    "id": "geminate_159",
    "name": "Feeding Frenzy",
    "level": "X",
    "form": "melee",
    "initiative": 62,
    "top": {
      "summary": "【持續效果】在你的回合中，每當你擊殺一名或多名敵人時，你可以在本回合結束時選擇「切換形態」或「忽略任何強制切換形態效果」。產生 光元素 (Light)。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": false
    },
    "bottom": {
      "summary": "所有相鄰的盟友與敵人受到 1 點傷害。拾取 (Loot) 1。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_158",
    "name": "Reckless Jab",
    "level": "X",
    "form": "melee",
    "initiative": 38,
    "top": {
      "summary": "近戰攻擊 2。如果你沒有 流血 (Wound) 狀態，你可以使自己獲得 流血 (Wound) 狀態，來為此攻擊附加 繳械 (Disarm)。如果你沒有 中毒 (Poison) 狀態，你可以使自己獲得 中毒 (Poison) 狀態，來為此攻擊獲得 +2 攻擊力。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "近戰攻擊 4。你可以選擇消耗 冰元素 (Ice) 或 光元素 (Light)：附加 暈眩 (Stun)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    }
  },
  {
    "id": "geminate_168",
    "name": "Reshape the Guise",
    "level": "X",
    "form": "ranged",
    "initiative": 38,
    "top": {
      "summary": "拾取 (Loot) 1。獲得 再生 (Regenerate) (自己)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "【立即結算】產生 光元素 (Light)。\n【持續效果】在你的短休 (Short Rest) 期間，你可以選擇要流失哪一張棄牌，而不是隨機流失，且你可以選擇切換形態。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "is_transform": false
    }
  },
  {
    "id": "geminate_167",
    "name": "Smoldering Hatred",
    "level": "X",
    "form": "ranged",
    "initiative": 32,
    "top": {
      "summary": "遠程攻擊 2，只能以距離 4 或 5 格的敵人為目標。你可以使自己獲得 混亂 (Muddle) 狀態，來為此攻擊獲得 +2 攻擊力。你可以使自己獲得 詛咒 (Curse) 狀態，來使此攻擊範圍變為相鄰 2 格 (最多 2 個目標)。",
      "is_lost": false,
      "is_persistent": false,
      "is_transform": false
    },
    "bottom": {
      "summary": "使射程 1 內的最多 2 名敵人附加 定身 (Immobilize)。移動 4，跳躍 (Jump)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "is_transform": false
    }
  }
];