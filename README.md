# Aerofly FS4 Custom Mission

> Builder for Aerofly FS4 Custom Missions Files

[Aerofly Flight Simulator 4](https://www.aerofly.com/) has a custom missions file `custom_missions_user.tmc` with a very unique format. To help you build this custom missions file, this JavaScript / TypeScript library offers Data Objects to create this file programmatically.

This library is intended to work in modern browsers as well as [Node.js](https://nodejs.org/en).

## Installation

Either download the [`dist/index.js`](dist/index.js) to a sensible location in your web or Node.js project, or do a NPM installation:

```bash
npm install @fboes/aerofly-custom-missions --save
```

Instead of a local installation for your browser project you may also load the library from https://unpkg.com/. Beware: This makes https://unpkg.com/ a dependency of your project and may pose data protection issues.

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

All objects are basic structures needed for the missions list. The constructors tell you which properties are required, and will start with sensible defaults for all other properties.

All objects can be exported as JSON or as string via the `toString()` methods. Exporting the `AeroflyMissionsList` via `toString()` gives you the complete source code for a valid `custom_missions_user.tmc`.

### Building a missions file

A mission file contains one or multiple missions. Building this file starts with the outer container, wich contains the missions:

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

A single mission needs multiple properties:

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
    icao: "C172",
    livery: "",
  },
  checkpoints,
  conditions,
});

// Build mission list
const missionList = new AeroflyMissionsList([mission]);

// Show output of actual missions file
console.log(missionList.toString());
```

As there are lots of properties for the mission object, check the type hinting on the various objects to find out which properties you are able to set.

### Values for tags

The `tags` property of a single mission can contain multiple values. The following values have been used officially by Aerofly FS4.

- aerobatics
- aerotow
- airline
- airshow
- circling_approach
- crosswind
- dropoff
- full_flight
- gliding
- instruments
- landing
- law_enforcement
- low_level_flight
- low_visibility
- medical
- military
- night
- pattern
- practice
- race
- short_runway
- sidestep_approach
- sight_seeing
- sloped_runway
- steep_approach
- straight_in_approach
- supersonic
- surveillance
- takeoff
- terrain_avoidance
- vip
- winch_launch
- windy

### Important notices

- Be aware that `mission.origin` and `mission.destination` do not need to match the flight plan. In case of `origin` you may want to set the position to the actual parking position of your aircraft, which may not be the first way point in your flight plan.
- Flight plans almost always require at least 4 checkpoints:
  - `origin`
  - `departure_runway`
  - `destination_runway`
  - `destination`
- Be aware that all units for altitude, elevation or distance are measured in meters! In most cases there will be helper functions for defining these values in feet (for length, altitude, elevation) or statute miles (for visibility).

There are also some unsupported properties, which are present in Aerofly FS4, but as of yet will not be generated by this library:

```
<[string8][tutorial_name][c172]> // Opens https://www.aerofly.com/aircraft-tutorials/${tutorial_name}
<[bool][is_scheduled][true]>
```

### Known issues

- `AeroflyMissionConditions.time`: Even though a date property is available in Aerofly FS 4 (which is not accessible to the user), [the custom missions cannot change the date in Aerofly FS 4](https://www.aerofly.com/community/forum/index.php?thread/22487-more-settings-for-environment-conditions/&pageNo=1).
- `AeroflyMissionConditions.clouds`: Even though Aerofly FS 4 is able to handle three levels of clouds (two of which are accessible to the user), the custom missions can only set one level in Aerofly FS 4.
- `AeroflyMissionCheckpoint.type`: Even though internal flight plans of Aerofly FS 4 has types `"departure"|"arrival"|"approach"`, [Aerofly FS 4 dumps SIDs and STARs on loading a custom missions](https://www.aerofly.com/community/forum/index.php?thread/22156-flight-plans/).
- `AeroflyMission.aircraft.livery`: Even though Aerofly FS 4 knows multiple liveries per plane, [the custom missions file is not able to set liveries to any other but the standard livery](https://www.aerofly.com/community/forum/index.php?thread/19105-user-created-custom-missions/).

## Status

[![GitHub Tag](https://img.shields.io/github/v/tag/fboes/aerofly-custom-missions)](https://github.com/fboes/aerofly-custom-missions)
[![NPM Version](https://img.shields.io/npm/v/%40fboes%2Faerofly-custom-missions.svg)](https://www.npmjs.com/package/@fboes/aerofly-custom-missions)
![GitHub License](https://img.shields.io/github/license/fboes/aerofly-custom-missions)

## Legal stuff

Author: [Frank Boës](https://3960.org)

Copyright & license: See [LICENSE.txt](LICENSE.txt)

This tool is NOT affiliated with, endorsed, or sponsored by IPACS GbR. As stated in the [LICENSE.txt](LICENSE.txt), this tool comes with no warranty and might damage your files.

This software complies with the General Data Protection Regulation (GDPR) as it does not collect nor transmits any personal data to third parties.
