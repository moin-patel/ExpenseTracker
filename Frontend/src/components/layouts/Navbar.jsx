import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from "./Sidemenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <Sidemenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;

// import React, { useState, useRef, useEffect } from "react";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import Sidemenu from "./Sidemenu";
// import { gsap } from "gsap";
// import "./navbar.css";

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   const navRef = useRef(null);
//   const menuRef = useRef(null);
//   const iconRef = useRef(null);

//   // Navbar enter animation
//   useEffect(() => {
//     gsap.fromTo(
//       navRef.current,
//       { y: -80, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
//     );
//   }, []);

//   // Side menu animation
//   useEffect(() => {
//     if (openSideMenu) {
//       gsap.fromTo(
//         menuRef.current,
//         { x: -250, opacity: 0 },
//         { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
//       );
//     }
//   }, [openSideMenu]);

//   const toggleMenu = () => {
//     gsap.to(iconRef.current, {
//       rotate: 180,
//       duration: 0.3,
//       yoyo: true,
//       repeat: 1,
//     });
//     setOpenSideMenu(!openSideMenu);
//   };

//   return (
//     <div
//       ref={navRef}
//       className="flex items-center gap-5 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm py-4 px-7 sticky top-0 z-30 navbar-glow"
//     >
//       <button
//         ref={iconRef}
//         className="block lg:hidden text-black hover:scale-110 transition"
//         onClick={toggleMenu}
//       >
//         {openSideMenu ? (
//           <HiOutlineX className="text-2xl" />
//         ) : (
//           <HiOutlineMenu className="text-2xl" />
//         )}
//       </button>

//       <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
//         Expense Tracker
//       </h2>

//       {openSideMenu && (
//         <div
//           ref={menuRef}
//           className="fixed top-[64px] left-0 w-[240px] h-screen bg-white shadow-xl rounded-r-2xl"
//         >
//           <Sidemenu activeMenu={activeMenu} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
