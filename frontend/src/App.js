import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { BoardCard } from "./Components/BoardCard/BoardCard";
import HoverButton from "./Components/HoverButton/HoverButton";
import Header from "./Components/Header/Header";
import TaskCard from "./Components/TaskCard/TaskCard";

const baseURL = "http://localhost:3000/teams";

const boardInitail = [
  {
    id: Date.now() + Math.random() * 2,
    title: "To Do",
    cards: [],
  },
  {
    id: Date.now() + Math.random() * 2,
    title: "In Progress",
    cards: [],
  },
  {
    id: Date.now() + Math.random() * 2,
    title: "Completed",
    cards: [],
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [list, setList] = React.useState(null);

  function getList() {
    axios.get(baseURL).then((response) => {
      setList(response?.data);
    });
  }

  async function createPost(values) {
    axios.post(baseURL, {
      title: values.values.title,
      description: values.values.description,
      boards: JSON.stringify(boardInitail),
    });

    setTimeout(getList, 1000);
  }

  function updatePost({ values, id }) {
    const value = { boards: JSON.stringify(boardInitail), ...values };
    axios
      .put(`${baseURL}/${id}`, value)
      .then((response) => {
        const updatedTeam = response?.data;

        // Find the index of the team to update in the list
        const teamIndex = list.findIndex((team) => team.id === updatedTeam.id);

        if (teamIndex !== -1) {
          // If the team exists in the list, replace it with the updated data
          const updatedList = [...list];
          updatedList[teamIndex] = updatedTeam;

          setList(updatedList);
        } else {
          console.log("Team not found in the list.");
        }

        setTimeout(getList, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deletePost({ id }) {
    axios.delete(`${baseURL}/${id}`).then(() => {
      alert("Post deleted!");
    });

    setTimeout(getList, 1000);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="app">
      <HoverButton open={open} addListHandler={createPost} />

      <Header open={open} setOpen={setOpen} />

      <div className="app_all_board">
        {open ? (
          <BoardCard selected={open} list={list} updateList={updatePost} />
        ) : (
          list?.map((item) => (
            <TaskCard
              key={item.id}
              setOpen={setOpen}
              item={item}
              removeFromList={deletePost}
              updateList={updatePost}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
