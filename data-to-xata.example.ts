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
  data.translationLanguages.forEach(sleep(createOrUpdateLanguage, 200));

  const createOrUpdateTranslator = async (translator: any) => {
    const { id, ...record } = translator;
    await xata.db.translators.createOrUpdate(id, record);
  };
  data.translators.forEach(sleep(createOrUpdateTranslator, 200));

  const createOrUpdateCategory = async (category: any) => {
    const { id, ...record } = category;
    await xata.db.pli_tv_pm_categories.createOrUpdate(id, record);
  };
  data.ruleClasses.forEach(sleep(createOrUpdateCategory, 200));

  const createOrUpdateRule = async (rule: any) => {
    const { id, ...record } = rule;
    await xata.db.pli_tv_pm_bi_rules.createOrUpdate(id, record);
  };
  data.rules.forEach(sleep(createOrUpdateRule, 200));

  const createOrUpdateTranslation = async (translation: any) => {
    const { id, ...record } = translation;
    await xata.db.pli_tv_pm_bi_translations.createOrUpdate(id, record);
  };
  data.translations.forEach(sleep(createOrUpdateTranslation, 200));

  const createOrUpdateParallel = async (parallel: any) => {
    let { id, ruleId, parallelRuleId } = parallel;

    // Ensure the smaller ruleId always comes first
    if (ruleId > parallelRuleId) {
      [ruleId, parallelRuleId] = [parallelRuleId, ruleId];
    }

    // Create a unique identifier for the pair of ruleId and parallelRuleId
    const uniqueId = `${ruleId}-${parallelRuleId}`;

    // await xata.db.parallel_rules.createOrUpdate(uniqueId, {
    //   ruleId,
    //   parallelRuleId,
    // });
  };
  data.translations.forEach(sleep(createOrUpdateTranslation, 200));
};

updateXata();