"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

export default function DataMember() {
    const [members, setMembers] = useState([
        {
            id: 1,
            nomorMember: "M0001",
            email: "john@example.com",
            salutation: "Mr.",
            namaDepan: "John",
            namaTengah: "William",
            namaBelakang: "Doe",
            kewarganegaraan: "Indonesia",
            countryCode: "+62",
            nomorHp: "81234567890",
            tanggalLahir: "1970-07-12",
            tier: "Gold",
            totalMiles: 50000,
            awardMiles: 32000,
            bergabung: "2024-01-15",
        },
        {
            id: 2,
            nomorMember: "M0002",
            email: "jane@example.com",
            salutation: "Ms.",
            namaDepan: "Jane",
            namaTengah: "",
            namaBelakang: "Smith",
            kewarganegaraan: "Indonesia",
            countryCode: "+62",
            nomorHp: "81345678900",
            tanggalLahir: "1998-04-22",
            tier: "Silver",
            totalMiles: 21000,
            awardMiles: 15000,
            bergabung: "2024-03-13",
        },
        {
            id: 3,
            nomorMember: "M0003",
            email: "budi@example.com",
            salutation: "Mr.",
            namaDepan: "Budi",
            namaTengah: "Anto",
            namaBelakang: "Santoso",
            kewarganegaraan: "Indonesia",
            countryCode: "+62",
            nomorHp: "81456789012",
            tanggalLahir: "1999-02-10",
            tier: "Bronze",
            totalMiles: 8000,
            awardMiles: 4000,
            bergabung: "2024-02-20",
        },
        {
            id: 4,
            nomorMember: "M0004",
            email: "lemon@example.com",
            salutation: "Mr.",
            namaDepan: "John",
            namaTengah: "",
            namaBelakang: "Lemon",
            kewarganegaraan: "Indonesia",
            countryCode: "+62",
            nomorHp: "81567890123",
            tanggalLahir: "2000-11-19",
            tier: "Gold",
            totalMiles: 41000,
            awardMiles: 26000,
            bergabung: "2024-04-12",
        },
    ]);

    const emptyForm = {
        email: "",
        password: "",
        salutation: "Mr.",
        namaDepan: "",
        namaTengah: "",
        namaBelakang: "",
        kewarganegaraan: "Indonesia",
        countryCode: "+62",
        nomorHp: "",
        tanggalLahir: "",
        tier: "Bronze",
    };

    const [search, setSearch] = useState("");
    const [tierFilter, setTierFilter] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editMember, setEditMember] = useState(null);
    const [deleteMember, setDeleteMember] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const formatMiles = (value) => Number(value).toLocaleString("en-US");

    const filteredMembers = members.filter((member) => {
        const fullName = `${member.namaDepan} ${member.namaTengah} ${member.namaBelakang}`.toLowerCase();
        const keyword = search.toLowerCase();

        const matchesSearch =
            member.nomorMember.toLowerCase().includes(keyword) ||
            member.email.toLowerCase().includes(keyword) ||
            fullName.includes(keyword);

        const matchesTier = tierFilter === "" || member.tier === tierFilter;

        return matchesSearch && matchesTier;
    });

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

    const handleAddMember = () => {
        if (
            !form.email ||
            !form.password ||
            !form.namaDepan ||
            !form.namaBelakang ||
            !form.nomorHp ||
            !form.tanggalLahir
        ) {
            alert("Mohon lengkapi data member terlebih dahulu.");
            return;
        }

        const newNumber = `M${String(members.length + 1).padStart(4, "0")}`;

        const newMember = {
            id: Date.now(),
            nomorMember: newNumber,
            email: form.email,
            salutation: form.salutation,
            namaDepan: form.namaDepan,
            namaTengah: form.namaTengah,
            namaBelakang: form.namaBelakang,
            kewarganegaraan: form.kewarganegaraan,
            countryCode: form.countryCode,
            nomorHp: form.nomorHp,
            tanggalLahir: form.tanggalLahir,
            tier: "Bronze",
            totalMiles: 0,
            awardMiles: 0,
            bergabung: new Date().toISOString().split("T")[0],
        };

        setMembers((prev) => [newMember, ...prev]);
        setIsAddOpen(false);
        setForm(emptyForm);
    };

    const openEditModal = (member) => {
        setEditMember(member);
        setForm({
            email: member.email,
            password: "",
            salutation: member.salutation,
            namaDepan: member.namaDepan,
            namaTengah: member.namaTengah,
            namaBelakang: member.namaBelakang,
            kewarganegaraan: member.kewarganegaraan,
            countryCode: member.countryCode,
            nomorHp: member.nomorHp,
            tanggalLahir: member.tanggalLahir,
            tier: member.tier,
        });
    };

    const handleEditMember = () => {
        setMembers((prev) =>
            prev.map((member) =>
                member.id === editMember.id
                    ? {
                        ...member,
                        salutation: form.salutation,
                        namaDepan: form.namaDepan,
                        namaTengah: form.namaTengah,
                        namaBelakang: form.namaBelakang,
                        kewarganegaraan: form.kewarganegaraan,
                        countryCode: form.countryCode,
                        nomorHp: form.nomorHp,
                        tanggalLahir: form.tanggalLahir,
                        tier: form.tier,
                    }
                    : member
            )
        );

        setEditMember(null);
        setForm(emptyForm);
    };

    const handleDeleteMember = () => {
        setMembers((prev) =>
            prev.filter((member) => member.id !== deleteMember.id)
        );

        setDeleteMember(null);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
            <NavbarRole role="staff" userName="Admin Staff" roleLabel="Staff" />

            <div className="pt-32 px-4 sm:px-8 lg:px-16 pb-12">
                {/* HEADER */}
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[32px] font-bold text-black dark:text-gray-100">
                            Kelola Member
                        </p>
                        <p className="text-[16px] text-gray-600 dark:text-gray-300">
                            Kelola data member yang terdaftar di sistem AeroMiles.
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="h-[45px] px-5 bg-[#FFD22E] rounded-[10px] text-[16px] font-semibold text-black hover:bg-[#e6c12a] transition"
                    >
                        + Tambah Member
                    </button>
                </div>

                {/* FILTER CARD */}
                <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm p-6 mb-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau nomor member..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-[480px] h-[42px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[10px] px-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
                        />

                        <select
                            value={tierFilter}
                            onChange={(e) => setTierFilter(e.target.value)}
                            className="w-full md:w-[180px] h-[42px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[10px] px-3 focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
                        >
                            <option value="">Semua Tier</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                        </select>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-[22px] font-semibold text-black dark:text-gray-100">
                            Daftar Member
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total {filteredMembers.length} member ditampilkan
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#FFF8E0] dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 text-left">No. Member</th>
                                    <th className="px-6 py-4 text-left">Nama</th>
                                    <th className="px-6 py-4 text-left">Email</th>
                                    <th className="px-6 py-4 text-left">Tier</th>
                                    <th className="px-6 py-4 text-left">Total Miles</th>
                                    <th className="px-6 py-4 text-left">Award Miles</th>
                                    <th className="px-6 py-4 text-left">Bergabung</th>
                                    <th className="px-6 py-4 text-left">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <td className="px-6 py-4 font-semibold text-black dark:text-gray-100">
                                            {member.nomorMember}
                                        </td>

                                        <td className="px-6 py-4 text-black dark:text-gray-100">
                                            {member.salutation} {member.namaDepan}{" "}
                                            {member.namaTengah} {member.namaBelakang}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {member.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <TierBadge tier={member.tier} />
                                        </td>

                                        <td className="px-6 py-4 font-medium text-black dark:text-gray-100">
                                            {formatMiles(member.totalMiles)}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-black dark:text-gray-100">
                                            {formatMiles(member.awardMiles)}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {member.bergabung}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => openEditModal(member)}
                                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                                    title="Edit"
                                                >
                                                    ✎
                                                </button>

                                                <button
                                                    onClick={() => setDeleteMember(member)}
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Hapus"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredMembers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Tidak ada member yang sesuai dengan pencarian.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAddOpen && (
                <MemberModal
                    title="Tambah Member Baru"
                    form={form}
                    onChange={handleChange}
                    onClose={() => setIsAddOpen(false)}
                    onSave={handleAddMember}
                    mode="add"
                />
            )}

            {editMember && (
                <MemberModal
                    title="Edit Member"
                    form={form}
                    onChange={handleChange}
                    onClose={() => setEditMember(null)}
                    onSave={handleEditMember}
                    mode="edit"
                />
            )}

            {deleteMember && (
                <DeleteModal
                    member={deleteMember}
                    onClose={() => setDeleteMember(null)}
                    onConfirm={handleDeleteMember}
                />
            )}
        </div>
    );
}

