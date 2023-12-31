"use strict";
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