import type { SerializedHeadingNode } from "@payloadcms/richtext-lexical";
import type { JSXConverters } from "@payloadcms/richtext-lexical/react";

function getHeadingId(textContent: string) {
  return textContent
    .toLowerCase()
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^a-z0-9-]/g, "");
}

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    switch (node.tag) {
      case "h1": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");
        const id = getHeadingId(textContent);
        return (
          <h1 className="py-2 text-4xl font-bold" id={id}>
            {textContent}
          </h1>
        );
      }
      case "h2": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");

        const id = getHeadingId(textContent);
        return (
          <h2 id={id} className="text-2xl">
            {text}
          </h2>
        );
      }

      case "h3": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");
        const id = getHeadingId(textContent);
        return (
          <h3 className="py-2 text-xl font-bold" id={id}>
            {textContent}
          </h3>
        );
      }
      case "h4": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");
        return <h4 className="py-2 text-lg font-bold">{textContent}</h4>;
      }
      case "h5": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");
        return <h5 className="py-2 text-base font-bold">{textContent}</h5>;
      }
      case "h6": {
        const text = nodesToJSX({ nodes: node.children });
        const textContent = text
          .map((item) => (typeof item === "string" ? item : ""))
          .join("");
        return <h6 className="py-2 text-sm font-bold">{textContent}</h6>;
      }
    }
  },
};
