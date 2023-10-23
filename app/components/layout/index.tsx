import react from 'react';
import Header from './header';
import Footer from '../Footer';

const Layout = ({children}: any) => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            {children}
            <Footer />
            
        </div>
    )
}

export default Layout;