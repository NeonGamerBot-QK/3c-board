import { MessageInstance, ModifiedApp } from "../util";

export default function (app: ModifiedApp) {
    app.event("reaction_added", async ({ event, client }) => {
        if(event.reaction !== "3c") return;
        // query thy db 
        const instance:null | MessageInstance = app.db.get(`${event.item.channel}.${event.item.ts}`)
    // get the count of reactions on message via api
if(!instance) {
app.db.set(`${event.item.channel}.${event.item.ts}`, {
    channel: event.item.channel,
    ts: event.item.ts,
    count: 1,
    url: await client.chat.getPermalink({ channel: event.item.channel, message_ts: event.item.ts }).then(d=>d.permalink!)
} satisfies MessageInstance)
} else {

    instance.count += 1;
    app.db.set(`${event.item.channel}.${event.item.ts}`, instance)
if(instance.count > 3 && !instance.send_ts) {
    const message = await client.chat.postMessage({
        channel: process.env.SLACK_CHANNEL!,
        text: `:3c: *${instance.count}*\n${instance.url}`,
    })
 instance.send_ts = message.ts
 app.db.set(`${event.item.channel}.${event.item.ts}`, instance)   
} else {
    if(instance.send_ts) {
        await client.chat.update({
            channel: process.env.SLACK_CHANNEL!,
            ts: instance.send_ts,
            text: `:3c: *${instance.count}*\n${instance.url}`,
        })
    }
}
}
    // if(!instance && count.) {
    //     app.db.set(`${event.item.channel}.${event.item.ts}`, {
    })
}