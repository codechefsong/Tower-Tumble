import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Tower Tumble</span>
          </h1>
          <Image className="ml-8" alt="Game" width={320} height={300} src="/assets/game.png" />
          <p className="text-center text-lg">Build a tower of blocks without it tumbling down</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/example-ui"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            >
              Play
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
