import Image from "next/image"
import Link from "next/link"
import { SidebarItem } from "./SidebarItem"
import { IoBasketOutline, IoCalendar, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson } from "react-icons/io5"
import { LogoutButton } from "./LogoutButton"

import { auth } from "@/auth"


const menuItems =
  [
    {
      icon: <IoCalendar />,
      path: "/dashboard",
      title: "Dashboard"
    },
    {
      icon: <IoCheckboxOutline />,
      title: "Rest TODOS",
      path: "/dashboard/rest-todos",
    },
    {
      icon: <IoListOutline />,
      title: "Server Actions",
      path: "/dashboard/server-todos",
    },
    {
      icon: <IoCodeWorkingOutline />,
      title: "Cookies",
      path: "/dashboard/cookies",
    },
    {
      icon: <IoBasketOutline />,
      title: "Products",
      path: "/dashboard/products",
    },
    {
      icon: <IoPerson />,
      title: "Perfil",
      path: "/dashboard/profile",
    },

  ]


export const Sidebar = async () => {

  // de esta forma obtenemos la info del usuario del lado del servidor
  const session = await auth()

  const userName = session?.user?.name ?? "No Name"
  const avatarUrl = (session?.user?.image) ? session.user?.image : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  const userRoles = session?.user?.roles ?? ["client"]


  { console.log(session) }

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={32} height={32} className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image src={avatarUrl} width={80} height={80} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block">{userRoles.join(", ")}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">

          {
            menuItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} path={item.path} title={item.title} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>

  )
}