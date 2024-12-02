import { Input } from "@/components/ui/input";
import Citrea from "@/assets/citrea-origins.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-32">
      <div className="flex flex-row gap-4">
        <Input
          className="h-12 rounded-xl border-b bg-zinc-950"
          placeholder="Search Launchpad Projects"
        />
      </div>
      <div className="py-4 font-bold opacity-85">Explore Projects</div>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/token/0xB1A2c34fE0d8aB9987E69d8C4A9a7A82c3f3B672">
          <div className="bg-zinc-950 border border-gray-400 rounded-xl p-4">
            <div className="text-lg font-bold">Tangelo DAO</div>
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                width={260}
                height={260}
                alt="Tangelo DAO"
              />
            </div>
            <div className="text-sm opacity-75">
              Build Privacy-Focused DAOs for Inclusive Communities
            </div>
          </div>
        </Link>
        <Link href="/token/0x9F8e7E5C2AcB4eFf017123D4FbE6b81eAb38C9D1">
          <div className="bg-zinc-950 border border-gray-400 rounded-xl p-4">
            <div className="text-lg font-bold">Aurum</div>
            <div className="flex items-center justify-center">
              <Image src="/acoin.png" width={260} height={260} alt="Aurum" />
            </div>
            <div className="text-sm opacity-75">
              A play on &quot;DeFi&quot; with a rebellious touch.
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="bg-zinc-950 border border-gray-400 rounded-xl p-4">
            <div className="text-lg font-bold">New Project (soon...)</div>
            <div className="flex items-center justify-center">
              <Citrea className="fill-current text-[#d4ff00] h-60 w-60" />
            </div>
            <div className="text-sm opacity-75">
              Uniting elite developers to build applications that will pave the
              adoption path for a onChain economy.
            </div>
          </div>
        </Link>
      </div>
      <br />
      <div className="py-4 font-bold opacity-85">Bonding Completed</div>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/token/0x7eFa4B29dCA9AfD5F78Cc12d91E08F51eAc937E4?completed">
          <div className="bg-zinc-950 border border-gray-400 rounded-xl p-4">
            <div className="text-lg font-bold">Zenix</div>
            <div className="flex items-center justify-center">
              <Image src="/coffee.png" width={260} height={260} alt="Zenix" />
            </div>
            <div className="text-sm opacity-75">
              Empowering the Future of Decentralized Finance
            </div>
          </div>
        </Link>
        <Link href="/token/0xC3B2D88Fc1e0BdAB0C89E1D72De34B8c9FaC7a90?completed">
          <div className="bg-zinc-950 border border-gray-400 rounded-xl p-4">
            <div className="text-lg font-bold">Solari</div>
            <div className="flex items-center justify-center">
              <Image src="/tree.png" width={260} height={260} alt="Solari" />
            </div>
            <div className="text-sm opacity-75">
              Inspired by the sun, symbolizing energy and vitality.
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
