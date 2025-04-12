"use client";
import React, { useState } from "react";
import Head from "next/head";

export default function HomePagePoster() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [compensation, setCompensation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!title || !description || !eligibility || !compensation || !startDate || !endDate) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      // Replace with actual logic to post the advertisement
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Clinical trial advertisement posted successfully!");
    } catch (err) {
      setError("Failed to post the advertisement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>TerpTrial | Post Clinical Trial</title>
        <meta name="description" content="Post advertisements for clinical trials" />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Post a Clinical Trial
        </h2>
        <p className="mt-2 text-center text-sm text-black">
          Share details about your clinical trial to recruit participants.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black">
                Trial Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the trial title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-black">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Provide a detailed description of the trial"
                rows={4}
              ></textarea>
            </div>

            <div>
              <label htmlFor="eligibility" className="block text-sm font-medium text-black">
                Eligibility Criteria
              </label>
              <textarea
                id="eligibility"
                name="eligibility"
                required
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="List the eligibility criteria for participants"
                rows={3}
              ></textarea>
            </div>

            <div>
              <label htmlFor="compensation" className="block text-sm font-medium text-black">
                Compensation
              </label>
              <input
                id="compensation"
                name="compensation"
                type="text"
                required
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the compensation amount or details"
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-black">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-black">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Posting..." : "Post Advertisement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}