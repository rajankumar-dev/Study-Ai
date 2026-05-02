import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CreateNote from "./pages/CreateNote";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Signup from "./pages/Sign";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout Wrap */}
        <Route
          path="/dashboard"
          element={token ? <Layout><Home /></Layout> : <Login />}
        />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/create" element={<Layout><CreateNote /></Layout>} />
        <Route path="/notes" element={<Layout><Notes /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;