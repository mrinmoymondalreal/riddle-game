import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SlideInVariantChild } from "./QuizComponents";

type PlayerType = {
  name: string;
  pts: number;
  rank: number;
  isDown?: boolean;
  className?: string;
};

export function TopRankedPlayer({ name, pts, rank, isDown }: PlayerType) {
  return (
    <motion.div variants={SlideInVariantChild} className="relative">
      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-3",
          isDown && "mt-6"
        )}
      >
        <div className="relative rounded-full bg-gray-600 aspect-square w-[80%] border-2 border-green-500">
          <img
            src={`https://avatar.iran.liara.run/public/boy?username=${name}`}
            className="max-w-full object-cover"
            alt={`${name}'s Avatar`}
          />
          <div className="absolute aspect-square w-8 rounded-full bg-green-500 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 text-left">
            <div className="relativew-full min-h-full">
              <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-px text-2xl font-bold">
                {rank}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center *:block overflow-hidden text-nowrap space-y-1">
          <span className="font-medium text-sm text-ellipsis">{name}</span>
          <span className="text-xs">{pts}pts</span>
        </div>
      </div>
    </motion.div>
  );
}

export function RankedPlayer({ name, pts, rank, className }: PlayerType) {
  return (
    <motion.div
      variants={SlideInVariantChild}
      className={cn(
        "flex items-center h-16 gap-x-2 bg-gray-900 px-4 py-2 font-medium rounded-lg",
        className
      )}
    >
      <span>{rank}</span>
      <div className="h-[80%] aspect-square rounded-full bg-gray-500">
        <img
          src={`https://avatar.iran.liara.run/public/boy?username=${name}`}
          className="max-w-full object-cover"
          alt={`${name}'s Avatar`}
        />
      </div>
      <span className="flex-glow w-full font-bold">{name}</span>
      <span>{pts}pts</span>
    </motion.div>
  );
}
