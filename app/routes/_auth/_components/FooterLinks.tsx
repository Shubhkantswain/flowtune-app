import { Link, useLocation } from "@remix-run/react";

const FooterLinks = () => {
  const location = useLocation();
  const isSignIn = location.pathname === "/ft/signin";
  const isRegister = location.pathname === "/ft/register";
  
  return (
    <div className="mt-6 text-sm text-center text-gray-600">
      {isSignIn && (
        <p>
          Don't have an account?{" "}
          <Link to="/ft/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      )}
      {isRegister && (
        <p>
          Already have an account?{" "}
          <Link to="/ft/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      )}
      <p className="mt-2">
        Protected by reCAPTCHA and subject to our{" "}
        <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
          Terms of Service
        </Link>
      </p>
    </div>
  );
};

export default FooterLinks;
