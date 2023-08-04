import { getXataClient } from "@xataclient";

const xata = getXataClient();

import data from "./json";

async function updateBiRule(rule: any) {
  const { id, rule: text, ...rest } = rule;
  const record = {
    rule: JSON.stringify(text),
    ...rest,
  };
  await xata.db.rules_bi.createOrUpdate(id, record);
}

const syncXata = () => {
  data.rulesBi.forEach(async (rule) => {
    updateBiRule(rule);
  });
};

syncXata();
