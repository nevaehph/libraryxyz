import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const formSchema = yup.object({
  name: yup.string().required(),
  nric: yup
    .string()
    .matches(/^[STFG]\d{7}[A-Z]$/, {
      message: "Invalid NRIC",
      excludeEmptyString: false,
    }),
  date: yup.date().required("Please select a Date"),
  timing: yup.string().required(),
  duration: yup.string().required(),
});

const roomInformation = [
  {
    podNumber: 1,
    roomColor: "Green",
    size: "Large",
    maxOccupants: 6,
  },
  {
    podNumber: 2,
    roomColor: "Blue",
    size: "Medium",
    maxOccupants: 4,
  },
  {
    podNumber: 3,
    roomColor: "Red",
    size: "Small",
    maxOccupants: 2,
  },
  {
    podNumber: 4,
    roomColor: "Yellow",
    size: "Large",
    maxOccupants: 8,
  },
  {
    podNumber: 5,
    roomColor: "Brown",
    size: "Very Large",
    maxOccupants: 10,
  },
  {
    podNumber: 6,
    roomColor: "Pink",
    size: "Medium",
    maxOccupants: 3,
  },
  {
    podNumber: 7,
    roomColor: "Orange",
    size: "Large",
    maxOccupants: 7,
  },
  {
    podNumber: 8,
    roomColor: "Black",
    size: "Very Large",
    maxOccupants: 12,
  },
];

const Home = (props) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [locationValue, setLocationValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPodChange = (event) => {
    const value = event.target.value;
    setValue("podNumber", value);
    if (value != "") {
      setLocationValue(
        applyLocationText(
          roomInformation.find((ele) => ele.podNumber == parseInt(value))
        )
      );
    } else {
      setLocationValue("");
    }
  };

  const applyLocationText = (locationObj) => {
    return `Room Color: ${locationObj.roomColor}\nRoom Size: ${locationObj.size}\nMax Occupants: ${locationObj.maxOccupants}`;
  };

  const onSubmit = (data) => {
    console.log({ data });

    //simulate API Call
    setIsLoading(true);

    setTimeout(() => {
      console.log("setting false");
      setIsLoading(false);
    }, 5000);
  };

  return (
    <Container className="content-container">
      <div className="content-box">
        <h2>Library Pod Booking</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Controller
                disabled={isLoading}
                name="name"
                control={control}
                render={({ field }) => (
                  <Form.Control type="text" placeholder="Name" {...field} />
                )}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor="nric">NRIC</Form.Label>
              <Controller
                disabled={isLoading}
                name="nric"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    disabled={isLoading}
                    type="text"
                    placeholder="NRIC No."
                    {...field}
                  />
                )}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="podNumber">Pod Number</Form.Label>
            <Controller
              disabled={isLoading}
              name="podNumber"
              control={control}
              render={({ field }) => {
                return (
                  <Form.Select {...field} onChange={onPodChange}>
                    <option value="">Select a value</option>
                    {roomInformation.map((item) => {
                      return (
                        <option key={item.podNumber} value={item.podNumber}>
                          {item.podNumber}
                        </option>
                      );
                    })}
                  </Form.Select>
                );
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="podLocation">Pod Location</Form.Label>
            <Form.Control
              id="podLocation"
              as="textarea"
              value={locationValue}
              disabled
              rows={4}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="date">Date of Booking</Form.Label>
            <Controller
              disabled={isLoading}
              name="date"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="date"
                  placeholder="Select Date"
                  {...field}
                  min={new Date().toISOString().split("T")[0]}
                />
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="timing">Timing of Booking</Form.Label>
            <Controller
              disabled={isLoading}
              name="timing"
              control={control}
              render={({ field }) => {
                return (
                  <Form.Select {...field}>
                    <option value="">Select a value</option>
                    <option value="12:00PM">12:00PM</option>
                    <option value="12:30PM">12:30PM</option>
                    <option value="1:00PM">1:00PM</option>
                  </Form.Select>
                );
              }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="timing">Duration of Booking</Form.Label>
            <Controller
              disabled={isLoading}
              name="duration"
              control={control}
              render={({ field }) => {
                return (
                  <Form.Select {...field}>
                    <option value="">Select a value</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">1 Hour</option>
                    <option value="90">1.5 Hours</option>
                    <option value="120">2 Hours</option>
                  </Form.Select>
                );
              }}
            />
          </Form.Group>
          <Form.Group className="mb-1 d-grid gap-2">
            <Button
              disabled={isLoading}
              variant="success"
              as="input"
              type="submit"
              value={isLoading ? "Submitting..." : "Submit"}
              size="lg"
            />
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Home;
