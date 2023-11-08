import React, { useState } from "react";
import { Clock, Edit, Trash2 } from "react-feather";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

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

function Card(props) {
  const [showModal, setShowModal] = useState(false);
  const { id, title, date, labels } = props.card;

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={setShowModal}
          card={props.card}
          boardId={props.boardId}
          operationFunction={props.updateCard}
          label="Update"
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>

          <div className="card_icons">
            <Edit onClick={() => setShowModal(true)} />

            <Trash2 onClick={() => props.removeCard(props.boardId, id)} />
          </div>
        </div>

        <div className="card_title">{title}</div>

        <div className="card_footer">
          {date && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(date)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
