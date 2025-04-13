"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function NewResearcher() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [lastName, setLastName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await fetch("http://localhost:8085/api/auth/register/research-firm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          password,
          firmName,
          confirmPassword,
          name,
          lastName,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Server error");
      }

      const data = await response.json();
      localStorage.setItem("userId", data.id); // Store user ID in localStorage
      localStorage.setItem("userType", "researcher"); // Store user type
      router.push("/HomePageTrialRunner"); // Redirect to Researcher Homepage
    } catch (err: any) {
      setError(err.message || "Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, ""); // Remove all non-digits
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    const [, area, prefix, line] = match;
    if (prefix) {
      return `(${area}) ${prefix}${line ? `-${line}` : ""}`;
    }
    if (area) {
      return `(${area}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = formatPhone(e.target.value);

    setPhoneNumber(formatted);

    if (raw.length < 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const isValidEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "" || isValidEmail(value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 flex flex-col">
      <Head>
        <title>TerpTrial | Researcher Registration</title>
        <meta name="description" content="Sign up to recruit volunteers for clinical trials" />
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
            Researcher Profile Registration
          </h2>
          <p className="mt-4 text-center text-xl text-gray-700">
            Join TerpTrial and start recruiting volunteers at no cost
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border-8 border-black">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                  <p className="text-lg text-red-700">{error}</p>
                </div>
              )}

              {/* First Name */}
              <div className="border-2 border-black p-4 rounded-lg">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
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

              {/* Firm Name */}
              <div className="border-2 border-black p-4 rounded-lg">
                <label htmlFor="firmName" className="block text-lg font-medium text-gray-700">
                  Firm Name
                </label>
                <input
                  id="firmName"
                  name="firmName"
                  type="text"
                  required
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
                  placeholder="Enter your firm name"
                />
              </div>

              {/* Email */}
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
                  onChange={handleEmailChange}
                  className={`mt-2 block w-full px-5 py-3 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg`}
                  placeholder="youremail@example.com"
                />
                {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
              </div>

              {/* Phone Number */}
              <div className="border-2 border-black p-4 rounded-lg">
                <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`mt-2 block w-full px-5 py-3 border ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg`}
                  placeholder="(123) 456-7890"
                />
                {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
              </div>

              {/* Password */}
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
                  placeholder="••••••••"
                />
              </div>

              {/* Confirm Password */}
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
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <div className="border-2 border-black p-4 rounded-lg">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
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