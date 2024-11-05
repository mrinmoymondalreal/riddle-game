"use client";

import CheckedButton from "@/components/CheckedButton";
import { usePlayerStore } from "@/lib/store";
import { useEffect, useState } from "react";

function ActionButton({ text, link }: { text: string; link: string }) {
  return (
    <div className="w-[70%]">
      <CheckedButton link={link} className="py-4 text-2xl font-bold w-full">
        {text}
      </CheckedButton>
    </div>
  );
}

type Dashboard = {
  totalGames: string;
  totalScore: string;
};

export default function Home() {
  const { name, gender } = usePlayerStore();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    if (window) {
      let dashboard = JSON.parse(localStorage.getItem("dashboard") || "{}");
      if (Object.keys(dashboard).length == 0) {
        localStorage.setItem(
          "dashboard",
          JSON.stringify({ totalGames: 0, totalScore: 0 })
        );
        dashboard = JSON.parse(localStorage.getItem("dashboard") || "");
      }

      setDashboard(dashboard as Dashboard);
    }
  }, []);

  return (
    <div className="relative bg-black min-h-svh py-6 text-[#f2f2f2] px-2 md:px-12 w-full flex items-center">
      <div className="flex-1 mx-auto max-w-lg h-full space-y-6 flex flex-col items-center justify-center">
        <section className="font-bold text-center text-3xl">
          Welcome, <br /> {name}
        </section>
        <div className="w-[50%] md:w-[40%] aspect-square rounded-full bg-slate-500">
          <img
            src={`https://avatar.iran.liara.run/public/${gender == 0 ? "boy" : "girl"}?username=${name}`}
            alt={`${name}'s Avatar`}
          />
        </div>
        <section className="bg-slate-800 max-w-fit  px-6 flex justify-center gap-x-8 py-2 rounded-md">
          <div className="flex flex-col items-center">
            <span className="font-medium text-center text-xs md:text-sm">
              Games
            </span>
            <span className="font-bold text-2xl">
              {dashboard?.totalGames || 0}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium text-center text-xs md:text-sm">
              Score
            </span>
            <span className="font-bold text-2xl">
              {parseInt((dashboard?.totalScore || "0").toString())}
            </span>
          </div>
          {/* <div className="flex flex-col items-center first:pl-0 last:pr-0 px-4 last:border-none">
            <span className="font-medium text-center text-xs md:text-sm">
              Avg Time
            </span>
            <span className="font-bold text-2xl">5s</span>
          </div> */}
        </section>
        <section className="w-full flex-col flex items-center space-y-6">
          <ActionButton link="/game" text="Enter New Game" />
          {/* <ActionButton link="/enter_room" text="Enter Room" />
          <ActionButton link="/create_room" text="Create New Room" /> */}
        </section>
        <section>Made with ❤️ by Mrinmoy Mondal</section>
      </div>
    </div>
  );
}
