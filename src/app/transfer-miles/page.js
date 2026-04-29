"use client";
import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function Klaim_missing_miles() {
  const [data, setData] = useState([
    {
        id: 1,
        waktu: "2025-01-15 10:30",
        nama: "Jane Smith",
        email: "jane@example.com",
        miles: -5000,
        catatan: "Hadiah ulang tahun",
        tipe: "Kirim",
    },
    {
        id: 2,
        waktu: "2025-02-01 14:00",
        nama: "Budi A. Santoso",
        email: "budi@example.com",
        miles: 2000,
        catatan: "-",
        tipe: "Terima",
    },
    ]);

    const [email, setEmail] = useState("");
    const [miles, setMiles] = useState("");
    const [catatan, setCatatan] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const handleTransfer = () => {
        if (!email || !miles) return;

        const newData = {
            id: Date.now(),
            waktu: new Date().toLocaleString(),
            nama: email.split("@")[0], 
            email: email,
            miles: -Math.abs(Number(miles)),
            catatan: catatan || "-",
            tipe: "Kirim",
        };

        setData([newData, ...data]);

        // reset form
        setEmail("");
        setMiles("");
        setCatatan("");
        setIsOpen(false);
    };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <NavbarRole role="member" userName="John W. Doe" roleLabel="Member" />

      <main className="w-full px-16 pt-32 space-y-6 flex justify-center flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-full flex justify-between items-center">
        <div>
          <p className="text-[32px] font-bold">Transfer Miles</p>
          <p className="text-[15px] text-gray-700 dark:text-gray-300">
            Award Miles tersedia:{" "}
            <span className="font-bold">32,000</span>
          </p>
        </div>

        <button 
        onClick={() => setIsOpen(true)}
        className="w-[170px] h-[45px] bg-[#FFD22E] rounded-[10px] text-[18px] font-semibold hover:bg-[#e6c12a] transition flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 24v208M24 128h208" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
          </svg>
          Transfer Baru
        </button>
      </div>

      
      <div className="w-full max-w-full p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#111827] shadow-sm">
        <p className="font-semibold text-[22px] mb-4 text-black dark:text-gray-100">Riwayat Transfer</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-black dark:text-gray-100">
            
            
            <thead className="bg-[#FFF8E0] dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Waktu</th>
                <th className="px-6 py-3 text-left">Member</th>
                <th className="px-6 py-3 text-left">Jumlah Miles</th>
                <th className="px-6 py-3 text-left">Catatan</th>
                <th className="px-6 py-3 text-left">Tipe</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/70">

                  
                  <td className="px-6 py-4">{item.waktu}</td>

                 
                  <td className="px-6 py-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.email}</p>
                  </td>

         
                  <td className="px-6 py-4 font-semibold">
                    <span
                      className={
                        item.miles < 0 ? "text-red-500" : "text-green-600"
                      }
                    >
                      {item.miles > 0 ? `+${item.miles}` : item.miles}
                    </span>
                  </td>

                  
                  <td className="px-6 py-4">{item.catatan}</td>

          
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.tipe === "Kirim"
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-100"
                          : "bg-[#FFD22E] text-black"
                      }`}
                    >
                      {item.tipe}
                    </span>
                  </td>

              
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M200 96h-8V64a56 56 0 0 0-112 0v32h-8a16 16 0 0 0-16 16v88a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-88a16 16 0 0 0-16-16ZM96 64a32 32 0 0 1 64 0v32H96Zm32 104a16 16 0 1 1 16-16 16 16 0 0 1-16 16Z"/>
                    </svg>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      {isOpen && (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
    
   
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsOpen(false)}
    />


    <div className="relative bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-black dark:text-gray-100 w-[450px] max-w-full rounded-2xl shadow-xl p-6 z-10 animate-fadeIn">


      <h2 className="text-[22px] font-bold mb-4">
        Transfer Miles
      </h2>

      <div className="space-y-4">

      
        <div>
          <label className="text-sm font-medium text-black dark:text-gray-200">Email Penerima</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-black dark:text-gray-200">Jumlah Miles</label>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="Masukkan jumlah"
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
          />
        </div>

       
        <div>
          <label className="text-sm font-medium text-black dark:text-gray-200">Catatan (opsional)</label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Tambahkan catatan..."
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
          />
        </div>

       
        <button
          onClick={handleTransfer}
          className="w-full h-[45px] bg-[#FFD22E] rounded-lg font-semibold hover:bg-[#e6c12a] transition"
        >
          Transfer
        </button>

      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}

