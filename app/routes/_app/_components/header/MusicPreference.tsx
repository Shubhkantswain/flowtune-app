import React, { useEffect, useState } from "react";

const musicLanguages = [
  { name: "Hindi", native: "हिन्दी" },
  { name: "English", native: "English" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Kannada", native: "ಕನ್ನಡ" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Marathi", native: "मराठी" },
  { name: "Gujarati", native: "ગુजરાતી" },
  { name: "Malayalam", native: "മलയाളം" },
];

const ThumbsUpIcon = ({ isSelected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 ${isSelected ? "fill-cyan-400" : "fill-gray-400"}`}
    viewBox="0 0 24 24"
  >
    <path d="M2 10h3v10H2V10zm5 0h5.236l-1.232-4.928a1 1 0 0 1 1.424-1.11L16 7h4a2 2 0 0 1 2 2v3.764a2 2 0 0 1-.447 1.262l-3.106 3.647A2 2 0 0 1 16.724 19H11a2 2 0 0 1-2-2v-7z"></path>
  </svg>
);

const MusicPreferencesModal = ({ isOpen, onClose }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(["Hindi"]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  const toggleLanguage = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 w-full hide-scrollbar bg-black/50 backdrop-blur-2xl">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div className="relative w-full max-w-md mx-auto">
          <div className="rounded-lg overflow-hidden">
            <div className="relative p-4 sm:p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Music Preferences</h2>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">Set your preferences to discover music you love.</p>
              </div>
              
              <div className="overflow-visible hide-scrollbar">
                {musicLanguages.map((language) => (
                  <div 
                    key={language.name}
                    className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-700"
                  >
                    <div className="flex flex-col pr-4">
                      <span className="text-white font-medium text-sm sm:text-base">{language.name}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">{language.native}</span>
                    </div>
                    <button 
                      onClick={() => toggleLanguage(language.name)}
                      className="focus:outline-none flex-shrink-0"
                    >
                      <ThumbsUpIcon isSelected={selectedLanguages.includes(language.name)} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPreferencesModal;