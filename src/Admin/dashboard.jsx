import React, { useState } from 'react';
import { saveToken,removeToken } from '../auth/Auth';

const Dashboard = () => {
  const [data] = useState([
    {
      id: 1,
      name: 'Ken sumanting',
      email: 'ken@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'rowel tabiolo',
      email: 'rowel@example.com',
      role: 'User',
      status: 'Inactive',
    },
  ]);

  const headers = ['ID', 'Name', 'Email', 'Role', 'Status'];

const handleLogout = () => {
 removeToken();
  window.location.href = '/'; // force redirect to login
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-black p-6 transition-all duration-700 ease-in-out relative">

      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-wide">
      Dashboard 
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white transition-transform duration-500 hover:scale-[1.01]">
        <div className="min-w-[320px] grid grid-cols-5 gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-t-xl font-bold text-center text-sm uppercase tracking-wide">
          {headers.map((header, index) => (
            <div key={index} className="transition-opacity duration-300">
              {header}
            </div>
          ))}
        </div>

 
        {data.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-1 text-center text-sm p-4 border-t border-gray-200 bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out"
          >
            <div className="break-words">{item.id}</div>
            <div className="break-words">{item.name}</div>
            <div className="break-words">{item.email}</div>
            <div className="break-words">{item.role}</div>
            <div className="break-words">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                } transition-all duration-300`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
