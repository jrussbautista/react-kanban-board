import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { v4 as uuid } from 'uuid';
import { Column } from '../types';
import { useBoardDispatch } from '../BoardContext/index';

type NewListFormProps = {
  onClose(): void;
};

const NewListForm = ({ onClose }: NewListFormProps) => {
  const [listTitle, setListTitle] = useState('');

  const dispatch = useBoardDispatch();

  const reset = () => {
    setListTitle('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const column: Column = {
      id: uuid(),
      title: listTitle,
      cards: [],
    };

    dispatch({ type: 'ADD_COLUMN', payload: column });

    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full px-4 py-3"
        aria-label="List title"
        placeholder="Enter list title..."
        onChange={(e) => setListTitle(e.target.value)}
      />
      <div className="flex items-center mt-2">
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mr-4">
          Add list
        </button>
        <button type="button" onClick={onClose}>
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </form>
  );
};

export default NewListForm;
