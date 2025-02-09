interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    error?: string;
    autoComplete?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ id, name, type, label, placeholder, error, autoComplete, value, onChange }: InputFieldProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-black">
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                ⚠️ {error}
            </p>
        )}
    </div>
);

export default InputField