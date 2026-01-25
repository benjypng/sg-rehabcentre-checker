import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import type { Metadata, Viewport } from 'next'
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'

import { theme } from '../theme'
import { ForcePasswordChange } from './components/ForcePasswordChange'
import Provider from './SessionProvider'

export const metadata: Metadata = {
  title: 'SG Rehabcentre Checker',
  description: 'SG Rehabcentre Checker Application',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications position="top-right" />
          <Provider>
            <ForcePasswordChange />
            {children}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  )
}
