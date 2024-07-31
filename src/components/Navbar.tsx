import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Report</a>
              <ul className="p-1">
                <li>
                  <a>User Report</a>
                </li>
                <li>
                  <a>Management Report</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Admissions</a>
            </li>
          <li>
            <a>Analytics</a>
          </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">NextJS User Management</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <details>
              <summary>Report</summary>
              <ul className="p-1">
                <li>
                  <a>User Report</a>
                </li>
                <li>
                  <a>Management Report</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Admissions</a>
          </li>
          <li>
            <a>Analytics</a>
          </li>
        </ul>
      </div>
      {/* <div className="navbar-end">
        <a className="btn btn-active btn-primary"></a>
      </div> */}
    </div>
  );
};

export default Navbar;
