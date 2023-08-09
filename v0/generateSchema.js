import fs from "fs";

const staticSchemaItems = [
  {
    name: "pli_tv_pm_categories",
    columns: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "position",
        type: "int",
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
    name: "languages",
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
];

function createPmSchemas(tables) {
  return tables.map((table, i) => {
    const tableName = `${table}_rules`;
    const commonRuleTableName = `${
      i === 0 ? tables[i + 1] : tables[i - 1]
    }_rules`;

    return {
      name: tableName,
      columns: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "category",
          type: "link",
          link: {
            table: "pli_tv_pm_categories",
          },
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
            table: tableName,
          },
        },
        {
          name: "prevRuleId",
          type: "link",
          link: {
            table: tableName,
          },
        },
        {
          name: "commonPmRule",
          type: "link",
          link: {
            table: commonRuleTableName,
          },
        },
      ],
    };
  });
}

function createPmTranslationsSchemas(tables) {
  return tables.map((table, i) => {
    return {
      name: `${table}_translations`,
      columns: [
        {
          name: "ruleId",
          type: "link",
          link: {
            table: `${table}_rules`,
          },
        },
        {
          name: "language",
          type: "link",
          link: {
            table: "languages",
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
    };
  });
}

const pmTableList = ["pli_tv_pm_bi", "pli_tv_pm_bu"];
const pmTables = createPmSchemas(pmTableList);
const pmTranslationsTables = createPmTranslationsSchemas(pmTableList);
const tables = [...staticSchemaItems, ...pmTables, ...pmTranslationsTables];

const schema = {
  tables: tables,
};

fs.writeFileSync("./data/v0/schema.json", JSON.stringify(schema, null, 2));
