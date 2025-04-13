"use client";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "Guest"; // Default to "Guest" if no name is provided

  return (
    <header className="bg-red-600 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Turtle Icon */}
        <div className="absolute top-4 left-4">
        </div>

        <h1 className="text-5xl font-bold">
          Welcome to UMD TerpTrials, {userName}!
        </h1>
        <p className="mt-4 text-xl">
          Earn money while contributing to groundbreaking medical research. Browse trials that match your interests and eligibility.
        </p>
      </div>
    </header>
  );
}