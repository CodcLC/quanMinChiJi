"use strict";
cc._RF.push(module, '53d079b9kpBmqvST+YSa7z0', 'DropBox');
// scripts/game/DropBox.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    boxIndex: 1231231,
    _showToPlayer: false,
    progressBar: cc.ProgressBar,
    _beginOpen: false,
    _hadOpen: false,
    _openTimer: 0,
    _belongTagsArr: [],
    other: null
  },
  onLoad: function onLoad() {
    this._belongTagsArr = [];
  },
  init: function init(_index) {
    // console.log(_index)
    this.boxIndex = _index;
  },
  update: function update(dt) {
    if (this._hadOpen) return;

    if (this._beginOpen) {
      this._openTimer += dt;

      if (this._openTimer >= 5) {
        if (this._hadOpen) return;
        this._hadOpen = true;
        GameApp.eventManager.emit(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.boxIndex.toString());
        if (this._belongTagsArr.length == 0) return;

        if (this._belongTagsArr.indexOf(Tags.player) != -1) {
          GameApp.eventManager.emit(EventNames.EVENT_SHOW_BOXITEM);
        } else {
          // console.log("触发了")
          this.other && this.other.node.getComponent("Enemy").enemyEquipBoxItem();
        }
      }
    } else {
      this._openTimer -= dt;

      if (this._openTimer < 0) {
        this._openTimer = 0;
      }
    }

    this.progressBar.progress = this._openTimer / 5;
  },
  onBeginContact: function onBeginContact(contact, self, other) {
    if (other.tag == Tags.player || other.tag >= Tags.enemy) {
      this._beginOpen = true;

      if (this._belongTagsArr.indexOf(other.tag) == -1) {
        this._belongTagsArr.push(other.tag);
      }
    }
  },
  onEndContact: function onEndContact(contact, self, other) {
    if (other.tag == Tags.player || other.tag >= Tags.enemy) {
      if (this._openTimer >= 5) {
        this.other = other;
        if (this._hadOpen) return;
        this._hadOpen = true;
        GameApp.eventManager.emit(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.boxIndex.toString());
        if (this._belongTagsArr.length == 0) return;

        if (this._belongTagsArr.indexOf(Tags.player) != -1) {
          GameApp.eventManager.emit(EventNames.EVENT_SHOW_BOXITEM);
        } else {
          // console.log("触发了")
          other.node.getComponent("Enemy").enemyEquipBoxItem();
        }

        return;
      }

      if (this._belongTagsArr.indexOf(other.tag) != -1) {
        Tools.removeArray(this._belongTagsArr, other.tag);
      }

      if (this._belongTagsArr.length == 0) {
        this._beginOpen = false;
      }
    }
  }
});

cc._RF.pop();