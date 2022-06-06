
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



//function to remove current class

  $('.submit-btn').click(function() {
      $('.current').removeClass('current');
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
       console.log(selectedMarble);
    });

    //event listener for clicking to add the color
    //for the guess
    $('.guess-holder').click(function() {
        if(colorChosen) {
            if ($(this).hasClass('current')) {
            let number = parseInt($(this).css('border'));
            console.log(number);
            if (number === 0) {
            $(this).css('background-color', selectedMarble);
            $(this).css('border', '2px solid white');

            guessCount++;
            if(guessCount === 4) {
                $('.submit-btn').show();
                guessCount = 0;
            }
            console.log(number);
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




});
