import React, { useState, useEffect } from 'react';
import { useStateRef } from 'use-state-ref';
import { useForm } from 'react-hook-form';
import './Board.css';

const Board = () => {
  const [toDoCards, setToDoCards] = useState([]);
  const toDoCardsRef = useStateRef(toDoCards);
  const [numToDoCards, setNumToDoCards] = useState(0);

  useEffect(() => {
    toDoCardsRef.current = toDoCards;
  }, [toDoCards]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const deleteToDoCard = (index) => {
    const copy = [];
    for (let i = 0; i < toDoCardsRef.current.length; i += 1) {
      if (index !== toDoCardsRef.current[i].props.id) {
        copy.push(toDoCardsRef.current[i]);
      }
    }
    setToDoCards(copy);
  };

  const addToDoCard = (data) => {
    setToDoCards([...toDoCards,
      <div className="card m-3 shadow-sm" key={numToDoCards} id={numToDoCards} draggable="true">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{ data.cardTitle }</h5>
            <div
              type="button"
              role="button"
              tabIndex="-1"
              className="close ml-2"
              onClick={() => deleteToDoCard(numToDoCards)}
              onKeyDown={() => deleteToDoCard(numToDoCards)}
            >
              <span>&times;</span>
            </div>
          </div>
          <p className="card-text">{ data.cardDescription }</p>
        </div>
      </div>,
    ]);
    setNumToDoCards(numToDoCards + 1);
    window.$('#modal').modal('toggle');
    reset();
  };

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
            <form className="form-group" onSubmit={handleSubmit(addToDoCard)}>
              <div className="modal-body">
                <div className="form-group row">
                  <label htmlFor="cardTitle" className="col m-1">
                    Task title
                    <input
                      type="text"
                      {...register('cardTitle', { required: true })}
                      className="form-control my-1"
                      id="cardTitle"
                      placeholder="Title"
                      autoFocus="autofocus"
                    />
                    <p>{errors.cardTitle && '*Card title is required'}</p>
                  </label>
                </div>
                <div className="form-group row">
                  <label htmlFor="cardBody" className="col m-1">
                    Task description
                    <textarea
                      row="3"
                      type="text"
                      {...register('cardDescription')}
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

      {/* Title with person's name */}
      <h1 className="text-center m-4">&apos;s To-Do List</h1>

      <div className="d-flex justify-content-center">
        {/* To Do List */}
        <div className="card m-4 w-25 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">To Do</h4>
          </div>

          {/* To Do Cards */}
          { toDoCards }

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
        </div>

        {/* Done List */}
        <div className="card m-4 w-25 shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center">Done</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
