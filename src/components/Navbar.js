import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import styled from "styled-components";


const Style = styled.div`
 .navbar {
     background-color: #222;
 }

 .navbar-nav, .navbar-brand, .nav-link {
     color: #bbb;

     &:hover {
        display: white;
      }
    
 }
`;

const NavBar = () => {


    return(
    <Style>
            <Navbar style = {{marginBottom: "20px"}} expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                             alt=""
                             src="/logo_kino2.png"
                             width="30"
                             height="30"
                                className="d-inline-block align-top"
                        />{' '}
                    Kinomaniak</Navbar.Brand>
                        <Nav className="ms-auto">
                            <Nav.Link href="/filmy">Filmy</Nav.Link>
                            <Nav.Link href="/seanse" >Seanse</Nav.Link>
                            <Nav.Link href="/statystyki"> Statystyki </Nav.Link>
                         </Nav>
                </Container>
            </Navbar>
    </Style>
    );
}

export default NavBar;
 