import * as express from 'express';
import * as socket from 'socket.io';
import { BrowserWindow } from 'electron';

export function onConnection(win: BrowserWindow) {
    console.log('sock');
    const app = express();
    const server = app.listen(4000, () => {
        console.log('listening to requests on 4000');
    });

    const io = socket(server, { serveClient: false });
    io.on('connection', (socket: any) => {
        console.log('made socket connection', socket.id);
        socket.on('REFRESH', (data: any) => {
            win.webContents.send('REFRESH', data);
        });
    });
}
