"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function KelolaHadiahPenyedia() {
  const [rewards, setRewards] = useState([
    {
      kode: "RWD-001",
      nama: "Tiket Domestik PP",
      deskripsi: "Tiket pulang-pergi rute domestik Indonesia",
      penyedia: "Garuda Indonesia",
      tipe: "airline",
      miles: 15000,
      validStart: "2024-01-01",
      programEnd: "2025-12-31",
      active: true,
    },
    {
      kode: "RWD-002",
      nama: "Upgrade ke Business Class",
      deskripsi: "Upgrade dari economy ke business class",
      penyedia: "Garuda Indonesia",
      tipe: "airline",
      miles: 25000,
      validStart: "2024-01-01",
      programEnd: "2025-12-31",
      active: true,
    },
    {
      kode: "RWD-003",
      nama: "Voucher Hotel Rp 500.000",
      deskripsi: "Voucher hotel Jabodetabek",
      penyedia: "Traveloka Partner",
      tipe: "partner",
      miles: 8000,
      validStart: "2024-06-01",
      programEnd: "2025-06-30",
      active: true,
    },
    {
      kode: "RWD-004",
      nama: "Akses Lounge 1x",
      deskripsi: "Akses lounge seluruh bandara mitra",
      penyedia: "Plaza Premium",
      tipe: "partner",
      miles: 3000,
      validStart: "2024-01-01",
      programEnd: "2025-12-31",
      active: false,
    },
  ]);

  const [providerFilter, setProviderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);

  const filteredRewards = rewards.filter((item) => {
    const matchProvider = providerFilter === "" || item.penyedia === providerFilter;
    const matchStatus =
      statusFilter === "" ||
      (statusFilter === "Aktif" && item.active) ||
      (statusFilter === "Tidak Aktif" && !item.active);

    return matchProvider && matchStatus;
  });

  const providers = [...new Set(rewards.map((item) => item.penyedia))];

  const openCreateModal = () => {
    setSelectedReward(null);
    setModalMode("create");
  };

  const openEditModal = (reward) => {
    setSelectedReward(reward);
    setModalMode("edit");
  };

  const openDeleteModal = (reward) => {
    setSelectedReward(reward);
    setModalMode("delete");
  };

  const handleSave = (formData) => {
    if (modalMode === "create") {
      const nextNumber = String(rewards.length + 1).padStart(3, "0");

      setRewards([
        ...rewards,
        {
          ...formData,
          kode: `RWD-${nextNumber}`,
          miles: Number(formData.miles),
          active: true,
        },
      ]);
    }

    if (modalMode === "edit") {
      setRewards((prev) =>
        prev.map((item) =>
          item.kode === selectedReward.kode
            ? { ...item, ...formData, miles: Number(formData.miles) }
            : item
        )
      );
    }

    setModalMode(null);
    setSelectedReward(null);
  };

  const handleDelete = () => {
    setRewards((prev) => prev.filter((item) => item.kode !== selectedReward.kode));
    setModalMode(null);
    setSelectedReward(null);
  };

  return (
    <div>
      <NavbarRole
        role="staff"
        userName="Mr. Admin Aero"
        roleLabel="Staff"
      />

      <div className="pt-32 px-16 pb-12 bg-background text-foreground min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[32px] font-bold">Kelola Hadiah & Penyedia</p>
            <p className="text-[15px] text-gray-500">
              Kelola katalog hadiah, data penyedia, miles, dan periode validitas hadiah.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-[#FFD22E] text-black px-5 py-3 rounded-[10px] font-semibold hover:bg-[#e6c12a] transition"
          >
            + Tambah Hadiah
          </button>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="bg-white text-black border border-[#E5E0C8] rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500 mr-2">Penyedia |</span>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="outline-none bg-transparent text-sm"
            >
              <option value="">Semua</option>
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white text-black border border-[#E5E0C8] rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500 mr-2">Status |</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="outline-none bg-transparent text-sm"
            >
              <option value="">Semua</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>

        <div className="bg-white text-black border border-[#E5E0C8] rounded-[18px] shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#FFF8E0] text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">Kode</th>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">Deskripsi</th>
                <th className="px-6 py-4 text-left">Penyedia</th>
                <th className="px-6 py-4 text-left">Miles</th>
                <th className="px-6 py-4 text-left">Periode</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EFE6C9]">
              {filteredRewards.map((item) => (
                <tr key={item.kode} className="hover:bg-[#FFFDF5]">
                  <td className="px-6 py-4 font-semibold">{item.kode}</td>
                  <td className="px-6 py-4 font-semibold">{item.nama}</td>
                  <td className="px-6 py-4 max-w-[250px] truncate text-gray-600">
                    {item.deskripsi}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">{item.penyedia}</p>
                    <span className="text-xs bg-[#FFF1B8] text-[#8A6A00] px-2 py-1 rounded-full">
                      {item.tipe}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {item.miles.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    {item.validStart} — {item.programEnd}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.active ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
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

              {filteredRewards.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada hadiah yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(modalMode === "create" || modalMode === "edit") && (
        <RewardFormModal
          mode={modalMode}
          reward={selectedReward}
          onClose={() => setModalMode(null)}
          onSave={handleSave}
        />
      )}

      {modalMode === "delete" && (
        <DeleteModal
          reward={selectedReward}
          onClose={() => setModalMode(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function RewardFormModal({ mode, reward, onClose, onSave }) {
  const [form, setForm] = useState({
    nama: reward?.nama || "",
    penyedia: reward?.penyedia || "",
    tipe: reward?.tipe || "airline",
    miles: reward?.miles || "",
    deskripsi: reward?.deskripsi || "",
    validStart: reward?.validStart || "",
    programEnd: reward?.programEnd || "",
    active: reward?.active ?? true,
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
        className="bg-white text-black rounded-[16px] w-[520px] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="text-[22px] font-bold">
              {mode === "create" ? "Tambah Hadiah Baru" : "Edit Hadiah"}
            </p>
            <p className="text-sm text-gray-500">
              {mode === "create"
                ? "Lengkapi data hadiah yang akan ditambahkan."
                : "Perbarui detail hadiah yang sudah tersedia."}
            </p>
          </div>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {mode === "edit" && (
          <Input label="Kode Hadiah" value={reward.kode} disabled />
        )}

        <Input
          label="Nama Hadiah"
          value={form.nama}
          onChange={(value) => updateForm("nama", value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Penyedia"
            value={form.penyedia}
            onChange={(value) => updateForm("penyedia", value)}
            options={[
              "Garuda Indonesia",
              "Traveloka Partner",
              "Plaza Premium",
              "Singapore Airlines",
            ]}
          />

          <Input
            label="Miles Dibutuhkan"
            type="number"
            value={form.miles}
            onChange={(value) => updateForm("miles", value)}
          />
        </div>

        <Select
          label="Tipe Penyedia"
          value={form.tipe}
          onChange={(value) => updateForm("tipe", value)}
          options={["airline", "partner"]}
        />

        <Textarea
          label="Deskripsi"
          value={form.deskripsi}
          onChange={(value) => updateForm("deskripsi", value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Valid Start"
            type="date"
            value={form.validStart}
            onChange={(value) => updateForm("validStart", value)}
          />

          <Input
            label="Program End"
            type="date"
            value={form.programEnd}
            onChange={(value) => updateForm("programEnd", value)}
          />
        </div>

        {mode === "edit" && (
          <div className="mt-3">
            <Select
              label="Status"
              value={form.active ? "Aktif" : "Tidak Aktif"}
              onChange={(value) => updateForm("active", value === "Aktif")}
              options={["Aktif", "Tidak Aktif"]}
            />
          </div>
        )}

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

function DeleteModal({ reward, onClose, onDelete }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[99999]"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-[16px] w-[430px] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[22px] font-bold mb-2">Hapus Hadiah?</p>
        <p className="text-sm text-gray-600 mb-5">
          Hadiah <span className="font-semibold">{reward.nama}</span> akan dihapus
          dari daftar. Pastikan hadiah ini sudah tidak digunakan.
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
        className="h-[42px] border border-[#B7B6B6] rounded-[8px] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <p className="font-semibold text-sm">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[85px] border border-[#B7B6B6] rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <p className="font-semibold text-sm">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[42px] border border-[#B7B6B6] rounded-[8px] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
      >
        <option value="">Pilih data</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}