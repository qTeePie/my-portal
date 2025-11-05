import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mini721ContractConfig } from "../../contarcts";

export const useMint = (address: string) => {
  const { data: txHash, writeContract, status } = useWriteContract();

  const {
    isSuccess,
    isError, // revert on chain
    error: txError, // error msg
  } = useWaitForTransactionReceipt({ hash: txHash });

  const mint = (to: `0x${string}`) =>
    writeContract({
      ...mini721ContractConfig,
      functionName: "mint",
      args: [to],
      account: address,
    });

  return {
    mint,
    txHash,
    status,
    isSuccess,
    isError,
    txError,
  };
};
