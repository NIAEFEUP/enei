import env from "#start/env";
import app from "@adonisjs/core/services/app";
import { defineConfig, services } from "@adonisjs/drive";

const driveConfig = defineConfig({
  default: env.get("DRIVE_DISK"),

  /**
   * The services object can be used to configure multiple file system
   * services each using the same or a different driver.
   */
  services: {
    fs: services.fs({
      location: app.makePath("storage"),
      serveFiles: true,
      routeBasePath: "/uploads",
      visibility: "public",
    }),

    spaces: services.s3({
      credentials: {
        accessKeyId: env.get('SPACES_KEY'),
        secretAccessKey: env.get('SPACES_SECRET'),
      },
      region: env.get('SPACES_REGION'),
      bucket: env.get('SPACES_BUCKET'),
      endpoint: env.get('SPACES_ENDPOINT'),
      visibility: 'public',
    }),

  },
  
});

export default driveConfig;

declare module "@adonisjs/drive/types" {
  export interface DriveDisks extends InferDriveDisks<typeof driveConfig> {}
}
