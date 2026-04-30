"use client";
import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

const CheckSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" style={{ cursor: "pointer" }}>
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" fill="rgb(40,201,55)" />
      <path d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z" fill="white" />
    </g>
  </svg>
);

const XSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" style={{ cursor: "pointer" }}>
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z" fill="rgb(236,0,0)" />
      <path d="M 28.902 66.098 c -1.28 0 -2.559 -0.488 -3.536 -1.465 c -1.953 -1.952 -1.953 -5.118 0 -7.07 l 32.196 -32.196 c 1.951 -1.952 5.119 -1.952 7.07 0 c 1.953 1.953 1.953 5.119 0 7.071 L 32.438 64.633 C 31.461 65.609 30.182 66.098 28.902 66.098 z" fill="white" />
      <path d="M 61.098 66.098 c -1.279 0 -2.56 -0.488 -3.535 -1.465 L 25.367 32.438 c -1.953 -1.953 -1.953 -5.119 0 -7.071 c 1.953 -1.952 5.118 -1.952 7.071 0 l 32.195 32.196 c 1.953 1.952 1.953 5.118 0 7.07 C 63.657 65.609 62.377 66.098 61.098 66.098 z" fill="white" />
    </g>
  </svg>
);

function ModalSetujui({ item, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-7 w-[480px] max-w-[95vw] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <CheckSVG />
          <div>
            <h2 className="text-lg font-bold text-green-600">Setujui Klaim</h2>
            <p className="text-xs text-gray-400">Konfirmasi persetujuan klaim missing miles</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            ["No. Klaim", item.noKlaim],
            ["Member", item.nama],
            ["Email", item.email],
            ["Maskapai", item.maskapai],
            ["Rute", item.rute],
            ["Flight", item.flight],
            ["Kelas", item.kelas],
            ["Tanggal Penerbangan", item.tanggal],
            ["Tanggal Pengajuan", item.tanggalPengajuan],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600">✓ Setujui Klaim</button>
        </div>
      </div>
    </div>
  );
}

function ModalTolak({ item, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-7 w-[480px] max-w-[95vw] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <XSvg />
          <div>
            <h2 className="text-lg font-bold text-red-600">Tolak Klaim</h2>
            <p className="text-xs text-gray-400">Konfirmasi penolakan klaim missing miles</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            ["No. Klaim", item.noKlaim],
            ["Member", item.nama],
            ["Email", item.email],
            ["Maskapai", item.maskapai],
            ["Rute", item.rute],
            ["Flight", item.flight],
            ["Kelas", item.kelas],
            ["Tanggal Penerbangan", item.tanggal],
            ["Tanggal Pengajuan", item.tanggalPengajuan],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600">✕ Tolak Klaim</button>
        </div>
      </div>
    </div>
  );
}

export default function KlaimMissingMiles() {
  const initialData = [
    { id: 1, noKlaim: "CLM-001", nama: "John W. Doe", email: "john@example.com", maskapai: "GA", rute: "CGK → DPS", tanggal: "2024-10-01", flight: "GA404", kelas: "Business", tanggalPengajuan: "2024-10-05", status: "Disetujui" },
    { id: 2, noKlaim: "CLM-002", nama: "John W. Doe", email: "john@example.com", maskapai: "SQ", rute: "SIN → NRT", tanggal: "2024-11-15", flight: "SQ12", kelas: "Economy", tanggalPengajuan: "2024-11-20", status: "Menunggu" },
    { id: 3, noKlaim: "CLM-003", nama: "Jane Smith", email: "jane@example.com", maskapai: "GA", rute: "CGK → SUB", tanggal: "2024-12-01", flight: "GA310", kelas: "Economy", tanggalPengajuan: "2024-12-05", status: "Ditolak" },
  ];

  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState("");
  const [maskapai, setMaskapai] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [modalSetujui, setModalSetujui] = useState(null);
  const [modalTolak, setModalTolak] = useState(null);

  const filteredData = data.filter((item) =>
    (status === "" || item.status === status) &&
    (maskapai === "" || item.maskapai === maskapai) &&
    (tanggal === "" || item.tanggalPengajuan === tanggal)
  );

  const handleSetujui = (id) => {
    setData((prev) => prev.map((item) => item.id === id ? { ...item, status: "Disetujui" } : item));
    setModalSetujui(null);
  };

  const handleTolak = (id) => {
    setData((prev) => prev.map((item) => item.id === id ? { ...item, status: "Ditolak" } : item));
    setModalTolak(null);
  };

  const user = {
    salutation: "Mr",
    firstName: "Budi",
    lastName: "Santoso",
    nationality: "Indonesia",
    countryCode: "+62",
    phoneNumber: "81234567890",
    birthDate: "1998-05-12",
    memberNo: "M0001",
    tier: "Gold",
    totalMiles: "45,000",
    awardMiles: "32,000",
    joinDate: "2024-01-15",
  };

  const fullName = `${user.salutation} ${user.firstName} ${user.middleName} ${user.lastName}`;

  return (
    <div className="w-full px-16 pt-30 space-y-6">

      <NavbarRole role="member" userName={fullName} roleLabel="Member" />
      <p className="text-[32px] font-bold">Kelola Klaim Missing Miles</p>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white shadow-sm">
          <span className="text-gray-500 text-sm">Status |</span>
          <select onChange={(e) => setStatus(e.target.value)} className="outline-none text-sm bg-transparent">
            <option value="">Semua</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white shadow-sm">
          <span className="text-gray-500 text-sm">Maskapai |</span>
          <select onChange={(e) => setMaskapai(e.target.value)} className="outline-none text-sm bg-transparent">
            <option value="">Semua</option>
            <option value="GA">GA</option>
            <option value="SQ">SQ</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white shadow-sm">
          <span className="text-gray-500 text-sm">Tanggal Pengajuan |</span>
          <input type="date" onChange={(e) => setTanggal(e.target.value)} className="outline-none text-sm bg-transparent" />
        </div>
      </div>

   
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF8E0] text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">No. Klaim</th>
                <th className="px-6 py-3 text-left">Member</th>
                <th className="px-6 py-3 text-left">Maskapai</th>
                <th className="px-6 py-3 text-left">Rute</th>
                <th className="px-6 py-3 text-left">Tanggal</th>
                <th className="px-6 py-3 text-left">Flight</th>
                <th className="px-6 py-3 text-left">Kelas</th>
                <th className="px-6 py-3 text-left">Tanggal Pengajuan</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.noKlaim}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </td>
                  <td className="px-6 py-4">{item.maskapai}</td>
                  <td className="px-6 py-4">{item.rute}</td>
                  <td className="px-6 py-4">{item.tanggal}</td>
                  <td className="px-6 py-4">{item.flight}</td>
                  <td className="px-6 py-4">{item.kelas}</td>
                  <td className="px-6 py-4">{item.tanggalPengajuan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Disetujui"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Menunggu"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "Menunggu" && (
                      <div className="flex items-center gap-2">
                        <span onClick={() => setModalSetujui(item)} title="Setujui">
                          <CheckSVG />
                        </span>
                        <span onClick={() => setModalTolak(item)} title="Tolak">
                          <XSvg />
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      {modalSetujui && (
        <ModalSetujui
          item={modalSetujui}
          onClose={() => setModalSetujui(null)}
          onConfirm={() => handleSetujui(modalSetujui.id)}
        />
      )}
      {modalTolak && (
        <ModalTolak
          item={modalTolak}
          onClose={() => setModalTolak(null)}
          onConfirm={() => handleTolak(modalTolak.id)}
        />
      )}
    </div>
  );
}