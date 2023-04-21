export default {
    logo: <img style={{"height": "30px"}} src="logo-dark.svg" />,
    project: {
      link: "https://github.com/utxorpc",
    },
    sidebar: {
      defaultMenuCollapseLevel: 0
    },    
    chat: {
        link: "https://discord.gg/Vc3x8N9nz2",
    },
    docsRepositoryBase: "https://github.com/utxorpc/docs/blob/main",
    useNextSeoProps() {
        return {
            titleTemplate: "%s – UTxO RPC",
            description: "gRPC interface for UTxO blockchains",
            canonical: "https://utxorpc.org",
            siteName: "UTxO RPC",
            openGraph: {
                url: "https://utxorpc.org",
                title: "UTxO RPC",
                description: "gRPC interface for UTxO blockchains",
            },
            twitter: {
                handle: "@utxorpc",
            },
        };
    },
    footer: {
        text: "UTxO RPC",
    },
    primaryHue: 178,
    darkMode: false, //disable theme toggle
    nextThemes: {
      defaultTheme: "dark",
      forcedTheme: "dark",
      enableSystem: false
    }
  }