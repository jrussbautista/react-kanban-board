import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/solid';

import { Column } from '../types';
import CardItem from '../CardItem';
import NewCardForm from '../NewCardForm/index';
import ColumnMenu from '../ColumnMenu/ColumnMenu';

type ColumnItemProps = {
  column: Column;
};

const ColumnItem = ({ column }: ColumnItemProps) => {
  const [isOpenNewCardForm, setIsOpenNewCardForm] = useState(false);

  return (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided) => (
        <>
          <div className="bg-blue-500 p-3 text-white flex justify-between">
            <p className="font-semibold">{column.title}</p>
            <ColumnMenu columnId={column.id} />
          </div>
          <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4 h-full">
            {column.cards?.map((card, index) => (
              <CardItem key={card.id} cardItem={card} index={index} />
            ))}
            {provided.placeholder}

            {isOpenNewCardForm ? (
              <NewCardForm columnId={column.id} onClose={() => setIsOpenNewCardForm(false)} />
            ) : (
              <button
                type="button"
                onClick={() => setIsOpenNewCardForm(true)}
                className="flex items-center w-full rounded-md p-4 hover:bg-gray-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add a card
              </button>
            )}
          </div>
        </>
      )}
    </Droppable>
  );
};

export default ColumnItem;
