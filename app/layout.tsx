import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
    title: 'GreenAlert',
    description: 'Mapeo de problemas ambientales'
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang='es'>
            <body className={cn(fontSans.variable)}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    <div className='min-h-screen bg-background font-sans antialiased'>
                        <Header />
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
