(function() {
  const header = document.querySelector('header');
  const cells = document.querySelectorAll('.game__tic__three_by_three__cell');
  const winsPlayOne = document.querySelector('[data-id="wins-play-one"]');
  const winsPlayTwo = document.querySelector('[data-id="wins-play-two"]');
  const winsPlayOneMobile = document.querySelector('[data-id="wins-play-one-mobile"]');
  const winsPlayTwoMobile = document.querySelector('[data-id="wins-play-two-mobile"]');
  const reset = document.querySelector('[data-id="reset-tic-three-by-three"]');
  const actions = document.querySelector('[data-id="actions-tic-three-by-three"]');
  const playTurn = document.querySelector('[data-id="turn__three_by_three"]');
  const playOneWinner = document.querySelector('[data-id="one-winner"]');
  const playTwoWinner = document.querySelector('[data-id="two-winner"]');
  const historyResults = document.querySelectorAll('.data__historyresults');
  const matchResults = document.querySelectorAll('.data__matchresults');
  const winsPercentagePlayOne = document.querySelector('[data-id="wins-player-one"]');
  const winsPercentagePlayTwo = document.querySelector('[data-id="wins-player-two"]');
  const defeatsPercentagePlayOne = document.querySelector('[data-id="defeats-player-one"]');
  const defeatsPercentagePlayTwo = document.querySelector('[data-id="defeats-player-two"]');
  const timeHour = document.querySelector('[data-id="hour"]');
  const timeMinute = document.querySelector('[data-id="minute"]');
  const timeSecond = document.querySelector('[data-id="second"]');
  const gameTime = document.querySelector('[data-id="game-time"]');
  const totalTime = document.querySelector('[data-id="total-time"]');
  const trophyOne = document.querySelector('[data-id="games-trophy-one"]');
  const trophyTwo = document.querySelector('[data-id="games-trophy-two"]');
  const trophyOneMobile = document.querySelector('[data-id="games-trophy-one-mobile"]');
  const trophyTwoMobile = document.querySelector('[data-id="games-trophy-two-mobile"]');
  const data = document.querySelector('.data');
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
  let hour = 0;
  let minute = 0;
  let second = 0;
  let millisecond = 0;
  let cron;
  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];
  let startTime = false;
  

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
        winsPlayOne.innerHTML = parseInt(valueWinsPlayOne) + 1
        winsPlayOneMobile.innerHTML = parseInt(valueWinsPlayOneMobile) + 1
        trophyOne.classList.add('active');
        trophyOneMobile.classList.add('active');
      } else {
        winsPlayTwo.innerHTML = parseInt(valueWinsPlayTwo) + 1;
        winsPlayTwoMobile.innerHTML = parseInt(valueWinsPlayTwoMobile) + 1;
        trophyTwo.classList.add('active');
        trophyTwoMobile.classList.add('active');
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
      resetStopWatch();
    }
    playTurn.innerHTML = '';
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    trophyOne.classList.remove('active');
    trophyTwo.classList.remove('active');
    trophyOneMobile.classList.remove('active');
    trophyTwoMobile.classList.remove('active');
    document.querySelector('[data-id="actions-tic-three-by-three"]').classList.remove('actions--active');
    document.querySelectorAll('.game__tic__three_by_three__cell')
            .forEach(cell => {
              cell.innerHTML = ""
              cell.classList.remove('play--X');
              cell.classList.remove('play--O');
            });
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  reset.addEventListener('click', handleRestartGame);

  transparentHeader();
})()
