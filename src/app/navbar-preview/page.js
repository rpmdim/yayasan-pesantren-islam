import NavbarRole from "@/app/component/navbarRole";

export default function NavbarPreview() {
return (
    <div>
    <NavbarRole role="member" userName="John Doe" roleLabel="Member" />

    <div className="pt-30 px-10">
        <p className="font-bold text-[25px]">Preview Navbar Member</p>
        <p className="text-[15px] mt-2">
        Ini cuma halaman dummy buat lihat navbar member.
        </p>
    </div>
    </div>
);
}