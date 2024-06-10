'use client'

// solo se puede usar del lado del cliente este paquete
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useState } from "react";


// https://tailwindcomponents.com/component/radio-buttons-1

const tabOptions = ["1", "2", "3", "4"]

interface Props {
  currentTab?: number;
  tabOptions?: string[]
}

export const TabBar = ({ tabOptions = ["1", "2", "3", "4"], currentTab = 1 }: Props) => {

  const router = useRouter()
  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setSelected(tab)

    // aca guardo la cookie cada vez que cambie de tab
    setCookie("selectedTab", String(tab))
    router.refresh()
  }


  return (
    <div className={`
    grid w-full space-x-2 rounded-xl bg-gray-200 p-2
    grid-cols-${tabOptions.length}
    `}>

      {
        tabOptions.map((tab) => (
          <div key={tab}>
            {/* el onChange={() => onTabSelected(Number(tab))} lo defino por buena practica aunque no lo uso, podria poner una funcion vacia si quisiera */}
            <input checked={selected === Number(tab)} onChange={() => onTabSelected(Number(tab))} type="radio" id={tab} className="peer hidden " />
            <label onClick={() => onTabSelected(Number(tab))} className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>
        ))
      }


    </div>
  )
}