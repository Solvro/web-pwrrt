import type {
  SerializedLinkNode,
  SerializedListNode,
  SerializedParagraphNode,
} from "@payloadcms/richtext-lexical";
import type { JSXConverters } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/lib/utils";

export const basicConverters: JSXConverters<
  SerializedParagraphNode | SerializedLinkNode | SerializedListNode
> = {
  paragraph: ({ node, nodesToJSX }) => {
    return <p className="py-2">{nodesToJSX({ nodes: node.children })}</p>;
  },
  link: ({ node, nodesToJSX }) => {
    return (
      <a
        className="text-custom-red font-semibold underline"
        href={node.fields.url}
        target={node.fields.newTab ? "_blank" : "_self"}
        rel={node.fields.newTab ? "noopener noreferrer" : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    );
  },
  list: ({ node, nodesToJSX }) => {
    return (
      <ul
        className={cn("list-inside", {
          "list-disc": node.tag === "ul",
          "list-decimal": node.tag === "ol",
        })}
      >
        {nodesToJSX({ nodes: node.children })}
      </ul>
    );
  },
};
