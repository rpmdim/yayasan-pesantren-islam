"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function KelolaMitra() {
  const [mitra, setMitra] = useState([
    {
      idPenyedia: "PRV-001",
      email: "partner@traveloka.com",
      nama: "TravelokaPartner",
      tanggalKerjaSama: "2023-01-15",
    },
    {
      idPenyedia: "PRV-002",
      email: "partner@plazapremium.com",
      nama: "Plaza Premium",
      tanggalKerjaSama: "2023-06-01",
    },
  ]);

  const [modalMode, setModalMode] = useState(null);
  const [selectedMitra, setSelectedMitra] = useState(null);

  const openCreateModal = () => {
    setSelectedMitra(null);
    setModalMode("create");
  };

  const openEditModal = (item) => {
    setSelectedMitra(item);
    setModalMode("edit");
  };

  const openDeleteModal = (item) => {
    setSelectedMitra(item);
    setModalMode("delete");
  };

  const handleSave = (formData) => {
    if (modalMode === "create") {
      const nextNumber = String(mitra.length + 1).padStart(3, "0");

      setMitra([
        ...mitra,
        {
          ...formData,
          idPenyedia: `PRV-${nextNumber}`,
        },
      ]);
    }

    if (modalMode === "edit") {
      setMitra((prev) =>
        prev.map((item) =>
          item.idPenyedia === selectedMitra.idPenyedia
            ? {
                ...item,
                nama: formData.nama,
                tanggalKerjaSama: formData.tanggalKerjaSama,
              }
            : item
        )
      );
    }

    setModalMode(null);
    setSelectedMitra(null);
  };

  const handleDelete = () => {
    setMitra((prev) =>
      prev.filter((item) => item.idPenyedia !== selectedMitra.idPenyedia)
    );

    setModalMode(null);
    setSelectedMitra(null);
  };

  return (
    <div>
      <NavbarRole role="staff" userName="Mr. Admin Aero" roleLabel="Staff" />

      <div className="pt-32 px-16 pb-12 bg-background text-foreground min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[32px] font-bold">Kelola Mitra</p>
            <p className="text-[15px] text-gray-500">
              Kelola data mitra yang bekerja sama dengan AeroMiles.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-[#FFD22E] text-black px-5 py-3 rounded-[10px] font-semibold hover:bg-[#e6c12a] transition"
          >
            + Tambah Mitra
          </button>
        </div>

        <div className="bg-white text-black border border-[#E5E0C8] rounded-[18px] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF8E0] text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">ID Penyedia</th>
                <th className="px-6 py-4 text-left">Email Mitra</th>
                <th className="px-6 py-4 text-left">Nama Mitra</th>
                <th className="px-6 py-4 text-left">Tanggal Kerja Sama</th>
                <th className="px-6 py-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EFE6C9]">
              {mitra.map((item) => (
                <tr key={item.idPenyedia} className="hover:bg-[#FFFDF5]">
                  <td className="px-6 py-4 font-semibold">{item.idPenyedia}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4 font-semibold">{item.nama}</td>
                  <td className="px-6 py-4">{item.tanggalKerjaSama}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-[#8A6A00] hover:underline font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="text-red-500 hover:underline font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {mitra.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    Belum ada data mitra.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(modalMode === "create" || modalMode === "edit") && (
        <MitraFormModal
          mode={modalMode}
          mitra={selectedMitra}
          onClose={() => setModalMode(null)}
          onSave={handleSave}
        />
      )}

      {modalMode === "delete" && (
        <DeleteModal
          mitra={selectedMitra}
          onClose={() => setModalMode(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function MitraFormModal({ mode, mitra, onClose, onSave }) {
  const [form, setForm] = useState({
    email: mitra?.email || "",
    nama: mitra?.nama || "",
    tanggalKerjaSama: mitra?.tanggalKerjaSama || "",
  });

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[99999]"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-[16px] w-[500px] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="text-[22px] font-bold">
              {mode === "create" ? "Tambah Mitra Baru" : "Edit Mitra"}
            </p>
            <p className="text-sm text-gray-500">
              {mode === "create"
                ? "Lengkapi data mitra baru."
                : "Perbarui informasi mitra."}
            </p>
          </div>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {mode === "edit" && (
          <Input label="ID Penyedia" value={mitra.idPenyedia} disabled />
        )}

        <Input
          label="Email Mitra"
          type="email"
          value={form.email}
          disabled={mode === "edit"}
          onChange={(value) => updateForm("email", value)}
        />

        <Input
          label="Nama Mitra"
          value={form.nama}
          onChange={(value) => updateForm("nama", value)}
        />

        <Input
          label="Tanggal Kerja Sama"
          type="date"
          value={form.tanggalKerjaSama}
          onChange={(value) => updateForm("tanggalKerjaSama", value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[8px] bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200"
          >
            Batal
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-5 py-2 rounded-[8px] bg-[#FFD22E] text-black font-semibold hover:bg-[#e6c12a]"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ mitra, onClose, onDelete }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[99999]"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-[16px] w-[430px] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[22px] font-bold mb-2">Hapus Mitra?</p>
        <p className="text-sm text-gray-600 mb-5">
          Penghapusan mitra <span className="font-semibold">{mitra.nama}</span>{" "}
          akan berpengaruh pada hadiah yang disediakan oleh mitra ini.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-[8px] bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200"
          >
            Batal
          </button>

          <button
            onClick={onDelete}
            className="px-5 py-2 rounded-[8px] bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", disabled = false }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <p className="font-semibold text-sm">{label}</p>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[42px] border border-[#B7B6B6] rounded-[8px] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 disabled:text-gray-500"
      />
    </div>
  );
}