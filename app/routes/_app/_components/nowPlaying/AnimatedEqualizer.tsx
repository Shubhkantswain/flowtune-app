const AnimatedEqualizer = () => {
    return (
        <div className="flex items-center justify-center w-6 h-10">
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <rect x="1" y="8" width="4" height="8" fill="#02fad5" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
                <rect x="7" y="5" width="4" height="14" fill="#02fad5" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                <rect x="13" y="2" width="4" height="20" fill="#02fad5" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }} />
                <rect x="19" y="5" width="4" height="14" fill="#02fad5" className="animate-[equalizer_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
            </svg>
        </div>
    );
};

export default AnimatedEqualizer