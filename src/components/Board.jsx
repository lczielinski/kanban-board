import React from 'react';
import './Board.css';

const Board = () => (
  <div>
    {/* Modal to add a new card */}
    <div className="modal fade" id="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
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
