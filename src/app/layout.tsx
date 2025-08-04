import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alex Leung | Software Engineer | Kitchener',
  description: 'Alex Leung - Software Engineer in Kitchener, Ontario. Electrical Engineering graduate from University of Waterloo and Georgia Tech. Full-stack developer specializing in web applications and systems design.',
  keywords: 'Alex Leung, software engineer, Kitchener, Ontario, University of Waterloo, Georgia Tech, electrical engineering, full-stack developer, web development',
  authors: [{ name: 'Alex Leung' }],
  creator: 'Alex Leung',
  publisher: 'Alex Leung',
  robots: 'index, follow',
  metadataBase: new URL('https://alexleung.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alex Leung | Software Engineer | Kitchener',
    description: 'Alex Leung - Software Engineer in Kitchener, Ontario. Electrical Engineering graduate from University of Waterloo and Georgia Tech. Full-stack developer specializing in web applications and systems design.',
    type: 'website',
    url: 'https://alexleung.ca',
    siteName: 'Alex Leung',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary',
    title: 'Alex Leung | Software Engineer | Kitchener',
    description: 'Alex Leung - Software Engineer in Kitchener, Ontario. Electrical Engineering graduate from University of Waterloo and Georgia Tech.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Alex Leung",
              "jobTitle": "Software Engineer",
              "description": "Software Engineer specializing in full-stack web development and systems design",
              "url": "https://alexleung.ca",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kitchener",
                "addressRegion": "Ontario",
                "addressCountry": "Canada"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "University of Waterloo",
                  "description": "Electrical Engineering"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Georgia Institute of Technology",
                  "description": "Electrical Engineering"
                }
              ],
              "knowsAbout": [
                "Software Engineering",
                "Web Development",
                "Full-stack Development",
                "Systems Design",
                "Electrical Engineering"
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}