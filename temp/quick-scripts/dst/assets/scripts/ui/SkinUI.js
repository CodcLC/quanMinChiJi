
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/SkinUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8453a9XdO5IP5zIjb1wltqu', 'SkinUI');
// scripts/ui/SkinUI.js

"use strict";

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    scrollView: cc.ScrollView,
    itemPrefab: cc.Prefab,
    coinUI: cc.Label,
    onceClick: {
      "default": true,
      visible: false
    }
  },
  onLoad: function onLoad() {
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_COIN_SHOW, this.updateCoinShow.bind(this));
    this.initData();
    this.updateCoinShow();
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_COIN_SHOW);
  },
  initData: function initData() {
    var _this = this;

    this.scrollView.content.removeAllChildren();
    var i = 0;
    GameApp.dataManager.jsonData.SkinsData.forEach(function (skinData) {
      _this.scheduleOnce(function () {
        var item = cc.instantiate(_this.itemPrefab);

        _this.scrollView.content.addChild(item);

        item.getComponent("SkinItem").init(skinData);
      }, i += 0.05);
    });
  },
  updateCoinShow: function updateCoinShow() {
    this.coinUI.string = GameApp.dataManager.userData.coinNum;
  },
  coinBtnClick: function coinBtnClick() {
    if (window.wx) {
      GameApp.uiManager.showToast("暂未开放！");
      return;
    }

    if (!this.onceClick) return;
    this.onceClick = false;
    GameApp.audioManager.playEffect('click');
    var self = this;

    if (window.tt) {
      Utils.addVideo("addVideo", function () {
        //看完了
        self.onceClick = true;
        GameApp.uiManager.showToast("获得500金币");
        GameApp.dataManager.addCoin(500);
        self.updateCoinShow();
      }, function (_info) {
        //没看完
        self.onceClick = true;
        _info ? GameApp.uiManager.showToast(_info) : GameApp.uiManager.showToast("未看完视频！");
      });
    } else {
      self.onceClick = true;
      GameApp.uiManager.showToast("非真机,获得500金币");
      GameApp.dataManager.addCoin(500);
      self.updateCoinShow();
    }
  },
  backBtnClick: function backBtnClick() {
    GameApp.audioManager.playEffect('click');
    GameApp.uiManager.showUI('LoginUI');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFNraW5VSS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNjcm9sbFZpZXciLCJTY3JvbGxWaWV3IiwiaXRlbVByZWZhYiIsIlByZWZhYiIsImNvaW5VSSIsIkxhYmVsIiwib25jZUNsaWNrIiwidmlzaWJsZSIsIm9uTG9hZCIsIkdhbWVBcHAiLCJldmVudE1hbmFnZXIiLCJvbiIsIkV2ZW50TmFtZXMiLCJFVkVOVF9VUERBVEVfQ09JTl9TSE9XIiwidXBkYXRlQ29pblNob3ciLCJiaW5kIiwiaW5pdERhdGEiLCJvbkRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lciIsImNvbnRlbnQiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImkiLCJkYXRhTWFuYWdlciIsImpzb25EYXRhIiwiU2tpbnNEYXRhIiwiZm9yRWFjaCIsInNraW5EYXRhIiwic2NoZWR1bGVPbmNlIiwiaXRlbSIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJnZXRDb21wb25lbnQiLCJpbml0Iiwic3RyaW5nIiwidXNlckRhdGEiLCJjb2luTnVtIiwiY29pbkJ0bkNsaWNrIiwid2luZG93Iiwid3giLCJ1aU1hbmFnZXIiLCJzaG93VG9hc3QiLCJhdWRpb01hbmFnZXIiLCJwbGF5RWZmZWN0Iiwic2VsZiIsInR0IiwiYWRkVmlkZW8iLCJhZGRDb2luIiwiX2luZm8iLCJiYWNrQnRuQ2xpY2siLCJzaG93VUkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFyQjs7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSyxVQURQO0FBRVJDLElBQUFBLFVBQVUsRUFBRU4s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QUFDckMsU0FBTCxHQUFpQixJQUFqQjtBQUNBRyxNQUFBQSxPQUFPLENBQUM4QixTQUFSLENBQWtCQyxTQUFsQixDQUE0QixhQUE1QjtBQUNBL0IsTUFBQUEsT0FBTyxDQUFDYSxXQUFSLENBQW9Cd0IsT0FBcEIsQ0FBNEIsR0FBNUI7QUFDQUgsTUFBQUEsSUFBSSxDQUFDN0IsY0FBTDtBQUNIO0FBRUosR0FoRUk7QUFpRUxrQyxFQUFBQSxZQWpFSywwQkFpRVU7QUFDWHZDLElBQUFBLE9BQU8sQ0FBQ2dDLFlBQVIsQ0FBcUJDLFVBQXJCLENBQWdDLE9BQWhDO0FBQ0FqQyxJQUFBQSxPQUFPLENBQUM4QixTQUFSLENBQWtCVSxNQUFsQixDQUF5QixTQUF6QjtBQUNIO0FBcEVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcsXHJcbiAgICAgICAgaXRlbVByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGNvaW5VSTogY2MuTGFiZWwsXHJcbiAgICAgICAgb25jZUNsaWNrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX0NPSU5fU0hPVywgdGhpcy51cGRhdGVDb2luU2hvdy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ29pblNob3coKVxyXG5cclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfQ09JTl9TSE9XKVxyXG4gICAgfSxcclxuICAgIGluaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKClcclxuICAgICAgICB2YXIgaSA9IDBcclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhLlNraW5zRGF0YS5mb3JFYWNoKHNraW5EYXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hZGRDaGlsZChpdGVtKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoXCJTa2luSXRlbVwiKS5pbml0KHNraW5EYXRhKVxyXG4gICAgICAgICAgICB9LCBpICs9IDAuMDUpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlQ29pblNob3coKSB7XHJcbiAgICAgICAgdGhpcy5jb2luVUkuc3RyaW5nID0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5jb2luTnVtXHJcbiAgICB9LFxyXG4gICAgY29pbkJ0bkNsaWNrKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cud3gpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi5pqC5pyq5byA5pS+77yBXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25jZUNsaWNrKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vbmNlQ2xpY2sgPSBmYWxzZVxyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy50dCkge1xyXG4gICAgICAgICAgICBVdGlscy5hZGRWaWRlbyhcImFkZFZpZGVvXCIsIGZ1bmN0aW9uICgpIHsgLy/nnIvlrozkuoZcclxuICAgICAgICAgICAgICAgIHNlbGYub25jZUNsaWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi6I635b6XNTAw6YeR5biBXCIpXHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZENvaW4oNTAwKVxyXG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVDb2luU2hvdygpXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChfaW5mbykgeyAvL+ayoeeci+WujFxyXG4gICAgICAgICAgICAgICAgc2VsZi5vbmNlQ2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBfaW5mbyA/IEdhbWVBcHAudWlNYW5hZ2VyLnNob3dUb2FzdChfaW5mbykgOiBHYW1lQXBwLnVpTWFuYWdlci5zaG93VG9hc3QoXCLmnKrnnIvlrozop4bpopHvvIFcIilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLm9uY2VDbGljayA9IHRydWVcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1RvYXN0KFwi6Z2e55yf5py6LOiOt+W+lzUwMOmHkeW4gVwiKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmFkZENvaW4oNTAwKVxyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNvaW5TaG93KClcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGJhY2tCdG5DbGljaygpIHtcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdjbGljaycpXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1VJKCdMb2dpblVJJylcclxuICAgIH0sXHJcblxyXG59KTtcclxuIl19