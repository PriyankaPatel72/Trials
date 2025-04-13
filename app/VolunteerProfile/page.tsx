"use client";
import React from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";

export default function VolunteerProfile() {
  // Mock data for the volunteer (replace with actual data from a database or API)
  const volunteer = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    age: 22,
    weight: 70, // in kg
    height: 175, // in cm
    dob: "2003-05-15",
    gender: "Male",
    department: "Computer Science",
    interests: ["Sleep Studies", "Nutrition", "Mental Health"],
    completedTrials: [
      { id: 1, title: "Sleep Study for College Students", date: "2025-04-15" },
      { id: 2, title: "Nutrition and Fitness Study", date: "2025-05-20" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      <Head>
        <title>Volunteer Profile | TerpTrials</title>
        <meta name="description" content="View volunteer profile and trial history" />
      </Head>

      {/* Sticky Navigation Bar */}
      <nav className="bg-red-600 shadow-lg border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/HomePage" className="text-2xl font-bold text-white">
                UMD TerpTrials
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="/HomePage" className="text-lg text-white hover:text-yellow-300 transition">
                Home
              </a>
              <a
                href={
                  localStorage.getItem("userType") === "volunteer"
                    ? `/VolunteerProfile/${localStorage.getItem("userId")}`
                    : "/HomePageTrialRunner"
                }
                className="text-lg text-white hover:text-yellow-300 transition"
              >
                Profile
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Component */}
      <Header />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-4 border-black">
          {/* Volunteer Information */}
          <h1 className="text-4xl font-bold text-red-600 mb-6">
            Volunteer Profile: {volunteer.firstName} {volunteer.lastName}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-lg text-black">{volunteer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Age</p>
              <p className="text-lg text-black">{volunteer.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Weight</p>
              <p className="text-lg text-black">{volunteer.weight} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Height</p>
              <p className="text-lg text-black">{volunteer.height} cm</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Date of Birth</p>
              <p className="text-lg text-black">{volunteer.dob}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Gender</p>
              <p className="text-lg text-black">{volunteer.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Department</p>
              <p className="text-lg text-black">{volunteer.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Interests</p>
              <p className="text-lg text-black">{volunteer.interests.join(", ")}</p>
            </div>
          </div>

          {/* Completed Trials */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Completed Trials</h2>
            {volunteer.completedTrials.length > 0 ? (
              <ul className="space-y-4">
                {volunteer.completedTrials.map((trial) => (
                  <li
                    key={trial.id}
                    className="bg-red-50 p-4 rounded-lg border-2 border-black shadow-md"
                  >
                    <h3 className="text-lg font-bold text-black">{trial.title}</h3>
                    <p className="text-sm text-gray-700">Completed on: {trial.date}</p>
                    <Link href={`/VolunteerProfile/${trial.id}`} className="text-red-600 hover:underline">
                      {trial.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-700">No trials completed yet.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}