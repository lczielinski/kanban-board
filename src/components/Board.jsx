import React from 'react';
import './Board.css';

const Board = () => (
  <div>
    <h1 className="text-center m-4">Andrew`&apos;`s To-Do List</h1>

    <div className="d-flex justify-content-center">
      <div className="card m-4 w-25 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">To Do</h5>
        </div>

        <div className="card m-3 shadow-sm">
          <div className="card-body">
            <p className="card-title">Clean room</p>
          </div>
        </div>

        <div className="btn-primary btn-circle text-center m-3">+</div>
      </div>

      <div className="card m-4 w-25 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">In Progress</h5>
        </div>
      </div>

      <div className="card m-4 w-25 shado-sm">
        <div className="card-body">
          <h5 className="card-title text-center">Done</h5>
        </div>
      </div>
    </div>
  </div>
);

export default Board;
