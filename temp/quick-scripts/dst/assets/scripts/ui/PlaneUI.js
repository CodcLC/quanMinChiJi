
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/PlaneUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31f24zVlipJbrVcAJ0zIaIp', 'PlaneUI');
// scripts/ui/PlaneUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    planeNode: cc.Node,
    mapNode: cc.Node,
    _chooseType: 0,
    //0是左对角,1是右对角
    _speedUp: false
  },
  onLoad: function onLoad() {},
  init: function init(_speedUp) {
    this._speedUp = _speedUp;
    var angleArr = [-135, 135, 45, -45];
    var posIndex = Tools.randomNum(0, 3);
    this._chooseType = posIndex % 2;
    this.planeNode.setPosition(this.node.children[0].convertToNodeSpaceAR(this.mapNode.children[posIndex].convertToWorldSpaceAR(cc.v2(0, 0))));
    this.planeNode.angle = angleArr[posIndex];

    switch (posIndex) {
      case 0:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[2].position));
        break;

      case 1:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[3].position));
        break;

      case 2:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[0].position));
        break;

      case 3:
        this.planeNode.runAction(cc.moveTo(5, this.mapNode.children[1].position));
        break;
    }

    GameApp.audioManager.playEffect('plane', 1, 2);
  },
  // update (dt) {},
  jumpBtnClick: function jumpBtnClick() {
    var _this = this;

    GameApp.audioManager.playEffect('click');
    this.planeNode.stopAllActions();
    GameApp.uiManager.showUI('GameUI', function (node) {
      var allL = 0;
      var curL = 0; // var tempChooseType = this._chooseType % 2

      if (_this._chooseType == 0) {
        allL = cc.v2(_this.mapNode.children[0].position).sub(_this.mapNode.children[2].position).mag();
        curL = cc.v2(_this.planeNode.position).sub(_this.mapNode.children[0].position).mag();
      } else {
        allL = cc.v2(_this.mapNode.children[1].position).sub(_this.mapNode.children[3].position).mag();
        curL = cc.v2(_this.planeNode.position).sub(_this.mapNode.children[3].position).mag();
      }

      var bili = curL / allL;
      node.getComponent("GameUI").init(_this._chooseType, bili, _this._speedUp);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFBsYW5lVUkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwbGFuZU5vZGUiLCJOb2RlIiwibWFwTm9kZSIsIl9jaG9vc2VUeXBlIiwiX3NwZWVkVXAiLCJvbkxvYWQiLCJpbml0IiwiYW5nbGVBcnIiLCJwb3NJbmRleCIsIlRvb2xzIiwicmFuZG9tTnVtIiwic2V0UG9zaXRpb24iLCJub2RlIiwiY2hpbGRyZW4iLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsInYyIiwiYW5nbGUiLCJydW5BY3Rpb24iLCJtb3ZlVG8iLCJwb3NpdGlvbiIsIkdhbWVBcHAiLCJhdWRpb01hbmFnZXIiLCJwbGF5RWZmZWN0IiwianVtcEJ0bkNsaWNrIiwic3RvcEFsbEFjdGlvbnMiLCJ1aU1hbmFnZXIiLCJzaG93VUkiLCJhbGxMIiwiY3VyTCIsInN1YiIsIm1hZyIsImJpbGkiLCJnZXRDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFETjtBQUVSQyxJQUFBQSxPQUFPLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGSjtBQUdSRSxJQUFBQSxXQUFXLEVBQUUsQ0FITDtBQUdRO0FBQ2hCQyxJQUFBQSxRQUFRLEVBQUU7QUFKRixHQUhQO0FBVUxDLEVBQUFBLE1BVkssb0JBVUksQ0FFUixDQVpJO0FBYUxDLEVBQUFBLElBYkssZ0JBYUFGLFFBYkEsRUFhVTtBQUNYLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsUUFBSUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEVBQVosRUFBZ0IsQ0FBQyxFQUFqQixD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QUFhVyxRQUFiLENBQXNCLENBQXRCLEVBQXlCTyxRQUEvQixFQUF5Q1UsR0FBekMsQ0FBNkMsS0FBSSxDQUFDNUIsT0FBTCxDQUFhVyxRQUFiLENBQXNCLENBQXRCLEVBQXlCTyxRQUF0RSxFQUFnRlcsR0FBaEYsRUFBUDtBQUNBRixRQUFBQSxJQUFJLEdBQUdqQyxFQUFFLENBQUNvQixFQUFILENBQU0sS0FBSSxDQUFDaEIsU0FBTCxDQUFlb0IsUUFBckIsRUFBK0JVLEdBQS9CLENBQW1DLEtBQUksQ0FBQzVCLE9BQUwsQ0FBYVcsUUFBYixDQUFzQixDQUF0QixFQUF5Qk8sUUFBNUQsRUFBc0VXLEdBQXRFLEVBQVA7QUFDSDs7QUFDRCxVQUFJQyxJQUFJLEdBQUdILElBQUksR0FBR0QsSUFBbEI7QUFDQWhCLE1BQUFBLElBQUksQ0FBQ3FCLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIzQixJQUE1QixDQUFpQyxLQUFJLENBQUNILFdBQXRDLEVBQW1ENkIsSUFBbkQsRUFBeUQsS0FBSSxDQUFDNUIsUUFBOUQ7QUFDSCxLQWJEO0FBY0g7QUE5Q0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcGxhbmVOb2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIG1hcE5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgX2Nob29zZVR5cGU6IDAsIC8vMOaYr+W3puWvueinkiwx5piv5Y+z5a+56KeSXHJcbiAgICAgICAgX3NwZWVkVXA6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXQoX3NwZWVkVXApIHtcclxuICAgICAgICB0aGlzLl9zcGVlZFVwID0gX3NwZWVkVXBcclxuICAgICAgICB2YXIgYW5nbGVBcnIgPSBbLTEzNSwgMTM1LCA0NSwgLTQ1XVxyXG4gICAgICAgIHZhciBwb3NJbmRleCA9IFRvb2xzLnJhbmRvbU51bSgwLCAzKVxyXG4gICAgICAgIHRoaXMuX2Nob29zZVR5cGUgPSBwb3NJbmRleCAlIDJcclxuICAgICAgICB0aGlzLnBsYW5lTm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuY2hpbGRyZW5bMF0uY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5tYXBOb2RlLmNoaWxkcmVuW3Bvc0luZGV4XS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpKSlcclxuICAgICAgICB0aGlzLnBsYW5lTm9kZS5hbmdsZSA9IGFuZ2xlQXJyW3Bvc0luZGV4XVxyXG4gICAgICAgIHN3aXRjaCAocG9zSW5kZXgpIHtcclxuICAgICAgICAgICAgY2FzZSAwOiB0aGlzLnBsYW5lTm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDUsIHRoaXMubWFwTm9kZS5jaGlsZHJlblsyXS5wb3NpdGlvbikpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOiB0aGlzLnBsYW5lTm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDUsIHRoaXMubWFwTm9kZS5jaGlsZHJlblszXS5wb3NpdGlvbikpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOiB0aGlzLnBsYW5lTm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDUsIHRoaXMubWFwTm9kZS5jaGlsZHJlblswXS5wb3NpdGlvbikpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOiB0aGlzLnBsYW5lTm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDUsIHRoaXMubWFwTm9kZS5jaGlsZHJlblsxXS5wb3NpdGlvbikpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUFwcC5hdWRpb01hbmFnZXIucGxheUVmZmVjdCgncGxhbmUnLCAxLCAyKVxyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG4gICAganVtcEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdhbWVBcHAuYXVkaW9NYW5hZ2VyLnBsYXlFZmZlY3QoJ2NsaWNrJylcclxuICAgICAgICB0aGlzLnBsYW5lTm9kZS5zdG9wQWxsQWN0aW9ucygpXHJcbiAgICAgICAgR2FtZUFwcC51aU1hbmFnZXIuc2hvd1VJKCdHYW1lVUknLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYWxsTCA9IDBcclxuICAgICAgICAgICAgdmFyIGN1ckwgPSAwXHJcbiAgICAgICAgICAgIC8vIHZhciB0ZW1wQ2hvb3NlVHlwZSA9IHRoaXMuX2Nob29zZVR5cGUgJSAyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaG9vc2VUeXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGFsbEwgPSBjYy52Mih0aGlzLm1hcE5vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24pLnN1Yih0aGlzLm1hcE5vZGUuY2hpbGRyZW5bMl0ucG9zaXRpb24pLm1hZygpXHJcbiAgICAgICAgICAgICAgICBjdXJMID0gY2MudjIodGhpcy5wbGFuZU5vZGUucG9zaXRpb24pLnN1Yih0aGlzLm1hcE5vZGUuY2hpbGRyZW5bMF0ucG9zaXRpb24pLm1hZygpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGxMID0gY2MudjIodGhpcy5tYXBOb2RlLmNoaWxkcmVuWzFdLnBvc2l0aW9uKS5zdWIodGhpcy5tYXBOb2RlLmNoaWxkcmVuWzNdLnBvc2l0aW9uKS5tYWcoKVxyXG4gICAgICAgICAgICAgICAgY3VyTCA9IGNjLnYyKHRoaXMucGxhbmVOb2RlLnBvc2l0aW9uKS5zdWIodGhpcy5tYXBOb2RlLmNoaWxkcmVuWzNdLnBvc2l0aW9uKS5tYWcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBiaWxpID0gY3VyTCAvIGFsbExcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHYW1lVUlcIikuaW5pdCh0aGlzLl9jaG9vc2VUeXBlLCBiaWxpLCB0aGlzLl9zcGVlZFVwKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxufSk7XHJcbiJdfQ==