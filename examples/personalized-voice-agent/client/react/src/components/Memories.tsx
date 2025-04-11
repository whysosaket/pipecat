import { CardStack } from "./ui/card-stack";
import React, { useState, useEffect, useCallback } from "react";
import { memoryRefreshTrigger } from "./DebugDisplay";

interface MemoryItem {
  id: string
  content: string
  createdAt: string
  categories: string[]
}

interface Card {
  id: number
  createdAt: string
  categories: string[]
  content: React.ReactNode
}

const fetchMemories = async () => {
  const response = await fetch("http://localhost:7860/memories");
  const data = await response.json();
  return data;
};

export function Memories() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [memoryCards, setMemoryCards] = useState<Card[]>([]);
  const [localRefreshTrigger, setLocalRefreshTrigger] = useState(0);

  const fetchEffectMemories = useCallback(async () => {
    try {
      const fetchedMemories = await fetchMemories();
      if (fetchedMemories) {
        setMemories(fetchedMemories as MemoryItem[]);
      } else {
        setMemories([]);
        console.log("No memories found");
      }
    } catch (error) {
      console.error("Error fetching memories:", error);
      setMemories([]);
    }
  }, []);

  useEffect(() => {
    fetchEffectMemories();
  }, [fetchEffectMemories, localRefreshTrigger]);

  useEffect(() => {
    const handleRefresh = (value: number) => {
      setLocalRefreshTrigger(value);
    };
    
    memoryRefreshTrigger.subscribers.add(handleRefresh);
    return () => {
      memoryRefreshTrigger.subscribers.delete(handleRefresh);
    };
  }, []);

  useEffect(() => {
    const cards = memories.map((memory, index) => ({
      id: index,
      createdAt: memory.createdAt,
      categories: memory.categories,
      content: (
        <p>
          {memory.content || ""}
        </p>
      ),
    }));
    setMemoryCards(cards);
  }, [memories]);
    
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={memoryCards} />
    </div>
  );
}
