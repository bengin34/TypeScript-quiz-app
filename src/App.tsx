import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

//components
import QuestionCard from "./components/QuestionCard";

//Types
import { QuestionState, Difficulty } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10; 

/**
* @description This is the `App` component for a React quiz application that displays
* a trivia game with multiple-choice questions. It prepares the state and renders
* the UI based on the game's progress:
* 
* 1/ Initializes the state variables: `loading`, `questions`, `number`, `userAnswers`,
* `score`, and `gameOver` with default values.
* 2/ Defines four functions:
* 		- `startTrivia()` starts a new quiz and loads questions from an API.
* 
* @returns { Component } The output returned by the `App` function is a React component
* that renders a trivia game interface. The interface includes a "Start" button to
* begin the game and a "Next Question" button to proceed to the next question. It
* also displays the current question number and score. When the user answers a
* question correctly or runs out of questions and times up during a question (the
* game over), it updates accordingly to show the scores and allow them to start
* another trivia. The functions available within this component are `startTrivia`,
*   'checkAnswer' which check whether answers are correct if it does not stop game
* time it stops on first mistake.
*/
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

/**
* @description This function prepares a new trivia game by fetching a set of questions
* and initializing various state variables to prepare for the game.
*/
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

/**
* @description This function is a click handler for a button element.
* 
* @param { undefined } e - The `e` input parameter is a `React.MouseEvent<HTMLButtonElement>`
* object that represents the event triggered by the button click. It contains
* information about the event such as the type of event (in this case 'click'), the
* target element (the button element), and other related information.
*/
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
    }
  };

/**
* @description The function `nextQuestion()` does nothing (is undefined) and returns
* no value.
*/
  const nextQuestion = () => {};
  console.log(questions)
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score"> Score: </p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number +1 &&number !== TOTAL_QUESTIONS -1 ?
       ( <button className="next" onClick={nextQuestion}>
        Next Question
      </button>) : null}
     
    </div>
  );
}

export default App;
