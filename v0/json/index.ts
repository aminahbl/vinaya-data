import {
  rootLanguages,
  ruleClasses,
  ruleSets,
  traditions,
  translationLanguages,
  translators,
  parallels,
} from "./db/common";
import pliTvPmBiRules from "./db/pli_tv_pm/bi/rules.json";
import pliTvPmBuRules from "./db/pli_tv_pm/bu/rules.json";
import pliTvPmBiTranEnBrahmali from "./db/pli_tv_pm/bi/trans_en_brahmali.json";
import pliTvPmBiTranEnThanissaro from "./db/pli_tv_pm/bi/trans_en_thanissaro.json";
import pliTvPmBiTranEsArindama from "./db/pli_tv_pm/bi/trans_es_arindama.json";

// This is only ever used to populate the database so data size isn't a concern. Probably.
const data = {
  rootLanguages: rootLanguages.data,
  traditions: traditions.data,
  ruleClasses: ruleClasses.data,
  ruleSets: ruleSets.data,
  translationLanguages: translationLanguages.data,
  translators: translators.data,
  parallels: parallels.data,
  translations: {
    ...pliTvPmBiTranEnBrahmali.data,
    ...pliTvPmBiTranEnThanissaro.data,
    ...pliTvPmBiTranEsArindama.data,
  },
  rules: {
    ...pliTvPmBiRules.data,
    ...pliTvPmBuRules.data,
  },
};

export default data;
