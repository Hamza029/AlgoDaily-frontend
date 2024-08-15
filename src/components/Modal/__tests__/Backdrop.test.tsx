import { render, screen } from "@testing-library/react";
import Backdrop from "../Backdrop";

describe("Backdrop", () => {
  it("Backdrop should not be visible by default when rendered", () => {
    render(
      <Backdrop onClick={() => {}}>
        <h1>Inside backdrop</h1>
      </Backdrop>,
    );
    const backdrop = screen.getByText("Inside backdrop");
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).not.toBeVisible();
  });
});
