<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          <xsl:value-of select="rss/channel/title" />
        </title>
        <style>
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            line-height: 1.6;
          }
          main {
            max-width: 800px;
            margin: 0 auto;
            padding: 32px 20px 48px;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 1.9rem;
          }
          p {
            margin: 8px 0 0;
          }
          a {
            color: #93c5fd;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          ul {
            list-style: none;
            margin: 28px 0 0;
            padding: 0;
          }
          li {
            padding: 16px 0;
            border-top: 1px solid #334155;
          }
          .meta {
            color: #94a3b8;
            font-size: 0.92rem;
          }
          .tags {
            margin-top: 8px;
            color: #cbd5e1;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>
            <xsl:value-of select="rss/channel/title" />
          </h1>
          <p>
            <xsl:value-of select="rss/channel/description" />
          </p>
          <p class="meta">
            Website:
            <a href="{rss/channel/link}">
              <xsl:value-of select="rss/channel/link" />
            </a>
          </p>
          <ul>
            <xsl:for-each select="rss/channel/item">
              <li>
                <h2>
                  <a href="{link}">
                    <xsl:value-of select="title" />
                  </a>
                </h2>
                <p class="meta">
                  <xsl:value-of select="pubDate" />
                </p>
                <p>
                  <xsl:value-of select="description" />
                </p>
                <xsl:if test="category">
                  <p class="tags">
                    Tags:
                    <xsl:for-each select="category">
                      <xsl:if test="position() &gt; 1">, </xsl:if>
                      <xsl:value-of select="." />
                    </xsl:for-each>
                  </p>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ul>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
