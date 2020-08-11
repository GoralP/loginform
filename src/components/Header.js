import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  Button,
  NavItem,
  NavLink,
} from "reactstrap";
import pastebin from "../images/pastebin.PNG";
import { useHistory } from "react-router-dom";
import { SignOutIcon } from "@primer/octicons-react";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const user = localStorage.getItem("userName");

  const logout = () => {
    if (localStorage.clear("token")) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <Navbar className="header" light expand="md">
      <NavbarBrand>
        <img className="logo" src={pastebin} alt="logo" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#" className="text-white">
              HOME
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white">
              TOOLS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" className="text-white">
              PASTE
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarText className="user pr-3 text-white">
          <FaUser className="mr-1 text-info" />
          {user}
        </NavbarText>
        <Button onClick={logout}>
          <SignOutIcon size={16} />
        </Button>
      </Collapse>
    </Navbar>
  );
};

export default Header;
