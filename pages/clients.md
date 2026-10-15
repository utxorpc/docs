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

## cardano-rpc by BlockPQR

`cardano-rpc` is a Haskell package that provides client modules for calling UTxO RPC services from Haskell code. The same client code works against `cardano-node`'s built-in gRPC interface and any other server implementing the specification, such as Dolos. It's an open-source project developed by [BlockPQR](https://blockpqr.io). The source code can be found in [IntersectMBO](https://github.com/IntersectMBO)'s [cardano-api GitHub repository](https://github.com/IntersectMBO/cardano-api/tree/master/cardano-rpc).

| Module  | Status        |
| ------- | ------------- |
| Sync    | ✅ supported   |
| Query   | ✅ supported   |
| Submit  | ✅ supported   |
| Watch   | 🛠️ development |
| Cardano | ✅ supported   |
