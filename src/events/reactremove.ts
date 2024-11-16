import { MessageInstance, ModifiedApp } from "../util";

export default function (app: ModifiedApp) {
    app.event("reaction_removed", async ({ event, client }) => {
        if(event.reaction !== "3c") return;
        // query thy db 
        const instance:null | MessageInstance = app.db.get(`${event.item.channel}.${event.item.ts}`)
        if(!instance) return;
        instance.count -= 1;
        app.db.set(`${event.item.channel}.${event.item.ts}`, instance)
        if(instance.send_ts) {
            await client.chat.update({
                channel: process.env.SLACK_CHANNEL!,
                ts: instance.send_ts,
                text: `:3c: *${instance.count}*\n${instance.url}`,
            })
        }
    })
}