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
  rootLanguages,
  traditions,
  ruleClasses,
  ruleSets,
  translationLanguages,
  translators,
  parallels,
  translations: {
    ...pliTvPmBiTranEnBrahmali,
    ...pliTvPmBiTranEnThanissaro,
    ...pliTvPmBiTranEsArindama,
  },
  rules: {
    ...pliTvPmBiRules,
    ...pliTvPmBuRules,
  },
};

export default data;
