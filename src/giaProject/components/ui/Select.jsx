import React from 'react';

const Select = ({ label, value, onChange, options, disabled, error, name, placeholder = "-- Select --" }) => {
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border ${error ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default Select;
