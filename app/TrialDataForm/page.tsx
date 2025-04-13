"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";

export default function TrialDataForm() {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      <Head>
        <title>TerpTrial | Post Clinical Trial</title>
        <meta name="description" content="Post advertisements for clinical trials" />
      </Head>

      {/* Sticky Navigation Bar */}
      <nav className="bg-red-600 shadow-lg border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/HomePage" className="text-2xl font-bold text-white">
                TerpTrials
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/HomePage" className="text-lg text-white hover:text-yellow-300 transition">
                Home
              </Link>
              <Link href="/TrialDataForm" className="text-lg text-white hover:text-yellow-300 transition">
                Post a Trial
              </Link>
              <Link href="/HomePageTrialRunner" className="text-lg text-white hover:text-yellow-300 transition">
                Manage Trials
              </Link>
              <Link href="/NewUser" className="text-lg text-white hover:text-yellow-300 transition">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Form Section */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border-4 border-black">
            <h2 className="text-4xl font-extrabold text-red-600 text-center mb-6">
              Post a Clinical Trial
            </h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  <p className="text-lg text-red-700">{error}</p>
                </div>
              )}

              {/* Trial Title */}
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                  Trial Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter the trial title"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Provide a detailed description of the trial"
                  rows={4}
                ></textarea>
              </div>

              {/* Eligibility Criteria */}
              <div>
                <label htmlFor="eligibility" className="block text-lg font-medium text-gray-700">
                  Eligibility Criteria
                </label>
                <textarea
                  id="eligibility"
                  name="eligibility"
                  required
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="List the eligibility criteria for participants"
                  rows={3}
                ></textarea>
              </div>

              {/* Compensation */}
              <div>
                <label htmlFor="compensation" className="block text-lg font-medium text-gray-700">
                  Compensation
                </label>
                <input
                  id="compensation"
                  name="compensation"
                  type="text"
                  required
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter the compensation amount or details"
                />
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-lg font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-lg font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Posting..." : "Post Advertisement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}