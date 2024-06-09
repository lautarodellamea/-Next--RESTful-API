"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {

  const pathName = usePathname()

  return (
    <li>
      <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:bg-gradient-to-r hover:from-sky-700 hover:to-cyan-500 hover:bg-sky-600 hover:text-white ${pathName === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
        {/* <CiBookmarkCheck size={30} /> */}
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>

  )
}