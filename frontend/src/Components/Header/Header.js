import React from "react";
import { ArrowLeft } from "react-feather";

const Header = ({ open, setOpen }) => {
  return (
    <header class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-xl body-font">
      <div class="container flex flex-col items-start gap-4 p-5 mx-auto md:flex-row text-xl">
        {open ? <ArrowLeft onClick={() => setOpen(false)} size={30} /> : null}

        <span class="flex items-baseline">Kanban Board</span>
      </div>
    </header>
  );
};

export default Header;
