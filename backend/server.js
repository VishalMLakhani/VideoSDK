import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
const app = express();
app.use(cors());
const { VIDEOSDK_API_KEY, VIDEOSDK_SECRET_KEY, PORT = 4000 } = process.env;

app.get("/token", (req, res) => {
const { roomId, userId = "user" } = req.query;
console.log({ roomId, userId} );

if (!roomId) {
return res.status(400).json({ error: "roomId is required" });
}
const payload = {
apikey: VIDEOSDK_API_KEY || "17a14191-3124-4e88-8414-5f8e9b3c5708",
permissions: ["allow_join"],
version: 2,
roomId,
participantId: userId,
iat: Math.floor(Date.now() / 1000),
exp: Math.floor(Date.now() / 1000) + 60 * 60,
};
const token = jwt.sign(payload, VIDEOSDK_SECRET_KEY || "361dbb43f1d0b1b2e992a817d4b23b40a10118bb04314033f7ec6d48d4d8cb58");
res.json({ token });
});


app.listen(PORT, () => {
console.log(`VideoSDK token server running on port ${PORT}`);
});
