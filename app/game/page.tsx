"use client";

import CheckedButton from "@/components/CheckedButton";
import { RankedPlayer, TopRankedPlayer } from "@/components/Leaderboard";
import {
  QuestionOptions,
  SlideInVariant,
  TimeBar,
  TimeLeft,
} from "@/components/QuizComponents";
import { useGameStatsStore, useGameStore, useTimeStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

function MainPage() {
  const { question, options } = useGameStore();
  const currentScore = useGameStatsStore((state) => state.currentScore);

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
      }}
      className="mx-auto max-w-lg"
    >
      <header className="w-full flex ">
        <button
          className="absolute p-1 box-border  rounded-full"
          onClick={() => {
            localStorage.removeItem("game_data");
            location.href = "/";
          }}
        >
          <X size={30} color="#f2f2f2" />
        </button>
        <div className="block mx-auto">Score: {Math.floor(currentScore)}</div>
        {/* <LeaderboardButton /> */}
      </header>
      <section className=" w-full mt-7">
        <TimeBar />
      </section>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-7 font-bold text-xl text-center mx-auto"
      >
        Question. {question}
      </motion.section>
      <section className="w-full mt-7 px-6 md:px-0">
        <QuestionOptions options={options!} />
      </section>
      {/* <OtherUserStatus /> */}
      <section className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <TimeLeft />
      </section>
    </motion.div>
  );
}

function MainLoadingPage() {
  const questions = useGameStatsStore((state) => state.questions);
  const { currentQuesIndex, set, changeCurrentIndex } = useGameStore();
  const update = useTimeStore((state) => state.update);
  const changeState = useGameStatsStore((state) => state.changeState);

  useEffect(() => {
    if (
      Array.isArray(questions) &&
      questions.length > 0 &&
      (currentQuesIndex || 0) < questions.length - 1
    ) {
      let index = 0;
      if (!currentQuesIndex) {
        changeCurrentIndex(index);
      }
      index = currentQuesIndex || 0;
      update(new Date().getTime());
      set({
        question: questions[index].question + "+  +" + currentQuesIndex,
        options: questions[index].options,
      });
      changeCurrentIndex(index + 1);
      changeState("ready");
    } else if ((currentQuesIndex || 0) == questions.length - 1) {
      changeState("lobby");
    }
  });

  return (
    <motion.div
      layoutId="loader-timer"
      className="aspect-square w-48 bg-slate-500 fixed left-[calc(50%-6rem)] top-[calc(50%-6rem)]"
      initial={{ scale: 1, rotate: 0, borderRadius: "0%" }}
      animate={{
        scale: [1, 0.5, 0.5, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.3,
        layout: {
          duration: 0.5,
          ease: "easeIn",
        },
      }}
    />
  );
}

function MainLobbyPage() {
  const { currentScore, reset } = useGameStatsStore();
  const [isReported, setReported] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    { sum: number; name: string; playerId: string }[] | null
  >(null);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <section className="mx-auto flex justify-center font-bold text-lg">
        Leaderboard
      </section>
      <motion.section
        initial="closed"
        animate="open"
        variants={SlideInVariant}
        className="flex justify-evenly gap-x-4 px-3 py-2"
      >
        {leaderboard && leaderboard[1] && (
          <TopRankedPlayer
            name={leaderboard[1].name}
            rank={2}
            pts={leaderboard[1].sum}
            isDown
          />
        )}
        {leaderboard && leaderboard[0] && (
          <TopRankedPlayer
            name={leaderboard[0].name}
            rank={1}
            pts={leaderboard[0].sum}
            isDown
          />
        )}
        {leaderboard && leaderboard[2] && (
          <TopRankedPlayer
            name={leaderboard[2].name}
            rank={3}
            pts={leaderboard[2].sum}
            isDown
          />
        )}
      </motion.section>
      <motion.section
        initial="closed"
        animate="open"
        variants={SlideInVariant}
        className="space-y-2 pt-0 px-4 py-6"
      >
        {leaderboard &&
          leaderboard
            .slice(3)
            .map((e, index) => (
              <RankedPlayer name={e.name} rank={index + 1 + 3} pts={e.sum} />
            ))}
      </motion.section>
      <section className="fixed bottom-5 left-0 w-full flex justify-center items-center">
        <CheckedButton
          onClick={(e) => {
            e.preventDefault();
            location.href = "/";
          }}
          link="/"
          className="py-4 px-6 text-2xl font-bold w-full"
        >
          Back to Home
        </CheckedButton>
      </section>
    </div>
  );
}

function TempLobby() {
  const currentScore = useGameStatsStore((state) => state.currentScore);

  useEffect(() => {
    if (currentScore == 0) return;
    const dashboard = JSON.parse(localStorage.getItem("dashboard") || "{}");
    dashboard.totalGames = dashboard.totalGames + 1;
    dashboard.totalScore = dashboard.totalScore + currentScore;
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
  }, []);

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-3">
      <section className="mx-auto flex justify-center font-bold text-lg">
        Well Played
      </section>
      <section className="space-y-2">
        <h1 className="text-4xl uppercase font-black">Score</h1>
        <div className="text-2xl">{Math.floor(currentScore)}</div>
      </section>
      <CheckedButton
        onClick={(e) => {
          e.preventDefault();
          location.href = "/";
        }}
        link="/"
        className="mt-8 py-4 px-6 text-2xl font-bold w-full"
      >
        Back to Home
      </CheckedButton>
    </section>
  );
}

export default function Page() {
  const { state, changeState, updateQuestions } = useGameStatsStore();

  useEffect(() => {
    updateQuestions(
      new Array(10).fill({
        question: "This is a tough question",
        options: ["a", "b", "c", "d"],
      })
    );
    changeState("loading");
  }, []);

  return (
    <div className="relative bg-black min-h-svh py-6 text-[#f2f2f2] md:px-12">
      <AnimatePresence mode="wait">
        {state == "loading" && <MainLoadingPage />}
        {state == "ready" && <MainPage />}
        {/* {state == "lobby" && <MainLobbyPage />} */}
        {state == "lobby" && <TempLobby />}
      </AnimatePresence>
    </div>
  );
}
