import { useNavigate } from '@remix-run/react'
import React, { RefObject } from 'react'
import { useActiveTabStore } from '~/store/useActiveTabStore'
import { useSearchHistoryStore } from '~/store/useSearchHistoryStore'

interface ShowHistoryDropdownProps {
    showHistory: boolean;
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
    historyRef: RefObject<HTMLDivElement>; // or whatever element you're referencing
}

const ShowHistoryDropdown: React.FC<ShowHistoryDropdownProps> = ({ showHistory, setShowHistory, historyRef }) => {
    const navigate = useNavigate()

    const { history, setHistory } = useSearchHistoryStore()
    const { activeTab } = useActiveTabStore()

    if (!showHistory) {
        return null
    }

    return (
        <div
            ref={historyRef}
            className="hidden md:flex absolute z-50 mt-1 w-80 bg-gradient-to-b from-neutral-950 to-neutral-900 border  border-[#2E3030] rounded-lg shadow-xl overflow-hidden"
            style={{
                top: '100%',
                right: '1.5rem',
            }}
        >
            <div className="py-2 w-full">
                <h3 className="px-4 py-1 text-sm font-medium text-gray-400 border-b border-[#2E3030]">Search History</h3>
                {history.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto">
                        {history.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center px-4 py-2.5 hover:bg-[#1E1E1E] cursor-pointer text-gray-200 group"
                                onClick={() => {
                                    const currentData = item
                                    const data = history.filter((item) => item != currentData)
                                    setHistory([currentData, ...data])
                                    localStorage.setItem("searchHistory", JSON.stringify([currentData, ...data]))
                                    navigate(`/search-results/${activeTab.toLowerCase()}/${item}`)
                                    setShowHistory(false)
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-3 text-gray-500 flex-shrink-0"
                                >
                                    <path d="M12 8v4l3 3" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                                <span className="flex-1 truncate text-sm">{item}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const data = history.filter((_, i) => i !== index)
                                        setHistory(data);
                                        localStorage.setItem("searchHistory", JSON.stringify(data))
                                    }}
                                    className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0"
                                    aria-label="Remove from history"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-4 py-3 text-sm text-gray-500">No search history</p>
                )}
                {history.length > 0 && (
                    <div className="border-t border-[#2E3030] mt-1 justify-center items-center">
                        <button
                            className="w-full text-center py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-150"
                            onClick={() => {
                                setHistory([])
                                localStorage.setItem("searchHistory", JSON.stringify([]))
                            }}
                        >
                            Clear search history
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowHistoryDropdown