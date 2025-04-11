/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/ally.ts" />
/// <reference path="../../config/auth.ts" />
/// <reference path="../../config/inertia.ts" />
/// <reference path="../../config/limiter.ts" />
/// <reference path="../../config/redis.ts" />
/// <reference path="../../config/attachment.ts" />

import "../css/app.css";

import { resolvePageComponent } from "@adonisjs/inertia/helpers";
import { createInertiaApp } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";
import { Providers } from "./providers";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://9e99e86abb5568df5489e2e67e7dbc7d@o4509135018852352.ingest.de.sentry.io/4509135130394704",
});

console.log("Sentry DSN:", import.meta.env.SENTRY_DSN_FRONTEND);

const appName = import.meta.env.VITE_APP_NAME || "ENEI";

createInertiaApp({
  progress: { color: "var(--progress-bar)" },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}/page.tsx`,
      import.meta.glob("../pages/**/page.tsx"),
    );
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <>
        <App {...props}>
          {(page) => (
            <Providers>
              <page.Component key={page.key} {...page.props} />
            </Providers>
          )}
        </App>
      </>,
    );
  },
});
