
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/JoystickCommon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcSm95c3RpY2tDb21tb24uanMiXSwibmFtZXMiOlsiSm95c3RpY2tUeXBlIiwiY2MiLCJFbnVtIiwiRklYRUQiLCJGT0xMT1ciLCJEaXJlY3Rpb25UeXBlIiwiRk9VUiIsIkVJR0hUIiwiQUxMIiwiU3BlZWRUeXBlIiwiU1RPUCIsIk5PUk1BTCIsIkZBU1QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBZTtBQUNiQSxFQUFBQSxZQUFZLEVBQUVDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3BCQyxJQUFBQSxLQUFLLEVBQUUsQ0FEYTtBQUVwQkMsSUFBQUEsTUFBTSxFQUFFO0FBRlksR0FBUixDQUREO0FBTWJDLEVBQUFBLGFBQWEsRUFBRUosRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDckJJLElBQUFBLElBQUksRUFBRSxDQURlO0FBRXJCQyxJQUFBQSxLQUFLLEVBQUUsQ0FGYztBQUdyQkMsSUFBQUEsR0FBRyxFQUFFO0FBSGdCLEdBQVIsQ0FORjtBQVliQyxFQUFBQSxTQUFTLEVBQUVSLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ2pCUSxJQUFBQSxJQUFJLEVBQUUsQ0FEVztBQUVqQkMsSUFBQUEsTUFBTSxFQUFFLENBRlM7QUFHakJDLElBQUFBLElBQUksRUFBRTtBQUhXLEdBQVI7QUFaRSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBKb3lzdGlja1R5cGU6IGNjLkVudW0oe1xuICAgIEZJWEVEOiAwLFxuICAgIEZPTExPVzogMSxcbiAgfSksXG5cbiAgRGlyZWN0aW9uVHlwZTogY2MuRW51bSh7XG4gICAgRk9VUjogNCxcbiAgICBFSUdIVDogOCxcbiAgICBBTEw6IDAsXG4gIH0pLFxuXG4gIFNwZWVkVHlwZTogY2MuRW51bSh7XG4gICAgU1RPUDogMCxcbiAgICBOT1JNQUw6IDEsXG4gICAgRkFTVDogMlxuICB9KVxufTtcbiJdfQ==