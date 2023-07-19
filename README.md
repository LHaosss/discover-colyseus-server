# Colyseus 使用

## colyseus 项目构建

## 基础功能实现

### Matchmaking

- client-side
  - client.joinOrCreate()
  - client.create()
  - client.join()
  - client.joinById()
  - client.reconnect()
- server-side
  - Room

### Room State & Serialization & filter

- demo: src/rooms/state

### Sending Message

- Room Method:

  - boradcast(type, message, options?)

- Client Method:

  - send(type, message)
  - sendBytes(type, bytes)

### Reconnection

- client-side: src/client-side/Reconnection
- server-side: src/rooms/reconnection
