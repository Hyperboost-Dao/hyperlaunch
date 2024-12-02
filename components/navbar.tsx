"use client";
import { ConnectKitButton } from "connectkit";
import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="p-4">
      <nav className="bg-black w-full border border-gray-800 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3">
            {/* for future use */}
            {/* <Logo className="w-10 h-10 fill-white" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Hyperlaunch 🚀
            </span>
          </a>
          <div className="flex gap-12">
            <Link href={"/"}> Live Projects</Link>
            <Link href={"/create"}> Create Bonding Curve</Link>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <ConnectKitButton />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
