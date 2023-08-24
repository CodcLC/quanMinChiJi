
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/data/RouletteData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87c70GyAa9DY7qwmvLhQogw', 'RouletteData');
// scripts/data/RouletteData.js

"use strict";

var RouletteData = {
  ALLROATE: 360,
  //360度
  num: 8,
  // 转盘格子数
  deviation: 5,
  // 偏移量(防止转盘指针正好指向两个格子中间)
  offset: 22.5,
  // 角度的偏移量
  //转盘角度数据
  zhuanpanData: {
    "default": {}
  },
  duration: 3,
  //转动持续时间
  rotateNum: 3,
  //转动圈数(n - 1)
  load: function load() {
    for (var i = 1; i < 9; i++) {
      this.zhuanpanData[i] = {
        start: (this.num - (9 - i)) * this.ALLROATE / this.num - this.offset + this.deviation,
        end: (this.num - (8 - i)) * this.ALLROATE / this.num - this.offset - this.deviation
      };
    }
  }
};
RouletteData.load();
module.exports = RouletteData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZGF0YVxcUm91bGV0dGVEYXRhLmpzIl0sIm5hbWVzIjpbIlJvdWxldHRlRGF0YSIsIkFMTFJPQVRFIiwibnVtIiwiZGV2aWF0aW9uIiwib2Zmc2V0Iiwiemh1YW5wYW5EYXRhIiwiZHVyYXRpb24iLCJyb3RhdGVOdW0iLCJsb2FkIiwiaSIsInN0YXJ0IiwiZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxZQUFZLEdBQUc7QUFDZkMsRUFBQUEsUUFBUSxFQUFFLEdBREs7QUFDRDtBQUNkQyxFQUFBQSxHQUFHLEVBQUUsQ0FGVTtBQUVQO0FBQ1JDLEVBQUFBLFNBQVMsRUFBRSxDQUhJO0FBR0Q7QUFDZEMsRUFBQUEsTUFBTSxFQUFFLElBSk87QUFJRDtBQUNkO0FBQ0FDLEVBQUFBLFlBQVksRUFBRTtBQUNWLGVBQVM7QUFEQyxHQU5DO0FBVWZDLEVBQUFBLFFBQVEsRUFBRSxDQVZLO0FBVUY7QUFDYkMsRUFBQUEsU0FBUyxFQUFFLENBWEk7QUFXRDtBQUVkQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEIsV0FBS0osWUFBTCxDQUFrQkksQ0FBbEIsSUFBdUI7QUFDbkJDLFFBQUFBLEtBQUssRUFBRSxDQUFDLEtBQUtSLEdBQUwsSUFBWSxJQUFJTyxDQUFoQixDQUFELElBQXVCLEtBQUtSLFFBQTVCLEdBQXVDLEtBQUtDLEdBQTVDLEdBQWtELEtBQUtFLE1BQXZELEdBQWdFLEtBQUtELFNBRHpEO0FBQ29FUSxRQUFBQSxHQUFHLEVBQUUsQ0FBQyxLQUFLVCxHQUFMLElBQVksSUFBSU8sQ0FBaEIsQ0FBRCxJQUF1QixLQUFLUixRQUE1QixHQUF1QyxLQUFLQyxHQUE1QyxHQUFrRCxLQUFLRSxNQUF2RCxHQUFnRSxLQUFLRDtBQUQ5SSxPQUF2QjtBQUdIO0FBQ0o7QUFuQmMsQ0FBbkI7QUFxQkFILFlBQVksQ0FBQ1EsSUFBYjtBQUVBSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJiLFlBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUm91bGV0dGVEYXRhID0ge1xyXG4gICAgQUxMUk9BVEU6IDM2MCwvLzM2MOW6plxyXG4gICAgbnVtOiA4LCAvLyDovaznm5jmoLzlrZDmlbBcclxuICAgIGRldmlhdGlvbjogNSwgLy8g5YGP56e76YePKOmYsuatoui9rOebmOaMh+mSiOato+WlveaMh+WQkeS4pOS4quagvOWtkOS4remXtClcclxuICAgIG9mZnNldDogMjIuNSwgLy8g6KeS5bqm55qE5YGP56e76YePXHJcbiAgICAvL+i9rOebmOinkuW6puaVsOaNrlxyXG4gICAgemh1YW5wYW5EYXRhOiB7XHJcbiAgICAgICAgZGVmYXVsdDoge31cclxuICAgIH0sXHJcblxyXG4gICAgZHVyYXRpb246IDMsIC8v6L2s5Yqo5oyB57ut5pe26Ze0XHJcbiAgICByb3RhdGVOdW06IDMsIC8v6L2s5Yqo5ZyI5pWwKG4gLSAxKVxyXG5cclxuICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnpodWFucGFuRGF0YVtpXSA9IHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiAodGhpcy5udW0gLSAoOSAtIGkpKSAqIHRoaXMuQUxMUk9BVEUgLyB0aGlzLm51bSAtIHRoaXMub2Zmc2V0ICsgdGhpcy5kZXZpYXRpb24sIGVuZDogKHRoaXMubnVtIC0gKDggLSBpKSkgKiB0aGlzLkFMTFJPQVRFIC8gdGhpcy5udW0gLSB0aGlzLm9mZnNldCAtIHRoaXMuZGV2aWF0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblJvdWxldHRlRGF0YS5sb2FkKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvdWxldHRlRGF0YTtcclxuIl19