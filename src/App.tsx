import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/:name/:userId" element={<UserProfile />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
