
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ParatrooperPlayer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcUGFyYXRyb29wZXJQbGF5ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtb3ZlRGlyIiwidjIiLCJkaXNwbGF5TmFtZSIsInRvb2x0aXAiLCJfc3BlZWRUeXBlIiwiU3BlZWRUeXBlIiwiU1RPUCIsInR5cGUiLCJfbW92ZVNwZWVkIiwic3RvcFNwZWVkIiwiSW50ZWdlciIsImZhc3RTcGVlZCIsIl9ib3JkZXJHcm91cCIsIm9uTG9hZCIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwib25EZXN0cm95IiwiaW5pdCIsIl9iZyIsIm1vdmUiLCJuZXdQb3MiLCJub2RlIiwicG9zaXRpb24iLCJhZGQiLCJtdWwiLCJ4IiwieSIsInNldFBvc2l0aW9uIiwic2V0U3BlZWRUeXBlIiwiX3R5cGUiLCJfaXNEaWUiLCJzZXREaXIiLCJfZGlyIiwidXBkYXRlIiwiZHQiLCJOT1JNQUwiLCJGQVNUIiwibGF0ZVVwZGF0ZSIsIkdhbWVBcHAiLCJ1aU1hbmFnZXIiLCJtYXBDYW1lcmEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBRUxDLEVBQUFBLFVBQVUsRUFBRTtBQUVSO0FBQ0FDLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTSixFQUFFLENBQUNLLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQURKO0FBRUxDLE1BQUFBLFdBQVcsRUFBRSxVQUZSO0FBR0xDLE1BQUFBLE9BQU8sRUFBRTtBQUhKLEtBSEQ7QUFRUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVNDLDBCQUFVQyxJQURYO0FBRVJKLE1BQUFBLFdBQVcsRUFBRSxZQUZMO0FBR1JLLE1BQUFBLElBQUksRUFBRUYseUJBSEU7QUFJUkYsTUFBQUEsT0FBTyxFQUFFO0FBSkQsS0FSSjtBQWVSO0FB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QUtHLFNBQXZCO0FBQ0E7O0FBQ0osV0FBS04sMEJBQVUrQixJQUFmO0FBQ0ksYUFBSzVCLFVBQUwsR0FBa0IsS0FBS0csU0FBdkI7QUFDQTs7QUFDSjtBQUNJO0FBWFI7O0FBYUEsU0FBS1EsSUFBTDtBQUVILEdBNUZJO0FBNkZMa0IsRUFBQUEsVUE3Rkssc0JBNkZNSCxFQTdGTixFQTZGVTtBQUNYO0FBQ0E7QUFDQUksSUFBQUEsT0FBTyxDQUFDQyxTQUFSLENBQWtCQyxTQUFsQixDQUE0Qm5CLElBQTVCLENBQWlDTSxXQUFqQyxDQUE2QyxLQUFLTixJQUFMLENBQVVDLFFBQXZELEVBSFcsQ0FJWDtBQUNIO0FBbEdJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwZWVkVHlwZSB9IGZyb20gJ0pveXN0aWNrQ29tbW9uJ1xyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICAvLyBmcm9tIGpveXN0aWNrXHJcbiAgICAgICAgbW92ZURpcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigxLCAwKSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNb3ZlIERpcicsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfnp7vliqjmlrnlkJEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3NwZWVkVHlwZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBTcGVlZFR5cGUuU1RPUCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTcGVlZCBUeXBlJyxcclxuICAgICAgICAgICAgdHlwZTogU3BlZWRUeXBlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiAn6YCf5bqm57qn5YirJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGZyb20gc2VsZlxyXG4gICAgICAgIF9tb3ZlU3BlZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNb3ZlIFNwZWVkJyxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+enu+WKqOmAn+W6pidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdG9wU3BlZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+WBnOatouaXtumAn+W6pidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhc3RTcGVlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAxMDAsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICfmnIDlv6vpgJ/luqYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfYm9yZGVyR3JvdXA6IFtdXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgfSxcclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIG9uRGVzdHJveSgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdChfYmcpIHtcclxuICAgICAgICB0aGlzLl9ib3JkZXJHcm91cCA9IF9iZ1xyXG4gICAgfSxcclxuICAgIC8vIG1ldGhvZHNcclxuICAgIG1vdmUoKSB7XHJcbiAgICAgICAgbGV0IG5ld1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbi5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLl9tb3ZlU3BlZWQgLyA2MCkpO1xyXG4gICAgICAgIGlmIChuZXdQb3MueCA8IHRoaXMuX2JvcmRlckdyb3VwWzBdLngpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnggPSB0aGlzLl9ib3JkZXJHcm91cFswXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueCA+IHRoaXMuX2JvcmRlckdyb3VwWzFdLngpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnggPSB0aGlzLl9ib3JkZXJHcm91cFsxXS54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueSA+IHRoaXMuX2JvcmRlckdyb3VwWzBdLnkpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnkgPSB0aGlzLl9ib3JkZXJHcm91cFswXS55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQb3MueSA8IHRoaXMuX2JvcmRlckdyb3VwWzJdLnkpIHtcclxuICAgICAgICAgICAgbmV3UG9zLnkgPSB0aGlzLl9ib3JkZXJHcm91cFsyXS55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xyXG4gICAgfSxcclxuICAgIHNldFNwZWVkVHlwZShfdHlwZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0RpZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9zcGVlZFR5cGUgIT0gX3R5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BlZWRUeXBlID0gX3R5cGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0RGlyKF9kaXIpIHtcclxuICAgICAgICB0aGlzLm1vdmVEaXIgPSBfZGlyXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zcGVlZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTcGVlZFR5cGUuU1RPUDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZCA9IHRoaXMuc3RvcFNwZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZCA9IHRoaXMuZmFzdFNwZWVkXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTcGVlZFR5cGUuRkFTVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVTcGVlZCA9IHRoaXMuZmFzdFNwZWVkXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmUoKTtcclxuXHJcbiAgICB9LFxyXG4gICAgbGF0ZVVwZGF0ZShkdCkge1xyXG4gICAgICAgIC8vIHRoaXMubWFpbkMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnBsYXllci5wb3NpdGlvbilcclxuICAgICAgICAvLyB0aGlzLnRlc3RDLm5vZGUuc2V0UG9zaXRpb24odGhpcy5wbGF5ZXIucG9zaXRpb24pXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIubWFwQ2FtZXJhLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKVxyXG4gICAgICAgIC8vIHRoaXMubWlwbWFwQ2FtZXJhLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG4iXX0=