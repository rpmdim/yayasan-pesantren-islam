"use client";

import NavbarRole from "@/app/component/navbarRole";
import { useState } from "react";

export default function KlaimMiles() {
  const initialData = [
    { id: 1, noKlaim: "CLM-001", maskapai: "GA", rute: "CGK → DPS", tanggal: "2024-10-01", flight: "GA404", kelas: "Business", tanggalPengajuan: "2024-10-05", status: "Disetujui" },
    { id: 2, noKlaim: "CLM-002", maskapai: "SQ", rute: "SIN → NRT", tanggal: "2024-11-15", flight: "SQ12", kelas: "Economy", tanggalPengajuan: "2024-11-20", status: "Menunggu" },
    { id: 3, noKlaim: "CLM-003", maskapai: "GA", rute: "CGK → SUB", tanggal: "2024-12-01", flight: "GA310", kelas: "Economy", tanggalPengajuan: "2024-12-05", status: "Ditolak" },
  ];

  const user = {
    salutation: "Mr",
    firstName: "Budi",
    lastName: "Santoso",
  };

  const [data, setData] = useState(initialData);
  const [ajukanMiles, setAjukanMiles] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);



  const fullName = `${user.salutation} ${user.firstName} ${user.lastName}`;

  const [newItem, setNewItem] = useState({
  id: Date.now(),
  noKlaim: "",
  maskapai: "GA",
  rute: "CGK → DPS",
  tanggal: "",
  flight: "",
  kelas: "Economy",
  tanggalPengajuan: new Date().toISOString().split("T")[0],
  status: "Menunggu",
  nomorTiket: "",
  pnr: "",
});

  const handleAjukanMiles = () => {
    setAjukanMiles(true);
  };
  
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
  setData((prev) => [
    ...prev,
    {
      ...newItem,
      id: Date.now(),
      noKlaim: `CLM-${String(prev.length + 1).padStart(3, "0")}`,
    },
  ]);

  setAjukanMiles(false);

  
  setNewItem({
    id: Date.now(),
    noKlaim: "",
    maskapai: "GA",
    rute: "CGK → DPS",
    tanggal: "",
    flight: "",
    kelas: "Economy",
    tanggalPengajuan: new Date().toISOString().split("T")[0],
    status: "Menunggu",
    nomorTiket: "",
    pnr: "",
  });
};

  const handleSaveEdit = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      )
    );
    setIsEditOpen(false);
  };

  const confirmDelete = () => {
    setData((prev) =>
      prev.filter((item) => item.id !== selectedItem.id)
    );
    setIsDeleteOpen(false);
  };

  const [status, setStatus] = useState("");

  const filteredData = data.filter((item) =>
    (status === "" || item.status === status) 
  );

  return (
    <div className="w-full px-16 pt-30 space-y-6">
      <NavbarRole role="member" userName={fullName} roleLabel="Member" />

      <div className="w-full max-w-full flex justify-between items-center">
        <p className="text-[32px] font-bold">Klaim Missing Miles</p>

        <button 
        onClick={() => setAjukanMiles(true)}
        className="w-[170px] h-[45px] bg-[#FFD22E] rounded-[10px] text-[18px] font-semibold hover:bg-[#e6c12a] transition flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 24v208M24 128h208" stroke="currentColor" strokeWidth="16" strokeLinecap="round"/>
          </svg>
          Ajukan Klaim
        </button>

      </div>

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
      </div>

      
      <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8E0] text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">No. Klaim</th>
              <th className="px-6 py-3 text-left">Maskapai</th>
              <th className="px-6 py-3 text-left">Rute</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
              <th className="px-6 py-3 text-left">Flight</th>
              <th className="px-6 py-3 text-left">Kelas</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Tanggal Pengajuan</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">{item.noKlaim}</td>
                <td className="px-6 py-4">{item.maskapai}</td>
                <td className="px-6 py-4">{item.rute}</td>
                <td className="px-6 py-4">{item.tanggal}</td>
                <td className="px-6 py-4">{item.flight}</td>
                <td className="px-6 py-4">{item.kelas}</td>
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

                <td className="px-6 py-4">{item.tanggalPengajuan}</td>

                <td className="px-6 py-4">
                  {item.status === "Menunggu" && (
                    <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-700 hover:text-blue-600"
                        title="Edit"
                    >
                        ✎
                    </button>

                    <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                    >
                        🗑
                    </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[520px] space-y-4 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Edit Klaim</h2>
                <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-light"
                >
                ×
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Maskapai</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.maskapai}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, maskapai: e.target.value })
                    }
                >
                    <option value="GA">GA - Garuda Indonesia</option>
                    <option value="SQ">SQ - Singapore Airlines</option>
                    <option value="QR">QR - Qatar Airways</option>
                    <option value="EK">EK - Emirates</option>
                </select>
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Kelas Kabin</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.kelas}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, kelas: e.target.value })
                    }
                >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Bandara Asal</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.rute?.split(" → ")[0] || ""}
                    onChange={(e) => {
                    const tujuan = selectedItem.rute?.split(" → ")[1] || "";
                    setSelectedItem({ ...selectedItem, rute: `${e.target.value} → ${tujuan}` });
                    }}
                >
                    <option value="CGK">CGK - Soekarno-Hatta, Jakarta</option>
                    <option value="SIN">SIN - Changi, Singapore</option>
                    <option value="DPS">DPS - Ngurah Rai, Bali</option>
                    <option value="SUB">SUB - Juanda, Surabaya</option>
                    <option value="NRT">NRT - Narita, Tokyo</option>
                </select>
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Bandara Tujuan</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.rute?.split(" → ")[1] || ""}
                    onChange={(e) => {
                    const asal = selectedItem.rute?.split(" → ")[0] || "";
                    setSelectedItem({ ...selectedItem, rute: `${asal} → ${e.target.value}` });
                    }}
                >
                    <option value="CGK">CGK - Soekarno-Hatta, Jakarta</option>
                    <option value="SIN">SIN - Changi, Singapore</option>
                    <option value="DPS">DPS - Ngurah Rai, Bali</option>
                    <option value="SUB">SUB - Juanda, Surabaya</option>
                    <option value="NRT">NRT - Narita, Tokyo</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Tanggal Penerbangan</label>
                <input
                    type="date"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.tanggal}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, tanggal: e.target.value })
                    }
                />
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Flight Number</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.flight}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, flight: e.target.value })
                    }
                />
                </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nomor Tiket</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.nomorTiket || ""}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, nomorTiket: e.target.value })
                    }
                    placeholder="TKT-001"
                />
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">PNR</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedItem.pnr || ""}
                    onChange={(e) =>
                    setSelectedItem({ ...selectedItem, pnr: e.target.value })
                    }
                    placeholder="ABC123"
                />
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
                <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-[#FFD22E] hover:bg-[#e6c12a] rounded-lg text-sm font-semibold"
                >
                Simpan
                </button>
            </div>
            </div>
        </div>
        )}

      {ajukanMiles &&(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[520px] space-y-4 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Ajukan Klaim Baru</h2>
                <button
                onClick={() => setAjukanMiles(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-light"
                >
                ×
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Maskapai</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.maskapai}
                    onChange={(e) =>
                    setNewItem({ ...newItem, maskapai: e.target.value })
                    }
                >
                    <option value="GA">GA - Garuda Indonesia</option>
                    <option value="SQ">SQ - Singapore Airlines</option>
                    <option value="QR">QR - Qatar Airways</option>
                    <option value="EK">EK - Emirates</option>
                </select>
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Kelas Kabin</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.kelas}
                    onChange={(e) =>
                    setNewItem({ ...newItem, kelas: e.target.value })
                    }
                >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Bandara Asal</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.rute?.split(" → ")[0] || ""}
                    onChange={(e) => {
                    const tujuan = newItem.rute?.split(" → ")[1] || "";
                    setNewItem({ ...newItem, rute: `${e.target.value} → ${tujuan}` });
                    }}
                >
                    <option value="CGK">CGK - Soekarno-Hatta, Jakarta</option>
                    <option value="SIN">SIN - Changi, Singapore</option>
                    <option value="DPS">DPS - Ngurah Rai, Bali</option>
                    <option value="SUB">SUB - Juanda, Surabaya</option>
                    <option value="NRT">NRT - Narita, Tokyo</option>
                </select>
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Bandara Tujuan</label>
                <select
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.rute?.split(" → ")[1] || ""}
                    onChange={(e) => {
                    const asal = newItem.rute?.split(" → ")[0] || "";
                    setNewItem({ ...newItem, rute: `${asal} → ${e.target.value}` });
                    }}
                >
                    <option value="CGK">CGK - Soekarno-Hatta, Jakarta</option>
                    <option value="SIN">SIN - Changi, Singapore</option>
                    <option value="DPS">DPS - Ngurah Rai, Bali</option>
                    <option value="SUB">SUB - Juanda, Surabaya</option>
                    <option value="NRT">NRT - Narita, Tokyo</option>
                </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Tanggal Penerbangan</label>
                <input
                    type="date"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.tanggal}
                    onChange={(e) =>
                    setNewItem({ ...newItem, tanggal: e.target.value })
                    }
                />
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Flight Number</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.flight}
                    onChange={(e) =>
                    setNewItem({ ...newItem, flight: e.target.value })
                    }
                />
                </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nomor Tiket</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.nomorTiket || ""}
                    onChange={(e) =>
                    setNewItem({ ...newItem, nomorTiket: e.target.value })
                    }
                    placeholder="TKT-001"
                />
                </div>

                <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">PNR</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newItem.pnr || ""}
                    onChange={(e) =>
                    setNewItem({ ...newItem, pnr: e.target.value })
                    }
                    placeholder="ABC123"
                />
                </div>
            </div>

            
            <div className="flex justify-end pt-2">
                <button
                onClick={handleCreate}
                className="px-6 py-2 bg-[#FFD22E] hover:bg-[#e6c12a] rounded-lg text-sm font-semibold"
                >
                Simpan
                </button>
            </div>
            </div>
        </div>
        )}
      
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Batalkan Klaim?</h2>
            <p className="text-sm text-gray-500">
              Klaim akan dihapus secara permanen.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#FFD22E] hover:bg-[#e6c12a] rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}