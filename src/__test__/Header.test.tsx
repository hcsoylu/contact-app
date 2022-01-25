import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import store from "../store";

it("sould render home link correctly", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

it("should render add new contact link correctly", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByRole("link", { name: "Add New Contact" });
  expect(linkElement).toBeInTheDocument();
});

it("should render logout button correctly", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
