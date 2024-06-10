import { TabBar } from "@/components";
import { cookies } from "next/headers";



export const metadata = {
  title: 'Cookies Page',
  description: 'SEO Title',
};


export default function CookiesPage() {

  // aca estamos del lado del servidor, lo vemos porque tenemos las metatags y por defecto next hace servers components a menos que indicemos lo contrario con "use client"
  const cookieStore = cookies()

  // puede que no tengamos esta cookie, va a pasar la primera vez no va a existir
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

  // obtener todas las cookies
  const allCookies = cookieStore.getAll()




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      {JSON.stringify(allCookies, null, 2)}

      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={Number(cookieTab)} />
      </div>


    </div>
  );
}