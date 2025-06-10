'use client';
import React from 'react';

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Live Order Sheet</h1>
      <p className="mb-6 text-gray-600 text-center max-w-lg">
        Click below to open and edit the Google Sheet that tracks orders and inventory for ArchStudio.
      </p>
      <a
        href="https://docs.google.com/spreadsheets/d/1xw9LUJsM5WWOWQNOXOX4lD8voO9ayypYthALIXo6kUk/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Open Editable Sheet
      </a>
    </div>
  );
}
