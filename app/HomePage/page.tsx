"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// A dedicated modal component for showing the questionnaire and score.
const QuestionnaireModal = ({
  questions,
  answers,
  onAnswer,
  onSubmit,
  score,
  onClose,
}: {
  questions: any[];
  answers: { [key: string]: boolean };
  onAnswer: (question: string, answer: boolean) => void;
  onSubmit: () => void;
  score: number | null;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 overflow-auto max-h-full">
        {score === null ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Questionnaire</h2>
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.question} className="border rounded-md p-4">
                  <p className="mb-2 text-lg">{q.question}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => onAnswer(q.question, true)}
                      className={`flex-1 py-2 rounded-md border transition ${
                        answers[q.question] === true
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => onAnswer(q.question, false)}
                      className={`flex-1 py-2 rounded-md border transition ${
                        answers[q.question] === false
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onSubmit}
              className="mt-6 w-full py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Your Score</h2>
            <p className="text-5xl font-extrabold text-center mb-6">
              {score.toFixed(2)}%
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [filteredTrials, setFilteredTrials] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/postings");
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error ${response.status}: ${text}`);
        }
        const trials = await response.json();
        setFilteredTrials(trials);
      } catch (error) {
        console.error("Failed to fetch trials:", error);
      }
    };

    fetchTrials();
  }, []);

  // Called when the user clicks "Apply" on a trial.
  const handleClick = async (id: string, description: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement: description,
        }),
      });
      const result = await response.json();
      setQuestions(result);

      const applyResponse = await fetch(
        `http://localhost:8085/api/applications/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            volunteerId: "67fba32197c1063f165d24a4",
            postingId: id,
          }),
        }
      );
      if (applyResponse.ok) {
        // Remove the applied posting from the filteredTrials state
        setFilteredTrials((prevTrials) =>
          prevTrials.filter((trial) => trial.id !== id)
        );
        console.log("Successfully applied and removed trial from list.");
      } else {
        console.error("Failed to apply:", await applyResponse.text());
      }
      
      console.log("Apply result:", applyResponse.text);
    } catch (err) {
      console.error("Error posting to API:", err);
    }
  };

  // Update the user's answer for a given question.
  const handleAnswer = (question: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  // Calculate the score based on the selected answers.
  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    questions.forEach((q: { question: string; weight: number }) => {
      maxScore += q.weight;
      if (answers[q.question]) {
        totalScore += q.weight;
      }
    });
    setScore(maxScore ? (totalScore / maxScore) * 100 : 0);
  };

  // Reset the questionnaire modal state.
  const resetModal = () => {
    setQuestions([]);
    setAnswers({});
    setScore(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100">
        <Head>
          <title>UMD TerpTrials | Available Trials</title>
          <meta
            name="description"
            content="Browse available clinical trials at the University of Maryland."
          />
        </Head>

        <nav className="bg-red-600 shadow-lg border-b-4 border-black sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/HomePage" className="text-2xl font-bold text-white">
                  UMD TerpTrials
                </a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="/HomePage"
                  className="text-lg text-white hover:text-yellow-300 transition"
                >
                  Home
                </a>
                <a className="text-lg text-white hover:text-yellow-300 transition">
                  Profile
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-black">
              Available Clinical Trials
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Browse and participate in trials that match your interests and
              eligibility.
            </p>
          </header>

          {filteredTrials.length === 0 ? (
            <p className="text-gray-600 text-lg">Loading trials...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrials.map((trial) => (
                <div
                  key={trial.id}
                  className="bg-white p-6 rounded-lg shadow-lg border-2 border-black"
                >
                  <h2 className="text-2xl font-semibold text-black">
                    {trial.title}
                  </h2>
                  <p className="text-lg text-gray-500">
                    <strong>Date Posted:</strong> {trial.startDate}
                  </p>
                  <p className="text-lg text-gray-700 mt-2">
                    <strong>Requirements:</strong> {trial.postDescription}
                  </p>
                  <p className="text-lg text-green-600 mt-2">
                    <strong>Compensation:</strong> ${trial.paidOrUnpaid}
                  </p>
                  <p className="text-lg text-gray-500">
                    <strong>Start Date:</strong> {trial.startDate}
                  </p>
                  <p className="text-lg text-gray-500">
                    <strong>End Date:</strong> {trial.endDate}
                  </p>
                  <p className="text-lg text-gray-500">
                    <strong>Eligibility:</strong> {trial.ageRange}
                  </p>
                  <p className="text-lg text-gray-500">
                    <strong>ID:</strong> {trial.id}
                  </p>

                  <button
                    onClick={() => handleClick(trial.id, trial.postDescription)}
                    className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition border-2 border-black text-lg"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />

        {/* Modal for the questionnaire */}
        {questions.length > 0 && (
          <QuestionnaireModal
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={calculateScore}
            score={score}
            onClose={resetModal}
          />
        )}
      </div>
    </>
  );
}
