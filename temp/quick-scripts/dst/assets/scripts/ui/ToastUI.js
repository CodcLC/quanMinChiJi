
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/ui/ToastUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0c7fFQzm9IFYw0LACYPqiI', 'ToastUI');
// scripts/ui/ToastUI.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    labTxt: cc.RichText,
    _callback: null,
    //连续击杀的tip
    playerName: cc.RichText,
    killNum: cc.Label,
    killTipNode: cc.Node
  },
  start: function start() {
    this.node.setScale(0, 0);
  },
  show: function show(msg, callback, num) {
    this._callback = callback;
    this.node.stopAllActions();

    if (num) {
      this.playerName.string = msg;
      this.killNum.string = num;
      this.killTipNode.active = true;
    } else {
      this.labTxt.string = msg;
    }

    this.node.runAction(cc.sequence(cc.scaleTo(0.3, 1).easing(cc.easeBounceOut(2)), cc.delayTime(1), cc.callFunc(function () {
      this.dis();
    }.bind(this))));
  },
  dis: function dis() {
    this.node.runAction(cc.sequence(cc.spawn(cc.fadeOut(1), cc.moveBy(1, cc.v2(0, this.node.height))), cc.callFunc(function () {
      this.disIme();
    }.bind(this))));
  },
  //立即消失
  disIme: function disIme() {
    this.node.active = false;
    this.node.removeFromParent();
    this._callback && this._callback();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlcXFRvYXN0VUkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYWJUeHQiLCJSaWNoVGV4dCIsIl9jYWxsYmFjayIsInBsYXllck5hbWUiLCJraWxsTnVtIiwiTGFiZWwiLCJraWxsVGlwTm9kZSIsIk5vZGUiLCJzdGFydCIsIm5vZGUiLCJzZXRTY2FsZSIsInNob3ciLCJtc2ciLCJjYWxsYmFjayIsIm51bSIsInN0b3BBbGxBY3Rpb25zIiwic3RyaW5nIiwiYWN0aXZlIiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJzY2FsZVRvIiwiZWFzaW5nIiwiZWFzZUJvdW5jZU91dCIsImRlbGF5VGltZSIsImNhbGxGdW5jIiwiZGlzIiwiYmluZCIsInNwYXduIiwiZmFkZU91dCIsIm1vdmVCeSIsInYyIiwiaGVpZ2h0IiwiZGlzSW1lIiwicmVtb3ZlRnJvbVBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRUosRUFBRSxDQUFDSyxRQURIO0FBRVJDLElBQUFBLFNBQVMsRUFBRSxJQUZIO0FBR1I7QUFDQUMsSUFBQUEsVUFBVSxFQUFFUCxFQUFFLENBQUNLLFFBSlA7QUFLUkcsSUFBQUEsT0FBTyxFQUFFUixFQUFFLENBQUNTLEtBTEo7QUFNUkMsSUFBQUEsV0FBVyxFQUFFVixFQUFFLENBQUNXO0FBTlIsR0FIUDtBQVlMQyxFQUFBQSxLQVpLLG1CQVlHO0FBQ0osU0FBS0MsSUFBTCxDQUFVQyxRQUFWLENBQW1CLENBQW5CLEVBQXNCLENBQXRCO0FBQ0gsR0FkSTtBQWdCTEMsRUFBQUEsSUFoQkssZ0JBZ0JBQyxHQWhCQSxFQWdCS0MsUUFoQkwsRUFnQmVDLEdBaEJmLEVBZ0JvQjtBQUNyQixTQUFLWixTQUFMLEdBQWlCVyxRQUFqQjtBQUVBLFNBQUtKLElBQUwsQ0FBVU0sY0FBVjs7QUFDQSxRQUFJRCxHQUFKLEVBQVM7QUFDTCxXQUFLWCxVQUFMLENBQWdCYSxNQUFoQixHQUF5QkosR0FBekI7QUFDQSxXQUFLUixPQUFMLENBQWFZLE1BQWIsR0FBc0JGLEdBQXRCO0FBQ0EsV0FBS1IsV0FBTCxDQUFpQlcsTUFBakIsR0FBMEIsSUFBMUI7QUFDSCxLQUpELE1BSU87QUFDSCxXQUFLakIsTUFBTCxDQUFZZ0IsTUFBWixHQUFxQkosR0FBckI7QUFDSDs7QUFDRCxTQUFLSCxJQUFMLENBQVVTLFNBQVYsQ0FDSXRCLEVBQUUsQ0FBQ3VCLFFBQUgsQ0FDSXZCLEVBQUUsQ0FBQ3dCLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CQyxNQUFuQixDQUEwQnpCLEVBQUUsQ0FBQzBCLGFBQUgsQ0FBaUIsQ0FBakIsQ0FBMUIsQ0FESixFQUVJMUIsRUFBRSxDQUFDMkIsU0FBSCxDQUFhLENBQWIsQ0FGSixFQUdJM0IsRUFBRSxDQUFDNEIsUUFBSCxDQUFZLFlBQVk7QUFDcEIsV0FBS0MsR0FBTDtBQUNILEtBRlcsQ0FFVkMsSUFGVSxDQUVMLElBRkssQ0FBWixDQUhKLENBREo7QUFVSCxHQXJDSTtBQXVDTEQsRUFBQUEsR0F2Q0ssaUJBdUNDO0FBQ0YsU0FBS2hCLElBQUwsQ0FBVVMsU0FBVixDQUNJdEIsRUFBRSxDQUFDdUIsUUFBSCxDQUNJdkIsRUFBRSxDQUFDK0IsS0FBSCxDQUNJL0IsRUFBRSxDQUFDZ0MsT0FBSCxDQUFXLENBQVgsQ0FESixFQUVJaEMsRUFBRSxDQUFDaUMsTUFBSCxDQUFVLENBQVYsRUFBYWpDLEVBQUUsQ0FBQ2tDLEVBQUgsQ0FBTSxDQUFOLEVBQVMsS0FBS3JCLElBQUwsQ0FBVXNCLE1BQW5CLENBQWIsQ0FGSixDQURKLEVBS0luQyxFQUFFLENBQUM0QixRQUFILENBQVksWUFBWTtBQUNwQixXQUFLUSxNQUFMO0FBQ0gsS0FGVyxDQUVWTixJQUZVLENBRUwsSUFGSyxDQUFaLENBTEosQ0FESjtBQVdILEdBbkRJO0FBcURMO0FBQ0FNLEVBQUFBLE1BdERLLG9CQXNESTtBQUNMLFNBQUt2QixJQUFMLENBQVVRLE1BQVYsR0FBbUIsS0FBbkI7QUFDQSxTQUFLUixJQUFMLENBQVV3QixnQkFBVjtBQUNBLFNBQUsvQixTQUFMLElBQWtCLEtBQUtBLFNBQUwsRUFBbEI7QUFDSDtBQTFESSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYlR4dDogY2MuUmljaFRleHQsXHJcbiAgICAgICAgX2NhbGxiYWNrOiBudWxsLFxyXG4gICAgICAgIC8v6L+e57ut5Ye75p2A55qEdGlwXHJcbiAgICAgICAgcGxheWVyTmFtZTogY2MuUmljaFRleHQsXHJcbiAgICAgICAga2lsbE51bTogY2MuTGFiZWwsXHJcbiAgICAgICAga2lsbFRpcE5vZGU6IGNjLk5vZGVcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKDAsIDApXHJcbiAgICB9LFxyXG5cclxuICAgIHNob3cobXNnLCBjYWxsYmFjaywgbnVtKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKG51bSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllck5hbWUuc3RyaW5nID0gbXNnXHJcbiAgICAgICAgICAgIHRoaXMua2lsbE51bS5zdHJpbmcgPSBudW1cclxuICAgICAgICAgICAgdGhpcy5raWxsVGlwTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJUeHQuc3RyaW5nID0gbXNnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKFxyXG4gICAgICAgICAgICBjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oMC4zLCAxKS5lYXNpbmcoY2MuZWFzZUJvdW5jZU91dCgyKSksXHJcbiAgICAgICAgICAgICAgICBjYy5kZWxheVRpbWUoMSksXHJcbiAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXMoKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkaXMoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihcclxuICAgICAgICAgICAgY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICBjYy5zcGF3bihcclxuICAgICAgICAgICAgICAgICAgICBjYy5mYWRlT3V0KDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgxLCBjYy52MigwLCB0aGlzLm5vZGUuaGVpZ2h0KSksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzSW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL+eri+WNs+a2iOWksVxyXG4gICAgZGlzSW1lKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrICYmIHRoaXMuX2NhbGxiYWNrKClcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=