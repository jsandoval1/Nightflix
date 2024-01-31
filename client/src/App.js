import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import MovieDetail from './views/MovieDetail';
import UserFavorites from './views/UserFavorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Specify the element for the root route */}
      <Route path="/movies/:id" element={<MovieDetail/>} /> {/* Add this route */}
      <Route path="/userFavorites" element={<UserFavorites />} />
    </Routes>
  );
}

export default App;
