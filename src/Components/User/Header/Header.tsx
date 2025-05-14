"use client";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { useRouter, usePathname } from "next/navigation"; // ✅ Import usePathname
import ForgetPasswordModal from "../ForgetPassword/page";
import { getCategories } from "@/Services/userServices";
import { ICategory } from "@/Interfaces/ICategory";

export default function Header() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const user = useSelector((state: IRootState) => state?.auth?.userData);
    const router = useRouter();
    const pathname = usePathname(); // ✅ Get current pathname

    const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
    const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);
    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCategories();
            setCategories(res?.data?.data || []);
        };
        fetchData();
    }, []);

    // ✅ Hide Header on /admin and /personalize routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/personalize")) {
        return null;
    }

    return (
        <>
            <header className="bg-[#0C3661] text-white text-xs">
                <div className=" bg-[red] flex justify-center p-2">
                    <h2 className="">Mother’s Day Sale | Ships Free $109+</h2>
                </div>
                <div className="flex items-center justify-between px-4 py-4 md:px-12">
                    {/* Logo */}
                    <div className="text-lg font-bold">
                        <a href="/" className="text-white hover:text-gray-400">
                            <img className="w-[70px]" src={"https://crystalcorp.com/my3dpic/wp-content/uploads/2023/12/logo.png"} alt="Logo" />
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex space-x-4 text-xs font-medium relative">
                        <div className="group relative" onClick={toggleDropdown}>
                            <a className="hover:text-gray-400 cursor-pointer ml-6">OUR PRODUCTS</a>
                            <div
                                className={`absolute left-0 top-full bg-[#141414] text-white text-lg shadow-md rounded-lg w-96 h-auto z-[9999] ${
                                    isDropdownVisible ? "block" : "hidden"
                                }`}
                                style={{ marginTop: "2rem" }}
                            >
                                <ul>
                                    {categories?.map((obj: ICategory, id: number) => (
                                        <li key={id} className="px-8 py-3 hover:bg-gray-800">
                                            <button onClick={() => router.push(`/category/${obj?.name}`)}>{obj?.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <a href="/products" className="hover:text-gray-400 ml-6">
                            OFFERS
                        </a>
                        <a href="/products" className="hover:text-gray-400 ml-6">
                            ABOUT US
                        </a>
                        <a href="/reviews" className="hover:text-gray-400 ml-6">
                            CONTACTS
                        </a>
                        <a href="/faq" className="hover:text-gray-400 ml-6">
                            FAQ
                        </a>
                        <a href="/contact" className="hover:text-gray-400 ml-6">
                            CONTACT
                        </a>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-5 text-[16px]">
                        {/* Search */}
                        <button className="hover:text-gray-400 ml-3">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        {/* Chat */}
                        <button className="hover:text-gray-400 ml-3">
                            <i className="fa-solid fa-comment-dots"></i>
                        </button>

                        {/* Earth */}
                        <button className="hover:text-gray-400 ml-3">
                            <i className="fa-solid fa-earth-americas"></i>
                        </button>

                        {/* User */}
                        {user ? (
                            <button className="hover:text-gray-400 ml-3" onClick={() => router.push("/profile")}>
                                <i className="fas fa-user"></i>
                            </button>
                        ) : (
                            <button className="hover:text-gray-400 ml-3" onClick={toggleLoginModal}>
                                <i className="fas fa-user"></i>
                            </button>
                        )}

                        {/* Cart */}
                        <button className="hover:text-gray-400 relative ml-3">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">2</span>
                        </button>

                        {/* Mobile Menu */}
                        <button className="block md:hidden hover:text-gray-400 ml-3">☰</button>
                    </div>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#141414] text-white transform ${
                    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={toggleSidebar}>
                    ✕
                </button>

                <nav className="mt-16 flex flex-col space-y-4 px-6 text-xs font-medium">
                    <a href="/specials" className="hover:text-gray-400">
                        OUR PRODUCTS
                    </a>
                    <a href="/products" className="hover:text-gray-400">
                        ABOUT US
                    </a>
                    <a href="/reviews" className="hover:text-gray-400">
                        CONTACTS
                    </a>
                    <a href="/faq" className="hover:text-gray-400">
                        FAQ
                    </a>
                    <a href="/contact" className="hover:text-gray-400">
                        CONTACT
                    </a>
                </nav>
            </div>

            {/* Overlay when sidebar is open */}
            {isSidebarVisible && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}

            {/* Modals */}
            {forgetPasswordModal && <ForgetPasswordModal forgetPasswordModal={forgetPasswordModal} setForgetPasswordModal={setForgetPasswordModal} />}
            {signupModal && <Signup setSignupModal={setSignupModal} setIsLoginModalVisible={setIsLoginModalVisible} />}
            {isLoginModalVisible && (
                <Login
                    forgetPasswordModal={forgetPasswordModal}
                    setForgetPasswordModal={setForgetPasswordModal}
                    setSignupModal={setSignupModal}
                    setIsLoginModalVisible={setIsLoginModalVisible}
                />
            )}
        </>
    );
}
