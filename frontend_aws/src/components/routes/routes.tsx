import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Authentication } from '../pages/authentication/authentication';
import { Home } from '../pages/home/home';

export const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}