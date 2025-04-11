"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let interval: any;

type Card = {
  id: number;
  createdAt: string;
  categories: string[];
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    setCards(items);
  }, [items]);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };
  
  
  return (
    <div className="relative  h-60 w-5/6 max-w-[30rem]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card?.id}
            className="absolute dark:bg-black text-white bg-black h-25 w-full rounded-3xl p-4 shadow-xl border border-neutral-200/30 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-white dark:text-neutral-200">
              {card?.content || ""}
            </div>
            <div className="flex flex-row gap-2">
              <div
                  key={index}
                  className="group relative w-fit overflow-hidden rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 text-purple-600 dark:text-purple-300 hover:shadow-sm border border-purple-200/50 dark:border-purple-800/50"
                >
                  <span className="relative">
                    {new Date(card?.createdAt).toLocaleString()}
                  </span>
                </div>

                {
                  card?.categories.map((category, index) => {
                    return (
                      <div key={index}  className="group relative w-fit overflow-hidden rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-blue-950/40 dark:to-indigo-950/40 text-blue-600 dark:text-blue-300 hover:shadow-sm border border-blue-200/50 dark:border-blue-800/50">
                        {category}
                      </div>
                    )
                  })
                }
              
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
