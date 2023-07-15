import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import TopicsSelect from "/src/components/news/addnewsletter/Topics"


describe("Hola", () => {
  afterEach(cleanup);
  it("Should render", () => {
    render(<TopicsSelect />);
  });

  it("Should render title correctly", () => {
    render(<Hola />);
    screen.getByText("Header");
  });
});
