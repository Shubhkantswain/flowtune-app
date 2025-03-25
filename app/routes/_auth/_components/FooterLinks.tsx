import { Link, useLocation } from "@remix-run/react";

const FooterLinks = () => {
  const location = useLocation();
  const isSignIn = location.pathname === "/ft/signin";
  const isRegister = location.pathname === "/ft/register";

  return (
    <div className="mt-6 text-sm text-center text-gray-600">
      {isSignIn && (
        <>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/ft/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-1">
            <p>
              Forgot Password?{" "}
              <Link to="/ft/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password
              </Link>
            </p>
          </div>
        </>
      )}
      {isRegister && (
        <p>
          Already have an account?{" "}
          <Link to="/ft/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      )}
      <p className="mt-7">
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
