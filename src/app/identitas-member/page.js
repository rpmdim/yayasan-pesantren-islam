"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function IdentitasMember() {
    // Data dummy awal untuk daftar identitas member.
    // Nanti kalau sudah connect backend/database, bagian ini bisa diganti fetch API.
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

    // Template form kosong untuk tambah/edit identitas.
    const emptyForm = {
        nomorDokumen: "",
        jenisDokumen: "Paspor",
        negaraPenerbit: "Indonesia",
        tanggalTerbit: "",
        tanggalHabis: "",
    };

    // State untuk modal tambah, modal edit, modal hapus, dan form.
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editIdentitas, setEditIdentitas] = useState(null);
    const [deleteIdentitas, setDeleteIdentitas] = useState(null);
    const [form, setForm] = useState(emptyForm);

    // Tanggal patokan dummy untuk menentukan status aktif/kedaluwarsa.
    // Dipakai supaya hasil render stabil dan tidak memicu hydration error.
    const today = "2025-01-01";

    // Menentukan status identitas berdasarkan tanggal habis.
    const getStatus = (tanggalHabis) => {
        return tanggalHabis < today ? "Kedaluwarsa" : "Aktif";
    };

    // Mengubah value form berdasarkan nama field.
    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Membuka modal tambah identitas.
    const openAddModal = () => {
        setForm(emptyForm);
        setIsAddOpen(true);
    };

    // Menambahkan identitas baru.
    const handleAddIdentitas = () => {
        // Validasi sederhana supaya field penting tidak kosong.
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

        // Validasi nomor dokumen harus unik.
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

    // Membuka modal edit dan mengisi form dengan data identitas yang dipilih.
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

    // Menyimpan perubahan identitas.
    // Nomor dokumen tidak diubah sesuai ketentuan soal.
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

    // Menghapus identitas yang dipilih.
    const handleDeleteIdentitas = () => {
        setIdentitas((prev) =>
            prev.filter((item) => item.id !== deleteIdentitas.id)
        );

        setDeleteIdentitas(null);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
            {/* Navbar member karena fitur ini hanya dapat diakses oleh Member */}
            <NavbarRole role="member" userName="John Doe" roleLabel="Member" />

            {/* Konten utama */}
            <div className="pt-32 px-4 sm:px-8 lg:px-10 pb-10">
                {/* Header halaman */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="font-bold text-[25px] text-black dark:text-gray-100">Identitas Saya</p>
                        <p className="text-[15px] text-gray-600 dark:text-gray-300">
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

                {/* Tabel daftar identitas */}
                <div className="bg-white dark:bg-[#111827] rounded-[10px] shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden max-w-[950px] mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-800 dark:text-gray-100">
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
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/70">
                                            <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-100">
                                                {item.nomorDokumen}
                                            </td>

                                            <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                                                {item.jenisDokumen}
                                            </td>

                                            <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                                                {item.negaraPenerbit}
                                            </td>

                                            <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                                                {item.tanggalTerbit}
                                            </td>

                                            <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                                                {item.tanggalHabis}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Aktif"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        onClick={() => setDeleteIdentitas(item)}
                                                        className="text-red-600 hover:text-red-800"
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

            {/* Modal tambah identitas */}
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

            {/* Modal edit identitas */}
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

            {/* Modal hapus identitas */}
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

// Modal untuk tambah dan edit identitas.
function IdentitasModal({ title, form, onChange, onClose, onSave, mode }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            {/* Overlay gelap seperti contoh implementasi */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            {/* Box modal */}
            <div className="relative bg-white dark:bg-[#111827] text-black dark:text-gray-100 border border-gray-200 dark:border-gray-700 w-[430px] rounded-[8px] shadow-xl p-6 z-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-gray-100 text-[18px]"
                >
                    ×
                </button>

                <p className="font-semibold text-[15px] mb-4 text-black dark:text-gray-100">{title}</p>

                <div className="flex flex-col gap-3">
                    {/* Nomor dokumen hanya bisa diisi saat tambah.
              Saat edit dibuat disabled karena ketentuan: nomor dokumen tidak dapat diubah. */}
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
                        className="w-[85px] h-[34px] bg-[#003566] text-white rounded-[6px] text-[12px] font-semibold hover:bg-[#00294f] transition"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

// Modal konfirmasi hapus identitas.
function DeleteModal({ item, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative bg-white dark:bg-[#111827] text-black dark:text-gray-100 border border-gray-200 dark:border-gray-700 w-[430px] rounded-[8px] shadow-xl p-6 z-10">
                <p className="font-semibold text-[16px] mb-2 text-black dark:text-gray-100">
                    Hapus Identitas?
                </p>

                <p className="text-[12px] text-gray-600 dark:text-gray-300 mb-5">
                    Identitas dengan nomor dokumen{" "}
                    <span className="font-semibold">{item.nomorDokumen}</span> akan
                    dihapus. Tindakan ini tidak dapat dibatalkan.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-[6px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 text-[12px] font-semibold hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Batal
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-[6px] bg-[#003566] text-white text-[12px] font-semibold hover:bg-[#00294f]"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

// Component input reusable agar field form tidak ditulis berulang.
function Input({ label, type = "text", value, onChange, disabled = false }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-[10px] text-black dark:text-gray-200">{label}</label>

            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`h-[30px] border border-gray-300 dark:border-gray-700 rounded-[5px] px-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-yellow-400 ${disabled
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-white dark:bg-gray-900 text-black dark:text-gray-100"
                    }`}
            />
        </div>
    );
}

// Component select reusable agar dropdown form tidak ditulis berulang.
function SelectInput({ label, value, onChange, options }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-[10px] text-black dark:text-gray-200">{label}</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-[30px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[5px] px-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-yellow-400 [color-scheme:light] dark:[color-scheme:dark]"
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