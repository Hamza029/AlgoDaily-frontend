import { render, screen } from "@testing-library/react";
import Toast from "../Toast";
import { expect } from "vitest";

it("Should render a Toast with correct message", () => {
  render(
    <Toast
      message="Succesfully signed up"
      severity="success"
      handleToastClose={() => {}}
    />,
  );
  const toastElement = screen.getByText("Succesfully signed up");
  expect(toastElement).toBeInTheDocument();
  expect(toastElement).toBeVisible();
});
