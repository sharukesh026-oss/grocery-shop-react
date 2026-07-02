import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { ShopProvider } from "./context/ShopContext";

test("renders grocery shop home page", () => {
  render(
    <BrowserRouter>
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Green Basket/i)).toBeInTheDocument();
});
