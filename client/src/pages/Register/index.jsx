import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { userRegister } from "../../store/actions/userActions";

import Spinner from "../../components/Spinner";

import bg from "../../assets/images/off_road.svg";

export default function Register() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.alertsReducer);

  const onFinish = (values) => {
    dispatch(userRegister(values));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col md={12} lg={14} style={{ position: "relative" }}>
          <img alt="car" className="w-100" src={bg} />
        </Col>
        <Col md={12} lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              <hr />
              <Link to="/login">Click Here to Login</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
