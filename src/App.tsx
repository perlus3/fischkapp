import React from 'react';

import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';

import './App.css';
import { CardFront } from './components/CardFront.tsx';
import { CardBack } from './components/CardBack.tsx';

function App() {
  return (
    <AppLayout>
      <AppHeader />
      {/*<CardFront />*/}
      <CardBack />
    </AppLayout>
  );
}

export default App;
