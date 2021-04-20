"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var express_1 = __importDefault(require("./express"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var port = normalizePort(process.env.PORT || '3000');
if (!port)
    throw "포트를 열 수 없습니다.";
express_1.default.set('port', port);
var server = http_1.default.createServer(express_1.default);
server.listen(port);
eval("global.port = " + port + ";");
var window;
var createWindow = function () {
    window = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(electron_1.app.getAppPath(), 'renderer.js'),
            enableRemoteModule: true
        },
        title: "Korail-ElectronicBoard"
        //icon: Path.join(app.getAppPath(), 'assets', 'icons', 'png', 'korail.png')
    });
    window.setMenu(null);
    window.loadFile('views/index.html');
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (window === null)
        createWindow();
});
electron_1.ipcMain.on('changeUrl', function (event, url) {
    //let path = app.getAppPath().split('\\').slice(0, -1).join('\\');
    window.loadURL("file://" + path_1.default.join(electron_1.app.getAppPath(), "views", atob(url)));
    function atob(text) {
        return Buffer.from(text, 'base64').toString('utf8');
    }
});
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
