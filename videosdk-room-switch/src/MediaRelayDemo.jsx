import {
MeetingProvider,
useMeeting,
createCameraVideoTrack,
createMicrophoneAudioTrack,
} from "@videosdk.live/react-sdk";
import { token, rooms } from "./config";
import { useState } from "react";


export default function MediaRelayDemo() {
const [tracks, setTracks] = useState(null);


const initTracks = async () => {
const videoTrack = await createCameraVideoTrack();
const audioTrack = await createMicrophoneAudioTrack();
setTracks({ videoTrack, audioTrack });
};


return (
<div>
<button onClick={initTracks}>Initialize Media</button>


{tracks && (
<>
<RelayRoom roomId={rooms.roomA} tracks={tracks} />
<RelayRoom roomId={rooms.roomB} tracks={tracks} />
</>
)}
</div>
);
}


function RelayRoom({ roomId, tracks }) {
return (
<MeetingProvider
token={token}
config={{
meetingId: roomId,
micEnabled: false,
webcamEnabled: false,
name: "Relay User",
}}
joinWithoutUserInteraction
tracks={tracks}
>
<RelayView roomId={roomId} />
</MeetingProvider>
);
}


function RelayView({ roomId }) {
const { join } = useMeeting();


return (
<div>
<h4>{roomId}</h4>
<button onClick={join}>Join with Relay</button>
</div>
);
}