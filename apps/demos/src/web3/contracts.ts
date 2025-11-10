const contract_addr = import.meta.env.VITE_CONTRACT_ADDR;

export const mini721ContractConfig = {
  address: contract_addr,
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
      outputs: [{ name: "totalSupply", type: "uint256" }],
    },
    {
      type: "function",
      name: "ownerOf",
      stateMutability: "view",
      inputs: [{ name: "tokenId", type: "uint256" }],
      outputs: [{ name: "owner", type: "address" }],
    },
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "owner", type: "address" }],
      outputs: [{ name: "balance", type: "uint256" }],
    },

    /* WRITE FUNCTIONS */

    {
      type: "function",
      name: "mint",
      stateMutability: "nonpayable",
      inputs: [{ name: "to", type: "address" }],
      outputs: [],
    },
  ],
} as const;
