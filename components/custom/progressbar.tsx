// ProgressBar.js
import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="relative w-full h-2 bg-gray-200 rounded">
            <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded"
                style={{ width: `${progress}%`, transition: 'width 0.4s ease-in-out' }}
            />
        </div>
    );
};

export default ProgressBar;
