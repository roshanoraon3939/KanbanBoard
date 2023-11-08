import React, { useState } from "react";
import { Calendar, List, Type, Tag, X } from "react-feather";

import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";

import "./CardInfo.css";

const colors = [
  "#a8193d",
  "#4fcc25",
  "#1ebffa",
  "#8da377",
  "#9975bd",
  "#cf61a1",
  "#240959",
];

function CardInfo(props) {
  const [selectedColor, setSelectedColor] = useState();
  const [values, setValues] = useState({
    date: undefined,
    title: undefined,
    description: undefined,
    labels: [],
    ...props.card,
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({ ...values, date });
  };

  const addLabel = (label) => {
    const index = values?.labels?.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <span class="font-bold text-[1.2rem] border-b-[#14b8a6] border-b border-dashed">
            {props.label} Item
          </span>{" "}
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
            <span style={{ color: "red" }}>*</span>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title || "Add a Title"}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
            <span style={{ color: "red" }}>*</span>
          </div>
          <Editable
            defaultValue={values.description}
            text={values.description || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date Of Completion</p>
            <span style={{ color: "red" }}>*</span>
          </div>
          <input
            type="date"
            defaultValue={values.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>

          <div className="cardinfo_box_labels">
            {values?.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>

          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>

          <Editable
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>

        <div className="cardinfo_box">
          <div className="editable_edit_footer">
            <button
              onClick={() => {
                props.operationFunction(props.boardId, values, values.id);
                props?.onClose(false);
                setValues({});
              }}
              disabled={
                !values || !values.title || !values.date || !values.description
              }
            >
              {props.label}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
