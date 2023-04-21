import { remarkMermaid } from "remark-mermaid-nextra";
import nextra from "nextra";

export default nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  mdxOptions: {
    remarkPlugins: [remarkMermaid],
  },
});
