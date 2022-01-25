import styled from "styled-components";
import { setUser } from "..//features/userSlice";
import { useAppDispatch } from "../store";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <NavBox>
      <div className="wrapper">
        <Link to="/" className="logo">
          Home
        </Link>
        <div>
          <Link to="/add">Add New Contact</Link>
          <button
            onClick={() => {
              dispatch(setUser(null));
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </NavBox>
  );
};

export default Header;

const NavBox = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #3089f9;
  color: white;

  .wrapper {
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      font-size: 22px;
      font-weight: 500;
    }

    a {
      color: white;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      margin-left: 20px;
      cursor: pointer;
      color: white;
      background-color: transparent;
      border: 2px solid white;
      border-radius: 8px;
      padding: 6px 14px;
      font-weight: 500;
    }
  }
`;
