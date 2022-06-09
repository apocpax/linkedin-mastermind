
$(document).ready(function() {
// varibles


    let guess = 0;
  let selectedMarble = '';
  let backGroundColor = 'grey';

  //hide the submit button into all 4 holders are guess
  $('.submit-btn').hide();
  let guessCount = 0;
// to prevent clicking the holders without a color
  let colorChosen = false;
//for the anwser
    let comboAnwser = comboMake();




//loop reverse order the guess holders

  let currentArray = $('.guess-holders');
  let guessBoxArray = [];
  let nextGradeBox =
  $($('.firstAnwsers')[0]).parent()[0];
  for(let i = 9; i >= 0; i--) {
      guessBoxArray.push(currentArray[i]);
  }



  //give the g id to each holder
  for(let i = 0; i < 10; i++) {
      let currentGuestArray =
      guessBoxArray[i].getElementsByClassName('guess-holder');
      for(let j = 0; j < 4; j++) {
          $(currentGuestArray[j]).attr('id', `g-${i}-${j}`);
      }
  }
//^ so cool

let guessHolderArray = [[-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],];


//function to remove current class

  $('.submit-btn').click(function() {
      $('.current').removeClass('current');
      let gradeArray = getGrade();
      checkIfWon(gradeArray);
      let gradeBox = nextBox();
      gradedPegs(gradeArray, gradeBox);
      guess++;
      //add current class to next row
      for(let i = 0; i < 4; i++) {
          $(`#g-${guess}-${i}`).addClass('current');
      }
       $('.submit-btn').hide()
  })

    //function for turning selector to the same color
    //as selector-color when clicked on
    $('.selector-color').click(function () {
        colorChosen = true;
       $('.selector').css('background-color', 'gray');
        let marble = ($(this).parent())[0];
        selectedMarble =
        $(this).css('background-color');
       $(marble).css('background-color', selectedMarble);
    });

    //event listener for clicking to add the color
    //for the guess
    $('.guess-holder').click(function() {
        if(colorChosen) {
            if ($(this).hasClass('current')) {
            let number = parseInt($(this).css('border'));

            if (number === 0) {
            $(this).css('background-color', selectedMarble);
            $(this).css('border', '2px solid white');
            let spot = $(this).attr('id');
            updateGuessArray(selectedMarble, spot);
            guessCount++;
            if(guessCount === 4) {
                $('.submit-btn').show();
                guessCount = 0;
            }

            } else {
                $(this).css('background-color', backGroundColor);
                $(this).css('border', '1px solid yellow');
                guessCount--;
            }
            }}
    });

    //the get request to get the random numbers
async function comboMake() {
   axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        .then((response) => {
            let data = response.data.split("");
            let stringNumbers = data.filter(el => el !== '\n')
            randomNumbers = stringNumbers.map(function (x){
                return parseInt(x);
            })
            let comboAnwser = randomNumbers;
            console.log(comboAnwser)
            }
        )
    }

    function updateGuessArray(color, ab) {
        let array = ab.split('-');
        let a = array[1]
        let b = array[2]
     guessHolderArray[a][b] = makeColorIntoANumber(color);
    }

    function makeColorIntoANumber(color) {
        if(color === 'rgb(255, 0, 0)')  return 0;
        if(color === 'rgb(255, 255, 0)')  return 1;
        if(color === 'rgb(0, 128, 0)')  return 2;
        if(color === 'rgb(0, 0, 255)')  return 3;
        if(color === 'rgb(128, 0, 128)')  return 4;
        if(color === 'rgb(255, 192, 203)')  return 5;
        if(color === 'rgb(0, 0, 0)')  return 6;
        if(color === 'rgb(255, 255, 255)')  return 7;

    }

    //to check for correct guess

    function getGrade() {
        let pegAnswerArray = [];
        let loopArray = [];
        for ( let i = 0; i < 4; i++ ) {
            loopArray.push(randomNumbers[i]);
        }

        for(i = 0; i < 4; i++){
            if (guessHolderArray[guess][i] === loopArray[i]) {
                pegAnswerArray.push('black-peg');
                loopArray[i] = -1;
                guessHolderArray[guess][i] = -2;
            }
        }

        //for right color but wrong spot pegs

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                if(guessHolderArray[guess][i] === loopArray[j]) {
                pegAnswerArray.push('white-peg');
                loopArray[j] = -1;
                guessHolderArray[guess][i] = -2;
                }
            }
        }

        console.log(loopArray);
        console.log(guessHolderArray[guess]);
        console.log(pegAnswerArray);
        return pegAnswerArray;
    }
    //function to select the grade boxes when hitting submit

    function nextBox() {
        let currentGrade =
        nextGradeBox.getElementsByClassName('grades-holders')[0];
        nextGradeBox = $(nextGradeBox).prev()[0];
        return currentGrade
    }

 function gradedPegs(gradeArray, gradeBox) {
    let gradedPegArray = gradeBox.getElementsByClassName("grade-holder");
    console.log(gradedPegArray)
    for(let i = 0; i < gradeArray.length; i++) {
      $(gradedPegArray[i]).addClass(`${gradeArray[i]}`);
    }
    $('.white-peg').css('background-color', 'white');
    $('.black-peg').css('background-color', 'black');
  }

  function checkIfWon(checkArray) {
    let checkString = checkArray.join()
    console.log(checkString);
    if (checkString === 'black-peg,black-peg,black-peg,black-peg') {
            $('.modal').fadeIn(200);
        }
  }

});
