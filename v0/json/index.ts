import {
  rootLanguages,
  ruleClasses,
  ruleSets,
  traditions,
  translationLanguages,
  translators,
} from "./db/common";
import pliTvPmBiRules from "./db/pli_tv_pm/bi/rules.json";
import pliTvPmBiTranEnBrahmali from "./db/pli_tv_pm/bi/trans_en_brahmali.json";
import pliTvPmBiTranEnThanissaro from "./db/pli_tv_pm/bi/trans_en_thanissaro.json";
import pliTvPmBiTranEsArindama from "./db/pli_tv_pm/bi/trans_es_arindama.json";

// This is only ever used to populate the database so data size isn't a concern
const data = {
  rootLanguages: rootLanguages.data,
  translationLanguages: translationLanguages.data,
  translators: translators.data,
  ruleClasses: ruleClasses.data,
  ruleSets: ruleSets.data,
  traditions: traditions.data,
  rules: {
    ...pliTvPmBiRules.data,
  },
  translations: {
    ...pliTvPmBiTranEnBrahmali.data,
    ...pliTvPmBiTranEnThanissaro.data,
    ...pliTvPmBiTranEsArindama.data,
  },
};

export default data;
