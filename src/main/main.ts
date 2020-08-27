import { app, nativeImage, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { onConnection } from './socketServer';
const socket = require('socket.io');
import * as express from 'express';

let win: BrowserWindow | null;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log); // eslint-disable-line no-console
};


const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }
    win = new BrowserWindow({
        show: false,
        title: 'VMyu',
        titleBarStyle: 'hiddenInset',
        'minHeight': 300,
        'minWidth': 500,
        icon: path.join(__dirname, 'icons', 'icon256.png')
    });
    win.maximize();
    win.show();
    win.setMenuBarVisibility(false)

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            // win!.webContents.openDevTools();
        });
    }

    onConnection(win);

    win.on('page-title-updated', (evt) => {
        evt.preventDefault();
    });

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

if (process.platform === 'darwin') {
    const image = nativeImage.createFromPath(
        path.join(__dirname, 'icons', 'icon512_mac.png')
    );
    app.dock.setIcon(image);
}