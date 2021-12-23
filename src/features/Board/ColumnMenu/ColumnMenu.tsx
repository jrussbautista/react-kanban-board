import React from 'react';
import { DotsVerticalIcon, TrashIcon, PencilIcon } from '@heroicons/react/solid';
import Menu from '../../../components/Menu';

type ColumnMenuProps = {
  onChange(type: string): void;
};

const ColumnMenu = ({ onChange }: ColumnMenuProps) => {
  return (
    <Menu triggerButton={<DotsVerticalIcon className="w-5 h-5 text-white" />}>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => onChange('edit')}
            type="button"
            className={`w-full flex items-center p-2 text-sm
                  ${active ? 'text-blue-500' : 'text-gray-700'}
              `}
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Edit Column
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => onChange('delete')}
            type="button"
            className={`w-full flex items-center p-2 text-sm
                  ${active ? 'text-blue-500' : 'text-gray-700'}
              `}
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Delete
          </button>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default ColumnMenu;
