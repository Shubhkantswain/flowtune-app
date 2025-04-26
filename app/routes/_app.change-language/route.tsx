import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from '@remix-run/react';

export default function LanguageSelectionModal() {
  const [selectedLanguage, setSelectedLanguage] = useState('English (India)');
  const navigate = useNavigate();

  const languages = [
    'English (India)',
    'English (US)',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Japanese',
    'Chinese'
  ];

  const handleClose = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    console.log(`Selected language: ${selectedLanguage}`);
    navigate(-1);
  };

  return (
    <div className="fixed inset-0  overflow-y-auto custom-scrollbar z-50 bg-black/50 backdrop-blur-2xl hide-scrollbar ">
      <div className="flex items-center justify-center min-h-screen p-4">


        {/* Modal Content */}
        <div className="relative w-full max-w-md flex flex-col items-center z-10 px-4">
          {/* Close button - updated with white transparent background and blur */}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 rounded-full bg-[#292a2a] hover:bg-[#5D5E5E] hover:scale-110 backdrop-blur-md p-2 text-white"
            style={{ top: '-40px', right: '0' }}
          >
            <X size={18} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1">Select Language</h2>

          {/* Subtitle */}
          <p className="text-sm text-white text-center mb-6">
            Select your language preference then click OK
          </p>

          {/* Dropdown - styled to match image */}
          <div className="w-full mb-8">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full py-3 pl-4 pr-10 rounded-full bg-[#292a2a] hover:bg-[#5D5E5E] text-white appearance-none cursor-pointer  transition-all backdrop-blur-md"
              >
                {languages.map((lang) => (
                  <option
                    key={lang}
                    value={lang}
                    className="bg-[#292a2a] text-white hover:bg-[#5D5E5E]" // Some browsers support styling option bg
                  >
                    {lang}
                  </option>
                ))}
              </select>

              {/* Custom Chevron Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>


          {/* OK Button - matching the cyan color and size in image */}
          <button
            onClick={handleConfirm}
            className="bg-[#25d1da] hover:bg-[#93D0D5] text-black font-medium py-3 px-12 rounded-full text-sm"
            style={{ width: '150px' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}