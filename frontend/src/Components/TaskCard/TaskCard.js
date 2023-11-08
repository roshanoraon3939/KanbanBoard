import React, { useState } from "react";
import { Trash2, Edit, ArrowRight, Star } from "react-feather";
import ListModal from "../HoverButton/ListModal/ListModal";

const TaskCard = ({ setOpen, item, removeFromList, updateList }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div class="grid divide-y divide-neutral-200  bg-[white] mx-0.5 my-2.5 px-5 py-1 rounded-lg">
      <div class="py-5">
        <summary class="flex justify-between items-center font-medium list-none">
          <div class="flex flex-row gap-2.5">
            <Star />

            <span> {item.title}</span>
          </div>

          <div class="flex flex-row gap-2.5">
            <Trash2 onClick={() => removeFromList({ id: item._id })} />

            <Edit onClick={() => setShowModal(true)} />

            <ArrowRight onClick={() => setOpen(item)} />
          </div>
        </summary>
      </div>

      {showModal ? (
        <ListModal
          operationFunction={updateList}
          setShowModal={setShowModal}
          label="Update"
          item={item}
        />
      ) : null}
    </div>
  );
};

export default TaskCard;
