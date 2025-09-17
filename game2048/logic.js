const container = document.querySelector(".container");
    for (let i = 0; i < 16; i++) {
      container.innerHTML += `<div></div>`;
    }
    const arr = Array.from(container.children);

    let valu = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 2, 4],
      [4, 4, 0, 4]
    ];

    function setContent() {
      for (let i = 0; i < 16; i++) {
        const val = valu[Math.floor(i / 4)][i % 4];
        arr[i].textContent = val === 0 ? "" : val;
      }
    }

    function slide(row) {
      row = row.filter(num => num !== 0);
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          row[i] *= 2;
          row[i + 1] = 0;
        }
      }
      return row.filter(num => num !== 0).concat(Array(4 - row.filter(num => num !== 0).length).fill(0));
    }

    function rotateClockwise(matrix) {
      return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
    }

    function rotateCounterClockwise(matrix) {
      return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
    }

    function handleMove(dir) {
  let newVal = [];
  const randomValues = [2, 4, 8];
  const getRandomValue = () => randomValues[Math.floor(Math.random() * randomValues.length)];
  let spawnCandidates = [];

  const canSpawnInCells = (cells) => {
    return cells.some(row => row.every(val => val === 0));
  };

  if (dir === 'ArrowLeft') {
    for (let i = 0; i < 4; i++) {
      newVal.push(slide(valu[i]));
    }

    // Kiểm tra từng hàng xem cột 2 và 3 có toàn 0 không
    let candidateRows = [];
    for (let i = 0; i < 4; i++) {
      if (newVal[i][2] === 0 && newVal[i][3] === 0) {
        candidateRows.push(i);
        spawnCandidates.push([i, 2], [i, 3]);
      }
    }

    if (candidateRows.length > 0) {
      const [r, c] = spawnCandidates[Math.floor(Math.random() * spawnCandidates.length)];
      newVal[r][c] = getRandomValue();
    }

  } else if (dir === 'ArrowRight') {
    for (let i = 0; i < 4; i++) {
      newVal.push(slide(valu[i].slice().reverse()).reverse());
    }

    let candidateRows = [];
    for (let i = 0; i < 4; i++) {
      if (newVal[i][0] === 0 && newVal[i][1] === 0) {
        candidateRows.push(i);
        spawnCandidates.push([i, 0], [i, 1]);
      }
    }

    if (candidateRows.length > 0) {
      const [r, c] = spawnCandidates[Math.floor(Math.random() * spawnCandidates.length)];
      newVal[r][c] = getRandomValue();
    }

  } else if (dir === 'ArrowUp') {
    let rotated = rotateClockwise(valu);
    rotated = rotated.map(row => slide(row.reverse()).reverse());
    newVal = rotateCounterClockwise(rotated);

    let candidateCols = [];
    for (let j = 0; j < 4; j++) {
      if (newVal[2][j] === 0 && newVal[3][j] === 0) {
        candidateCols.push(j);
        spawnCandidates.push([2, j], [3, j]);
      }
    }

    if (candidateCols.length > 0) {
      const [r, c] = spawnCandidates[Math.floor(Math.random() * spawnCandidates.length)];
      newVal[r][c] = getRandomValue();
    }

  } else if (dir === 'ArrowDown') {
    let rotated = rotateClockwise(valu);
    rotated = rotated.map(row => slide(row));
    newVal = rotateCounterClockwise(rotated);

    let candidateCols = [];
    for (let j = 0; j < 4; j++) {
      if (newVal[0][j] === 0 && newVal[1][j] === 0) {
        candidateCols.push(j);
        spawnCandidates.push([0, j], [1, j]);
      }
    }

    if (candidateCols.length > 0) {
      const [r, c] = spawnCandidates[Math.floor(Math.random() * spawnCandidates.length)];
      newVal[r][c] = getRandomValue();
    }
  }

  valu = newVal;
  setContent();
}


    document.addEventListener("keydown", e => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        handleMove(e.key);
      }
    });
    
    setContent();
