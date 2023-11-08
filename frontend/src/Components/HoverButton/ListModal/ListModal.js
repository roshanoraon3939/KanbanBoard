import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";
import { List, Type } from "react-feather";
import "./ListModal.css";

const ListModal = ({ setShowModal, operationFunction, label, item }) => {
  const [values, setValues] = useState(item || {});

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, description: value });
  };

  return (
    <Modal onClose={() => setShowModal(false)}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <span class="font-bold text-[1.2rem] border-b-[#14b8a6] border-b border-dashed">
            {label} Task
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
          <div className="editable_edit_footer">
            <button
              onClick={() => {
                operationFunction({ values, id: item?.id });
                setShowModal(false);
                setValues({});
              }}
              disabled={!values || !values?.title || !values?.description}
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ListModal;
