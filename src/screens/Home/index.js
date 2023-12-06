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

import roomInformation from "../../lib/podData";
import parsePodData from "../../lib/parsePodData";

import parseMonth from "../../lib/parseMonth";
import parseTimeString from "../../lib/parseTimeString";
import parseTime from "../../lib/parseTime";
import parseDuration from "../../lib/parseDuration";

const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  nric: yup
    .string()
    .required("NRIC is required")
    .matches(/^[STFG]\d{7}[A-Z]$/, {
      message: "Invalid NRIC",
      excludeEmptyString: false,
    }),
  podNumber: yup
    .number()
    .typeError("Pod Number is required")
    .required("Pod Number is required"),
  date: yup
    .date()
    .typeError("Please select a Date")
    .required("Please select a Date")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Please select a valid Date"
    ),
  timing: yup.string().required("Please select a Timing"),
  duration: yup.number().required("Please select a Duration"),
});

const Home = (props) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      nric: "",
      date: "",
    },
    resolver: yupResolver(formSchema),
  });

  //opening and closing times in XX:XX:XX (24 hour format)
  const openingTime = "12:00:00";
  const closingTime = "20:00:00";

  //base duration values (in minutes)
  let baseDurations = [30, 60, 90, 120];

  const [locationValue, setLocationValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timingOptions, setTimingOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

  const navigate = useNavigate();

  const setMinValue = () => {
    let currentDate = new Date();
    return `${currentDate.getUTCFullYear()}-${(
      "0" +
      (currentDate.getUTCMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
  };

  const determineTiming = (selectedDate) => {
    let timings = [];
    let isToday = false;
    let openingDate = new Date(
      `${parseMonth(
        selectedDate.getMonth()
      )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}, ${openingTime}`
    );
    //if the selectedDate is today, remove timings that have already passed the current time
    if (selectedDate.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
      isToday = true;
    }
    let closingDate = new Date(
      `${parseMonth(
        selectedDate.getMonth()
      )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}, ${closingTime}`
    );
    const thirtyMinutesInMillis = 30 * 60 * 1000;
    const currentTime = new Date().getTime();
    while (openingDate.getTime() < closingDate.getTime()) {
      let openingDateTime = openingDate.getTime();
      if (isToday) {
        if (openingDateTime > currentTime) {
          timings.push(parseTimeString(openingDate));
        }
      } else {
        timings.push(parseTimeString(openingDate));
      }

      openingDate.setTime(openingDateTime + thirtyMinutesInMillis);
    }
    return timings;
  };

  const determineDuration = (time) => {
    //use current date as the placeholder to generate the dates for comparison
    let date = new Date(new Date().setHours(0, 0, 0, 0));
    let timeString = parseTime(time);
    let durationArray = [];

    let selectedDate = new Date(
      `${parseMonth(
        date.getMonth()
      )} ${date.getDate()}, ${date.getFullYear()}, ${timeString}`
    );

    let closingDate = new Date(
      `${parseMonth(
        date.getMonth()
      )} ${date.getDate()}, ${date.getFullYear()}, ${closingTime}`
    );

    for (var i = 0; i < baseDurations.length; i++) {
      let millisToAdd = baseDurations[i] * 60 * 1000;
      let compareDate = new Date(selectedDate.getTime() + millisToAdd);
      if (compareDate <= closingDate.getTime()) {
        durationArray.push(baseDurations[i]);
      }
    }

    return durationArray;
  };

  const onPodChange = (event) => {
    const value = event.target.value;
    setValue("podNumber", value);
    if (value !== "") {
      setLocationValue(
        parsePodData(
          roomInformation.find((ele) => ele.podNumber === parseInt(value))
        )
      );
    } else {
      setLocationValue("");
    }
  };

  const onDateChange = (event) => {
    const value = event.target.value;
    let date = new Date(value);
    setValue("date", value);
    let timingArray = determineTiming(date);
    if (timingArray.length <= 0) {
      setError("date", {
        type: "custom",
        message:
          "Library Pods are no longer available for this date, please select another date",
      });
    } else {
      clearErrors("date");
    }
    setTimingOptions(timingArray);
  };

  const onTimingChange = (event) => {
    const value = event.target.value;
    setValue("timing", value);
    clearErrors("timing");
    setDurationOptions(determineDuration(value));
  };

  useEffect(() => {
    if (timingOptions.length > 0) {
      if (timingOptions.indexOf(getValues("timing")) === -1) {
        setValue("timing", null);
        setDurationOptions([]);
        setValue("duration", null);
      }
    } else {
      setValue("timing", null);
      setDurationOptions([]);
      setValue("duration", null);
    }
  }, [timingOptions, getValues, setValue]);

  useEffect(() => {
    if (durationOptions.length > 0) {
      if (durationOptions.indexOf(parseInt(getValues("duration"))) === -1) {
        setValue("duration", null);
      }
    } else {
      setValue("duration", null);
    }
  }, [durationOptions, getValues, setValue]);

  const onSubmit = (data) => {
    clearErrors();
    let selectedDate = new Date(
      `${parseMonth(
        data.date.getMonth()
      )} ${data.date.getDate()}, ${data.date.getFullYear()}, ${parseTime(
        data.timing
      )}`
    );
    if (selectedDate.getTime() <= new Date().getTime()) {
      setError("timing", {
        type: "custom",
        message:
          "The selected Timing of Booking has already passed. Please select a different timing",
      });
      setError("date", {
        type: "custom",
        message:
          "The selected Timing of Booking has already passed. Please select a different timing",
      });
      return;
    }
    //simulate API Call
    setIsLoading(true);

    setTimeout(() => {
      //set pod location data
      data.podLocation = parsePodData(roomInformation[data.podNumber]);
      setIsLoading(false);
      navigate("/success", { state: data });
    }, 2000);
  };

  const loadTimingOptions = (options) => {
    if (options.length > 0) {
      return options.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      });
    }
    return null;
  };

  const loadDurationOptions = (options) => {
    if (options.length > 0) {
      return options.map((item) => {
        var name = parseDuration(item);
        return (
          <option key={item} value={item}>
            {name} {item <= 60 ? "Hour" : "Hours"}
          </option>
        );
      });
    }
    return null;
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
                    <option value>Select a value</option>
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
                  onChange={onDateChange}
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
                  <Form.Select
                    {...field}
                    isInvalid={errors.timing}
                    onChange={onTimingChange}
                  >
                    <option value>Select a value</option>
                    {loadTimingOptions(timingOptions)}
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
                    <option value>Select a value</option>
                    {loadDurationOptions(durationOptions)}
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
