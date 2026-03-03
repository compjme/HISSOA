import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Scheduling from "./pages/Scheduling";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import FAQChatbot from "./pages/FAQChatbot";
import NotFound from "./pages/Notfound";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQChatbot />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;