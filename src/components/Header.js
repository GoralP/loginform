// import React from "react";
// import { Container, Row, Col } from "reactstrap";
// import pastebin from "../images/pastebin.jpg";
// import { addPaste, getPaste } from "../redux/actions";
// import { useDispatch, useSelector } from "react-redux";

// const Header = () => {
//   const dispatch = useDispatch();

//   const abc = localStorage.getItem("tokenn");
//   console.log(abc);
//   return (
//     <Container fluid="fluid" className="header">
//       <Row className="mt-3">
//         <Col xs="6" className="">
//           <Row>
//             <img src={pastebin} className="logo"></img>
//             <p className="logo-text">PASTEBIN</p>
//           </Row>
//         </Col>
//         <Col xs="6" className="">
//           {abc}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Header;

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Label,
  Button,
} from "reactstrap";
import pastebin from "../images/pastebin.jpg";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const user = localStorage.getItem("tokenn");
  console.log(user);

  const logout = () => {
    if (localStorage.clear("tokenn")) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <Navbar color="white" light expand="md" className="header">
      <NavbarBrand>
        <img className="logo" src={pastebin} alt="logo" />
      </NavbarBrand>
      <NavbarBrand>
        <h4 className="text-secondary logo-text">PASTEBIN</h4>
        <div></div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar></Nav>
        <NavbarText className="user pr-3">{user}</NavbarText>
        <Button onClick={logout}>Logout</Button>
      </Collapse>
    </Navbar>
  );
};

export default Header;
