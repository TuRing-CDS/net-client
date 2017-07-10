import * as net from 'net';

export function createServer() {
    const PORT = 1596,
        HOST = "127.0.0.1";

    const server = net.createServer();

    server.on('error', (error: Error) => {
        console.log(`Server has Error : ${error.message}`);
    });

    server.on('listening', () => {
        console.log(`Server is listening on PORT : ${HOST}:${PORT}`);
    });

    server.on('close', () => {
        console.log(`Server closed`);
    });

    server.on('connection', (socket: net.Socket) => {
        socket.on('connect', () => {
            console.log(`socket connected`);
        });
        socket.on('end', () => {
            console.log(`socket closed by client`);
        });
        socket.on('error', (error: Error) => {
            console.log(`socket error :${error.message}`);
        });
        socket.on('data', (data: Buffer) => {
            console.log(`socket received data :${data.toString()}`);
        });
    });

    server.listen(PORT, HOST);

    return server;

}