import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MatchRoom: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: matchData } = useScaffoldContractRead({
    contractName: "TowerTumble",
    functionName: "getMatcheByID",
    args: [id as any],
  });

  const { data: playersData } = useScaffoldContractRead({
    contractName: "TowerTumble",
    functionName: "getPlayerByMatchID",
    args: [id as any],
  });

  const { writeAsync: stackBlock } = useScaffoldContractWrite({
    contractName: "TowerTumble",
    functionName: "stackBlock",
    args: [id as any],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Match #{matchData?.id.toString()}</span>
        </h1>

        <p>Number of Blocks: {matchData?.blocks.toString()}</p>
        <p>Game Over: {matchData?.isFinish ? "Yes" : "No"}</p>
        {playersData?.map((p, index) => (
          <Address key={index} address={p} />
        ))}

        <button
          className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={() => stackBlock()}
        >
          Stack
        </button>
        <button
          className="py-2 px-16 mb-1 mt-3 bg-gray-300 rounded baseline hover:bg-gray-200 disabled:opacity-50"
          onClick={() => router.push("/example-ui")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MatchRoom;
