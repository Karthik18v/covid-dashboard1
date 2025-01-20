import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import SpecificState from "./components/SpecificState";
import About from "./components/About";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/state/:stateCode" element={<SpecificState />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

export default App;
