import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

// local
import {
  useSvg,
  useTotalSupply,
  useBalanceOf,
  readOwnerOf,
} from "../web3/miniNFT/read";
import { useMint } from "../web3/miniNFT/write";

import { demos } from "../data/demos";
import { DemoLayout } from "../components/layouts/DemoLayout";

import { NFTCarosel } from "../components/NFTCarosel";
import { Modal } from "../components/Modal";
import { ActionLog } from "../components/ActionLog";

import type { LogEntry } from "../components/ActionLog";
import type { UI_NFT } from "../data/UI_NFT";

export const previewNFTs: UI_NFT[] = [
  { label: "ICE", svg: "/icons/tmp/ICE.svg" },
  { label: "EMERALD", svg: "/icons/tmp/EMERALD.svg" },
  { label: "COPPER", svg: "/icons/tmp/COPPER.svg" },
];

// ❗ TODO: for write events [Gas Usage] in log entry
export const DemoPage = () => {
  const { address, isConnected } = useAccount();

  const { demoId } = useParams();
  const demo = demos.find((d) => d.id === demoId);

  if (!demo) {
    return (
      <div className="text-center text-red-400 mt-20">Demo not found.</div>
    );
  }

  if (!isConnected || !address) {
    return <p className="text-center mt-10">Please connect a wallet first.</p>;
  }

  const [index, setIndex] = useState(0);

  // WRITE TO CONTARCT STUFF
  const { mint, status } = useMint(address);
  const [showMintModal, setShowMintModal] = useState(false);

  // READ FROM CONTARCT STUFF
  const { readTotalSupply } = useTotalSupply();
  const { readBalanceOf } = useBalanceOf();

  const [showReadModal, setShowReadModal] = useState(false);
  const [activeRead, setActiveRead] = useState<"ownerOf" | "balanceOf" | null>(
    null,
  );
  const [readArgument, setReadArgument] = useState("");

  const readModes = {
    ownerOf: {
      label: "Owner of which token?",
      placeholder: "tokenId",
      button: "Read Owner",
      action: async (input: string) => {
        const owner = await readOwnerOf(BigInt(input));
        return `🔍 Owner of = ${owner}`;
      },
    },
    balanceOf: {
      label: "Balance of which address?",
      placeholder: "address",
      button: "Read Balance",
      action: async (input: string) => {
        const balance = await readBalanceOf(input as `0x${string}`);
        return `🔢 Balance = ${balance}`;
      },
    },
  } as const;
  const mode = activeRead ? readModes[activeRead] : null;

  // OUTPUTS
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const pushLog = (entry: LogEntry) => {
    setLogs((prev) => [...prev, entry]);
  };

  const svg = useSvg();

  return (
    <>
      <DemoLayout
        title={demo.title}
        desc={demo.desc}
        codeUrl="https://example.com/code"
        repoUrl="https://github.com/a2zblocks/example"
        contractUrl="https://etherscan.io/address/0x123"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Actinon Buttons */}
          <div className="flex flex-row items-center gap-3 ">
            {/* ✅ PRIMARY MINT BUTTON */}
            <button
              disabled={status === "pending"}
              onClick={() => setShowMintModal(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              🎨 Mint New
            </button>

            {/* TOTAL SUPPLY */}
            <button
              onClick={async () => {
                const supply = await readTotalSupply();
                pushLog({
                  type: "info",
                  message: `📊 Total Supply = ${supply.data}`,
                });
              }}
              className="btn btn-secondary flex items-center gap-2"
            >
              📊 Supply
            </button>

            {/* OWNER OF */}
            <button
              onClick={() => {
                setShowReadModal(true);
                setActiveRead("ownerOf");
              }}
              className="btn btn-secondary flex items-center gap-2"
            >
              🔍 Owner
            </button>

            {/* BALANCE OF */}
            <button
              onClick={() => {
                setShowReadModal(true);
                setActiveRead("balanceOf");
              }}
              className="btn btn-secondary flex items-center gap-2"
            >
              🔢 Balances
            </button>
          </div>

          {/* NFT Preview*/}
          <div
            className="
              w-80 h-64
              grid place-items-center
              border border-soft rounded-lg
              bg-black/30
            "
          >
            {!svg ? (
              <p>Loading SVG...</p>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <img width={160} src={svg} alt="NFT preview" />
                <div className="flex flex-col gap-1 text-md">
                  <span>Token #3 • Owner: 0x1234…abcd</span>
                  <div className="flex justify-around">
                    <span className="text-pink">[ Transfer ]</span>
                    <span className="text-mango">[ Change NFT Color ]</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Log / Status Box */}
          <ActionLog logs={logs} />

          {/* About & Specs */}
          <div className="flex flex-col gap-4 w-1/2 text-start">
            {/* Seperator */}
            <div className="h-[1px] bg-secondary" />

            {/* About */}
            <h3 className="font-semibold">About MiniNFT</h3>
            <ul className="list-cyber font-mono text-sm space-y-1 text-muted">
              <li>Mint + transfer + events</li>
              <li>Teaches selector handling, sstore, logs</li>
              <li>
                Plays with different mapping styles:
                <ul className="not-list-cyber list-sub py-1 text-sm text-muted">
                  <li>Simple linear mapping</li>
                  <li>Realistic keccak(key, slot)</li>
                </ul>
              </li>
            </ul>

            {/* Seperator */}
            <div className="h-[1px] bg-secondary" />

            {/* Technical Specifications */}
            <h3 className="font-semibold">Spec Sheet</h3>
            <ul className="list-cyber font-mono text-sm space-y-1 text-muted">
              <li>Bytecode Size: ~400 bytes</li>
              <li>
                Storage
                <ul className="not-list-cyber list-sub py-1 text-sm text-muted">
                  <li>2 x mappings</li>
                  <li>1 x uint256 packed with Supply + Flags</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="border-t border-b border-soft text-accent my-4 px-2 py-4">
            <p>
              ⚠ <strong>NB:</strong> Though MiniNFT is an NFT, it does not
              comply with the ERC721 standard.
            </p>
            <p>Minis will not display in any wallet. 👻</p>
          </div>
        </div>
      </DemoLayout>

      <Modal isOpen={showMintModal} onClose={() => setShowMintModal(false)}>
        <div className="flex flex-col items-center gap-4">
          <NFTCarosel items={previewNFTs} index={index} onChange={setIndex} />
          <button
            className="btn btn-primary mt-3"
            onClick={() => mint(address)}
          >
            Mint Selected
          </button>
        </div>
      </Modal>
      {mode && (
        <Modal isOpen={showReadModal} onClose={() => setShowReadModal(false)}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-4 self-stretch mx-4 my-2">
              <span>{mode.label}</span>
              <input
                placeholder={mode.placeholder}
                onChange={(e) => setReadArgument(e.target.value)}
                className="
                  input input-primary 
                  border border-soft rounded-lg p-1
                  bg-black/30
                "
              />
            </div>
            <button
              onClick={async () => {
                try {
                  const msg = await mode.action(readArgument);
                  pushLog({ type: "info", message: msg });
                } catch (err) {
                  pushLog({
                    type: "error",
                    message: `❌ ${(err as Error).message || "Action failed"}`,
                  });
                }
              }}
              className="btn btn-secondary"
            >
              {mode.button}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
