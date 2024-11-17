import sanitizeHtml from "sanitize-html";

export const sanitize = (html: string) => {
  try {
    return clear(html);
  } catch (error) {
    return html;
  }
};

const options = {
  allowedTags: getAllowedTags(),
  allowedAttributes: {
    "*": ["style"],
    "a": ["href", "name", "target"],
    "img": ["src", "srcset", "alt", "title", "width", "height", "data-*"],
  },
  allowedStyles: {
    "*": {
      "font-size": [/^\d+(?:rem|em)$/],
      "text-align": [/.*/],
    },
  },
  enforceHtmlBoundary: true,
  nestingLimit: 4,
  transformTags: {
    b: (_tagName: any, att: any) => ({ tagName: "strong", ...att }),
  },
};

const clear = (html: string) => sanitizeHtml(html, options);

function getAllowedTags() {
  return [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "section",
    "blockquote",
    "div",
    "figure",
    "hr",
    "li",
    "ol",
    "p",
    "pre",
    "ul",
    "a",
    "abbr",
    "br",
    "cite",
    "code",
    "em",
    "i",
    "img",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "u",
    "caption",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
  ];
}
