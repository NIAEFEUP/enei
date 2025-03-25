import { Navbar } from "~/components/common/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar className="absolute top-0 z-20" variant="blue" />
      <div className="bg-enei-blue overflow-hidden grid grid-cols-1 grid-rows-2 md:flex md:flex-col items-center justify-center size-full h-screen text-enei-beige">
        <div className="h-full flex flex-col items-center justify-end text-[8vw] font-extrabold opacity-80">
          <h1>404</h1>
          <span className="md:hidden">METRO NOT FOUND</span>
        </div>
        <div className="size-full md:h-[50%] flex flex-col items-center justify-end">
          <img src="/images/metro_not_found.svg" className="w-[700px] px-4" alt="404" />
          <div className="w-full md:max-h-[85%]">
            <img src="/images/logo-white-noText.svg" className="w-full" alt="ENEI logo" />
          </div>
        </div>
      </div>
    </>
  )
}