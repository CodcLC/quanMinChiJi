
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_reversed_rotateBy');
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/scripts/GameApp');
require('./assets/scripts/Launch/LaunchScript');
require('./assets/scripts/Protocol');
require('./assets/scripts/Tools');
require('./assets/scripts/Utils');
require('./assets/scripts/data/Consts');
require('./assets/scripts/data/JsonPath');
require('./assets/scripts/data/PrefabPath');
require('./assets/scripts/data/RouletteData');
require('./assets/scripts/game/Bullet');
require('./assets/scripts/game/DropBox');
require('./assets/scripts/game/Enemy');
require('./assets/scripts/game/GroundItem');
require('./assets/scripts/game/Joystick');
require('./assets/scripts/game/JoystickCommon');
require('./assets/scripts/game/ParatrooperEnemy');
require('./assets/scripts/game/ParatrooperPlayer');
require('./assets/scripts/game/Player');
require('./assets/scripts/manager/AudioManager');
require('./assets/scripts/manager/ConfigManager');
require('./assets/scripts/manager/DataManager');
require('./assets/scripts/manager/EventManager');
require('./assets/scripts/manager/UIManager');
require('./assets/scripts/ui/ActivityPopup');
require('./assets/scripts/ui/BoxUI');
require('./assets/scripts/ui/DailyPopup');
require('./assets/scripts/ui/GameMap');
require('./assets/scripts/ui/GameUI');
require('./assets/scripts/ui/GiftPopup');
require('./assets/scripts/ui/GunUI');
require('./assets/scripts/ui/LoginUI');
require('./assets/scripts/ui/OpenBoxPopup');
require('./assets/scripts/ui/OverPopup');
require('./assets/scripts/ui/PlaneUI');
require('./assets/scripts/ui/PrepareMap');
require('./assets/scripts/ui/PrepareUI');
require('./assets/scripts/ui/RankUI');
require('./assets/scripts/ui/SkinInfoPopup');
require('./assets/scripts/ui/SkinItem');
require('./assets/scripts/ui/SkinUI');
require('./assets/scripts/ui/SplashUI');
require('./assets/scripts/ui/ToastUI');

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