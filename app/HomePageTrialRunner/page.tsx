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
      { id: "123", name: "John Doe", age: 22, email: "johndoe@example.com", completed: true },
      { id: "456", name: "Jane Smith", age: 25, email: "janesmith@example.com", completed: true },
      { id: "789", name: "Alex Johnson", age: 23, email: "alexjohnson@example.com", completed: false },
    ],
  };

  // Filter participants to only include those who completed their application
  const completedParticipants = trial.participants.filter((participant) => participant.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      <Head>
        <title>TerpTrial | Trial Dashboard</title>
        <meta name="description" content="Manage your clinical trial and participants" />
      </Head>

      {/* Header Component */}
      <Header />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Trial Overview */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-4 border-black">
            <h1 className="text-4xl font-bold text-red-600">Your Trial: {trial.title}</h1>
            <p className="text-lg text-gray-700 mt-4">{trial.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Start Date</p>
                <p className="text-black">{trial.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date</p>
                <p className="text-black">{trial.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Compensation</p>
                <p className="text-black">{trial.compensation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Participants</p>
                <p className="text-black">{completedParticipants.length}</p>
              </div>
            </div>
          </div>

          {/* Participant List */}
          <div className="bg-white shadow-lg rounded-lg p-6 border-4 border-black">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Participants</h2>
            {completedParticipants.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <Link
                          href={`/VolunteerProfile/${participant.id}`}
                          className="text-red-600 hover:underline"
                        >
                          {participant.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {participant.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {participant.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-lg text-gray-700">No participants have completed their application yet.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}