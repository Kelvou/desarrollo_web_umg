import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header(){
    return(
        <Navbar className='navbar-custom'>
            <Container>
             <Navbar.Brand >Tienda Online (HT8)</Navbar.Brand>
             <br/>
             <p className='firma'>Desarrollado por: Kelvin José Gómez Morales (9490-19-480) y Lester Haroldo Blanco Melendres (9490-19-5517)</p>
            </Container>
        </Navbar>
    );
}
export default Header;