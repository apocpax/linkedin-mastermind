
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
  //for the answer
  let comboAnswer = comboMake();




//loop reverse order the guess holders

  let currentArray = $('.guess-holders');
  let guessBoxArray = [];
  let nextGradeBox =
  $($('.firstAnswers')[0]).parent()[0];
  for(let i = 9; i >= 0; i--) {
      guessBoxArray.push(currentArray[i]);
  }
    /* looks for the element firstAnswers from index.html
    then looks it back one which is actually pushing it to
    the next grades-holders because the order is in reverse */



  //give the g id to each holder
  for(let i = 0; i < 10; i++) {
      let currentGuestArray =
      guessBoxArray[i].getElementsByClassName('guess-holder');
      for(let j = 0; j < 4; j++) {
          $(currentGuestArray[j]).attr('id', `g-${i}-${j}`);
        }
  }
/*^ so cool
i needed to give each guess holder a holder to define it so i
ran a loop calling each row  then another one for each spot in
the row so i could get a number to identify each spot on the board*/

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

/* its at -1 because -1 has no color connected to it
but once up dated it will replace the -1 with the number
attached to the color*/
//function to remove current class

  $('.submit-btn').click(function() {
      $('.current').removeClass('current');
      let gradeArray = getGrade();
      guess++;
      checkIfWon(gradeArray);
      let gradeBox = nextBox();
      gradedPegs(gradeArray, gradeBox);
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
    /* turning the parent of the inner circle the which is the outer
    circle to the same color when click on to show which one
    is currently choosen */


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
/* first we get the color choosen at the time then if click on the
row that currently has the current title and if the border is only 1 px
make that spot the same color as the choosen one, and turn the border to 2 px
then if all 4 guess have a guess then reveal the submit button.
else turn the background back to gray and the border back to 1 and subtract to the
guesscount */
//the get request to get the random numbers
async function comboMake() {
   axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        .then((response) => {
            let data = response.data.split("");
            let stringNumbers = data.filter(el => el !== '\n')
            randomNumbers = stringNumbers.map(function (x){
                return parseInt(x);
            })
            let comboAnswer = randomNumbers;
            console.log(comboAnswer)
        }
        )
    };
    /* calling the get api for the random numbers turning it into a sting
    followed by filtering out the non numbers. then return just the numbers */

    function updateGuessArray(color, ab) {
        let array = ab.split('-');
        let a = array[1]
        let b = array[2]
        guessHolderArray[a][b] = makeColorIntoANumber(color);
    }

    /*  taking the guessholderarray from above and the make
    make colorIntoANumber function below and put that number into the array
    when click in the guess-holders spot but first taking out the
    - of the id and using the 2nd and 3rd object in it which is the first number and 2nd number */

    function makeColorIntoANumber(color) {
        if(color === 'rgb(255, 0, 0)')  return 0;
        if(color === 'rgb(255, 255, 0)')  return 1;
        if(color === 'rgb(0, 100, 0)')  return 2;
        if(color === 'rgb(0, 0, 255)')  return 3;
        if(color === 'rgb(128, 0, 128)')  return 4;
        if(color === 'rgb(255, 192, 203)')  return 5;
        if(color === 'rgb(0, 0, 0)')  return 6;
        if(color === 'rgb(255, 255, 255)')  return 7;

    }
    /*function with each color's rgb so when checking
    if it is correct it will return the number
    associtated with it  */

    //to check for correct guess. looks at the guessholderarray
    //then the loopArray which the random number has been push into
    // if it finds an exact match it removes from the current
    //count and place a -1 or -2 depend on the array as well
    //as push in the if a peg was guess into the peganswerarray
    // then at the end if peganwserarray = four blackpegarray
    //the modal massage apperas

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
// check the string to see if graded to four black pegs
function checkIfWon(checkArray) {
    let checkString = checkArray.join()
    console.log(checkString);
    if (checkString === 'black-peg,black-peg,black-peg,black-peg') {
        $('.modal').fadeIn(200);
        let boxScore = guess
        $(".scoreBox").append(boxScore);
    }

}
/* checking to see if you have 4 black pegs and if you do then you have
won and the modal winning message will appera*/





});
