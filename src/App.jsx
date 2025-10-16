import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Globle/Navbar";
import AuthModal from "./Model/AuthModal";
import SideBar from "./Globle/SideBar";
import Loader from "./Loader/Loader";

const TypingTest = lazy(() => import("./Components/Pages/TypingTest"));
const PreviousRecords = lazy(() => import("./Components/Pages/PreviousRecords"));
const Profile = lazy(() => import("./Components/Pages/Profile"));
const LeaderBoard = lazy(() => import("./Components/Pages/LeaderBoard"));

// Wrapper to handle route change loader
function RouteWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (<Loader />);
  }

  return children;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <Navbar onLoginClick={() => setOpen(true)} />
      <AuthModal open={open} onClose={() => setOpen(false)} />

      <div style={{ display: "flex" }}>
        <SideBar onRefresh={handleRefresh} onLoginClick={() => setOpen(true)} />
        <main style={{ flexGrow: 1 }}>
          <Suspense >
            <RouteWrapper>
              <Routes>
                <Route path="/test" element={<TypingTest key={refreshKey} />} />
                <Route path="/records" element={<PreviousRecords key={refreshKey} />} />
                <Route path="/profile" element={<Profile key={refreshKey} />} />
                <Route path="/leaderboard" element={<LeaderBoard key={refreshKey} />} />
                <Route path="/" element={<LeaderBoard key={refreshKey} />} />
              </Routes>
            </RouteWrapper>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
