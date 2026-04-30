"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/app/lib/auth";

export default function NavbarRole() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            router.push("/login");
        } else {
            setUser(currentUser);
        }
    }, [router]);

    // Normalisasi role supaya aman kalau datanya "Staff", "staff", "Staf", atau "staf"
    const normalizedRole = user?.role?.toLowerCase();

    const isStaff =
        normalizedRole === "staff" ||
        normalizedRole === "staf";

    const isMember =
        normalizedRole === "member";

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
        { label: "Kelola Member", href: "/data-member" },
        { label: "Kelola Klaim", href: "/kelola-klaim-missing-miles" },
        { label: "Kelola Hadiah & Penyedia", href: "/kelola-hadiah-penyedia" },
        { label: "Kelola Mitra", href: "/kelola-mitra" },
        { label: "Laporan Transaksi", href: "/laporan-transaksi" },
        { label: "Pengaturan Profil", href: "/pengaturan-profil" },
    ];

    // Kalau role Staff/Staf, pakai menu staff. Selain itu default-nya member.
    const menu = isStaff ? staffMenu : memberMenu;

    const userName = user
        ? `${user.salutation ? user.salutation + " " : ""}${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
        : "";

    const roleLabel = isStaff ? "Staff" : "Member";

    const dashboardHref = isStaff ? "/staff-dashboard" : "/dashboard";

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="fixed top-0 left-0 z-[9999] flex w-full justify-center pointer-events-none">
            <nav className="flex bg-[#FFD22E] justify-center items-center w-full h-24 pointer-events-auto">
                <div className="flex flex-row w-full items-center px-10">

                    {/* LOGO + INFO LOGIN */}
                    <Link href={dashboardHref} className="flex flex-col w-1/4 pt-5">
                        <div className="flex flex-row gap-2 items-center">
                            <Image
                                src="/images/AeroMilesLogo.png"
                                width={60}
                                height={35}
                                alt="Logo AeroMiles"
                                style={{ width: "60px", height: "auto" }}
                                className="transition-all"
                            />

                            <p className="text-black font-bold text-[34px]">
                                AeroMiles
                            </p>
                        </div>

                        <p className="text-black text-[11px] pb-4">
                            Masuk sebagai{" "}
                            <span className="font-semibold">{userName}</span> - {roleLabel}
                        </p>
                    </Link>

                    {/* MENU KANAN */}
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

                        <button
                            onClick={handleLogout}
                            className="text-red-600 font-medium text-[11px] min-h-[34px] px-3 flex justify-center items-center rounded-[8px] transition hover:bg-[#e6c12a]"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}