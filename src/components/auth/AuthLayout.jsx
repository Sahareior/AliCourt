// components/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router';

const AuthLayout = ({
  title,
  subtitle,
  children,
  buttonText,
  onSubmit,
  centeredContentOnly = false,
  hideReminder = false,
  hideSocial = false,
}) => {
  return (
    <div>
      <div
        className="w-[573px] h-[840px] mt-8 flex justify-center items-center gap-4 flex-col mx-auto my-auto"
        style={{ boxShadow: '0px 4px 100px 0px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Logo */}
        <div className="flex gap-3 justify-center items-center">
          <img className="w-[45.88px] h-[33.02px]" src="/images/auth/Vector.png" alt="logo" />
          <h4 className="text-[#521DA4] font-bold">GAMEPLAN</h4>
        </div>

        {/* Texts */}
        {subtitle && <h4 className="text-[14px] text-center">{subtitle}</h4>}
        {title && <h3 className="text-[30px] md:text-[48px] font-semibold text-center">{title}</h3>}

        {/* Content */}
        <div className={`flex flex-col ${centeredContentOnly ? '' : 'w-[441px]'} gap-6 justify-center items-center`}>
          {children}

          {!hideReminder && (
            <div className="flex justify-between w-full">
              <h3>Remember password</h3>
              <h3 className="text-red-500 cursor-pointer">Forgot password?</h3>
            </div>
          )}
        </div>

        {buttonText && (
          <button
            onClick={onSubmit}
            className="w-[482px] h-[54px] rounded-[30px] text-white"
            style={{
              background: 'linear-gradient(90.9deg, #051960 3.04%, #591DA9 96.03%)',
            }}
          >
            {buttonText}
          </button>
        )}

        {!hideSocial && (
          <>
            <p>Don’t Have an Account? <Link to='/signup' className="text-blue-400 cursor-pointer">Sign up?</Link ></p>

            <div className="flex justify-center items-center gap-1">
              <div className="bg-black h-[0.1px] w-10" />
              <h3>or login with</h3>
              <div className="bg-black w-10 h-[0.1px]" />
            </div>

            <div className="flex gap-3">
              <img src="/images/auth/Apple logo.png" alt="Apple" />
              <img src="/images/auth/Facebook.png" alt="Facebook" />
              <img className="w-[42px] h-[42px]" src="/images/auth/google.png" alt="Google" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
