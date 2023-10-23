import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import { Container } from 'react-bootstrap'

const poppins = Poppins({
   weight: ['400', '700'],
   subsets: ['latin']
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proximo',
  description: 'Your gateway to success',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ poppins.className }>
        <Container>
           {children}
        </Container>
        </body>
    </html>
  )
}
