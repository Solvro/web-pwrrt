import type { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { basicConverters } from "./basic-converters";
import { headingConverter } from "./heading-converter";

type NodeTypes = DefaultNodeTypes;

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...headingConverter,
  ...basicConverters,
});
