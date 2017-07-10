import * as net from 'net'

import {EventEmitter} from 'events'

import * as debug from 'debug';

const info = debug('[I]'),
    warn = debug('[W]'),
    error = debug('[E]');

export class Client extends EventEmitter {

    private socket: net.Socket;

    private host: string;

    private port: number;

    constructor(port: number, host: string = 'localhost') {
        super();
        this.port = port;
        this.host = host;
        info(`Client connection(${this.host}:${this.port}) has been init!`);
    }

    connect() {
        if (this.socket) {
            const warnMessage = `Client connection(${this.host}:${this.port}) already exists!`;
            warn(warnMessage);
            this.emit('warn', warnMessage);
            return this;
        }
        this.socket = new net.Socket();
        this.socket.on('connect', this.emit.bind(this, 'connect'));
        this.socket.on('error', this.emit.bind(this, 'error'));
        this.socket.on('close', this.emit.bind(this, 'close'));
        this.socket.on('data', this.emit.bind(this, 'data'));
        this.socket.on('drain', this.emit.bind(this, 'drain'));
        this.socket.on('timeout', this.emit.bind(this, 'timeout'));
        this.socket.on('timeout', () => {
            error(`Client connection(${this.host}:${this.port}) connect timeout!`);
        });
        this.socket.on('connect', () => {
            info(`Client connection(${this.host}:${this.port}) has been connect!`);
        });
        this.socket.on('error', (err: Error) => {
            error(`Client connection(${this.host}:${this.port}) has Error:${err.message}`);
        });
        this.socket.on('close', () => {
            warn('Client connection has closed!');
            delete this.socket;
        });
        this.socket.connect(this.port, this.host);
    }

    isConnect() {
        return !!this.socket
    }

    write() {
        this.socket && this.socket.write.apply(this.socket, arguments);
    }

    end() {
        this.socket && this.socket.end.apply(this.socket, arguments);
    }

}