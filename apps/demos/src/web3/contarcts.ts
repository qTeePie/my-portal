export const mini721ContractConfig = {
  address: "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E",
  abi: [
    {
      type: "function",
      name: "svg",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "svgData", type: "string" }],
    },
    {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{ name: "supply", type: "uint256" }],
    },
    {
      type: "function",
      name: "mint",
      stateMutability: "nonpayable",
      inputs: [{ name: "to", type: "address" }],
      outputs: [],
    },
  ],
} as const;
