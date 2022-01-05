import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllCoinsData from './allCoins';
import CoinsData from './coins';
import MoreDetails from './moreDetails';

const HomePage = () => (
  <div>
    <Routes>
      <Route exact path="/crypto-trend" element={<AllCoinsData />} />
      <Route path="/details/:name" element={<CoinsData />} />
      <Route path="/details/more/:name" element={<MoreDetails />} />
    </Routes>
  </div>
);

export default HomePage;
