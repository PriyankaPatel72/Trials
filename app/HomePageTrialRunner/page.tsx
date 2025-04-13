"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HomePageTrialRunner() {
  // Mock data for the trial and participants
  const trial = {
    title: "Sleep Study for College Students",
    description: "A clinical trial to study the effects of sleep patterns on academic performance.",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    compensation: "$500",
    participants: [
      {
        id: "123",
        name: "John Doe",
        age: 22,
        email: "johndoe@example.com",
        completed: true,
        message:
          "I am a college student interested in sleep studies and how they impact academic performance. I have participated in similar studies before and am eager to contribute further.  he hello wasappp i am so tiredddd",
      },
      {
        id: "456",
        name: "Jane Smith",
        age: 25,
        email: "janesmith@example.com",
        completed: true,
        message:
          "I have a passion for research and want to contribute to studies on mental health and sleep. I believe my background in biology will be helpful for this study.",
      },
      {
        id: "789",
        name: "Alex Johnson",
        age: 23,
        email: "alexjohnson@example.com",
        completed: false,
        message: "",
      },
    ],
  };

  // Filter participants to only include those who completed their application
  const completedParticipants = trial.participants.filter((participant) => participant.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100">
      <Head>
        <title>TerpTrial | Trial Dashboard</title>
        <meta name="description" content="Manage your clinical trial and participants" />
      </Head>

      {/* Sticky Navigation Bar */}
      <nav className="bg-red-600 shadow-lg border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/HomePageTrialRunner" className="text-2xl font-bold text-white">
                TerpTrials
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/TrialDataForm" className="text-lg text-white hover:text-yellow-300 transition">
                Post a Trial
              </Link>
              <Link href="/HomePageTrialRunner" className="text-lg text-white hover:text-yellow-300 transition">
                Manage Participants
              </Link>
              <Link href="/HomePage" className="text-lg text-white hover:text-yellow-300 transition">
                View Trials
              </Link>
              <Link href="/NewUser" className="text-lg text-white hover:text-yellow-300 transition">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Component */}
      <Header />

      {/* Trial Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-black">
          <h1 className="text-5xl font-extrabold text-red-600 mb-4 text-left">{trial.title}</h1>
          <p className="text-lg text-gray-700 mb-8 text-left">{trial.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xl font-medium text-gray-500">Start Date</p>
              <p className="text-xl font-semibold text-black">{trial.startDate}</p>
            </div>
            <div>
              <p className="text-xl font-medium text-gray-500">End Date</p>
              <p className="text-xl font-semibold text-black">{trial.endDate}</p>
            </div>
            <div>
              <p className="text-xl font-medium text-gray-500">Compensation</p>
              <p className="text-xl font-semibold text-green-600">{trial.compensation}</p>
            </div>
            <div>
              <p className="text-xl font-medium text-gray-500">Participants</p>
              <p className="text-xl font-semibold text-black">{completedParticipants.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Participants Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-black">
          <h2 className="text-5xl font-bold text-red-600 mb-6 text-center">Volunteers</h2>
          {completedParticipants.length > 0 ? (
            <ul className="space-y-6">
              {completedParticipants.map((participant) => (
                <li
                  key={participant.id}
                  className="bg-red-50 p-6 rounded-lg border-2 border-black shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-2xl font-bold text-black">
                    <Link
                      href={`/VolunteerProfile/${participant.id}`}
                      className="text-red-600 hover:text-gray-700 hover:underline transition-colors duration-200"
                    >
                      {participant.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium text-gray-800">Age:</span> {participant.age}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Email:</span> {participant.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium text-gray-800">Message:</span>{" "}
                    {participant.message || "No message provided."}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700 text-center">No participants have completed their application yet.</p>
          )}
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}