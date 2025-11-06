export type UI_NFT = {
  label: string; // e.g. "ICE"
  svg: string; // full SVG or IPFS URI / base64 string
  tokenId?: bigint; // only exists if minted
  owned?: boolean; // true if wallet owns it
  colorCode?: number; // optional metadata if needed later
};
