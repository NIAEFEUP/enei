import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { Wrapper } from './wrapper'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => (
      <>
        <App {...props}>
          {(page) => (
            <Wrapper>
              <page.Component key={page.key} {...page.props} />
            </Wrapper>
          )}
        </App>
      </>
    ),
  })
}
