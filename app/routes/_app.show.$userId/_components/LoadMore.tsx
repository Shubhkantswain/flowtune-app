import React from 'react'

interface LoadMoreProps {
    handleLoadMore: () => void
}

function LoadMore({handleLoadMore }: LoadMoreProps) {
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleLoadMore}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
            >
                Load More
            </button>
        </div>
    )
}

export default LoadMore