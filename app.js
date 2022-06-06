
$(document).ready(function() {
// varibles


    let guess = 0;
  let selectedMarble = '';
  let backGroundColor = 'grey';

//loop reverse order the guess holders

  let currentArray = $('.guess-holders');
  let guessBoxArray = [];
  for(let i = 9; i >= 0; i--) {
      guessBoxArray.push(currentArray[i]);
  }

  //function to remove active class

  $('.submit-btn').click(function() {
      $('.active').removeClass('active');
      guess++
  })

    //function for turning selector to the same color
    //as selector-color when clicked on
    $('.selector-color').click(function () {
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
        if ($(this).hasClass('active')) {
        let number = parseInt($(this).css('border'));
        console.log(number);
        if (number === 0) {
        $(this).css('background-color', selectedMarble);
        $(this).css('border', '2px solid white');
        console.log(number);
        } else {
            $(this).css('background-color', backGroundColor);
            $(this).css('border', '1px solid yellow');
        }
    }
    });

});
