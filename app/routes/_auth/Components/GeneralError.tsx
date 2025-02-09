import React from "react";

interface GeneralErrorProps {
    error: string; // Optional in case no error exists
}

const GeneralError: React.FC<GeneralErrorProps> = ({ error }) => {
    return (
        <div className="rounded-md bg-red-600 text-white p-3 flex justify-between items-center">
            <span className="text-sm font-medium">{error}</span>
            <button className="text-lg font-bold">❌</button>
        </div>
    );
};

export default GeneralError;
