//import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useAccount } from 'wagmi'

// local
import { useSVGRead } from "../web3/hooks/mini721/read";
import { demos } from "../data/demos";
import { DemoLayout } from "../components/layouts/DemoLayout";

export const DemoPage = () => {
  const { address, isConnected } = useAccount();

  const { demoId } = useParams();
  const demo = demos.find((d) => d.id === demoId);

  if (!demo) {
    return (
      <div className="text-center text-red-400 mt-20">Demo not found.</div>
    );
  }

  if (!isConnected) {
   return <p className="text-center mt-10">Please connect a wallet first.</p>
  }

  const svg = useSVGRead();
  console.log(svg);

  return (
    <DemoLayout
      title={demo.title}
      desc={demo.desc}
      codeUrl="https://example.com/code"
      repoUrl="https://github.com/a2zblocks/example"
      contractUrl="https://etherscan.io/address/0x123"
    >
      <div className="flex flex-col items-center gap-8">
        
        {/* Actinon Buttons */}
        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">Mint NFT</button>
          <button className="btn btn-primary">Show Total Supply</button>
          <button className="btn btn-primary">Owner Of #ID</button>
        </div>
        {/* NFT Preview*/}
        <div
          className="
          w-80 
          flex flex-col justify-center items-center 
          border border-subtle rounded-lg
        "
        >
          <img
            src={`icons/nft.svg`}
            alt="nft"
            className="demo-card__icon w-50 h-50 object-contain mb-4 mt-2"
          />
        </div>
         {/* Safe since its only for the SVG fetched from our own (!!) smart contract*/}
        {svg && (
        <div
          className="w-[400px] h-[400px] border border-red-500"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
        {/* Action Log / Status Box */}
        <div className="h-40 w-80 border border-subtle rounded-lg"></div>

        {/* Seperator */}
        <div className="h-[1px] w-1/2 bg-subtle" />

        {/* About Section */}
        <div className="text-start">
          <h3 className="font-semibold">About Mini721</h3>
          <ul>
            <li>100& Yul — no Solidity, no OZ </li>
            <li>Gas-lean storage layout (single mapping)</li>
            <li>Minimal ERC-721: mint + transfer + events</li>
            <li>Teaches selector handling, sstore, logs on an OpCode level</li>
          </ul>
        </div>

        {/* Seperator */}
        <div className="h-[1px] w-1/2 bg-subtle" />

        {/* Technical Specifications */}
        <div className="text-start">
          <h3 className="font-semibold">About Mini721</h3>
          <ul>
            <li>100& Yul — no Solidity, no OZ </li>
            <li>Gas-lean storage layout (single mapping)</li>
            <li>Minimal ERC-721: mint + transfer + events</li>
            <li>Teaches selector handling, sstore, logs on an OpCode level</li>
          </ul>
        </div>
      </div>
    </DemoLayout>
  );
};
