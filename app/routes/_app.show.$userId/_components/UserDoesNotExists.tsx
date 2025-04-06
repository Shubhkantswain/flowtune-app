import { useNavigate } from '@remix-run/react'
import React from 'react'

function UserDoesNotExists() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-semibold text-gray-400 mb-4">
                Sorry, User Not Found ☹️
            </h1>
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
                Go Back
            </button>
        </div>
    )
}

export default UserDoesNotExists