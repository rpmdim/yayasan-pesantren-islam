"use client";

import Navbar from "@/app/component/navbar";
import { useState } from "react";

export default function Registrasi() {
  const [active, setActive] = useState("Member");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <Navbar />

      <div className="pt-30 px-4 sm:px-8 pb-10 flex justify-center">
        <div className="w-[965px] max-w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] rounded-[10px]">
          <div className="p-10 flex flex-col gap-6">
            
            {/* Header */}
            <div>
              <p className="font-semibold text-[22px] text-black dark:text-gray-100">Registrasi</p>
              <p className="text-[15px] text-gray-600 dark:text-gray-300">
                Pilih peran dan lengkapi data Anda
              </p>
            </div>

            
            <div className="h-[65px] bg-[#FFF8E0] dark:bg-gray-800 rounded-[10px] flex items-center">
              
              
              <div className="w-1/2 flex justify-center">
                <button
                  onClick={() => setActive("Member")}
                  className={`w-[401px] h-[31px] rounded-[10px] text-[19px] transition ${
                    active === "Member"
                      ? "bg-[#FEE794] text-black"
                      : "hover:bg-[#FEE794] text-black dark:text-gray-100"
                  }`}
                >
                  Member
                </button>
              </div>

              
              <div className="w-1/2 flex justify-center">
                <button
                  onClick={() => setActive("Staff")}
                  className={`w-[401px] h-[31px] rounded-[10px] text-[19px] transition ${
                    active === "Staff"
                      ? "bg-[#FEE794] text-black"
                      : "hover:bg-[#FEE794] text-black dark:text-gray-100"
                  }`}
                >
                  Staff
                </button>
              </div>
            </div>

            
            <Input label="Email" type="email" placeholder="Masukkan email" />

            
            <div className="flex gap-6">
              <Input label="Password" type="password" />
              <Input label="Konfirmasi Password" type="password" />
            </div>

            
            <div className="mt-6">
              <p className="font-semibold text-[22px]">Data Pribadi</p>
            </div>

            <Input label="Salutation" />
            <Input label="Nama Depan" />

            <div className="flex gap-6">
              <Input label="Nama Belakang" />
              <Input label="Kewarganegaraan" />
            </div>

            <div className="flex gap-6">
              <Input label="Country Code" />
              <Input label="Nomor HP" />
            </div>

            <Input label="Tanggal Lahir" />

            
            {active === "Staff" && (
            <>
                <p className="font-semibold text-[22px] mt-6 text-black dark:text-gray-100">Data Staff</p>
                <Input 
                label="Kode Maskapai" 
                placeholder="Masukkan kode maskapai" 
                />
            </>
            )}

            
            <div className="flex justify-center mt-8">
              <button className="w-[661px] h-[45px] bg-[#FFD22E] rounded-[10px] text-[21px] font-semibold hover:bg-[#e6c12a] transition">
                Daftar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


function Input({ label, type = "text", placeholder = "" }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="font-semibold text-[22px] text-black dark:text-gray-100">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="h-[45px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}