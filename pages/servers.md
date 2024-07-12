# Servers

These are project that implement the server-side part of UTxO RPC spec.

## Dolos by TxPipe

Dolos is a Cardano "Data Node". It's a trimmed-down, Rust-based implementation of a Cardano node with the only purpose of serving data. It uses Ouroboros to sync from upstream relay nodes and keeps a local version of the chain. It uses UTxO RPC as the main interface for client integration. It's an open-source project developed by [TxPipe](https://txpipe.io). The source code and binary releases can be found in its [Github repository](https://github.com/txpipe/dolos).


| Module  | Status        |
| ------- | ------------- |
| Sync    | ✅ supported   |
| Query   | 🛠️ development |
| Submit  | 🛠️ development |
| Watch   | 🛠️ development |
| Cardano | ✅ supported   |

## Node API by Blink Labs

Blink Labs' Node API is a query layer solution for interfacing with a Cardano node that exposes Ouroboros Node to Client (NtC) queries over multiple HTTP-based protocols. This will allow for consumption in client applications using methods of the developer’s choosing and provide capabilities for varying security scenarios. It includes UTxO RPC spec as the interface for its gRPC endpoints.

| Module  | Status        |
| ------- | ------------- |
| Sync    | 🛠️ development |
| Query   | 🛠️ development |
| Submit  | 🛠️ development |
| Watch   | 🛠️ development |
| Cardano | 🛠️ development |

## Demeter.run

Demeter is a PaaS (Platform-as-a-Service) that provides managed Cardano infrastructure. One of their services consists of a cloud-hosted endpoint for Cardano integration using the UTxO RPC spec. Developers can sign-up and get access to the API on a per-request basis. More information available on their website: [Demeter.run](https://demeter.run).

| Module  | Status        |
| ------- | ------------- |
| Sync    | ✅ supported   |
| Query   | 🛠️ development |
| Submit  | 🛠️ development |
| Watch   | 🛠️ development |
| Cardano | ✅ supported   |
