"use strict";
cc._RF.push(module, '51150qsnGhKl4PsmdrbeVCq', 'JoystickCommon');
// scripts/game/JoystickCommon.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  JoystickType: cc.Enum({
    FIXED: 0,
    FOLLOW: 1
  }),
  DirectionType: cc.Enum({
    FOUR: 4,
    EIGHT: 8,
    ALL: 0
  }),
  SpeedType: cc.Enum({
    STOP: 0,
    NORMAL: 1,
    FAST: 2
  })
};
exports["default"] = _default;
module.exports = exports["default"];

cc._RF.pop();