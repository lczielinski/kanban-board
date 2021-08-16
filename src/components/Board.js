import React from 'react';

const Board = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">To Do</h5>
        </div>

        <div className="card">
          <div className="card-body">
          <p className="card-title">Clean room</p>
          </div>
            
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">In Progress</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Done</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  )
}

export default Board;
