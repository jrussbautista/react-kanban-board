import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusIcon } from '@heroicons/react/solid';

import { Column } from '../types';
import CardItem from '../CardItem';
import NewCardForm from '../NewCardForm/index';
import ColumnMenu from '../ColumnMenu/ColumnMenu';
import { useBoardDispatch } from '../BoardContext/index';
import UpdateColumnForm from '../UpdateColumnForm';

type ColumnItemProps = {
  column: Column;
};

const ColumnItem = ({ column }: ColumnItemProps) => {
  const [isOpenEditColumn, setIsOpenEditColumn] = useState(false);
  const [isOpenNewCardForm, setIsOpenNewCardForm] = useState(false);

  const dispatch = useBoardDispatch();

  const handleMenuChange = (type: string) => {
    switch (type) {
      case 'edit': {
        setIsOpenEditColumn(true);
        break;
      }
      case 'delete': {
        const isConfirm = window.confirm(`Are you sure you want to delete ${column.title}?`);
        if (isConfirm) {
          dispatch({ type: 'REMOVE_COLUMN', payload: { columnId: column.id } });
        }
        break;
      }
      default:
        throw new Error('Unknown type');
    }
  };

  return (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided) => (
        <>
          {isOpenEditColumn ? (
            <UpdateColumnForm
              id={column.id}
              initialTitle={column.title}
              onClose={() => setIsOpenEditColumn(false)}
            />
          ) : (
            <div className="bg-blue-500 p-3 text-white flex justify-between">
              <p className="font-semibold">{column.title}</p>
              <ColumnMenu onChange={handleMenuChange} />
            </div>
          )}

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
