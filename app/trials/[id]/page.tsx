"use client";

// this page should add a blurb to the page about what the study is about and what the user can expect to do in the study.
// it should also have a button to apply for the study and a button to go back to the home page
// it should go deeper into qualifications on what the user needs (something a p tag can do).
// it should also have a button to go back to the home page and a button to apply for the study.
// I'll submit an application meaning your info was sent to the study and allow you to have a 200 char blurb about yourself.

import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

export default function TrialPage({ params }: { params: Promise<{ id: string }> }) {
  const [trial, setTrial] = useState(null);
  const [trialId, setTrialId] = useState<string | null>(null);

  // Mock data (replace with actual API call or database query)
  const mockTrials = [
    {
      id: 1,
      title: "Sleep Study for College Students",
      description: "Study the effects of sleep patterns on academic performance.",
      compensation: 500,
      startDate: "2025-04-01",
      eligibility: "Ages 18-25, enrolled in college",
    },
    {
      id: 2,
      title: "Nutrition and Fitness Study",
      description: "Analyze the impact of diet and exercise on health.",
      compensation: 300,
      startDate: "2025-05-01",
      eligibility: "Ages 20-30, no chronic illnesses",
    },
    {
      id: 3,
      title: "Mental Health and Stress Study",
      description: "Explore the relationship between stress and mental health.",
      compensation: 400,
      startDate: "2025-06-01",
      eligibility: "Ages 18-40, no medication use",
    },
  ];

  useEffect(() => {
    // Unwrap the params Promise and set the trial ID
    params.then((resolvedParams) => {
      setTrialId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (trialId) {
      // Find the trial by ID
      const foundTrial = mockTrials.find((t) => t.id === parseInt(trialId));
      setTrial(foundTrial);
    }
  }, [trialId]);

  if (!trial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-yellow-100">
      {/* Header Component */}
      <Header />

      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-black">
          <h1 className="text-4xl font-bold text-black">{trial.title}</h1>
          <p className="text-lg text-gray-700 mt-4">{trial.description}</p>
          <p className="text-lg text-green-600 mt-4">
            <strong>Compensation:</strong> ${trial.compensation}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            <strong>Start Date:</strong> {trial.startDate}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            <strong>Eligibility:</strong> {trial.eligibility}
          </p>
          <p className="text-lg text-gray-700 mt-4">
            <strong>What to Expect:</strong> Participants will be required to attend weekly sessions and complete surveys about their experiences.
          </p>
          <textarea
            placeholder="Write a 200-character blurb about yourself..."
            maxLength={200}
            className="mt-4 w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => alert("Application submitted!")}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition border-2 border-black text-lg"
            >
              Submit Application
            </button>
            <button
              onClick={() => (window.location.href = "/HomePage")}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition border-2 border-black text-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}