import { Container } from "react-bootstrap";
import "./styles.css";

const FourOFour = (props) => {
  return (
    <Container className="content-container">
      <div className="content-box">
        <div className="not-found">
          <h1>404</h1>
          <h4>Not Found</h4>
        </div>
      </div>
    </Container>
  );
};

export default FourOFour;
