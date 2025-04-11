import React, { useState } from 'react';
import { DockIcon } from './magicui/dock';
import { useRTVIClient } from '@pipecat-ai/client-react';
import { MicOff, Mic } from 'lucide-react';

export function MuteButton() {
  const [isMuted, setIsMuted] = useState(true);
  const client = useRTVIClient();

  const handleToggleMute = async () => {
    if (!client) return;
    
    try {
      const audioTrack = client.tracks().local.audio;
      if (audioTrack) {
        audioTrack.enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  return (
    <DockIcon onClick={handleToggleMute} className="hover:scale-125 transition-all duration-300">
      {!isMuted ? (
        <MicOff className="text-white" size={24} />
      ) : (
        <Mic className="text-white" size={24} />
      )}
    </DockIcon>
  );
} 