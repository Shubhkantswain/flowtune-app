import { useState } from "react";

const PasswordField = ({ error }: { error?: string }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-black">
        Password
      </label>
      <div className="mt-1 relative">
        <input
          id="password"
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="new-password"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-black"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? "🙈" : "👁"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
