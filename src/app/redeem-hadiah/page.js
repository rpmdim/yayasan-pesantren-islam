"use client";

import { useMemo, useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

const hadiahAwal = [
	{
		id: "RWD-005",
		nama: "Upgrade Business Class",
		penyedia: "Garuda Indonesia",
		miles: 15000,
		deskripsi: "Melakukan upgrade dari economy class ke business class.",
		validStartDate: "2026-01-01",
		programEnd: "2027-01-01",
	},
	{
		id: "RWD-013",
		nama: "Akses Lounge 1x",
		penyedia: "AeroMiles Lounge Partner",
		miles: 3000,
		deskripsi: "Akses sekali masuk lounge partner domestik.",
		validStartDate: "2026-02-01",
		programEnd: "2026-12-31",
	},
	{
		id: "RWD-099",
		nama: "Voucher Bagasi 10kg",
		penyedia: "Garuda Indonesia",
		miles: 5500,
		deskripsi: "Tambahan bagasi 10kg untuk 1 segmen penerbangan.",
		validStartDate: "2025-01-01",
		programEnd: "2026-03-31",
	},
];

const riwayatAwal = [
	{
		id: 1,
		hadiah: "Akses Lounge 1x",
		timestamp: "2025-01-20 16:00",
		miles: -3000,
	},
];

export default function RedeemHadiahPage() {
	const [activeTab, setActiveTab] = useState("katalog");
	const [awardMiles, setAwardMiles] = useState(32000);
	const [riwayatRedeem, setRiwayatRedeem] = useState(riwayatAwal);
	const [selectedHadiah, setSelectedHadiah] = useState(null);

	const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

	const katalogAktif = useMemo(
		() => hadiahAwal.filter((item) => item.validStartDate <= today && item.programEnd >= today),
		[today]
	);

	const formatMiles = (nilai) => Number(nilai).toLocaleString("en-US");

	const formatTimestamp = () => {
		const now = new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, "0");
		const d = String(now.getDate()).padStart(2, "0");
		const hh = String(now.getHours()).padStart(2, "0");
		const mm = String(now.getMinutes()).padStart(2, "0");
		return `${y}-${m}-${d} ${hh}:${mm}`;
	};

	const openRedeemModal = (item) => {
		if (item.validStartDate > today || item.programEnd < today) {
			alert("Hadiah tidak berada dalam periode valid.");
			return;
		}

		if (awardMiles < item.miles) {
			alert("Award miles tidak mencukupi untuk redeem hadiah ini.");
			return;
		}

		setSelectedHadiah(item);
	};

	const confirmRedeem = () => {
		if (!selectedHadiah) return;

		if (selectedHadiah.validStartDate > today || selectedHadiah.programEnd < today) {
			alert("Hadiah tidak berada dalam periode valid.");
			setSelectedHadiah(null);
			return;
		}

		if (awardMiles < selectedHadiah.miles) {
			alert("Award miles tidak mencukupi untuk redeem hadiah ini.");
			setSelectedHadiah(null);
			return;
		}

		setAwardMiles((prev) => prev - selectedHadiah.miles);
		setRiwayatRedeem((prev) => [
			{
				id: Date.now(),
				hadiah: selectedHadiah.nama,
				timestamp: formatTimestamp(),
				miles: -selectedHadiah.miles,
			},
			...prev,
		]);

		setActiveTab("riwayat");
		setSelectedHadiah(null);
	};

	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
			<NavbarRole role="member" userName="John Doe" roleLabel="Member" />

			<main className="pt-32 pb-12 px-4 sm:px-8">
				<div className="max-w-[980px] mx-auto">
					<div>
						<p className="font-bold text-[32px] sm:text-[36px] text-black dark:text-gray-100 leading-tight">
							Redeem Hadiah
						</p>
						<p className="text-[15px] text-gray-600 dark:text-gray-300 mt-2">
							Award Miles tersedia: <span className="font-bold">{formatMiles(awardMiles)}</span>
						</p>
					</div>

					<div className="mt-5 inline-flex p-1 rounded-[10px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
						<button
							type="button"
							onClick={() => setActiveTab("katalog")}
							className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition ${
								activeTab === "katalog"
									? "bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-sm"
									: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
							}`}
						>
							Katalog Hadiah
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("riwayat")}
							className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition ${
								activeTab === "riwayat"
									? "bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-sm"
									: "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
							}`}
						>
							Riwayat Redeem
						</button>
					</div>

					{activeTab === "katalog" ? (
						<div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
							{katalogAktif.map((item) => {
								const cukupMiles = awardMiles >= item.miles;

								return (
									<section
										key={item.id}
										className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 shadow-sm"
									>
										<p className="inline-flex h-[28px] items-center px-3 rounded-full bg-[#0A4D94] text-white text-[12px] font-semibold">
											{item.id} - {item.penyedia}
										</p>

										<p className="mt-2 text-[23px] font-extrabold text-black dark:text-gray-100 leading-tight">
											{item.nama}
										</p>

										<p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
											{item.deskripsi}
										</p>

										<p className="text-[18px] font-bold text-black dark:text-gray-100 mt-2">
											{formatMiles(item.miles)} miles
										</p>

										<p className="text-[13px] text-gray-600 dark:text-gray-300 mt-1">
											Periode: {item.validStartDate} - {item.programEnd}
										</p>

										<button
											type="button"
											onClick={() => openRedeemModal(item)}
											disabled={!cukupMiles}
											className={`mt-3 h-[36px] px-4 rounded-[8px] text-[13px] font-bold text-white transition ${
												cukupMiles
													? "bg-red-600 hover:bg-red-700"
													: "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
											}`}
										>
											Redeem
										</button>
									</section>
								);
							})}

							{katalogAktif.length === 0 ? (
								<p className="text-[14px] text-gray-600 dark:text-gray-300">
									Tidak ada hadiah aktif pada periode saat ini.
								</p>
							) : null}
						</div>
					) : (
						<section className="mt-5 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 sm:p-5 shadow-sm overflow-x-auto">
							<table className="w-full min-w-[640px] text-sm">
								<thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
									<tr>
										<th className="py-3 text-left font-semibold">Hadiah</th>
										<th className="py-3 text-left font-semibold">Waktu</th>
										<th className="py-3 text-left font-semibold">Miles</th>
										<th className="py-3 text-left font-semibold">Aksi</th>
									</tr>
								</thead>
								<tbody>
									{riwayatRedeem.map((item) => (
										<tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
											<td className="py-4 font-semibold text-black dark:text-gray-100">{item.hadiah}</td>
											<td className="py-4 text-black dark:text-gray-100">{item.timestamp}</td>
											<td className="py-4 font-bold text-red-500">{item.miles.toLocaleString("en-US")}</td>
											<td className="py-4 text-gray-500 dark:text-gray-400">
												<LockIcon />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</section>
					)}
				</div>
			</main>

			{selectedHadiah && (
				<div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
					<div className="absolute inset-0 bg-black/60" onClick={() => setSelectedHadiah(null)} />

					<div className="relative z-10 w-full max-w-[560px] rounded-[12px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 p-5 shadow-xl">
						<p className="text-[34px] font-extrabold leading-none text-black dark:text-gray-100">
							Redeem Miles
						</p>

						<p className="text-[15px] text-gray-700 dark:text-gray-300 mt-2 leading-snug">
							Miles akan dipotong sebesar <span className="font-bold">{formatMiles(selectedHadiah.miles)}</span>
							 untuk reward <span className="font-bold">{selectedHadiah.nama}</span> dengan kode
							 <span className="font-bold">{selectedHadiah.id}</span> dari <span className="font-bold">{selectedHadiah.penyedia}</span>.
						</p>

						<div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setSelectedHadiah(null)}
								className="h-[38px] px-6 rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[13px] font-semibold text-black dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
							>
								Batal
							</button>

							<button
								type="button"
								onClick={confirmRedeem}
								className="h-[38px] px-6 rounded-[8px] bg-[#0A4D94] hover:bg-[#083c73] text-[13px] font-semibold text-white"
							>
								Redeem
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function LockIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500 dark:text-gray-400">
			<path
				d="M7 11V8a5 5 0 0 1 10 0v3"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<rect
				x="5"
				y="11"
				width="14"
				height="10"
				rx="2"
				stroke="currentColor"
				strokeWidth="2"
			/>
		</svg>
	);
}
