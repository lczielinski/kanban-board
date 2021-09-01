import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Board.css";

const Board = () => {
  const [user, setUser] = useState(null);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  
  const history = useHistory();
  if (!history.location.state) {
    history.push("/login");
    return null;
  }

  const userId = history.location.state._id;

  // set up local user state on login
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/get/" + userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        history.push("/login");
      });
  }, []);

  const pushCard = (arr, card) => {
    arr.push(
      <div className="card m-3 shadow-sm" key={card._id} id={card._id} draggable="true">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{ card.title }</h5>
            <div
              type="button"
              role="button"
              tabIndex="-1"
              className="close ml-2"
              onClick={() => deleteToDoCard(card._id)}
            >
              <span>&times;</span>
            </div>
          </div>
          <p className="card-text">{ card.description }</p>
        </div>
      </div>
    )
  };

  // update local cards
  useEffect(() => {
    if (user) {
      const toDo = [], inProgress = [], completed = [];
      user.tasks.forEach((card) => {
          if (card.status == 0) {
            pushCard(toDo, card);
          } else if (card.status == 1) {
            pushCard(inProgress, card);
          } else if (card.state == 2) {
            pushCard(completed, card);
          }
      });
      setToDoTasks(toDo);
      setInProgressTasks(inProgress);
      setCompletedTasks(completed);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // modifying tasks
  const deleteToDoCard = (taskId) => {
    axios
      .post("http://localhost:4000/users/delete-task", {
        userId: userId,
        taskId: taskId
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        history.push("/login");
      });
  };

  const addToDoCard = (data) => {
    axios
      .post("http://localhost:4000/users/add-task", {
        userId: userId,
        title: data.cardTitle,
        description: data.cardDescription
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        history.push("/login");
      });
    window.$("#modal").modal("toggle");
    reset();
  }

  const logout = () => {
    history.push({
      pathname: "/login",
      state: {}
    });
  }

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      {/* Modal to add a new card */}
      <div className="modal fade" id="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add a new card</h5>
              <div type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </div>
            </div>
            <form className="form-group" 
              onSubmit={handleSubmit(addToDoCard)}>
              <div className="modal-body">
                <div className="form-group row">
                  <label htmlFor="cardTitle" className="col m-1">
                    Task title
                    <input
                      type="text"
                      {...register("cardTitle", { required: true })}
                      className="form-control my-1"
                      id="cardTitle"
                      placeholder="Title"
                      autoFocus="autofocus"
                    />
                    <p>{errors.cardTitle && "*Card title is required"}</p>
                  </label>
                </div>
                <div className="form-group row">
                  <label htmlFor="cardBody" className="col m-1">
                    Task description
                    <textarea
                      row="3"
                      type="text"
                      {...register("cardDescription")}
                      className="form-control my-1"
                      id="cardBody"
                      placeholder="Description..."
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Add Card</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Title with person"s name */}
      <h1 className="text-center m-4">{user.name}&apos;s To-Do List</h1>
      <div className="d-flex justify-content-center">
        <div type="button" className="btn" onClick={logout}>Log Out</div>
      </div>

      <div className="d-flex justify-content-center">
        {/* To Do List */}
        <div className="card m-4 w-25 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">To Do</h4>
          </div>

          { toDoTasks }

          {/* Button to trigger modal */}
          <div className="d-flex justify-content-center">
            <div className="btn-primary btn-circle text-center m-3" data-toggle="modal" data-target="#modal">
              <span>+</span>
            </div>
          </div>
        </div>

        {/* In Progress List */}
        <div className="card m-4 w-25 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">In Progress</h4>
          </div>

          { inProgressTasks }
        </div>

        {/* Done List */}
        <div className="card m-4 w-25 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">Done</h4>
          </div>

          { completedTasks }
        </div>
      </div>
    </div>
  );
};

export default Board;
