"use client";

import NavbarRole from "@/app/component/navbarRole";

const tierData = [
	{
		name: "Blue",
		minFlights: 0,
		minMiles: 0,
		benefits: ["Akumulasi miles dasar", "Akses penawaran khusus member"],
		badgeBg: "bg-sky-500",
		badgeIcon: "text-white",
	},
	{
		name: "Silver",
		minFlights: 10,
		minMiles: 15000,
		benefits: ["Bonus miles 25%", "Priority check-in", "Akses lounge partner"],
		badgeBg: "bg-slate-200",
		badgeIcon: "text-slate-600",
	},
	{
		name: "Gold",
		minFlights: 25,
		minMiles: 40000,
		benefits: [
			"Bonus miles 50%",
			"Priority boarding",
			"Akses lounge premium",
			"Extra bagasi 10kg",
		],
		badgeBg: "bg-amber-400",
		badgeIcon: "text-amber-950",
	},
	{
		name: "Platinum",
		minFlights: 50,
		minMiles: 80000,
		benefits: [
			"Bonus miles 100%",
			"Upgrade gratis (subject to availability)",
			"Akses lounge first class",
			"Extra bagasi 20kg",
			"Dedicated hotline",
		],
		badgeBg: "bg-slate-950",
		badgeIcon: "text-white",
	},
];

export default function InfoTierPage() {
	const currentTier = "Gold";
	const totalMiles = 45000;
	const nextTier = tierData.find((tier) => tier.name === "Platinum");
	const progressPercent = Math.min(
		100,
		Math.round((totalMiles / nextTier.minMiles) * 100)
	);
	const remainingMiles = Math.max(nextTier.minMiles - totalMiles, 0);

	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
			<NavbarRole role="member" userName="John Doe" roleLabel="Member" />

			<main className="pt-32 pb-10 px-4 sm:px-8">
				<div className="max-w-[900px] mx-auto">
					<p className="text-[38px] sm:text-[42px] font-extrabold text-[#8A6A00] leading-tight">
						Info Tier
					</p>

					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
						Lihat tingkatan tier, syarat minimal, dan progress Anda menuju tier berikutnya.
					</p>

					<section className="mt-6 p-5 sm:p-6 bg-white dark:bg-[#111827] border-2 border-[#E6C12A] rounded-[16px] shadow-sm">
						<p className="text-[20px] font-bold text-black dark:text-gray-100">
							Progress ke Tier Berikutnya: {nextTier.name}
						</p>

						<div className="mt-3 flex items-center justify-between text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold">
							<p>Total Miles</p>
							<p>
								{totalMiles.toLocaleString("en-US")} / {nextTier.minMiles.toLocaleString("en-US")}
							</p>
						</div>

						<div className="w-full h-[10px] rounded-full bg-gray-200 dark:bg-gray-700 mt-2 overflow-hidden">
							<div
								className="h-full bg-[#FFD22E]"
								style={{ width: `${progressPercent}%` }}
							/>
						</div>

						<p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
							Sisa {remainingMiles.toLocaleString("en-US")} miles untuk naik ke {nextTier.name}.
						</p>
					</section>

					<div className="mt-6 space-y-4">
						{tierData.map((tier) => {
							const isCurrent = tier.name === currentTier;

							return (
								<section
									key={tier.name}
									className={`bg-white dark:bg-[#111827] border rounded-[16px] p-5 sm:p-6 shadow-sm transition-colors ${
										isCurrent
											? "border-2 border-[#E6C12A]"
											: "border-gray-200 dark:border-gray-700"
									}`}
								>
									<div className="flex items-center gap-4">
										<div
											className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center ${tier.badgeBg}`}
										>
											<TierMedalIcon className={tier.badgeIcon} />
										</div>

										<div className="flex-1">
											<div className="flex items-center flex-wrap gap-2">
												<p className="text-[30px] sm:text-[34px] font-extrabold leading-none text-black dark:text-gray-100">
													{tier.name}
												</p>

												{isCurrent ? (
													<span className="h-[28px] px-3 rounded-full bg-[#FFF1B8] text-[#8A6A00] text-[13px] font-semibold flex items-center">
														Tier Anda
													</span>
												) : null}
											</div>

											<p className="text-[18px] font-semibold text-gray-500 dark:text-gray-400 mt-1">
												Min. {tier.minFlights} penerbangan · Min. {tier.minMiles.toLocaleString("en-US")} miles
											</p>
										</div>
									</div>

									<div className="mt-6">
										<p className="text-[22px] sm:text-[24px] font-bold text-black dark:text-gray-100">
											Keuntungan:
										</p>

										<ul className="mt-3 space-y-2">
											{tier.benefits.map((benefit) => (
												<li key={benefit} className="flex items-start gap-2 text-[20px] sm:text-[22px] font-medium text-black dark:text-gray-100">
													<BenefitCheckIcon />
													<span className="leading-snug">{benefit}</span>
												</li>
											))}
										</ul>
									</div>
								</section>
							);
						})}
					</div>
				</div>
			</main>
		</div>
	);
}

function TierMedalIcon({ className }) {
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className}>
			<circle cx="12" cy="8" r="4.8" stroke="currentColor" strokeWidth="2.2" />
			<path
				d="M8.4 12.5L7.8 20L12 17.7L16.2 20L15.6 12.5"
				stroke="currentColor"
				strokeWidth="2.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function BenefitCheckIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500 mt-0.5 shrink-0">
			<circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
			<path
				d="M8.5 12.2L10.9 14.6L15.8 9.7"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
