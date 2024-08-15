import { render, screen } from "@testing-library/react";
import Button from "../Button";
import { BUTTON_COLOR } from "../../../config/constants";

describe("Button", () => {
  it("Should render button component with correct label", () => {
    render(
      <Button handleClick={() => {}} color={BUTTON_COLOR.GREEN}>
        Login
      </Button>,
    );
    const btnComponent = screen.getByText("Login");
    expect(btnComponent).toBeVisible();
  });

  it("Button should be disabled when disabled props is true", () => {
    render(
      <Button handleClick={() => {}} color={BUTTON_COLOR.GRAY} disabled={true}>
        Login
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });

  it("Button should be disabled when disabled button component is loading", () => {
    render(
      <Button
        handleClick={() => {}}
        color={BUTTON_COLOR.BLACK}
        isLoading={true}
      >
        Login
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });
});
