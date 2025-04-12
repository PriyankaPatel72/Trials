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
    // Fetch volunteer data based on the ID from the slug
    const fetchVolunteerData = async () => {
      try {
        // Replace this with an actual API call or database query
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
          router.push("/404"); // Redirect to a 404 page if the volunteer is not found
        } else {
          setVolunteer(volunteerData);
        }
      } catch (error) {
        console.error("Failed to fetch volunteer data:", error);
      }
    };

    fetchVolunteerData();
  }, [params.id, router]);

  if (!volunteer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
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