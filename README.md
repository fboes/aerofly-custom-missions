# Aerofly FS4 Custom Mission

> Builder for Aerofly FS4 Custom Missions Files

[Aerofly Flight Simulator 4](https://www.aerofly.com/) has a custom mission file `custom_missions_user.tmc` with a very unique format. To help build this format file, this JavaScript / TypeScript library offers Data Transfers Objects (DTOs) to create this flight plan files programatically.

This library is intended to work in modern browsers as well as [Node.js](https://nodejs.org/en).

## Installation

Either download the [`dist/index.js`](dist/index.js) to a sensible location in your web project, or do a NPM installation:

```bash
npm install @fboes/aerofly-custom-missions --save
```

Instead of a local installation you may also load the library from https://unpkg.com/. Beware: This makes https://unpkg.com/ a dependency of your project and may pose data protection issues.

```html
<script type="module" src="https://unpkg.com/@fboes/aerofly-custom-missions@latest/dist/index.js"></script>
```

Everything required for the functionality of this library is contained in [`dist/index.js`](dist/index.js).

## Usage

Loading the library prior to use:

```javascript
// 1. NodeJS - NPM installation
import {
  AeroflyMissionsList,
  AeroflyMission,
  AeroflyMissionConditions,
  AeroflyMissionConditionsCloud,
  AeroflyMissionCheckpoint,
} from "@fboes/aerofly-custom-missions";

// 2. Local installation and/or browser usage
import {
  AeroflyMissionsList,
  AeroflyMission,
  AeroflyMissionConditions,
  AeroflyMissionConditionsCloud,
  AeroflyMissionCheckpoint,
} from "dist/index.js";
```

You might want to enable TypeScript type checking by adding `// @ts-check` as your first line in your scripts.

### Basic idea

All objects are basic structures needed for the mission list. The constructors tell you which properties are required, and will start with sensible defaults for all other properties.

You can alter the properties of the objects afterwards, or (in some cases) by passing an optional configuration object to the constructor.

All objects can be exported as JSON or as string via the `toString()` methods. Exporting the `AeroflyMissionsList` via `toString()` gives you the complete source code for a valid `custom_missions_user.tmc`.

### Building a missions file

A mission file contains multiple missions. Build this file starts with the outer container, wich contains the missions:

```javascript
// Build a missions list
const missionList = new AeroflyMissionsList();

// You can now add missions to this `missionList`:
missionList.missions.push(new AeroflyMission("Mission 1"));
missionList.missions.push(new AeroflyMission("Mission 2"));

// Show output of actual missions file
console.log(missionList.toString());
```

### Building a mission

A mission needs multiple properties:

- The aircraft, its position and state
- The time and weather conditions
- The actual flight plan

```javascript
// Build time and weather
const conditions = new AeroflyMissionConditions({
  time: new Date(),
  wind: {
    direction: 190,
    speed: 11,
    gusts: 22,
  },
  visibility: 25000,
  clouds: [new AeroflyMissionConditionsCloud(0.1, 1524), new AeroflyMissionConditionsCloud(0.2, 2286)],
});

// Build checkpoints
const checkpoints = [
  new AeroflyMissionCheckpoint("KCCR", "origin", -122.057, 37.9897),
  new AeroflyMissionCheckpoint("19L", "departure_runway", -122.055, 37.993),
  new AeroflyMissionCheckpoint("24", "destination_runway", -70.607, 41.399),
  new AeroflyMissionCheckpoint("KMVY", "destination", -70.6139, 41.3934),
];

// Build mission
const mission = new AeroflyMission("From Concord to Martha's Vineyard", {
  aircraft: {
    name: "c172",
    livery: "",
    icao: "C172",
  },
  checkpoints,
  conditions,
});

// Build mission list
const missionList = new AeroflyMissionsList([mission]);

// Show output of actual missions file
console.log(missionList.toString());
```

As there are lots of properties for the flight plan as well as explanation for the properties mentioned above, check the type hinting on the various objects to find out which properties you are able to set.

### Important notices

- Be aware that `mission.origin` and `mission.destination` do not need to match the flight plan. In case of `origin` you may want to set the position to the actual parking position of your aircraft, which may not be the first way point in your flight plan.
- Flightplan almost always require at least 4 checkpoint:
  - `origin`
  - `departure_runway`
  - `destination_runway`
  - `destination`
- Be aware that all untis for altitude, elevation or distance are measured in meters! In most cases there will be helper functions for defining these values in feet or statute miles (for visbility).

## Status

[![GitHub version](https://badge.fury.io/gh/fboes%2Faerofly-custom-missions.svg)](https://badge.fury.io/gh/fboes%2Faerofly-custom-missions)
[![`npm` version](https://badge.fury.io/js/%40fboes%2Faerofly-custom-missions.svg)](https://badge.fury.io/js/%40fboes%2Faerofly-custom-missions)
![MIT license](https://img.shields.io/github/license/fboes/aerofly-custom-missions.svg)

## Legal stuff

Author: [Frank Boës](https://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)
