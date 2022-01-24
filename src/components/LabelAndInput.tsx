import styled from "styled-components";

type LoginAndRegisterInputProps = {
  labelDescription: string;
  placeholder: string;
  value: string;
  type: string;
  idAndHtmlFor: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelAndInput = ({
  labelDescription,
  placeholder,
  type,
  idAndHtmlFor,
  handleChange,
  value,
}: LoginAndRegisterInputProps) => {
  return (
    <FormRow>
      <label htmlFor={idAndHtmlFor}>{labelDescription}</label>
      <input
        type={type}
        id={idAndHtmlFor}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </FormRow>
  );
};

export default LabelAndInput;

const FormRow = styled.div`
  label {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;
