"use client";

import { useMemo, useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

const memberBalances = [
	{ nama: "John W. Doe", email: "john@example.com", miles: 18000 },
	{ nama: "Jane Smith", email: "jane@example.com", miles: 5000 },
	{ nama: "Budi A. Santoso", email: "budi@example.com", miles: 4500 },
];

const initialTransactions = [
	{
		id: 1,
		tipe: "Transfer",
		member: "John W. Doe",
		email: "john@example.com",
		miles: -5000,
		timestamp: "2025-01-15 10:30",
		deletable: true,
	},
	{
		id: 2,
		tipe: "Redeem",
		member: "John W. Doe",
		email: "john@example.com",
		miles: -3000,
		timestamp: "2025-01-20 16:00",
		deletable: true,
	},
	{
		id: 3,
		tipe: "Package",
		member: "Jane Smith",
		email: "jane@example.com",
		miles: 5000,
		timestamp: "2025-02-01 09:15",
		deletable: true,
	},
	{
		id: 4,
		tipe: "Klaim",
		member: "Budi A. Santoso",
		email: "budi@example.com",
		miles: 2500,
		timestamp: "2025-02-05 11:45",
		tag: "Disetujui",
		deletable: false,
	},
	{
		id: 5,
		tipe: "Transfer",
		member: "Budi A. Santoso",
		email: "budi@example.com",
		miles: -2000,
		timestamp: "2025-02-10 14:00",
		deletable: true,
	},
	{
		id: 6,
		tipe: "Package",
		member: "John W. Doe",
		email: "john@example.com",
		miles: 10000,
		timestamp: "2025-03-01 08:00",
		deletable: true,
	},
];

export default function LaporanTransaksiPage() {
	const [activeTab, setActiveTab] = useState("riwayat");
	const [transactions, setTransactions] = useState(initialTransactions);
	const [tipeFilter, setTipeFilter] = useState("Semua");
	const [yearFilter, setYearFilter] = useState("Semua");
	const [monthFilter, setMonthFilter] = useState("Semua");
	const [dayFilter, setDayFilter] = useState("Semua");
	const [startTimeFilter, setStartTimeFilter] = useState("");
	const [endTimeFilter, setEndTimeFilter] = useState("");
	const [toDelete, setToDelete] = useState(null);

	const yearOptions = useMemo(
		() => ["Semua", ...new Set(transactions.map((item) => item.timestamp.slice(0, 4)))],
		[transactions]
	);

	const monthOptions = [
		{ value: "Semua", label: "Semua Bulan" },
		{ value: "01", label: "Januari" },
		{ value: "02", label: "Februari" },
		{ value: "03", label: "Maret" },
		{ value: "04", label: "April" },
		{ value: "05", label: "Mei" },
		{ value: "06", label: "Juni" },
		{ value: "07", label: "Juli" },
		{ value: "08", label: "Agustus" },
		{ value: "09", label: "September" },
		{ value: "10", label: "Oktober" },
		{ value: "11", label: "November" },
		{ value: "12", label: "Desember" },
	];

	const dayOptions = ["Semua", ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))];

	const filteredTransactions = useMemo(() => {
		return transactions.filter((item) => {
			const [dateOnly, timeOnly] = item.timestamp.split(" ");
			const [year, month, day] = dateOnly.split("-");
			const matchType = tipeFilter === "Semua" || item.tipe === tipeFilter;
			const matchYear = yearFilter === "Semua" || year === yearFilter;
			const matchMonth = monthFilter === "Semua" || month === monthFilter;
			const matchDay = dayFilter === "Semua" || day === dayFilter;
			const matchStartTime = !startTimeFilter || timeOnly >= startTimeFilter;
			const matchEndTime = !endTimeFilter || timeOnly <= endTimeFilter;

			return matchType && matchYear && matchMonth && matchDay && matchStartTime && matchEndTime;
		});
	}, [transactions, tipeFilter, yearFilter, monthFilter, dayFilter, startTimeFilter, endTimeFilter]);

	const summary = useMemo(() => {
		const totalMilesBeredar = memberBalances.reduce((acc, item) => acc + item.miles, 0);
		const targetMonth = "2025-01";

		const totalRedeemBulanIni = transactions
			.filter((item) => item.tipe === "Redeem" && item.timestamp.startsWith(targetMonth))
			.reduce((acc, item) => acc + Math.abs(item.miles), 0);

		const totalKlaimDisetujui = transactions
			.filter((item) => item.tipe === "Klaim" && item.tag === "Disetujui")
			.reduce((acc, item) => acc + item.miles, 0);

		return {
			totalMilesBeredar,
			totalRedeemBulanIni,
			totalKlaimDisetujui,
		};
	}, [transactions]);

	const topMembers = useMemo(() => {
		const activityByMember = transactions.reduce((acc, item) => {
			if (!acc[item.member]) {
				acc[item.member] = 0;
			}

			if (item.tipe === "Transfer" || item.tipe === "Redeem") {
				acc[item.member] += 1;
			}

			return acc;
		}, {});

		return [...memberBalances]
			.map((member) => ({
				...member,
				jumlahTransaksi: activityByMember[member.nama] ?? 0,
			}))
			.sort((a, b) => b.miles - a.miles);
	}, [transactions]);

	const formatMiles = (value) => Number(value).toLocaleString("en-US");

	const handleDelete = () => {
		if (!toDelete) return;

		setTransactions((prev) => prev.filter((item) => item.id !== toDelete.id));
		setToDelete(null);
	};

	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
			<NavbarRole role="staff" userName="Admin Aero" roleLabel="Staff" />

			<main className="pt-32 pb-12 px-4 sm:px-8">
				<div className="max-w-[1100px] mx-auto">
					<p className="font-bold text-[30px] sm:text-[34px] text-black dark:text-gray-100 leading-tight">
						Laporan & Riwayat Transaksi
					</p>

					<div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
						<SummaryCard
							title="Total Miles Beredar"
							value={formatMiles(summary.totalMilesBeredar)}
							icon={<ChartIcon />}
							iconBg="bg-blue-100 dark:bg-blue-900/40"
							iconColor="text-blue-700 dark:text-blue-300"
						/>

						<SummaryCard
							title="Total Redeem Bulan Ini"
							value={formatMiles(summary.totalRedeemBulanIni)}
							icon={<GiftIcon />}
							iconBg="bg-red-100 dark:bg-red-900/40"
							iconColor="text-red-600 dark:text-red-300"
						/>

						<SummaryCard
							title="Total Klaim Disetujui"
							value={formatMiles(summary.totalKlaimDisetujui)}
							icon={<ClaimIcon />}
							iconBg="bg-green-100 dark:bg-green-900/40"
							iconColor="text-green-600 dark:text-green-300"
						/>
					</div>

					<div className="mt-5 inline-flex p-1 rounded-[10px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
						<button
							type="button"
							onClick={() => setActiveTab("riwayat")}
							className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition ${
								activeTab === "riwayat"
									? "bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-sm"
									: "text-gray-600 dark:text-gray-300"
							}`}
						>
							Riwayat Transaksi
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("top")}
							className={`h-[36px] px-4 rounded-[8px] text-[13px] font-semibold transition ${
								activeTab === "top"
									? "bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-sm"
									: "text-gray-600 dark:text-gray-300"
							}`}
						>
							Top Member
						</button>
					</div>

					{activeTab === "riwayat" ? (
						<>
							<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3">
								<select
									value={tipeFilter}
									onChange={(e) => setTipeFilter(e.target.value)}
									className="h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100"
								>
									<option>Semua</option>
									<option>Transfer</option>
									<option>Redeem</option>
									<option>Package</option>
									<option>Klaim</option>
								</select>

								<select
									value={yearFilter}
									onChange={(e) => setYearFilter(e.target.value)}
									className="h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100"
								>
									{yearOptions.map((year) => (
										<option key={year} value={year}>
											{year === "Semua" ? "Semua Tahun" : year}
										</option>
									))}
								</select>

								<select
									value={monthFilter}
									onChange={(e) => setMonthFilter(e.target.value)}
									className="h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100"
								>
									{monthOptions.map((month) => (
										<option key={month.value} value={month.value}>
											{month.label}
										</option>
									))}
								</select>

								<select
									value={dayFilter}
									onChange={(e) => setDayFilter(e.target.value)}
									className="h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100"
								>
									{dayOptions.map((day) => (
										<option key={day} value={day}>
											{day === "Semua" ? "Semua Tanggal" : day}
										</option>
									))}
								</select>

								<input
									type="time"
									value={startTimeFilter}
									onChange={(e) => setStartTimeFilter(e.target.value)}
									title="Jam mulai"
									className="laporan-time-input h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100 [color-scheme:light] dark:[color-scheme:dark]"
								/>

								<input
									type="time"
									value={endTimeFilter}
									onChange={(e) => setEndTimeFilter(e.target.value)}
									title="Jam akhir"
									className="laporan-time-input h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[14px] text-black dark:text-gray-100 [color-scheme:light] dark:[color-scheme:dark]"
								/>

								<button
									type="button"
									onClick={() => {
										setTipeFilter("Semua");
										setYearFilter("Semua");
										setMonthFilter("Semua");
										setDayFilter("Semua");
										setStartTimeFilter("");
										setEndTimeFilter("");
									}}
									className="h-[40px] rounded-[10px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[13px] font-semibold text-black dark:text-gray-100 xl:col-span-6"
								>
									Reset Filter
								</button>
							</div>

							<section className="mt-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 sm:p-5 shadow-sm overflow-x-auto">
								<table className="w-full min-w-[820px] text-sm">
									<thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
										<tr>
											<th className="py-3 text-left font-semibold">Tipe</th>
											<th className="py-3 text-left font-semibold">Member</th>
											<th className="py-3 text-left font-semibold">Miles</th>
											<th className="py-3 text-left font-semibold">Waktu</th>
											<th className="py-3 text-left font-semibold">Aksi</th>
										</tr>
									</thead>
									<tbody>
										{filteredTransactions.map((item) => (
											<tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
												<td className="py-3">
													<span className="inline-flex items-center gap-1.5 px-3 h-[25px] rounded-full bg-gray-100 dark:bg-gray-800 text-[12px] font-semibold text-black dark:text-gray-100">
														<TypeIcon type={item.tipe} />
														{item.tipe}
													</span>
												</td>

												<td className="py-3">
													<p className="font-semibold text-black dark:text-gray-100">{item.member}</p>
													<p className="text-[12px] text-gray-500 dark:text-gray-400">{item.email}</p>
												</td>

												<td className={`py-3 font-bold ${item.miles > 0 ? "text-green-600" : "text-red-500"}`}>
													{item.miles > 0 ? `+${formatMiles(item.miles)}` : `-${formatMiles(Math.abs(item.miles))}`}
												</td>

												<td className="py-3 text-black dark:text-gray-100">{item.timestamp}</td>

												<td className="py-3">
													<button
														type="button"
														onClick={() => item.deletable && setToDelete(item)}
														disabled={!item.deletable}
														className={`${item.deletable ? "text-red-500 hover:text-red-600" : "text-gray-400 cursor-not-allowed"}`}
														title={item.deletable ? "Hapus riwayat" : "Riwayat klaim disetujui tidak dapat dihapus"}
													>
														<TrashIcon />
													</button>
												</td>
											</tr>
										))}

										{filteredTransactions.length === 0 ? (
											<tr>
												<td colSpan="5" className="py-10 text-center text-gray-500 dark:text-gray-400">
													Tidak ada data transaksi untuk filter saat ini.
												</td>
											</tr>
										) : null}
									</tbody>
								</table>
							</section>
						</>
					) : (
						<section className="mt-4 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 sm:p-5 shadow-sm overflow-x-auto">
							<p className="font-bold text-[22px] text-black dark:text-gray-100 mb-4">
								Top Member berdasarkan Total Miles
							</p>

							<table className="w-full min-w-[700px] text-sm">
								<thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
									<tr>
										<th className="py-3 text-left font-semibold">#</th>
										<th className="py-3 text-left font-semibold">Member</th>
										<th className="py-3 text-left font-semibold">Total Miles</th>
										<th className="py-3 text-left font-semibold">Jumlah Transaksi (Transfer/Redeem)</th>
									</tr>
								</thead>
								<tbody>
									{topMembers.map((member, idx) => (
										<tr key={member.email} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
											<td className="py-3 font-semibold text-black dark:text-gray-100">{idx + 1}</td>
											<td className="py-3">
												<p className="font-semibold text-black dark:text-gray-100">{member.nama}</p>
												<p className="text-[12px] text-gray-500 dark:text-gray-400">{member.email}</p>
											</td>
											<td className="py-3 font-bold text-black dark:text-gray-100">{formatMiles(member.miles)}</td>
											<td className="py-3 font-semibold text-black dark:text-gray-100">{member.jumlahTransaksi}</td>
										</tr>
									))}
								</tbody>
							</table>
						</section>
					)}
				</div>
			</main>

			{toDelete && (
				<div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
					<div className="absolute inset-0 bg-black/60 z-[99998]" onClick={() => setToDelete(null)} />

					<div className="relative z-[99999] w-full max-w-[560px] rounded-[12px] bg-white/100 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 p-5 shadow-xl">
						<p className="text-[30px] sm:text-[34px] font-extrabold leading-none text-black dark:text-gray-100">
							Hapus Riwayat?
						</p>

						<p className="text-[14px] text-gray-600 dark:text-gray-300 mt-3 leading-snug">
							Penghapusan riwayat transaksi bersifat permanen, tidak dapat dibatalkan, dan akan memengaruhi
							tampilan riwayat yang dilihat member.
						</p>

						<div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setToDelete(null)}
								className="h-[38px] px-5 rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[13px] font-semibold text-black dark:text-gray-100"
							>
								Batal
							</button>

							<button
								type="button"
								onClick={handleDelete}
								className="h-[38px] px-5 rounded-[8px] bg-[#FF0000] hover:bg-[#9F0712] text-[13px] font-semibold text-white"
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

function SummaryCard({ title, value, icon, iconBg, iconColor }) {
	return (
		<section className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[12px] p-4 shadow-sm">
			<div className="flex items-center gap-3">
				<span className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center ${iconBg} ${iconColor}`}>
					{icon}
				</span>

				<div>
					<p className="text-[12px] text-gray-500 dark:text-gray-400">{title}</p>
					<p className="font-bold text-[31px] text-black dark:text-gray-100 leading-tight">{value}</p>
				</div>
			</div>
		</section>
	);
}

function ChartIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<path d="M5 15L9 11L12 14L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M18 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
		</svg>
	);
}

function GiftIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
			<path d="M12 8V20M4 12H20" stroke="currentColor" strokeWidth="2" />
			<path d="M8.5 8A2.5 2.5 0 1 1 11 5.5V8H8.5ZM15.5 8A2.5 2.5 0 1 0 13 5.5V8H15.5Z" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
}

function ClaimIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<path d="M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M14 4H20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M9 20L4 15L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function TrashIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M6 7L7 19C7.1 20.1 8 21 9.1 21H14.9C16 21 16.9 20.1 17 19L18 7" stroke="currentColor" strokeWidth="2" />
			<path d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
}

function TypeIcon({ type }) {
	if (type === "Transfer") {
		return (
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
				<path d="M7 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M17 17H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<path d="M8 13L4 17L8 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	}

	if (type === "Redeem") {
		return (
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
				<rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
				<path d="M12 8V20M4 12H20" stroke="currentColor" strokeWidth="2" />
				<path d="M8.5 8A2.5 2.5 0 1 1 11 5.5V8H8.5ZM15.5 8A2.5 2.5 0 1 0 13 5.5V8H15.5Z" stroke="currentColor" strokeWidth="2" />
			</svg>
		);
	}

	if (type === "Package") {
		return (
			<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
				<path
					d="M4 4h2l1.2 7.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L20 7H7"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<circle cx="10" cy="18" r="1.4" fill="currentColor" />
				<circle cx="17" cy="18" r="1.4" fill="currentColor" />
			</svg>
		);
	}

	return (
		<svg width="12" height="12" viewBox="0 0 24 24" fill="none">
			<path d="M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M14 4H20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
			<path d="M9 20L4 15L9 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
