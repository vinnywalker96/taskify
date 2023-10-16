import react from 'react';
import Header from './header';

const Layout = ({children}: any) => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Header />
            {children}
        </div>
    )
}

export default Layout;