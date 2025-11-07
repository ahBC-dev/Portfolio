import Navitems from "./subComponents/Navitems"
import ThemeToggle from "./subComponents/ThemeToggle"

const Header = () => {
  return (
    <div className="fixed top-3 md:top-0 z-40 flex flex-row w-full md:max-w-[600px] gap-1 lg:max-w-[750px]"> {/* NO width classes */}
      <nav className="w-full">
        <Navitems />
      </nav>
      <ThemeToggle />
    </div>
  )
}

export default Header