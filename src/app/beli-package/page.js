"use client";

import { useState } from "react";
import NavbarRole from "@/app/component/navbarRole";

const packageCatalog = [
	{ id: "AMP-001", miles: 1000, harga: 150000 },
	{ id: "AMP-002", miles: 5000, harga: 650000 },
	{ id: "AMP-003", miles: 10000, harga: 1200000 },
	{ id: "AMP-004", miles: 25000, harga: 2750000 },
];

const riwayatAwal = [
	{
		id: 1,
		packageId: "AMP-002",
		milesAdded: 5000,
		harga: 650000,
		timestamp: "2026-04-18 10:40",
	},
];

export default function BeliPackagePage() {
	const [awardMiles, setAwardMiles] = useState(32000);
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [riwayatPembelian, setRiwayatPembelian] = useState(riwayatAwal);

	const formatMiles = (nilai) => Number(nilai).toLocaleString("en-US");
	const formatRupiah = (nilai) => `Rp ${Number(nilai).toLocaleString("id-ID")}`;

	const getTimestamp = () => {
		const now = new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, "0");
		const d = String(now.getDate()).padStart(2, "0");
		const hh = String(now.getHours()).padStart(2, "0");
		const mm = String(now.getMinutes()).padStart(2, "0");
		return `${y}-${m}-${d} ${hh}:${mm}`;
	};

	const confirmPembelian = () => {
		if (!selectedPackage) return;

		setAwardMiles((prev) => prev + selectedPackage.miles);
		setRiwayatPembelian((prev) => [
			{
				id: Date.now(),
				packageId: selectedPackage.id,
				milesAdded: selectedPackage.miles,
				harga: selectedPackage.harga,
				timestamp: getTimestamp(),
			},
			...prev,
		]);

		setSelectedPackage(null);
	};

	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
			<NavbarRole role="member" userName="John Doe" roleLabel="Member" />

			<main className="pt-32 pb-12 px-4 sm:px-8">
				<div className="max-w-[980px] mx-auto">
					<p className="font-bold text-[31px] sm:text-[36px] text-black dark:text-gray-100 leading-tight">
						Beli Award Miles Package
					</p>

					<p className="text-[15px] text-gray-600 dark:text-gray-300 mt-2">
						Award Miles saat ini: <span className="font-bold">{formatMiles(awardMiles)}</span>
					</p>

					<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{packageCatalog.map((pkg) => (
							<section
								key={pkg.id}
								className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 shadow-sm"
							>
								<div className="flex justify-between items-center mb-3">
									<span className="w-[30px] h-[30px] rounded-[8px] bg-[#FFF1B8] text-[#8A6A00] ring-1 ring-[#E6C12A] dark:ring-0 flex items-center justify-center">
										<CartIcon />
									</span>

									<span className="h-[24px] px-3 rounded-full bg-[#FFF1B8] text-[#8A6A00] text-[11px] font-semibold flex items-center">
										{pkg.id}
									</span>
								</div>

								<p className="text-[30px] font-extrabold leading-none text-black dark:text-gray-100">
									{formatMiles(pkg.miles)}
								</p>

								<p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">Award Miles</p>

								<p className="text-[26px] font-extrabold leading-none text-[#8A6A00] mt-2">
									{formatRupiah(pkg.harga)}
								</p>

								<button
									type="button"
									onClick={() => setSelectedPackage(pkg)}
									className="mt-4 w-full h-[38px] rounded-[8px] bg-[#FFD22E] text-black text-[13px] font-semibold hover:bg-[#e6c12a] transition"
								>
									Beli
								</button>
							</section>
						))}
					</div>

					<section className="mt-6 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[14px] p-4 sm:p-5 shadow-sm overflow-x-auto">
						<div className="flex items-center justify-between gap-3 mb-2">
							<p className="font-bold text-[18px] text-black dark:text-gray-100">Riwayat Pembelian Terakhir</p>
							<p className="text-[12px] text-gray-500 dark:text-gray-400">Transaksi tidak dapat diubah</p>
						</div>

						<table className="w-full min-w-[620px] text-sm">
							<thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
								<tr>
									<th className="py-3 text-left font-semibold">ID Paket</th>
									<th className="py-3 text-left font-semibold">Award Miles</th>
									<th className="py-3 text-left font-semibold">Harga</th>
									<th className="py-3 text-left font-semibold">Timestamp</th>
								</tr>
							</thead>
							<tbody>
								{riwayatPembelian.map((trx) => (
									<tr key={trx.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
										<td className="py-3 font-semibold text-black dark:text-gray-100">{trx.packageId}</td>
										<td className="py-3 font-bold text-green-600">+{formatMiles(trx.milesAdded)}</td>
										<td className="py-3 text-black dark:text-gray-100">{formatRupiah(trx.harga)}</td>
										<td className="py-3 text-black dark:text-gray-100">{trx.timestamp}</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				</div>
			</main>

			{selectedPackage && (
				<div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
					<div className="absolute inset-0 bg-black/60" onClick={() => setSelectedPackage(null)} />

					<div className="relative z-10 w-full max-w-[560px] rounded-[12px] bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 p-5 shadow-xl">
						<div className="flex justify-between items-start gap-3">
							<div>
								<p className="text-[30px] sm:text-[34px] font-extrabold leading-none text-black dark:text-gray-100">
									Konfirmasi Pembelian
								</p>
								<p className="text-[14px] text-gray-600 dark:text-gray-300 mt-2">
									Anda akan membeli paket miles berikut:
								</p>
							</div>

							<button
								type="button"
								onClick={() => setSelectedPackage(null)}
								className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-100 text-[20px] leading-none"
							>
								×
							</button>
						</div>

						<div className="mt-4 space-y-2 text-[15px] text-black dark:text-gray-100">
							<p>
								Award Miles: <span className="font-bold text-green-600">+{formatMiles(selectedPackage.miles)}</span>
							</p>
							<p>
								Harga: <span className="font-bold">{formatRupiah(selectedPackage.harga)}</span>
							</p>
							<p>
								ID Paket: <span className="font-bold">{selectedPackage.id}</span>
							</p>
						</div>

						<div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setSelectedPackage(null)}
								className="h-[38px] px-5 rounded-[8px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-[13px] font-semibold text-black dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
							>
								Batal
							</button>

							<button
								type="button"
								onClick={confirmPembelian}
								className="h-[38px] px-5 rounded-[8px] bg-[#FFD22E] hover:bg-[#e6c12a] text-[13px] font-semibold text-black"
							>
								Konfirmasi Pembelian
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function CartIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-current">
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
