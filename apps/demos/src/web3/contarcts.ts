export const mini721ContractConfig = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
