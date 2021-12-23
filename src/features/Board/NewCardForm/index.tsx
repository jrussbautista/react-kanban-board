import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { v4 as uuid } from 'uuid';

import { useBoardDispatch } from '../BoardContext/index';
import { Card } from '../types';

type NewCardFormProps = {
  onClose(): void;
  columnId: string;
};

const NewCardForm = ({ onClose, columnId }: NewCardFormProps) => {
  const [cardText, setCardText] = useState('');

  const dispatch = useBoardDispatch();

  const reset = () => {
    setCardText('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const card: Card = {
      id: uuid(),
      title: cardText,
    };

    dispatch({ type: 'ADD_CARD', payload: { columnId, card } });
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full p-4"
        placeholder="Enter title for this card"
        aria-label="Title"
        onChange={(e) => setCardText(e.target.value)}
        value={cardText}
      />
      <div className="mt-2 flex items-center">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Add card
        </button>
        <button type="button" onClick={onClose}>
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </form>
  );
};

export default NewCardForm;
