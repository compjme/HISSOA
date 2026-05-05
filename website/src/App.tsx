import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Scheduling from "./pages/Scheduling";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import FAQChatbot from "./pages/FAQChatbot";
import Notfound from "./pages/Notfound";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQChatbot />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/scheduling" element={<ProtectedRoute> <Scheduling /> </ProtectedRoute> }/>
        <Route path="/community" element={ <ProtectedRoute> <Community /> </ProtectedRoute> }/>
      </Route>
    </Routes>

  );
}

export default App;
