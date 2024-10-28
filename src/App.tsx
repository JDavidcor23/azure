import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gray-900 w-full justify-center items-center m-auto flex text-center gap-5">
        <Link
          to="/"
          className="text-3xl font-bold text-purple-400 border-b-2 border-solid border-b-purple-400"
        >
          Home
        </Link>
        <Link
          to="/flashcards"
          className="text-3xl font-bold text-purple-400 border-b-2 border-solid border-b-purple-400"
        >
          Flashcards
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
