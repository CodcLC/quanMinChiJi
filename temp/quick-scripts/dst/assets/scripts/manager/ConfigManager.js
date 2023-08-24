
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/manager/ConfigManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bd72n2n1JOz4R303K0b7TD', 'ConfigManager');
// scripts/manager/ConfigManager.js

"use strict";

var paths = {
  "Skin": 'data/skins.json'
};
var ConfigManager = {
  allConfigs: {},
  loadConfig: function loadConfig(_name, _call) {
    var path = paths[_name];
    cc.loader.loadRes(path, function (err, res) {
      if (err) {
        console.log("加载出错了");
        console.error(err.message || err);
        return;
      }

      var tempData = res;
      this.allConfigs[_name] = tempData;
      _call && _call(); // console.log(JSON.parse(JSON.stringify(res)));
    }.bind(this));
  },
  loadAllConfig: function loadAllConfig(_call) {
    for (var key in paths) {
      if (paths.hasOwnProperty(key)) {
        // const element = paths[key];
        this.loadConfig(key, _call);
      }
    }
  },
  getAllConfig: function getAllConfig() {
    return this.allConfigs;
  }
};
module.exports = ConfigManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFuYWdlclxcQ29uZmlnTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJwYXRocyIsIkNvbmZpZ01hbmFnZXIiLCJhbGxDb25maWdzIiwibG9hZENvbmZpZyIsIl9uYW1lIiwiX2NhbGwiLCJwYXRoIiwiY2MiLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwibWVzc2FnZSIsInRlbXBEYXRhIiwiYmluZCIsImxvYWRBbGxDb25maWciLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImdldEFsbENvbmZpZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHO0FBQ1YsVUFBUTtBQURFLENBQWQ7QUFJQSxJQUFJQyxhQUFhLEdBQUc7QUFDaEJDLEVBQUFBLFVBQVUsRUFBRSxFQURJO0FBRWhCQyxFQUFBQSxVQUFVLEVBQUUsb0JBQVVDLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBRWhDLFFBQUlDLElBQUksR0FBR04sS0FBSyxDQUFDSSxLQUFELENBQWhCO0FBQ0FHLElBQUFBLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQyxPQUFWLENBQWtCSCxJQUFsQixFQUF3QixVQUFVSSxHQUFWLEVBQWVDLEdBQWYsRUFBb0I7QUFDeEMsVUFBSUQsR0FBSixFQUFTO0FBQ0xFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDQUQsUUFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNKLEdBQUcsQ0FBQ0ssT0FBSixJQUFlTCxHQUE3QjtBQUNBO0FBQ0g7O0FBQ0QsVUFBSU0sUUFBUSxHQUFHTCxHQUFmO0FBRUEsV0FBS1QsVUFBTCxDQUFnQkUsS0FBaEIsSUFBeUJZLFFBQXpCO0FBQ0FYLE1BQUFBLEtBQUssSUFBSUEsS0FBSyxFQUFkLENBVHdDLENBVXhDO0FBQ0gsS0FYdUIsQ0FXdEJZLElBWHNCLENBV2pCLElBWGlCLENBQXhCO0FBWUgsR0FqQmU7QUFrQmhCQyxFQUFBQSxhQUFhLEVBQUUsdUJBQVViLEtBQVYsRUFBaUI7QUFDNUIsU0FBSyxJQUFNYyxHQUFYLElBQWtCbkIsS0FBbEIsRUFBeUI7QUFDckIsVUFBSUEsS0FBSyxDQUFDb0IsY0FBTixDQUFxQkQsR0FBckIsQ0FBSixFQUErQjtBQUMzQjtBQUNBLGFBQUtoQixVQUFMLENBQWdCZ0IsR0FBaEIsRUFBcUJkLEtBQXJCO0FBQ0g7QUFDSjtBQUNKLEdBekJlO0FBMEJoQmdCLEVBQUFBLFlBQVksRUFBRSx3QkFBWTtBQUN0QixXQUFPLEtBQUtuQixVQUFaO0FBQ0g7QUE1QmUsQ0FBcEI7QUErQkFvQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QixhQUFqQiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aHMgPSB7XHJcbiAgICBcIlNraW5cIjogJ2RhdGEvc2tpbnMuanNvbicsXHJcbn07XHJcblxyXG52YXIgQ29uZmlnTWFuYWdlciA9IHtcclxuICAgIGFsbENvbmZpZ3M6IHt9LFxyXG4gICAgbG9hZENvbmZpZzogZnVuY3Rpb24gKF9uYW1lLCBfY2FsbCkge1xyXG5cclxuICAgICAgICB2YXIgcGF0aCA9IHBhdGhzW19uYW1lXTtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3lh7rplJnkuoZcIilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGVtcERhdGEgPSByZXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFsbENvbmZpZ3NbX25hbWVdID0gdGVtcERhdGE7XHJcbiAgICAgICAgICAgIF9jYWxsICYmIF9jYWxsKClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyZXMpKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcbiAgICBsb2FkQWxsQ29uZmlnOiBmdW5jdGlvbiAoX2NhbGwpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXRocykge1xyXG4gICAgICAgICAgICBpZiAocGF0aHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc3QgZWxlbWVudCA9IHBhdGhzW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb25maWcoa2V5LCBfY2FsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0QWxsQ29uZmlnOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsQ29uZmlncztcclxuICAgIH0sXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IENvbmZpZ01hbmFnZXI7Il19