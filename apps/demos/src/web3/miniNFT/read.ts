import { useReadContract } from "wagmi";
import { readContract } from "wagmi/actions";

// local
import { wagmiConfig as config } from "../config";
import { mini721ContractConfig } from "../contracts";

const svgToBase64 = (svg: string): string =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

export const useSvg = () => {
  const { data } = useReadContract({
    ...mini721ContractConfig,
    functionName: "svg",
  });

  if (typeof data !== "string") return null;
  // encode to Base64 HERE
  return svgToBase64(data);
};

export const useTotalSupply = () => {
  const {
    data: totalSupply,
    isPending,
    error,
    refetch,
  } = useReadContract({
    ...mini721ContractConfig,
    functionName: "totalSupply",
    query: {
      enabled: false,
    },
  });

  const readTotalSupply = async () => {
    const result = await refetch();
    return result;
  };

  return {
    readTotalSupply,
    totalSupply,
    isPending,
    error,
  };
};

export const readOwnerOf = async (tokenId: bigint) => {
  try {
    const owner = await readContract(config, {
      ...mini721ContractConfig,
      functionName: "ownerOf",
      args: [tokenId],
      authorizationList: [], // temp fix for viem 7702 typing bug
    });
    return owner as `0x${string}`;
  } catch (err) {
    console.error("❌ Failed to read ownerOf:", err);
    return null;
  }
};

export const useBalanceOf = () => {
  const {
    data: balanceOf,
    isPending,
    isError,
    error,
    refetch,
  } = useReadContract({
    ...mini721ContractConfig,
    functionName: "balanceOf",
    query: { enabled: false },
  });

  const readBalanceOf = async (owner: `0x${string}`) => {
    const result = await (refetch as any)({ args: [owner] });
    return result.data;
  };

  return { balanceOf, isPending, isError, error, readBalanceOf };
};
