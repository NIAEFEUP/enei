import Base from "@adminjs/adonis/adminjs_provider";
import AdminJS, { type PropertyType } from "adminjs";

const typeConverter = (columnType: string): PropertyType => {
  switch (columnType.toLowerCase()) {
    case "char":
    case "character varying":
    case "varchar":
    case "binary":
    case "varbinary":
    case "tinyblob":
    case "blob":
    case "mediumblob":
    case "longblob":
    case "enum":
    case "set":
    case "time":
    case "year":
      return "string";

    case "tinytext":
    case "text":
    case "mediumtext":
    case "longtext":
      return "textarea";

    case "bit":
    case "smallint":
    case "mediumint":
    case "int":
    case "integer":
    case "bigint":
    case "tinyint":
      return "number";

    case "float":
    case "double":
    case "decimal":
    case "dec":
    case "real":
    case "numeric":
      return "float";

    case "bool":
    case "boolean":
    case "tinyint(1)":
      return "boolean";

    case "date":
      return "date";

    case "datetime":
    case "timestamp":
    case "timestamp with time zone":
      return "datetime";

    case "uuid":
      return "uuid";

    case "json":
    case "jsonb":
      return "key-value";

    default:
      // eslint-disable-next-line no-console
      console.warn(`Unexpected type: ${columnType} fallback to string`);
      return "string";
  }
};

export default class AdminJSProvider extends Base {
  async start() {
    const admin = await this.app.container.make(AdminJS);

    admin.resources.forEach((resource) => {
      resource.properties().forEach((property) => {
        // @ts-expect-error: They don't export the type
        property.setTypeConverter(typeConverter);
      });
    });

    return await super.start();
  }
}
