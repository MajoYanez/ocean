$(document).ready(function(){

/*
  Based of fontawesome pictures
*/ 
  
  let gameBase = {
    cardQty: 12,
    score: 0,
    bestResult: 0,
    list: ['fas fa-sun', 'fas fa-water','fas fa-wind','fas fa-ship',
    'fas fa-disease', 'fas fa-fan', 'fas fa-frog', 'fas fa-cloud',
    'fas fa-glasses','fas fa-otter','fas fa-fish',
    'fas fa-umbrella-beach']
  };
  
  var timerSet;
  
 // cards shuffle array prepare   
  var shuffleCards = function(size){
  var shuffleArray = [];
 // prepare new massive   
    for(var j=0; j<size; j++){
      shuffleArray.push(j);
      shuffleArray.push(j);
    }
  // shuffle massive
    shuffleArray.sort(() => Math.random() - 0.5);
    return shuffleArray;
  };

// game field preparing
  var prepareField = function(){
    // clear field
    $('.card').remove();
    
    //shuffle array getting
    var shuffleArray = shuffleCards(gameBase.cardQty);
    
    // field preparing
    for(var i=0; i < shuffleArray.length; i++){
    $('.field').append('<div class="card close"><div class="back"><p><i class="fab fa-envira"></i></p></div><div class="front"><p><i class="'+gameBase.list[shuffleArray[i]]+'"></i></p></div></div>');
      
    }
 // add event to cards   
     $(".card").bind('click', cardsOpen);
  };
  
  // open cards
  var cardsOpen = function(){
    var checkClass = '';
    var score = 0;
  // close all cards if we have too many active opened
    if($('.active').length > 1){
      $('.active').removeClass('active');
    }
  // if we have one opened active card get it`s classes
    if($('.active').length == 1){
      checkClass = $('.active .front i').attr('class');
      score = -1;
    }
    
// set active class to current opened card
    $(this).addClass('active');
// check if we have two opened cards with same class
      if ($(this).children('.front').children('p').children('i').attr('class') == checkClass){
 // mark opened active        
        $('.active').addClass('opened').removeClass('active close');
        score = 10;
      }
    
    scoreCounting(score);
    
    if($('.close').length<1){
      clearInterval(timerSet);
      $('.congratulation').text('All cards are opened. Congratulation!!!');
    }
    
  };
  // best score counting and publishing
  var bestScorePublish = function(){
    if(gameBase.bestResult<gameBase.score){
        gameBase.bestResult=gameBase.score;
      };
    $('.best span').text(gameBase.bestResult);
  }
  
  // score counting and publishing
  var scoreCounting = function(n=0){
    gameBase.score += n;
    $('.score span').text(gameBase.score);
  };
  
  // timer counting
 var timerStart = function(){
   timerSet = setInterval(function(){
    
    timerCount++;
    if(timerCount/50 == Math.floor(timerCount/50)){
      scoreCounting(-5);
    }    
    $('.time span').text(timerCount)
    
  }, 1000);
  
 };
 // new game start 
  $('.btn button').bind('click', function(){
    
    bestScorePublish();

    gameBase.score = 0;
    scoreCounting(0);
    timerCount = 0;
    $('.congratulation').text('');
    prepareField(); 
    timerStart();
         });
  
  
  
})