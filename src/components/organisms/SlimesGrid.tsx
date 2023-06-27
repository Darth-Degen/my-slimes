import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import axios from "axios";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { slimesWhitelist } from "src/constants";
import { Slime } from "src/types";

interface Props {
  selectedNft: Slime | undefined;
  setSelectedNft: Dispatch<SetStateAction<Slime | undefined>>;
}

const SlimesGrid: FC<Props> = ({ selectedNft, setSelectedNft }) => {
  const [slimes, setSlimes] = useState<Slime[]>([]);
  const connection = new Connection(
    "https://cold-sparkling-darkness.solana-mainnet.discover.quiknode.pro/"
  );
  const metaplex = new Metaplex(connection);

  // TODO: obtain all slimes from the blockchain
  const fetchAllSlimes = async () => {
    const jsonArr: any = [];
    await Promise.all(
      slimesWhitelist.map(async (tokenId) => {
        const mintAddress = new PublicKey(tokenId);
        const nft = await metaplex.nfts().findByMint({ mintAddress });
        const uri = nft?.uri;
        try {
          await axios.get(uri).then((r) => {
            jsonArr.push(r.data);
          });
        } catch (e: any) {
          console.error(e.message);
        }
      })
    );
    return jsonArr;
  };

  useEffect(() => {
    fetchAllSlimes().then((slimes) => {
      setSlimes(slimes);
      console.log(slimes);
    });
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 py-10 px-4 xl:px-0">
      {slimes &&
        slimes
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((slime, index) => {
            return (
              <div
                className="col-span-1 flex flex-col items-center"
                key={index}
              >
                <Image
                  src={slime.image ?? ""}
                  width={250}
                  height={250}
                  alt={slime.name}
                  onClick={() => {
                    setSelectedNft(slime);
                    scroll({ top: 0, behavior: "smooth" });
                  }}
                  className={`${
                    selectedNft?.name === slime.name
                      ? "border-black"
                      : "border-transparent"
                  }
                  border-2 rounded-xl overflow-hidden cursor-pointer`}
                />
                <p className="text-black">{slime.name}</p>
              </div>
            );
          })}
    </div>
  );
};

export default SlimesGrid;
