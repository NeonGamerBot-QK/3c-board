//@ts-nocheck
import { ModifiedApp } from "../util";

export default function (app: ModifiedApp) {
  app.action("handle_btn", async (par) => {
    const { ack, body, client } = par;
    console.log(`#button`);
    await ack();
    // if (state.values.action === "leave") {
    //@ts-ignore
    await client.conversations.leave({ channel: par.body.channel?.id! });
    // }
  });
}
