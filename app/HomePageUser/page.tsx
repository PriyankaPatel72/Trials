"use client";
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Correct import for App Router

export default function UserProfile() {
  const router = useRouter();
  
  // Mock user data - replace with actual data from your auth/DB
  const user = {
    name: "Priyanka Patel",
    email: "piyu24@terpmail.umd.edu",
    university: "University of Maryland",
    major: "Computer Science",
    year: "Sofmore",
    earnings: 245.50,
    completedTrials: 3,
    upcomingTrials: 1,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>TerpTrial | My Profile</title>
        <meta name="description" content="Manage your clinical trial participation" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-indigo-600">View and manage your account</p>
          </div>
          <button 
            onClick={() => router.push('/trials')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Trials
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">University</h3>
                  <p className="text-sm text-gray-900">{user.university}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Major</h3>
                  <p className="text-sm text-gray-900">{user.major}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Year</h3>
                  <p className="text-sm text-gray-900">{user.year}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">My Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-medium text-indigo-600">${user.earnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Trials</span>
                  <span className="font-medium text-gray-900">{user.completedTrials}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming Trials</span>
                  <span className="font-medium text-gray-900">{user.upcomingTrials}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Earnings Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Earnings</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">View History</button>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-indigo-800">Available Balance</p>
                    <p className="text-2xl font-bold text-indigo-900">${user.earnings.toFixed(2)}</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                    Withdraw
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Payments are processed weekly. Minimum withdrawal amount is $20.
                </p>
              </div>
            </div>

            {/* Upcoming Trials */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Trials</h3>
              
              {user.upcomingTrials > 0 ? (
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">Sleep Study</h4>
                      <p className="text-sm text-gray-600">May 15, 2023 • 2:00 PM</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100">
                        Details
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming trials</h3>
                  <p className="mt-1 text-sm text-gray-500">Browse available trials to sign up.</p>
                  <div className="mt-6">
                    <button 
                      onClick={() => router.push('/trials')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Find Trials
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-center">
                  <span>Change Password</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-center">
                  <span>Payment Methods</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-center">
                  <span>Notification Preferences</span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="w-full text-left px-4 py-3 text-red-600 border border-gray-200 rounded-md hover:bg-red-50 flex justify-between items-center">
                  <span>Delete Account</span>
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
