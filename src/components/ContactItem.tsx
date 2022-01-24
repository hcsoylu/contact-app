import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteContact } from "../features/userContactSlice";
import appAxios from "../helpers/axios";
import { Contact } from "../model/model";
import { useAppDispatch } from "../store";

type ContactItemProps = {
  contact: Contact;
};

const ContactItem = ({ contact }: ContactItemProps) => {
  const fullName = `${contact.firstName} ${contact.lastName}`;

  const dispatch = useAppDispatch();

  const handleDelete = (contactId: string) => {
    appAxios.delete(`/contacts/${contactId}`).then((_) => {
      dispatch(deleteContact(contactId));
    });
  };

  return (
    <RowItem>
      <p>{fullName}</p>
      <div className="right">
        <Link
          to={`/contacts/${contact.id}`}
          state={{ contactId: contact.id }}
          className="detail"
        >
          Detail
        </Link>
        <Link to={`/edit`} state={{ contactId: contact.id }} className="edit">
          Edit
        </Link>
        <span className="delete" onClick={() => handleDelete(contact.id)}>
          Delete
        </span>
      </div>
    </RowItem>
  );
};

export default ContactItem;

const RowItem = styled.div`
  height: 50px;
  border: 2px solid #3089f9;
  margin: 20px 0;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;

    .delete {
      color: red;
    }

    .edit {
      color: green;
    }

    .detail {
      color: #3089f9;
    }

    span,
    a {
      margin-left: 25px;
      cursor: pointer;
    }
  }
`;
