import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export async function createUser(data) {
  return notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      Wallet: { title: [{ text: { content: data.wallet } }] },
      Age: { number: data.age },
      Height: { number: data.height },
      Weight: { number: data.weight },
      Diet: { select: { name: data.diet } }
    }
  });
}
