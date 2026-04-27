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
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fullName = `${user.salutation} ${user.firstName} ${user.lastName}`;

  // =====================
  // HANDLER
  // =====================
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
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

  return (
    <div className="w-full p-6 pt-30 space-y-6">
      <NavbarRole role="member" userName={fullName} roleLabel="Member" />

      {/* TABLE */}
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
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">{item.noKlaim}</td>
                <td className="px-6 py-4">{item.maskapai}</td>
                <td className="px-6 py-4">{item.rute}</td>
                <td className="px-6 py-4">{item.tanggal}</td>
                <td className="px-6 py-4">{item.flight}</td>
                <td className="px-6 py-4">{item.kelas}</td>
                <td className="px-6 py-4">{item.status}</td>

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