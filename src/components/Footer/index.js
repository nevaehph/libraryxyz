import { Container, Col, Row } from "react-bootstrap";
import "./styles.css";

const Footer = (props) => {
  return (
    <div className="footer">
      <Container className="footer-container">
        <Col>
          <div>©2023 Library XYZ.</div>
          <div>All rights reserved.</div>
        </Col>
      </Container>
    </div>
  );
};

export default Footer;
