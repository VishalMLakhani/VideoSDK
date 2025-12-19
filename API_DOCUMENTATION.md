# 📡 API Documentation

Complete REST API reference for the VideoSDK Room Switcher backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently no authentication required. For production, implement JWT authentication.

## Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "data": {...},
  "message": "Optional message",
  "error": "Error message if success is false"
}
```

---

## Endpoints

### 🏥 Health Check

Check if backend server is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "VideoSDK Room Switcher Backend is running",
  "timestamp": "2024-12-18T05:00:00.000Z"
}
```

---

### 🔑 Token Management

#### Generate Token

Generate a VideoSDK token for a participant.

**Endpoint:** `POST /api/token/generate`

**Request Body:**
```json
{
  "roomId": "room-a-demo",          // Optional
  "participantId": "participant-123", // Optional
  "expiresIn": 86400                 // Optional, in seconds (default: 24h)
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "message": "Token generated successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/token/generate \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "room-a-demo",
    "expiresIn": 86400
  }'
```

---

### 🏠 Room Management

#### List All Rooms

Get all available rooms with participant counts.

**Endpoint:** `GET /api/rooms`

**Response:**
```json
{
  "success": true,
  "rooms": [
    {
      "id": "room-a-demo",
      "name": "Room A",
      "participantCount": 3,
      "createdAt": "2024-12-18T05:00:00.000Z"
    },
    {
      "id": "room-b-demo",
      "name": "Room B",
      "participantCount": 1,
      "createdAt": "2024-12-18T05:00:00.000Z"
    }
  ],
  "count": 2
}
```

**Example:**
```bash
curl http://localhost:5000/api/rooms
```

---

#### Get Room Details

Get detailed information about a specific room.

**Endpoint:** `GET /api/rooms/:roomId`

**Parameters:**
- `roomId` (path) - Room identifier

**Response:**
```json
{
  "success": true,
  "room": {
    "id": "room-a-demo",
    "name": "Room A",
    "participantCount": 3,
    "participants": ["participant-1", "participant-2", "participant-3"],
    "createdAt": "2024-12-18T05:00:00.000Z"
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api/rooms/room-a-demo
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Room not found"
}
```

---

#### Create Room

Create a new room.

**Endpoint:** `POST /api/rooms/create`

**Request Body:**
```json
{
  "name": "Conference Room",  // Optional
  "roomId": "room-custom-id"  // Optional, auto-generated if not provided
}
```

**Response:**
```json
{
  "success": true,
  "room": {
    "id": "room-custom-id",
    "name": "Conference Room",
    "participantCount": 0,
    "createdAt": "2024-12-18T05:00:00.000Z"
  },
  "message": "Room created successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/rooms/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Room",
    "roomId": "room-custom-123"
  }'
```

---

#### Join Room

Join a room as a participant.

**Endpoint:** `POST /api/rooms/:roomId/join`

**Parameters:**
- `roomId` (path) - Room to join

**Request Body:**
```json
{
  "participantId": "participant-123",  // Optional, auto-generated if not provided
  "participantName": "John Doe"        // Optional
}
```

**Response:**
```json
{
  "success": true,
  "participant": {
    "id": "participant-123",
    "name": "John Doe",
    "roomId": "room-a-demo",
    "joinedAt": "2024-12-18T05:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "room": {
    "id": "room-a-demo",
    "name": "Room A",
    "participantCount": 1
  },
  "message": "Joined room successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/rooms/room-a-demo/join \
  -H "Content-Type: application/json" \
  -d '{
    "participantName": "Alice Smith"
  }'
```

---

#### Leave Room

Leave a room.

**Endpoint:** `POST /api/rooms/:roomId/leave`

**Parameters:**
- `roomId` (path) - Room to leave

**Request Body:**
```json
{
  "participantId": "participant-123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Left room successfully",
  "room": {
    "id": "room-a-demo",
    "name": "Room A",
    "participantCount": 0
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/rooms/room-a-demo/leave \
  -H "Content-Type: application/json" \
  -d '{
    "participantId": "participant-123"
  }'
```

---

#### Switch Rooms

Move a participant from one room to another.

**Endpoint:** `POST /api/rooms/switch`

**Request Body:**
```json
{
  "participantId": "participant-123",
  "fromRoomId": "room-a-demo",
  "toRoomId": "room-b-demo",
  "method": "normal"  // "normal" or "relay"
}
```

