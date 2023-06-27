import dynamic from "next/dynamic";
//animations
const WordScroll = dynamic(() => import("./@animations/WordScroll"));
const WordFall = dynamic(() => import("./@animations/WordFall"));
const VideoScroll = dynamic(() => import("./@animations/VideoScroll"));

//icons
const SunIcon = dynamic(() => import("./@icons/SunIcon"));
const MoonIcon = dynamic(() => import("./@icons/MoonIcon"));
const ArrowIcon = dynamic(() => import("./@icons/ArrowIcon"));
const TwitterIcon = dynamic(() => import("./@icons/TwitterIcon"));
const DiscordIcon = dynamic(() => import("./@icons/DiscordIcon"));
const LogoIcon = dynamic(() => import("./@icons/LogoIcon"));
const MenuIcon = dynamic(() => import("./@icons/MenuIcon"));
const CloseIcon = dynamic(() => import("./@icons/CloseIcon"));
const ExpIcon = dynamic(() => import("./@icons/ExpIcon"));
const CrackVector = dynamic(() => import("./@icons/CrackVector"));
const FlowerVector = dynamic(() => import("./@icons/FlowerVector"));
const PaddleVector = dynamic(() => import("./@icons/PaddleVector"));
//atoms
const DropdownButton = dynamic(() => import("./atoms/DropdownButton"));
const DropdownItem = dynamic(() => import("./atoms/DropdownItem"));
const NumberInput = dynamic(() => import("./atoms/NumberInput"));
const TextInput = dynamic(() => import("./atoms/TextInput"));
const Button = dynamic(() => import("./atoms/Button"));
const CheckBox = dynamic(() => import("./atoms/CheckBox"));
const LoadAnimation = dynamic(() => import("./atoms/LoadAnimation"));
const LoadCircle = dynamic(() => import("./atoms/LoadCircle"));
const LogoText = dynamic(() => import("./atoms/LogoText"));
const Modal = dynamic(() => import("./atoms/Modal"));
const ImageShimmer = dynamic(() => import("./atoms/ImageShimmer"));
const ScrollProgress = dynamic(() => import("./atoms/ScrollProgress"));
const WalletButton = dynamic(() => import("./atoms/WalletButton"));
const ConnectButton = dynamic(() => import("./atoms/ConnectButton"));
const GalleryArrowButton = dynamic(() => import("./atoms/GalleryArrowButton"));
const MobileLink = dynamic(() => import("./atoms/MobileLink"));
const SlimeHubButton = dynamic(() => import("./atoms/SlimeHubButton"));
//molecules
const PageHead = dynamic(() => import("./molecules/PageHead"));
const Logo = dynamic(() => import("./molecules/Logo"));
const ThemeChanger = dynamic(() => import("./molecules/ThemeChanger"));
const Dropdown = dynamic(() => import("./molecules/Dropdown"));
const Menu = dynamic(() => import("./molecules/Menu"));
const PageLoadAnimation = dynamic(
  () => import("./molecules/PageLoadAnimation")
);
const Paragraph = dynamic(() => import("./molecules/Paragraph"));
const AssetDisplay = dynamic(() => import("./molecules/AssetDisplay"));
const SplashScreen = dynamic(() => import("./molecules/SplashScreen"));
const MenuItem = dynamic(() => import("./molecules/MenuItem"));
const TextScroll = dynamic(() => import("./molecules/TextScroll"));
const ModalV2 = dynamic(() => import("./molecules/ModalV2"));
const GalleryItem = dynamic(() => import("./molecules/GalleryItem"));
const SFCGalleryItem = dynamic(() => import("./molecules/SFCGalleryItem"));
const SlimesHubFooter = dynamic(() => import("./molecules/SlimesHubFooter"));
//organisms
const Header = dynamic(() => import("./organisms/Header"));
const Footer = dynamic(() => import("./organisms/Footer"));
const MenuController = dynamic(() => import("./organisms/MenuController"));
const AboutSection = dynamic(() => import("./organisms/AboutSection"));
const ScumSection = dynamic(() => import("./organisms/ScumSection"));
const GalleryModal = dynamic(() => import("./organisms/GalleryModal"));
const SFCModal = dynamic(() => import("./organisms/SFCModal"));
const Gallery = dynamic(() => import("./organisms/Gallery"));
const SFCGallery = dynamic(() => import("./organisms/SFCGallery"));
const YourSlimes = dynamic(() => import("./organisms/YourSlimes"));
const SlimesGrid = dynamic(() => import("./organisms/SlimesGrid"));
//templates
const PageLayout = dynamic(() => import("./templates/PageLayout"));
const LandingView = dynamic(() => import("./templates/LandingView"));
const WhatView = dynamic(() => import("./templates/WhatView"));
const WhoView = dynamic(() => import("./templates/WhoView"));
const FriendsView = dynamic(() => import("./templates/FriendsView"));
const WhereView = dynamic(() => import("./templates/WhereView"));
const SlimesHubView = dynamic(() => import("./templates/SlimesHubView"));
const IndexView = dynamic(() => import("./templates/IndexView"));
const LinkFire = dynamic(() => import("./templates/LinkFire"));

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
  ScrollProgress,
  TextScroll,
  GalleryModal,
  ModalV2,
  SlimesHubView,
  Gallery,
  GalleryItem,
  WordScroll,
  WalletButton,
  ConnectButton,
  WordFall,
  GalleryArrowButton,
  MobileLink,
  SlimeHubButton,
  VideoScroll,
  IndexView,
  LinkFire,
  SFCGallery,
  YourSlimes,
  SlimesGrid,
  SFCGalleryItem,
  SlimesHubFooter,
  SFCModal,
};
