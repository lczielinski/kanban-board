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
      .get("/users/get/" + userId)
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
            <button type="button" className="btn-close ms-3" onClick={() => deleteCard(card._id)}></button>
          </div>
          { card.description && <p className="card-text">{ card.description }</p> }
          <div className="d-flex justify-content-between">
            <button type="button" className="btn arrow" onClick={() => revertCard(card._id)}>
              <span>&#9664;</span>
            </button>
            <button type="button" className="btn arrow" onClick={() => moveCard(card._id)}>
              <span>&#9654;</span>
            </button>
          </div>
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
          } else if (card.status == 2) {
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
  const deleteCard = (taskId) => {
    axios
      .post("/users/delete-task", {
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

  const addCard = (data) => {
    axios
      .post("/users/add-task", {
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
  };

  const moveCard = (taskId) => {
    axios
      .post("/users/move-task", {
        userId: userId,
        taskId: taskId,
        forward: true
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  };

  const revertCard = (taskId) => {
    axios
      .post("/users/move-task", {
        userId: userId,
        taskId: taskId,
        forward: false
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
  };

  const logout = () => {
    history.push({
      pathname: "/login",
      state: {}
    });
  }

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  $('#modal').on('shown.bs.modal', function () {
    $('#cardTitle').trigger('focus')
  });

  return (
    <div className="container-fluid mb-4 mb-md-0">
      {/* Modal to add a new card */}
      <div className="modal fade" id="modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add a new card</h5>
            </div>
            <form className="form-group" 
              onSubmit={handleSubmit(addCard)}>
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
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => reset()}>Close</button>
                <button type="submit" className="btn btn-primary">Add Card</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Title with person"s name */}
      <div className="my-4">
        <h1 className="text-center my-2">{user.name}&apos;s To-Do List</h1>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn" onClick={logout}>Log Out</button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          {/* To Do List */}
          <div className="card mx-4 my-md-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-5">To Do</h4>
              { toDoTasks }
            </div>

            {/* Button to trigger modal */}
            <div className="d-flex justify-content-center">
              <div className="btn-primary btn-circle text-center m-3" data-bs-toggle="modal" data-bs-target="#modal">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress List */}
        <div className="col">
          <div className="card mx-4 my-md-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-5">In Progress</h4>
              { inProgressTasks }
            </div>
          </div>
        </div>

        {/* Done List */}
        <div className="col">
          <div className="card mx-4 my-md-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-5">Done</h4>
              { completedTasks }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
