import React, { useState } from "react";

import Card from "../Card/Card";
import "./Board.css";
import CardInfo from "../Card/CardInfo/CardInfo";

function Board(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          <div>
            {props.board?.title} :{" "}
            <span>{props.board?.cards?.length || 0}</span>
          </div>
          <button onClick={() => setShowModal(true)}>
            <div class="p-0 rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
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
                <path
                  fill="#fff"
                  d="M30,18h-8v-8h-4v8h-8v4h8v8h4v-8h8V18z"
                ></path>
              </svg>
            </div>
          </button>
        </p>
      </div>

      <div className="board_cards custom-scroll">
        {props.board?.cards.length ? (
          props.board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={props.board.id}
              removeCard={props.removeCard}
              dragEntered={props.dragEntered}
              dragEnded={props.dragEnded}
              updateCard={props.updateCard}
            />
          ))
        ) : (
          <div
            className="empty_card"
            onDragEnter={() => props.dragEntered(props?.board?.id, null)}
          >
            <span>No Item In This Board...</span>

            <span>Either Drag or Create a Item</span>
          </div>
        )}
      </div>

      {showModal && (
        <CardInfo
          onClose={setShowModal}
          card={props?.boards?.cards}
          boardId={props?.board?.id}
          operationFunction={props?.addCard}
          label="Add"
        />
      )}
    </div>
  );
}

export default Board;
