import React from 'react'
import {IoMdHome} from "react-icons/io"

const Notfound = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-32 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
            fill="currentColor"
            className="text-gray-700"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center">
          <div className="mb-12">
            <div className="mb-8">
              <h1 className="text-9xl md:text-10xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-2">
                404
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8">
              Sorry, the page you're looking for doesn't exist. It might have been removed or the URL might be incorrect.
            </p>
            <div className="mt-8 pt-2">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <IoMdHome />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Notfound