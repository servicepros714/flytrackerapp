import React, { useState, useRef } from 'react';
import axios from 'axios';
import { CiCamera, CiCircleCheck } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";

const FlyerTrackerApp = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const getLocation = () => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => setError(err.message)
    );
  };

  const [selected, setSelected] = useState('Flyers');
  const options = [
        { value: 'Flyers', label: 'Flyers' },
        { value: 'Flyers', label: 'Signs' },
  ];
  
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [captureTime, setCaptureTime] = useState(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setCaptureTime(new Date()); // Set capture time
      getLocation();
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-gray-50">
      <h1 className="text-5xl font-semibold text-blue-950 mb-4">
        Welcome to Flyer Tracker App
      </h1>

     {/* <div className="flex gap-4 mt-5 mb-7">
      {options.map(({ value, label }) => {
        const isActive = selected === value;

        return (
          <button
            key={value}
            onClick={() => setSelected(value)}
            type="button"
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md border 
              transition-colors duration-200
              ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}
              border-blue-200 cursor-pointer 
            `}
          >
            {isActive && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            <span className="font-medium">{label}</span>
          </button>
        );
      })}
    </div> */}
     <div className="flex gap-6 items-center mb-8">
      {/* Flyers Button */}
      <button
        onClick={() => setSelected('Flyers')}
        className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-150 ${
          selected === 'Flyers'
            ? 'bg-blue-600 text-white'
            : 'bg-transparent text-blue-900 border border-blue-600'
        }`}
      >
        {selected === 'Flyers' ? (
          <CiCircleCheck size={20} /> // Filled circle when active
        ) : (
          <FaRegCircle size={20} /> // Empty circle when inactive
        )}
        Flyers
      </button>

      {/* Signs Button */}
      <button
        onClick={() => setSelected('Signs')}
        className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-150 ${
          selected === 'Signs'
            ? 'bg-blue-600 text-white'
            : 'bg-transparent text-blue-900 border border-blue-600'
        }`}
      >
        {selected === 'Signs' ? (
          <CiCircleCheck size={20} /> // Filled circle when active
        ) : (
          <FaRegCircle size={20} /> // Empty circle when inactive
        )}
        Signs
      </button>
    </div>

      
      <div className="w-64 h-48 border mt-5 mb-10 border-blue-950 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:shadow-md transition"
        onClick={handleBoxClick}
      >
        <CiCamera className="text-blue-400 text-6xl mb-2" />
        <p className="text-blue-950 font-semibold text-lg">Click here to capture!</p>
      </div>

       {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    
      {imageUrl && (
      <div className="mt-10 w-full bg-indigo-100 p-8 rounded-xl shadow-md flex flex-col items-center">
        <p className="text-lg text-blue-900 font-medium mb-4 text-center">
          Congratulations, you've captured <span className="font-bold text-blue-700">1</span> {selected.toLowerCase()} today.<br />
          You can do it, capture more on flyer-tracker.
        </p>

        <img
          src={imageUrl}
          alt="Captured"
          className="rounded-lg mb-6 max-w-md"
        />

        <p className="text-md text-blue-900 mb-1">
          Last Capture: <span className="text-blue-700 font-medium">{formatDateTime(captureTime)}</span>
        </p>
        <p className="text-md text-blue-900 mb-4">
          Location: <span className="text-blue-700 cursor-pointer">{latitude}, {longitude}</span>
        </p>

        <button className="bg-white text-blue-800 font-semibold py-2 px-6 rounded-md shadow hover:bg-gray-100">
          {selected}
        </button>
      </div>
    )}

      {/* <button
        onClick={getLocation}
        className="bg-blue-600 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-700"
      >
        Get Current Location
      </button> */}

{/* 
      {latitude && longitude && (
        <div className="text-left mb-4">
          <p className="text-gray-700">Latitude: {latitude}</p>
          <p className="text-gray-700">Longitude: {longitude}</p>
        </div>
      )} */}

      {error && (
        <p className="text-red-600 mb-4" style={{ color: 'red' }}>
          {error}
        </p>
      )}

    
    </div>
  );
};

export default FlyerTrackerApp;
