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
  };
};

/**
 * While everything is being maintained in one project this is a hacky way to update Xata with data edits.
 *
 */
const updateXata = () => {
  const createOrUpdateRootLangs = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_root_language.createOrUpdate(id, record);
  };
  data.rootLanguages.forEach(sleep(createOrUpdateRootLangs, 200));

  const createOrUpdateTraditions = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_tradition.createOrUpdate(id, record);
  };
  data.traditions.forEach(sleep(createOrUpdateTraditions, 200));

  const createOrUpdateRuleClasses = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_rule_class.createOrUpdate(id, record);
  };
  data.ruleClasses.forEach(sleep(createOrUpdateRuleClasses, 200));

  const createOrUpdateRuleSets = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_rule_set.createOrUpdate(id, record);
  };
  data.ruleClasses.forEach(sleep(createOrUpdateRuleSets, 200));

  const createOrUpdateTransLangs = async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_translation_language.createOrUpdate(id, record);
  };
  data.translationLanguages.forEach(sleep(createOrUpdateTransLangs, 200));

  const createOrUpdateTranslators = async (translator: any) => {
    const { id, ...record } = translator;
    await xata.db.translators.createOrUpdate(id, record);
  };
  data.translators.forEach(sleep(createOrUpdateTranslators, 200));

  const createOrUpdateParallels = async (parallel: any) => {
    let { ruleId, parallelRuleId } = parallel;

    // Ensure the smaller ruleId always comes first & avoid double entries
    if (ruleId > parallelRuleId) {
      [ruleId, parallelRuleId] = [parallelRuleId, ruleId];
    }

    // Create a unique identifier for the pair of ruleId and parallelRuleId
    const uniqueId = `${ruleId}-${parallelRuleId}`;

    await xata.db.rule_parallels.createOrUpdate(uniqueId, {
      ruleId,
      parallelRuleId,
    });
  };
  data.parallels.forEach(sleep(createOrUpdateParallels, 200));

  const createOrUpdateTranslations = async (translation: any) => {
    const { id, ...record } = translation;
    await xata.db.rule_translations.createOrUpdate(id, record);
  };
  data.translations.forEach(sleep(createOrUpdateTranslations, 200));

  const createOrUpdateRule = async (rule: any) => {
    const { id, ...record } = rule;
    await xata.db.rules.createOrUpdate(id, record);
  };
  data.rules.forEach(sleep(createOrUpdateRule, 200));
};

updateXata();
