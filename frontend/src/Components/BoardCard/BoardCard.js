import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Accordian from "../Accordian/Accordian";

import "./BoardCard.css";

export const BoardCard = ({ list, selected, updateList }) => {
  const [boards, setBoards] = useState(
    JSON.parse(selected?.boards) ||
      JSON.parse(localStorage.getItem(`${selected?.id}`))
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, card) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title: card?.title,
      date: card?.date,
      description: card?.description,
      labels: card?.labels || [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) {
      t_cardIndex = boards[t_boardIndex]?.cards.length;
    }

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) {
      const index = 0;
      setTargetCard({
        bid,
        cid: index,
      });
      return;
    }
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, card, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  const updateFunction = () => {
    const values = { ...selected, boards: JSON.stringify(boards) };
    updateList({ values, id: selected?.id });
    localStorage.removeItem(`${selected.id}`);
  };

  useEffect(() => {
    localStorage.setItem(`${selected?.id}`, JSON.stringify(boards));
  }, [boards, selected.id]);

  return (
    <div className="app_boards_container">
      <Accordian selected={selected} updateList={updateList} />

      <div className="boards">
        <div className="header">
          <div>
            <span class="font-bold text-[1.2rem]">Board </span>
            <span class="text-[0.75rem] ml-1">
              (Save your Items Before Leaving or Going Back)
            </span>
          </div>

          <button onClick={updateFunction}>Save</button>
        </div>

        <div className="app_boards">
          {boards?.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
