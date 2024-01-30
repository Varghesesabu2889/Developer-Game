/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import Node from './Node';
import Track from '../Algorithm/Track';

const Ratgame = () => {
  const [state, setState] = useState({
    grid: [],
  });

  const n = 6;
  const START_NODE_ROW = 0;
  const START_NODE_COLUMN = 0;
  const FINISH_NODE_ROW = n - 1;
  const FINISH_NODE_COLUMN = n - 1;

  useEffect(() => {
    const grid = generateGrid();
    setState({ grid: grid });
  }, []);

  const generateGrid = () => {
    let grid = [];
    for (let row = 0; row < n; row++) {
      let temp = [];
      for (let col = 0; col < n; col++) {
        temp.push(createNode(row, col));
      }
      grid.push(temp);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COLUMN,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COLUMN,
      isWall: false,
      isPath: false,
    };
  };

  const handleMouseUp = (row, col) => {
    const node = state.grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    const newGrid = [...state.grid];
    newGrid[row][col] = newNode;
    setState({ grid: newGrid });
  };

  const algoRat = () => {
    const { grid } = state;
    const algo = Track(grid, 0, 0, n);

    if (algo == null) {
      alert('Path not found');
      return;
    }

    const [first] = algo;
    const str = first;
    let row = 0;
    let col = 0;

    for (let i = 0; i < str.length; i++) {
      const pos = str[i];

      setTimeout(() => {
        const node = grid[row][col];
        const newNode = {
          ...node,
          isPath: true,
        };

        const newGrid = [...grid];
        newGrid[row][col] = newNode;
        setState({ grid: newGrid });

        if (pos === 'D') row = row + 1;
        else if (pos === 'U') row = row - 1;
        else if (pos === 'R') col = col + 1;
        else if (pos === 'L') col = col - 1;

        if (i === str.length - 1) {
          // If it's the last step, you can perform any logic or UI update
          // that you want to execute after the rat completes the movement.
          // For example, you can display a message, or disable the "Reset" button.
        }
      }, i * 2000); // Adjust the delay as needed (currently set to 1 second)
    }
  };

  const resetGame = () => {
    const grid = generateGrid();
    setState({ grid: grid });
  };

  const { grid } = state;

  return (
    <>
      <div className='background'>
        <div className='flex justify-center mt-10'>
          {grid &&
            grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, colIdx) => {
                    const { row, col, isFinish, isPath, isStart, isWall } = node;
                    return (
                      <Node
                        key={colIdx}
                        row={row}
                        col={col}
                        isFinish={isFinish}
                        isPath={isPath}
                        isStart={isStart}
                        isWall={isWall}
                        onMouseUp={handleMouseUp}
                      />
                    );
                  })}
                  <br />
                  <br />
                </div>
              );
            })}
        </div>
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={algoRat}
          >
            <b style={{ alignItems: 'center' }}> Start </b>
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
            onClick={resetGame}
          >
            <b>Reset</b>
          </button>
        </div>
        <h4>
          <b className='text-info'> Instructions: </b>
          <br />
          <b className='text-warning'> Create Walls: </b>{' '}
          <span className='text-black'>
            Click on any cell to toggle it between being a wall or an open path.
            Walls cannot be crossed by the developer. Then Click the "Start" button.
            After Playing game then click "Reset" button  for new Game.
          </span>
        </h4>
      </div>
    </>
  );
};

export default Ratgame;
