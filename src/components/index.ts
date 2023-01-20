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
const ExpIcon = dynamic(()=> import("./@icons/ExpIcon"))
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
const Menu = dynamic(() => import("./molecules/Menu"))
const PageLoadAnimation = dynamic(() => import("./molecules/PageLoadAnimation"))
const Paragraph = dynamic(() => import("./molecules/Paragraph"))
const AssetDisplay = dynamic(() => import("./molecules/AssetDisplay"))
//organisms
const Header = dynamic(()=> import("./organisms/Header"))
const Footer = dynamic(()=> import("./organisms/Footer"))
const MobileDisplay = dynamic(() => import("./organisms/MobileDisplay"))
const MenuController = dynamic(() => import("./organisms/MenuController"))
const AboutSection = dynamic(() => import("./organisms/AboutSection"))
const ScumSection = dynamic(() => import("./organisms/ScumSection"))
//templates
const PageLayout = dynamic(()=> import("./templates/PageLayout"))
const DownloadView = dynamic(()=> import("./templates/DownloadView"))
const LandingPage = dynamic(()=> import("./templates/LandingPage"))

export {
  PageHead,
  Logo,
  Header, 
  Footer,
  PageLayout,
  SunIcon,
  MoonIcon,
  ThemeChanger,
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
  MobileDisplay,
  TwitterIcon,
  DiscordIcon,
  LoadCircle,
  LogoIcon,
  MenuIcon,
  MenuController,
  Menu,
  CloseIcon,
  LogoText,
  PageLoadAnimation,
  LandingPage,
  AboutSection,
  ScumSection,
  Paragraph,
  ExpIcon,
  AssetDisplay
}