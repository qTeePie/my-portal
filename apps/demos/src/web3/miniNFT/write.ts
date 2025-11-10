import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mini721ContractConfig } from "../contracts";

export const useMint = (sender: string) => {
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
      account: sender,
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
