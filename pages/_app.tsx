import '../app/globals.css';
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apollo';
import Layout from '@/app/components/layout';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from 'next-auth/react';
import { Container } from 'react-bootstrap';


function MyApp({ Component, pageProps: {
    session,
    ...pageProps

} }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <ApolloProvider client={apolloClient}>
                <Layout>
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </Layout>
            </ApolloProvider>
        </SessionProvider>
    )
}

export default MyApp;