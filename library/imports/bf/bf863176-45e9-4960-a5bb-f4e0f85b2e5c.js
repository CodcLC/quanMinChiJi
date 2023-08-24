"use strict";
cc._RF.push(module, 'bf863F2RelJYKW79OD4Wy5c', 'ParatrooperEnemy');
// scripts/game/ParatrooperEnemy.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    _borderGroup: []
  },
  init: function init(_bg) {
    this._borderGroup = _bg;
  },
  update: function update() {
    var newPos = this.node.position;

    if (newPos.x < this._borderGroup[0].x) {
      newPos.x = this._borderGroup[0].x;
    }

    if (newPos.x > this._borderGroup[1].x) {
      newPos.x = this._borderGroup[1].x;
    }

    if (newPos.y > this._borderGroup[0].y) {
      newPos.y = this._borderGroup[0].y;
    }

    if (newPos.y < this._borderGroup[2].y) {
      newPos.y = this._borderGroup[2].y;
    }

    this.node.setPosition(newPos);
  }
});

cc._RF.pop();