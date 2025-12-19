import { useState } from "react";
import Room from "./Room";
import { token, rooms } from "./config";


export default function App() {
const [activeRoom, setActiveRoom] = useState(null);


return (
<div>
<h2>VideoSDK Room Switching Demo</h2>


<button onClick={() => setActiveRoom(rooms.roomA)}>Join Room A</button>
<button onClick={() => setActiveRoom(rooms.roomB)}>Join Room B</button>


{activeRoom && (
<Room
roomId={activeRoom}
token={token}
onLeave={() => setActiveRoom(null)}
/>
)}
</div>
);
}