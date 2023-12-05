import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./styles.css";

const Header = (props) => {
  return (
    <Navbar sticky="top" expand="lg" className="top-navbar">
      <Container>
        <Navbar.Brand href="/">Library XYZ</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
