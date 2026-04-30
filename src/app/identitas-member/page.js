"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function IdentitasMember() {
    const [identitas, setIdentitas] = useState([
        {
            id: 1,
            nomorDokumen: "A12345678",
            jenisDokumen: "Paspor",
            negaraPenerbit: "Indonesia",
            tanggalTerbit: "2020-01-15",
            tanggalHabis: "2030-01-15",
        },
        {
            id: 2,
            nomorDokumen: "3275012345678901",
            jenisDokumen: "KTP",
            negaraPenerbit: "Indonesia",
            tanggalTerbit: "2019-06-01",
            tanggalHabis: "2024-06-01",
        },
        {
            id: 3,
            nomorDokumen: "SIM0001",
            jenisDokumen: "SIM",
            negaraPenerbit: "Indonesia",
            tanggalTerbit: "2024-04-12",
            tanggalHabis: "2031-04-25",
        },
    ]);

    const emptyForm = {
        nomorDokumen: "",
        jenisDokumen: "Paspor",
        negaraPenerbit: "Indonesia",
        tanggalTerbit: "",
        tanggalHabis: "",
    };

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editIdentitas, setEditIdentitas] = useState(null);
    const [deleteIdentitas, setDeleteIdentitas] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const today = new Date().toISOString().split("T")[0];

    const getStatus = (tanggalHabis) => {
        return tanggalHabis < today ? "Kedaluwarsa" : "Aktif";
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const openAddModal = () => {
        setForm(emptyForm);
        setIsAddOpen(true);
    };

    const handleAddIdentitas = () => {
        if (
            !form.nomorDokumen ||
            !form.jenisDokumen ||
            !form.negaraPenerbit ||
            !form.tanggalTerbit ||
            !form.tanggalHabis
        ) {
            alert("Mohon lengkapi data identitas terlebih dahulu.");
            return;
        }

        const isDuplicate = identitas.some(
            (item) => item.nomorDokumen === form.nomorDokumen
        );

        if (isDuplicate) {
            alert("Nomor dokumen sudah terdaftar. Gunakan nomor dokumen lain.");
            return;
        }

        const newIdentitas = {
            id: Date.now(),
            ...form,
        };

        setIdentitas((prev) => [newIdentitas, ...prev]);
        setIsAddOpen(false);
        setForm(emptyForm);
    };

    const openEditModal = (item) => {
        setEditIdentitas(item);
        setForm({
            nomorDokumen: item.nomorDokumen,
            jenisDokumen: item.jenisDokumen,
            negaraPenerbit: item.negaraPenerbit,
            tanggalTerbit: item.tanggalTerbit,
            tanggalHabis: item.tanggalHabis,
        });
    };

    const handleEditIdentitas = () => {
        if (
            !form.jenisDokumen ||
            !form.negaraPenerbit ||
            !form.tanggalTerbit ||
            !form.tanggalHabis
        ) {
            alert("Mohon lengkapi data identitas terlebih dahulu.");
            return;
        }

        setIdentitas((prev) =>
            prev.map((item) =>
                item.id === editIdentitas.id
                    ? {
                        ...item,
                        jenisDokumen: form.jenisDokumen,
                        negaraPenerbit: form.negaraPenerbit,
                        tanggalTerbit: form.tanggalTerbit,
                        tanggalHabis: form.tanggalHabis,
                    }
                    : item
            )
        );

        setEditIdentitas(null);
        setForm(emptyForm);
    };

    const handleDeleteIdentitas = () => {
        setIdentitas((prev) =>
            prev.filter((item) => item.id !== deleteIdentitas.id)
        );

        setDeleteIdentitas(null);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
            <NavbarRole />

            <div className="pt-32 px-4 sm:px-8 lg:px-16 pb-12">
                {/* HEADER */}
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[32px] font-bold text-black dark:text-gray-100">
                            Identitas Saya
                        </p>
                        <p className="text-[16px] text-gray-600 dark:text-gray-300">
                            Kelola dokumen identitas yang terdaftar pada akun Anda.
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="h-[45px] px-5 bg-[#FFD22E] rounded-[10px] text-[16px] font-semibold text-black hover:bg-[#e6c12a] transition"
                    >
                        + Tambah Identitas
                    </button>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-[22px] font-semibold text-black dark:text-gray-100">
                            Daftar Identitas
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total {identitas.length} dokumen identitas terdaftar
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#FFF8E0] dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 text-left">No. Dokumen</th>
                                    <th className="px-6 py-4 text-left">Jenis</th>
                                    <th className="px-6 py-4 text-left">Negara</th>
                                    <th className="px-6 py-4 text-left">Terbit</th>
                                    <th className="px-6 py-4 text-left">Habis</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {identitas.map((item) => {
                                    const status = getStatus(item.tanggalHabis);

                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <td className="px-6 py-4 font-semibold text-black dark:text-gray-100">
                                                {item.nomorDokumen}
                                            </td>

                                            <td className="px-6 py-4 text-black dark:text-gray-100">
                                                {item.jenisDokumen}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {item.negaraPenerbit}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {item.tanggalTerbit}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                                {item.tanggalHabis}
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={status} />
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="text-gray-700 dark:text-gray-300 hover:text-[#CCA825]"
                                                        title="Edit"
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        onClick={() => setDeleteIdentitas(item)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Hapus"
                                                    >
                                                        🗑
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {identitas.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Belum ada identitas yang terdaftar.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddOpen && (
                <IdentitasModal
                    title="Tambah Identitas Baru"
                    form={form}
                    onChange={handleChange}
                    onClose={() => setIsAddOpen(false)}
                    onSave={handleAddIdentitas}
                    mode="add"
                />
            )}

            {editIdentitas && (
                <IdentitasModal
                    title="Edit Identitas"
                    form={form}
                    onChange={handleChange}
                    onClose={() => setEditIdentitas(null)}
                    onSave={handleEditIdentitas}
                    mode="edit"
                />
            )}

            {deleteIdentitas && (
                <DeleteModal
                    item={deleteIdentitas}
                    onClose={() => setDeleteIdentitas(null)}
                    onConfirm={handleDeleteIdentitas}
                />
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const style =
        status === "Aktif"
            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
            {status}
        </span>
    );
}

function IdentitasModal({ title, form, onChange, onClose, onSave, mode }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative bg-white dark:bg-[#111827] text-black dark:text-gray-100 w-[430px] rounded-[14px] shadow-2xl p-6 z-10 border border-gray-200 dark:border-gray-700">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black dark:hover:text-white text-[18px]"
                >
                    ×
                </button>

                <p className="font-semibold text-[18px] mb-1">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                    Lengkapi data dokumen identitas member.
                </p>

                <div className="flex flex-col gap-3">
                    <Input
                        label="Nomor Dokumen"
                        value={form.nomorDokumen}
                        onChange={(value) => onChange("nomorDokumen", value)}
                        disabled={mode === "edit"}
                    />

                    <SelectInput
                        label="Jenis Dokumen"
                        value={form.jenisDokumen}
                        onChange={(value) => onChange("jenisDokumen", value)}
                        options={["Paspor", "KTP", "SIM"]}
                    />

                    <SelectInput
                        label="Negara Penerbit"
                        value={form.negaraPenerbit}
                        onChange={(value) => onChange("negaraPenerbit", value)}
                        options={["Indonesia", "Malaysia", "Singapore", "Thailand"]}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Tanggal Terbit"
                            type="date"
                            value={form.tanggalTerbit}
                            onChange={(value) => onChange("tanggalTerbit", value)}
                        />

                        <Input
                            label="Tanggal Habis"
                            type="date"
                            value={form.tanggalHabis}
                            onChange={(value) => onChange("tanggalHabis", value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button
                        onClick={onSave}
                        className="w-[90px] h-[36px] bg-[#FFD22E] text-black rounded-[8px] text-[12px] font-semibold hover:bg-[#e6c12a] transition"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

function DeleteModal({ item, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative bg-white dark:bg-[#111827] text-black dark:text-gray-100 w-[430px] rounded-[14px] shadow-2xl p-6 z-10 border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-[18px] mb-2">Hapus Identitas?</p>

                <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-5">
                    Identitas dengan nomor dokumen{" "}
                    <span className="font-semibold text-black dark:text-gray-100">
                        {item.nomorDokumen}
                    </span>{" "}
                    akan dihapus. Tindakan ini tidak dapat dibatalkan.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="w-[78px] h-[44px] rounded-[8px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[16px] font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        Batal
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-[96px] h-[44px] rounded-[8px] bg-[#FFD22E] text-black text-[16px] font-semibold hover:bg-[#e6c12a] transition"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, type = "text", value, onChange, disabled = false }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-[11px] text-black dark:text-gray-100">
                {label}
            </label>

            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`h-[32px] border border-gray-300 dark:border-gray-700 rounded-[7px] px-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FFD22E] dark:[color-scheme:dark] ${disabled
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-900 text-black dark:text-gray-100"
                    }`}
            />
        </div>
    );
}

function SelectInput({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-[11px] text-black dark:text-gray-100">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-[32px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[7px] px-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FFD22E] [color-scheme:light] dark:[color-scheme:dark]"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}