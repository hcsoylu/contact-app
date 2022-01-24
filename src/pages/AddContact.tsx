import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addContact } from "../features/userContactSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { useLocation } from "react-router-dom";
import appAxios from "../helpers/axios";
import LabelAndInput from "../components/LabelAndInput";
import { validatePhoneNumber } from "../helpers/validatePhoneNumber";

type LocationState = { contactId: string } | null;

const AddContact = () => {
  const location = useLocation();

  let navigate = useNavigate();

  const state = location.state as LocationState;

  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    website: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const { firstName, lastName, phoneNumber, email, age, website } = contactData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (state !== null) {
      appAxios.get(`/contacts/${state.contactId}`).then((res) => {
        setContactData(res.data);
      });
    } else {
      setContactData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        age: "",
        website: "",
      });
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !phoneNumber || !email) {
      setErrorMessage("Please field required (*) fields.");
      return;
    }

    const valid = validatePhoneNumber(phoneNumber);

    if (!valid) {
      setErrorMessage(
        "Phone number is not valid. Example number: +491711234567"
      );
      return;
    }

    if (state !== null) {
      appAxios
        .patch(`/contacts/${state.contactId}`, contactData)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    } else {
      const sendContactData = { ...contactData, userId: user?.id };

      appAxios
        .post("/contacts", sendContactData)
        .then((res) => {
          dispatch(addContact(res.data));
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ContactBox>
      <h3>{location.pathname === "/edit" ? "Edit Contact" : "Add Contact"}</h3>
      {errorMessage && <p> {errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="row">
            <div className="inside">
              <div className="required">*</div>
              <LabelAndInput
                labelDescription="First Name"
                placeholder="First Name"
                type="text"
                idAndHtmlFor="firstName"
                handleChange={handleChange}
                value={firstName}
              />
            </div>
            <div className="inside">
              <div className="required">*</div>
              <LabelAndInput
                labelDescription="Last Name"
                placeholder="Last Name"
                type="text"
                idAndHtmlFor="lastName"
                handleChange={handleChange}
                value={lastName}
              />
            </div>
          </div>

          <div className="row">
            <div className="inside">
              <div className="required">*</div>
              <LabelAndInput
                labelDescription="Telephone Number"
                placeholder="Telephone Number"
                type="text"
                idAndHtmlFor="phoneNumber"
                handleChange={handleChange}
                value={phoneNumber}
              />
            </div>
            <div className="inside">
              <div className="required">*</div>
              <LabelAndInput
                labelDescription="Email"
                placeholder="Email"
                type="email"
                idAndHtmlFor="email"
                handleChange={handleChange}
                value={email}
              />
            </div>
          </div>

          <div className="row">
            <div className="inside">
              <LabelAndInput
                labelDescription="Age"
                placeholder="Age"
                type="text"
                idAndHtmlFor="age"
                handleChange={handleChange}
                value={age}
              />
            </div>
            <div className="inside">
              <LabelAndInput
                labelDescription="Personal Website"
                placeholder="Personal Website"
                type="text"
                idAndHtmlFor="website"
                handleChange={handleChange}
                value={website}
              />
            </div>
          </div>
        </div>

        <button type="submit">
          {location.pathname === "/edit" ? "Edit Contact" : "Add Contact"}
        </button>
      </form>
    </ContactBox>
  );
};

export default AddContact;

const ContactBox = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding: 0 20px;

  h3 {
    text-align: center;
    margin: 20px;
  }

  p {
    text-align: center;
    color: red;
  }

  form {
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    button {
      width: 200px;
      background-color: #3089f9;
      color: white;
      padding: 12px 20px;
      margin: 30px auto;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #2c70c4;
      }
    }

    .wrapper {
      display: flex;
      flex-direction: column;

      .row {
        display: flex;
        margin-top: 20px;

        .inside {
          flex: 1;
          margin-right: 20px;
          position: relative;

          .required {
            color: red;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
