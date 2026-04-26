import NavbarRole from "@/app/component/navbarRole";

export default function Dashboard() {
  const user = {
    salutation: "Mr.",
    firstName: "John",
    middleName: "William",
    lastName: "Doe",
    email: "john@example.com",
    countryCode: "+62",
    phone: "81234567890",
    nationality: "Indonesia",
    birthDate: "1990-05-15",
    memberNo: "M0001",
    tier: "Gold",
    totalMiles: "45,000",
    awardMiles: "32,000",
    joinDate: "2024-01-15",
  };

  const fullName = `${user.salutation} ${user.firstName} ${user.middleName} ${user.lastName}`;

  const transactions = [
    { type: "Transfer", date: "2025-01-15 10:30", miles: "-5,000 miles", status: "Keluar" },
    { type: "Redeem", date: "2025-01-20 16:00", miles: "-3,000 miles", status: "Keluar" },
    { type: "Package", date: "2025-03-01 08:00", miles: "+10,000 miles", status: "Masuk" },
    { type: "Klaim", date: "2025-03-12 13:15", miles: "+2,500 miles", status: "Masuk" },
    { type: "Transfer", date: "2025-04-05 09:45", miles: "-1,000 miles", status: "Keluar" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <NavbarRole role="member" userName={fullName} roleLabel="Member" />

      <div className="pt-32 px-4 sm:px-8 lg:px-16 pb-12">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[32px] font-bold text-black dark:text-gray-100">Dashboard</p>
          <p className="text-[16px] text-gray-600 dark:text-gray-300">
            Selamat datang kembali, <span className="font-semibold">{fullName}</span>
          </p>
        </div>

        {/* INFORMASI PRIBADI */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[22px] font-semibold text-black dark:text-gray-100">Informasi Pribadi</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ringkasan data akun dan identitas pengguna
              </p>
            </div>

            <span className="bg-[#FFF1B8] dark:bg-[#FFD22E]/20 text-[#8A6A00] dark:text-[#FFD22E] px-4 py-2 rounded-full text-sm font-semibold">
              Member Aktif
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <InfoItem label="Nama Lengkap" value={fullName} />
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Nomor HP" value={`${user.countryCode} ${user.phone}`} />
            <InfoItem label="Kewarganegaraan" value={user.nationality} />
            <InfoItem label="Tanggal Lahir" value={user.birthDate} />
            <InfoItem label="Tanggal Bergabung" value={user.joinDate} />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <SummaryCard title="Nomor Member" value={user.memberNo} icon="🎫" />
          <SummaryCard title="Tier Saat Ini" value={user.tier} icon="🏅" highlight />
          <SummaryCard title="Total Miles" value={user.totalMiles} icon="✈️" />
          <SummaryCard title="Award Miles" value={user.awardMiles} icon="⭐" />
        </div>

        {/* TRANSAKSI */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-[18px] shadow-sm p-8">
          <div className="mb-6">
            <p className="text-[22px] font-semibold text-black dark:text-gray-100">5 Transaksi Miles Terbaru</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Riwayat aktivitas miles terakhir pada akun Anda
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {transactions.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#FFF8E0] dark:bg-gray-800 rounded-[12px] px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-white dark:bg-gray-900 border border-[#F2D66B] dark:border-gray-700 text-[#8A6A00] dark:text-[#FFD22E] rounded-full px-3 py-1 text-xs font-semibold">
                    {item.type}
                  </span>
                  <p className="font-medium text-black dark:text-gray-100">{item.date}</p>
                </div>

                <p
                  className={`font-bold ${
                    item.status === "Masuk" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.miles}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-[16px] font-semibold text-black dark:text-gray-100">{value}</p>
    </div>
  );
}

function SummaryCard({ title, value, icon, highlight = false }) {
  return (
    <div
      className={`bg-white dark:bg-[#111827] border rounded-[16px] p-5 shadow-sm ${
        highlight ? "border-[#FFD22E] dark:border-[#FFD22E]" : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-[46px] h-[46px] rounded-[12px] bg-[#FFF1B8] dark:bg-[#FFD22E]/20 flex items-center justify-center text-[22px]">
          {icon}
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-[22px] font-bold text-black dark:text-gray-100">{value}</p>
        </div>
      </div>
    </div>
  );
}