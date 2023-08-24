
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/GroundItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ac97Fj4dlJab4T+HVu8epF', 'GroundItem');
// scripts/game/GroundItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    itemType: {
      "default": {}
    }
  },
  onLoad: function onLoad() {
    this.getComponent(cc.PhysicsBoxCollider).tag = Tags.item;
    this.doAnim();
  },
  doAnim: function doAnim() {
    this.node.children[0].runAction(cc.sequence(cc.fadeOut(0.6), cc.fadeIn(0.3)).repeatForever());
    this.node.children[1].runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 10)), cc.moveBy(0.5, cc.v2(0, -10))).repeatForever());
  },
  init: function init(_param, _spriteFrame) {
    _param && (this.itemType = _param); // if (true) {

    if (this.itemType._type == ItemType.weapon) {
      this.node.children[2].active = false;
      this.node.children[1].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("item_weapon_" + GameApp.dataManager.jsonData.WeaponData[_param._kind].skinname);
    } else {
      this.node.children[2].getComponent(cc.Label).string = GameApp.dataManager.jsonData.WeaponData[this.itemType._kind].name;
      this.node.children[2].active = true;
      this.node.children[1].getComponent(cc.Sprite).spriteFrame = GameApp.uiManager.commonAtlas.getSpriteFrame("item_equip_1_valid");
    }
  } // setItemIcon(id) {
  //     var self = this
  //     cc.loader.loadRes("texture/skin_piece/card_p_" + id, cc.SpriteFrame, function (err, spriteFrame) {
  //         self.methodBtnGroup[2].children[0].getComponent(cc.Sprite).spriteFrame = spriteFrame
  //     });
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcR3JvdW5kSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIml0ZW1UeXBlIiwib25Mb2FkIiwiZ2V0Q29tcG9uZW50IiwiUGh5c2ljc0JveENvbGxpZGVyIiwidGFnIiwiVGFncyIsIml0ZW0iLCJkb0FuaW0iLCJub2RlIiwiY2hpbGRyZW4iLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImZhZGVPdXQiLCJmYWRlSW4iLCJyZXBlYXRGb3JldmVyIiwibW92ZUJ5IiwidjIiLCJpbml0IiwiX3BhcmFtIiwiX3Nwcml0ZUZyYW1lIiwiX3R5cGUiLCJJdGVtVHlwZSIsIndlYXBvbiIsImFjdGl2ZSIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiR2FtZUFwcCIsInVpTWFuYWdlciIsImNvbW1vbkF0bGFzIiwiZ2V0U3ByaXRlRnJhbWUiLCJkYXRhTWFuYWdlciIsImpzb25EYXRhIiwiV2VhcG9uRGF0YSIsIl9raW5kIiwic2tpbm5hbWUiLCJMYWJlbCIsInN0cmluZyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUztBQURIO0FBREYsR0FIUDtBQVVMQyxFQUFBQSxNQVZLLG9CQVVJO0FBQ0wsU0FBS0MsWUFBTCxDQUFrQk4sRUFBRSxDQUFDTyxrQkFBckIsRUFBeUNDLEdBQXpDLEdBQStDQyxJQUFJLENBQUNDLElBQXBEO0FBQ0EsU0FBS0MsTUFBTDtBQUNILEdBYkk7QUFjTEEsRUFBQUEsTUFkSyxvQkFjSTtBQUNMLFNBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQkMsU0FBdEIsQ0FBZ0NkLEVBQUUsQ0FBQ2UsUUFBSCxDQUFZZixFQUFFLENBQUNnQixPQUFILENBQVcsR0FBWCxDQUFaLEVBQTZCaEIsRUFBRSxDQUFDaUIsTUFBSCxDQUFVLEdBQVYsQ0FBN0IsRUFBNkNDLGFBQTdDLEVBQWhDO0FBQ0EsU0FBS04sSUFBTCxDQUFVQyxRQUFWLENBQW1CLENBQW5CLEVBQXNCQyxTQUF0QixDQUFnQ2QsRUFBRSxDQUFDZSxRQUFILENBQVlmLEVBQUUsQ0FBQ21CLE1BQUgsQ0FBVSxHQUFWLEVBQWVuQixFQUFFLENBQUNvQixFQUFILENBQU0sQ0FBTixFQUFTLEVBQVQsQ0FBZixDQUFaLEVBQTBDcEIsRUFBRSxDQUFDbUIsTUFBSCxDQUFVLEdBQVYsRUFBZW5CLEVBQUUsQ0FBQ29CLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBQyxFQUFWLENBQWYsQ0FBMUMsRUFBeUVGLGFBQXpFLEVBQWhDO0FBQ0gsR0FqQkk7QUFrQkxHLEVBQUFBLElBbEJLLGdCQWtCQUMsTUFsQkEsRUFrQlFDLFlBbEJSLEVBa0JzQjtBQUN2QkQsSUFBQUEsTUFBTSxLQUFLLEtBQUtsQixRQUFMLEdBQWdCa0IsTUFBckIsQ0FBTixDQUR1QixDQUV2Qjs7QUFDQSxRQUFJLEtBQUtsQixRQUFMLENBQWNvQixLQUFkLElBQXVCQyxRQUFRLENBQUNDLE1BQXBDLEVBQTRDO0FBQ3hDLFdBQUtkLElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQmMsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxXQUFLZixJQUFMLENBQVVDLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JQLFlBQXRCLENBQW1DTixFQUFFLENBQUM0QixNQUF0QyxFQUE4Q0MsV0FBOUMsR0FBNERDLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQkMsV0FBbEIsQ0FBOEJDLGNBQTlCLENBQTZDLGlCQUFpQkgsT0FBTyxDQUFDSSxXQUFSLENBQW9CQyxRQUFwQixDQUE2QkMsVUFBN0IsQ0FBd0NkLE1BQU0sQ0FBQ2UsS0FBL0MsRUFBc0RDLFFBQXBILENBQTVEO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBSzFCLElBQUwsQ0FBVUMsUUFBVixDQUFtQixDQUFuQixFQUFzQlAsWUFBdEIsQ0FBbUNOLEVBQUUsQ0FBQ3VDLEtBQXRDLEVBQTZDQyxNQUE3QyxHQUFzRFYsT0FBTyxDQUFDSSxXQUFSLENBQW9CQyxRQUFwQixDQUE2QkMsVUFBN0IsQ0FBd0MsS0FBS2hDLFFBQUwsQ0FBY2lDLEtBQXRELEVBQTZESSxJQUFuSDtBQUNBLFdBQUs3QixJQUFMLENBQVVDLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0JjLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsV0FBS2YsSUFBTCxDQUFVQyxRQUFWLENBQW1CLENBQW5CLEVBQXNCUCxZQUF0QixDQUFtQ04sRUFBRSxDQUFDNEIsTUFBdEMsRUFBOENDLFdBQTlDLEdBQTREQyxPQUFPLENBQUNDLFNBQVIsQ0FBa0JDLFdBQWxCLENBQThCQyxjQUE5QixDQUE2QyxvQkFBN0MsQ0FBNUQ7QUFDSDtBQUdKLEdBL0JJLENBZ0NMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFyQ0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaXRlbVR5cGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICB9LFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcikudGFnID0gVGFncy5pdGVtXHJcbiAgICAgICAgdGhpcy5kb0FuaW0oKVxyXG4gICAgfSxcclxuICAgIGRvQW5pbSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC42KSwgY2MuZmFkZUluKDAuMykpLnJlcGVhdEZvcmV2ZXIoKSlcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjUsIGNjLnYyKDAsIDEwKSksIGNjLm1vdmVCeSgwLjUsIGNjLnYyKDAsIC0xMCkpKS5yZXBlYXRGb3JldmVyKCkpXHJcbiAgICB9LFxyXG4gICAgaW5pdChfcGFyYW0sIF9zcHJpdGVGcmFtZSkge1xyXG4gICAgICAgIF9wYXJhbSAmJiAodGhpcy5pdGVtVHlwZSA9IF9wYXJhbSlcclxuICAgICAgICAvLyBpZiAodHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1UeXBlLl90eXBlID09IEl0ZW1UeXBlLndlYXBvbikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMl0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gR2FtZUFwcC51aU1hbmFnZXIuY29tbW9uQXRsYXMuZ2V0U3ByaXRlRnJhbWUoXCJpdGVtX3dlYXBvbl9cIiArIEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuV2VhcG9uRGF0YVtfcGFyYW0uX2tpbmRdLnNraW5uYW1lKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IEdhbWVBcHAuZGF0YU1hbmFnZXIuanNvbkRhdGEuV2VhcG9uRGF0YVt0aGlzLml0ZW1UeXBlLl9raW5kXS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEdhbWVBcHAudWlNYW5hZ2VyLmNvbW1vbkF0bGFzLmdldFNwcml0ZUZyYW1lKFwiaXRlbV9lcXVpcF8xX3ZhbGlkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy8gc2V0SXRlbUljb24oaWQpIHtcclxuICAgIC8vICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgIC8vICAgICBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvc2tpbl9waWVjZS9jYXJkX3BfXCIgKyBpZCwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAvLyAgICAgICAgIHNlbGYubWV0aG9kQnRuR3JvdXBbMl0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfSxcclxufSk7XHJcbiJdfQ==