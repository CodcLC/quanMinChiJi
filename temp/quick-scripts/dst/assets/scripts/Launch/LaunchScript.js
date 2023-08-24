
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Launch/LaunchScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3bba0wL+YtCjqothlcKDRgB', 'LaunchScript');
// scripts/Launch/LaunchScript.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    Player: {
      "default": null,
      type: sp.Skeleton,
      displayName: '玩家动画'
    }
  },
  start: function start() {
    this.loadSkeletonDataResources();
  },
  loadSkeletonDataResources: function loadSkeletonDataResources() {// cc.loader.loadResDir("spine", sp.SkeletonData, function (err, assets) {
    //     if (!err) {
    //         cc.SkeletonData = assets;
    //         //console.log('加载动画文件成功:', cc.SkeletonData);
    //         let data = this.getSkeletonDataByName('player');
    //         console.log('玩家动画:', data);
    //         //this.Player.skeletonData = this.PlayerSkeletonData;
    //         this.Player.skeletonData = data;
    //         this.Player.setSkin("cook");
    //         this.Player.setAnimation(0, "await", true);
    //     }
    // }.bind(this));
  },
  getSkeletonDataByName: function getSkeletonDataByName(data) {
    for (var i = 0; i < cc.SkeletonData.length; i++) {
      var skeletonData = cc.SkeletonData[i];
      var name = skeletonData.name;

      if (name === data) {
        return skeletonData;
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTGF1bmNoXFxMYXVuY2hTY3JpcHQuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJQbGF5ZXIiLCJ0eXBlIiwic3AiLCJTa2VsZXRvbiIsImRpc3BsYXlOYW1lIiwic3RhcnQiLCJsb2FkU2tlbGV0b25EYXRhUmVzb3VyY2VzIiwiZ2V0U2tlbGV0b25EYXRhQnlOYW1lIiwiZGF0YSIsImkiLCJTa2VsZXRvbkRhdGEiLCJsZW5ndGgiLCJza2VsZXRvbkRhdGEiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsSUFETDtBQUVKQyxNQUFBQSxJQUFJLEVBQUVDLEVBQUUsQ0FBQ0MsUUFGTDtBQUdKQyxNQUFBQSxXQUFXLEVBQUU7QUFIVDtBQURBLEdBSFA7QUFXTEMsRUFBQUEsS0FYSyxtQkFXRztBQUNKLFNBQUtDLHlCQUFMO0FBQ0gsR0FiSTtBQWVMQSxFQUFBQSx5QkFmSyx1Q0FldUIsQ0FDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0E1Qkk7QUE4QkxDLEVBQUFBLHFCQTlCSyxpQ0E4QmlCQyxJQTlCakIsRUE4QnVCO0FBQ3hCLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsRUFBRSxDQUFDYyxZQUFILENBQWdCQyxNQUFwQyxFQUE0Q0YsQ0FBQyxFQUE3QyxFQUFpRDtBQUM3QyxVQUFJRyxZQUFZLEdBQUdoQixFQUFFLENBQUNjLFlBQUgsQ0FBZ0JELENBQWhCLENBQW5CO0FBQ0EsVUFBSUksSUFBSSxHQUFHRCxZQUFZLENBQUNDLElBQXhCOztBQUNBLFVBQUlBLElBQUksS0FBS0wsSUFBYixFQUFtQjtBQUNmLGVBQU9JLFlBQVA7QUFDSDtBQUNKO0FBQ0o7QUF0Q0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgUGxheWVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogc3AuU2tlbGV0b24sXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ+eOqeWutuWKqOeUuydcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5sb2FkU2tlbGV0b25EYXRhUmVzb3VyY2VzKCk7XG4gICAgfSxcblxuICAgIGxvYWRTa2VsZXRvbkRhdGFSZXNvdXJjZXMoKSB7XG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwic3BpbmVcIiwgc3AuU2tlbGV0b25EYXRhLCBmdW5jdGlvbiAoZXJyLCBhc3NldHMpIHtcbiAgICAgICAgLy8gICAgIGlmICghZXJyKSB7XG4gICAgICAgIC8vICAgICAgICAgY2MuU2tlbGV0b25EYXRhID0gYXNzZXRzO1xuICAgICAgICAvLyAgICAgICAgIC8vY29uc29sZS5sb2coJ+WKoOi9veWKqOeUu+aWh+S7tuaIkOWKnzonLCBjYy5Ta2VsZXRvbkRhdGEpO1xuICAgICAgICAvLyAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRTa2VsZXRvbkRhdGFCeU5hbWUoJ3BsYXllcicpO1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCfnjqnlrrbliqjnlLs6JywgZGF0YSk7XG4gICAgICAgIC8vICAgICAgICAgLy90aGlzLlBsYXllci5za2VsZXRvbkRhdGEgPSB0aGlzLlBsYXllclNrZWxldG9uRGF0YTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLlBsYXllci5za2VsZXRvbkRhdGEgPSBkYXRhO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuUGxheWVyLnNldFNraW4oXCJjb29rXCIpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuUGxheWVyLnNldEFuaW1hdGlvbigwLCBcImF3YWl0XCIsIHRydWUpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBnZXRTa2VsZXRvbkRhdGFCeU5hbWUoZGF0YSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNjLlNrZWxldG9uRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNrZWxldG9uRGF0YSA9IGNjLlNrZWxldG9uRGF0YVtpXTtcbiAgICAgICAgICAgIGxldCBuYW1lID0gc2tlbGV0b25EYXRhLm5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBza2VsZXRvbkRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==