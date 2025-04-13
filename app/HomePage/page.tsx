"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Router } from "next/router";

export default function HomePage() {
  const [filteredTrials, setFilteredTrials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/postings");
        console.log("Response:", response);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error ${response.status}: ${text}`);
        }

        const trials = await response.json();
        setFilteredTrials(trials);
      } catch (error) {
        console.error("Failed to fetch trials:", error);
      }
    };

    fetchTrials();
  }, []);

  const handleClick = async (id: string) => {
    try {

      const response1 = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement: "A random description here"
        }),
      });

      const result1 = await response1.json();
      console.log("Result:", result1);

      // const response = await fetch("http://localhost:8085/api/applications/apply", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     postingId: id,
      //     //requirement : description
      //     volunteerId: "67fb161d2e166fe4df4a1368"
      //   }),
      // });
  
      // if (!response.ok) {
      //   const error = await response.text();
      //   throw new Error(`HTTP ${response.status}: ${error}`);
      // }
      
  
      // const data = await response.json();
      // console.log("Success:", data);
    } catch (err) {
      console.error("Error posting to API:", err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100">
      <Head>
        <title>UMD TerpTrials | Available Trials</title>
        <meta
          name="description"
          content="Browse available clinical trials at the University of Maryland."
        />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-red-600 shadow-md border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white">
                UMD TerpTrials
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="/HomePage" className="text-lg text-white hover:text-yellow-300">
                Home
              </a>
              <a href="/TrialDataForm" className="text-lg text-white hover:text-yellow-300">
                Post a Trial
              </a>
              <a href="/HomePageTrialRunner" className="text-lg text-white hover:text-yellow-300">
                Manage Trials
              </a>
              <a href="/NewUser" className="text-lg text-white hover:text-yellow-300">
                Profile
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Component */}
      <Header />

      {/* Available Trials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black text-center">
          <h2 className="text-6xl font-bold text-red-600">{filteredTrials.length}</h2>
          <p className="text-6xl text-gray-900 mt-4">Available Trials</p>
        </div>
      </section>

      {/* Trials List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-black">Available Clinical Trials</h1>
          <p className="text-lg text-gray-700">
            Browse and participate in trials that match your interests and eligibility.
          </p>
        </header>

        {filteredTrials.length === 0 ? (
          <p className="text-gray-600 text-lg">Loading trials...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrials.map((trial) => (
              <div
                key={trial.id}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-black"
              >
                <h2 className="text-2xl font-semibold text-black">{trial.title}</h2>
                <p className="text-lg text-gray-500">
                  <strong>Date Posted:</strong> {trial.startDate}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  <strong>Requirements:</strong> {trial.postDescription}
                </p>
                <p className="text-lg text-green-600 mt-2">
                  <strong>Compensation:</strong> ${trial.paidOrUnpaid}
                </p>
                <p className="text-lg text-gray-500">
                  <strong>Start Date:</strong> {trial.startDate}
                </p>
                <p className="text-lg text-gray-500">
                  <strong>End Date:</strong> {trial.endDate}
                </p>
                <p className="text-lg text-gray-500">
                  <strong>Eligibility:</strong> {trial.ageRange}
                </p>
                <p className="text-lg text-gray-500">
                  <strong>ID:</strong> {trial.id}
                </p>

                {/* <a
                  href={`/trials/${trial.id}`}
                  onClick={() => handleClick(trial.description)}
                  className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition border-2 border-black text-lg"
                >
                  Apply
                </a> */}
                  <button key={trial.description}
          
                  onClick={ () => {
                    console.log("Button clicked for trial:", trial.postDescription);
                    // await handleClick(trial.description);
                    handleClick(trial.id);
                
                    // router.push(`/NewUser`);
                  }}
                  className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition border-2 border-black text-lg"
                  >
                  Apply
                  </button>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import Head from "next/head";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import { useRouter } from "next/navigation";
// import { get } from "http";

// export default function HomePage() {
  
//   const getInfo = async () => {
//   const response = await fetch("http://localhost:8085/api/postings");

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(`Error ${response.status}: ${text}`);
//   }

//   const mockTrials = await response.json();
//   console.log("Postings:", mockTrials);
//   return mockTrials;
//   };


  
  

//   // const mockTrials = [
//   //   {
//   //     id: 1,
//   //     title: "Sleep Study for College Students",
//   //     description: "Study the effects of sleep patterns on academic performance.",
//   //     compensation: 500,
//   //     startDate: "2025-04-01",
//   //     eligibility: "Ages 18-25, enrolled in college",
//   //     minAge: 18,
//   //     maxAge: 25,
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Nutrition and Fitness Study",
//   //     description: "Analyze the impact of diet and exercise on health.",
//   //     compensation: 300,
//   //     startDate: "2025-05-01",
//   //     eligibility: "Ages 20-30, no chronic illnesses",
//   //     minAge: 20,
//   //     maxAge: 30,
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Mental Health and Stress Study",
//   //     description: "Explore the relationship between stress and mental health.",
//   //     compensation: 400,
//   //     startDate: "2025-06-01",
//   //     eligibility: "Ages 18-40, no medication use",
//   //     minAge: 18,
//   //     maxAge: 40,
//   //   },
//   // ];


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100">
//       <Head>
//         <title>UMD TerpTrials | Available Trials</title>
//         <meta name="description" content="Browse available clinical trials at the University of Maryland." />
//       </Head>

//       {/* Navigation Bar */}
//       <nav className="bg-red-600 shadow-md border-b-4 border-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <a href="/" className="text-2xl font-bold text-white">
//                 UMD TerpTrials
//               </a>
//             </div>
//             <div className="flex space-x-4">
//               <a href="/HomePage" className="text-lg text-white hover:text-yellow-300">
//                 Home
//               </a>
//               <a href="/TrialDataForm" className="text-lg text-white hover:text-yellow-300">
//                 Post a Trial
//               </a>
//               <a href="/HomePageTrialRunner" className="text-lg text-white hover:text-yellow-300">
//                 Manage Trials
//               </a>
//               <a href="/NewUser" className="text-lg text-white hover:text-yellow-300">
//                 Profile
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Header Component */}
//       <Header />

//       {/* Available Trials Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black text-center">
//           <h2 className="text-6xl font-bold text-red-600">{mockTrials.length}</h2>
//           <p className="text-6xl text-gray-900 mt-4">Available Trials</p>
//         </div>
//       </section>

//       {/* Trials List */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <header className="mb-6">
//           <h1 className="text-4xl font-bold text-black">Available Clinical Trials</h1>
//           <p className="text-lg text-gray-700">Browse and participate in trials that match your interests and eligibility.</p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTrials.map((trial) => (
//             <div
//               key={trial.id}
//               className="bg-white p-6 rounded-lg shadow-lg border-2 border-black"
//             >
//               <h2 className="text-2xl font-semibold text-black">{trial.title}</h2>
//               <p className="text-lg text-gray-500">
//                 <strong>Date Posted:</strong> {trial.postedDate}
//               </p>
//               <p className="text-lg text-gray-700 mt-2">{trial.description}</p>
//               <p className="text-lg text-green-600 mt-2">
//                 <strong>Compensation:</strong> ${trial.paidOrUnpaid}
//               </p>
//               <p className="text-lg text-gray-500">
//                 <strong>Start Date:</strong> {trial.startDate}
//               </p>
//               <p className="text-lg text-gray-500">
//                 <strong>Eligibility:</strong> {trial.ageRange}
//               </p>
//               <a
//                 href={`/trials/${trial.id}`}
//                 className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition border-2 border-black text-lg"
//               >
//                 Apply
//               </a>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer Component */}
//       <Footer />
//     </div>
//   );
// }