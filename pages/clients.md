# Clients

These are project that implement the integrate the client-side of the UTxO RPC spec.

## Oura by TxPipe

Oura is a stream processing pipeline for Cardano. It's a tool that reads data from the Cardano blockchain and connects output events to external data processing systems (eg: Kafka, Redis, etc). It uses UTxO RPC as one of the main input protocols to read from Cardano. It's an open-source project developed by [TxPipe](https://txpipe.io). The source code and binary releases can be found in its [Github repository](https://github.com/txpipe/oura).

| Module  | Status         |
| ------- | -------------- |
| Sync    | ✅ supported    |
| Query   | ⏺️ not required |
| Submit  | ⏺️ not required |
| Watch   | ⏺️ not required |
| Cardano | ✅ supported    |

## Scrolls by TxPipe

Scrolls is a data indexer for Cardano. It's a tool that reads blocks from the Cardano blockchain and executes a map/reduce algorithm to create key/value collections of specific on-chain values. It uses UTxO RPC as one of the main input protocols to read from Cardano. It's an open-source project developed by [TxPipe](https://txpipe.io). The source code and binary releases can be found in its [Github repository](https://github.com/txpipe/scrolls).

| Module  | Status         |
| ------- | -------------- |
| Sync    | ✅ supported    |
| Query   | ⏺️ not required |
| Submit  | ⏺️ not required |
| Watch   | ⏺️ not required |
| Cardano | ✅ supported    |

