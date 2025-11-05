import { useState } from "react";

const nftOptions = [
    { label: "ICE", src: "/icons/tmp/ICE.svg" },
    { label: "EMERALD", src: "/icons/tmp/EMERALD.svg" },
    { label: "COPPER", src: "/icons/tmp/COPPER.svg" },
];

export const MintNFTDisplay = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % nftOptions.length);
  const prev = () => setIndex((i) => (i - 1 + nftOptions.length) % nftOptions.length);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* NFT Image */}
      <div className="w-50 h-50 flex items-center justify-center">
        <img src={nftOptions[index].src} alt={nftOptions[index].label} className="w-full h-full object-contain" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={prev}>←</button>
       {/* FIX: reserve space so arrows never shift */}
        <span className="text-center w-24">
          {nftOptions[index].label}
        </span>
        <button onClick={next}>→</button>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {nftOptions.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{
              background: i === index ? "white" : "gray",
            }}
          />
        ))}
      </div>
    </div>
  );
};
