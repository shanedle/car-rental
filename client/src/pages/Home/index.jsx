import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, DatePicker, Button } from "antd";
import moment from "moment";

import { getAllCars } from "../../store/actions/carsActions";

import DefaultLayout from "../../components/DefaultLayout";
import Spinner from "../../components/Spinner";

const { RangePicker } = DatePicker;

export default function Home() {
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const setFilter = (values) => {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalCars(temp);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <Row className="mb-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

      <Row justify="center" gutter={16}>
        {totalCars?.map((car) => {
          return (
            <Col key={car._id} lg={5} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={car.image} alt={car.name} className="carimg" />

                <div className="d-flex align-items-center justify-content-between">
                  <div className="text-left pl-2">
                    <p>{car.name}</p>
                    <p>{car.costPerHour} KR Per Hour</p>
                  </div>

                  <div>
                    <Button type="primary">
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}
