
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/manager/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a5d0r/JcRKyJq63bPbc7t9', 'UIManager');
// scripts/manager/UIManager.js

"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var PREFAB_PATH = require('PrefabPath');

var JSON_PATH = require('JsonPath');

window.conMag = window.conMag || require("ConfigManager");
cc.Class({
  "extends": cc.Component,
  properties: {
    gameRoot: cc.Node,
    uiRoot: cc.Node,
    popupRoot: cc.Node,
    toastRoot: cc.Node,
    toastPrefab: cc.Prefab,
    loadingMask: cc.Node,
    loadingProgress: cc.ProgressBar,
    splashUI: cc.Node,
    _Prefabs: {
      "default": {}
    },
    _Jsons: {
      "default": {}
    },
    mapCamera: cc.Camera,
    mipmapCamera: cc.Camera,
    normalSkinData: sp.SkeletonData,
    advanceSkinDataGroup: [sp.SkeletonData],
    boxSkinDataGroup: [sp.SkeletonData],
    commonAtlas: cc.SpriteAtlas,
    gunSkinDataGroup: [sp.SkeletonData]
  },
  onLoad: function onLoad() {
    if (GameApp.uiManager !== null) {
      return this.node.destroy();
    }

    GameApp.uiManager = this;
    cc.game.addPersistRootNode(this.node);
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    cc.director.getCollisionManager().enabledDebugDraw = true;
    var manager = cc.director.getPhysicsManager();
    manager.enabled = true;
    manager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    var frameSize = cc.view.getFrameSize();
    var canvas = cc.game.canvas;
    canvas.width = frameSize.width * window.devicePixelRatio;
    canvas.height = frameSize.height * window.devicePixelRatio;
    this.setLoadingMaskVisible(false);
    this.loadingProgress.progress = 0; //开始加载;

    this.startLoading(); // window.conMag.loadAllConfig(() => {
    //     let all = window.conMag.getAllConfig()
    //     // console.log("这是读取的数据")
    //     // console.log(all["Config"])
    //     var skinJson = all["Skin"]
    //     console.log(skinJson.json['skins'])
    // })
  },
  startLoading: function startLoading() {
    console.log('开始加载');
    this.loadingProgress.node.active = true;
    this.loadAll(function (completedCount, totalCount) {
      var per = completedCount / totalCount;

      if (per && !isNaN(per)) {
        this.loadingProgress.progress = per;
      }
    }.bind(this), function () {
      this.loadingProgress.node.active = false;
      this.splashUI.active = false; //读取用户信息;

      var userData = cc.sys.localStorage.getItem("EatChicken_UserData");

      if (userData == null || userData == undefined || userData == '') {} else {
        GameApp.dataManager.userData = JSON.parse(userData); //console.log(GameApp.dataManager.userData);
      }

      this.showUI("LoginUI");
    }.bind(this));
  },

  /**
   *
   * @param cbProgress        加载中的回调
   * @param cbComplete        加载完成的回调
   */
  loadAll: function loadAll(cbProgress, cbComplete) {
    var paths = [];
    var ii = 0; //加载预制体配置路径文件;

    for (var name in PREFAB_PATH) {
      paths.push(PREFAB_PATH[name]);
      ii++;
    }

    var prefabCount = ii;
    var jj = 0; //加载JSON配置文件;

    for (var name2 in JSON_PATH) {
      paths.push(JSON_PATH[name2]);
      jj++;
    }

    var jsonCount = jj;
    cc.loader.loadResArray(paths, function (completedCount, totalCount) {
      // console.log(completedCount + '/' + totalCount)
      cbProgress(completedCount, totalCount);
    }, function (err, prefabs) {
      var names = Object.keys(PREFAB_PATH); //for (let i in prefabs) {

      for (var i = 0; i < prefabCount; i++) {
        this._Prefabs[names[i]] = prefabs[i];
      }

      var names2 = Object.keys(JSON_PATH); //for (let i in prefabs) {

      for (var j = 0; j < jsonCount; j++) {
        this._Jsons[names2[j]] = prefabs[prefabCount + j].json[names2[j]];
        GameApp.dataManager.jsonData[names2[j]] = this._Jsons[names2[j]];
      } // console.log(GameApp.dataManager.jsonData)


      cbComplete(); // let paths2 = ['data/skins.json'];
      // cc.loader.loadResArray(paths2, function (completedCount, totalCount) {
      //     cbProgress(completedCount, totalCount);
      // }, function (err, jsons) {
      //     // console.log(jsons[0].json.skins)
      //     GameApp.dataManager.skinsData = jsons[0].json.skins
      //     console.log(GameApp.dataManager.skinsData)
      //     cbComplete();
      // }.bind(this))
    }.bind(this));
  },
  load: function load(name, cb) {
    cc.loader.loadRes(PREFAB_PATH[name], function (err, prefab) {
      if (err) {
        cc.error(err.message || err);
        return;
      }

      this._Prefabs[name] = prefab;
      cb && cb(name);
    }.bind(this));
  },
  showGameObject: function showGameObject(name, cb, parentNode) {
    if (!this._Prefabs[name]) {
      this.load(name, function () {
        this.showGameObject(name, cb);
      }.bind(this));
      return;
    }

    var node = cc.instantiate(this._Prefabs[name]);
    parentNode && parentNode.addChild(node);
    cb && cb(node);
  },
  showGame: function showGame(name, cb) {
    //未加载
    if (this._curGameName == name) {
      console.log("---showGame.repeat----"); //允许刷新Game
      // return;
    }

    if (!this._Prefabs[name]) {
      this.load(name, function () {
        this.showGame(name, cb);
      }.bind(this));
      return;
    }

    var node = cc.instantiate(this._Prefabs[name]);
    this.gameRoot.addChild(node);
    this._curGameName = name;
    cb && cb(node);
  },
  showUI: function showUI(name, cb) {
    console.log('showUI'); //未加载

    if (this._curName == name) {
      console.log("---showUI.repeat----"); //不允许刷新UI

      return;
    }

    if (!this._Prefabs[name]) {
      this.load(name, function () {
        this.showUI(name, cb);
      }.bind(this));
      return;
    } //已加载 
    // this.uiRoot.destroyAllChildren();
    // this.clearPopups()


    this.clearGames(); //特殊处理的UI
    // for (let i = this.popupRoot.children.length - 1; i >= 0; i--) {
    //     if (this.popupRoot.children[i]._tag !== 10086) {
    //         this.popupRoot.children[i].destroy();
    //     }
    // }

    this.uiRoot.children.forEach(function (eachUI) {
      eachUI.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {
        eachUI.destroy();
      })));
    });
    this.clearPopups();
    var node = cc.instantiate(this._Prefabs[name]);
    node.opacity = 0;
    this.uiRoot.addChild(node);
    node.runAction(cc.fadeIn(0.3));
    this._curName = name;
    cb && cb(node);
  },
  getUI: function getUI(name) {
    return this.uiRoot.getChildByName(name);
  },
  popUI: function popUI() {
    var uis = this.uiRoot.children;

    if (uis.length > 0) {
      uis[uis.length - 1].destroy();
    }
  },
  isInMapSight: function isInMapSight(_target) {
    var cameraWidth = this.mapCamera.node.width / 0.9;
    var cameraHeight = this.mapCamera.node.height / 0.9;
    var thePos = this.mapCamera.getWorldToScreenPoint(_target.convertToWorldSpaceAR(cc.v2(0, 0)));

    if (thePos.x < 0 || thePos.x > cameraWidth || thePos.y < 0 || thePos.y > cameraHeight) {
      return false;
    }

    return true;
  },
  // showTop(cb) {
  //     var name = "TopUI"
  //     //未加载
  //     if (!this._Prefabs[name]) {
  //         this.load(name, function () {
  //             this.showTop(name, cb);
  //         }.bind(this));
  //         return;
  //     }
  //     //已加载
  //     if (this.topRoot.childrenCount == 0) {
  //         let node = cc.instantiate(this._Prefabs[name]);
  //         this.topRoot.addChild(node);
  //     } else {
  //         this.topRoot.children[0].active = true
  //     }
  //     cb && cb(node);
  // },
  // getTop() {
  //     return this.topRoot.children[0];
  // },
  // hideTop() {
  //     (this.topRoot.childrenCount > 0) && (this.topRoot.children[0].active = false);
  // },
  showPopup: function showPopup(name, cb, clean) {
    if (clean === void 0) {
      clean = true;
    }

    if (this._curPopupName == name) {
      console.log("---showPopup.repeat----"); //允许刷新popup
      // return;
    } //未加载


    if (!this._Prefabs[name]) {
      this.load(name, function () {
        this.showPopup(name, cb);
      }.bind(this));
      return;
    }

    if (clean) {
      this.clearPopups();
    } //已加载


    var node = cc.instantiate(this._Prefabs[name]); // node.opacity = 0

    node.children[0].scaleX = 0;
    node.children[0].scaleY = 0;
    this.popupRoot.addChild(node);
    node.children[0].runAction(cc.scaleTo(0.5, 1).easing(cc.easeBounceOut(2)));
    this._curPopupName = name;
    cb && cb(node);
  },
  getPopup: function getPopup(name) {
    return this.popupRoot.getChildByName(name);
  },
  popPopup: function popPopup() {
    var popups = this.popupRoot.children;

    if (popups.length > 0) {
      popups[popups.length - 1].destroy();
    }
  },
  closePopup: function closePopup(name) {
    var _this = this;

    var _loop = function _loop() {
      var node = _step.value;

      if (node.name === name) {
        node.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {
          _this._curPopupName = "";
          node.active = false;
          node.destroy();
        })));
        return "break";
      }
    };

    for (var _iterator = _createForOfIteratorHelperLoose(this.popupRoot.children), _step; !(_step = _iterator()).done;) {
      var _ret = _loop();

      if (_ret === "break") break;
    }
  },
  clearPopups: function clearPopups() {
    console.log('clearPopups');

    var _loop2 = function _loop2() {
      var node = _step2.value;
      node.runAction(cc.sequence(cc.fadeOut(0.1), cc.callFunc(function () {
        node.destroy();
      })));
    };

    for (var _iterator2 = _createForOfIteratorHelperLoose(this.popupRoot.children), _step2; !(_step2 = _iterator2()).done;) {
      _loop2();
    }

    this._curPopupName = ""; // this.popupRoot.destroyAllChildren();
  },
  getGame: function getGame(name) {
    return this.gameRoot.getChildByName(name);
  },
  clearGames: function clearGames() {
    this.gameRoot.destroyAllChildren();
    this._curGameName = "";
  },
  showToast: function showToast(s, callback, num) {
    if (!this.toastPrefab) return;
    var toast = cc.instantiate(this.toastPrefab);

    if (this.toastRoot.childrenCount > 0) {
      for (var i = this.toastRoot.childrenCount - 1; i >= 0; i--) {
        var moveUp = cc.moveBy(0.1, cc.v2(0, toast.height));
        this.toastRoot.children[i].runAction(moveUp);
      }
    }

    this.toastRoot.addChild(toast);
    toast.getComponent('ToastUI').show(s, callback, num);
  },
  setLoadingMaskVisible: function setLoadingMaskVisible(isShow) {
    if (isShow) {
      this.loadingMask.active = true;
    } else {
      this.loadingMask.active = false;
    }
  },
  //例外
  update: function update(dt) {
    GameApp.dataManager.globalData.onLineTime += dt;

    switch (GameApp.dataManager.globalData.recordState) {
      case RecordState.READY:
        GameApp.dataManager.globalData.recordTimer = 0;
        break;

      case RecordState.RECORD:
        GameApp.dataManager.globalData.recordTimer += dt;
        break;

      case RecordState.PAUSE:
        break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFuYWdlclxcVUlNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIlBSRUZBQl9QQVRIIiwicmVxdWlyZSIsIkpTT05fUEFUSCIsIndpbmRvdyIsImNvbk1hZyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZ2FtZVJvb3QiLCJOb2RlIiwidWlSb290IiwicG9wdXBSb290IiwidG9hc3RSb290IiwidG9hc3RQcmVmYWIiLCJQcmVmYWIiLCJsb2FkaW5nTWFzayIsImxvYWRpbmdQcm9ncmVzcyIsIlByb2dyZXNzQmFyIiwic3BsYXNoVUkiLCJfUHJlZmFicyIsIl9Kc29ucyIsIm1hcENhbWVyYSIsIkNhbWVyYSIsIm1pcG1hcENhbWVyYSIsIm5vcm1hbFNraW5EYXRhIiwic3AiLCJTa2VsZXRvbkRhdGEiLCJhZHZhbmNlU2tpbkRhdGFHcm91cCIsImJveFNraW5EYXRhR3JvdXAiLCJjb21tb25BdGxhcyIsIlNwcml0ZUF0bGFzIiwiZ3VuU2tpbkRhdGFHcm91cCIsIm9uTG9hZCIsIkdhbWVBcHAiLCJ1aU1hbmFnZXIiLCJub2RlIiwiZGVzdHJveSIsImdhbWUiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJlbmFibGVkIiwiZW5hYmxlZERyYXdCb3VuZGluZ0JveCIsImVuYWJsZWREZWJ1Z0RyYXciLCJtYW5hZ2VyIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJkZWJ1Z0RyYXdGbGFncyIsIlBoeXNpY3NNYW5hZ2VyIiwiRHJhd0JpdHMiLCJlX2FhYmJCaXQiLCJlX3BhaXJCaXQiLCJlX2NlbnRlck9mTWFzc0JpdCIsImVfam9pbnRCaXQiLCJlX3NoYXBlQml0IiwiZnJhbWVTaXplIiwidmlldyIsImdldEZyYW1lU2l6ZSIsImNhbnZhcyIsIndpZHRoIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImhlaWdodCIsInNldExvYWRpbmdNYXNrVmlzaWJsZSIsInByb2dyZXNzIiwic3RhcnRMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImFjdGl2ZSIsImxvYWRBbGwiLCJjb21wbGV0ZWRDb3VudCIsInRvdGFsQ291bnQiLCJwZXIiLCJpc05hTiIsImJpbmQiLCJ1c2VyRGF0YSIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ1bmRlZmluZWQiLCJkYXRhTWFuYWdlciIsIkpTT04iLCJwYXJzZSIsInNob3dVSSIsImNiUHJvZ3Jlc3MiLCJjYkNvbXBsZXRlIiwicGF0aHMiLCJpaSIsIm5hbWUiLCJwdXNoIiwicHJlZmFiQ291bnQiLCJqaiIsIm5hbWUyIiwianNvbkNvdW50IiwibG9hZGVyIiwibG9hZFJlc0FycmF5IiwiZXJyIiwicHJlZmFicyIsIm5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImkiLCJuYW1lczIiLCJqIiwianNvbiIsImpzb25EYXRhIiwibG9hZCIsImNiIiwibG9hZFJlcyIsInByZWZhYiIsImVycm9yIiwibWVzc2FnZSIsInNob3dHYW1lT2JqZWN0IiwicGFyZW50Tm9kZSIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJzaG93R2FtZSIsIl9jdXJHYW1lTmFtZSIsIl9jdXJOYW1lIiwiY2xlYXJHYW1lcyIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImVhY2hVSSIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZmFkZU91dCIsImNhbGxGdW5jIiwiY2xlYXJQb3B1cHMiLCJvcGFjaXR5IiwiZmFkZUluIiwiZ2V0VUkiLCJnZXRDaGlsZEJ5TmFtZSIsInBvcFVJIiwidWlzIiwibGVuZ3RoIiwiaXNJbk1hcFNpZ2h0IiwiX3RhcmdldCIsImNhbWVyYVdpZHRoIiwiY2FtZXJhSGVpZ2h0IiwidGhlUG9zIiwiZ2V0V29ybGRUb1NjcmVlblBvaW50IiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwidjIiLCJ4IiwieSIsInNob3dQb3B1cCIsImNsZWFuIiwiX2N1clBvcHVwTmFtZSIsInNjYWxlWCIsInNjYWxlWSIsInNjYWxlVG8iLCJlYXNpbmciLCJlYXNlQm91bmNlT3V0IiwiZ2V0UG9wdXAiLCJwb3BQb3B1cCIsInBvcHVwcyIsImNsb3NlUG9wdXAiLCJnZXRHYW1lIiwiZGVzdHJveUFsbENoaWxkcmVuIiwic2hvd1RvYXN0IiwicyIsImNhbGxiYWNrIiwibnVtIiwidG9hc3QiLCJjaGlsZHJlbkNvdW50IiwibW92ZVVwIiwibW92ZUJ5IiwiZ2V0Q29tcG9uZW50Iiwic2hvdyIsImlzU2hvdyIsInVwZGF0ZSIsImR0IiwiZ2xvYmFsRGF0YSIsIm9uTGluZVRpbWUiLCJyZWNvcmRTdGF0ZSIsIlJlY29yZFN0YXRlIiwiUkVBRFkiLCJyZWNvcmRUaW1lciIsIlJFQ09SRCIsIlBBVVNFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUF6Qjs7QUFDQUUsTUFBTSxDQUFDQyxNQUFQLEdBQWdCRCxNQUFNLENBQUNDLE1BQVAsSUFBaUJILE9BQU8sQ0FBQyxlQUFELENBQXhDO0FBRUFJLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETDtBQUVSQyxJQUFBQSxNQUFNLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGSDtBQUdSRSxJQUFBQSxTQUFTLEVBQUVQLEVBQUUsQ0FBQ0ssSUFITjtBQUlSRyxJQUFBQSxTQUFTLEVBQUVSLEVBQUUsQ0FBQ0ssSUFKTjtBQUtSSSxJQUFBQSxXQUFXLEVBQUVULEVBQUUsQ0FBQ1UsTUFMUjtBQU1SQyxJQUFBQSxXQUFXLEVBQUVYLEVBQUUsQ0FBQ0ssSUFOUjtBQU9STyxJQUFBQSxlQUFlLEVBQUVaLEVBQUUsQ0FBQ2EsV0FQWjtBQVFSQyxJQUFBQSxRQUFRLEVBQUVkLEVBQUUsQ0FBQ0ssSUFSTDtBQVNSVSxJQUFBQSxRQUFRLEVB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OztBQUNKLFdBQUtGLFdBQVcsQ0FBQ0csTUFBakI7QUFDSS9JLFFBQUFBLE9BQU8sQ0FBQzZDLFdBQVIsQ0FBb0I0RixVQUFwQixDQUErQkssV0FBL0IsSUFBOENOLEVBQTlDO0FBQ0E7O0FBQ0osV0FBS0ksV0FBVyxDQUFDSSxLQUFqQjtBQUNJO0FBUlI7QUFVSDtBQTFYSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBQUkVGQUJfUEFUSCA9IHJlcXVpcmUoJ1ByZWZhYlBhdGgnKTtcclxuY29uc3QgSlNPTl9QQVRIID0gcmVxdWlyZSgnSnNvblBhdGgnKTtcclxud2luZG93LmNvbk1hZyA9IHdpbmRvdy5jb25NYWcgfHwgcmVxdWlyZShcIkNvbmZpZ01hbmFnZXJcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGdhbWVSb290OiBjYy5Ob2RlLFxyXG4gICAgICAgIHVpUm9vdDogY2MuTm9kZSxcclxuICAgICAgICBwb3B1cFJvb3Q6IGNjLk5vZGUsXHJcbiAgICAgICAgdG9hc3RSb290OiBjYy5Ob2RlLFxyXG4gICAgICAgIHRvYXN0UHJlZmFiOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgbG9hZGluZ01hc2s6IGNjLk5vZGUsXHJcbiAgICAgICAgbG9hZGluZ1Byb2dyZXNzOiBjYy5Qcm9ncmVzc0JhcixcclxuICAgICAgICBzcGxhc2hVSTogY2MuTm9kZSxcclxuICAgICAgICBfUHJlZmFiczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9Kc29uczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtYXBDYW1lcmE6IGNjLkNhbWVyYSxcclxuICAgICAgICBtaXBtYXBDYW1lcmE6IGNjLkNhbWVyYSxcclxuICAgICAgICBub3JtYWxTa2luRGF0YTogc3AuU2tlbGV0b25EYXRhLFxyXG4gICAgICAgIGFkdmFuY2VTa2luRGF0YUdyb3VwOiBbc3AuU2tlbGV0b25EYXRhXSxcclxuICAgICAgICBib3hTa2luRGF0YUdyb3VwOiBbc3AuU2tlbGV0b25EYXRhXSxcclxuICAgICAgICBjb21tb25BdGxhczogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgZ3VuU2tpbkRhdGFHcm91cDogW3NwLlNrZWxldG9uRGF0YV1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmIChHYW1lQXBwLnVpTWFuYWdlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIgPSB0aGlzO1xyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlO1xyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBtYW5hZ2VyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIG1hbmFnZXIuZGVidWdEcmF3RmxhZ3MgPSBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2FhYmJCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3BhaXJCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2NlbnRlck9mTWFzc0JpdCB8XHJcbiAgICAgICAgICAgIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfam9pbnRCaXQgfFxyXG4gICAgICAgICAgICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3NoYXBlQml0O1xyXG4gICAgICAgIGxldCBmcmFtZVNpemUgPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBjYy5nYW1lLmNhbnZhcztcclxuICAgICAgICBjYW52YXMud2lkdGggPSBmcmFtZVNpemUud2lkdGggKiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZnJhbWVTaXplLmhlaWdodCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xyXG5cclxuICAgICAgICB0aGlzLnNldExvYWRpbmdNYXNrVmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nUHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIC8v5byA5aeL5Yqg6L29O1xyXG4gICAgICAgIHRoaXMuc3RhcnRMb2FkaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5jb25NYWcubG9hZEFsbENvbmZpZygoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxldCBhbGwgPSB3aW5kb3cuY29uTWFnLmdldEFsbENvbmZpZygpXHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKFwi6L+Z5piv6K+75Y+W55qE5pWw5o2uXCIpXHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKGFsbFtcIkNvbmZpZ1wiXSlcclxuICAgICAgICAvLyAgICAgdmFyIHNraW5Kc29uID0gYWxsW1wiU2tpblwiXVxyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhza2luSnNvbi5qc29uWydza2lucyddKVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydExvYWRpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL5Yqg6L29Jyk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nUHJvZ3Jlc3Mubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbChmdW5jdGlvbiAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgbGV0IHBlciA9IGNvbXBsZXRlZENvdW50IC8gdG90YWxDb3VudDtcclxuICAgICAgICAgICAgaWYgKHBlciAmJiAhaXNOYU4ocGVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nUHJvZ3Jlc3MucHJvZ3Jlc3MgPSBwZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdQcm9ncmVzcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNwbGFzaFVJLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+ivu+WPlueUqOaIt+S/oeaBrztcclxuICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiRWF0Q2hpY2tlbl9Vc2VyRGF0YVwiKTtcclxuICAgICAgICAgICAgaWYgKHVzZXJEYXRhID09IG51bGwgfHwgdXNlckRhdGEgPT0gdW5kZWZpbmVkIHx8IHVzZXJEYXRhID09ICcnKSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLnVzZXJEYXRhID0gSlNPTi5wYXJzZSh1c2VyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEdhbWVBcHAuZGF0YU1hbmFnZXIudXNlckRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1VJKFwiTG9naW5VSVwiKVxyXG4gICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNiUHJvZ3Jlc3MgICAgICAgIOWKoOi9veS4reeahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGNiQ29tcGxldGUgICAgICAgIOWKoOi9veWujOaIkOeahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBsb2FkQWxsKGNiUHJvZ3Jlc3MsIGNiQ29tcGxldGUpIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBbXTtcclxuICAgICAgICB2YXIgaWkgPSAwO1xyXG4gICAgICAgIC8v5Yqg6L296aKE5Yi25L2T6YWN572u6Lev5b6E5paH5Lu2O1xyXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gUFJFRkFCX1BBVEgpIHtcclxuICAgICAgICAgICAgcGF0aHMucHVzaChQUkVGQUJfUEFUSFtuYW1lXSk7XHJcbiAgICAgICAgICAgIGlpKytcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHByZWZhYkNvdW50ID0gaWk7XHJcbiAgICAgICAgdmFyIGpqID0gMDtcclxuICAgICAgICAvL+WKoOi9vUpTT07phY3nva7mlofku7Y7XHJcbiAgICAgICAgZm9yIChsZXQgbmFtZTIgaW4gSlNPTl9QQVRIKSB7XHJcbiAgICAgICAgICAgIHBhdGhzLnB1c2goSlNPTl9QQVRIW25hbWUyXSk7XHJcbiAgICAgICAgICAgIGpqKytcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGpzb25Db3VudCA9IGpqO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkocGF0aHMsIGZ1bmN0aW9uIChjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjb21wbGV0ZWRDb3VudCArICcvJyArIHRvdGFsQ291bnQpXHJcbiAgICAgICAgICAgIGNiUHJvZ3Jlc3MoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHByZWZhYnMpIHtcclxuICAgICAgICAgICAgbGV0IG5hbWVzID0gT2JqZWN0LmtleXMoUFJFRkFCX1BBVEgpO1xyXG4gICAgICAgICAgICAvL2ZvciAobGV0IGkgaW4gcHJlZmFicykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZhYkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1ByZWZhYnNbbmFtZXNbaV1dID0gcHJlZmFic1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbmFtZXMyID0gT2JqZWN0LmtleXMoSlNPTl9QQVRIKTtcclxuICAgICAgICAgICAgLy9mb3IgKGxldCBpIGluIHByZWZhYnMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBqc29uQ291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSnNvbnNbbmFtZXMyW2pdXSA9IHByZWZhYnNbcHJlZmFiQ291bnQgKyBqXS5qc29uW25hbWVzMltqXV07XHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmpzb25EYXRhW25hbWVzMltqXV0gPSB0aGlzLl9Kc29uc1tuYW1lczJbal1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coR2FtZUFwcC5kYXRhTWFuYWdlci5qc29uRGF0YSlcclxuICAgICAgICAgICAgY2JDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAvLyBsZXQgcGF0aHMyID0gWydkYXRhL3NraW5zLmpzb24nXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkocGF0aHMyLCBmdW5jdGlvbiAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgLy8gICAgIGNiUHJvZ3Jlc3MoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQpO1xyXG4gICAgICAgICAgICAvLyB9LCBmdW5jdGlvbiAoZXJyLCBqc29ucykge1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coanNvbnNbMF0uanNvbi5za2lucylcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuc2tpbnNEYXRhID0ganNvbnNbMF0uanNvbi5za2luc1xyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coR2FtZUFwcC5kYXRhTWFuYWdlci5za2luc0RhdGEpXHJcbiAgICAgICAgICAgIC8vICAgICBjYkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIC8vIH0uYmluZCh0aGlzKSlcclxuXHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgbG9hZChuYW1lLCBjYikge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFBSRUZBQl9QQVRIW25hbWVdLCBmdW5jdGlvbiAoZXJyLCBwcmVmYWIpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9QcmVmYWJzW25hbWVdID0gcHJlZmFiO1xyXG4gICAgICAgICAgICBjYiAmJiBjYihuYW1lKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93R2FtZU9iamVjdChuYW1lLCBjYiwgcGFyZW50Tm9kZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fUHJlZmFic1tuYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQobmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R2FtZU9iamVjdChuYW1lLCBjYik7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5fUHJlZmFic1tuYW1lXSk7XHJcbiAgICAgICAgcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGNiICYmIGNiKG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93R2FtZShuYW1lLCBjYikge1xyXG4gICAgICAgIC8v5pyq5Yqg6L29XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ckdhbWVOYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCItLS1zaG93R2FtZS5yZXBlYXQtLS0tXCIpXHJcbiAgICAgICAgICAgIC8v5YWB6K645Yi35pawR2FtZVxyXG4gICAgICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX1ByZWZhYnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkKG5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dhbWUobmFtZSwgY2IpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX1ByZWZhYnNbbmFtZV0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZVJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgdGhpcy5fY3VyR2FtZU5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICBjYiAmJiBjYihub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1VJKG5hbWUsIGNiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3Nob3dVSScpO1xyXG4gICAgICAgIC8v5pyq5Yqg6L29XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1ck5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLXNob3dVSS5yZXBlYXQtLS0tXCIpXHJcbiAgICAgICAgICAgIC8v5LiN5YWB6K645Yi35pawVUlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9QcmVmYWJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZChuYW1lLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dVSShuYW1lLCBjYik7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lt7LliqDovb0gXHJcbiAgICAgICAgLy8gdGhpcy51aVJvb3QuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jbGVhclBvcHVwcygpXHJcbiAgICAgICAgdGhpcy5jbGVhckdhbWVzKClcclxuICAgICAgICAvL+eJueauiuWkhOeQhueahFVJXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IHRoaXMucG9wdXBSb290LmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLnBvcHVwUm9vdC5jaGlsZHJlbltpXS5fdGFnICE9PSAxMDA4Nikge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wb3B1cFJvb3QuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMudWlSb290LmNoaWxkcmVuLmZvckVhY2goZWFjaFVJID0+IHtcclxuICAgICAgICAgICAgZWFjaFVJLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuMSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVhY2hVSS5kZXN0cm95KClcclxuICAgICAgICAgICAgfSkpKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2xlYXJQb3B1cHMoKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX1ByZWZhYnNbbmFtZV0pO1xyXG4gICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy51aVJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xyXG4gICAgICAgIHRoaXMuX2N1ck5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNiICYmIGNiKG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRVSShuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudWlSb290LmdldENoaWxkQnlOYW1lKG5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwb3BVSSgpIHtcclxuICAgICAgICBsZXQgdWlzID0gdGhpcy51aVJvb3QuY2hpbGRyZW47XHJcbiAgICAgICAgaWYgKHVpcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHVpc1t1aXMubGVuZ3RoIC0gMV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNJbk1hcFNpZ2h0KF90YXJnZXQpIHtcclxuICAgICAgICB2YXIgY2FtZXJhV2lkdGggPSB0aGlzLm1hcENhbWVyYS5ub2RlLndpZHRoIC8gMC45XHJcbiAgICAgICAgdmFyIGNhbWVyYUhlaWdodCA9IHRoaXMubWFwQ2FtZXJhLm5vZGUuaGVpZ2h0IC8gMC45XHJcbiAgICAgICAgdmFyIHRoZVBvcyA9IHRoaXMubWFwQ2FtZXJhLmdldFdvcmxkVG9TY3JlZW5Qb2ludChfdGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkpXHJcbiAgICAgICAgaWYgKHRoZVBvcy54IDwgMCB8fCB0aGVQb3MueCA+IGNhbWVyYVdpZHRoIHx8IHRoZVBvcy55IDwgMCB8fCB0aGVQb3MueSA+IGNhbWVyYUhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2hvd1RvcChjYikge1xyXG4gICAgLy8gICAgIHZhciBuYW1lID0gXCJUb3BVSVwiXHJcbiAgICAvLyAgICAgLy/mnKrliqDovb1cclxuICAgIC8vICAgICBpZiAoIXRoaXMuX1ByZWZhYnNbbmFtZV0pIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkKG5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd1RvcChuYW1lLCBjYik7XHJcbiAgICAvLyAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy/lt7LliqDovb1cclxuICAgIC8vICAgICBpZiAodGhpcy50b3BSb290LmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX1ByZWZhYnNbbmFtZV0pO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnRvcFJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgdGhpcy50b3BSb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGNiICYmIGNiKG5vZGUpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICAvLyBnZXRUb3AoKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMudG9wUm9vdC5jaGlsZHJlblswXTtcclxuICAgIC8vIH0sXHJcbiAgICAvLyBoaWRlVG9wKCkge1xyXG4gICAgLy8gICAgICh0aGlzLnRvcFJvb3QuY2hpbGRyZW5Db3VudCA+IDApICYmICh0aGlzLnRvcFJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2UpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICBzaG93UG9wdXAobmFtZSwgY2IsIGNsZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJQb3B1cE5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLXNob3dQb3B1cC5yZXBlYXQtLS0tXCIpXHJcbiAgICAgICAgICAgIC8v5YWB6K645Yi35pawcG9wdXBcclxuICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+acquWKoOi9vVxyXG4gICAgICAgIGlmICghdGhpcy5fUHJlZmFic1tuYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQobmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UG9wdXAobmFtZSwgY2IpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyUG9wdXBzKClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lt7LliqDovb1cclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX1ByZWZhYnNbbmFtZV0pO1xyXG4gICAgICAgIC8vIG5vZGUub3BhY2l0eSA9IDBcclxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLnNjYWxlWCA9IDBcclxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLnNjYWxlWSA9IDBcclxuICAgICAgICB0aGlzLnBvcHVwUm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLmNoaWxkcmVuWzBdLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuNSwgMSkuZWFzaW5nKGNjLmVhc2VCb3VuY2VPdXQoMikpKVxyXG4gICAgICAgIHRoaXMuX2N1clBvcHVwTmFtZSA9IG5hbWVcclxuXHJcbiAgICAgICAgY2IgJiYgY2Iobm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFBvcHVwKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3B1cFJvb3QuZ2V0Q2hpbGRCeU5hbWUobmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBvcFBvcHVwKCkge1xyXG4gICAgICAgIGxldCBwb3B1cHMgPSB0aGlzLnBvcHVwUm9vdC5jaGlsZHJlbjtcclxuICAgICAgICBpZiAocG9wdXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcG9wdXBzW3BvcHVwcy5sZW5ndGggLSAxXS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZVBvcHVwKG5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMucG9wdXBSb290LmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC4xKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clBvcHVwTmFtZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhclBvcHVwcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xlYXJQb3B1cHMnKVxyXG4gICAgICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5wb3B1cFJvb3QuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZmFkZU91dCgwLjEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSkpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jdXJQb3B1cE5hbWUgPSBcIlwiXHJcbiAgICAgICAgLy8gdGhpcy5wb3B1cFJvb3QuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEdhbWUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVSb290LmdldENoaWxkQnlOYW1lKG5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhckdhbWVzKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVJvb3QuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5fY3VyR2FtZU5hbWUgPSBcIlwiXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dUb2FzdChzLCBjYWxsYmFjaywgbnVtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvYXN0UHJlZmFiKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHRvYXN0ID0gY2MuaW5zdGFudGlhdGUodGhpcy50b2FzdFByZWZhYik7XHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3RSb290LmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRvYXN0Um9vdC5jaGlsZHJlbkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlVXAgPSBjYy5tb3ZlQnkoMC4xLCBjYy52MigwLCB0b2FzdC5oZWlnaHQpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdFJvb3QuY2hpbGRyZW5baV0ucnVuQWN0aW9uKG1vdmVVcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRvYXN0Um9vdC5hZGRDaGlsZCh0b2FzdCk7XHJcbiAgICAgICAgdG9hc3QuZ2V0Q29tcG9uZW50KCdUb2FzdFVJJykuc2hvdyhzLCBjYWxsYmFjaywgbnVtKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0TG9hZGluZ01hc2tWaXNpYmxlKGlzU2hvdykge1xyXG4gICAgICAgIGlmIChpc1Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nTWFzay5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy/kvovlpJZcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5vbkxpbmVUaW1lICs9IGR0O1xyXG4gICAgICAgIHN3aXRjaCAoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlY29yZFN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUmVjb3JkU3RhdGUuUkVBRFk6XHJcbiAgICAgICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEucmVjb3JkVGltZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVjb3JkU3RhdGUuUkVDT1JEOlxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLnJlY29yZFRpbWVyICs9IGR0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVjb3JkU3RhdGUuUEFVU0U6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTsiXX0=