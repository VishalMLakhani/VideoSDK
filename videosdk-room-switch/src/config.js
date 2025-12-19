export async function fetchToken(roomId) {
const res = await fetch(`http://10.0.128.48:4000/token?roomId=${roomId}`);
const data = await res.json();
return data.token;
}