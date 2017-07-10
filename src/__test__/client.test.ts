import 'jest';
import {createServer} from './before';
import {Client} from '../';
import * as net from "net";

let SERVER: net.Server;

beforeAll((done: Function) => {
    SERVER = createServer();
    SERVER.listen();
    SERVER.on('listening', () => {
        done();
    });
});

afterAll((done) => {
    SERVER.close();
});

describe('net-client', () => {
    it('should be a Class', () => {
        expect(new Client(1596)).toBeInstanceOf(Client)
    });
});