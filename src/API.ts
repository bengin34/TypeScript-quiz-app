import { shuffleArray } from "./utils";

// https://the-trivia-api.com/api/questions?categories=sport_and_leisure,general_knowledge&limit=10&difficulty=medium

export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};


export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type QuestionState = Question & { answer: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data)
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