**Response:**
```json
{
  "success": true,
  "method": "normal",
  "participant": {
    "id": "participant-123",
    "name": "John Doe",
    "roomId": "room-b-demo",
    "switchedAt": "2024-12-18T05:00:00.000Z",
    "switchMethod": "normal"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "fromRoom": {
    "id": "room-a-demo",
    "name": "Room A",
    "participantCount": 0
  },
  "toRoom": {
    "id": "room-b-demo",
    "name": "Room B",
    "participantCount": 1
  },
  "message": "Switched from Room A to Room B using normal method"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/rooms/switch \
  -H "Content-Type: application/json" \
  -d '{
    "participantId": "participant-123",
    "fromRoomId": "room-a-demo",
    "toRoomId": "room-b-demo",
    "method": "normal"
  }'
```

---

### 🌉 Media Relay

#### Start Media Relay

Start relaying media from one room to another.

**Endpoint:** `POST /api/relay/start`

**Request Body:**
```json
{
  "participantId": "participant-123",
  "sourceRoomId": "room-a-demo",
  "targetRoomId": "room-b-demo"
}
```

**Response:**
```json
{
  "success": true,
  "relay": {
    "id": "relay-abc123",
    "participantId": "participant-123",
    "sourceRoomId": "room-a-demo",
    "targetRoomId": "room-b-demo",
    "startedAt": "2024-12-18T05:00:00.000Z",
    "status": "active"
  },
  "message": "Media relay started successfully",
  "note": "In production, this would establish a media pipeline between rooms"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/relay/start \
  -H "Content-Type: application/json" \
  -d '{
    "participantId": "participant-123",
    "sourceRoomId": "room-a-demo",
    "targetRoomId": "room-b-demo"
  }'
```

---

#### Stop Media Relay

Stop an active media relay.

**Endpoint:** `POST /api/relay/stop`

**Request Body:**
```json
{
  "relayId": "relay-abc123",        // Optional if participantId provided
  "participantId": "participant-123" // Optional if relayId provided
}
```

**Response:**
```json
{
  "success": true,
  "relay": {
    "id": "relay-abc123",
    "participantId": "participant-123",
    "sourceRoomId": "room-a-demo",
    "targetRoomId": "room-b-demo",
    "startedAt": "2024-12-18T05:00:00.000Z",
    "stoppedAt": "2024-12-18T05:10:00.000Z",
    "status": "stopped"
  },
  "message": "Media relay stopped successfully"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/relay/stop \
  -H "Content-Type: application/json" \
  -d '{
    "participantId": "participant-123"
  }'
```

---

#### Get Active Relays

Get all active media relays.

**Endpoint:** `GET /api/relay/active`

**Response:**
```json
{
  "success": true,
  "relays": [
    {
      "id": "relay-abc123",
      "participantId": "participant-123",
      "sourceRoomId": "room-a-demo",
      "targetRoomId": "room-b-demo",
      "startedAt": "2024-12-18T05:00:00.000Z",
      "status": "active"
    }
  ],
  "count": 1
}
```

**Example:**
```bash
curl http://localhost:5000/api/relay/active
```

---

### 📊 Statistics

#### Get Statistics

Get server statistics.

**Endpoint:** `GET /api/stats`

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalRooms": 2,
    "totalParticipants": 5,
    "activeRelays": 1,
    "rooms": [
      {
        "id": "room-a-demo",
        "name": "Room A",
        "participantCount": 3
      },
      {
        "id": "room-b-demo",
        "name": "Room B",
        "participantCount": 2
      }
    ]
  },
  "timestamp": "2024-12-18T05:00:00.000Z"
}
```

**Example:**
```bash
curl http://localhost:5000/api/stats
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Room already exists"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Room not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Detailed error message"
}
```

---

## Rate Limiting

Currently no rate limiting. For production, implement rate limiting using:
- `express-rate-limit`
- API Gateway
- Nginx rate limiting

---

## CORS Configuration

Current CORS settings:
```javascript
origin: 'http://localhost:3000'
credentials: true
```

For production, configure appropriate origins.

---

## Testing with Postman

Import this collection to test all endpoints:

1. Create new Postman collection
2. Add environment variable: `base_url = http://localhost:5000/api`
3. Add requests for each endpoint above
4. Test complete workflows

---

## Webhooks (Future)

Consider adding webhooks for:
- Participant joined
- Participant left
- Room created
- Relay started/stopped

---

**API Version:** 1.0.0  
**Last Updated:** December 2024
