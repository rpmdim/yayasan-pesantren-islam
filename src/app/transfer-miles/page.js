"use client";
import { useState } from "react";

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
    <div className="w-full p-6 pt-30 space-y-6 flex justify-center flex-col items-center">
      
      {/* HEADER */}
      <div className="w-[1200px] flex justify-between items-center">
        <div>
          <p className="font-bold text-[25px] mt-3 mb-3">Transfer Miles</p>
          <p className="text-[15px]">
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

      
      <div className="w-[1200px] p-6 border border-gray-300 rounded-xl bg-white shadow-sm">
        <p className="font-semibold text-[22px] mb-4">Riwayat Transfer</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            
            <thead className="bg-[#FFF8E0] text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Waktu</th>
                <th className="px-6 py-3 text-left">Member</th>
                <th className="px-6 py-3 text-left">Jumlah Miles</th>
                <th className="px-6 py-3 text-left">Catatan</th>
                <th className="px-6 py-3 text-left">Tipe</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">

                  
                  <td className="px-6 py-4">{item.waktu}</td>

                 
                  <td className="px-6 py-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
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
                          ? "bg-gray-200 text-gray-700"
                          : "bg-[#FFD22E] text-black"
                      }`}
                    >
                      {item.tipe}
                    </span>
                  </td>

              
                  <td className="px-6 py-4">
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
  <div className="fixed inset-0 z-[99999] flex items-center justify-center">
    
   
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsOpen(false)}
    />


    <div className="relative bg-white w-[450px] rounded-2xl shadow-xl p-6 z-10 animate-fadeIn">


      <h2 className="text-[22px] font-bold mb-4">
        Transfer Miles
      </h2>

      <div className="space-y-4">

      
        <div>
          <label className="text-sm font-medium">Email Penerima</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Jumlah Miles</label>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            placeholder="Masukkan jumlah"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
          />
        </div>

       
        <div>
          <label className="text-sm font-medium">Catatan (opsional)</label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Tambahkan catatan..."
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
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
    </div>
  );
}

