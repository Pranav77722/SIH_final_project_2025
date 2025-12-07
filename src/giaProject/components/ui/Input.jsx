import React from 'react';

const Input = ({ label, type = "text", value, onChange, placeholder, disabled, error, name, min, max }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border ${error ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Input;
