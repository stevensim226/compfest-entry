import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export class Navigation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Navbar className="navbar">
                <Container className=" d-flex justify-content-around nav-container">
                    <Navbar.Brand><span className="nav-title">PACIL-GAG</span></Navbar.Brand>
                        

                    <Form className="">
                        <FormControl type="text" placeholder="Search a meme" className="mr-sm-2 searchbar" />
                    </Form>

                    <Nav className="">
                            <NavLink to="/" exact activeClassName="font-weight-bold" className="text-light mr-2">Discover</NavLink>
                            <NavLink to="/saved" activeClassName="font-weight-bold" className="text-light">Saved Memes</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default Navigation
