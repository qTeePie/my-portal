import { useReadContract } from "wagmi";
import { mini721ContractConfig } from "../../contarcts";

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
    isLoading,
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
    console.log("📡 Fetching total supply...");
    const result = await refetch(); // <- wait for result
    console.log("✅ Total supply:", result.data);
    return result;
  };

  return {
    readTotalSupply,
    totalSupply,
    isLoading,
    error,
  };
};
