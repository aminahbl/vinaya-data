// Generated with CLI
import { getXataClient } from "@xata";

import data from "./rules_bi_prototype_v1.json";

const xata = getXataClient();

const handler = () => {
  data.rules.forEach(async (item) => {
    const { id, rule, ...others } = item;
    const record = {
      ...others,
      rule: JSON.stringify(rule),
    };
    await xata.db.rules_bi.createOrUpdate(id, record);
  });
};

export default handler;

// temp solution for importing JSON data to Xata:
// options for getXataClient used in lib/xata.codegen.ts in conjuction with a "Xata that data!" button (placeholder currently in app/about/page.tsx)
//
// const defaultOptions = {
//   enableBrowser: true,
//   apiKey: process.env.NEXT_PUBLIC_XATA_API_KEY,
//   databaseURL: "https://owili-iodq2k.eu-central-1.xata.sh/db/vinaya",
// };
