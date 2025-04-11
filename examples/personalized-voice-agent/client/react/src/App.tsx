import {
  RTVIClientAudio,
  useRTVIClientTransportState,
} from '@pipecat-ai/client-react';
import { RTVIProvider } from './providers/RTVIProvider';
import { DebugDisplay } from './components/DebugDisplay';
import './App.css';
import { ScrollArea } from './components/ui/scroll-area';
import { useState, useEffect } from 'react';
import { WavyBackground } from "./components/ui/wavy-background";
import BottomDock from './components/BottomDock';
import { MorphingText } from './components/magicui/morphing-text';
import { Memories } from './components/Memories';

function AppContent() {
  const transportState = useRTVIClientTransportState();
  const isConnected = ['connected', 'ready'].includes(transportState);
  const [speakingState, setSpeakingState] = useState<'user' | 'assistant' | 'system' | 'idle'>('idle');
  const [isFirstConnectionConnected, setIsFirstConnectionConnected] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsFirstConnectionConnected(true);
    }
  }, [isConnected]);

  

  const [speed, setSpeed] = useState(0.001);
  useEffect(() => {
    const getSpeed = (speakingState: 'user' | 'assistant' | 'system' | 'idle') => {
      switch (speakingState) {
        case 'user':
          return 0.005;
        case 'assistant':
          return 0.01;
        case 'system':
          return 0.0005;
        case 'idle':
          return 0.001;
        default:
          return 0.001;
      }
    }
    console.log('speakingState', speakingState);
    setSpeed(getSpeed(speakingState));
  }, [speakingState]);
  
  // Add a useEffect to automatically set the speaking state to idle after 2 seconds everytime the speaking state changes to assistant
  useEffect(() => {
    if (speakingState === 'assistant') {
      const timeout = setTimeout(() => setSpeakingState('idle'), 5000);
      return () => clearTimeout(timeout);
    }
  }, [speakingState]);

  // Listen for message events from DebugDisplay
  useEffect(() => {
    const handleMessage = (event: CustomEvent<{ type: 'user' | 'assistant' | 'system' }>) => {
      setSpeakingState(event.detail.type);
      // Reset to idle after animation
      setTimeout(() => setSpeakingState('idle'), 2000);
    };

    window.addEventListener('newMessage', handleMessage as EventListener);
    return () => window.removeEventListener('newMessage', handleMessage as EventListener);
  }, []);

  return (
    <div className="app bg-black">
      <div className="">
        <BottomDock />
      </div>

      <div className="absolute top-20 w-full h-[10rem] -left-0 z-[1000]">
        <div className="flex items-center justify-center h-full">
          <Memories />
        </div>
      </div>
      

      <div className="w-[98%] h-[20] absolute -top-28 left-0">
        <WavyBackground speed={speed} className=""></WavyBackground>
      </div>

      <ScrollArea className="w-full h-[calc(68vh)] fade-blur top-[12rem] rounded-xl">
          {
            isFirstConnectionConnected ? (
              <DebugDisplay onNewMessage={(type) => setSpeakingState(type)} />
            ) : (
              <div className="absolute bottom-44 w-full -left-0 z-[1000">
              <div className="flex items-center justify-center ">
                <MorphingText texts={["Mem0", "Memory", "AI"]} className="text-white scale-150" />
              </div>
            </div>
            )
          }
      </ScrollArea>
      
      <RTVIClientAudio />
    </div>
  );
}

function App() {
  return (
    <RTVIProvider>
      <AppContent />
    </RTVIProvider>
  );
}

export default App;
