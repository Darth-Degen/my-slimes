import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Form, MobileDisplay } from "@components";
import { Collection } from "@types";
// import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import "dear-image.detect-background-color";
//@ts-ignore
import DearImage from "dear-image";
import html2canvas from "html2canvas";

interface Props {
  collection: Collection;
  tokenId: number;
  setTokenId: Dispatch<SetStateAction<number>>;
}

const DownloadView: FC<Props> = (props: Props) => {
  const { collection, tokenId, setTokenId } = props;
  const [text, setText] = useState<string>("");
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");

  const timeoutRef = useRef<NodeJS.Timeout>();
  const downloadRef = useRef<NodeJS.Timeout>();

  const [background, setBackground] = useState<string>("bg-[#CF1714]");

  //download image
  const handleDownload = async () => {
    const scale = { scale: 15 };
    const element = document.getElementById("wallpaper");

    if (!element) {
      return;
    }

    const interval = Math.floor(Math.random() * (3000 - 1000) + 1000);

    setIsDownloading(true);
    downloadRef.current = setTimeout(async () => {
      await html2canvas(element, scale).then((canvas) => {
        const data = canvas.toDataURL("image/png");
        download(data, "degen-wallpaper.png", "image/png");
      });
      setIsDownloading(false);
    }, interval);
  };

  //extract background from image
  const getBackground = useCallback(async () => {
    let url = src;
    let imgObj = new window.Image();
    imgObj.src = url + "?" + new Date().getTime();
    imgObj.setAttribute("crossOrigin", "");
    let bg = await DearImage.detectBackgroundColor(imgObj);
    setBackground(bg);
  }, [src]);

  useEffect(() => {
    getBackground();
  }, [getBackground]);

  const handleLoad = useCallback(() => {
    if (!tokenId || !collection) return;

    const interval = Math.floor(Math.random() * (3000 - 1000) + 1000);

    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, interval);
  }, [tokenId, collection]);

  useEffect(() => {
    handleLoad();
    return () => clearTimeout(timeoutRef.current);
  }, [handleLoad]);

  useEffect(() => {
    return () => clearTimeout(downloadRef.current);
  }, []);

  useEffect(() => {
    if (tokenId < 0) {
      return;
    }

    setSrc(
      `/images/hotheads/hothead_character_${
        tokenId < 10 ? "00" : "0"
      }${tokenId}.png`
    );
  }, [tokenId]);

  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-20 items-start px-5">
      <Form
        tokenId={tokenId}
        isLoading={isLoading || isDownloading}
        setTokenId={setTokenId}
        setShowLogo={setShowLogo}
        setText={setText}
        handleDownload={handleDownload}
        isDownloading={isDownloading}
      />
      <MobileDisplay
        background={background}
        showLogo={showLogo}
        tokenId={tokenId}
        isLoading={isLoading}
        text={text}
        src={src}
      />
    </div>
  );
};
export default DownloadView;
