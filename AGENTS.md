# AGENTS.md

## Project Overview

This project provides custom mission support for Aerofly flight simulators. It includes TypeScript source code, DTOs, configuration files, and supporting documentation for mission creation and management.

## Coding Guidelines

- **Explicit Class Properties:**
  - All class properties must be explicitly defined in every class. Avoid using implicit or dynamic property assignment.
- **JSDoc Comments:**
  - Add descriptive JSDoc comments to every class property and method. This improves code readability and enables rich IntelliSense in VS Code.
  - Example:
    ```typescript
    /**
     * @property {string} name The name of the mission
     */
    name: string;
    ```
- **TypeScript Usage:**
  - Use TypeScript types and interfaces for all data structures.
  - Keep types up to date in the `types/` directory.

## Contribution

- Follow the coding guidelines above for all new code and pull requests.
- See the `README.md` for setup and usage instructions.

## Testing

- TypeScript files have corresponding test files with the same filename and an added `.test` before the extension (e.g., `AeroflyMission.ts` and `AeroflyMission.test.ts`).
- Run all tests using:
  ```sh
  npm test
  ```
- To run a single test file, specify its name:
  ```sh
  node --test src/dto/AeroflyMission.test.ts
  ```
- Create new tests by using the `node:test`
  ```typescript
  import { describe, it } from "node:test";
  ```
