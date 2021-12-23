import React, { Fragment } from 'react';
import { Menu as UIMenu, Transition } from '@headlessui/react';

type MenuProps = {
  triggerButton: React.ReactNode;
  children: React.ReactNode;
};

const Menu = ({ triggerButton, children }: MenuProps) => {
  return (
    <UIMenu as="div" className="relative inline-block text-left">
      <div>
        <UIMenu.Button>{triggerButton}</UIMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <UIMenu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white  rounded-md shadow-md  focus:outline-none">
          <div className="px-1 py-1">{children}</div>
        </UIMenu.Items>
      </Transition>
    </UIMenu>
  );
};

Menu.Item = UIMenu.Item;

export default Menu;
