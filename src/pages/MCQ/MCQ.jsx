import { useState } from "react";
import {
  BookOpenCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Trophy,
  CheckCircle,
  XCircle,
  Clock3,
  Target,
  Award,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  Home,
} from "lucide-react";

import { mcqSubjects } from "../../data/mcqQuestions";

function MCQ() {
  const [activeSubject, setActiveSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const selectedSubject = mcqSubjects.find(
    (subject) => subject.id === activeSubject
  );

  const questions = selectedSubject?.questions ?? [];
  const question = questions[currentQuestion];

  const totalQuestions = questions.length;
  const isAnswered = selectedAnswer !== null;

  const score = questions.reduce((total, item, index) => {
  return total + (answers[index] === item.answer ? 1 : 0);
}, 0);

  const incorrectAnswers = answers.reduce((total, answer, index) => {
  if (answer === undefined || answer === null) {
    return total;
  }

  return total + (answer !== questions[index]?.answer ? 1 : 0);
}, 0);

const unansweredQuestions = totalQuestions - answers.filter(
  (answer) => answer !== undefined && answer !== null
).length;

  const percentage =
  totalQuestions > 0
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  const progress =
    totalQuestions > 0
      ? ((currentQuestion + 1) / totalQuestions) * 100
      : 0;

  const resultMessage =
    percentage >= 80
      ? {
          title: "Excellent Work!",
          description: "Outstanding performance! Keep learning and improving.",
        }
      : percentage >= 60
        ? {
            title: "Good Job!",
            description: "Good progress! Practice a little more to improve your score.",
          }
        : percentage >= 40
          ? {
              title: "Keep Practicing!",
              description: "You are making progress. Review your answers and try again.",
            }
          : {
              title: "Keep Learning!",
              description: "Every attempt helps you improve. Review the explanations and try again.",
            };

  function startQuiz(subject) {
    if (!subject.questions?.length) return;

    setActiveSubject(subject.id);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setAnswerSubmitted(false);
    setShowReview(false);
  }

  function submitAnswer() {
    if (
      selectedAnswer === null ||
      !question ||
      answerSubmitted
    ) {
      return;
    }

    setAnswers((previousAnswers) => {
      const updatedAnswers = [...previousAnswers];
      updatedAnswers[currentQuestion] = selectedAnswer;
      return updatedAnswers;
    });

    setAnswerSubmitted(true);
  }

  function goToNextQuestion() {
    if (!answerSubmitted) return;

    if (currentQuestion >= totalQuestions - 1) {
      setShowResult(true);
      setShowReview(false);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  }

  function goToPreviousQuestion() {
    if (currentQuestion <= 0 || answerSubmitted) return;

    setCurrentQuestion((previous) => previous - 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setAnswerSubmitted(false);
    setShowReview(false);
  }

  function backToSubjects() {
    setActiveSubject(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setAnswerSubmitted(false);
    setShowReview(false);
  }

  function scrollToSubjects() {
    document
      .getElementById("mcq-categories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-10 text-white shadow-xl shadow-indigo-200/50 sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
              <BookOpenCheck size={34} aria-hidden="true" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Learn · Practice · Improve
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              MCQ Practice
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
              Test your knowledge, understand your mistakes, and build
              confidence with interactive practice quizzes.
            </p>

            {!activeSubject && (
              <button
                type="button"
                onClick={scrollToSubjects}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                Explore Subjects
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          {!activeSubject && (
            <div className="relative mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm">
                <BookOpenCheck
                  className="mx-auto mb-2 text-indigo-100"
                  size={24}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">Multiple Subjects</p>
                <p className="mt-1 text-xs text-indigo-100">
                  Choose what to practice
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm">
                <Target
                  className="mx-auto mb-2 text-indigo-100"
                  size={24}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">Instant Feedback</p>
                <p className="mt-1 text-xs text-indigo-100">
                  Learn from every answer
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm">
                <Trophy
                  className="mx-auto mb-2 text-indigo-100"
                  size={24}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold">Score Summary</p>
                <p className="mt-1 text-xs text-indigo-100">
                  Review your performance
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Subject Selection */}
        {!activeSubject ? (
          <section
            id="mcq-categories"
            className="scroll-mt-24 pt-12 sm:pt-16"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                  Start Learning
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Choose Your Subject
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Select a subject to begin. Answer every question and
                  review your results when you finish.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ClipboardCheck size={18} aria-hidden="true" />
                Practice at your own pace
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mcqSubjects.map((subject, index) => {
                const available =
                  Array.isArray(subject.questions) &&
                  subject.questions.length > 0;

                const subjectColors = [
                  "bg-indigo-100 text-indigo-700",
                  "bg-violet-100 text-violet-700",
                  "bg-sky-100 text-sky-700",
                ];

                return (
                  <article
                    key={subject.id}
                    className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                          subjectColors[index % subjectColors.length]
                        } transition duration-300 group-hover:scale-105`}
                      >
                        <BookOpenCheck size={27} aria-hidden="true" />
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {available
                          ? `${subject.questions.length} Questions`
                          : "Coming Soon"}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      {subject.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                      {subject.description}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle size={15} aria-hidden="true" />
                        <span>Answer explanations included</span>
                      </div>

                      <button
                        type="button"
                        disabled={!available}
                        onClick={() => startQuiz(subject)}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {available ? "Start Practice" : "Coming Soon"}

                        {available && (
                          <ArrowRight size={18} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : showResult ? (
          /* Quiz Result */
          <section
            className="mx-auto mt-10 max-w-4xl"
            aria-labelledby="quiz-result-title"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-10 text-center sm:px-10 sm:py-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  {percentage >= 80 ? (
                    <Trophy size={42} aria-hidden="true" />
                  ) : (
                    <Award size={42} aria-hidden="true" />
                  )}
                </div>

                <p className="mt-5 text-sm font-bold uppercase tracking-widest text-indigo-600">
                  Quiz Completed
                </p>

                <h2
                  id="quiz-result-title"
                  className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl"
                >
                  {resultMessage.title}
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  {resultMessage.description}
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  Subject: {selectedSubject?.title}
                </p>
              </div>

              <div className="px-5 py-7 sm:px-10 sm:py-10">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 text-center">
                  <p className="text-sm font-bold uppercase tracking-wider text-indigo-700">
                    Your Final Score
                  </p>

                  <p className="mt-3 text-5xl font-extrabold tracking-tight text-indigo-700 sm:text-6xl">
                    {score}
                    <span className="text-2xl font-semibold text-indigo-400 sm:text-3xl">
                      {" "}/ {totalQuestions}
                    </span>
                  </p>

                  <p className="mt-3 text-lg font-bold text-slate-800">
                    {percentage}% Correct
                  </p>

                  <div
                    className="mt-5 h-3 overflow-hidden rounded-full bg-indigo-100"
                    role="progressbar"
                    aria-label="Final quiz score"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percentage}
                  >
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 p-5 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <CheckCircle size={23} aria-hidden="true" />
                    </div>

                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                      {score}
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Correct Answers
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                      <XCircle size={23} aria-hidden="true" />
                    </div>

                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                      {incorrectAnswers}
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Incorrect Answers
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <ClipboardCheck size={23} aria-hidden="true" />
                    </div>

                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                      {totalQuestions}
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Questions Attempted
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  >
                    <RotateCcw size={18} aria-hidden="true" />
                    Try Again
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReview((previous) => !previous)}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                    aria-expanded={showReview}
                  >
                    <ClipboardCheck size={18} aria-hidden="true" />
                    {showReview ? "Hide Answer Review" : "Review Answers"}

                    {showReview ? (
                      <ChevronUp size={18} aria-hidden="true" />
                    ) : (
                      <ChevronDown size={18} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={backToSubjects}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    <Home size={18} aria-hidden="true" />
                    All Subjects
                  </button>
                </div>

                {/* Answer Review */}
                {showReview && (
                  <section
                    className="mt-8 border-t border-slate-200 pt-7"
                    aria-labelledby="answer-review-title"
                  >
                    <h3
                      id="answer-review-title"
                      className="text-xl font-extrabold text-slate-900"
                    >
                      Review Your Answers
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Check the correct answers and explanations to
                      understand the concepts you need to practice.
                    </p>

                    <div className="mt-5 space-y-4">
                      {questions.map((item, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === item.answer;

                        return (
                          <article
                            key={`${item.id ?? index}-${index}`}
                            className={`rounded-2xl border p-5 ${
                              isCorrect
                                ? "border-green-200 bg-green-50/50"
                                : "border-red-200 bg-red-50/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                  isCorrect
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {isCorrect ? (
                                  <CheckCircle size={19} aria-hidden="true" />
                                ) : (
                                  <XCircle size={19} aria-hidden="true" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                  Question {index + 1}
                                </p>

                                <h4 className="mt-2 font-bold leading-6 text-slate-900">
                                  {item.question}
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-700">
                                  <span className="font-semibold">
                                    Your answer:{" "}
                                  </span>
                                  {userAnswer !== undefined
                                    ? item.options[userAnswer]
                                    : "Not answered"}
                                </p>

                                {!isCorrect && (
                                  <p className="mt-2 text-sm leading-6 text-green-800">
                                    <span className="font-semibold">
                                      Correct answer:{" "}
                                    </span>
                                    {item.options[item.answer]}
                                  </p>
                                )}

                                <div className="mt-3 border-t border-slate-200/70 pt-3">
                                  <p className="text-sm font-semibold text-slate-800">
                                    Explanation
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {item.explanation ||
                                      "No explanation is available for this question yet."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </section>
        ) : question ? (
          /* Quiz Questions */
          <section
            className="mx-auto mt-8 max-w-4xl"
            aria-labelledby="current-question-title"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={backToSubjects}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <ArrowLeft size={17} aria-hidden="true" />
                All Subjects
              </button>

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
                <Clock3 size={16} aria-hidden="true" />
                Practice Mode
              </span>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Quiz Header */}
              <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                      <BookOpenCheck size={16} aria-hidden="true" />
                      {selectedSubject?.title}
                    </span>

                    <p className="mt-3 text-sm text-slate-500">
                      Select the best answer for the question below.
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
                    <p className="text-xs font-medium text-slate-500">
                      Question
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-slate-900">
                      {currentQuestion + 1}
                      <span className="font-medium text-slate-400">
                        {" "}/ {totalQuestions}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
                    <span>Quiz Progress</span>
                    <span>{Math.round(progress)}% completed</span>
                  </div>

                  <div
                    className="h-2.5 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label="Quiz progress"
                    aria-valuemin={0}
                    aria-valuemax={totalQuestions}
                    aria-valuenow={currentQuestion + 1}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="px-5 py-7 sm:px-8 sm:py-9">
                <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Multiple Choice Question
                </div>

                <h2
                  id="current-question-title"
                  className="text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl"
                >
                  {question.question}
                </h2>

                <fieldset className="mt-7 space-y-3">
                  <legend className="mb-3 text-sm font-medium text-slate-500">
                    Choose one answer
                  </legend>

                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === question.answer;

                    let optionStyle =
                      "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40";

                    if (answerSubmitted && isCorrect) {
                      optionStyle = "border-green-500 bg-green-50";
                    } else if (
                      answerSubmitted &&
                      isSelected &&
                      !isCorrect
                    ) {
                      optionStyle = "border-red-500 bg-red-50";
                    } else if (isSelected) {
                      optionStyle = "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100";
                    }

                    return (
                      <label
                        key={`${question.id ?? currentQuestion}-${index}`}
                        className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 transition ${
                          answerSubmitted
                            ? "cursor-default"
                            : "cursor-pointer"
                        } ${optionStyle}`}
                      >
                        <input
                          type="radio"
                          name={`question-${activeSubject}-${currentQuestion}`}
                          value={index}
                          checked={isSelected}
                          disabled={answerSubmitted}
                          onChange={() => setSelectedAnswer(index)}
                          className="h-4 w-4 shrink-0 accent-indigo-600 focus:ring-indigo-500"
                        />

                        <span className="flex-1 text-sm font-medium leading-6 text-slate-700 sm:text-base">
                          {option}
                        </span>

                        {answerSubmitted && isCorrect && (
                          <CheckCircle
                            size={21}
                            className="shrink-0 text-green-600"
                            aria-label="Correct answer"
                          />
                        )}

                        {answerSubmitted && isSelected && !isCorrect && (
                          <XCircle
                            size={21}
                            className="shrink-0 text-red-600"
                            aria-label="Incorrect answer"
                          />
                        )}
                      </label>
                    );
                  })}
                </fieldset>

                {/* Answer Feedback */}
                {answerSubmitted && (
                  <div
                    className={`mt-6 rounded-2xl border p-5 ${
                      selectedAnswer === question.answer
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start gap-3">
                      {selectedAnswer === question.answer ? (
                        <CheckCircle
                          size={24}
                          className="mt-0.5 shrink-0 text-green-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          size={24}
                          className="mt-0.5 shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                      )}

                      <div>
                        <h3
                          className={`font-bold ${
                            selectedAnswer === question.answer
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {selectedAnswer === question.answer
                            ? "Correct Answer!"
                            : "Not Quite Right"}
                        </h3>

                        {selectedAnswer !== question.answer && (
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            <span className="font-semibold">
                              Correct answer:{" "}
                            </span>
                            {question.options[question.answer]}
                          </p>
                        )}

                        <div className="mt-3 border-t border-current/10 pt-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Explanation
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {question.explanation ||
                              "No explanation is available for this question yet."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestion === 0 || answerSubmitted}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                    Previous
                  </button>

                  {!answerSubmitted ? (
                    <button
                      type="button"
                      onClick={submitAnswer}
                      disabled={!isAnswered}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                    >
                      Submit Answer
                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goToNextQuestion}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    >
                      {currentQuestion === totalQuestions - 1
                        ? "View Final Result"
                        : "Next Question"}

                      <ArrowRight size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              Practice Mode · Your answers are evaluated as you progress.
            </p>
          </section>
        ) : (
          /* Empty Question State */
          <section className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <BookOpenCheck
              className="mx-auto mb-3 text-amber-600"
              size={36}
              aria-hidden="true"
            />

            <h2 className="text-lg font-bold text-slate-900">
              No Questions Available
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              This subject does not have any questions yet. Please choose
              another subject.
            </p>

            <button
              type="button"
              onClick={backToSubjects}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Back to Subjects
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

export default MCQ;