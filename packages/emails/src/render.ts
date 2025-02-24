import { render as $render, type Options, plainTextSelectors } from "@react-email/components";
import { convert } from "html-to-text";
import type { MaybePromise } from "@enei/utils/types";

type HtmlOptions = Omit<Options & { plainText: false }, "plainText">;
type PlainTextOptions = Omit<Options & { plainText: true }, "plainText">;

export type RenderOptions = {
  plainText?: PlainTextOptions;
  html?: HtmlOptions;
};

export default async function render(
  element: MaybePromise<React.ReactElement>,
  options?: RenderOptions,
) {
  const html = await $render(await element, { plainText: false, ...options?.html });
  const plainText = convert(html, { selectors: plainTextSelectors, ...options?.plainText });

  return { html, plainText };
}
