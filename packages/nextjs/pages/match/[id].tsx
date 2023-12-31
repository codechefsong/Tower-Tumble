import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MatchRoom: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();

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

  const { data: blockTime } = useScaffoldContractRead({
    contractName: "TowerTumble",
    functionName: "getBlockTime",
  });

  const { data: deadline } = useScaffoldContractRead({
    contractName: "TowerTumble",
    functionName: "timeLeft",
    args: [id as any, address as any],
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

        <div className="grid lg:grid-cols-2 gap-20 flex-grow mt-10 px-20">
          <div>
            <p>Number of Blocks: {matchData?.blocks.toString()}</p>
            <p>Game Over: {matchData?.isFinish ? "Yes" : "No"}</p>
            {playersData?.map((p, index) => (
              <Address key={index} address={p} />
            ))}

            {/* <p>Current Time: {blockTime?.toString()}</p>
            <p>Deadline: {deadline?.toString()}</p> */}
            <p>
              Time Left:{" "}
              {blockTime?.toString() &&
                deadline?.toString() &&
                parseInt(deadline?.toString()) - parseInt(blockTime?.toString())}{" "}
              Seconds
            </p>
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

          <div className="flex flex-col items-center relative">
            <div className="flex flex-col z-10 justify-end" style={{ height: "500px" }}>
              {!matchData?.isFinish ? (
                Array(matchData?.blocks.toString() ? +matchData?.blocks.toString() : 0)
                  .fill(1)
                  .map((el, index) => (
                    <div key={index} className="w-16 h-16 bg-amber-500 px-5 py-3 border border-gray-30">
                      #{index}
                    </div>
                  ))
              ) : (
                <Image className="mb-20" src="/assets/blocks.png" width={250} height={250} alt="Item" />
              )}
            </div>
            <Image className="field" src="/assets/field.png" width={500} height={800} alt="Item" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchRoom;
