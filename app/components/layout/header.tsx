import react, { useState, useEffect } from 'react';
import { Navbar, Container, Button, NavbarBrand, Nav } from 'react-bootstrap'; 
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
    const [name, setName] = useState<string>('');
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.name) {
            setName(name);
        }
    },[name, session])
    return (
        <Navbar>
            <Container>
                <NavbarBrand>
                    <Link href='/'>
                    Proximo
                    </Link>
                </NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content">
                    <Navbar.Text className='p-3'>
                        <Link href='/about'>About Us</Link>
                    </Navbar.Text>
                    <Navbar.Text className='p-3'>
                        <Link href='/services'>Services</Link>
                    </Navbar.Text>
                    <Navbar.Text className='p-3'>
                        <Link href='/contact'>Contact Us</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
              
                

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className='p-4'>
                        {session ? (
                            // User is logged in, display logout button
                            <Button variant='primary' onClick={() => signOut()}>
                                Logout
                            </Button>
                        ) : (
                            // User is not logged in, display login button
                            <Button variant='primary'>
                                <Link href='/login'>Login</Link>
                            </Button>
                        )}
                    </Navbar.Text>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    )
}

export default Header;