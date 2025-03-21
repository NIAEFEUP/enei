import { LicenseStatusEnum } from "./index.js";

export const verifyLicense = () => ({
  status: LicenseStatusEnum.Valid,
});
