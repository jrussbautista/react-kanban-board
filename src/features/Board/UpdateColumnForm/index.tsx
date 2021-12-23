import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useBoardDispatch } from '../BoardContext/index';

type UpdateColumn = {
  onClose(): void;
  id: string;
  initialTitle: string;
};

const UpdateColumnForm = ({ onClose, id, initialTitle }: UpdateColumn) => {
  const [title, setTitle] = useState(initialTitle);

  const dispatch = useBoardDispatch();

  const reset = () => {
    setTitle('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      columnId: id,
      title,
    };

    dispatch({ type: 'UPDATE_COLUMN', payload });

    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Title"
        value={title}
        className="w-full p-3 bg-white"
      />
      <div className="mt-2 flex items-center">
        <button type="submit" className="text-white bg-blue-500 rounded px-4 py-2 mr-4">
          Save
        </button>
        <button type="button" onClick={onClose}>
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default UpdateColumnForm;
