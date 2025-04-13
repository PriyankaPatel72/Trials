"use client";

import { useRouter } from "next/navigation";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function NavigationPage({ userName }: { userName?: string | null }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-yellow-100">
      {/* Header */}
      <header className="bg-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold">
            Welcome to UMD TerpTrials{userName ? `, ${userName}!` : "!"}
          </h1>
          <p className="mt-4 text-xl">
            Earn money while contributing to groundbreaking medical research. Browse trials that match your interests and eligibility.
          </p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-[80%]">
          {/* Volunteer Card */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-red-600 flex items-center justify-center text-6xl text-white shadow-lg">
              🎓 {/* UMD-themed icon for Volunteer */}
            </div>
            <button
              onClick={() => router.push("/NewUser")}
              className="w-full bg-red-600 text-white py-4 px-8 text-2xl rounded-2xl hover:bg-red-700 transition border-4 border-black shadow-md"
            >
              I am a Volunteer
            </button>
          </div>

          {/* Researcher Card */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-yellow-500 flex items-center justify-center text-6xl text-white shadow-lg">
              🧪 {/* UMD-themed icon for Researcher */}
            </div>
            <button
              onClick={() => router.push("/NewResearcher")}
              className="w-full bg-yellow-500 text-white py-4 px-8 text-2xl rounded-2xl hover:bg-yellow-600 transition border-4 border-black shadow-md"
            >
              I am a Researcher
            </button>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
