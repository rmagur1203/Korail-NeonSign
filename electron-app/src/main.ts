import { app, BrowserWindow, ipcMain } from "electron";
import express from "./express";
import Path from 'path';
import http from 'http';


const port = normalizePort(process.env.PORT || '3000');
if (!port) throw "포트를 열 수 없습니다.";
express.set('port', port);
const server = http.createServer(express);
server.listen(port);
eval(`global.port = ${port};`);

let window: BrowserWindow;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: Path.join(app.getAppPath(), 'renderer.js'),
            enableRemoteModule: true
        },
        title: "Korail-ElectronicBoard"
        //icon: Path.join(app.getAppPath(), 'assets', 'icons', 'png', 'korail.png')
    });
    window.setMenu(null);

    window.loadFile('views/index.html');
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', () => {
    if (window === null) createWindow()
});

ipcMain.on('changeUrl', (event, url) => {
    //let path = app.getAppPath().split('\\').slice(0, -1).join('\\');
    window.loadURL("file://" + Path.join(app.getAppPath(), "views", atob(url)));
    function atob(text: string) {
        return Buffer.from(text, 'base64').toString('utf8');
    }
});


function normalizePort(val: any) {
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