import React, { useState } from "react";
import { setUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import styled from "styled-components";
import appAxios from "../helpers/axios";
import { hashPasword } from "../helpers/hashPassword";
import LabelAndInput from "../components/LabelAndInput";
import LoginAndRegisterButton from "../components/LoginAndRegisterButton";
import FormSection from "../components/FormSection";

const Login = () => {
  let navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

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
      .get(`/users?email=${userData.email}&password=${password}`)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setUser(res.data[0]));
          navigate("/");
        } else {
          setError(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginBox>
      <FormSection submitHandler={submitHandler}>
        <>
          <LabelAndInput
            labelDescription="Email"
            placeholder="Your Email..."
            type="text"
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
            entry="Login"
            disabled={!email || !password}
          />

          {error && <span>Invalid credentials, try again</span>}
        </>
      </FormSection>
      <p>
        Don't you have an account? <Link to="/register">Sign up </Link>
      </p>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  p {
    margin-top: 20px;
  }

  span {
    text-align: center;
    color: red;
  }
`;
