import { getXataClient } from "../lib/xata.codegen";

const xata = getXataClient();

const updateFns = {
  rootLanguages: async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_root_language.createOrUpdate(id, record);
  },
  traditions: async (tradition: any) => {
    const { id, ...record } = tradition;
    await xata.db.lookup_tradition.createOrUpdate(id, record);
  },
  ruleClasses: async (ruleClass: any) => {
    const { id, ...record } = ruleClass;
    await xata.db.lookup_rule_class.createOrUpdate(id, record);
  },
  ruleSets: async (ruleSet: any) => {
    const { id, ...record } = ruleSet;
    await xata.db.lookup_rule_set.createOrUpdate(id, record);
  },
  translationLanguages: async (language: any) => {
    const { id, ...record } = language;
    await xata.db.lookup_translation_language.createOrUpdate(id, record);
  },
  translators: async (translator: any) => {
    const { id, ...record } = translator;
    await xata.db.translators.createOrUpdate(id, record);
  },
  parallels: async (parallel: any) => {
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
  },
  translations: async (translation: any) => {
    const { id, ...record } = translation;
    await xata.db.rule_translations.createOrUpdate(id, record);
  },
  rules: async (rule: any) => {
    const { id, ...record } = rule;
    await xata.db.rules.createOrUpdate(id, record);
  },
  testing: () => {
    console.log("Testing function");
  },
};

export default updateFns;
