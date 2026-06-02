import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CreateNote from "./pages/CreateNote";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
import Profile from "./pages/Profile";
import UploadPage from "./pages/UploadPage";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

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
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/create" element={<Layout><CreateNote /></Layout>} />
        <Route path="/notes" element={<Layout><Notes /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
        <Route
          path="/favorites"
          element={
            <Layout>
              <Favorites />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={<Layout><Settings /></Layout>}
        />
      </Routes>


    </BrowserRouter>
  );
}

export default App;