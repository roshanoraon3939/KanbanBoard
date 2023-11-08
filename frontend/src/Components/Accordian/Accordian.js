import React, { useState } from "react";
import { Edit } from "react-feather";
import ListModal from "../HoverButton/ListModal/ListModal";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (!date) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Aprl",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return day + " " + month + " " + year;
};

const Accordian = ({ selected, updateList }) => {
  const [showModal, setShowModal] = useState(false);

  const MAPPING = [
    {
      title: "Title",
      value: selected.title,
    },
    {
      title: "Created On",
      value: formatDate(selected.created_date),
    },
    {
      title: "Updated On ",
      value: formatDate(selected.updated_date),
    },
    {
      title: "Description ",
      value: selected.description,
    },
  ];

  return (
    <div class="grid divide-y divide-neutral-200  bg-[white] mx-0.5 my-2.5 px-5 py-1 rounded-lg">
      <details class="group py-3">
        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
          <div class="flex flex-row gap-2.5">
            <span class="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>

            <span>Task Details</span>
          </div>

          <div class="flex flex-row gap-2.5">
            <Edit onClick={() => setShowModal(true)} />
          </div>
        </summary>

        <p class="text-neutral-600 mt-3 group-open:animate-fadeIn border border-solid border-[black] my-2.5 px-5 py-1 rounded-lg">
          {MAPPING?.map((item) => (
            <div class="flex">
              <span class="text-black font-bold w-[120px] text-justify">
                {item.title}
              </span>
              : {item.value}
            </div>
          ))}
        </p>
      </details>

      {showModal ? (
        <ListModal
          operationFunction={updateList}
          setShowModal={setShowModal}
          label="Update"
          item={selected}
        />
      ) : null}
    </div>
  );
};

export default Accordian;
