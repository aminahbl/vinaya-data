import { getXataClient } from "@xataclient";
import data from "./v0/json";

const xata = getXataClient();

const updateXata = () => {
  data.languages.forEach(async (rule) => {
    const { id, ...record } = rule;
    await xata.db.languages.createOrUpdate(id, record);
  });
  data.translators.forEach(async (rule) => {
    const { id, ...record } = rule;
    await xata.db.translators.createOrUpdate(id, record);
  });
  data.pliTvPmCategories.forEach(async (rule) => {
    const { id, ...record } = rule;
    await xata.db.pli_tv_pm_categories.createOrUpdate(id, record);
  });
  data.pliTvPmBiRules.forEach(async (rule) => {
    const { id, ...record } = rule;
    await xata.db.pli_tv_pm_bi_rules.createOrUpdate(id, record);
  });
  data.pliTvPmBiTranslations.forEach(async (rule) => {
    const { id, ...record } = rule;
    await xata.db.pli_tv_pm_bi_translations.createOrUpdate(id, record);
  });
};

updateXata();
