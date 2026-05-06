import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./photobooth"));
const About = lazy(() => import("./about"));
const Contact = lazy(() => import("./contact"));
const Privacy = lazy(() => import("./privacy"));
const ChooseStyle = lazy(() => import("./choosestyle"));
const BoothPolaroid = lazy(() => import("./boothpolaroid"));
const BoothStrip = lazy(() => import("./boothstrip"));

function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #ffe8f4, #f0d4ff)",
      fontFamily: "Nunito, sans-serif",
      fontSize: "1.5rem",
      color: "#ff85a1",
      gap: "0.5rem",
    }}>
      <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>📷</span>
      <span>loading kawaii magic...</span>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photobooth" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/choosestyle" element={<ChooseStyle />} />
          <Route path="/boothpolaroid" element={<BoothPolaroid />} />
          <Route path="/booth/polaroid" element={<BoothPolaroid />} />
          <Route path="/boothstrip" element={<BoothStrip />} />
          <Route path="/booth/strip" element={<BoothStrip />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}