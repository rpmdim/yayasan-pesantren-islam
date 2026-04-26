import NavbarRole from "@/app/component/navbarRole";

export default function StaffDashboard() {
  const staff = {
    salutation: "Mr.",
    firstName: "Admin",
    middleName: "",
    lastName: "Aero",
    email: "admin@aeromiles.com",
    countryCode: "+62",
    phone: "81111111111",
    nationality: "Indonesia",
    birthDate: "1988-01-01",
    staffId: "S0001",
    maskapai: "Garuda Indonesia",
    klaimMenunggu: 2,
    klaimDisetujui: 1,
    klaimDitolak: 1,
  };

  const fullName = `${staff.salutation} ${staff.firstName} ${staff.middleName} ${staff.lastName}`.replace(/\s+/g, " ");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <NavbarRole role="staff" userName={fullName} roleLabel="Staff" />

      <div className="pt-32 px-4 sm:px-8 lg:px-16 pb-12">
        <div className="mb-8">
          <p className="text-[32px] font-bold text-black dark:text-gray-100">
            Dashboard
          </p>
          <p className="text-[16px] text-gray-600 dark:text-gray-300">
            Selamat datang kembali, <span className="font-semibold">{fullName}</span>
          </p>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[22px] font-semibold text-black dark:text-gray-100">
                Informasi Pribadi
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ringkasan data akun dan identitas staf
              </p>
            </div>

            <span className="bg-[#FFF1B8] dark:bg-[#FFD22E]/20 text-[#8A6A00] dark:text-[#FFD22E] px-4 py-2 rounded-full text-sm font-semibold">
              Staff Aktif
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <InfoItem label="Nama Lengkap" value={fullName} />
            <InfoItem label="Email" value={staff.email} />
            <InfoItem label="Nomor HP" value={`${staff.countryCode} ${staff.phone}`} />
            <InfoItem label="Kewarganegaraan" value={staff.nationality} />
            <InfoItem label="Tanggal Lahir" value={staff.birthDate} />
            <InfoItem label="Maskapai Bertugas" value={staff.maskapai} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-6">
          <SummaryCard title="ID Staf" value={staff.staffId} icon="👥" />
          <SummaryCard title="Maskapai" value={staff.maskapai} icon="✈️" highlight />
          <SummaryCard title="Klaim Menunggu" value={staff.klaimMenunggu} icon="🕒" />
          <SummaryCard title="Klaim Disetujui" value={staff.klaimDisetujui} icon="✅" />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <SummaryCard title="Klaim Ditolak" value={staff.klaimDitolak} icon="❌" />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-[16px] font-semibold text-black dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

function SummaryCard({ title, value, icon, highlight = false }) {
  return (
    <div
      className={`bg-white dark:bg-[#111827] border rounded-[16px] p-5 shadow-sm ${
        highlight
          ? "border-[#FFD22E] dark:border-[#FFD22E]"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FFF1B8] dark:bg-[#FFD22E]/20 flex items-center justify-center text-[22px]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-[22px] font-bold text-black dark:text-gray-100">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}