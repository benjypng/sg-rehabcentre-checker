import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

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

export const metadata = {
  title: 'SG Rehabcentre Checker',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
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
