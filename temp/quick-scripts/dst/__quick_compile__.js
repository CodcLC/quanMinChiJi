
(function () {
var scripts = [{"deps":{"./assets/scripts/Launch/LaunchScript":3,"./assets/scripts/Utils":4,"./assets/migration/use_reversed_rotateBy":5,"./assets/scripts/ui/LoginUI":2,"./assets/scripts/ui/ActivityPopup":6,"./assets/scripts/data/RouletteData":7,"./assets/scripts/ui/GameUI":9,"./assets/scripts/manager/DataManager":10,"./assets/scripts/ui/GameMap":11,"./assets/scripts/data/PrefabPath":12,"./assets/scripts/data/Consts":13,"./assets/scripts/game/DropBox":14,"./assets/scripts/Protocol":15,"./assets/scripts/data/JsonPath":16,"./assets/scripts/game/Player":17,"./assets/scripts/game/ParatrooperPlayer":18,"./assets/scripts/game/Joystick":19,"./assets/scripts/manager/ConfigManager":20,"./assets/scripts/game/ParatrooperEnemy":21,"./assets/scripts/game/JoystickCommon":23,"./assets/scripts/game/GroundItem":24,"./assets/scripts/game/Bullet":25,"./assets/scripts/ui/DailyPopup":26,"./assets/scripts/manager/AudioManager":27,"./assets/scripts/ui/BoxUI":28,"./assets/scripts/ui/GunUI":30,"./assets/scripts/ui/GiftPopup":31,"./assets/scripts/ui/PrepareMap":32,"./assets/scripts/ui/SkinInfoPopup":33,"./assets/scripts/ui/PlaneUI":34,"./assets/scripts/ui/OverPopup":35,"./assets/scripts/ui/PrepareUI":36,"./assets/scripts/Tools":37,"./assets/scripts/ui/SkinUI":38,"./assets/scripts/ui/OpenBoxPopup":39,"./assets/scripts/ui/RankUI":40,"./assets/scripts/ui/SkinItem":41,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":42,"./assets/scripts/ui/ToastUI":43,"./assets/scripts/ui/SplashUI":44,"./assets/scripts/manager/UIManager":1,"./assets/scripts/game/Enemy":8,"./assets/scripts/manager/EventManager":29,"./assets/scripts/GameApp":22},"path":"preview-scripts/__qc_index__.js"},{"deps":{"PrefabPath":12,"ConfigManager":20,"JsonPath":16},"path":"preview-scripts/assets/scripts/manager/UIManager.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/LoginUI.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Launch/LaunchScript.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Utils.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateBy.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/ActivityPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/data/RouletteData.js"},{"deps":{"JoystickCommon":23},"path":"preview-scripts/assets/scripts/game/Enemy.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/GameUI.js"},{"deps":{},"path":"preview-scripts/assets/scripts/manager/DataManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/GameMap.js"},{"deps":{},"path":"preview-scripts/assets/scripts/data/PrefabPath.js"},{"deps":{},"path":"preview-scripts/assets/scripts/data/Consts.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/DropBox.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Protocol.js"},{"deps":{},"path":"preview-scripts/assets/scripts/data/JsonPath.js"},{"deps":{"JoystickCommon":23},"path":"preview-scripts/assets/scripts/game/Player.js"},{"deps":{"JoystickCommon":23},"path":"preview-scripts/assets/scripts/game/ParatrooperPlayer.js"},{"deps":{"JoystickCommon":23},"path":"preview-scripts/assets/scripts/game/Joystick.js"},{"deps":{},"path":"preview-scripts/assets/scripts/manager/ConfigManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/ParatrooperEnemy.js"},{"deps":{"AudioManager":27,"UIManager":1,"DataManager":10,"EventManager":29},"path":"preview-scripts/assets/scripts/GameApp.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/JoystickCommon.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/GroundItem.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/Bullet.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/DailyPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/manager/AudioManager.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/BoxUI.js"},{"deps":{"events":45},"path":"preview-scripts/assets/scripts/manager/EventManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/GunUI.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/GiftPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/PrepareMap.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/SkinInfoPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/PlaneUI.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/OverPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/PrepareUI.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Tools.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/SkinUI.js"},{"deps":{"Utils":4},"path":"preview-scripts/assets/scripts/ui/OpenBoxPopup.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/RankUI.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/SkinItem.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/ToastUI.js"},{"deps":{},"path":"preview-scripts/assets/scripts/ui/SplashUI.js"},{"deps":{},"path":"preview-scripts/__node_modules/events/events.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    