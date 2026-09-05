// js/config/drifterCards.js

window.cardsDatabase = [
  {
    "id": "drifter_001",
    "name": "Crushing Weight",
    "level": "1",
    "initiative": 71,
    "top": {
      "summary": "【持續效果】接下來的 6 次近戰攻擊，每次攻擊數值 +2。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "治療 2，射程 2。將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    }
  },
  {
    "id": "drifter_002",
    "name": "Sustained Momentum",
    "level": "1",
    "initiative": 76,
    "top": {
      "summary": "近戰攻擊 2。將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    },
    "bottom": {
      "summary": "【持續效果】接下來的 6 次移動行動，每次移動數值 +2。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_003",
    "name": "Precision Aim",
    "level": "1",
    "initiative": 66,
    "top": {
      "summary": "【持續效果】你所有的遠程攻擊獲得射程 +1。接下來的 6 次遠程攻擊，每次攻擊數值 +1。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 2。將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    }
  },
  {
    "id": "drifter_004",
    "name": "Continuous Health",
    "level": "1",
    "initiative": 61,
    "top": {
      "summary": "遠程攻擊 2，射程 2。將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    },
    "bottom": {
      "summary": "【持續效果】接下來的 6 次治療，每次治療數值 +2。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_005",
    "name": "Relentless",
    "level": "1",
    "initiative": 89,
    "top": {
      "summary": "將你兩個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    },
    "bottom": {
      "summary": "【持續效果】接下來的 6 次由射程 2 內的敵人對你進行的攻擊，獲得反擊 (Retaliate) 2，射程 2。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_006",
    "name": "Unbreakable",
    "level": "1",
    "initiative": 90,
    "top": {
      "summary": "將你兩個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    },
    "bottom": {
      "summary": "【持續效果】接下來的 6 次受到以你為目標的攻擊傷害時，獲得護盾 (Shield) 1。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_007",
    "name": "Vile Assault",
    "level": "1",
    "initiative": 27,
    "top": {
      "summary": "近戰攻擊 2，附加 中毒 (Poison)。近戰攻擊 2，附加 流血 (Wound)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 2。治療 2 (自己)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_008",
    "name": "Draining Arrows",
    "level": "1",
    "initiative": 23,
    "top": {
      "summary": "遠程攻擊 1，目標 3，射程 2，附加 混亂 (Muddle)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 3。如果你恰好與 1 名敵人相鄰，將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    }
  },
  {
    "id": "drifter_009",
    "name": "Prudent Preparation",
    "level": "1",
    "initiative": 14,
    "top": {
      "summary": "護盾 (Shield) 1，反擊 (Retaliate) 1。【本回合持續】",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "治療 2，射程 3",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_010",
    "name": "Deadly Shot",
    "level": "1",
    "initiative": 32,
    "top": {
      "summary": "遠程攻擊 1，射程 4，附加 中毒 (Poison)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 4",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_011",
    "name": "Bloodletting",
    "level": "1",
    "initiative": 65,
    "top": {
      "summary": "近戰攻擊 3。若以此攻擊擊殺敵人，將你的一個持續效果刻度回拉 1 格。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": true
    },
    "bottom": {
      "summary": "近戰攻擊 1，附加 流血 (Wound)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_012",
    "name": "Violent Inheritance",
    "level": "1",
    "initiative": 70,
    "top": {
      "summary": "近戰攻擊 1，拾取 (Loot) 1。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 4。遠程攻擊 3，射程 3。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_013",
    "name": "Fortitude",
    "level": "X",
    "initiative": 31,
    "top": {
      "summary": "近戰攻擊 3，穿透 (Pierce) 2。在應用任何其他加成前，你可以將你的一個持續效果刻度「推進（向前移）」 1 格，來為此攻擊獲得 +2 射程。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "【持續效果】每當你擊殺一名敵人時，將你的一個持續效果刻度回拉 1 格。",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": true
    }
  },
  {
    "id": "drifter_014",
    "name": "No Remorse",
    "level": "X",
    "initiative": 20,
    "top": {
      "summary": "治療 3，射程 3。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 3。近戰攻擊 3。移動 2。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_015",
    "name": "Destructive Fury",
    "level": "X",
    "initiative": 19,
    "top": {
      "summary": "近戰攻擊 3，範圍：前方 6 格三角形 (不含自身，最多 5 個目標)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "遠程攻擊 3，射程 2，範圍：3 格三角形 (最多 3 個目標)。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_016",
    "name": "Shockwave",
    "level": "2",
    "initiative": 17,
    "top": {
      "summary": "【持續效果】接下來的 6 次對「與任何其他敵人相鄰」的敵人進行的近戰攻擊時，使與目標相鄰的一名敵人受到 2 點傷害。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "移動 3。護盾 (Shield) 1。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_017",
    "name": "Ever Forward",
    "level": "2",
    "initiative": 67,
    "top": {
      "summary": "遠程攻擊 2，射程 3。獲得 再生 (Regenerate) (自己)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "治療 1，射程 3，目標 3。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_018",
    "name": "Fierce Barrage",
    "level": "3",
    "initiative": 32,
    "top": {
      "summary": "近戰攻擊 2，範圍：前方 3 格三角形 (不含自身，最多 2 個目標)。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "【持續效果】接下來的 6 次遠程攻擊行動 (Abilities)，攻擊目標(target) +1。【此行動流失】",
      "is_lost": true,
      "is_persistent": true,
      "has_tracker_effect": false
    }
  },
  {
    "id": "drifter_019",
    "name": "Dual Bow",
    "level": "3",
    "initiative": 26,
    "top": {
      "summary": "遠程攻擊 2，目標 2，射程 3。",
      "is_lost": false,
      "is_persistent": false,
      "has_tracker_effect": false
    },
    "bottom": {
      "summary": "將你兩個持續效果刻度回拉 4 格。【此行動流失】",
      "is_lost": true,
      "is_persistent": false,
      "has_tracker_effect": true
    }
  }
];