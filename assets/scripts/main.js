(function() {
  const header = document.querySelector('header');
  const cells = document.querySelectorAll('.game__tic__three_by_three__cell');
  const winsPlayOne = document.querySelector('[data-id="wins-play-one"]');
  const winsPlayTwo = document.querySelector('[data-id="wins-play-two"]');
  const winsPlayOneMobile = document.querySelector('[data-id="wins-play-one-mobile"]');
  const winsPlayTwoMobile = document.querySelector('[data-id="wins-play-two-mobile"]');
  const reset = document.querySelector('[data-id="reset-tic-three-by-three"]');
  const resetFourInARow = document.querySelector('[data-id="reset-for-in-a-row"]');
  const actions = document.querySelector('[data-id="actions-tic-three-by-three"]');
  const actionsFourInARow = document.querySelector('[data-id="actions-for-in-a-row"]');
  const playTurn = document.querySelector('[data-id="turn__three_by_three"]');
  const playOneWinner = document.querySelector('[data-id="one-winner"]');
  const playTwoWinner = document.querySelector('[data-id="two-winner"]');
  const historyResults = document.querySelectorAll('.data__historyresults');
  const historyResultsFourInARow = document.querySelectorAll('.data__historyresults-four-in-a-row');
  const matchResults = document.querySelectorAll('.data__matchresults');
  const matchResultsFourInARow = document.querySelectorAll('.data__matchresults-four-in-a-row');
  const winsPercentagePlayOne = document.querySelector('[data-id="wins-player-one"]');
  const winsPercentagePlayOneFourInARow = document.querySelector('[data-id="wins-player-one-four-in-a-row"]');
  const winsPercentagePlayTwo = document.querySelector('[data-id="wins-player-two"]');
  const winsPercentagePlayTwoFourInARow = document.querySelector('[data-id="wins-player-two-four-in-a-row"]');
  const defeatsPercentagePlayOne = document.querySelector('[data-id="defeats-player-one"]');
  const defeatsPercentagePlayOneFourInARow = document.querySelector('[data-id="defeats-player-one-four-in-a-row"]');
  const defeatsPercentagePlayTwo = document.querySelector('[data-id="defeats-player-two"]');
  const defeatsPercentagePlayTwoFourInARow = document.querySelector('[data-id="defeats-player-two-four-in-a-row"]');
  const timeHour = document.querySelector('[data-id="hour"]');
  const timeMinute = document.querySelector('[data-id="minute"]');
  const timeSecond = document.querySelector('[data-id="second"]');
  const gameTime = document.querySelector('[data-id="game-time"]');
  const totalTime = document.querySelector('[data-id="total-time"]');
  const totalTimeFourInRow = document.querySelector('[data-id="total-time-four-in-a-row"]');
  const trophyOne = document.querySelector('[data-id="games-trophy-one"]');
  const trophyTwo = document.querySelector('[data-id="games-trophy-two"]');
  const trophyOneMobile = document.querySelector('[data-id="games-trophy-one-mobile"]');
  const trophyTwoMobile = document.querySelector('[data-id="games-trophy-two-mobile"]');
  const data = document.querySelector('.data');
  const valueSubscribe = document.querySelector('[data-id="subscribe"]');
  const sendSubscribe = document.querySelector('[data-id="send-subscribe"]');
  const buttonTicTacToe = document.querySelector('[data-id="tic-tac-toe"]');
  const buttonFourInARow = document.querySelector('[data-id="four-in-a-row"]');
  const gameTicTacToe = document.querySelector('[data-id="game-tic-three-by-three"]');
  const gameForInARow = document.querySelector('[data-id="game-four-in-a-row"]');
  const columnsFourInARow = document.querySelectorAll('.game__for_in_a_row__column');
  const dataThreeByThree = document.querySelector('[data-id="data-three-by-three"]');
  const dataFourInARow = document.querySelector('[data-id="data-four-in-a-row"]');
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let numberOfMatchesThreeByThree = 0;
  let numberOfWinsThreeByThreePlayerOne = 0;
  let numberOfWinsThreeByThreePlayerTwo = 0;
  let numberOfLossesThreeByThreePlayerOne = 0;
  let numberOfLossesThreeByThreePlayerTwo = 0;

  let numberOfMatchesFourInARow = 0;
  let numberOfWinsFourInARowPlayerOne = 0;
  let numberOfWinsFourInARowPlayerTwo = 0;
  let numberOfLossesFourInARowPlayerOne = 0;
  let numberOfLossesFourInARowPlayerTwo = 0;

  let hour = 0;
  let minute = 0;
  let second = 0;
  let millisecond = 0;
  let cron;
  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let startTime = false;

  let gameBoardFourInARow = {};
  let currentPlayerFourInARow = 'red';
  let numRowsFourInARow = 6;
  let numColsFourInARow = 7;
  let numTurnsFourInARow = 0;
  

  function transparentHeader() {
    document.addEventListener('scroll', function(e) {
      window.scrollY >= 150 ? header.classList.add('transparent') : header.classList.remove('transparent');
    });
  }

  function timer() {
    if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 60) {
      minute = 0;
      hour++;
    }
    timeHour.innerText = returnData(hour);
    timeMinute.innerText = returnData(minute);
    timeSecond.innerText = returnData(second);
  }
  
  function returnData(input) {
    return input > 10 ? input : `0${input}`
  }

  function startStopWatch() {
    pause();
    cron = setInterval(() => { timer(); }, 10);
  }
  function pause() {
    clearInterval(cron);
  }

  function resetStopWatch() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    startTime = false;
    timeHour.innerText = '00';
    timeMinute.innerText = '00';
    timeSecond.innerText = '00';
  }

  function addTimes(timeOne, timeTwo) {
    let arrayOne = timeOne.split(':');
    let timeSecondOne = (parseInt(arrayOne[0]) * 3600) + (parseInt(arrayOne[1]) * 60) + parseInt(arrayOne[2]);
    let arrayTwo = timeTwo.split(':');
    let timeSecondTwo = (parseInt(arrayTwo[0]) * 3600) + (parseInt(arrayTwo[1]) * 60) + parseInt(arrayTwo[2]);
    let finalTime = parseInt(timeSecondOne) + parseInt(timeSecondTwo);
    let hours = Math.floor(finalTime / (60 * 60));
    let minuteDivider = finalTime % (60 * 60);
    let minutes = Math.floor(minuteDivider / 60);
    let secondsDivider = minuteDivider % 60;
    let seconds = Math.ceil(secondsDivider);
    let counter = "";
    
    if (hours < 10) {
      counter = "0" + hours + ":";
    } else {
      counter = hours + ":";
    };
    if (minutes < 10) {
      counter += "0" + minutes + ":";
    } else {
      counter += minutes + ":";
    };
    if (seconds < 10) {
      counter += "0" + seconds;
    } else {
      counter += seconds;
    };
    
    return counter;
  }

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(`play--${currentPlayer}`)
  }
  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playTurn.innerHTML = `It's player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;
  }

  function publishingDataFourInARow(player) {
    const valueGameTime = gameTime.innerText;
    const valueTotalTime = totalTimeFourInRow.innerHTML;
    numberOfMatchesFourInARow = numberOfMatchesFourInARow + 1;

    const valueWinsPercentagePlayOne = (numberOfWinsFourInARowPlayerOne/numberOfMatchesFourInARow*100).toFixed();
    const valueWinsPercentagePlayTwo = (numberOfWinsFourInARowPlayerTwo/numberOfMatchesFourInARow*100).toFixed();
    const valueDefeatsPercentagePlayOne = (numberOfLossesFourInARowPlayerOne/numberOfMatchesFourInARow*100).toFixed();
    const valueDefeatsPercentagePlayTwo = (numberOfLossesFourInARowPlayerTwo/numberOfMatchesFourInARow*100).toFixed();

    winsPercentagePlayOneFourInARow.innerHTML = `${valueWinsPercentagePlayOne}%`;
    winsPercentagePlayTwoFourInARow.innerHTML = `${valueWinsPercentagePlayTwo}%`;
    defeatsPercentagePlayOneFourInARow.innerHTML = `${valueDefeatsPercentagePlayOne}%`;
    defeatsPercentagePlayTwoFourInARow.innerHTML = `${valueDefeatsPercentagePlayTwo}%`;

    if (valueWinsPercentagePlayOne <= 33) {
      winsPercentagePlayOneFourInARow.classList.remove('warning');
      winsPercentagePlayOneFourInARow.classList.remove('success');
      winsPercentagePlayOneFourInARow.classList.add('danger');
    }
    if (valueWinsPercentagePlayOne > 33 && valueWinsPercentagePlayOne <= 66) {
      winsPercentagePlayOneFourInARow.classList.remove('danger');
      winsPercentagePlayOneFourInARow.classList.remove('success');
      winsPercentagePlayOneFourInARow.classList.add('warning');
    }
    if (valueWinsPercentagePlayOne > 66) {
      winsPercentagePlayOneFourInARow.classList.remove('warning');
      winsPercentagePlayOneFourInARow.classList.remove('danger');
      winsPercentagePlayOneFourInARow.classList.add('success');
    }

    if (valueWinsPercentagePlayTwo <= 33) {
      winsPercentagePlayTwoFourInARow.classList.remove('warning');
      winsPercentagePlayTwoFourInARow.classList.remove('success');
      winsPercentagePlayTwoFourInARow.classList.add('danger');
    }
    if (valueWinsPercentagePlayTwo > 33 && valueWinsPercentagePlayTwo <= 66) {
      winsPercentagePlayTwoFourInARow.classList.remove('danger');
      winsPercentagePlayTwoFourInARow.classList.remove('success');
      winsPercentagePlayTwoFourInARow.classList.add('warning');
    }
    if (valueWinsPercentagePlayTwo > 66) {
      winsPercentagePlayTwoFourInARow.classList.remove('warning');
      winsPercentagePlayTwoFourInARow.classList.remove('danger');
      winsPercentagePlayTwoFourInARow.classList.add('success');
    }

    if (valueDefeatsPercentagePlayOne <= 33) {
      defeatsPercentagePlayOneFourInARow.classList.remove('warning');
      defeatsPercentagePlayOneFourInARow.classList.remove('danger');
      defeatsPercentagePlayOneFourInARow.classList.add('success');
    }
    if (valueDefeatsPercentagePlayOne > 33 && valueDefeatsPercentagePlayOne <= 66) {
      defeatsPercentagePlayOneFourInARow.classList.remove('danger');
      defeatsPercentagePlayOneFourInARow.classList.remove('success');
      defeatsPercentagePlayOneFourInARow.classList.add('warning');
    }
    if (valueDefeatsPercentagePlayOne > 66) {
      defeatsPercentagePlayOneFourInARow.classList.remove('warning');
      defeatsPercentagePlayOneFourInARow.classList.remove('success');
      defeatsPercentagePlayOneFourInARow.classList.add('danger');
    }

    if (valueDefeatsPercentagePlayTwo <= 33) {
      defeatsPercentagePlayTwoFourInARow.classList.remove('warning');
      defeatsPercentagePlayTwoFourInARow.classList.remove('danger');
      defeatsPercentagePlayTwoFourInARow.classList.add('success');
    }
    if (valueDefeatsPercentagePlayTwo > 33 && valueDefeatsPercentagePlayTwo <= 66) {
      defeatsPercentagePlayTwoFourInARow.classList.remove('danger');
      defeatsPercentagePlayTwoFourInARow.classList.remove('success');
      defeatsPercentagePlayTwoFourInARow.classList.add('warning');
    }
    if (valueDefeatsPercentagePlayTwo > 66) {
      defeatsPercentagePlayTwoFourInARow.classList.remove('warning');
      defeatsPercentagePlayTwoFourInARow.classList.remove('success');
      defeatsPercentagePlayTwoFourInARow.classList.add('danger');
    }

    totalTimeFourInRow.innerHTML = addTimes(valueGameTime, valueTotalTime);

    for (let i = 0; i < historyResultsFourInARow.length; i++) {
      if (historyResultsFourInARow[i].innerHTML === '') {
        historyResultsFourInARow[i].innerHTML = player;
        break;
      }
    }

    for (let i = 0; i < matchResultsFourInARow.length; i++) {
      if (!matchResultsFourInARow[i].classList.contains('data__matchresults_active')) {
        matchResultsFourInARow[i].classList.add('data__matchresults_active');
        break;
      }
    }
    data.scrollIntoView({
      behavior: 'smooth'
    });
    
  }


  function publishingData(player) {
    const valueGameTime = gameTime.innerText;
    const valueTotalTime = totalTime.innerHTML;
    numberOfMatchesThreeByThree = numberOfMatchesThreeByThree + 1;

    const valueWinsPercentagePlayOne = (numberOfWinsThreeByThreePlayerOne/numberOfMatchesThreeByThree*100).toFixed();
    const valueWinsPercentagePlayTwo = (numberOfWinsThreeByThreePlayerTwo/numberOfMatchesThreeByThree*100).toFixed();
    const valueDefeatsPercentagePlayOne = (numberOfLossesThreeByThreePlayerOne/numberOfMatchesThreeByThree*100).toFixed();
    const valueDefeatsPercentagePlayTwo = (numberOfLossesThreeByThreePlayerTwo/numberOfMatchesThreeByThree*100).toFixed();

    winsPercentagePlayOne.innerHTML = `${valueWinsPercentagePlayOne}%`;
    winsPercentagePlayTwo.innerHTML = `${valueWinsPercentagePlayTwo}%`;
    defeatsPercentagePlayOne.innerHTML = `${valueDefeatsPercentagePlayOne}%`;
    defeatsPercentagePlayTwo.innerHTML = `${valueDefeatsPercentagePlayTwo}%`;

    if (valueWinsPercentagePlayOne <= 33) {
      winsPercentagePlayOne.classList.remove('warning');
      winsPercentagePlayOne.classList.remove('success');
      winsPercentagePlayOne.classList.add('danger');
    }
    if (valueWinsPercentagePlayOne > 33 && valueWinsPercentagePlayOne <= 66) {
      winsPercentagePlayOne.classList.remove('danger');
      winsPercentagePlayOne.classList.remove('success');
      winsPercentagePlayOne.classList.add('warning');
    }
    if (valueWinsPercentagePlayOne > 66) {
      winsPercentagePlayOne.classList.remove('warning');
      winsPercentagePlayOne.classList.remove('danger');
      winsPercentagePlayOne.classList.add('success');
    }

    if (valueWinsPercentagePlayTwo <= 33) {
      winsPercentagePlayTwo.classList.remove('warning');
      winsPercentagePlayTwo.classList.remove('success');
      winsPercentagePlayTwo.classList.add('danger');
    }
    if (valueWinsPercentagePlayTwo > 33 && valueWinsPercentagePlayTwo <= 66) {
      winsPercentagePlayTwo.classList.remove('danger');
      winsPercentagePlayTwo.classList.remove('success');
      winsPercentagePlayTwo.classList.add('warning');
    }
    if (valueWinsPercentagePlayTwo > 66) {
      winsPercentagePlayTwo.classList.remove('warning');
      winsPercentagePlayTwo.classList.remove('danger');
      winsPercentagePlayTwo.classList.add('success');
    }

    if (valueDefeatsPercentagePlayOne <= 33) {
      defeatsPercentagePlayOne.classList.remove('warning');
      defeatsPercentagePlayOne.classList.remove('danger');
      defeatsPercentagePlayOne.classList.add('success');
    }
    if (valueDefeatsPercentagePlayOne > 33 && valueDefeatsPercentagePlayOne <= 66) {
      defeatsPercentagePlayOne.classList.remove('danger');
      defeatsPercentagePlayOne.classList.remove('success');
      defeatsPercentagePlayOne.classList.add('warning');
    }
    if (valueDefeatsPercentagePlayOne > 66) {
      defeatsPercentagePlayOne.classList.remove('warning');
      defeatsPercentagePlayOne.classList.remove('success');
      defeatsPercentagePlayOne.classList.add('danger');
    }

    if (valueDefeatsPercentagePlayTwo <= 33) {
      defeatsPercentagePlayTwo.classList.remove('warning');
      defeatsPercentagePlayTwo.classList.remove('danger');
      defeatsPercentagePlayTwo.classList.add('success');
    }
    if (valueDefeatsPercentagePlayTwo > 33 && valueDefeatsPercentagePlayTwo <= 66) {
      defeatsPercentagePlayTwo.classList.remove('danger');
      defeatsPercentagePlayTwo.classList.remove('success');
      defeatsPercentagePlayTwo.classList.add('warning');
    }
    if (valueDefeatsPercentagePlayTwo > 66) {
      defeatsPercentagePlayTwo.classList.remove('warning');
      defeatsPercentagePlayTwo.classList.remove('success');
      defeatsPercentagePlayTwo.classList.add('danger');
    }

    totalTime.innerHTML = addTimes(valueGameTime, valueTotalTime);

    for (let i = 0; i < historyResults.length; i++) {
      if (historyResults[i].innerHTML === '') {
        historyResults[i].innerHTML = player;
        break;
      }
    }

    for (let i = 0; i < matchResults.length; i++) {
      if (!matchResults[i].classList.contains('data__matchresults_active')) {
        matchResults[i].classList.add('data__matchresults_active');
        break;
      }
    }
    data.scrollIntoView({
      behavior: 'smooth'
    });
    
  }

  function playerWin(player, valueWinsPlayOne, valueWinsPlayTwo, valueWinsPlayOneMobile, valueWinsPlayTwoMobile) {
    if (player === 1) {
      winsPlayOne.innerHTML = parseInt(valueWinsPlayOne) + 1
      winsPlayOneMobile.innerHTML = parseInt(valueWinsPlayOneMobile) + 1
      trophyOne.classList.add('active');
      trophyOneMobile.classList.add('active');
    }
    if (player === 2) {
      winsPlayTwo.innerHTML = parseInt(valueWinsPlayTwo) + 1;
      winsPlayTwoMobile.innerHTML = parseInt(valueWinsPlayTwoMobile) + 1;
      trophyTwo.classList.add('active');
      trophyTwoMobile.classList.add('active');
    }
  }

  function handleResultValidation() {
    const valueWinsPlayOne = winsPlayOne.innerHTML;
    const valueWinsPlayTwo = winsPlayTwo.innerHTML;
    const valueWinsPlayOneMobile = winsPlayOneMobile.innerHTML;
    const valueWinsPlayTwoMobile = winsPlayTwoMobile.innerHTML;
    let roundWon = false;
    
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break
      }
    }

    if (roundWon) {
      if (currentPlayer === 'X') {
        playerWin(1, valueWinsPlayOne, valueWinsPlayTwo, valueWinsPlayOneMobile, valueWinsPlayTwoMobile);
      } else {
        playerWin(2, valueWinsPlayOne, valueWinsPlayTwo, valueWinsPlayOneMobile, valueWinsPlayTwoMobile);
      }
      actions.classList.add('actions--active');
      playTurn.innerHTML = '';
      gameActive = false;
      
      if (valueWinsPlayOne === '4' && currentPlayer === 'X') {
        playOneWinner.classList.add('active');
        
        numberOfWinsThreeByThreePlayerOne = numberOfWinsThreeByThreePlayerOne + 1
        numberOfLossesThreeByThreePlayerTwo = numberOfLossesThreeByThreePlayerTwo + 1
        publishingData('P1');
        pause();
      }
      if (valueWinsPlayTwo === '4' && currentPlayer === 'O') {
        playTwoWinner.classList.add('active');
        
        numberOfWinsThreeByThreePlayerTwo = numberOfWinsThreeByThreePlayerTwo + 1
        numberOfLossesThreeByThreePlayerOne = numberOfLossesThreeByThreePlayerOne + 1
        publishingData('P2');
        pause();
      }

      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        actions.classList.add('actions--active');
        playTurn.innerHTML = 'This round ended in a draw';
        gameActive = false;
        return;
    }

    handlePlayerChange();
  }
  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-tic-three_by-three-index'));
    

    if (!startTime) {
      startStopWatch();
      buttonFourInARow.disabled = true;
      buttonTicTacToe.disabled = true;
      startTime = true;
    }
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  
  }

  function handleRestartGame() {
    const valueWinsPlayOne = winsPlayOne.innerHTML;
    const valueWinsPlayTwo = winsPlayTwo.innerHTML;
    
    if (valueWinsPlayOne === '5' || valueWinsPlayTwo === '5') {
      playOneWinner.classList.remove('active');
      playTwoWinner.classList.remove('active');
      winsPlayOne.innerHTML = 0;
      winsPlayTwo.innerHTML = 0;
      winsPlayOneMobile.innerHTML = 0;
      winsPlayTwoMobile.innerHTML = 0;
      buttonFourInARow.disabled = false;
      buttonTicTacToe.disabled = false;
      resetStopWatch();
    }
    clearBoard();
    playTurn.innerHTML = '';
    gameActive = true;
    currentPlayer = "X";
    currentPlayerFourInARow = 'red';
    gameState = ["", "", "", "", "", "", "", "", ""];
    trophyOne.classList.remove('active');
    trophyTwo.classList.remove('active');
    trophyOneMobile.classList.remove('active');
    trophyTwoMobile.classList.remove('active');
    actionsFourInARow.classList.remove('actions--active');
    document.querySelector('[data-id="actions-tic-three-by-three"]').classList.remove('actions--active');
    document.querySelectorAll('.game__tic__three_by_three__cell')
            .forEach(cell => {
              cell.innerHTML = ""
              cell.classList.remove('play--X');
              cell.classList.remove('play--O');
            });
  }

  function validSubscribe() {
    valueSubscribe.addEventListener('input', (e) => {
      e.preventDefault();
      const { value } = e.target;
      const emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
      if (emailPattern.test(value)){
        sendSubscribe.disabled = false;
      } else {
        sendSubscribe.disabled = true;
      }
    })
  }

  function changeGame() {
    buttonTicTacToe.addEventListener('click', (e) => {
      e.preventDefault();
      buttonFourInARow.classList.remove('game__button--active');
      buttonTicTacToe.classList.add('game__button--active');
      gameForInARow.classList.remove('active');
      gameTicTacToe.classList.add('active');
      dataFourInARow.classList.remove('active');
      dataThreeByThree.classList.add('active');
    });
    buttonFourInARow.addEventListener('click', (e) => {
      e.preventDefault();
      buttonTicTacToe.classList.remove('game__button--active');
      buttonFourInARow.classList.add('game__button--active');
      gameTicTacToe.classList.remove('active');
      gameForInARow.classList.add('active');
      dataThreeByThree.classList.remove('active');
      dataFourInARow.classList.add('active');
    });
  }


  function clearBoard() {
		Array.prototype.forEach.call(document.querySelectorAll('.circle'), function(piece) {
      piece.setAttribute('class', 'circle free');
    });
    gameBoardFourInARow = {};
    for(var x = 0; x <= numRowsFourInARow; x++) {
      gameBoardFourInARow[x] = {};
      for(var y = 0; y <= numColsFourInARow; y++) {
        gameBoardFourInARow[x][y] = 'free';
      }
    }

    numTurnsFourInARow = 0;
    return gameBoardFourInARow;
  };

  function isBounds(x, y) {
    return (gameBoardFourInARow.hasOwnProperty(x) && typeof gameBoardFourInARow[x][y] !== 'undefined');
  };

  function checkDirection(currentX, currentY, direction) {
    let chainLength;
    let directions;
    
    directions = {
      horizontal: [
        [0, -1], [0, 1]
      ],
      vertical: [
        [-1, 0], [1, 0]
      ],
      diagonal: [
        [-1, -1], [1, 1], [-1, 1], [1, -1]
      ]
    };
    
    chainLength = 1;
    
    directions[direction].forEach(function(coords) {
      let i = 1;
      while( isBounds(currentX + (coords[0] * i), currentY + (coords[1] * i)) && 
        (gameBoardFourInARow[currentX + (coords[0] * i)][currentY + (coords[1] * i)] === currentPlayerFourInARow)
      ) {
        chainLength = chainLength + 1; 
        i = i + 1; 
      };
    });
    return (chainLength >= 4);    
  };

  function isWinner(currentX, currentY) {
    return checkDirection(currentX, currentY, 'vertical') || 
      checkDirection(currentX, currentY, 'diagonal') || 
      checkDirection(currentX, currentY, 'horizontal');
  };

  function markNextFree(x) {
    const valueWinsPlayOne = winsPlayOne.innerHTML;
    const valueWinsPlayTwo = winsPlayTwo.innerHTML;
    const valueWinsPlayOneMobile = winsPlayOneMobile.innerHTML;
    const valueWinsPlayTwoMobile = winsPlayTwoMobile.innerHTML;
    let nextY = false;

    for (let y = 0; y < numRowsFourInARow; y++) {
      if(gameBoardFourInARow[x][y] === 'free') {
        nextY = y;
        break;
      }
    }
    if (nextY === false) {
      return false;
    }
    gameBoardFourInARow[x][nextY] = currentPlayerFourInARow;

    document.querySelector('#column-'+x+' .row-'+nextY+' .circle').setAttribute(
      'class', `circle ${currentPlayerFourInARow}`
    );

    if (isWinner(parseInt(x), nextY)) {
      currentPlayerFourInARow === 'red' ? 
        playerWin(1, valueWinsPlayOne, valueWinsPlayTwo, valueWinsPlayOneMobile, valueWinsPlayTwoMobile) : 
        playerWin(2, valueWinsPlayOne, valueWinsPlayTwo, valueWinsPlayOneMobile, valueWinsPlayTwoMobile);
      actionsFourInARow.classList.add('actions--active');

      playTurn.innerHTML = '';
      gameActive = false;
      
      if (valueWinsPlayOne === '4' && currentPlayerFourInARow === 'red') {
        playOneWinner.classList.add('active');
        
        numberOfWinsFourInARowPlayerOne = numberOfWinsFourInARowPlayerOne + 1
        numberOfLossesFourInARowPlayerTwo = numberOfLossesFourInARowPlayerTwo + 1
        publishingDataFourInARow('P1');
        pause();
      }
      if (valueWinsPlayTwo === '4' && currentPlayerFourInARow === 'yellow') {
        playTwoWinner.classList.add('active');
        
        numberOfWinsFourInARowPlayerTwo = numberOfWinsFourInARowPlayerTwo + 1
        numberOfLossesFourInARowPlayerOne = numberOfLossesFourInARowPlayerOne + 1
        publishingDataFourInARow('P2');
        pause();
      }
      return;
    }

    numTurnsFourInARow = numTurnsFourInARow + 1;

    if (numTurnsFourInARow >= numRowsFourInARow * numColsFourInARow) {
      playTurn.innerHTML = 'This round ended in a draw';
      actionsFourInARow.classList.add('actions--active');
      return;
    }

    currentPlayerFourInARow = currentPlayerFourInARow === 'red' ? 'yellow' : 'red';
    playTurn.innerHTML = `It's player ${currentPlayerFourInARow === 'red' ? '1' : '2'}'s turn`;
  }

  function initFourInARow() {
    columnsFourInARow.forEach(col => col.addEventListener('click', () => {
      if (!startTime) {
        startStopWatch();
        buttonFourInARow.disabled = true;
        buttonTicTacToe.disabled = true;
        startTime = true;
      }
      markNextFree(col.getAttribute('data-x'))
    }))

    for(let x = 0; x <= numRowsFourInARow; x++) {
      gameBoardFourInARow[x] = {};
      for(var y = 0; y <= numColsFourInARow; y++) {
        gameBoardFourInARow[x][y] = 'free';
      }
    }
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  reset.addEventListener('click', handleRestartGame);
  resetFourInARow.addEventListener('click', handleRestartGame);
  transparentHeader();
  validSubscribe();
  changeGame();
  initFourInARow();
})()
