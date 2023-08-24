
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/GameMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc94bOW2txGwZfe6BFh7ITa', 'GameMap');
// scripts/ui/GameMap.js

"use strict";

var _properties;

cc.Class({
  "extends": cc.Component,
  properties: (_properties = {
    tiledMap: cc.TiledMap,
    objectPrefab: cc.Prefab,
    colliderPrefab: cc.Prefab,
    groundItemPrefab: cc.Prefab,
    allObjectNode: cc.Node,
    allColliderNode: cc.Node,
    allGunNode: cc.Node,
    otherGunPos: cc.Node,
    enemySpawnPosGroupNode: cc.Node,
    paratrooperNode: cc.Node,
    cloudNode: cc.Node,
    mapAtlas: cc.SpriteAtlas,
    _timer0: 0.1,
    _timer: 0.1,
    readyToSort: false,
    gasPanel: cc.Node,
    dropPanel: cc.Node,
    boomPanel: cc.Node,
    safeCircle: 10240,
    safePosition: cc.v2(0, 0),
    _gasState: 0
  }, _properties["safeCircle"] = 0, _properties._dropTime = 0, _properties._mipBoxGroup = [], _properties),
  onLoad: function onLoad() {
    GameApp.eventManager.on(EventNames.EVENT_UPDATE_GAS_SHOW, this.updateGasShow.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_DROP_BOX, this.dropBox.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_NOTYFY_BOX_DISMISS, this.notifyBoxDismiss.bind(this));
    GameApp.eventManager.on(EventNames.EVENT_DROP_BOOM, this.dropBoom.bind(this));
    this.initMapShow(); // this.showCloud()
    // this.showPlayer()
    // this.showEnemy()
  },
  onDestroy: function onDestroy() {
    GameApp.eventManager.removeListener(EventNames.EVENT_UPDATE_GAS_SHOW);
    GameApp.eventManager.removeListener(EventNames.EVENT_DROP_BOX);
    GameApp.eventManager.removeListener(EventNames.EVENT_NOTYFY_BOX_DISMISS);
    GameApp.eventManager.removeListener(EventNames.EVENT_DROP_BOOM);
  },
  init: function init(_chooseType, _bili, _speedUpJump) {
    var _this = this;

    this.showCloud(_speedUpJump);
    this.showParatrooperPlayer(_chooseType, _bili);
    this.schedule(function () {
      _this.showParatrooperEnemy(_chooseType, Tools.randomNum(0, 100) / 100);
    }, 0.1, 29, 0.5);
    this.initGas();
  },
  update: function update(dt) {
    this.gasCountDown(dt);
    if (!this.readyToSort) return;
    this._timer -= dt;

    if (this._timer < 0) {
      this._timer = this._timer0;
      this.sortAll();
    }
  },
  initGas: function initGas() {
    this.gasPanel.children[1].width = this.gasPanel.children[1].height = 10240 * (300 / 204); // this.gasPanel.children[0].width = this.gasPanel.children[0].height = this.gasPanel.children[1].width / 0.98

    this.gasPanel.children[1].runAction(cc.sequence(cc.fadeTo(1, 200), cc.fadeTo(0.8, 255)).repeatForever());
  },
  updateGasShow: function updateGasShow(_state, event) {
    this._gasState = _state;
    this.safeCircle = 10240 * (event.safeCircle / 204);
    this.safePosition.x = 10240 * (event.safePosition.x / 204);
    this.safePosition.y = 10240 * (event.safePosition.y / 204);
    GameApp.dataManager.globalData.gasConfig = {
      safePosition: this.gasPanel.children[1].position,
      gasCircle: this.gasPanel.children[1].width
    };
  },
  gasCountDown: function gasCountDown(dt) {
    if (this.safeCircle < 0) {
      return;
    }

    if (this._gasState == 2) {
      // console.log(this.gasPanel.children[1].width)
      if (this.gasPanel.children[1].width <= this.safeCircle) {
        this.gasPanel.children[1].width = this.gasPanel.children[1].height = this.safeCircle; // this.gasPanel.children[0].width = this.gasPanel.children[0].height = this.safeCircle / 0.98

        if (this.safeCircle <= 0) {
          this.safeCircle -= 50; //为了变成负数

          return;
        }

        return;
      }

      var delt = dt * (10 / 204 * 10240);
      this.gasPanel.children[1].width -= delt;
      this.gasPanel.children[1].height -= delt; // this.gasPanel.children[0].width -= delt
      // this.gasPanel.children[0].height -= delt

      GameApp.dataManager.globalData.gasConfig = {
        safePosition: this.gasPanel.children[1].position,
        gasCircle: this.gasPanel.children[1].width
      };
      if (this.safeCircle == 50) return;

      if (!Tools.isIntersect(this.gasPanel.children[1].position, this.gasPanel.children[1].width / 2, this.safePosition, this.safeCircle / 2)) {} else {
        if (Math.abs(this.gasPanel.children[1].width - this.safeCircle) > 0.01) //外圈和内圈圆心重合,半径相同
          {
            // k = y/x
            // y = kx
            // x^2+y^2 = 1
            // x^2 = 1/(k^2+1)
            var k = (this.gasPanel.children[1].y - this.safePosition.y) / (this.gasPanel.children[1].x - this.safePosition.x);
            var x_off = delt * parseFloat(Math.sqrt(1 / (k * k + 1))); // 通过mPoint_outer和mPoint_inner的x坐标来判断此时外圆圆心要移动的是该 + x_off（x轴偏移量）还是 -x_off

            this.gasPanel.children[1].x += 1 * (this.gasPanel.children[1].x < this.safePosition.x ? 1 : -1) * x_off; // 知道变化后的外圈圆心的x坐标，和直线方程来求对应的y坐标

            this.gasPanel.children[1].y = k * (this.gasPanel.children[1].x - this.safePosition.x) + this.safePosition.y; // // 通过mPoint_outer和mPoint_inner的x坐标来判断此时外圆圆心要移动的是该 + x_off（x轴偏移量）还是 -x_off
            // this.gasPanel.children[0].x += 1 * (this.gasPanel.children[1].x < this.safePosition.x ? 1 : -1) * x_off;
            // // 知道变化后的外圈圆心的x坐标，和直线方程来求对应的y坐标
            // this.gasPanel.children[0].y = k * (this.gasPanel.children[1].x - this.safePosition.x) + this.safePosition.y;

            GameApp.dataManager.globalData.gasConfig = {
              safePosition: this.gasPanel.children[1].position,
              gasCircle: this.gasPanel.children[1].width
            };
          }
      }
    }
  },
  dropBox: function dropBox(_thePos, _index) {
    var _this2 = this;

    _thePos = _thePos.div(204).mul(10240);
    GameApp.uiManager.showGameObject("DropBox", function (node) {
      _this2._mipBoxGroup.push(node);

      GameApp.dataManager.globalData.allBoxArr.push(node);
      node.setPosition(_thePos);
      node.getComponent("DropBox").init(Tools.getIndex(_this2._mipBoxGroup, node));
      GameApp.eventManager.emit(EventNames.EVENT_NOTIFY_ENEMY_MAPBOX);
    }, this.dropPanel);
  },
  notifyBoxDismiss: function notifyBoxDismiss(_index) {
    Tools.removeArray(GameApp.dataManager.globalData.allBoxArr, this._mipBoxGroup[parseInt(_index)]);

    this._mipBoxGroup[parseInt(_index)].destroy();
  },
  dropBoom: function dropBoom(_thePos, _theWidth) {
    _thePos = _thePos.div(204).mul(10240);
    _theWidth = 10240 * _theWidth / 204;
    var boomArr = [];

    for (var i = 0; i < 10; i++) {
      boomArr.push(Tools.pointOfRandom(_thePos, _theWidth / 2, 0));
    }

    this.dropItBoom(boomArr, 0);
  },
  dropItBoom: function dropItBoom(boomArr, _index) {
    var _this3 = this;

    if (_index >= boomArr.length) {
      GameApp.eventManager.emit(EventNames.EVENT_NOTYFY_BOOM_DISMISS);
      return;
    }

    var _delay = Tools.randomNum(0, 2, true);

    this.node.runAction(cc.sequence(cc.delayTime(_delay), cc.callFunc(function () {
      GameApp.uiManager.showGameObject("Boom", function (node) {
        // console.log(boomArr[_index])
        node.setPosition(boomArr[_index]);
        node.children[0].getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        node.children[0].runAction(cc.sequence(cc.moveBy(1, cc.v2(0, -220)), cc.fadeOut(0)));
        node.children[1].runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
          GameApp.audioManager.playEffect('boom');
          var coli = node.getComponent(cc.PhysicsBoxCollider);
          coli.enabled = true;
          var theAnim = node.children[1].getComponent(sp.Skeleton);
          theAnim.setAnimation(0, "boom1", false);
          theAnim.setCompleteListener(function () {
            coli.enabled = false;
            node.destroy();
          });
        })));
      }, _this3.boomPanel);

      _this3.dropItBoom(boomArr, ++_index);
    })));
  },
  initMapShow: function initMapShow() {
    var _this4 = this;

    GameApp.dataManager.globalData.allRoleArr = [];
    GameApp.dataManager.globalData.allGunArr = []; // this.node.children[2].active = true

    var wallLayer = this.tiledMap.getLayer("wall");

    this.tiledMap.getObjectGroup("dynamic")._objects.forEach(function (element) {
      var obj = cc.instantiate(_this4.objectPrefab);
      obj.getComponent(cc.Sprite).spriteFrame = _this4.mapAtlas.getSpriteFrame(element.name.split('.')[0]);
      obj.parent = _this4.allColliderNode;
      var desPos = wallLayer.getPositionAt(_this4.getTilePos(cc.v2(element.x, element.y)));
      obj.setPosition(desPos);

      var ddd = _this4.allObjectNode.convertToNodeSpaceAR(obj.convertToWorldSpaceAR(cc.v2(0, 0)));

      obj.parent = _this4.allObjectNode;
      obj.setPosition(ddd);
    });

    this.tiledMap.getObjectGroup("collision")._objects.forEach(function (element) {
      var obj = cc.instantiate(_this4.colliderPrefab);
      var coli = obj.getComponent(cc.PhysicsBoxCollider);
      coli.size = cc.size(element.width, element.height);
      coli.offset = cc.v2(element.width / 2, -element.height / 2);
      coli.apply();

      _this4.allColliderNode.addChild(obj);

      obj.setPosition(cc.v2(element.x, element.y));
      coli.tag = Tags.collider;
    });
  },
  showParatrooperPlayer: function showParatrooperPlayer(_chooseType, _bili) {
    var _this5 = this;

    GameApp.uiManager.showGameObject('ParatrooperPlayer', function (node) {
      var pC = node.getComponent('ParatrooperPlayer');
      pC.init(_this5.enemySpawnPosGroupNode.children);
      GameApp.uiManager.getUI("GameUI").getComponent("GameUI").joystick.getComponent("Joystick").player = pC;
      var theX = 0;
      var theY = 0;

      if (_chooseType == 0) {
        theX = (_this5.enemySpawnPosGroupNode.children[3].x - _this5.enemySpawnPosGroupNode.children[0].x) * _bili - _this5.enemySpawnPosGroupNode.children[3].x;
        theY = (_this5.enemySpawnPosGroupNode.children[3].y - _this5.enemySpawnPosGroupNode.children[0].y) * _bili - _this5.enemySpawnPosGroupNode.children[3].y;
      } else {
        theX = (_this5.enemySpawnPosGroupNode.children[1].x - _this5.enemySpawnPosGroupNode.children[2].x) * _bili - _this5.enemySpawnPosGroupNode.children[1].x;
        theY = (_this5.enemySpawnPosGroupNode.children[1].y - _this5.enemySpawnPosGroupNode.children[2].y) * _bili - _this5.enemySpawnPosGroupNode.children[1].y;
      }

      node.setPosition(theX, theY);
    }, this.paratrooperNode);
  },
  showParatrooperEnemy: function showParatrooperEnemy(_chooseType, _bili) {
    var _this6 = this;

    GameApp.uiManager.showGameObject('ParatrooperEnemy', function (node) {
      node.getComponent('ParatrooperEnemy').init(_this6.enemySpawnPosGroupNode.children);
      var theX = 0;
      var theY = 0;

      if (_chooseType == 0) {
        theX = (_this6.enemySpawnPosGroupNode.children[3].x - _this6.enemySpawnPosGroupNode.children[0].x) * _bili - _this6.enemySpawnPosGroupNode.children[3].x;
        theY = (_this6.enemySpawnPosGroupNode.children[0].y - _this6.enemySpawnPosGroupNode.children[3].y) * _bili - _this6.enemySpawnPosGroupNode.children[0].y;
      } else {
        theX = (_this6.enemySpawnPosGroupNode.children[1].x - _this6.enemySpawnPosGroupNode.children[2].x) * _bili - _this6.enemySpawnPosGroupNode.children[1].x;
        theY = (_this6.enemySpawnPosGroupNode.children[1].y - _this6.enemySpawnPosGroupNode.children[2].y) * _bili - _this6.enemySpawnPosGroupNode.children[1].y;
      }

      node.setPosition(theX, theY);
      var desDir = cc.v2(0, 10).rotate(cc.misc.radiansToDegrees(Tools.randomNum(0, 360))); // var randTime = Tools.randomNum(2, 4)

      node.runAction(cc.repeatForever(cc.moveBy(0.1, desDir)));
    }, this.paratrooperNode);
  },
  showCloud: function showCloud(_speedUpJump) {
    var _this7 = this;

    var _jumpTime = 2;

    if (_speedUpJump) {
      _jumpTime = 1;
    }

    GameApp.uiManager.mapCamera.zoomRatio = 0.3;
    var each0_05 = 0.3 / (3.6 + _jumpTime * 3) / 100 * 5;
    var act = cc.sequence(cc.callFunc(function () {
      if (GameApp.uiManager.mapCamera.zoomRatio >= 0.8) {
        GameApp.uiManager.mapCamera.zoomRatio = 0.8;
        return;
      }

      GameApp.uiManager.mapCamera.zoomRatio += each0_05; //0.0015625
    }), cc.delayTime(0.05)).repeatForever();
    this.cloudNode.runAction(act);
    _jumpTime = _jumpTime ? _jumpTime : 2;
    this.cloudNode.runAction(cc.sequence(cc.callFunc(function () {
      _this7.cloudNode.children[0].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      GameApp.audioManager.playEffect('skydivingBegin', null, 1);
      _this7.cloudNode.children[1].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[2].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[3].active = true;
    }), cc.delayTime(_jumpTime), cc.callFunc(function () {
      GameApp.audioManager.playEffect('skydivingWind', null, 2);
      _this7.cloudNode.children[0].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[1].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[2].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[3].active = true;
    }), cc.delayTime(_jumpTime), cc.callFunc(function () {
      _this7.cloudNode.children[0].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[1].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[2].active = true;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[3].active = true;
    }), cc.delayTime(_jumpTime), cc.callFunc(function () {
      _this7.cloudNode.children[0].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[1].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[2].active = false;
    }), cc.delayTime(0.3), cc.callFunc(function () {
      _this7.cloudNode.children[3].active = true;
    }), cc.delayTime(_jumpTime), cc.callFunc(function () {
      // console.log(GameApp.uiManager.mapCamera.zoomRatio)
      _this7.gameBegin(_speedUpJump);
    })));
  },
  gameBegin: function gameBegin(_speedUpJump) {
    var _this8 = this;

    GameApp.dataManager.globalData.isInGame = true;
    this.cloudNode.destroy();
    GameApp.uiManager.mapCamera.zoomRatio = 0.8;
    GameApp.audioManager.playEffect('skydivingToGround', null, 1);
    GameApp.eventManager.emit(EventNames.EVENT_GAME_BEGIN);
    var landUpPos = this.paratrooperNode.children[0].position;
    this.paratrooperNode.destroyAllChildren();
    this.showGun();
    this.showPlayer(landUpPos);

    if (_speedUpJump) {
      this.node.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
        _this8.showEnemy();
      })));
    } else {
      this.showEnemy();
    }
  },
  showGun: function showGun() {
    var _this9 = this;

    var wallLayer = this.tiledMap.getLayer("wall");

    this.tiledMap.getObjectGroup("grass")._objects.forEach(function (element) {
      // var element = this.tiledMap.getObjectGroup("gun")._objects[0]
      var obj = cc.instantiate(_this9.groundItemPrefab);
      obj.parent = _this9.allColliderNode;
      var desPos = wallLayer.getPositionAt(_this9.getTilePos(cc.v2(element.x, element.y)));
      obj.setPosition(desPos);

      var ddd = _this9.allGunNode.convertToNodeSpaceAR(obj.convertToWorldSpaceAR(cc.v2(0, 0)));

      obj.parent = _this9.allGunNode;
      obj.setPosition(ddd);
      var _param = {
        _type: ItemType.weapon,
        _kind: Tools.randomNum(0, 5)
      };
      obj.getComponent('GroundItem').init(_param);
      GameApp.dataManager.globalData.allGunArr.push(obj);
    });

    this.otherGunPos.children.forEach(function (posNode) {
      var obj = cc.instantiate(_this9.groundItemPrefab);

      var ddd = _this9.allGunNode.convertToNodeSpaceAR(posNode.convertToWorldSpaceAR(cc.v2(0, 0)));

      obj.parent = _this9.allGunNode;
      obj.setPosition(ddd);
      var _param = {
        _type: ItemType.weapon,
        _kind: Tools.randomNum(0, 5)
      };
      obj.getComponent('GroundItem').init(_param);
      GameApp.dataManager.globalData.allGunArr.push(obj);
    });
  },
  //将像素坐标转化为瓦片坐标，posInPixel：目标节点的position
  getTilePos: function getTilePos(posInPixel) {
    var mapSize = this.tiledMap.node.getContentSize();
    var tileSize = this.tiledMap.getTileSize();
    var x = Math.floor(posInPixel.x / tileSize.width);
    var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
    return cc.v2(x, y);
  },
  showPlayer: function showPlayer(landUpPos) {
    GameApp.uiManager.showGameObject('Player', function (node) {
      // GameApp.dataManager.globalData.allRoleArr.push(node)
      node.setPosition(landUpPos);
      var c = node.getComponent("Player");
      GameApp.uiManager.getUI("GameUI").getComponent("GameUI").joystick.getComponent("Joystick").player = c;
      c.init();
      GameApp.dataManager.globalData.allRoleArr.push(c); // this.readyToSort = true
    }, this.allObjectNode);
  },
  showEnemy: function showEnemy() {
    var _this10 = this;

    var tempPosArr = [];
    var standardArr = this.enemySpawnPosGroupNode.children; // var xRangeArr = []
    // var eachSpaceX = (standardArr[1].x - standardArr[0].x) / 6
    // for (let i = 0; i < 7; i++) {
    //     xRangeArr.push(standardArr[0].x + eachSpaceX * i)
    // }
    // var yRangeArr = []
    // var eachSpaceY = (standardArr[2].y - standardArr[0].y) / 5
    // for (let i = 0; i < 6; i++) {
    //     yRangeArr.push(standardArr[0].y + eachSpaceY * i)
    // }
    // for (let i = 0; i < xRangeArr.length; i++) {
    //     for (let j = 0; j < yRangeArr.length; j++) {
    //         tempPosArr.push(cc.v2(xRangeArr[i], yRangeArr[j]))
    //     }
    // }

    for (var _i = 0; _i < 30; _i++) {
      tempPosArr.push(cc.v2(Tools.randomNum(standardArr[0].x, standardArr[1].x), Tools.randomNum(standardArr[2].y, standardArr[0].y)));
    } // tempPosArr = Tools.getRandomAmountElementUnRepeat(tempPosArr, 30)


    var tagNum = Tags.enemy;

    for (var i = 0; i < tempPosArr.length; i++) {
      if (i + 1 == GameApp.dataManager.userData.choosedSkinId) {
        continue;
      }

      GameApp.uiManager.showGameObject('Enemy', function (node) {
        // GameApp.dataManager.globalData.allRoleArr.push(node)
        node.getComponent(cc.PhysicsBoxCollider).tag = tagNum++;
        node.setPosition(tempPosArr[i]);
        var c = node.getComponent("Enemy");
        c.init(i + 1, GameApp.dataManager.jsonData.RobotName[i]);
        GameApp.dataManager.globalData.inGameKillNum.push({
          _killNum: 0,
          _belongName: GameApp.dataManager.jsonData.RobotName[i]
        });
        GameApp.dataManager.globalData.allRoleArr.push(c);
        _this10.readyToSort = true;
      }, this.allObjectNode);
    }

    GameApp.eventManager.emit(EventNames.EVENT_SHOW_ALLROLENUM_UI);
    GameApp.eventManager.emit(EventNames.EVENT_UPDATE_RANK_SHOW);
  },
  sortAll: function sortAll() {
    var cloneObjArr = this.allObjectNode.children.concat();
    var tempDict = [];
    var tempIndex = [];

    for (var i in cloneObjArr) {
      if (GameApp.uiManager.isInMapSight(cloneObjArr[i])) {
        tempDict.push({
          y: cloneObjArr[i].y,
          index: i
        });
        tempIndex.push(i);
      }
    }

    tempDict.sort(function (a, b) {
      return b.y - a.y;
    });

    for (var _i2 in tempDict) {
      cloneObjArr[tempDict[_i2].index].setSiblingIndex(tempDict[_i2]);
    } // console.log(tempDict)
    // console.log(this.allObjectNode.children)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXEdhbWVNYXAuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJ0aWxlZE1hcCIsIlRpbGVkTWFwIiwib2JqZWN0UHJlZmFiIiwiUHJlZmFiIiwiY29sbGlkZXJQcmVmYWIiLCJncm91bmRJdGVtUHJlZmFiIiwiYWxsT2JqZWN0Tm9kZSIsIk5vZGUiLCJhbGxDb2xsaWRlck5vZGUiLCJhbGxHdW5Ob2RlIiwib3RoZXJHdW5Qb3MiLCJlbmVteVNwYXduUG9zR3JvdXBOb2RlIiwicGFyYXRyb29wZXJOb2RlIiwiY2xvdWROb2RlIiwibWFwQXRsYXMiLCJTcHJpdGVBdGxhcyIsIl90aW1lcjAiLCJfdGltZXIiLCJyZWFkeVRvU29ydCIsImdhc1BhbmVsIiwiZHJvcFBhbmVsIiwiYm9vbVBhbmVsIiwic2FmZUNpcmNsZSIsInNhZmVQb3NpdGlvbiIsInYyIiwiX2dhc1N0YXRlIiwiX2Ryb3BUaW1lIiwiX21pcEJveEdyb3VwIiwib25Mb2FkIiwiR2FtZUFwcCIsImV2ZW50TWFuYWdlciIsIm9uIiwiRXZlbnROYW1lcyIsIkVWRU5UX1VQREFURV9HQVNfU0hPVyIsInVwZGF0ZUdhc1Nob3ciLCJiaW5kIiwiRVZFTlRfRFJPUF9CT1giLCJkcm9wQm94IiwiRVZFTlRfTk9UWUZZX0JPWF9ESVNNSVNTIiwibm90aWZ5Qm94RGlzbWlzcyIsIkVWRU5UX0RST1BfQk9PTSIsImRyb3BCb29tIiwiaW5pdE1hcFNob3ciLCJvbkRlc3Ryb3kiLCJyZW1vdmVMaXN0ZW5lciIsImluaXQiLCJfY2hvb3NlVHlwZSIsIl9iaWxpIiwiX3NwZWVkVXBKdW1wIiwic2hvd0Nsb3VkIiwic2hvd1BhcmF0cm9vcGVyUGxheWVyIiwic2NoZWR1bGUiLCJzaG93UGFyYXRyb29wZXJFbmVteSIsIlRvb2xzIiwicmFuZG9tTnVtIiwiaW5pdEdhcyIsInVwZGF0ZSIsImR0IiwiZ2FzQ291bnREb3duIiwic29ydEFsbCIsImNoaWxkcmVuIiwid2lkdGgiLCJoZWlnaHQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImZhZGVUbyIsInJlcGVhdEZvcmV2ZXIiLCJfc3RhdGUiLCJldmVudCIsIngiLCJ5IiwiZGF0YU1hbmFnZXIiLCJnbG9iYWxEYXRhIiwiZ2FzQ29uZmlnIiwicG9zaXRpb24iLCJnYXNDaXJjbGUiLCJkZWx0IiwiaXNJbnRlcnNlY3QiLCJNYXRoIiwiYWJzIiwiayIsInhfb2ZmIiwicGFyc2VGbG9hdCIsInNxcnQiLCJfdGhlUG9zIiwiX2luZGV4IiwiZGl2IiwibXVsIiwidWlNYW5hZ2VyIiwic2hvd0dhbWVPYmplY3QiLCJub2RlIiwicHVzaCIsImFsbEJveEFyciIsInNldFBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2V0SW5kZXgiLCJlbWl0IiwiRVZFTlRfTk9USUZZX0VORU1ZX01BUEJPWCIsInJlbW92ZUFycmF5IiwicGFyc2VJbnQiLCJkZXN0cm95IiwiX3RoZVdpZHRoIiwiYm9vbUFyciIsImkiLCJwb2ludE9mUmFuZG9tIiwiZHJvcEl0Qm9vbSIsImxlbmd0aCIsIkVWRU5UX05PVFlGWV9CT09NX0RJU01JU1MiLCJfZGVsYXkiLCJkZWxheVRpbWUiLCJjYWxsRnVuYyIsInNwIiwiU2tlbGV0b24iLCJzZXRBbmltYXRpb24iLCJtb3ZlQnkiLCJmYWRlT3V0IiwiYXVkaW9NYW5hZ2VyIiwicGxheUVmZmVjdCIsImNvbGkiLCJQaHlzaWNzQm94Q29sbGlkZXIiLCJlbmFibGVkIiwidGhlQW5pbSIsInNldENvbXBsZXRlTGlzdGVuZXIiLCJhbGxSb2xlQXJyIiwiYWxsR3VuQXJyIiwid2FsbExheWVyIiwiZ2V0TGF5ZXIiLCJnZXRPYmplY3RHcm91cCIsIl9vYmplY3RzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJvYmoiLCJpbnN0YW50aWF0ZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiZ2V0U3ByaXRlRnJhbWUiLCJuYW1lIiwic3BsaXQiLCJwYXJlbnQiLCJkZXNQb3MiLCJnZXRQb3NpdGlvbkF0IiwiZ2V0VGlsZVBvcyIsImRkZCIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwic2l6ZSIsIm9mZnNldCIsImFwcGx5IiwiYWRkQ2hpbGQiLCJ0YWciLCJUYWdzIiwiY29sbGlkZXIiLCJwQyIsImdldFVJIiwiam95c3RpY2siLCJwbGF5ZXIiLCJ0aGVYIiwidGhlWSIsImRlc0RpciIsInJvdGF0ZSIsIm1pc2MiLCJyYWRpYW5zVG9EZWdyZWVzIiwiX2p1bXBUaW1lIiwibWFwQ2FtZXJhIiwiem9vbVJhdGlvIiwiZWFjaDBfMDUiLCJhY3QiLCJhY3RpdmUiLCJnYW1lQmVnaW4iLCJpc0luR2FtZSIsIkVWRU5UX0dBTUVfQkVHSU4iLCJsYW5kVXBQb3MiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJzaG93R3VuIiwic2hvd1BsYXllciIsInNob3dFbmVteSIsIl9wYXJhbSIsIl90eXBlIiwiSXRlbVR5cGUiLCJ3ZWFwb24iLCJfa2luZCIsInBvc05vZGUiLCJwb3NJblBpeGVsIiwibWFwU2l6ZSIsImdldENvbnRlbnRTaXplIiwidGlsZVNpemUiLCJnZXRUaWxlU2l6ZSIsImZsb29yIiwiYyIsInRlbXBQb3NBcnIiLCJzdGFuZGFyZEFyciIsInRhZ051bSIsImVuZW15IiwidXNlckRhdGEiLCJjaG9vc2VkU2tpbklkIiwianNvbkRhdGEiLCJSb2JvdE5hbWUiLCJpbkdhbWVLaWxsTnVtIiwiX2tpbGxOdW0iLCJfYmVsb25nTmFtZSIsIkVWRU5UX1NIT1dfQUxMUk9MRU5VTV9VSSIsIkVWRU5UX1VQREFURV9SQU5LX1NIT1ciLCJjbG9uZU9iakFyciIsImNvbmNhdCIsInRlbXBEaWN0IiwidGVtcEluZGV4IiwiaXNJbk1hcFNpZ2h0IiwiaW5kZXgiLCJzb3J0IiwiYSIsImIiLCJzZXRTaWJsaW5nSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7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Q3lLLHNCQUFyQztBQUNILEdBdmFJO0FBd2FMOUksRUFBQUEsT0F4YUsscUJBd2FLO0FBQ04sUUFBSStJLFdBQVcsR0FBRyxLQUFLcE0sYUFBTCxDQUFtQnNELFFBQW5CLENBQTRCK0ksTUFBNUIsRUFBbEI7QUFDQSxRQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxTQUFLLElBQUl0RyxDQUFULElBQWNtRyxXQUFkLEVBQTJCO0FBQ3ZCLFVBQUk3SyxPQUFPLENBQUMyRCxTQUFSLENBQWtCc0gsWUFBbEIsQ0FBK0JKLFdBQVcsQ0FBQ25HLENBQUQsQ0FBMUMsQ0FBSixFQUFvRDtBQUNoRHFHLFFBQUFBLFFBQVEsQ0FBQ2pILElBQVQsQ0FBYztBQUNWckIsVUFBQUEsQ0FBQyxFQUFFb0ksV0FBVyxDQUFDbkcsQ0FBRCxDQUFYLENBQWVqQyxDQURSO0FBRVZ5SSxVQUFBQSxLQUFLLEVBQUV4RztBQUZHLFNBQWQ7QUFJQXNHLFFBQUFBLFNBQVMsQ0FBQ2xILElBQVYsQ0FBZVksQ0FBZjtBQUNIO0FBQ0o7O0FBQ0RxRyxJQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBYyxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxhQUFVQSxDQUFDLENBQUM1SSxDQUFGLEdBQU0ySSxDQUFDLENBQUMzSSxDQUFsQjtBQUFBLEtBQWQ7O0FBQ0EsU0FBSyxJQUFJaUMsR0FBVCxJQUFjcUcsUUFBZCxFQUF3QjtBQUNwQkYsTUFBQUEsV0FBVyxDQUFDRSxRQUFRLENBQUNyRyxHQUFELENBQVIsQ0FBWXdHLEtBQWIsQ0FBWCxDQUErQkksZUFBL0IsQ0FBK0NQLFFBQVEsQ0FBQ3JHLEdBQUQsQ0FBdkQ7QUFDSCxLQWhCSyxDQWlCTjtBQUNBOztBQUNIO0FBM2JJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRpbGVkTWFwOiBjYy5UaWxlZE1hcCxcclxuICAgICAgICBvYmplY3RQcmVmYWI6IGNjLlByZWZhYixcclxuICAgICAgICBjb2xsaWRlclByZWZhYjogY2MuUHJlZmFiLFxyXG4gICAgICAgIGdyb3VuZEl0ZW1QcmVmYWI6IGNjLlByZWZhYixcclxuXHJcbiAgICAgICAgYWxsT2JqZWN0Tm9kZTogY2MuTm9kZSxcclxuICAgICAgICBhbGxDb2xsaWRlck5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgYWxsR3VuTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBvdGhlckd1blBvczogY2MuTm9kZSxcclxuICAgICAgICBlbmVteVNwYXduUG9zR3JvdXBOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIHBhcmF0cm9vcGVyTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBjbG91ZE5vZGU6IGNjLk5vZGUsXHJcblxyXG4gICAgICAgIG1hcEF0bGFzOiBjYy5TcHJpdGVBdGxhcyxcclxuXHJcbiAgICAgICAgX3RpbWVyMDogMC4xLFxyXG4gICAgICAgIF90aW1lcjogMC4xLFxyXG4gICAgICAgIHJlYWR5VG9Tb3J0OiBmYWxzZSxcclxuXHJcbiAgICAgICAgZ2FzUGFuZWw6IGNjLk5vZGUsXHJcbiAgICAgICAgZHJvcFBhbmVsOiBjYy5Ob2RlLFxyXG4gICAgICAgIGJvb21QYW5lbDogY2MuTm9kZSxcclxuICAgICAgICBzYWZlQ2lyY2xlOiAxMDI0MCxcclxuICAgICAgICBzYWZlUG9zaXRpb246IGNjLnYyKDAsIDApLFxyXG4gICAgICAgIF9nYXNTdGF0ZTogMCxcclxuICAgICAgICBzYWZlQ2lyY2xlOiAwLFxyXG4gICAgICAgIF9kcm9wVGltZTogMCxcclxuICAgICAgICBfbWlwQm94R3JvdXA6IFtdLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5vbihFdmVudE5hbWVzLkVWRU5UX1VQREFURV9HQVNfU0hPVywgdGhpcy51cGRhdGVHYXNTaG93LmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9EUk9QX0JPWCwgdGhpcy5kcm9wQm94LmJpbmQodGhpcykpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIub24oRXZlbnROYW1lcy5FVkVOVF9OT1RZRllfQk9YX0RJU01JU1MsIHRoaXMubm90aWZ5Qm94RGlzbWlzcy5iaW5kKHRoaXMpKVxyXG4gICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50TmFtZXMuRVZFTlRfRFJPUF9CT09NLCB0aGlzLmRyb3BCb29tLmJpbmQodGhpcykpXHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE1hcFNob3coKVxyXG4gICAgICAgIC8vIHRoaXMuc2hvd0Nsb3VkKClcclxuICAgICAgICAvLyB0aGlzLnNob3dQbGF5ZXIoKVxyXG4gICAgICAgIC8vIHRoaXMuc2hvd0VuZW15KClcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9VUERBVEVfR0FTX1NIT1cpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoRXZlbnROYW1lcy5FVkVOVF9EUk9QX0JPWClcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX05PVFlGWV9CT1hfRElTTUlTUylcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihFdmVudE5hbWVzLkVWRU5UX0RST1BfQk9PTSlcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdChfY2hvb3NlVHlwZSwgX2JpbGksIF9zcGVlZFVwSnVtcCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Nsb3VkKF9zcGVlZFVwSnVtcClcclxuICAgICAgICB0aGlzLnNob3dQYXJhdHJvb3BlclBsYXllcihfY2hvb3NlVHlwZSwgX2JpbGkpXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BhcmF0cm9vcGVyRW5lbXkoX2Nob29zZVR5cGUsIFRvb2xzLnJhbmRvbU51bSgwLCAxMDApIC8gMTAwKVxyXG4gICAgICAgIH0sIDAuMSwgMjksIDAuNSlcclxuICAgICAgICB0aGlzLmluaXRHYXMoKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZShkdCkge1xyXG4gICAgICAgIHRoaXMuZ2FzQ291bnREb3duKGR0KVxyXG4gICAgICAgIGlmICghdGhpcy5yZWFkeVRvU29ydCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyIC09IGR0XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHRoaXMuX3RpbWVyMFxyXG4gICAgICAgICAgICB0aGlzLnNvcnRBbGwoKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0R2FzKCkge1xyXG4gICAgICAgIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ud2lkdGggPSB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLmhlaWdodCA9IDEwMjQwICogKDMwMCAvIDIwNClcclxuICAgICAgICAvLyB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzBdLndpZHRoID0gdGhpcy5nYXNQYW5lbC5jaGlsZHJlblswXS5oZWlnaHQgPSB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLndpZHRoIC8gMC45OFxyXG4gICAgICAgIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVUbygxLCAyMDApLCBjYy5mYWRlVG8oMC44LCAyNTUpKS5yZXBlYXRGb3JldmVyKCkpXHJcbiAgICB9LFxyXG4gICAgdXBkYXRlR2FzU2hvdyhfc3RhdGUsIGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZ2FzU3RhdGUgPSBfc3RhdGVcclxuICAgICAgICB0aGlzLnNhZmVDaXJjbGUgPSAxMDI0MCAqIChldmVudC5zYWZlQ2lyY2xlIC8gMjA0KVxyXG4gICAgICAgIHRoaXMuc2FmZVBvc2l0aW9uLnggPSAxMDI0MCAqIChldmVudC5zYWZlUG9zaXRpb24ueCAvIDIwNClcclxuICAgICAgICB0aGlzLnNhZmVQb3NpdGlvbi55ID0gMTAyNDAgKiAoZXZlbnQuc2FmZVBvc2l0aW9uLnkgLyAyMDQpXHJcblxyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5nYXNDb25maWcgPSB7XHJcbiAgICAgICAgICAgIHNhZmVQb3NpdGlvbjogdGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS5wb3NpdGlvbixcclxuICAgICAgICAgICAgZ2FzQ2lyY2xlOiB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLndpZHRoXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdhc0NvdW50RG93bihkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNhZmVDaXJjbGUgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZ2FzU3RhdGUgPT0gMikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLndpZHRoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS53aWR0aCA8PSB0aGlzLnNhZmVDaXJjbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ud2lkdGggPSB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLmhlaWdodCA9IHRoaXMuc2FmZUNpcmNsZVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nYXNQYW5lbC5jaGlsZHJlblswXS53aWR0aCA9IHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMF0uaGVpZ2h0ID0gdGhpcy5zYWZlQ2lyY2xlIC8gMC45OFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2FmZUNpcmNsZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYWZlQ2lyY2xlIC09IDUwLy/kuLrkuoblj5jmiJDotJ/mlbBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVsdCA9IGR0ICogKCgxMCAvIDIwNCkgKiAxMDI0MClcclxuICAgICAgICAgICAgdGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS53aWR0aCAtPSBkZWx0XHJcbiAgICAgICAgICAgIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0uaGVpZ2h0IC09IGRlbHRcclxuICAgICAgICAgICAgLy8gdGhpcy5nYXNQYW5lbC5jaGlsZHJlblswXS53aWR0aCAtPSBkZWx0XHJcbiAgICAgICAgICAgIC8vIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMF0uaGVpZ2h0IC09IGRlbHRcclxuICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgIHNhZmVQb3NpdGlvbjogdGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGdhc0NpcmNsZTogdGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS53aWR0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhZmVDaXJjbGUgPT0gNTApIHJldHVyblxyXG4gICAgICAgICAgICBpZiAoIVRvb2xzLmlzSW50ZXJzZWN0KHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ucG9zaXRpb24sIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ud2lkdGggLyAyLCB0aGlzLnNhZmVQb3NpdGlvbiwgdGhpcy5zYWZlQ2lyY2xlIC8gMikpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS53aWR0aCAtIHRoaXMuc2FmZUNpcmNsZSkgPiAwLjAxKSAgLy/lpJblnIjlkozlhoXlnIjlnIblv4Pph43lkIgs5Y2K5b6E55u45ZCMXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gayA9IHkveFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHkgPSBreFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHheMit5XjIgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8geF4yID0gMS8oa14yKzEpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSAodGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS55IC0gdGhpcy5zYWZlUG9zaXRpb24ueSkgLyAodGhpcy5nYXNQYW5lbC5jaGlsZHJlblsxXS54IC0gdGhpcy5zYWZlUG9zaXRpb24ueCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4X29mZiA9IGRlbHQgKiBwYXJzZUZsb2F0KE1hdGguc3FydCgxIC8gKGsgKiBrICsgMSkpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDpgJrov4dtUG9pbnRfb3V0ZXLlkoxtUG9pbnRfaW5uZXLnmoR45Z2Q5qCH5p2l5Yik5pat5q2k5pe25aSW5ZyG5ZyG5b+D6KaB56e75Yqo55qE5piv6K+lICsgeF9vZmbvvIh46L205YGP56e76YeP77yJ6L+Y5pivIC14X29mZlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ueCArPSAxICogKHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ueCA8IHRoaXMuc2FmZVBvc2l0aW9uLnggPyAxIDogLTEpICogeF9vZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55+l6YGT5Y+Y5YyW5ZCO55qE5aSW5ZyI5ZyG5b+D55qEeOWdkOagh++8jOWSjOebtOe6v+aWueeoi+adpeaxguWvueW6lOeahHnlnZDmoIdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLnkgPSBrICogKHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ueCAtIHRoaXMuc2FmZVBvc2l0aW9uLngpICsgdGhpcy5zYWZlUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAvLyDpgJrov4dtUG9pbnRfb3V0ZXLlkoxtUG9pbnRfaW5uZXLnmoR45Z2Q5qCH5p2l5Yik5pat5q2k5pe25aSW5ZyG5ZyG5b+D6KaB56e75Yqo55qE5piv6K+lICsgeF9vZmbvvIh46L205YGP56e76YeP77yJ6L+Y5pivIC14X29mZlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMF0ueCArPSAxICogKHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ueCA8IHRoaXMuc2FmZVBvc2l0aW9uLnggPyAxIDogLTEpICogeF9vZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8g55+l6YGT5Y+Y5YyW5ZCO55qE5aSW5ZyI5ZyG5b+D55qEeOWdkOagh++8jOWSjOebtOe6v+aWueeoi+adpeaxguWvueW6lOeahHnlnZDmoIdcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzBdLnkgPSBrICogKHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ueCAtIHRoaXMuc2FmZVBvc2l0aW9uLngpICsgdGhpcy5zYWZlUG9zaXRpb24ueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmdhc0NvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FmZVBvc2l0aW9uOiB0aGlzLmdhc1BhbmVsLmNoaWxkcmVuWzFdLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXNDaXJjbGU6IHRoaXMuZ2FzUGFuZWwuY2hpbGRyZW5bMV0ud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHJvcEJveChfdGhlUG9zLCBfaW5kZXgpIHtcclxuICAgICAgICBfdGhlUG9zID0gKF90aGVQb3MuZGl2KDIwNCkpLm11bCgxMDI0MClcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdChcIkRyb3BCb3hcIiwgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbWlwQm94R3JvdXAucHVzaChub2RlKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsQm94QXJyLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihfdGhlUG9zKVxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkRyb3BCb3hcIikuaW5pdChUb29scy5nZXRJbmRleCh0aGlzLl9taXBCb3hHcm91cCwgbm9kZSkpXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZXZlbnRNYW5hZ2VyLmVtaXQoRXZlbnROYW1lcy5FVkVOVF9OT1RJRllfRU5FTVlfTUFQQk9YKVxyXG4gICAgICAgIH0sIHRoaXMuZHJvcFBhbmVsKVxyXG4gICAgfSxcclxuICAgIG5vdGlmeUJveERpc21pc3MoX2luZGV4KSB7XHJcbiAgICAgICAgVG9vbHMucmVtb3ZlQXJyYXkoR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbEJveEFyciwgdGhpcy5fbWlwQm94R3JvdXBbcGFyc2VJbnQoX2luZGV4KV0pXHJcbiAgICAgICAgdGhpcy5fbWlwQm94R3JvdXBbcGFyc2VJbnQoX2luZGV4KV0uZGVzdHJveSgpXHJcbiAgICB9LFxyXG4gICAgZHJvcEJvb20oX3RoZVBvcywgX3RoZVdpZHRoKSB7XHJcbiAgICAgICAgX3RoZVBvcyA9IChfdGhlUG9zLmRpdigyMDQpKS5tdWwoMTAyNDApXHJcbiAgICAgICAgX3RoZVdpZHRoID0gMTAyNDAgKiBfdGhlV2lkdGggLyAyMDRcclxuICAgICAgICBsZXQgYm9vbUFyciA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJvb21BcnIucHVzaChUb29scy5wb2ludE9mUmFuZG9tKF90aGVQb3MsIF90aGVXaWR0aCAvIDIsIDApKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyb3BJdEJvb20oYm9vbUFyciwgMClcclxuICAgIH0sXHJcbiAgICBkcm9wSXRCb29tKGJvb21BcnIsIF9pbmRleCkge1xyXG4gICAgICAgIGlmIChfaW5kZXggPj0gYm9vbUFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX05PVFlGWV9CT09NX0RJU01JU1MpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX2RlbGF5ID0gVG9vbHMucmFuZG9tTnVtKDAsIDIsIHRydWUpXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoX2RlbGF5KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdChcIkJvb21cIiwgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJvb21BcnJbX2luZGV4XSlcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oYm9vbUFycltfaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlblswXS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEsIGNjLnYyKDAsIC0yMjApKSwgY2MuZmFkZU91dCgwKSkpXHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuWzFdLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdib29tJylcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29saSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcilcclxuICAgICAgICAgICAgICAgICAgICBjb2xpLmVuYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZUFuaW0gPSBub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbilcclxuICAgICAgICAgICAgICAgICAgICB0aGVBbmltLnNldEFuaW1hdGlvbigwLCBcImJvb20xXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoZUFuaW0uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGkuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pKSlcclxuICAgICAgICAgICAgfSwgdGhpcy5ib29tUGFuZWwpXHJcbiAgICAgICAgICAgIHRoaXMuZHJvcEl0Qm9vbShib29tQXJyLCArK19pbmRleClcclxuICAgICAgICB9KSkpXHJcblxyXG4gICAgfSxcclxuICAgIGluaXRNYXBTaG93KCkge1xyXG4gICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyID0gW11cclxuICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyID0gW11cclxuICAgICAgICAvLyB0aGlzLm5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIGxldCB3YWxsTGF5ZXIgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyKFwid2FsbFwiKVxyXG4gICAgICAgIHRoaXMudGlsZWRNYXAuZ2V0T2JqZWN0R3JvdXAoXCJkeW5hbWljXCIpLl9vYmplY3RzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9iamVjdFByZWZhYilcclxuICAgICAgICAgICAgb2JqLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5tYXBBdGxhcy5nZXRTcHJpdGVGcmFtZShlbGVtZW50Lm5hbWUuc3BsaXQoJy4nKVswXSlcclxuICAgICAgICAgICAgb2JqLnBhcmVudCA9IHRoaXMuYWxsQ29sbGlkZXJOb2RlXHJcbiAgICAgICAgICAgIGxldCBkZXNQb3MgPSB3YWxsTGF5ZXIuZ2V0UG9zaXRpb25BdCh0aGlzLmdldFRpbGVQb3MoY2MudjIoZWxlbWVudC54LCBlbGVtZW50LnkpKSlcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKGRlc1BvcylcclxuICAgICAgICAgICAgbGV0IGRkZCA9IHRoaXMuYWxsT2JqZWN0Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihvYmouY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKSlcclxuICAgICAgICAgICAgb2JqLnBhcmVudCA9IHRoaXMuYWxsT2JqZWN0Tm9kZVxyXG4gICAgICAgICAgICBvYmouc2V0UG9zaXRpb24oZGRkKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudGlsZWRNYXAuZ2V0T2JqZWN0R3JvdXAoXCJjb2xsaXNpb25cIikuX29iamVjdHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29sbGlkZXJQcmVmYWIpXHJcbiAgICAgICAgICAgIGxldCBjb2xpID0gb2JqLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpXHJcbiAgICAgICAgICAgIGNvbGkuc2l6ZSA9IGNjLnNpemUoZWxlbWVudC53aWR0aCwgZWxlbWVudC5oZWlnaHQpXHJcbiAgICAgICAgICAgIGNvbGkub2Zmc2V0ID0gY2MudjIoZWxlbWVudC53aWR0aCAvIDIsIC1lbGVtZW50LmhlaWdodCAvIDIpXHJcbiAgICAgICAgICAgIGNvbGkuYXBwbHkoKVxyXG4gICAgICAgICAgICB0aGlzLmFsbENvbGxpZGVyTm9kZS5hZGRDaGlsZChvYmopXHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbihjYy52MihlbGVtZW50LngsIGVsZW1lbnQueSkpXHJcbiAgICAgICAgICAgIGNvbGkudGFnID0gVGFncy5jb2xsaWRlclxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNob3dQYXJhdHJvb3BlclBsYXllcihfY2hvb3NlVHlwZSwgX2JpbGkpIHtcclxuICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdCgnUGFyYXRyb29wZXJQbGF5ZXInLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcEMgPSBub2RlLmdldENvbXBvbmVudCgnUGFyYXRyb29wZXJQbGF5ZXInKVxyXG4gICAgICAgICAgICBwQy5pbml0KHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlbilcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuZ2V0VUkoXCJHYW1lVUlcIikuZ2V0Q29tcG9uZW50KFwiR2FtZVVJXCIpLmpveXN0aWNrLmdldENvbXBvbmVudChcIkpveXN0aWNrXCIpLnBsYXllciA9IHBDXHJcbiAgICAgICAgICAgIHZhciB0aGVYID0gMFxyXG4gICAgICAgICAgICB2YXIgdGhlWSA9IDBcclxuICAgICAgICAgICAgaWYgKF9jaG9vc2VUeXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoZVggPSAodGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzNdLnggLSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bMF0ueCkgKiBfYmlsaSAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblszXS54XHJcbiAgICAgICAgICAgICAgICB0aGVZID0gKHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblszXS55IC0gdGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzBdLnkpICogX2JpbGkgLSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bM10ueVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhlWCA9ICh0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bMV0ueCAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblsyXS54KSAqIF9iaWxpIC0gdGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzFdLnhcclxuICAgICAgICAgICAgICAgIHRoZVkgPSAodGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzFdLnkgLSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bMl0ueSkgKiBfYmlsaSAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblsxXS55XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGVYLCB0aGVZKVxyXG4gICAgICAgIH0sIHRoaXMucGFyYXRyb29wZXJOb2RlKVxyXG4gICAgfSxcclxuICAgIHNob3dQYXJhdHJvb3BlckVuZW15KF9jaG9vc2VUeXBlLCBfYmlsaSkge1xyXG4gICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLnNob3dHYW1lT2JqZWN0KCdQYXJhdHJvb3BlckVuZW15JywgKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1BhcmF0cm9vcGVyRW5lbXknKS5pbml0KHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlbilcclxuICAgICAgICAgICAgdmFyIHRoZVggPSAwXHJcbiAgICAgICAgICAgIHZhciB0aGVZID0gMFxyXG4gICAgICAgICAgICBpZiAoX2Nob29zZVR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhlWCA9ICh0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bM10ueCAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblswXS54KSAqIF9iaWxpIC0gdGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzNdLnhcclxuICAgICAgICAgICAgICAgIHRoZVkgPSAodGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzBdLnkgLSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bM10ueSkgKiBfYmlsaSAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblswXS55XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGVYID0gKHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblsxXS54IC0gdGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzJdLngpICogX2JpbGkgLSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bMV0ueFxyXG4gICAgICAgICAgICAgICAgdGhlWSA9ICh0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5bMV0ueSAtIHRoaXMuZW5lbXlTcGF3blBvc0dyb3VwTm9kZS5jaGlsZHJlblsyXS55KSAqIF9iaWxpIC0gdGhpcy5lbmVteVNwYXduUG9zR3JvdXBOb2RlLmNoaWxkcmVuWzFdLnlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoZVgsIHRoZVkpXHJcbiAgICAgICAgICAgIHZhciBkZXNEaXIgPSBjYy52MigwLCAxMCkucm90YXRlKGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhUb29scy5yYW5kb21OdW0oMCwgMzYwKSkpXHJcbiAgICAgICAgICAgIC8vIHZhciByYW5kVGltZSA9IFRvb2xzLnJhbmRvbU51bSgyLCA0KVxyXG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLm1vdmVCeSgwLjEsIGRlc0RpcikpKVxyXG5cclxuICAgICAgICB9LCB0aGlzLnBhcmF0cm9vcGVyTm9kZSlcclxuICAgIH0sXHJcbiAgICBzaG93Q2xvdWQoX3NwZWVkVXBKdW1wKSB7XHJcbiAgICAgICAgdmFyIF9qdW1wVGltZSA9IDJcclxuICAgICAgICBpZiAoX3NwZWVkVXBKdW1wKSB7XHJcbiAgICAgICAgICAgIF9qdW1wVGltZSA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIubWFwQ2FtZXJhLnpvb21SYXRpbyA9IDAuM1xyXG4gICAgICAgIHZhciBlYWNoMF8wNSA9IDAuMyAvICgzLjYgKyBfanVtcFRpbWUgKiAzKSAvIDEwMCAqIDVcclxuICAgICAgICB2YXIgYWN0ID0gY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoR2FtZUFwcC51aU1hbmFnZXIubWFwQ2FtZXJhLnpvb21SYXRpbyA+PSAwLjgpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLm1hcENhbWVyYS56b29tUmF0aW8gPSAwLjhcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLm1hcENhbWVyYS56b29tUmF0aW8gKz0gZWFjaDBfMDUvLzAuMDAxNTYyNVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMC4wNSkpLnJlcGVhdEZvcmV2ZXIoKVxyXG4gICAgICAgIHRoaXMuY2xvdWROb2RlLnJ1bkFjdGlvbihhY3QpXHJcbiAgICAgICAgX2p1bXBUaW1lID0gX2p1bXBUaW1lID8gX2p1bXBUaW1lIDogMlxyXG4gICAgICAgIHRoaXMuY2xvdWROb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgnc2t5ZGl2aW5nQmVnaW4nLCBudWxsLCAxKVxyXG4gICAgICAgICAgICB0aGlzLmNsb3VkTm9kZS5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bM10uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoX2p1bXBUaW1lKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdza3lkaXZpbmdXaW5kJywgbnVsbCwgMilcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMC4zKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3VkTm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKF9qdW1wVGltZSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKDAuMyksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG91ZE5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0pLCBjYy5kZWxheVRpbWUoMC4zKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3VkTm9kZS5jaGlsZHJlblszXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZShfanVtcFRpbWUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzJdLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSksIGNjLmRlbGF5VGltZSgwLjMpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvdWROb2RlLmNoaWxkcmVuWzNdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9KSwgY2MuZGVsYXlUaW1lKF9qdW1wVGltZSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coR2FtZUFwcC51aU1hbmFnZXIubWFwQ2FtZXJhLnpvb21SYXRpbylcclxuICAgICAgICAgICAgdGhpcy5nYW1lQmVnaW4oX3NwZWVkVXBKdW1wKVxyXG4gICAgICAgIH0pKSlcclxuICAgIH0sXHJcbiAgICBnYW1lQmVnaW4oX3NwZWVkVXBKdW1wKSB7XHJcbiAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmlzSW5HYW1lID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuY2xvdWROb2RlLmRlc3Ryb3koKVxyXG4gICAgICAgIEdhbWVBcHAudWlNYW5hZ2VyLm1hcENhbWVyYS56b29tUmF0aW8gPSAwLjhcclxuICAgICAgICBHYW1lQXBwLmF1ZGlvTWFuYWdlci5wbGF5RWZmZWN0KCdza3lkaXZpbmdUb0dyb3VuZCcsIG51bGwsIDEpXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX0dBTUVfQkVHSU4pXHJcbiAgICAgICAgdmFyIGxhbmRVcFBvcyA9IHRoaXMucGFyYXRyb29wZXJOb2RlLmNoaWxkcmVuWzBdLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5wYXJhdHJvb3Blck5vZGUuZGVzdHJveUFsbENoaWxkcmVuKClcclxuICAgICAgICB0aGlzLnNob3dHdW4oKVxyXG4gICAgICAgIHRoaXMuc2hvd1BsYXllcihsYW5kVXBQb3MpXHJcbiAgICAgICAgaWYgKF9zcGVlZFVwSnVtcCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSg1KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RW5lbXkoKVxyXG4gICAgICAgICAgICB9KSkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RW5lbXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd0d1bigpIHtcclxuICAgICAgICBsZXQgd2FsbExheWVyID0gdGhpcy50aWxlZE1hcC5nZXRMYXllcihcIndhbGxcIilcclxuICAgICAgICB0aGlzLnRpbGVkTWFwLmdldE9iamVjdEdyb3VwKFwiZ3Jhc3NcIikuX29iamVjdHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgLy8gdmFyIGVsZW1lbnQgPSB0aGlzLnRpbGVkTWFwLmdldE9iamVjdEdyb3VwKFwiZ3VuXCIpLl9vYmplY3RzWzBdXHJcbiAgICAgICAgICAgIGxldCBvYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdyb3VuZEl0ZW1QcmVmYWIpXHJcbiAgICAgICAgICAgIG9iai5wYXJlbnQgPSB0aGlzLmFsbENvbGxpZGVyTm9kZVxyXG4gICAgICAgICAgICBsZXQgZGVzUG9zID0gd2FsbExheWVyLmdldFBvc2l0aW9uQXQodGhpcy5nZXRUaWxlUG9zKGNjLnYyKGVsZW1lbnQueCwgZWxlbWVudC55KSkpXHJcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbihkZXNQb3MpXHJcbiAgICAgICAgICAgIGxldCBkZGQgPSB0aGlzLmFsbEd1bk5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIob2JqLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkpXHJcbiAgICAgICAgICAgIG9iai5wYXJlbnQgPSB0aGlzLmFsbEd1bk5vZGVcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKGRkZClcclxuICAgICAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIF90eXBlOiBJdGVtVHlwZS53ZWFwb24sXHJcbiAgICAgICAgICAgICAgICBfa2luZDogVG9vbHMucmFuZG9tTnVtKDAsIDUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLmdldENvbXBvbmVudCgnR3JvdW5kSXRlbScpLmluaXQoX3BhcmFtKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyLnB1c2gob2JqKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3RoZXJHdW5Qb3MuY2hpbGRyZW4uZm9yRWFjaChwb3NOb2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ3JvdW5kSXRlbVByZWZhYilcclxuICAgICAgICAgICAgbGV0IGRkZCA9IHRoaXMuYWxsR3VuTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3NOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSkpXHJcbiAgICAgICAgICAgIG9iai5wYXJlbnQgPSB0aGlzLmFsbEd1bk5vZGVcclxuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uKGRkZClcclxuICAgICAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIF90eXBlOiBJdGVtVHlwZS53ZWFwb24sXHJcbiAgICAgICAgICAgICAgICBfa2luZDogVG9vbHMucmFuZG9tTnVtKDAsIDUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqLmdldENvbXBvbmVudCgnR3JvdW5kSXRlbScpLmluaXQoX3BhcmFtKVxyXG4gICAgICAgICAgICBHYW1lQXBwLmRhdGFNYW5hZ2VyLmdsb2JhbERhdGEuYWxsR3VuQXJyLnB1c2gob2JqKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5bCG5YOP57Sg5Z2Q5qCH6L2s5YyW5Li655Om54mH5Z2Q5qCH77yMcG9zSW5QaXhlbO+8muebruagh+iKgueCueeahHBvc2l0aW9uXHJcbiAgICBnZXRUaWxlUG9zKHBvc0luUGl4ZWwpIHtcclxuICAgICAgICB2YXIgbWFwU2l6ZSA9IHRoaXMudGlsZWRNYXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IHRoaXMudGlsZWRNYXAuZ2V0VGlsZVNpemUoKTtcclxuICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IocG9zSW5QaXhlbC54IC8gdGlsZVNpemUud2lkdGgpO1xyXG4gICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcigobWFwU2l6ZS5oZWlnaHQgLSBwb3NJblBpeGVsLnkpIC8gdGlsZVNpemUuaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dQbGF5ZXIobGFuZFVwUG9zKSB7XHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd0dhbWVPYmplY3QoJ1BsYXllcicsIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihsYW5kVXBQb3MpXHJcbiAgICAgICAgICAgIHZhciBjID0gbm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJcIilcclxuICAgICAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuZ2V0VUkoXCJHYW1lVUlcIikuZ2V0Q29tcG9uZW50KFwiR2FtZVVJXCIpLmpveXN0aWNrLmdldENvbXBvbmVudChcIkpveXN0aWNrXCIpLnBsYXllciA9IGNcclxuICAgICAgICAgICAgYy5pbml0KClcclxuXHJcbiAgICAgICAgICAgIEdhbWVBcHAuZGF0YU1hbmFnZXIuZ2xvYmFsRGF0YS5hbGxSb2xlQXJyLnB1c2goYylcclxuICAgICAgICAgICAgLy8gdGhpcy5yZWFkeVRvU29ydCA9IHRydWVcclxuICAgICAgICB9LCB0aGlzLmFsbE9iamVjdE5vZGUpXHJcbiAgICB9LFxyXG4gICAgc2hvd0VuZW15KCkge1xyXG4gICAgICAgIHZhciB0ZW1wUG9zQXJyID0gW11cclxuICAgICAgICB2YXIgc3RhbmRhcmRBcnIgPSB0aGlzLmVuZW15U3Bhd25Qb3NHcm91cE5vZGUuY2hpbGRyZW5cclxuICAgICAgICAvLyB2YXIgeFJhbmdlQXJyID0gW11cclxuICAgICAgICAvLyB2YXIgZWFjaFNwYWNlWCA9IChzdGFuZGFyZEFyclsxXS54IC0gc3RhbmRhcmRBcnJbMF0ueCkgLyA2XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAvLyAgICAgeFJhbmdlQXJyLnB1c2goc3RhbmRhcmRBcnJbMF0ueCArIGVhY2hTcGFjZVggKiBpKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB2YXIgeVJhbmdlQXJyID0gW11cclxuICAgICAgICAvLyB2YXIgZWFjaFNwYWNlWSA9IChzdGFuZGFyZEFyclsyXS55IC0gc3RhbmRhcmRBcnJbMF0ueSkgLyA1XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAvLyAgICAgeVJhbmdlQXJyLnB1c2goc3RhbmRhcmRBcnJbMF0ueSArIGVhY2hTcGFjZVkgKiBpKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHhSYW5nZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHlSYW5nZUFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8vICAgICAgICAgdGVtcFBvc0Fyci5wdXNoKGNjLnYyKHhSYW5nZUFycltpXSwgeVJhbmdlQXJyW2pdKSlcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcclxuICAgICAgICAgICAgdGVtcFBvc0Fyci5wdXNoKGNjLnYyKFRvb2xzLnJhbmRvbU51bShzdGFuZGFyZEFyclswXS54LCBzdGFuZGFyZEFyclsxXS54KSwgVG9vbHMucmFuZG9tTnVtKHN0YW5kYXJkQXJyWzJdLnksIHN0YW5kYXJkQXJyWzBdLnkpKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGVtcFBvc0FyciA9IFRvb2xzLmdldFJhbmRvbUFtb3VudEVsZW1lbnRVblJlcGVhdCh0ZW1wUG9zQXJyLCAzMClcclxuICAgICAgICB2YXIgdGFnTnVtID0gVGFncy5lbmVteVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcFBvc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSArIDEgPT0gR2FtZUFwcC5kYXRhTWFuYWdlci51c2VyRGF0YS5jaG9vc2VkU2tpbklkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lQXBwLnVpTWFuYWdlci5zaG93R2FtZU9iamVjdCgnRW5lbXknLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnIucHVzaChub2RlKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKS50YWcgPSB0YWdOdW0rK1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0ZW1wUG9zQXJyW2ldKVxyXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBub2RlLmdldENvbXBvbmVudChcIkVuZW15XCIpXHJcbiAgICAgICAgICAgICAgICBjLmluaXQoaSArIDEsIEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuUm9ib3ROYW1lW2ldKVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmluR2FtZUtpbGxOdW0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgX2tpbGxOdW06IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgX2JlbG9uZ05hbWU6IEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuUm9ib3ROYW1lW2ldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgR2FtZUFwcC5kYXRhTWFuYWdlci5nbG9iYWxEYXRhLmFsbFJvbGVBcnIucHVzaChjKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkeVRvU29ydCA9IHRydWVcclxuICAgICAgICAgICAgfSwgdGhpcy5hbGxPYmplY3ROb2RlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZUFwcC5ldmVudE1hbmFnZXIuZW1pdChFdmVudE5hbWVzLkVWRU5UX1NIT1dfQUxMUk9MRU5VTV9VSSlcclxuICAgICAgICBHYW1lQXBwLmV2ZW50TWFuYWdlci5lbWl0KEV2ZW50TmFtZXMuRVZFTlRfVVBEQVRFX1JBTktfU0hPVylcclxuICAgIH0sXHJcbiAgICBzb3J0QWxsKCkge1xyXG4gICAgICAgIHZhciBjbG9uZU9iakFyciA9IHRoaXMuYWxsT2JqZWN0Tm9kZS5jaGlsZHJlbi5jb25jYXQoKVxyXG4gICAgICAgIHZhciB0ZW1wRGljdCA9IFtdXHJcbiAgICAgICAgdmFyIHRlbXBJbmRleCA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBjbG9uZU9iakFycikge1xyXG4gICAgICAgICAgICBpZiAoR2FtZUFwcC51aU1hbmFnZXIuaXNJbk1hcFNpZ2h0KGNsb25lT2JqQXJyW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdGVtcERpY3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgeTogY2xvbmVPYmpBcnJbaV0ueSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRlbXBJbmRleC5wdXNoKGkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcERpY3Quc29ydCgoYSwgYikgPT4gYi55IC0gYS55KVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGVtcERpY3QpIHtcclxuICAgICAgICAgICAgY2xvbmVPYmpBcnJbdGVtcERpY3RbaV0uaW5kZXhdLnNldFNpYmxpbmdJbmRleCh0ZW1wRGljdFtpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVtcERpY3QpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hbGxPYmplY3ROb2RlLmNoaWxkcmVuKVxyXG4gICAgfVxyXG59KTtcclxuIl19