import { useReadContract } from "wagmi";
import { mini721ContractConfig } from "../../contarcts";

const svgToBase64 = (svg: string): string =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

export const useSVGRead = () => {
  const { data } = useReadContract({
    ...mini721ContractConfig,
    functionName: "svg",
  });

  console.log(data);

  if (typeof data !== "string") return null;

  // encode to Base64 HERE
  return svgToBase64(data);
};
