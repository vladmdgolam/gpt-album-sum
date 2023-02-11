import Document, { Head, Html, Main, NextScript } from "next/document"

import { meta } from "./constants"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content="twitterbio.com" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.name} />
          <meta name="twitter:description" content={meta.description} />
          <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
