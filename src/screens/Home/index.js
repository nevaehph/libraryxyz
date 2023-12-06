import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  nric: yup
    .string()
    .required("NRIC is required")
    .matches(/^[STFG]\d{7}[A-Z]$/, {
      message: "Invalid NRIC",
      excludeEmptyString: false,
    }),
  podNumber: yup.number().required("Pod Number is required"),
  date: yup
    .date()
    .required("Please select a Date")
    .min(new Date(), "Please select a valid Date"),
  timing: yup.string().required("Please select a Timing"),
  duration: yup.string().required("Please select a Duration"),
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

  const navigate = useNavigate();

  const setMinValue = () => {
    let currentDate = new Date();
    return `${currentDate.getUTCFullYear()}-${(
      "0" +
      (currentDate.getUTCMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  };

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
      setIsLoading(false);
      navigate("/success", { state: data });
    }, 2000);
  };

  useEffect(() => {
    console.log({ errors });
  }, [errors]);

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
                  <Form.Control
                    isInvalid={errors.name}
                    type="text"
                    placeholder="Name"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <Form.Control.Feedback type="invalid">
                  {errors.name.message}
                </Form.Control.Feedback>
              )}
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
                    isInvalid={errors.nric}
                    type="text"
                    placeholder="NRIC No."
                    {...field}
                  />
                )}
              />
              {errors.nric && (
                <Form.Control.Feedback type="invalid">
                  {errors.nric.message}
                </Form.Control.Feedback>
              )}
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
                  <Form.Select
                    isInvalid={errors.podNumber}
                    {...field}
                    onChange={onPodChange}
                  >
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
            {errors.podNumber && (
              <Form.Control.Feedback type="invalid">
                {errors.podNumber.message}
              </Form.Control.Feedback>
            )}
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
                  isInvalid={errors.date}
                  min={setMinValue()}
                />
              )}
            />
            {errors.date && (
              <Form.Control.Feedback type="invalid">
                {errors.date.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="timing">Timing of Booking</Form.Label>
            <Controller
              disabled={isLoading}
              name="timing"
              control={control}
              render={({ field }) => {
                return (
                  <Form.Select {...field} isInvalid={errors.timing}>
                    <option value="">Select a value</option>
                    <option value="12:00PM">12:00PM</option>
                    <option value="12:30PM">12:30PM</option>
                    <option value="1:00PM">1:00PM</option>
                  </Form.Select>
                );
              }}
            />
            {errors.timing && (
              <Form.Control.Feedback type="invalid">
                {errors.timing.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="timing">Duration of Booking</Form.Label>
            <Controller
              disabled={isLoading}
              name="duration"
              control={control}
              render={({ field }) => {
                return (
                  <Form.Select {...field} isInvalid={errors.duration}>
                    <option value="">Select a value</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">1 Hour</option>
                    <option value="90">1.5 Hours</option>
                    <option value="120">2 Hours</option>
                  </Form.Select>
                );
              }}
            />
            {errors.duration && (
              <Form.Control.Feedback type="invalid">
                {errors.duration.message}
              </Form.Control.Feedback>
            )}
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
