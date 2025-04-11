import React from "react";
import { Separator } from "./ui/separator";
import { ConnectButton } from "./ConnectButton";
import { MuteButton } from "./MuteButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function BottomDock() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-bottom justify-end h-[calc(100vh-4rem)] z-[1000]">
      <TooltipProvider>
        <div className="flex w-[9rem] bg-white/10 backdrop-blur-md items-center justify-center gap-2 border-2 border-white/60 rounded-full p-2 hover:scale-105 transition-all duration-300">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ConnectButton />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to toggle connection</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-full" />
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <MuteButton />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to toggle mute</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
