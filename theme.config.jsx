export default {
    logo: <img style={{"height": "30px"}} src="/logo-dark.svg" />,
    project: {
      link: "https://github.com/utxorpc",
    },
    sidebar: {
      defaultMenuCollapseLevel: 1
    },    
    chat: {
        link: "https://discord.gg/Vc3x8N9nz2",
    },
    head: (
      <>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    ),
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
                images: [
                  {
                    url: "https://utxorpc.org/og-image.png",
                    width: 761,
                    height: 508,
                    alt: "UTxO RPC",
                    type: "image/png",
                  }
                ] 
            },
            twitter: {
                site: "@utxorpc",
                card: "summary_large_image",
            },
        };
    },
    footer: {
        text: "UTxO RPC",
    },
    primaryHue: 178,
    darkMode: false, //disable theme toggle
  }