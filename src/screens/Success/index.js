import { Button, Container } from "react-bootstrap";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import parseDuration from "../../lib/parseDuration";
import parseDateString from "../../lib/parseDateString";

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const detailSort = [
    { id: "name", title: "Name" },
    { id: "podNumber", title: "Pod Number" },
    { id: "podLocation", title: "Pod Location" },
    { id: "date", title: "Date of Booking" },
    { id: "timing", title: "Timing of Booking" },
    { id: "duration", title: "Duration of Booking" },
  ];

  if (state == null) {
    navigate("/", { replace: true });
  }

  const displayBookingDetails = (data) => {
    if (data) {
      return detailSort.map((item) => {
        if (data[item.id]) {
          let detailInfo =
            item.id === "duration"
              ? `${parseDuration(data[item.id])} Hour(s)`
              : item.id === "date"
              ? parseDateString(data[item.id])
              : data[item.id];

          return (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <div>{detailInfo}</div>
              </td>
            </tr>
          );
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  };

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <Container className="content-container">
      <div className="content-box">
        <div className="success-box">
          <img className="tick mb-3" alt="success" src="/img/success.png" />
          <h1 className="mb-3">Your Pod Booking is Successful</h1>
          <div className="mb-3">Your booking details are as follows</div>
          {state && (
            <table className="mb-3 booking-details">
              <tbody>{displayBookingDetails(state)}</tbody>
            </table>
          )}
          <h3>We look forward to seeing you!</h3>
          <div className="mt-3">
            <Button variant="primary" className="p-3" onClick={returnToHome}>
              Return to Booking Page
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Success;
