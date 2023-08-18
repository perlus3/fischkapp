import React from 'react';

import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';

import './App.css';
import { CardFront } from './components/CardFront.tsx';
import { CardBack } from './components/CardBack.tsx';
import { SingleCard } from './components/SingleCard.tsx';
import { CardsList } from './components/CardsList.tsx';

function App() {
  return (
    <AppLayout>
      <AppHeader />
      <CardsList />
      {/*<CardFront />*/}
      {/*<CardBack />*/}
    </AppLayout>
  );
}

export default App;
