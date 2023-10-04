import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl mt-10 mb-0">Join a Game</h2>
        <div className="flex justify-center px-4 md:px-0 mt-5">
          <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
            <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
              <thead>
                <tr className="rounded-xl text-sm text-base-content">
                  <th className="bg-primary">Game ID</th>
                  <th className="bg-primary">Number Of Players</th>
                  <th className="bg-primary">Prize Pool</th>
                  <th className="bg-primary">Is Finish?</th>
                  <th className="bg-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <td className="w-1/12 md:py-4">1</td>
                  <td className="w-3/12 md:py-4">10</td>
                  <td className="w-3/12 md:py-4">1 ETH</td>
                  <td className="w-2/12 md:py-4">
                    <p>No</p>
                  </td>
                  <td className="w-2/12 md:py-4">
                    <button
                      className="py-2 px-16 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
                      onClick={() => console.log("Join")}
                    >
                      Join
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
