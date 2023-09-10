import {
  rootLanguages,
  ruleClasses,
  ruleSets,
  traditions,
  translationLanguages,
  translators,
  parallels,
} from "./common";
import pliTvPmBiRules from "./pli_tv_pm/bi/rules.json";
import pliTvPmBuRules from "./pli_tv_pm/bu/rules.json";
import pliTvPmBiTranEnBrahmali from "./pli_tv_pm/bi/trans_en_brahmali.json";
import pliTvPmBiTranEnThanissaro from "./pli_tv_pm/bi/trans_en_thanissaro.json";
import pliTvPmBiTranEsArindama from "./pli_tv_pm/bi/trans_es_arindama.json";

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
  testing: [],
};

export default data;
