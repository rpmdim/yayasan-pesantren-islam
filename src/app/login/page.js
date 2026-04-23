import Navbar from "@/app/component/navbar";
import Link from "next/link";

export default function login(){
    return (
        <div>
            <Navbar/>
            <div className="pt-30 flex flex-row w-full">
                <div className="w-1/2">
                    <p className="font-bold text-[45px] ml-20 w-150">
                        Siap mengeksplorasi dunia lagi?
                    </p>
                    <img src="/images/Airplane-login.png" alt="user" className=" w-[600px] h-[420px] ml-20"/>
                </div>
                <div className=" w-1/2 flex justify-center">
                    <div className="form rounded-[10px] border-1 border-[#B7B6B6] w-[511px] h-[522px] ">
                        <div className="p-10  flex flex-col gap-2">
                            <div className="mb-5">
                                <p className="font-semibold text-[22px]">
                                    Login
                                </p>
                                <p className="font-regular text-[15px]">
                                    Masukkan email dan password anda
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-[22px]">
                                    Email
                                </p>
                                <input 
                                    type="email" 
                                    placeholder="Masukkan email"
                                    className="w-full h-[45px] border border-[#B7B6B6] rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-[22px]">
                                    Password
                                </p>
                                <input 
                                    type="password" 
                                    placeholder="Masukkan password"
                                    className="w-full h-[45px] border border-[#B7B6B6] rounded-[8px] px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex flex-col items-center mt-7 gap-1">
                                <button className="w-[292px] h-[45px] bg-[#FFD22E] rounded-[10px] font-semibold text-[21px] hover:bg-[#e6c12a]">
                                    Log In
                                </button>
                                <p>
                                    Belum punya akun?{" "}
                                    <Link href="/registrasi" className="text-blue-500 hover:underline">
                                        Daftar di sini
                                    </Link>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}