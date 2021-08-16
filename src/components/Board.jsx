import React from 'react';
import './Board.css';

const Board = () => (
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

          <div className="modal-body">
            <form className="form-group">
              <div className="form-group row">
                <label htmlFor="cardTitle" className="col m-1">
                  Task title
                  <input type="text" className="form-control my-1" id="cardTitle" placeholder="Title" />
                </label>
              </div>

              <div className="form-group row">
                <label htmlFor="cardBody" className="col m-1">
                  Task description
                  <textarea row="3" type="text" className="form-control my-1" id="cardBody" placeholder="Description..." />
                </label>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <div type="button" className="btn btn-secondary" data-dismiss="modal">Close</div>
            <div type="button" className="btn btn-primary">Add Card</div>
          </div>
        </div>
      </div>
    </div>

    {/* Title with person's name */}
    <h1 className="text-center m-4">Andrew&apos;s To-Do List</h1>

    <div className="d-flex justify-content-center">
      {/* To Do List */}
      <div className="card m-4 w-25 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-center">To Do</h4>
        </div>

        {/* To Do Cards */}
        <div className="card m-3 shadow-sm">
          <div className="card-body">
            <p className="card-title">Clean room</p>
          </div>
        </div>

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

export default Board;
