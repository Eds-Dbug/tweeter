/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1660503656377
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1660590056377
  }
]

const convertDate = function(date) {
  const resultDate = new Date(date);
  const resultArr = String(resultDate).split(' ');
  return `${resultArr[0]} ${resultArr[1]} ${resultArr[2]} ${resultArr[3]}`
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(const data of tweets) {
    $tweet = createTweetElement(data);
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    $('#tweet-container').append($tweet); 
  }

}

function createTweetElement(tweetData) {
  let $tweet = (`<article class="tweet">
    <header>
      <div>
        <img class="logo" src=${tweetData.user.avatars} width="40" height="40">
        <span class="personName">${tweetData.user.name}</span>
      </div>
      <span>${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <span>${convertDate(tweetData.created_at)}</span>
      <div class="options">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

// Test / driver code (temporary)
$(document).ready(function() {
  renderTweets(data);
  
  //console.log(initialTweets);

  $createTweet = $('#tweet-form');
  $createTweet.submit(function(e) {
    
    e.preventDefault();
  })
})