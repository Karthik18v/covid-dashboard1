import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import SpecificState from "./components/SpecificState";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/state/:stateCode" element={<SpecificState />} />
    </Routes>
  </BrowserRouter>
);

export default App;
