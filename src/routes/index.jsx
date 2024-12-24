import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Chat from '../components/Chat/Chat';
import Decorations from '../components/Decorations/Decorations';
import Gifts from '../components/Gifts/Gifts';
import Recipes from '../components/Recipes/Recipes';
import NotFound from '../components/NotFound/NotFound';
import Error from '../components/Error/Error';
import Loading from '../components/Loading/Loading';
import PixelArtKit from '../components/PixelArtKit/PixelArtKit';
import RetroGames from '../components/RetroGames/RetroGames';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="decorations" element={<Decorations />} />
          <Route path="gifts" element={<Gifts />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="loading" element={<Loading />} />
          <Route path="error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
          <Route path="pixel-art" element={<PixelArtKit />} />
          <Route path="retro-games" element={<RetroGames />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 