"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 z-[9999] flex w-full justify-center pointer-events-none">
      
      <nav className="text-white flex font-Poppins bg-[#FFD22E] justify-center items-center w-full h-20 pointer-events-auto">

        <div className="flex flex-row w-full">
          <div className="flex flex-row gap-2 w-1/4 justify-center">
            <Image
              src="/images/AeroMilesLogo.png"
              width={50}
              height={30}
              alt="Logo AeroMiles"
              className="w-[50px] md:w-[60px] h-auto transition-all"
            />
            <p className="text-black font-bold text-[34px]">AeroMiles</p>
          </div>

          <div className="flex flex-row w-3/4 justify-center gap-4">
            
            <Link href="/login" className="ml-150">
              <button
                className={`text-black font-medium text-[18px] w-[106px] h-[49px] flex justify-center items-center gap-[8px] rounded-[10px] ${
                  pathname === "/login" ? "bg-[#CCA825]" : "bg-[#FFD22E] hover:bg-[#e6c12a]"
                }`}
              >
                <img src="/images/User.svg" alt="user" className="w-5 h-5" />
                Login
              </button>
            </Link>

            <Link href="/registrasi">
              <button
                className={`text-black font-medium text-[18px] w-[163px] h-[49px] flex justify-center items-center gap-[8px] rounded-[10px] ${
                  pathname === "/registrasi" ? "bg-[#CCA825]" : "bg-[#FFD22E] hover:bg-[#e6c12a]"
                }`}
              >
                <img src="/images/User.svg" alt="user" className="w-5 h-5" />
                Registrasi
              </button>
            </Link>
          </div>
        </div>

      </nav>
    </div>
  );
}