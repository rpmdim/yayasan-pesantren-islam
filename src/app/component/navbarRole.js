"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NavbarRole({
    role = "member",
    userName = "John Doe",
    roleLabel = "Member",
}) {
    const pathname = usePathname();

    const memberMenu = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Identitas Saya", href: "/identitas-member" },
        { label: "Klaim Miles", href: "/klaim-miles" },
        { label: "Transfer Miles", href: "/transfer-miles" },
        { label: "Redeem Hadiah", href: "/redeem-hadiah" },
        { label: "Beli Package", href: "/beli-package" },
        { label: "Info Tier", href: "/info-tier" },
        { label: "Pengaturan Profil", href: "/pengaturan-profil" },
    ];

    const staffMenu = [
        { label: "Dashboard", href: "/staff-dashboard" },
        { label: "Kelola Member", href: "/kelola-member" },
        { label: "Kelola Klaim", href: "/klaim-missing-miles" },
        { label: "Kelola Hadiah & Penyedia", href: "/kelola-hadiah-penyedia" },
        { label: "Kelola Mitra", href: "/kelola-mitra" },
        { label: "Laporan Transaksi", href: "/laporan-transaksi" },
        { label: "Pengaturan Profil", href: "/pengaturan-profil" },
    ];

    const menu = role === "staff" ? staffMenu : memberMenu;

    return (
        <div className="fixed top-0 left-0 z-[9999] flex w-full justify-center pointer-events-none">
            <nav className="flex bg-[#FFD22E] justify-center items-center w-full h-24 pointer-events-auto">
                <div className="flex flex-row w-full items-center px-10">

                    {/* Logo kiri + status login */}
                    <Link href="/dashboard" className="flex flex-col w-1/4 pt-5">
                        <div className="flex flex-row gap-2 items-center">
                            <Image
                                src="/images/AeroMilesLogo.png"
                                width={60}
                                height={35}
                                alt="Logo AeroMiles"
                                className="w-[50px] md:w-[60px] h-auto transition-all"
                            />
                            <p className="text-black font-bold text-[34px]">AeroMiles</p>
                        </div>

                        <p className="text-black text-[11px] pb-4">
                            Masuk sebagai{" "}
                            <span className="font-semibold">{userName}</span> - {roleLabel}
                        </p>
                    </Link>

                    {/* Menu kanan */}
                    <div className="flex flex-row w-3/4 justify-end items-center gap-1">
                        {menu.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <button
                                    className={`text-black font-medium text-[11px] min-h-[34px] px-3 flex justify-center items-center rounded-[8px] transition ${pathname === item.href
                                            ? "bg-[#CCA825]"
                                            : "bg-[#FFD22E] hover:bg-[#e6c12a]"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            </Link>
                        ))}

                        <Link href="/login">
                            <button className="text-red-600 font-medium text-[11px] min-h-[34px] px-3 flex justify-center items-center rounded-[8px] transition hover:bg-[#e6c12a]">
                                Logout
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}