import './App.css';
import React, {useState, useEffect} from 'react';
import Request from './helpers/Request';
import UserForm from './UserForm'
import { api } from './Data'

function App() {

  const gameData = 
[
{
  linkWord: 'football',
  clues: ['player', 'boots', 'grass']
},
{
  linkWord: 'computer',
  clues: ['chip', 'disk', 'mother']
},
{
  linkWord: 'cypress',
  clues: ['get', 'wrap', 'visit']
},
{
  linkWord: 'fake dave',
  clues: ['email', 'whatsapp', 'fraud']
},
{
  linkWord: 'glasgow',
  clues: ['art', 'george', 'abc']
},
{
  linkWord: 'horse',
  clues: ['sea', 'racing', 'carriage']
},
{
  linkWord: 'football',
  clues: ['6', 'boot', 'grass']
},
{
  linkWord: 'football',
  clues: ['7', 'boot', 'grass']
},
{
  linkWord: 'football',
  clues: ['8', 'boot', 'grass']
},
{
  linkWord: 'football',
  clues: ['9', 'boot', 'grass']
},
]

const correctGif = [
  "https://media.giphy.com/media/d31w24psGYeekCZy/giphy.gif",
  "https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif",
  "https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif",
  "https://media.giphy.com/media/lvOnlEYunAwOkHjgmU/giphy.gif",
  "https://media.giphy.com/media/ZdUnQS4AXEl1AERdil/giphy.gif",
  "https://media.giphy.com/media/kBZBlLVlfECvOQAVno/giphy.gif"
]

const incorrectGif = [
  "https://media.giphy.com/media/YPsmTqYiHCMYtlsfKZ/giphy.gif",
  "https://media.giphy.com/media/W0SLa0YuzWBZ6/giphy.gif",
  "https://media.giphy.com/media/CfbDPJ17xZwqI/giphy.gif",
  "https://media.giphy.com/media/Lr3RZl7gkhd5BWZ5Nh/giphy.gif",
  "https://media.giphy.com/media/NoBXm9gmqzx96/giphy.gif",
  "https://media.giphy.com/media/l4pLY0zySvluEvr0c/giphy.gif"
]

const [gamePlay, setGamePlay] = useState(0);
const [linkGroup, setLinkGroup] = useState(0);
const [guesses, setGuesses] = useState(3);
const [userAnswer, setUserAnswer] = useState();
const [gameRound, setGameRound] = useState(1);
const [score, setScore] = useState(0);
const [showElement, setShowElement] = useState(false);
const [users, setUsers] = useState();
const [currentUser, setCurrentUser] = useState();
const [scoreRound, setScoreRound] = useState();
const [correct, setCorrect] = useState('');
const [gif, setGif] = useState(0);
const [stateUser, setStateUser] = useState(
  {
    id: "",  
    username: "",
    score: ""
  }
)

const updateUser = function(user){
  const request = new Request();
  request.patch(api + user.id, user)
  .then(() => window.location = '/')
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const updateGif = () => {
  if (correct == 'Correct'){
    let randomGif = getRandomInt(correctGif.length)
    setGif(correctGif[randomGif])
  } else {
    let randomGif = getRandomInt(incorrectGif.length)
    setGif(incorrectGif[randomGif])
  }
}

const submitScore = function(event){
  event.preventDefault();
  stateUser(
    {
      id: users[users.length-1].id,
      username: currentUser,
      score: score
    }
    )
  updateUser(stateUser); 
}



const requestAll = function(){
  const request = new Request();
  const usersPromise = request.get(api)
  
 Promise.all([usersPromise])
  .then((data) => {
    setUsers(data[0]);
  })
}

useEffect(() => {
  const data = localStorage.getItem("current-user");
  if (data){
    setCurrentUser(JSON.parse(data));
  }
}, []);

useEffect(() => {
  localStorage.setItem("current-user", JSON.stringify(currentUser))
})

useEffect(()=>{
  requestAll()
  
}, [])



const handleGamePlay = () => {
  setGamePlay(1)
}

const linkGroupNum = () => {
  let num = linkGroup
  num = num + 1
  setLinkGroup(num)
  let num2 = gameRound
  num2 = num2 + 1
  setGameRound(num2)
}

const handleChange = (e) => {
  let text = e.target.value
  setUserAnswer(text.toLowerCase())
}

const updateScore = () => {
 if (guesses === 3){
    let num = score
    num = num + 10
    setScore(num)
    setScoreRound(10)
    setCorrect('Correct')
    updateGif()
    
  } else {
    let num = score
    num = num + 5
    setScore(num)
    setScoreRound(5)
    setCorrect('Correct')
    updateGif()
  }
}

const playGame = () => {
  setScoreRound(0)
  if (userAnswer === gameData[linkGroup].linkWord){
    linkGroupNum()
    setGuesses(3)
    updateScore()
    correctAnswer()
    setUserAnswer("")
    if (gameRound === 6){
      setGamePlay(2)
    }
  } 
  else {
    let num = guesses
    num = guesses - 1
    let incorrect = 'Incorrect'
    setCorrect(incorrect)
    updateGif()
    console.log(scoreRound)
    if (guesses > 1){
      setGuesses(num)
      setUserAnswer("")
      incorrectAnswer()
      
    }
    else {
      linkGroupNum()
      setGuesses(3)
      setUserAnswer("")
      if (gameRound === 6){
        setGamePlay(2)
      }
    }
  }
}

const correctAnswer = () => {
  setShowElement(true)
  setTimeout(function() {
    setShowElement(false)
       }, 1000);
  
}

const incorrectAnswer = () => {
  setShowElement(true)
  setTimeout(function() {
    setShowElement(false)
       }, 1000);
  
}

const playAgain = () => {
  setGamePlay(1)
  setLinkGroup(0)
  setScore(0)
  setGuesses(3)
  setGameRound(1)
}

const returnHome = () => {
  setGamePlay(0)
  setLinkGroup(0)
  setScore(0)
  setGuesses(3)
  setGameRound(1)
}





if (gamePlay === 0 && currentUser === undefined){
 

  return (
 

    <div>
    <div id='title'>
    <h1>Link</h1>
    <h1>It</h1>
    </div>

    <div id='intro-page'>
    <h3>Welcome to LinkIt</h3>
    <h4 id='rules'>Rules</h4>
    <p>You will be presented will three words, each of these words relate to another single word. Your aim is to guess this word using as little lives as possible.</p>
    <p>Once the game is complete, you will find out your final score</p>
    <p>To play add your name and click Play</p>
    </div>
   
    <UserForm api={api} setCurrentUser={setCurrentUser}/>
    {/* <div id='play-btn'>
    <button id='btn-play' onClick={handleGamePlay}>Play</button>
    </div> */}
    
    </div>
    )
}

if (gamePlay === 0 && currentUser !== undefined){
 

  return (
 

    <div>
    <div id='title'>
    <h1>Link</h1>
    <h1>It</h1>
    </div>

    <div id='intro-page'>
    <h3>Welcome to LinkIt</h3>
    <h4 id='rules'>Rules</h4>
    <p>You will be presented will three words, each of these words relate to another single word. Your aim is to guess this word using as little lives as possible.</p>
    <p>Once the game is complete, your score will be added to the leaderboard</p>
    <p>To play add your name and click Play</p>
    <p>Hi, {currentUser}</p>
    </div>
   
    {/* <UserForm api={api} setCurrentUser={setCurrentUser}/> */}
    <div id='play-btn'>
    <button id='btn-play' onClick={handleGamePlay}>Play</button>
    </div>
    
    </div>
    )
}



if (gamePlay === 1){

  return (
    <div>
      <div id='title'>
      <h1>Link</h1>
      <h1>It</h1>
      </div>
      <div id='gif'>
       {showElement?<div id='score-round'>{correct} +{scoreRound}</div>:<></>} 
      </div>
      <div id='header'>
      <p>Player: {currentUser}</p>
      <p>Guesses: {guesses}</p>
      <p>Score: {score}</p>
      </div>
      
      <div id='linkWords'>
      <div id='box'>{gameData[linkGroup].clues[0]}</div>
      <div id='box'>{gameData[linkGroup].clues[1]}</div>
      <div id='box'>{gameData[linkGroup].clues[2]}</div>
    </div>
      <br></br>
      <div id='answerEntry'>
      <label>Enter Guess</label>
      <input id='txt-answer' type='text' value={userAnswer} onChange={handleChange}/>
      <button id='btn-submit' onClick={playGame} type='submit'>Submit</button>
      </div>
      <br></br>
      {/* <div id='gif'>
       {showElement?<div><img id='gif-img' src={gif} /></div>:<></>} 
      </div> */}
    </div>
  )

} 




else 
{
  return (
    <div>
        <div id='title'>
        <h1>Link</h1>
        <h1>It</h1>
        </div>
        <div id='score'>
        <h3>Score</h3>
        <h3>{score}</h3>
        <div id='play-btn'>
        <button id='btn-play-again' onClick={playAgain}>Play again</button>
        <div id='play-btn'>
        <button id='btn-play-again' onClick={returnHome}>Return home</button>
        </div>
        </div>
        </div>
    </div>

  
  )
}














 
}

export default App;
