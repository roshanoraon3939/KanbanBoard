import React, { useState } from "react";
import ListModal from "./ListModal/ListModal";

const HoverButton = ({ open = true, addListHandler }) => {
  const [showModal, setShowModal] = useState(false);

  return open ? null : (
    <>
      <button
        onClick={() => setShowModal(true)}
        class="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0  right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
      >
        <div class="p-0 rounded-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 40 40"
          >
            <path
              fill="#14b8a6"
              d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
            ></path>
            <path
              fill="none"
              stroke="#14b8a6"
              stroke-miterlimit="10"
              d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
            ></path>
            <path fill="#fff" d="M30,18h-8v-8h-4v8h-8v4h8v8h4v-8h8V18z"></path>
          </svg>
        </div>
      </button>

      {showModal ? (
        <ListModal
          operationFunction={addListHandler}
          setShowModal={setShowModal}
          label="Add"
        />
      ) : null}
    </>
  );
};

export default HoverButton;
