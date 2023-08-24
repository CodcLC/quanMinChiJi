"use strict";
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