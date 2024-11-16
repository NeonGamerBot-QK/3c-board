import { ModifiedApp } from "../util";

export default function (app: ModifiedApp) {
    app.event("channel_created", async ({ event, client }) => {
        try {
          await client.conversations.join({ channel: event.channel.id });
          await new Promise((r) => setTimeout(r, 400));
          await app.client.chat.postEphemeral({
            channel: event.channel.id,
            user: event.channel.creator,
            text: "If u can see the blocks then whoops",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Hello! i have autojoined your channel for when a user adds :3c: (more then 3) reactions to a message i will post it in <#${process.env.SLACK_CHANNEL}>.\nIf you want me to leave click the button below.`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Leave",
                },
                value: "leave",
              },
            ],
          }
        ],
          })
        } catch (e) {
          console.error(e);
        }
      });
}