import {
  useGameStatsStore,
  useGameStore,
  useOptionStore,
  useTimeStore,
} from "@/lib/store";
import { checkAnswer, cn } from "@/lib/utils";
import { motion, TargetAndTransition } from "framer-motion";
import { CheckCircle2, LockIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { RankedPlayer } from "./Leaderboard";

export function TimeBar() {
  let { timeStart, timeEnd } = useTimeStore();

  return (
    <motion.div
      className="mx-auto h-2"
      layoutId="loader-timer"
      transition={{
        duration: 1,
        delay: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
        layout: {
          duration: 0.5,
          ease: "easeIn",
        },
      }}
    >
      <div className="mx-auto w-[60%] h-full bg-gray-900 rounded-full overflow-hidden ">
        <motion.div
          initial={{ scaleX: 0, backgroundColor: "#ffffff" }}
          animate={{ scaleX: 1, backgroundColor: "#ff3232" }}
          transition={{
            duration: (timeEnd - timeStart) / 1000,
          }}
          style={{
            transformOrigin: "left",
            backgroundColor: "white",
          }}
          className="w-full h-full bg-white"
        />
      </div>
    </motion.div>
  );
}

export const SlideInVariant: { [key: string]: TargetAndTransition } = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const SlideInVariantChild: { [key: string]: TargetAndTransition } = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      bounce: 0,
      ease: "easeOut",
    },
  },
  closed: {
    y: 100,
    opacity: 0,
    transition: {
      bounce: 0,
      ease: "easeIn",
    },
  },
};

export function OptionItem({
  seq,
  title,
  index,
  defaultLocked = false,
}: {
  seq: string;
  title: string;
  index: number;
  defaultLocked?: boolean;
}) {
  const [locked, setLocked] = useState(defaultLocked);

  const { selectedOption, update } = useOptionStore();
  const { timeEnd, setOver } = useTimeStore();

  return (
    <motion.li
      onClick={async () => {
        if (selectedOption == null) {
          update(index);
          setLocked(true);
          setOver();
        }
      }}
      variants={SlideInVariantChild}
      className="relative overflow-hidden flex justify-between items-center bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer text-lg font-medium w-full px-5 py-6"
    >
      {selectedOption == index && (
        <motion.div
          transition={{
            duration: (timeEnd - new Date().getTime()) / 1000,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          className="absolute inset-0 bg-white/20"
        />
      )}
      <div className="z-10">
        {seq}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}
      </div>
      <div className="z-10">{locked && <LockIcon size={20} />}</div>
    </motion.li>
  );
}

const characters = ["a", "b", "c", "d"];

export function QuestionOptions({ options }: { options: string[] }) {
  return (
    <motion.ul
      variants={SlideInVariant}
      initial="closed"
      animate="open"
      className="max-w-sm w-full mx-auto space-y-4"
    >
      {options.map((e, i) => (
        <OptionItem key={i} index={i} seq={characters[i]} title={e} />
      ))}
    </motion.ul>
  );
}

export function TimeLeft() {
  const { timeEnd, isOver } = useTimeStore();
  const [timeLeft, setLeft] = useState((timeEnd - new Date().getTime()) / 1000);

  const { updateScore } = useGameStatsStore();
  const questionIndex = useGameStore((state) => state.currentQuesIndex);

  const { selectedOption, reset } = useOptionStore();
  const changeState = useGameStatsStore((state) => state.changeState);

  useEffect(() => {
    async function run() {
      const score = 10 * (timeLeft / 7);
      if (checkAnswer(questionIndex || "", selectedOption || "")) {
        updateScore(score);
      }
      reset();
      changeState("loading");
    }

    if (parseInt(timeLeft.toString()) <= 0 || isOver) {
      run();
    }
  });

  useEffect(() => {
    let time = setTimeout(() => {
      if (timeEnd - new Date().getTime() > 0)
        setLeft((timeEnd - new Date().getTime()) / 1000);
    }, 1000);

    return () => clearTimeout(time);
  });

  return `${parseInt(timeLeft.toString())}s`;
}

export function OtherUserStatus() {
  const [statusCount, setStatusCount] = useState(0);

  useEffect(() => {
    let time = setTimeout(() => setStatusCount((s) => s + 1), 1000);
    return () => clearTimeout(time);
  });

  return (
    <section className="absolute bottom-20 left-0 w-full mt-7 px-6 md:px-0 flex h-12 gap-x-6 justify-center">
      {new Array(4).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "flex justify-center items-center box-border h-full aspect-square rounded-full",
            statusCount < i + 1 ? "border-[5px] border-dashed" : ""
          )}
        >
          {statusCount >= i + 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 size={48} />
            </motion.span>
          )}
        </motion.div>
      ))}
    </section>
  );
}

export function LeaderboardButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="block mx-auto">Leaderboard</Button>
      </DialogTrigger>
      <DialogContent className="auto max-w-sm px-0">
        <section className="text-center font-bold text-lg">Leaderboard</section>
        <motion.section
          initial="closed"
          animate="open"
          variants={SlideInVariant}
          className="space-y-6 pt-2 px-4 py-6 *:bg-transparent"
        >
          <RankedPlayer name="You" rank={4} pts={28} />
          <RankedPlayer name="Mrinmoy" rank={5} pts={28} />
          <RankedPlayer name="Mondal" rank={6} pts={28} />
          <RankedPlayer name="Parambrata" rank={7} pts={28} />
        </motion.section>
      </DialogContent>
    </Dialog>
  );
}
