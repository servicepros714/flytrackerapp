import React, { useState, useEffect, useRef } from 'react';
import { removeToken } from '../auth/Auth';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const popupStyle = `
    @keyframes fadeZoomIn {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeZoomOut {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.95); }
    }
    .fade-zoom-in {
      animation: fadeZoomIn 0.3s ease-out;
    }
    .fade-zoom-out {
      animation: fadeZoomOut 0.3s ease-in;
    }
  `;

  if (typeof document !== 'undefined') {
    const styleTag = document.getElementById('fadeZoomStyle') || document.createElement('style');
    styleTag.id = 'fadeZoomStyle';
    styleTag.innerHTML = popupStyle;
    document.head.appendChild(styleTag);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          'https://api.airtable.com/v0/appUbFQNnqLyAE91b/tbldM9CuFapFApSCe',
          {
            headers: {
              Authorization:
                'Bearer patOqbvQBRYKN0N9t.ad5d76ed48b85d7a6ba0d090b6e3cfbe27df9e12d40d7cbcc0995c9b3d51a86b',
            },
          }
        );
        const result = await response.json();
        setUserData(result.records || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    removeToken();
    window.location.href = '/';
  };

  const headers = ['Email', 'User Type', 'Lat', 'Long',  'Image', 'Date Created'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
        setTimeout(() => setModalImage(null), 300);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        setTimeout(() => setModalImage(null), 300);
      }
    };

    if (modalImage) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-black p-6 relative">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
      <br/>

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-wide">
        Dashboard
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white transition-transform duration-500 hover:scale-[1.01]">
        <div className="min-w-[320px] grid grid-cols-6 gap-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-t-xl font-bold text-center text-sm uppercase tracking-wide">
          {headers.map((header, index) => (
            <div key={index}>{header}</div>
          ))}
        </div>

        {userData.map((record) => {
          const fields = record.fields;
          const id = record.id;
          const email = fields.UserName?.[0] || 'N/A';
          const type = fields.Type || 'N/A';
          const lat = fields.Lat || 'N/A';
          const long = fields.Long || 'N/A';
          const dateCreated = fields['Date Created']
            ? new Date(fields['Date Created']).toLocaleString()
            : 'N/A';
          const imageUrl = fields.Image?.[0]?.thumbnails?.small?.url;
          const fullImageUrl = fields.Image?.[0]?.url;

          return (
            <div
              key={id}
              className="grid grid-cols-6 gap-1 text-center text-sm p-4 border-t border-gray-200 bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              <div className="break-words">{email}</div>
              <div className="break-words">{type}</div>
              <div className="break-words">{lat}</div>
              <div className="break-words">{long}</div>
              {/* <div className="break-words">{dateCreated}</div> */}
              <div className="flex justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="thumb"
                    className="w-10 h-10 object-cover rounded-md shadow cursor-pointer"
                    onClick={() => {
                      setModalImage(fullImageUrl);
                      setShowModal(true);
                    }}
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
                 <div className="break-words">{dateCreated}</div>
            </div>
          );
        })}
      </div>

      {modalImage && (
        <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center">
          <div
            ref={modalRef}
            className={`max-w-3xl w-full p-4 ${
              showModal ? 'fade-zoom-in' : 'fade-zoom-out'
            }`}
          >
            <img
              src={modalImage}
              alt="Zoomed"
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border-4 border-white transition duration-300 ease-in-out"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
