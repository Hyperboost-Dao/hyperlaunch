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
        <Link href="/gov/tangelo-dao">
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
    </div>
  );
}
