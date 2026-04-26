"use client";

import { useMemo, useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

const memberInitialProfile = {
	email: "john@example.com",
	nomorMember: "M0001",
	tanggalBergabung: "2024-01-15",
	salutation: "Mr.",
	namaDepan: "John",
	namaTengah: "William",
	namaBelakang: "Doe",
	kewarganegaraan: "Indonesia",
	countryCode: "+62",
	nomorHp: "81234567890",
	tanggalLahir: "1990-05-15",
	idStaf: "",
	kodeMaskapai: "",
};

const staffInitialProfile = {
	email: "admin@aeromiles.com",
	nomorMember: "",
	tanggalBergabung: "",
	salutation: "Mr.",
	namaDepan: "Admin",
	namaTengah: "",
	namaBelakang: "Aero",
	kewarganegaraan: "Indonesia",
	countryCode: "+62",
	nomorHp: "8111111111",
	tanggalLahir: "1988-01-01",
	idStaf: "S1001",
	kodeMaskapai: "GA - Garuda Indonesia",
};

const roles = {
	member: {
		userName: "John Doe",
		roleLabel: "Member",
		profile: memberInitialProfile,
	},
	staff: {
		userName: "Admin Aero",
		roleLabel: "Staf",
		profile: staffInitialProfile,
	},
};

const countryOptions = ["Indonesia", "Malaysia", "Singapore", "Thailand", "Australia"];
const codeOptions = ["+62", "+60", "+65", "+66", "+61"];
const airlineOptions = [
	"GA - Garuda Indonesia",
	"SQ - Singapore Airlines",
	"MH - Malaysia Airlines",
	"TG - Thai Airways",
];

const selectClassName =
	"mt-1 w-full h-[42px] rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:!bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFD22E] dark:[color-scheme:dark]";

export default function PengaturanProfilPage() {
	const [activeRole, setActiveRole] = useState("member");
	const [profiles, setProfiles] = useState({
		member: memberInitialProfile,
		staff: staffInitialProfile,
	});
	const [isPasswordOpen, setIsPasswordOpen] = useState(false);
	const [passwords, setPasswords] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [savedMessage, setSavedMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");

	const currentProfile = profiles[activeRole];
	const currentRoleMeta = roles[activeRole];

	const expectedOldPassword = useMemo(
		() => (activeRole === "member" ? "member123" : "staff123"),
		[activeRole]
	);

	const updateProfileField = (field, value) => {
		setProfiles((prev) => ({
			...prev,
			[activeRole]: {
				...prev[activeRole],
				[field]: value,
			},
		}));
	};

	const handleSaveProfile = () => {
		if (
			!currentProfile.namaDepan ||
			!currentProfile.namaBelakang ||
			!currentProfile.countryCode ||
			!currentProfile.nomorHp ||
			!currentProfile.kewarganegaraan ||
			!currentProfile.tanggalLahir
		) {
			alert("Mohon lengkapi data profil yang wajib diisi.");
			return;
		}

		if (activeRole === "staff" && !currentProfile.kodeMaskapai) {
			alert("Kode maskapai wajib dipilih untuk akun staf.");
			return;
		}

		setSavedMessage("Perubahan profil berhasil disimpan.");
	};

	const resetPasswordModal = () => {
		setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
		setPasswordMessage("");
	};

	const openPasswordModal = () => {
		resetPasswordModal();
		setIsPasswordOpen(true);
	};

	const handleChangePassword = () => {
		if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
			setPasswordMessage("Semua field password wajib diisi.");
			return;
		}

		if (passwords.oldPassword !== expectedOldPassword) {
			setPasswordMessage("Password lama tidak sesuai.");
			return;
		}

		if (passwords.newPassword.length < 8) {
			setPasswordMessage("Password baru minimal 8 karakter.");
			return;
		}

		if (passwords.newPassword !== passwords.confirmPassword) {
			setPasswordMessage("Konfirmasi password baru tidak sama.");
			return;
		}

		setPasswordMessage("Password berhasil diperbarui.");
		setTimeout(() => {
			setIsPasswordOpen(false);
			resetPasswordModal();
		}, 700);
	};

	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
			<NavbarRole
				role={activeRole}
				userName={currentRoleMeta.userName}
				roleLabel={currentRoleMeta.roleLabel}
			/>

			<main className="pt-32 pb-12 px-4 sm:px-6 lg:px-10">
				<div className="max-w-[760px] mx-auto space-y-4">
					<section className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[12px] p-4 sm:p-6 shadow-sm transition-colors">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<div>
								<p className="font-bold text-[24px] leading-tight text-black dark:text-gray-100">Pengaturan Profil</p>
								<p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1">
									Lihat dan perbarui data profil Anda sesuai peran akun.
								</p>
							</div>

							<div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-[10px] w-full sm:w-auto transition-colors">
								<button
									type="button"
									onClick={() => {
										setActiveRole("member");
										setSavedMessage("");
									}}
									className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition w-1/2 sm:w-auto ${
										activeRole === "member"
											? "bg-[#FFD22E] text-black"
											: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
									}`}
								>
									Preview Member
								</button>

								<button
									type="button"
									onClick={() => {
										setActiveRole("staff");
										setSavedMessage("");
									}}
									className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition w-1/2 sm:w-auto ${
										activeRole === "staff"
											? "bg-[#FFD22E] text-black"
											: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
									}`}
								>
									Preview Staf
								</button>
							</div>
						</div>
					</section>

					<section className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[12px] p-4 sm:p-6 shadow-sm transition-colors">
						<p className="text-[20px] font-semibold text-black dark:text-gray-100 mb-5">Data Profil</p>

						<div className="space-y-4">
							<div>
								<label className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">Email</label>
								<input
									type="email"
									value={currentProfile.email}
									disabled
									className="mt-1 w-full h-[42px] rounded-[8px] border border-gray-200 dark:border-gray-700 px-3 text-[14px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
								/>
							</div>

							{activeRole === "member" ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<Field
										label="Nomor Member"
										value={currentProfile.nomorMember}
										disabled
									/>
									<Field
										label="Tanggal Bergabung"
										value={currentProfile.tanggalBergabung}
										disabled
									/>
								</div>
							) : (
								<Field label="ID Staf" value={currentProfile.idStaf} disabled />
							)}

							<div>
								<label className="text-[13px] text-gray-700 font-medium">Salutation</label>
								<select
									value={currentProfile.salutation}
									onChange={(e) => updateProfileField("salutation", e.target.value)}
									className={selectClassName}
								>
									<option value="Mr.">Mr.</option>
									<option value="Mrs.">Mrs.</option>
									<option value="Ms.">Ms.</option>
                                    <option value="Dr.">Dr.</option>
								</select>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<EditableField
									label="Nama Depan"
									value={currentProfile.namaDepan}
									onChange={(val) => updateProfileField("namaDepan", val)}
								/>

								<EditableField
									label="Nama Tengah"
									value={currentProfile.namaTengah}
									onChange={(val) => updateProfileField("namaTengah", val)}
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<EditableField
									label="Nama Belakang"
									value={currentProfile.namaBelakang}
									onChange={(val) => updateProfileField("namaBelakang", val)}
								/>

								<div>
									<label className="text-[13px] text-gray-700 font-medium">Kewarganegaraan</label>
									<select
										value={currentProfile.kewarganegaraan}
										onChange={(e) => updateProfileField("kewarganegaraan", e.target.value)}
										className={selectClassName}
									>
										{countryOptions.map((country) => (
											<option key={country} value={country}>
												{country}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="text-[13px] text-gray-700 font-medium">Country Code</label>
									<select
										value={currentProfile.countryCode}
										onChange={(e) => updateProfileField("countryCode", e.target.value)}
										className={selectClassName}
									>
										{codeOptions.map((code) => (
											<option key={code} value={code}>
												{code}
											</option>
										))}
									</select>
								</div>

								<EditableField
									label="Nomor HP"
									value={currentProfile.nomorHp}
									onChange={(val) => updateProfileField("nomorHp", val)}
									type="tel"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<EditableField
									label="Tanggal Lahir"
									value={currentProfile.tanggalLahir}
									onChange={(val) => updateProfileField("tanggalLahir", val)}
									type="date"
								/>

								{activeRole === "staff" ? (
									<div>
										<label className="text-[13px] text-gray-700 font-medium">Kode Maskapai</label>
										<select
											value={currentProfile.kodeMaskapai}
											onChange={(e) => updateProfileField("kodeMaskapai", e.target.value)}
											className={selectClassName}
										>
											<option value="">Pilih Kode Maskapai</option>
											{airlineOptions.map((airline) => (
												<option key={airline} value={airline}>
													{airline}
												</option>
											))}
										</select>
									</div>
								) : (
									<div />
								)}
							</div>
						</div>

						{savedMessage ? (
							<p className="mt-5 text-[13px] text-green-700 font-medium">{savedMessage}</p>
						) : null}

						<button
							type="button"
							onClick={handleSaveProfile}
							className="mt-5 h-[40px] px-5 bg-[#FFD22E] rounded-[8px] text-[14px] font-semibold text-black hover:bg-[#e6c12a] transition"
						>
							Simpan Perubahan
						</button>
					</section>

					<section className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[12px] p-4 sm:p-6 shadow-sm transition-colors">
						<p className="text-[20px] font-semibold text-black dark:text-gray-100">Ubah Password</p>
						<p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1 mb-4">
							Sistem akan memvalidasi password lama sebelum menyimpan password baru.
						</p>

						<button
							type="button"
							onClick={openPasswordModal}
							className="h-[40px] px-5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-[8px] text-[14px] font-semibold text-black dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
						>
							Ubah Password
						</button>
					</section>
				</div>
			</main>

			{isPasswordOpen && (
				<div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
					<div
						className="absolute inset-0 bg-black/55"
						onClick={() => setIsPasswordOpen(false)}
					/>

					<div className="relative z-10 bg-white dark:bg-[#111827] w-full max-w-[430px] rounded-[10px] shadow-xl p-5 border border-gray-200 dark:border-gray-700 transition-colors">
						<div className="flex justify-between items-start mb-4">
							<p className="text-[20px] font-bold text-black dark:text-gray-100">Ubah Password</p>

							<button
								type="button"
								onClick={() => setIsPasswordOpen(false)}
								className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-100 text-[18px] leading-none"
							>
								×
							</button>
						</div>

						<div className="space-y-3">
							<PasswordField
								label="Password Lama"
								value={passwords.oldPassword}
								onChange={(val) =>
									setPasswords((prev) => ({
										...prev,
										oldPassword: val,
									}))
								}
							/>

							<PasswordField
								label="Password Baru"
								value={passwords.newPassword}
								onChange={(val) =>
									setPasswords((prev) => ({
										...prev,
										newPassword: val,
									}))
								}
							/>

							<PasswordField
								label="Konfirmasi Password Baru"
								value={passwords.confirmPassword}
								onChange={(val) =>
									setPasswords((prev) => ({
										...prev,
										confirmPassword: val,
									}))
								}
							/>
						</div>

						{passwordMessage ? (
							<p
								className={`mt-4 text-[13px] font-medium ${
									passwordMessage.includes("berhasil")
										? "text-green-700"
										: "text-red-600"
								}`}
							>
								{passwordMessage}
							</p>
						) : null}

						<button
							type="button"
							onClick={handleChangePassword}
							className="mt-4 h-[38px] px-5 bg-[#FFD22E] rounded-[8px] text-[14px] font-semibold text-black hover:bg-[#e6c12a] transition"
						>
							Simpan
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function Field({ label, value, disabled = false }) {
	return (
		<div>
			<label className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">{label}</label>
			<input
				type="text"
				value={value}
				disabled={disabled}
				readOnly={disabled}
				className="mt-1 w-full h-[42px] rounded-[8px] border border-gray-200 dark:border-gray-700 px-3 text-[14px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
			/>
		</div>
	);
}

function EditableField({ label, value, onChange, type = "text" }) {
	const isDateField = type === "date";

	return (
		<div>
			<label className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">{label}</label>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`mt-1 w-full h-[42px] rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFD22E] ${
					isDateField ? "profile-date-input" : ""
				}`}
			/>

			{isDateField ? (
				<style jsx global>{`
					@media (prefers-color-scheme: dark) {
						.profile-date-input::-webkit-calendar-picker-indicator {
							filter: invert(1);
							opacity: 0.95;
						}
					}
				`}</style>
			) : null}
		</div>
	);
}

function PasswordField({ label, value, onChange }) {
	return (
		<div>
			<label className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">{label}</label>
			<input
				type="password"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="mt-1 w-full h-[40px] rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FFD22E]"
			/>
		</div>
	);
}
