import React from "react";

const Footer: React.FC = () => {
  const companyLinks = ["Home", "Categories", "Explore Products", "About Us"];

  const socialLinks = ["Instagram", "Facebook", "TikTok", "YouTube"];

  return (
    <footer className="bg-[#141313] text-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="w-full max-w-screen-2xl mx-auto px-10 lg:px-10 md:px-6 px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* KIRI – LOGO + TEXT */}
          <div className="max-w-sm text-left">
            <div className="flex items-start gap-2 mb-4">
              <img src="images/logo-footer.svg" alt="" />
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              Engineered for endurance and designed for speed. <br />
              Experience gear that moves as fast as you do.
            </p>
          </div>

          {/* KANAN – LINK COLUMNS */}
          <div className="grid grid-cols-2 gap-12 text-sm text-left">
            {/* COLUMN COMPANY */}
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FF5733] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* COLUMN SOCIAL */}
            <ul className="space-y-3">
              {socialLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FF5733] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            SportsOn © 2026 All Rights Reserved.
          </p>

          <div className="grid grid-cols-2 gap-12 text-sm text-left">
            <a href="#" className="hover:text-[#FF5733] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#FF5733] transition">
              Terms Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
