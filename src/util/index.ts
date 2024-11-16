import { App } from '@slack/bolt';
import JSONdb from "simple-json-db";
import fs from "fs";
import path from 'path';
export interface ModifiedApp extends App {
    db: JSONdb;
}
// pretty much a db entry
export interface MessageInstance {
channel: string;
ts: string;
count: number;
url: string;
send_ts?: string;
}

export function loadEvents(app: ModifiedApp) {
const events = fs.readdirSync(path.join(__dirname, '../events'))
    .filter(file => file.endsWith('.ts'))

    for(const event of events) {    
        const eventFile = require(path.join(__dirname, '../events', event)).default
        console.log(`Loading ${event}`)
        eventFile(app)
    }
}