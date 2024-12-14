import "dotenv/config";
import { App } from "@slack/bolt";
import JSONdb from "simple-json-db";
import { loadEvents, ModifiedApp } from "./util";

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
}) as ModifiedApp;

const db = new JSONdb("./db.json");
app.db = db;

loadEvents(app);
setInterval(() => {
  fetch(process.env.SLACKUS_URL!);
}, 2.5 * 1000);

app.start(process.env.PORT || process.env.SERVER_PORT || 3000);
console.log(
  `Started on port ${process.env.PORT || process.env.SERVER_PORT || 3000}`,
);
