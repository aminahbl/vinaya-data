import { XataClient } from "@xata";
import data from "./v0/json";

let instance: XataClient | undefined = undefined;


const getXataClient = () => {
  if (instance) return instance;
  
  instance = new XataClient({
    // Override configuration here
    // databaseURL: "XATA_DATABASE_URL",
    apiKey: "API_KEY",
    // fetch: fetch,
    // branch: "XATA_BRANCH",
    // ... other configuration
  });
  
  return instance;
};

const xata = getXataClient();

/**
 * This is to limit the occurrences of requests stalling due to hitting Xata limits 
 *
 */
const sleep = (fn: (record: any) => void, delay: number) => {
  return (record: any, i: number) => {
    setTimeout(() => {
      fn(record);
    }, i * delay);
  }
};

/**
 * While everything is being maintained in one project this is a hacky way to update Xata with data edits.
 *
 */
const updateXata = () => {
  const createOrUpdateLanguage = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.languages.createOrUpdate(id, record);
  };
  data.languages.forEach(sleep(createOrUpdateLanguage, 600));

  const createOrUpdateTranslator = async (translator: any) => {
    const { id, ...record } = translator;
    await xata.db.translators.createOrUpdate(id, record);
  };
  data.translators.forEach(sleep(createOrUpdateTranslator, 600));

  const createOrUpdateCategory = async (category: any) => {
    const { id, ...record } = category;
    await xata.db.pli_tv_pm_categories.createOrUpdate(id, record);
  };
  data.pliTvPmCategories.forEach(sleep(createOrUpdateCategory, 600));

  const createOrUpdateRule = async (rule: any) => {
    const { id, ...record } = rule;
    await xata.db.pli_tv_pm_bi_rules.createOrUpdate(id, record);
  };
  data.pliTvPmBiRules.forEach(sleep(createOrUpdateRule, 600));

  const createOrUpdateTranslation = async (translation: any) => {
    const { id, ...record } = translation;
    await xata.db.pli_tv_pm_bi_translations.createOrUpdate(id, record);
  };
  data.pliTvPmBiTranslations.forEach(sleep(createOrUpdateTranslation, 600));
};


updateXata();
