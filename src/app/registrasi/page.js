"use client";

import Navbar from "@/app/component/navbar";
import { useState } from "react";

export default function Registrasi() {
  const [active, setActive] = useState("Member");

  return (
    <div>
      <Navbar />

      <div className="pt-30 flex justify-center">
        <div className="w-[965px] border border-[#B7B6B6] rounded-[10px]">
          <div className="p-10 flex flex-col gap-6">
            
            {/* Header */}
            <div>
              <p className="font-semibold text-[22px]">Registrasi</p>
              <p className="text-[15px]">
                Pilih peran dan lengkapi data Anda
              </p>
            </div>

            {/* Role Selector */}
            <div className="h-[65px] bg-[#FFF8E0] rounded-[10px] flex items-center">
              
              {/* Member */}
              <div className="w-1/2 flex justify-center">
                <button
                  onClick={() => setActive("Member")}
                  className={`w-[401px] h-[31px] rounded-[10px] text-[19px] transition ${
                    active === "Member"
                      ? "bg-[#FEE794]"
                      : "hover:bg-[#FEE794]"
                  }`}
                >
                  Member
                </button>
              </div>

              {/* Staff */}
              <div className="w-1/2 flex justify-center">
                <button
                  onClick={() => setActive("Staff")}
                  className={`w-[401px] h-[31px] rounded-[10px] text-[19px] transition ${
                    active === "Staff"
                      ? "bg-[#FEE794]"
                      : "hover:bg-[#FEE794]"
                  }`}
                >
                  Staff
                </button>
              </div>
            </div>

            {/* Email */}
            <Input label="Email" type="email" placeholder="Masukkan email" />

            {/* Password */}
            <div className="flex gap-6">
              <Input label="Password" type="password" />
              <Input label="Konfirmasi Password" type="password" />
            </div>

            {/* Section */}
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
                <p className="font-semibold text-[22px] mt-6">Data Staff</p>
                <Input 
                label="Kode Maskapai" 
                placeholder="Masukkan kode maskapai" 
                />
            </>
            )}

            {/* Submit */}
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
      <p className="font-semibold text-[22px]">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="h-[45px] border border-[#B7B6B6] rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}