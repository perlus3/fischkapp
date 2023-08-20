import React, { useState } from 'react';

import { FrontCard } from './FrontCard.tsx';
import { BackCard } from './BackCard.tsx';

export const SingleCard = () => {
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  return isAnswerChecked ? <FrontCard /> : <BackCard />;
};
