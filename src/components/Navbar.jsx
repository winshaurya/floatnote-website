import React from "react";

/**
 * Pill-shaped Navbar
 * - Logo/avatar on the left
 * - Help and Downloads links in the center/right
 * - "Star us" button on the right linking to repoUrl
 *
 * Props:
 * - logo (string) - path to logo image (default: "/assets/new-logo.jpg")
 * - repoUrl (string) - URL for the GitHub repo
 */
// Default to the site's logo in public/assets (logo.png or logo.ico)
// Default repo points to the requested repository; App can override via prop.
const Navbar = ({ logo = "/assets/logo.png", repoUrl = "https://github.com/winshaurya/floatnote" }) => {
  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 18px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          pointer-events: none; /* allow clicks through the navbar container; inner elements will enable pointer-events */
          z-index: 1000;
        }

        .nav-inner {
          pointer-events: auto; /* enable interaction on inner pill */
          display: flex;
          align-items: center;
          gap: 16px;
          background: #ffffff;
          border-radius: 9999px;
          padding: 8px 18px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.06);
          max-width: 880px;
          width: calc(100% - 48px);
          box-sizing: border-box;
        }

        .avatar {
          width: 48px; /* larger logo */
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.04);
          display: block; /* remove inline spacing/padding effects */
          padding: 0; /* no padding on the image itself */
        }

        /* nav-links removed (Help / Downloads) per user request */

        .spacer {
          flex: 1;
        }

        .star-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #111111;
          color: #fff;
          padding: 10px 16px; /* a little bigger */
          border-radius: 9999px; /* fully pill-shaped */
          text-decoration: none;
          font-weight: 800;
          font-size: 15px;
        }

        .star-btn svg {
          width: 18px;
          height: 18px;
          fill: #fff;
        }

        @media (max-width: 720px) {
          .nav-inner { padding: 6px 10px; gap: 10px; }
          .avatar { width: 42px; height: 42px; }
          .star-btn { padding: 6px 8px; font-size: 14px; }
        }
      `}</style>

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner" role="group" aria-label="Top navigation">
          <img src={logo} alt="logo" className="avatar" />

          <div className="spacer" />

          <a
            className="star-btn"
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star us on GitHub"
            title="Star us on GitHub"
          >
              <strong style={{ fontWeight: 900 }}>Star Us On</strong>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.527.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.645 1.649.24 2.87.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.62-5.475 5.92.43.37.814 1.1.814 2.22 0 1.6-.015 2.89-.015 3.29 0 .32.216.694.825.576C20.565 22.09 24 17.59 24 12.297 24 5.67 18.627.297 12 .297z" />
              </svg>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
