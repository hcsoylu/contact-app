import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import store from "../store";
import userEvent from "@testing-library/user-event";

it("should render initially password field empty", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  const firstNameInput = screen.getByLabelText(
    /first name/i
  ) as HTMLInputElement;
  const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement;
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

  expect(passwordInput.value).toBe("");
  expect(emailInput.value).toBe("");
  expect(firstNameInput.value).toBe("");
  expect(lastNameInput.value).toBe("");
});

it("should render initially button as disabled", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

test("should redirect to register page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  userEvent.click(screen.getByRole("link"));

  expect(screen.getByText(/You already have an account/i)).toBeInTheDocument();
});
