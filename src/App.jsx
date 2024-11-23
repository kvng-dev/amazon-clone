import { Route, Routes } from "react-router-dom";
import {
  Checkout,
  HomePage,
  Navbar,
  ProductPage,
  SearcResult,
} from "./components";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearcResult />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
