"use strict";
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