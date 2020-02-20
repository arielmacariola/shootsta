import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./../navbar";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("Renders NavBar component without crashing", () => {
  const div = document.createElement("div");
  const menuList = [
    { label: "Home", linkTo: "/" },
    { label: "Upload", linkTo: "/upload" }
  ];
  ReactDOM.render(
    <BrowserRouter>
      <NavBar brandName="shootsta" menuList={menuList} />
    </BrowserRouter>,
    div
  );
});

it("Renders NavBar correctly as expected", () => {
  const menuList = [
    { label: "Home", linkTo: "/" },
    { label: "Upload", linkTo: "/upload" }
  ];
  const { getByTestId } = render(
    <BrowserRouter>
      <NavBar brandName="shootsta" menuList={menuList} />
    </BrowserRouter>
  );
  expect(getByTestId("brandName")).toHaveTextContent("shootsta");
});

it("Matches snapshot of NavBar component", () => {
  const menuList = [
    { label: "Home", linkTo: "/" },
    { label: "Upload", linkTo: "/upload" }
  ];
  const tree = renderer
    .create(
      <BrowserRouter>
        <NavBar brandName="shootsta" menuList={menuList} />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
