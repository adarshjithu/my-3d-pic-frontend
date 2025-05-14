"use client";

import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { useRouter, usePathname } from "next/navigation";
import ForgetPasswordModal from "../ForgetPassword/page";
import { getCategories } from "@/Services/userServices";
import { ICategory } from "@/Interfaces/ICategory";

export default function Header() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  const user = useSelector((state: IRootState) => state?.auth?.userData);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const toggleLoginModal = () => setIsLoginModalVisible(!isLoginModalVisible);
  const toggleCategories = () => setShowCategories(!showCategories);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategories();
      setCategories(res?.data?.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarVisible ? "hidden" : "auto";
  }, [isSidebarVisible]);

  if (pathname.startsWith("/admin") || pathname.startsWith("/personalize")) {
    return null;
  }

  return (
    <>
      <header className="bg-[#0C3661] text-white text-xs">
        <div className="bg-red-600 flex justify-center p-2">
          <h2>Mother’s Day Sale | Ships Free $109+</h2>
        </div>
        <div className="flex items-center justify-between px-4 py-4 md:px-12">
          {/* Logo */}
          <div className="text-lg font-bold">
            <a href="/" className="text-white hover:text-gray-400">
              <img
                className="w-[70px]"
                src="https://crystalcorp.com/my3dpic/wp-content/uploads/2023/12/logo.png"
                alt="Logo"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 text-xs font-medium relative">
            <div className="group relative">
              <span
                className="hover:text-gray-400 cursor-pointer ml-6"
                onClick={toggleCategories}
              >
                OUR PRODUCTS
              </span>
              <div
                className={`absolute left-0 top-full bg-[#141414] text-white text-lg shadow-md rounded-lg w-96 z-50 ${
                  showCategories ? "block" : "hidden"
                }`}
                style={{ marginTop: "2rem" }}
              >
                <ul>
                  {categories?.map((obj, id) => (
                    <li key={id} className="px-8 py-3 hover:bg-gray-800">
                      <button onClick={() => router.push(`/category/${obj?.name}`)}>
                        {obj?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a href="/products" className="hover:text-gray-400 ml-6">OFFERS</a>
            <a href="/products" className="hover:text-gray-400 ml-6">ABOUT US</a>
            <a href="/reviews" className="hover:text-gray-400 ml-6">CONTACTS</a>
            <a href="/faq" className="hover:text-gray-400 ml-6">FAQ</a>
            <a href="/contact" className="hover:text-gray-400 ml-6">CONTACT</a>
          </nav>

          {/* Right Icons (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-5 text-[16px]">
            <button className="hover:text-gray-400"><i className="fa-solid fa-magnifying-glass"></i></button>
            <button className="hover:text-gray-400"><i className="fa-solid fa-comment-dots"></i></button>
            <button className="hover:text-gray-400"><i className="fa-solid fa-earth-americas"></i></button>
            {user ? (
              <button className="hover:text-gray-400" onClick={() => router.push("/profile")}>
                <i className="fas fa-user"></i>
              </button>
            ) : (
              <button className="hover:text-gray-400" onClick={toggleLoginModal}>
                <i className="fas fa-user"></i>
              </button>
            )}
            <button className="hover:text-gray-400 relative">
              <i className="fas fa-shopping-cart"></i>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">2</span>
            </button>
          </div>

          {/* Hamburger Menu (Mobile only) */}
          <button className="md:hidden text-white text-xl" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
      </header>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#141414] text-white transform ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 overflow-y-auto`}
      >
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={toggleSidebar}>
          ✕
        </button>
        <nav className="mt-16 flex flex-col space-y-4 px-6 text-xs font-medium">
          {/* Products Dropdown */}
          <button onClick={toggleCategories} className="text-left hover:text-gray-400">
            OUR PRODUCTS
          </button>
          {showCategories && (
            <div className="ml-4 flex flex-col space-y-2">
              {categories?.map((obj, id) => (
                <button
                  key={id}
                  className="text-left hover:text-gray-400"
                  onClick={() => {
                    router.push(`/category/${obj?.name}`);
                    setIsSidebarVisible(false);
                  }}
                >
                  {obj.name}
                </button>
              ))}
            </div>
          )}
          <a href="/products" className="hover:text-gray-400">OFFERS</a>
          <a href="/products" className="hover:text-gray-400">ABOUT US</a>
          <a href="/reviews" className="hover:text-gray-400">CONTACTS</a>
          <a href="/faq" className="hover:text-gray-400">FAQ</a>
          <a href="/contact" className="hover:text-gray-400">CONTACT</a>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Modals */}
      {forgetPasswordModal && (
        <ForgetPasswordModal
          forgetPasswordModal={forgetPasswordModal}
          setForgetPasswordModal={setForgetPasswordModal}
        />
      )}
      {signupModal && (
        <Signup
          setSignupModal={setSignupModal}
          setIsLoginModalVisible={setIsLoginModalVisible}
        />
      )}
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
