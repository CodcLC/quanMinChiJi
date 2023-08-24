"use strict";
cc._RF.push(module, '248fc4jZoZIZJMVVhMKdpCk', 'ParatrooperPlayer');
// scripts/game/ParatrooperPlayer.js

"use strict";

var _JoystickCommon = require("JoystickCommon");

cc.Class({
  "extends": cc.Component,
  properties: {
    // from joystick
    moveDir: {
      "default": cc.v2(1, 0),
      displayName: 'Move Dir',
      tooltip: '移动方向'
    },
    _speedType: {
      "default": _JoystickCommon.SpeedType.STOP,
      displayName: 'Speed Type',
      type: _JoystickCommon.SpeedType,
      tooltip: '速度级别'
    },
    // from self
    _moveSpeed: {
      "default": 0,
      displayName: 'Move Speed',
      tooltip: '移动速度'
    },
    stopSpeed: {
      "default": 0,
      type: cc.Integer,
      tooltip: '停止时速度'
    },
    fastSpeed: {
      "default": 100,
      type: cc.Integer,
      tooltip: '最快速度'
    },
    _borderGroup: []
  },
  onLoad: function onLoad() {},
  onEnable: function onEnable() {},
  onDisable: function onDisable() {},
  onDestroy: function onDestroy() {},
  init: function init(_bg) {
    this._borderGroup = _bg;
  },
  // methods
  move: function move() {
    var newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 60));

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
  },
  setSpeedType: function setSpeedType(_type) {
    if (this._isDie) return;

    if (this._speedType != _type) {
      this._speedType = _type;
    }
  },
  setDir: function setDir(_dir) {
    this.moveDir = _dir;
  },
  update: function update(dt) {
    switch (this._speedType) {
      case _JoystickCommon.SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        break;

      case _JoystickCommon.SpeedType.NORMAL:
        this._moveSpeed = this.fastSpeed;
        break;

      case _JoystickCommon.SpeedType.FAST:
        this._moveSpeed = this.fastSpeed;
        break;

      default:
        break;
    }

    this.move();
  },
  lateUpdate: function lateUpdate(dt) {
    // this.mainC.node.setPosition(this.player.position)
    // this.testC.node.setPosition(this.player.position)
    GameApp.uiManager.mapCamera.node.setPosition(this.node.position); // this.mipmapCamera.node.setPosition(this.node.position)
  }
});

cc._RF.pop();