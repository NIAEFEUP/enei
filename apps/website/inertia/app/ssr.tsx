import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import { Providers } from "./providers";
import { StrictMode } from "react";

export default function render(intialPage: any) {
  return createInertiaApp({
    page: intialPage,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob("../pages/**/page.tsx", { eager: true });
      return pages[`../pages/${name}/page.tsx`];
    },
    setup: ({ App, props }) => (
      <StrictMode>
        <App {...props}>
          {(page) => (
            <Providers>
              <page.Component key={page.key} {...page.props} />
            </Providers>
          )}
        </App>
      </StrictMode>
    ),
  });
}
