"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HomePageTrialRunner() {
  const [studies, setStudies] = useState([
    {
      id: 1,
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
          message: "Excited to participate in this study!",
        },
        {
          id: "456",
          name: "Jane Smith",
          age: 25,
          email: "janesmith@example.com",
          message: "Looking forward to contributing to this research.",
        },
      ],
    },
    {
      id: 2,
      title: "Diet and Nutrition Study",
      description: "A study to analyze the impact of diet on overall health and fitness.",
      startDate: "2025-05-01",
      endDate: "2025-07-15",
      compensation: "$300",
      participants: [
        {
          id: "789",
          name: "Alex Johnson",
          age: 30,
          email: "alexjohnson@example.com",
          message: "I have a keen interest in nutrition and health.",
        },
      ],
    },
  ]); // Default mock data for testing

  const [isLoading, setIsLoading] = useState(false); // Set to false since we are using mock data
  const [error, setError] = useState(null); // No error initially

  // Fetch studies from the API (disabled for now since we are using mock data)
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/studies"); // Replace with your API endpoint
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error ${response.status}: ${text}`);
        }

        const studies = await response.json();
        setStudies(studies); // Store the fetched studies in state
      } catch (error) {
        console.error("Failed to fetch studies:", error);
        
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    // Uncomment the following line to enable API fetching
    // fetchStudies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100">
      <Head>
        <title>TerpTrial | Trial Dashboard</title>
        <meta name="description" content="Manage your clinical trials and participants" />
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
              <Link href="/HomePage" className="text-lg text-white hover:text-yellow-300 transition">
                View Trials
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Component */}
      <Header />

      {/* Studies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-xl shadow-xl border-4 border-black">
          <h2 className="text-5xl font-bold text-red-600 mb-6 text-center">Your Studies</h2>
          {isLoading ? (
            <p className="text-lg text-gray-700 text-center">Loading studies...</p>
          ) : error ? (
            <p className="text-lg text-red-600 text-center">{error}</p>
          ) : studies.length > 0 ? (
            <div className="space-y-12">
              {studies.map((study) => (
                <div key={study.id} className="bg-red-50 p-6 rounded-lg border-2 border-black shadow-md">
                  <h3 className="text-3xl font-bold text-black mb-4">{study.title}</h3>
                  <p className="text-lg text-gray-700 mb-4">{study.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <p className="text-xl font-medium text-gray-500">Start Date</p>
                      <p className="text-xl font-semibold text-black">{study.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xl font-medium text-gray-500">End Date</p>
                      <p className="text-xl font-semibold text-black">{study.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xl font-medium text-gray-500">Compensation</p>
                      <p className="text-xl font-semibold text-green-600">{study.compensation}</p>
                    </div>
                    <div>
                      <p className="text-xl font-medium text-gray-500">Participants</p>
                      <p className="text-xl font-semibold text-black">{study.participants.length}</p>
                    </div>
                  </div>

                  {/* Participants Section */}
                  <div className="mt-6">
                    <h4 className="text-2xl font-bold text-red-600 mb-4">Participants</h4>
                    {study.participants.length > 0 ? (
                      <ul className="space-y-4">
                        {study.participants.map((participant) => (
                          <li
                            key={participant.id}
                            className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm"
                          >
                            <h5 className="text-lg font-bold text-black">{participant.name}</h5>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Age:</span> {participant.age}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Email:</span> {participant.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Message:</span>{" "}
                              {participant.message || "No message provided."}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg text-gray-700">No participants have completed their application yet.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-700 text-center">No studies found.</p>
          )}
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}