import i18n from "i18next";
import config from "./localization/index";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init(config);

export default i18n;
