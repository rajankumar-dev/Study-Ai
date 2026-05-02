import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CreateNote from "./pages/CreateNote";
import Notes from "./pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrap */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/create" element={<Layout><CreateNote /></Layout>} />
        <Route path="/notes" element={<Layout><Notes /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;