import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid';
import { useBoardDispatch } from '../BoardContext/index';

type ColumnMenuProps = {
  columnId: string;
};

const ColumnMenu = ({ columnId }: ColumnMenuProps) => {
  const dispatch = useBoardDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <DotsVerticalIcon className="w-5 h-5" />
        </Menu.Button>
      </div>
      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white  rounded-md shadow-md  focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => dispatch({ type: 'REMOVE_COLUMN', payload: { columnId } })}
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ColumnMenu;
