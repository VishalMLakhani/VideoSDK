import { useEffect, useState } from "react";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import { fetchToken } from "./config";

export default function Room({ roomId, onLeave }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchToken(roomId).then((t) => {
      if (mounted) setToken(t);
    });

    return () => {
      mounted = false;
    };
  }, [roomId]);

  if (!token) {
    return <p>Fetching secure token...</p>;
  }

  return (
    <MeetingProvider
      token={token}
      config={{
        meetingId: roomId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Demo User",
      }}
    >
      <MeetingView onLeave={onLeave} />
    </MeetingProvider>
  );
}

function MeetingView({ onLeave }) {
  const { join, leave, participants } = useMeeting();

  return (
    <div>
      <button onClick={join}>Join</button>

      <button
        onClick={() => {
          leave();
          onLeave?.();
        }}
      >
        Leave
      </button>

      <h4>Participants</h4>
      {[...participants.keys()].map((pid) => (
        <div key={pid}>{pid}</div>
      ))}
    </div>
  );
}
