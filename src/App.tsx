// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import Home from "./component/home";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-15">
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
