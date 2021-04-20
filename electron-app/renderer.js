"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
window.onload = function () {
    (function () {
        var form = document.getElementById("form");
        if (form == null)
            return;
        form.onsubmit = function (ev) {
            ev.preventDefault();
            var name = document.getElementsByName("name")[0];
            var value = name.value;
            electron_1.ipcRenderer.send('changeUrl', btoa("/live.html?name=" + encodeURI(value)));
        };
    })();
    (function () {
        var host = document.getElementById("host");
        if (host == null)
            return;
        host.value = "localhost:" + electron_1.remote.getGlobal('port');
    })();
};
