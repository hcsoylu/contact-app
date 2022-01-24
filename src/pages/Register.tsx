import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { setUser } from "../features/userSlice";
import styled from "styled-components";
import appAxios from "../helpers/axios";
import { hashPasword } from "../helpers/hashPassword";
import LabelAndInput from "../components/LabelAndInput";
import LoginAndRegisterButton from "../components/LoginAndRegisterButton";
import FormSection from "../components/FormSection";

const Register = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const password = hashPasword(userData.password);

    appAxios
      .post("/users", { ...userData, password })
      .then((res) => {
        dispatch(setUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <RegisterBox>
      <FormSection submitHandler={submitHandler}>
        <>
          <LabelAndInput
            labelDescription="First Name"
            placeholder="Your First Name..."
            type="text"
            idAndHtmlFor="firstName"
            handleChange={handleChange}
            value={firstName}
          />
          <LabelAndInput
            labelDescription="Last Name"
            placeholder="Your Last Name..."
            type="text"
            idAndHtmlFor="lastName"
            handleChange={handleChange}
            value={lastName}
          />
          <LabelAndInput
            labelDescription="Email"
            placeholder="Your Email..."
            type="email"
            idAndHtmlFor="email"
            handleChange={handleChange}
            value={email}
          />
          <LabelAndInput
            labelDescription="Password"
            placeholder="Your Password..."
            type="password"
            idAndHtmlFor="password"
            handleChange={handleChange}
            value={password}
          />
          <LoginAndRegisterButton
            entry="Sign Up"
            disabled={!firstName || !lastName || !email || !password}
          />
        </>
      </FormSection>
      <p>
        You already have an account? <Link to="/login">Log in </Link>
      </p>
    </RegisterBox>
  );
};

export default Register;

const RegisterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  p {
    margin-top: 20px;
  }
`;
