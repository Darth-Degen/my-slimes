import dynamic from "next/dynamic";

//icons
const SunIcon = dynamic(()=> import("./@icons/SunIcon"))
const MoonIcon = dynamic(()=> import("./@icons/MoonIcon"))
const ArrowIcon = dynamic(()=> import("./@icons/ArrowIcon"))
const TwitterIcon = dynamic(()=> import("./@icons/TwitterIcon"))
const DiscordIcon = dynamic(()=> import("./@icons/DiscordIcon"))
const LogoIcon = dynamic(()=> import("./@icons/LogoIcon"))
const MenuIcon = dynamic(()=> import("./@icons/MenuIcon"))
const CloseIcon = dynamic(()=> import("./@icons/CloseIcon"))
//atoms
const DropdownButton = dynamic(()=> import("./atoms/DropdownButton"))
const DropdownItem = dynamic(()=> import("./atoms/DropdownItem"))
const NumberInput = dynamic(()=> import("./atoms/NumberInput"))
const TextInput = dynamic(()=> import("./atoms/TextInput"))
const Button = dynamic(()=> import("./atoms/Button"))
const CheckBox = dynamic(()=> import("./atoms/CheckBox"))
const LoadAnimation = dynamic(()=> import("./atoms/LoadAnimation"))
const LoadCircle = dynamic(()=> import("./atoms/LoadCircle"))
const LogoText = dynamic(()=> import("./atoms/LogoText"))
//molecules
const PageHead = dynamic(()=> import("./molecules/PageHead"))
const Logo = dynamic(()=> import("./molecules/Logo"))
const ThemeChanger = dynamic(()=> import("./molecules/ThemeChanger"))
const Dropdown = dynamic(()=> import("./molecules/Dropdown"))
const ButtonBar = dynamic(()=> import("./molecules/ButtonBar"))
const Menu = dynamic(() => import("./molecules/Menu") )
//organisms
const Header = dynamic(()=> import("./organisms/Header"))
const Footer = dynamic(()=> import("./organisms/Footer"))
const StepContainer = dynamic(()=> import("./organisms/StepContainer"))
const Form = dynamic(() => import("./organisms/Form") )
const MobileDisplay = dynamic(() => import("./organisms/MobileDisplay") )
const MenuController = dynamic(() => import("./organisms/MenuController") )
//templates
const PageLayout = dynamic(()=> import("./templates/PageLayout"))
const DownloadView = dynamic(()=> import("./templates/DownloadView"))

export {
  PageHead,
  Logo,
  Header, 
  Footer,
  PageLayout,
  SunIcon,
  MoonIcon,
  ThemeChanger,
  StepContainer,
  Dropdown,
  DropdownButton,
  ArrowIcon,
  DropdownItem,
  NumberInput,
  TextInput,
  CheckBox,
  Button,
  DownloadView,
  LoadAnimation,
  Form,
  MobileDisplay,
  TwitterIcon,
  DiscordIcon,
  LoadCircle,
  ButtonBar,
  LogoIcon,
  MenuIcon,
  MenuController,
  Menu,
  CloseIcon,
  LogoText
}