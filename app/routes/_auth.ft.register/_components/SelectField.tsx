import React from 'react';
import { Option } from '~/types';

interface SelectFieldProps {
    id: string;
    name: string;
    label: string;
    options: Option[];
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    name,
    label,
    options,
    value,
    onChange,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-black">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...props}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
};

export default SelectField;