"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function NewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isVolunteer = true;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/auth/register/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          weight,
          height,
          interests,
          departmentName,
          password,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Server error");
      }

      const data = await response.json();
      localStorage.setItem("userId", data.id); // Store user ID in localStorage
      localStorage.setItem("userType", "volunteer"); // Store user type
      router.push("/HomePage"); // Redirect to Volunteer Homepage
    } catch (err: any) {
      setError(err.message || "Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      <Head>
        <title>TerpTrial | Create Account</title>
        <meta name="description" content="Sign up to participate in clinical trials" />
      </Head>

      {/* Red Bar at the Top */}
      <div className="w-full h-4 bg-red-600"></div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="flex justify-center">
            <svg
              className="w-20 h-20 text-red-600"
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
          <h2 className="mt-6 text-center text-5xl font-extrabold text-red-600">
            Volunteer Profile Registration
          </h2>
          <p className="mt-4 text-center text-xl text-gray-700">
            Join TerpTrial and start earning while contributing to research
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border-6 border-black">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  <p className="text-lg text-red-700">{error}</p>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-8">
                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="departmentName" className="block text-lg font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    id="departmentName"
                    name="departmentName"
                    type="text"
                    required
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your department"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="dateOfBirth" className="block text-lg font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="weight" className="block text-lg font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your weight"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="height" className="block text-lg font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your height"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="gender" className="block text-lg font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your gender"
                  />
                </div>

                <div className="border-2 border-black p-4 rounded-lg">
                  <label htmlFor="interests" className="block text-lg font-medium text-gray-700">
                    Interests
                  </label>
                  <input
                    id="interests"
                    name="interests"
                    type="text"
                    required
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                    placeholder="Enter your interests"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-2 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}