function TierBadge({ tier }) {
    const style =
        tier === "Gold"
            ? "bg-[#FFF1B8] dark:bg-[#FFD22E]/20 text-[#8A6A00] dark:text-[#FFD22E]"
            : tier === "Silver"
                ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
            {tier}
        </span>
    );
}

function MemberModal({ title, form, onChange, onClose, onSave, mode }) {
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
                    Lengkapi data member sesuai kebutuhan.
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {mode === "add" && (
                        <>
                            <Input
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(value) => onChange("email", value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={form.password}
                                onChange={(value) => onChange("password", value)}
                            />
                        </>
                    )}

                    <SelectInput
                        label="Salutation"
                        value={form.salutation}
                        onChange={(value) => onChange("salutation", value)}
                        options={["Mr.", "Ms.", "Mrs."]}
                    />

                    <Input
                        label="Nama Depan"
                        value={form.namaDepan}
                        onChange={(value) => onChange("namaDepan", value)}
                    />

                    <Input
                        label="Nama Tengah"
                        value={form.namaTengah}
                        onChange={(value) => onChange("namaTengah", value)}
                    />

                    <Input
                        label="Nama Belakang"
                        value={form.namaBelakang}
                        onChange={(value) => onChange("namaBelakang", value)}
                    />

                    <SelectInput
                        label="Kewarganegaraan"
                        value={form.kewarganegaraan}
                        onChange={(value) => onChange("kewarganegaraan", value)}
                        options={["Indonesia", "Malaysia", "Singapore", "Thailand"]}
                    />

                    <SelectInput
                        label="Country Code"
                        value={form.countryCode}
                        onChange={(value) => onChange("countryCode", value)}
                        options={["+62", "+60", "+65", "+66"]}
                    />

                    <Input
                        label="Nomor HP"
                        value={form.nomorHp}
                        onChange={(value) => onChange("nomorHp", value)}
                    />

                    <Input
                        label="Tanggal Lahir"
                        type="date"
                        value={form.tanggalLahir}
                        onChange={(value) => onChange("tanggalLahir", value)}
                    />

                    {mode === "edit" && (
                        <SelectInput
                            label="Tier"
                            value={form.tier}
                            onChange={(value) => onChange("tier", value)}
                            options={["Bronze", "Silver", "Gold"]}
                        />
                    )}
                </div>

                <div className="flex justify-end mt-5">
                    <button
                        onClick={onSave}
                        className="w-[90px] h-[36px] bg-[#003566] text-white rounded-[8px] text-[12px] font-semibold hover:bg-[#00294f] transition"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}

function DeleteModal({ member, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative bg-white dark:bg-[#111827] text-black dark:text-gray-100 w-[430px] rounded-[14px] shadow-2xl p-6 z-10 border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-[18px] mb-2">Hapus Member?</p>

                <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-5">
                    Semua data terkait{" "}
                    <span className="font-semibold text-black dark:text-gray-100">
                        {member.namaDepan} {member.namaBelakang}
                    </span>{" "}
                    akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-[8px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[12px] font-semibold hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Batal
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-[8px] bg-[#003566] text-white text-[12px] font-semibold hover:bg-[#00294f]"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

function Input({ label, type = "text", value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-[11px] text-black dark:text-gray-100">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-[32px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[7px] px-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
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
                className="h-[32px] bg-white dark:bg-gray-900 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-[7px] px-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
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