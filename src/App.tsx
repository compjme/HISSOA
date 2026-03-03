import Navbar from "./components/layout/Navbar";
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

function App() {
  return (
    <div className="app">
      <Layout />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQChatbot />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
