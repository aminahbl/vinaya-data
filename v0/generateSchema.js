import fs from "fs";

const staticSchemaItems = [
  {
    name: "lookup_root_language",
    columns: [
      {
        name: "language",
        type: "string",
      },
    ],
  },
  {
    name: "lookup_tradition",
    columns: [
      {
        name: "name",
        type: "string",
      },
    ],
  },
  {
    name: "lookup_rule_class",
    columns: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "sortId",
        type: "int",
      },
    ],
  },
  {
    name: "lookup_rule_set",
    columns: [
      {
        name: "title",
        type: "string",
      },
    ],
  },
  {
    name: "lookup_translation_language",
    columns: [
      {
        name: "language",
        type: "string",
      },
      {
        name: "localName",
        type: "string",
      },
    ],
  },
  {
    name: "translators",
    columns: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "displayName",
        type: "string",
      },
    ],
  },
  {
    name: "rule_parallels",
    columns: [
      {
        name: "ruleId",
        type: "link",
        link: {
          table: "rules",
        },
      },
      {
        name: "parallelRuleId",
        type: "link",
        link: {
          table: "rules",
        },
      },
    ],
  },
  {
    name: "rule_translations",
    columns: [
      {
        name: "ruleId",
        type: "link",
        link: {
          table: "rules",
        },
      },
      {
        name: "language",
        type: "link",
        link: {
          table: "lookup_translation_language",
        },
      },
      {
        name: "translator",
        type: "link",
        link: {
          table: "translators",
        },
      },
      {
        name: "translation",
        type: "text",
      },
    ],
  },
  {
    name: "rules",
    columns: [
      {
        name: "rootLanguage",
        type: "link",
        link: {
          table: "lookup_root_language",
        },
      },
      {
        name: "tradition",
        type: "link",
        link: {
          table: "lookup_tradition",
        },
      },
      {
        name: "set",
        type: "link",
        link: {
          table: "lookup_rule_set",
        },
      },
      {
        name: "class",
        type: "link",
        link: {
          table: "lookup_rule_class",
        },
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "rule",
        type: "text",
      },
      {
        name: "imgId",
        type: "string",
      },
      {
        name: "nextRuleId",
        type: "link",
        link: {
          table: "rules",
        },
      },
      {
        name: "prevRuleId",
        type: "link",
        link: {
          table: "rules",
        },
      },
      {
        name: "crossSetRule",
        type: "link",
        link: {
          table: "rules",
        },
      },
    ],
  },
];

const schema = {
  tables: staticSchemaItems,
};

fs.writeFileSync("./data/v0/schema.json", JSON.stringify(schema, null, 2));

//  Dynamic table creation example:
//
// function createPmTranslationsSchemas(tables) {
//   return tables.map((table, i) => {
//     return {
//       name: `${table}_translations`,
//       columns: [
//         {
//           name: "ruleId",
//           type: "link",
//           link: {
//             table: `${table}_rules`,
//           },
//         },
//         {
//           name: "language",
//           type: "link",
//           link: {
//             table: "languages",
//           },
//         },
//         {
//           name: "translator",
//           type: "link",
//           link: {
//             table: "translators",
//           },
//         },
//         {
//           name: "translation",
//           type: "text",
//         },
//       ],
//     };
//   });
// }

// const pmTableList = ["pli_tv_pm_bi", "pli_tv_pm_bu"];
// const pmTables = createPmSchemas(pmTableList);
// const pmTranslationsTables = createPmTranslationsSchemas(pmTableList);
// const tables = [...staticSchemaItems, ...pmTables, ...pmTranslationsTables];

