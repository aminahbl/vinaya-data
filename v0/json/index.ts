import languages from "./db_lanuages.json";
import pliTvPmBiRules from "./db_pli_tv_pm_bi_rules.json";
import pliTvPmBiTranslations from "./db_pli_tv_pm_bi_translations.json";
import pliTvPmCategories from "./db_pli_tv_pm_categories.json";
import translators from "./db_translators.json";

// This is only ever used to populate the database so data size isn't a concern
const data = {
  languages: languages.data,
  translators: translators.data,
  pliTvPmCategories: pliTvPmCategories.data,
  pliTvPmBiRules: pliTvPmBiRules.data,
  pliTvPmBiTranslations: pliTvPmBiTranslations.data,
};

export default data;
