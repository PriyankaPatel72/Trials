"use client";

import { useRouter } from "next/navigation";

export default function NavigationPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-[80%]">
        {/* Card 1 */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-6xl">
            🏠
          </div>
          <button
            onClick={() => router.push("/NewUser")}
            className="w-full bg-blue-600 text-white py-4 px-8 text-lg rounded-2xl hover:bg-blue-700 transition"
          >
            Volunteer
          </button>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-6xl">
            👤
          </div>
          <button
            onClick={() => router.push("/NewUser")}
            className="w-full bg-green-600 text-white py-4 px-8 text-lg rounded-2xl hover:bg-green-700 transition"
          >
            Researcher
          </button>
        </div>
      </div>
    </main>
  );
}
