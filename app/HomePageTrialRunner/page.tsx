"use client";
import React from "react";
import Head from "next/head";

export default function HomePageTrialRunner() {
  // Mock data for the trial and participants
  const trial = {
    title: "Sleep Study for College Students",
    description: "A clinical trial to study the effects of sleep patterns on academic performance.",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    compensation: "$500",
    participants: [
      { id: 1, name: "John Doe", age: 22, email: "johndoe@example.com", status: "Completed" },
      { id: 2, name: "Jane Smith", age: 21, email: "janesmith@example.com", status: "In Progress" },
      { id: 3, name: "Alex Johnson", age: 23, email: "alexjohnson@example.com", status: "Pending" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>TerpTrial | Trial Dashboard</title>
        <meta name="description" content="Manage your clinical trial and participants" />
      </Head>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">{trial.title}</h1>
          <p className="text-gray-700 mt-2">{trial.description}</p>
        </div>

        {/* Trial Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-black mb-4">Trial Details</h2>
          <div className="grid grid-cols-2 gap-4">
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
              <p className="text-black">{trial.participants.length}</p>
            </div>
          </div>
        </div>

        {/* Participant List */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-black mb-4">Participants</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trial.participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {participant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {participant.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {participant.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {participant.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}