import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import ColumnItem from './ColumnItem';
import { BoardProvider, useBoard } from './BoardContext';
import NewListForm from './NewListForm';

const BoardApp = () => {
  const [isOpenNewListForm, setIsOpenNewListForm] = useState(false);

  const [board, dispatch] = useBoard();

  const { columns } = board;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    dispatch({ type: 'MOVE_CARD', payload: { source, destination, draggableId } });
  };

  return (
    <div className="relative" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="whitespace-nowrap overflow-y-hidden overflow-x-auto h-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <div key={column.id} className="p-4 w-72 inline-block whitespace-nowrap align-top ">
              <ColumnItem column={column} />
            </div>
          ))}
        </DragDropContext>
        <div className="w-72 p-4 inline-block whitespace-nowrap align-top">
          {isOpenNewListForm ? (
            <NewListForm onClose={() => setIsOpenNewListForm(false)} />
          ) : (
            <button
              onClick={() => setIsOpenNewListForm(true)}
              type="button"
              className="bg-white border border-blue-500 text-blue-500 w-full p-3 text-left rounded flex items-center"
            >
              <PlusIcon className="w-5 h-5" />
              Add another list
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BoardPage = () => {
  return (
    <BoardProvider>
      <BoardApp />
    </BoardProvider>
  );
};

export default BoardPage;
