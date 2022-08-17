/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/****************************************************************************************************************************************************************
* FUNCTIONS FOR PAGE BEHAVIOUR
********************************************************************************
*******************************************************************************/

/*****************************************************************************
* TIMEAGO FORMAT
****************************************************************************/
const timeAgoConvert = function(date) {
  return timeago.format(date);
}

/*****************************************************************************
* FOR CONVERTING DATES
****************************************************************************/
const convertDate = function(date) {
  const resultDate = new Date(date);
  const resultArr = String(resultDate).split(' ');
  return `${resultArr[0]} ${resultArr[1]} ${resultArr[2]} ${resultArr[3]}`
}

/*****************************************************************************
* FOR RENDERING TWEETS
****************************************************************************/
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $tweetContainer = $('#tweet-container')
  $tweetContainer.html('');

  for(const data of tweets) {
    let $tweet = createTweetElement(data);
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $tweetContainer.prepend($tweet); 
  }
}

/*****************************************************************************
* FOR ESCAPING
****************************************************************************/
const escp = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*****************************************************************************
* FOR CREATING TWEET ELEMENT
****************************************************************************/
function createTweetElement(tweetData) {
  let $tweet = (`<article class="tweet">
    <header>
      <div>
        <img class="logo" src=${tweetData.user.avatars} width="40" height="40">
        <span class="personName">${tweetData.user.name}</span>
      </div>
      <span>${tweetData.user.handle}</span>
    </header>
    <p class="tweet-p">${escp(tweetData.content.text)}</p>
    <footer>
      <span>${timeAgoConvert(tweetData.created_at)}</span>
      <div class="options">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

/*****************************************************************************
* FOR LOADING TWEETS
****************************************************************************/
function loadTweets() {
  $.ajax({
    url:'/tweets',
    type:'GET',
    success: (data) => {renderTweets(data);},
    error: (error) => {console.log(error)}
  });
}

/*****************************************************************************
* FOR DISPLAYING ERRORS IN TEXTBOX
****************************************************************************/
function displayErr(msg) {
  const $error = $('#error');
  $error.children('i').children('span').text(` Error: ${msg}`);
  $error.slideDown();
}

/****************************************************************************************************************************************************************
* WHEN THE DOCUMENT IS FINISHED RENDERING
********************************************************************************
*******************************************************************************/

/*****************************************************************************
* RENDER THE TWEET DATA
****************************************************************************/
  //hide the error and load the existing tweets
  
  loadTweets();
  //console.log(initialTweets);
  
  /*****************************************************************************
   * SUBMIT DATA
   ****************************************************************************/
  $createTweet = $('#tweet-form');

  $createTweet.submit(function(e) {
    e.preventDefault();

    const $tweetTextbox = $('#tweet-text');
    const textVal = $tweetTextbox.val();
    const textValLen = textVal.length;
    

    if(textVal === null || textVal === ''){
      //alert('message is empty')
      displayErr('message is empty');
      $tweetTextbox.focus();
      return;
    } 

    if(textValLen > 140) {
      displayErr('Your message is over 140 characters');
      $tweetTextbox.focus();
      return;
    } 
      console.log('request Started');
      const $error = $('#error');
      $error.hide();
      
      const data = $tweetTextbox.serialize();
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: data,
        success: () => {loadTweets();},
        error: (error) => {console.log(error)}
      })
      
      $tweetTextbox.val('');
      console.log('request ended')
  })
