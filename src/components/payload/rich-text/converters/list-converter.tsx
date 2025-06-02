import type { SerializedListNode } from "@payloadcms/richtext-lexical";
import type { JSXConverters } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/lib/utils";

export const listConverter: JSXConverters<SerializedListNode> = {
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
