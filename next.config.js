import { remarkMermaid } from "remark-mermaid-nextra";
import nextra from "nextra";

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: { remarkPlugins: [remarkMermaid] }
})

/** @type {import('next').NextConfig} */
export default withNextra({
  trailingSlash: true,
  async rewrites() {
    const grpcuiUrl = process.env.GRPCUI_URL || 'http://127.0.0.1:8081';
    return [
      {
        source: '/grpcui/:path*',
        destination: `${grpcuiUrl}/:path*`
      },
    ]
  }
})