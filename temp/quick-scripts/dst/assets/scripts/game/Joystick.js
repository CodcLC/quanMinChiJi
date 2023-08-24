
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/Joystick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a085ato4b5AsrP+bIxB9yZe', 'Joystick');
// scripts/game/Joystick.js

"use strict";

var _JoystickCommon = _interopRequireDefault(require("JoystickCommon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

cc.Class({
  "extends": cc.Component,
  properties: {
    dot: {
      "default": null,
      type: cc.Node,
      displayName: '杆子',
      tooltip: '摇杆操纵点'
    },
    ring: {
      "default": null,
      type: cc.Node,
      displayName: '底部圈子',
      tooltip: '摇杆背景节点'
    },
    player: {
      "default": null,
      type: cc.Node,
      displayName: '操控角色',
      tooltip: '操控角色'
    },
    joystickType: {
      "default": _JoystickCommon["default"].JoystickType.FIXED,
      type: _JoystickCommon["default"].JoystickType,
      displayName: '触摸类型',
      tooltip: '定死的还是随触摸位置变化的'
    },
    directionType: {
      "default": _JoystickCommon["default"].DirectionType.ALL,
      type: _JoystickCommon["default"].DirectionType,
      displayName: '方向限制',
      tooltip: '四向，八向，万向'
    },
    _stickPos: {
      "default": null,
      type: cc.Node,
      tooltip: '摇杆所在位置'
    },
    _touchLocation: {
      "default": null,
      type: cc.Node,
      tooltip: '触摸位置'
    }
  },
  onLoad: function onLoad() {
    this._radius = this.ring.width / 2;

    this._initTouchEvent(); // hide joystick when follow


    if (this.joystickType == _JoystickCommon["default"].JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }
  },
  _initTouchEvent: function _initTouchEvent() {
    // set the size of joystick node to control scale
    var self = this;
    self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
    self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
  },
  _touchStartEvent: function _touchStartEvent(event) {
    if (this.player == null || this.player == undefined) return; // this.player = this.player.getComponent('Player') || this.player.getComponent('ParatrooperPlayer')

    var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

    if (this.joystickType === _JoystickCommon["default"].JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition(); // 触摸点与圆圈中心的距离

      var distance = touchPos.sub(this.ring.getPosition()).mag(); // 手指在圆圈内触摸,控杆跟随触摸点

      if (this._radius > distance) {
        this.dot.setPosition(touchPos);
      }
    } else if (this.joystickType === _JoystickCommon["default"].JoystickType.FOLLOW) {
      // 记录摇杆位置，给 touch move 使用
      this._stickPos = touchPos;
      this.node.opacity = 255;
      this._touchLocation = event.getLocation(); // 更改摇杆的位置

      this.ring.setPosition(touchPos);
      this.dot.setPosition(touchPos);
    }
  },
  _touchMoveEvent: function _touchMoveEvent(event) {
    if (this.joystickType === _JoystickCommon["default"].JoystickType.FOLLOW) {
      // 如果 touch start 位置和 touch move 相同，禁止移动
      if (this._touchLocation === event.getLocation()) {
        return false;
      }
    } // 以圆圈为锚点获取触摸坐标


    var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
    var distance = touchPos.mag(); // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置

    var posX = this._stickPos.x + touchPos.x;
    var posY = this._stickPos.y + touchPos.y; // 归一化

    var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();

    if (this._radius > distance) {
      this.dot.setPosition(cc.v2(posX, posY)); // this.player.setSpeedType(JoystickCommon.SpeedType.NORMAL)
    } else {
      // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
      var x = this._stickPos.x + p.x * this._radius;
      var y = this._stickPos.y + p.y * this._radius;
      this.dot.setPosition(cc.v2(x, y)); // this.player.setSpeedType(JoystickCommon.SpeedType.FAST)
    }

    if (this.player == null || this.player == undefined) return;
    this.player.setSpeedType(_JoystickCommon["default"].SpeedType.FAST); // this.player.moveDir = p

    this.player.setDir(p);
  },
  _touchEndEvent: function _touchEndEvent() {
    this.dot.setPosition(this.ring.getPosition());

    if (this.joystickType == _JoystickCommon["default"].JoystickType.FOLLOW) {
      this.node.opacity = 0;
    }

    if (this.player == null || this.player == undefined) return;
    this.player.setSpeedType(_JoystickCommon["default"].SpeedType.STOP);
  } // methods
  // setPlayerSpeed() {
  //   this.player = this.player.getComponent('Player');
  //   this.player.moveDir = p;
  //   this.player.speedType = JoystickCommon.SpeedType.NORMAL;
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcSm95c3RpY2suanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkb3QiLCJ0eXBlIiwiTm9kZSIsImRpc3BsYXlOYW1lIiwidG9vbHRpcCIsInJpbmciLCJwbGF5ZXIiLCJqb3lzdGlja1R5cGUiLCJKb3lzdGlja0NvbW1vbiIsIkpveXN0aWNrVHlwZSIsIkZJWEVEIiwiZGlyZWN0aW9uVHlwZSIsIkRpcmVjdGlvblR5cGUiLCJBTEwiLCJfc3RpY2tQb3MiLCJfdG91Y2hMb2NhdGlvbiIsIm9uTG9hZCIsIl9yYWRpdXMiLCJ3aWR0aCIsIl9pbml0VG91Y2hFdmVudCIsIkZPTExPVyIsIm5vZGUiLCJvcGFjaXR5Iiwic2VsZiIsIm9uIiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJfdG91Y2hTdGFydEV2ZW50IiwiVE9VQ0hfTU9WRSIsIl90b3VjaE1vdmVFdmVudCIsIlRPVUNIX0VORCIsIl90b3VjaEVuZEV2ZW50IiwiVE9VQ0hfQ0FOQ0VMIiwiZXZlbnQiLCJ1bmRlZmluZWQiLCJ0b3VjaFBvcyIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiZ2V0TG9jYXRpb24iLCJnZXRQb3NpdGlvbiIsImRpc3RhbmNlIiwic3ViIiwibWFnIiwic2V0UG9zaXRpb24iLCJwb3NYIiwieCIsInBvc1kiLCJ5IiwicCIsInYyIiwibm9ybWFsaXplIiwic2V0U3BlZWRUeXBlIiwiU3BlZWRUeXBlIiwiRkFTVCIsInNldERpciIsIlNUT1AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFHUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLEdBQUcsRUFBRTtBQUNILGlCQUFTLElBRE47QUFFSEMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNLElBRk47QUFH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QUFDckQsU0FBSzVCLE1BQUwsQ0FBWTRDLFlBQVosQ0FBeUIxQywyQkFBZTJDLFNBQWYsQ0FBeUJDLElBQWxELEVBOUJxQixDQStCckI7O0FBQ0EsU0FBSzlDLE1BQUwsQ0FBWStDLE1BQVosQ0FBbUJOLENBQW5CO0FBQ0QsR0FqSU07QUFtSVBoQixFQUFBQSxjQW5JTyw0QkFtSVU7QUFDZixTQUFLL0IsR0FBTCxDQUFTMEMsV0FBVCxDQUFxQixLQUFLckMsSUFBTCxDQUFVaUMsV0FBVixFQUFyQjs7QUFDQSxRQUFJLEtBQUsvQixZQUFMLElBQXFCQywyQkFBZUMsWUFBZixDQUE0QlcsTUFBckQsRUFBNkQ7QUFDM0QsV0FBS0MsSUFBTCxDQUFVQyxPQUFWLEdBQW9CLENBQXBCO0FBQ0Q7O0FBQ0QsUUFBSSxLQUFLaEIsTUFBTCxJQUFlLElBQWYsSUFBdUIsS0FBS0EsTUFBTCxJQUFlNEIsU0FBMUMsRUFBcUQ7QUFDckQsU0FBSzVCLE1BQUwsQ0FBWTRDLFlBQVosQ0FBeUIxQywyQkFBZTJDLFNBQWYsQ0FBeUJHLElBQWxEO0FBQ0QsR0ExSU0sQ0E0SVA7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWxKTyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSm95c3RpY2tDb21tb24gZnJvbSAnSm95c3RpY2tDb21tb24nXG5cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHtcbiAgICBkb3Q6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgZGlzcGxheU5hbWU6ICfmnYblrZAnLFxuICAgICAgdG9vbHRpcDogJ+aRh+adhuaTjee6teeCuScsXG4gICAgfSxcbiAgICByaW5nOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgIGRpc3BsYXlOYW1lOiAn5bqV6YOo5ZyI5a2QJyxcbiAgICAgIHRvb2x0aXA6ICfmkYfmnYbog4zmma/oioLngrknLFxuICAgIH0sXG5cbiAgICBwbGF5ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgZGlzcGxheU5hbWU6ICfmk43mjqfop5LoibInLFxuICAgICAgdG9vbHRpcDogJ+aTjeaOp+inkuiJsicsXG4gICAgfSxcblxuICAgIGpveXN0aWNrVHlwZToge1xuICAgICAgZGVmYXVsdDogSm95c3RpY2tDb21tb24uSm95c3RpY2tUeXBlLkZJWEVELFxuICAgICAgdHlwZTogSm95c3RpY2tDb21tb24uSm95c3RpY2tUeXBlLFxuICAgICAgZGlzcGxheU5hbWU6ICfop6bmkbjnsbvlnosnLFxuICAgICAgdG9vbHRpcDogJ+Wumuatu+eahOi/mOaYr+maj+inpuaRuOS9jee9ruWPmOWMlueahCcsXG4gICAgfSxcbiAgICBkaXJlY3Rpb25UeXBlOiB7XG4gICAgICBkZWZhdWx0OiBKb3lzdGlja0NvbW1vbi5EaXJlY3Rpb25UeXBlLkFMTCxcbiAgICAgIHR5cGU6IEpveXN0aWNrQ29tbW9uLkRpcmVjdGlvblR5cGUsXG4gICAgICBkaXNwbGF5TmFtZTogJ+aWueWQkemZkOWIticsXG4gICAgICB0b29sdGlwOiAn5Zub5ZCR77yM5YWr5ZCR77yM5LiH5ZCRJyxcbiAgICB9LFxuICAgIF9zdGlja1Bvczoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICB0b29sdGlwOiAn5pGH5p2G5omA5Zyo5L2N572uJyxcbiAgICB9LFxuICAgIF90b3VjaExvY2F0aW9uOiB7XG4gICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgIHRvb2x0aXA6ICfop6bmkbjkvY3nva4nLFxuICAgIH0sXG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuX3JhZGl1cyA9IHRoaXMucmluZy53aWR0aCAvIDI7XG4gICAgdGhpcy5faW5pdFRvdWNoRXZlbnQoKTtcbiAgICAvLyBoaWRlIGpveXN0aWNrIHdoZW4gZm9sbG93XG4gICAgaWYgKHRoaXMuam95c3RpY2tUeXBlID09IEpveXN0aWNrQ29tbW9uLkpveXN0aWNrVHlwZS5GT0xMT1cpIHtcbiAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICB9XG4gIH0sXG5cbiAgX2luaXRUb3VjaEV2ZW50KCkge1xuICAgIC8vIHNldCB0aGUgc2l6ZSBvZiBqb3lzdGljayBub2RlIHRvIGNvbnRyb2wgc2NhbGVcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZWxmLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHNlbGYuX3RvdWNoU3RhcnRFdmVudCwgc2VsZik7XG4gICAgc2VsZi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHNlbGYuX3RvdWNoTW92ZUV2ZW50LCBzZWxmKTtcbiAgICBzZWxmLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBzZWxmLl90b3VjaEVuZEV2ZW50LCBzZWxmKTtcbiAgICBzZWxmLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBzZWxmLl90b3VjaEVuZEV2ZW50LCBzZWxmKTtcbiAgfSxcblxuICBfdG91Y2hTdGFydEV2ZW50KGV2ZW50KSB7XG4gICAgaWYgKHRoaXMucGxheWVyID09IG51bGwgfHwgdGhpcy5wbGF5ZXIgPT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICAvLyB0aGlzLnBsYXllciA9IHRoaXMucGxheWVyLmdldENvbXBvbmVudCgnUGxheWVyJykgfHwgdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQYXJhdHJvb3BlclBsYXllcicpXG5cbiAgICBjb25zdCB0b3VjaFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcblxuICAgIGlmICh0aGlzLmpveXN0aWNrVHlwZSA9PT0gSm95c3RpY2tDb21tb24uSm95c3RpY2tUeXBlLkZJWEVEKSB7XG4gICAgICB0aGlzLl9zdGlja1BvcyA9IHRoaXMucmluZy5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAvLyDop6bmkbjngrnkuI7lnIblnIjkuK3lv4PnmoTot53nprtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdG91Y2hQb3Muc3ViKHRoaXMucmluZy5nZXRQb3NpdGlvbigpKS5tYWcoKTtcblxuICAgICAgLy8g5omL5oyH5Zyo5ZyG5ZyI5YaF6Kem5pG4LOaOp+adhui3n+maj+inpuaRuOeCuVxuICAgICAgaWYgKHRoaXMuX3JhZGl1cyA+IGRpc3RhbmNlKSB7XG4gICAgICAgIHRoaXMuZG90LnNldFBvc2l0aW9uKHRvdWNoUG9zKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodGhpcy5qb3lzdGlja1R5cGUgPT09IEpveXN0aWNrQ29tbW9uLkpveXN0aWNrVHlwZS5GT0xMT1cpIHtcblxuICAgICAgLy8g6K6w5b2V5pGH5p2G5L2N572u77yM57uZIHRvdWNoIG1vdmUg5L2/55SoXG4gICAgICB0aGlzLl9zdGlja1BvcyA9IHRvdWNoUG9zO1xuICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICB0aGlzLl90b3VjaExvY2F0aW9uID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcblxuICAgICAgLy8g5pu05pS55pGH5p2G55qE5L2N572uXG4gICAgICB0aGlzLnJpbmcuc2V0UG9zaXRpb24odG91Y2hQb3MpO1xuICAgICAgdGhpcy5kb3Quc2V0UG9zaXRpb24odG91Y2hQb3MpO1xuICAgIH1cbiAgfSxcblxuICBfdG91Y2hNb3ZlRXZlbnQoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5qb3lzdGlja1R5cGUgPT09IEpveXN0aWNrQ29tbW9uLkpveXN0aWNrVHlwZS5GT0xMT1cpIHtcbiAgICAgIC8vIOWmguaenCB0b3VjaCBzdGFydCDkvY3nva7lkowgdG91Y2ggbW92ZSDnm7jlkIzvvIznpoHmraLnp7vliqhcbiAgICAgIGlmICh0aGlzLl90b3VjaExvY2F0aW9uID09PSBldmVudC5nZXRMb2NhdGlvbigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDku6XlnIblnIjkuLrplJrngrnojrflj5bop6bmkbjlnZDmoIdcbiAgICBjb25zdCB0b3VjaFBvcyA9IHRoaXMucmluZy5jb252ZXJ0VG9Ob2RlU3BhY2VBUihldmVudC5nZXRMb2NhdGlvbigpKTtcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRvdWNoUG9zLm1hZygpO1xuXG4gICAgLy8g55Sx5LqO5pGH5p2G55qEIHBvc3Rpb24g5piv5Lul54i26IqC54K55Li66ZSa54K577yM5omA5Lul5a6a5L2N6KaB5Yqg5LiKIHRvdWNoIHN0YXJ0IOaXtueahOS9jee9rlxuICAgIGNvbnN0IHBvc1ggPSB0aGlzLl9zdGlja1Bvcy54ICsgdG91Y2hQb3MueDtcbiAgICBjb25zdCBwb3NZID0gdGhpcy5fc3RpY2tQb3MueSArIHRvdWNoUG9zLnk7XG5cbiAgICAvLyDlvZLkuIDljJZcbiAgICBjb25zdCBwID0gY2MudjIocG9zWCwgcG9zWSkuc3ViKHRoaXMucmluZy5nZXRQb3NpdGlvbigpKS5ub3JtYWxpemUoKTtcblxuICAgIGlmICh0aGlzLl9yYWRpdXMgPiBkaXN0YW5jZSkge1xuICAgICAgdGhpcy5kb3Quc2V0UG9zaXRpb24oY2MudjIocG9zWCwgcG9zWSkpO1xuICAgICAgLy8gdGhpcy5wbGF5ZXIuc2V0U3BlZWRUeXBlKEpveXN0aWNrQ29tbW9uLlNwZWVkVHlwZS5OT1JNQUwpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOaOp+adhuawuOi/nOS/neaMgeWcqOWciOWGhe+8jOW5tuWcqOWciOWGhei3n+maj+inpuaRuOabtOaWsOinkuW6plxuICAgICAgY29uc3QgeCA9IHRoaXMuX3N0aWNrUG9zLnggKyBwLnggKiB0aGlzLl9yYWRpdXM7XG4gICAgICBjb25zdCB5ID0gdGhpcy5fc3RpY2tQb3MueSArIHAueSAqIHRoaXMuX3JhZGl1cztcbiAgICAgIHRoaXMuZG90LnNldFBvc2l0aW9uKGNjLnYyKHgsIHkpKTtcbiAgICAgIC8vIHRoaXMucGxheWVyLnNldFNwZWVkVHlwZShKb3lzdGlja0NvbW1vbi5TcGVlZFR5cGUuRkFTVClcbiAgICB9XG4gICAgaWYgKHRoaXMucGxheWVyID09IG51bGwgfHwgdGhpcy5wbGF5ZXIgPT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICB0aGlzLnBsYXllci5zZXRTcGVlZFR5cGUoSm95c3RpY2tDb21tb24uU3BlZWRUeXBlLkZBU1QpXG4gICAgLy8gdGhpcy5wbGF5ZXIubW92ZURpciA9IHBcbiAgICB0aGlzLnBsYXllci5zZXREaXIocClcbiAgfSxcblxuICBfdG91Y2hFbmRFdmVudCgpIHtcbiAgICB0aGlzLmRvdC5zZXRQb3NpdGlvbih0aGlzLnJpbmcuZ2V0UG9zaXRpb24oKSk7XG4gICAgaWYgKHRoaXMuam95c3RpY2tUeXBlID09IEpveXN0aWNrQ29tbW9uLkpveXN0aWNrVHlwZS5GT0xMT1cpIHtcbiAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxheWVyID09IG51bGwgfHwgdGhpcy5wbGF5ZXIgPT0gdW5kZWZpbmVkKSByZXR1cm5cbiAgICB0aGlzLnBsYXllci5zZXRTcGVlZFR5cGUoSm95c3RpY2tDb21tb24uU3BlZWRUeXBlLlNUT1ApXG4gIH0sXG5cbiAgLy8gbWV0aG9kc1xuXG4gIC8vIHNldFBsYXllclNwZWVkKCkge1xuICAvLyAgIHRoaXMucGxheWVyID0gdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcbiAgLy8gICB0aGlzLnBsYXllci5tb3ZlRGlyID0gcDtcbiAgLy8gICB0aGlzLnBsYXllci5zcGVlZFR5cGUgPSBKb3lzdGlja0NvbW1vbi5TcGVlZFR5cGUuTk9STUFMO1xuICAvLyB9LFxufSk7XG4iXX0=