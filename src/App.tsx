import React from 'react';

import { AppHeader } from './components/header/AppHeader.tsx';
import { AppLayout } from './components/layout/AppLayout.tsx';

import './App.css';
import { CardFront } from './components/cards/CardFront.tsx';
import { CardBack } from './components/cards/CardBack.tsx';
import { SingleCard } from './components/cards/SingleCard.tsx';
import { CardsList } from './components/cards/CardsList.tsx';

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
