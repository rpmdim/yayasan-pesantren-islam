"use client";

import Navbar from "@/app/component/navbarGuest";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const user = login(email, password);
    if (!user) {
      setError("Email atau password salah.");
      return;
    }

    // Redirect berdasarkan role
    if (user.role === "Staff") {
      router.push("/staff-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <Navbar />
      <div className="pt-30 flex flex-col lg:flex-row w-full px-4 sm:px-8 pb-10 gap-8">
        <div className="w-full lg:w-1/2">
          <p className="font-bold text-[45px] ml-0 lg:ml-20 max-w-[600px] text-black dark:text-gray-100">
            Siap mengeksplorasi dunia lagi?
          </p>
          <img
            src="/images/Airplane-login.png"
            alt="user"
            className="w-full max-w-[600px] h-auto ml-0 lg:ml-20"
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="form rounded-[10px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] w-full max-w-[511px] min-h-[522px]">
            <div className="p-10 flex flex-col gap-2">
              <div className="mb-5">
                <p className="font-semibold text-[22px] text-black dark:text-gray-100">
                  Login
                </p>
                <p className="font-regular text-[15px] text-gray-600 dark:text-gray-300">
                  Masukkan email dan password anda
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[16px] text-black dark:text-gray-100">
                  Email
                </p>
                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[45px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[16px] text-black dark:text-gray-100">
                  Password
                </p>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full h-[45px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {error && (
                <p className="text-red-500 text-[13px] mt-1">{error}</p>
              )}

              <div className="flex flex-col items-center mt-7 gap-1">
                <button
                  onClick={handleLogin}
                  className="w-[292px] h-[45px] bg-[#FFD22E] rounded-[10px] font-semibold text-[21px] hover:bg-[#e6c12a]"
                >
                  Log In
                </button>
                <p className="text-black dark:text-gray-200">
                  Belum punya akun?{" "}
                  <Link href="/registrasi" className="text-blue-500 hover:underline">
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}