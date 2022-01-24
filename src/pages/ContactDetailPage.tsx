import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appAxios from "../helpers/axios";
import { Contact } from "../model/model";
import styled from "styled-components";
import Loading from "../components/Loading";

const ContactDetailPage = () => {
  const [loading, setLoading] = useState(true);

  const { contactId } = useParams();

  const [contact, setContact] = useState({} as Contact);

  useEffect(() => {
    appAxios.get(`/contacts/${contactId}`).then((res) => {
      setContact(res.data);
      setLoading(false);
    });
  }, [contactId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BoxDetail>
      <div>
        <h3>Contact Detail Page</h3>
        <p>
          <span>First Name : </span> {contact.firstName}
        </p>
        <p>
          <span>Last Name : </span> {contact.lastName}
        </p>
        <p>
          <span>Email : </span> {contact.email}
        </p>
        <p>
          <span>Age : </span> {contact.age || "-"}
        </p>
        <p>
          <span>Phone Number : </span> {contact.phoneNumber}
        </p>
        <p>
          <span>Website : </span> {contact.website || "-"}
        </p>
      </div>
    </BoxDetail>
  );
};

export default ContactDetailPage;

const BoxDetail = styled.div`
  width: 1100px;
  margin: 0 auto;

  h3 {
    margin: 20px 0;
    font-size: 22px;
  }

  p {
    margin: 12px 0;

    span {
      font-weight: 500;
    }
  }
`;
