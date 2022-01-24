import styled from "styled-components";

type FormSectionProps = {
  children: JSX.Element;
  submitHandler: (e: React.FormEvent<EventTarget>) => void;
};

const FormSection = ({ children, submitHandler }: FormSectionProps) => {
  return <FormBox onSubmit={submitHandler}>{children}</FormBox>;
};

export default FormSection;

const FormBox = styled.form`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 350px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
`;
