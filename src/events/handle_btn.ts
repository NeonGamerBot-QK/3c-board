import { ModifiedApp } from "../util";

export default function (app: ModifiedApp) {
  app.action("*", async (par) => {
      const { ack, body, client } = par;
      console.log(`#button`)
    //@ts-ignore
    // if (state.values.action === "leave") {
    await client.conversations.leave({ channel: par.body.channel?.id! });
    await ack();
    // }
  });
}
