
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameApp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd852dPR0w5Ho5tjM6fqnxy9', 'GameApp');
// scripts/GameApp.js

"use strict";

var AudioManager = require('AudioManager');

var UIManager = require('UIManager');

var DataManager = require('DataManager');

var EventManager = require('EventManager');

var GameApp = cc.Class({
  properties: {
    eventManager: EventManager,
    dataManager: DataManager,
    audioManager: AudioManager,
    // httpManager: HttpManager,
    // socketManager: SocketManager,
    uiManager: UIManager
  },
  ctor: function ctor() {
    this.eventManager = new EventManager();
    this.dataManager = new DataManager();
    this.audioManager = new AudioManager(); // this.httpManager = new HttpManager();
    // this.socketManager = new SocketManager();

    this.uiManager = null; // this.protocol = require("Protocol");
  },
  Start: function Start() {// this.protocol.Initialize();
    // cc.debug.setDisplayStats(false);   // 关闭Creator调试的时候左下角的fps面板
    // var manager = cc.director.getCollisionManager();  // 获取碰撞检测类
    // manager.enabled = true   //开启碰撞检测
    // manager.enabledDebugDraw = true //显示碰撞检测区域
  }
});

if (!CC_EDITOR) {
  console.log('初始化GameApp');
  window.GameApp = new GameApp();
  window.GameApp.Start();
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUFwcC5qcyJdLCJuYW1lcyI6WyJBdWRpb01hbmFnZXIiLCJyZXF1aXJlIiwiVUlNYW5hZ2VyIiwiRGF0YU1hbmFnZXIiLCJFdmVudE1hbmFnZXIiLCJHYW1lQXBwIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJldmVudE1hbmFnZXIiLCJkYXRhTWFuYWdlciIsImF1ZGlvTWFuYWdlciIsInVpTWFuYWdlciIsImN0b3IiLCJTdGFydCIsIkNDX0VESVRPUiIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUE1Qjs7QUFDQSxJQUFNQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXpCOztBQUNBLElBQU1FLFdBQVcsR0FBR0YsT0FBTyxDQUFDLGFBQUQsQ0FBM0I7O0FBQ0EsSUFBTUcsWUFBWSxHQUFHSCxPQUFPLENBQUMsY0FBRCxDQUE1Qjs7QUFFQSxJQUFJSSxPQUFPLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ25CQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFTCxZQUROO0FBRVJNLElBQUFBLFdBQVcsRUFBRVAsV0FGTDtBQUdSUSxJQUFBQSxZQUFZLEVBQUVYLFlBSE47QUFJUjtBQUNBO0FBQ0FZLElBQUFBLFNBQVMsRUFBRVY7QUFOSCxHQURPO0FBV25CVyxFQUFBQSxJQVhtQixrQkFXWjtBQUNILFNBQUtKLFlBQUwsR0FBb0IsSUFBSUwsWUFBSixFQUFwQjtBQUNBLFNBQUtNLFdBQUwsR0FBbUIsSUFBSVAsV0FBSixFQUFuQjtBQUNBLFNBQUtRLFlBQUwsR0FBb0IsSUFBSVgsWUFBSixFQUFwQixDQUhHLENBSUg7QUFDQTs7QUFDQSxTQUFLWSxTQUFMLEdBQWlCLElBQWpCLENBTkcsQ0FPSDtBQUNILEdBbkJrQjtBQXFCbkJFLEVBQUFBLEtBckJtQixtQkFxQlgsQ0FDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUEzQmtCLENBQVQsQ0FBZDs7QUE2QkEsSUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBQ1pDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7QUFDQUMsRUFBQUEsTUFBTSxDQUFDYixPQUFQLEdBQWlCLElBQUlBLE9BQUosRUFBakI7QUFDQWEsRUFBQUEsTUFBTSxDQUFDYixPQUFQLENBQWVTLEtBQWY7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQXVkaW9NYW5hZ2VyID0gcmVxdWlyZSgnQXVkaW9NYW5hZ2VyJyk7XHJcbmNvbnN0IFVJTWFuYWdlciA9IHJlcXVpcmUoJ1VJTWFuYWdlcicpO1xyXG5jb25zdCBEYXRhTWFuYWdlciA9IHJlcXVpcmUoJ0RhdGFNYW5hZ2VyJyk7XHJcbmNvbnN0IEV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJ0V2ZW50TWFuYWdlcicpO1xyXG5cclxubGV0IEdhbWVBcHAgPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXHJcbiAgICAgICAgZGF0YU1hbmFnZXI6IERhdGFNYW5hZ2VyLFxyXG4gICAgICAgIGF1ZGlvTWFuYWdlcjogQXVkaW9NYW5hZ2VyLFxyXG4gICAgICAgIC8vIGh0dHBNYW5hZ2VyOiBIdHRwTWFuYWdlcixcclxuICAgICAgICAvLyBzb2NrZXRNYW5hZ2VyOiBTb2NrZXRNYW5hZ2VyLFxyXG4gICAgICAgIHVpTWFuYWdlcjogVUlNYW5hZ2VyLFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY3RvcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyID0gbmV3IERhdGFNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIgPSBuZXcgQXVkaW9NYW5hZ2VyKCk7XHJcbiAgICAgICAgLy8gdGhpcy5odHRwTWFuYWdlciA9IG5ldyBIdHRwTWFuYWdlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuc29ja2V0TWFuYWdlciA9IG5ldyBTb2NrZXRNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy51aU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIC8vIHRoaXMucHJvdG9jb2wgPSByZXF1aXJlKFwiUHJvdG9jb2xcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIFN0YXJ0KCkge1xyXG4gICAgICAgIC8vIHRoaXMucHJvdG9jb2wuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIC8vIGNjLmRlYnVnLnNldERpc3BsYXlTdGF0cyhmYWxzZSk7ICAgLy8g5YWz6ZetQ3JlYXRvcuiwg+ivleeahOaXtuWAmeW3puS4i+inkueahGZwc+mdouadv1xyXG4gICAgICAgIC8vIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpOyAgLy8g6I635Y+W56Kw5pKe5qOA5rWL57G7XHJcbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkID0gdHJ1ZSAgIC8v5byA5ZCv56Kw5pKe5qOA5rWLXHJcbiAgICAgICAgLy8gbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZSAvL+aYvuekuueisOaSnuajgOa1i+WMuuWfn1xyXG4gICAgfSxcclxufSk7XHJcbmlmICghQ0NfRURJVE9SKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5Yid5aeL5YyWR2FtZUFwcCcpO1xyXG4gICAgd2luZG93LkdhbWVBcHAgPSBuZXcgR2FtZUFwcCgpO1xyXG4gICAgd2luZG93LkdhbWVBcHAuU3RhcnQoKTtcclxufVxyXG4iXX0=