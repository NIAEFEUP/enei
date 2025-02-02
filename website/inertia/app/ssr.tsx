import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauWrapper } from './tuyau'

export default function render(intialPage: any) {
  return createInertiaApp({
    page: intialPage,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <>
        <App {...props}>
          {(page) => (
            <TuyauWrapper>
              <page.Component key={page.key} {...page.props} />
            </TuyauWrapper>
          )}
        </App>
      </>
    ),
  })
}
