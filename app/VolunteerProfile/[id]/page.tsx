"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

export default function VolunteerProfile({ params }: { params: { id: string } }) {
  const [volunteer, setVolunteer] = useState<null | {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    weight: number;
    height: number;
    dob: string;
    gender: string;
    department: string;
    interests: string[];
    completedTrials: { id: number; title: string; date: string }[];
  }>(null);

  const router = useRouter();

  useEffect(() => {
    // Mock data for demonstration (replace with API call)
    const mockData = [
      {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        age: 22,
        weight: 70,
        height: 175,
        dob: "2003-05-15",
        gender: "Male",
        department: "Computer Science",
        interests: ["Sleep Studies", "Nutrition", "Mental Health"],
        completedTrials: [
          { id: 1, title: "Sleep Study for College Students", date: "2025-04-15" },
          { id: 2, title: "Nutrition and Fitness Study", date: "2025-05-20" },
        ],
      },
      {
        id: "456",
        firstName: "Jane",
        lastName: "Smith",
        email: "janesmith@example.com",
        age: 25,
        weight: 65,
        height: 160,
        dob: "1998-03-10",
        gender: "Female",
        department: "Biology",
        interests: ["Mental Health", "Fitness"],
        completedTrials: [{ id: 3, title: "Mental Health Study", date: "2025-06-10" }],
      },
    ];

    const volunteerData = mockData.find((v) => v.id === params.id);
    if (!volunteerData) {
      router.push("/404");
    } else {
      setVolunteer(volunteerData);
    }
  }, [params.id, router]);

  if (!volunteer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      {/* Header Component */}
      <Header />

      <main className="flex-grow py-12 px-6 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-xl border-4 border-black">
          {/* Volunteer Information */}
          <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-left">
            {volunteer.firstName} {volunteer.lastName}'s Profile
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-black">{volunteer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-semibold text-black">{volunteer.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Weight</p>
              <p className="text-lg font-semibold text-black">{volunteer.weight} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Height</p>
              <p className="text-lg font-semibold text-black">{volunteer.height} cm</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-lg font-semibold text-black">{volunteer.dob}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-lg font-semibold text-black">{volunteer.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Department</p>
              <p className="text-lg font-semibold text-black">{volunteer.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Interests</p>
              <p className="text-lg font-semibold text-black">{volunteer.interests.join(", ")}</p>
            </div>
          </div>

          {/* Completed Trials */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-red-600 mb-6 text-left">Completed Trials</h2>
            {volunteer.completedTrials.length > 0 ? (
              <ul className="space-y-6">
                {volunteer.completedTrials.map((trial) => (
                  <li
                    key={trial.id}
                    className="bg-red-50 p-6 rounded-lg border-2 border-black shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-red-50"
                  >
                    <h3 className="text-xl font-bold text-black">{trial.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">Completed on: {trial.date}</p>
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