import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import DataEntry from './pages/DataEntry';
import CodeGeneration from './pages/CodeGeneration';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/templates" element={<TemplateSelection />} />
            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/generate" element={<CodeGeneration />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PortfolioProvider>
  );
}

export default App;