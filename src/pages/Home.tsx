import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContactItem from "../components/ContactItem";
import Loading from "../components/Loading";
import { setContactData } from "../features/userContactSlice";
import appAxios from "../helpers/axios";
import { useAppDispatch, useAppSelector } from "../store";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const user = useAppSelector((state) => state.user.user);

  const contacts = useAppSelector((state) => state.contacts.contacts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    appAxios.get(`/contacts?userId=${user?.id}`).then((res) => {
      dispatch(setContactData(res?.data));
      setLoading(false);
    });
  }, [user, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <HomeBox>
      {contacts.length === 0 ? (
        <div className="welcome">
          Welcome <span> {user?.firstName} </span> you don't have any contacts
          yet. Click <Link to="/add"> here </Link>
          and start adding new contacts !
        </div>
      ) : (
        <>
          <h3>You have #{contacts.length} contact </h3>

          {contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
        </>
      )}
    </HomeBox>
  );
};

export default Home;

const HomeBox = styled.div`
  width: 1100px;
  margin: 0 auto;

  .welcome {
    margin-top: 200px;
    text-align: center;

    span {
      font-weight: 500;
    }

    a {
      color: blue;
    }
  }

  h3 {
    margin: 30px 0;
    font-size: 16px;
    font-weight: 500;
  }
`;
