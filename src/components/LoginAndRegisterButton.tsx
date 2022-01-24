import styled from "styled-components";

type LoginAndRegisterButtonProps = {
  entry: string;
  disabled?: boolean;
};

const LoginAndRegisterButton = ({
  entry,
  disabled,
}: LoginAndRegisterButtonProps) => {
  return (
    <AuthButton type="submit" disabled={disabled}>
      {entry}
    </AuthButton>
  );
};

export default LoginAndRegisterButton;

const AuthButton = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "rgba(48, 138, 249, 0.45)" : "rgb(48, 137, 249)"};
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
