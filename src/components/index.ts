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
const CrackVector = dynamic(()=> import("./@icons/CrackVector"))
const FlowerVector = dynamic(()=> import("./@icons/FlowerVector"))
const PaddleVector = dynamic(()=> import("./@icons/PaddleVector"))
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
const Modal = dynamic(()=> import("./atoms/Modal"))
const ImageShimmer = dynamic(()=> import("./atoms/ImageShimmer"))
const ScrollProgress = dynamic(()=> import("./atoms/ScrollProgress"))
//molecules
const PageHead = dynamic(()=> import("./molecules/PageHead"))
const Logo = dynamic(()=> import("./molecules/Logo"))
const ThemeChanger = dynamic(()=> import("./molecules/ThemeChanger"))
const Dropdown = dynamic(()=> import("./molecules/Dropdown"))
const Menu = dynamic(() => import("./molecules/Menu"))
const PageLoadAnimation = dynamic(() => import("./molecules/PageLoadAnimation"))
const Paragraph = dynamic(() => import("./molecules/Paragraph"))
const AssetDisplay = dynamic(() => import("./molecules/AssetDisplay"))
const SplashScreen = dynamic(() => import("./molecules/SplashScreen"));
const MenuItem = dynamic(() => import("./molecules/MenuItem"));
//organisms
const Header = dynamic(()=> import("./organisms/Header"))
const Footer = dynamic(()=> import("./organisms/Footer"))
const MenuController = dynamic(() => import("./organisms/MenuController"))
const AboutSection = dynamic(() => import("./organisms/AboutSection"))
const ScumSection = dynamic(() => import("./organisms/ScumSection"))
//templates
const PageLayout = dynamic(()=> import("./templates/PageLayout"))
const LandingView = dynamic(()=> import("./templates/LandingView"))
const WhatView = dynamic(()=> import("./templates/WhatView"))
const WhoView = dynamic(()=> import("./templates/WhoView"))
const FriendsView = dynamic(()=> import("./templates/FriendsView"))
const WhereView = dynamic(()=> import("./templates/WhereView"))

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
  LoadAnimation,
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
  LandingView,
  AboutSection,
  ScumSection,
  Paragraph,
  ExpIcon,
  AssetDisplay,
  Modal,
  SplashScreen,
  ImageShimmer,
  CrackVector,
  FlowerVector,
  PaddleVector,
  MenuItem,
  WhatView,
  WhoView,
  FriendsView,
  WhereView,
  ScrollProgress
}