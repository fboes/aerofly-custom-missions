const feetPerMeter = 3.28084;
const meterPerStatuteMile = 1609.344;

/**
 * Represents origin or destination conditions for flight
 * @property icao uppercase ICAO airport ID
 * @property longitude easting, using the World Geodetic
 *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
 *    of decimal degrees; -180..180
 * @property latitude northing, using the World Geodetic
 *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
 *    of decimal degrees; -90..90
 * @property dir in degree
 * @property alt the height in meters above or below the WGS
 *    84 reference ellipsoid
 */
export type AeroflyMissionPosition = {
  icao: string;
  longitude: number;
  latitude: number;
  dir: number;
  alt: number;
};

/**
 * State of aircraft systems. Configures power settings, flap positions etc
 */
export type AeroflyMissionSetting = "taxi" | "takeoff" | "cruise" | "approach" | "landing";

/**
 * Types of checkpoints. Required are usually "origin", "departure_runway" at the start and "destination_runway", "destination" at the end.
 */
export type AeroflyMissionCheckpointType =
  | "origin"
  | "departure_runway"
  | "departure"
  | "waypoint"
  | "arrival"
  | "approach"
  | "destination_runway"
  | "destination";

/**
 * Data for the aircraft to use on this mission
 * @property name lowercase Aerofly aircraft ID
 * @property livery (not used yet)
 * @property icao ICAO aircraft code
 */
export type AeroflyMissionAircraft = {
  name: string;
  livery: string;
  icao: string;
};

/**
 * Weather data for wind
 * @property direction in degree
 * @property speed in kts
 * @property gusts in kts
 */
export type AeroflyMissionConditionsWind = {
  direction: number;
  speed: number;
  gusts: number;
};

/**
 * Cloud coverage codes
 */
export type AeroflyMissionConditionsCloudCoverCode = "CLR" | "FEW" | "SCT" | "BKN" | "OVC";

/**
 * A list of flight plans.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionsList {
  /**
   * Missions to add to mission list
   */
  missions: AeroflyMission[];

  /**
   * @param missions to add to mission list
   */
  constructor(missions: AeroflyMission[] = []) {
    this.missions = missions;
  }

  /**
   * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
   */
  toString(): string {
    const separator = "\n// -----------------------------------------------------------------------------\n";
    return `<[file][][]
    <[tmmissions_list][][]
        <[list_tmmission_definition][missions][]${separator + this.missions.join(separator) + separator}        >
    >
>`;
  }
}

/**
 * A single flighplan, containing aircraft and weather data as well.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMission {
  /**
   * Title of this flight plan
   */
  title: string;

  /**
   * Additional description text, mission briefing, etc
   */
  description: string = "";

  /**
   * Flight settings of aircraft, like "taxi", "cruise"
   */
  flightSetting: AeroflyMissionSetting = "taxi";

  /**
   * Aircraft for this mission
   */
  aircraft: AeroflyMissionAircraft = {
    name: "c172",
    livery: "",
    icao: "",
  };

  /**
   * Uppercase callsign of aircraft
   */
  callsign: string = "";

  /**
   * Starting position of aircraft, as well as name of starting airport. Position does not have match airport.
   */
  origin: AeroflyMissionPosition = {
    icao: "",
    longitude: 0,
    latitude: 0,
    dir: 0,
    alt: 0,
  };

  /**
   * Intended end position of aircraft, as well as name of destination airport. Position does not have match airport.
   */
  destination: AeroflyMissionPosition = {
    icao: "",
    longitude: 0,
    latitude: 0,
    dir: 0,
    alt: 0,
  };

  /**
   * Time and weather for mission
   */
  conditions: AeroflyMissionConditions = new AeroflyMissionConditions();

  /**
   * The actual flight plan
   */
  checkpoints: AeroflyMissionCheckpoint[] = [];

  /**
   *
   * @param title of this flight plan
   * @param additionalAttributes allows to set additional attributes on creation
   */
  constructor(
    title: string,
    additionalAttributes: {
      description?: string;
      flightSetting?: AeroflyMissionSetting;
      aircraft?: AeroflyMissionAircraft;
      callsign?: string;
      origin?: AeroflyMissionPosition;
      destination?: AeroflyMissionPosition;
      conditions?: AeroflyMissionConditions;
      checkpoints?: AeroflyMissionCheckpoint[];
    } = {},
  ) {
    this.title = title;
    this.checkpoints = additionalAttributes.checkpoints ?? this.checkpoints;
    this.description = additionalAttributes.description ?? this.description;
    this.flightSetting = additionalAttributes.flightSetting ?? this.flightSetting;
    this.aircraft = additionalAttributes.aircraft ?? this.aircraft;
    this.callsign = additionalAttributes.callsign ?? this.callsign;
    this.origin = additionalAttributes.origin ?? this.origin;
    this.destination = additionalAttributes.destination ?? this.destination;
    this.conditions = additionalAttributes.conditions ?? this.conditions;
  }

  /**
   * @returns indexed checkpoints
   */
  getCheckpointsString(): string {
    return this.checkpoints
      .map((c: AeroflyMissionCheckpoint, index: number): string => {
        return c.toString(index);
      })
      .join("\n");
  }

  /**
   * @throws {Error} on missing waypoints
   * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
   */
  toString(): string {
    if (this.checkpoints.length < 2) {
      throw Error("this.checkpoints.length < 2");
    }

    if (!this.origin.icao) {
      const firstCheckpoint = this.checkpoints[0];
      this.origin = {
        icao: firstCheckpoint.name,
        longitude: firstCheckpoint.longitude,
        latitude: firstCheckpoint.latitude,
        dir: this.origin.dir,
        alt: firstCheckpoint.altitude,
      };
    }

    if (!this.destination.icao) {
      const lastCheckpoint = this.checkpoints[this.checkpoints.length - 1];
      this.destination = {
        icao: lastCheckpoint.name,
        longitude: lastCheckpoint.longitude,
        latitude: lastCheckpoint.latitude,
        dir: lastCheckpoint.direction ?? 0,
        alt: lastCheckpoint.altitude,
      };
    }

    return `            <[tmmission_definition][mission][]
                <[string8][title][${this.title}]>
                <[string8][description][${this.description}]>
                <[string8]   [flight_setting]     [${this.flightSetting}]>
                <[string8u]  [aircraft_name]      [${this.aircraft.name}]>
                //<[string8u][aircraft_livery]    [${this.aircraft.livery}]>
                <[stringt8c] [aircraft_icao]      [${this.aircraft.icao}]>
                <[stringt8c] [callsign]           [${this.callsign}]>
                <[stringt8c] [origin_icao]        [${this.origin.icao}]>
                <[tmvector2d][origin_lon_lat]     [${this.origin.longitude} ${this.origin.latitude}]>
                <[float64]   [origin_dir]         [${this.origin.dir}]>
                <[float64]   [origin_alt]         [${this.origin.alt}]> // ${this.origin.alt * feetPerMeter} ft MSL
                <[stringt8c] [destination_icao]   [${this.destination.icao}]>
                <[tmvector2d][destination_lon_lat][${this.destination.longitude} ${this.destination.latitude}]>
                <[float64]   [destination_dir]    [${this.destination.dir}]>
${this.conditions}
                <[list_tmmission_checkpoint][checkpoints][]
${this.getCheckpointsString()}
                >
            >`;
  }
}

/**
 * Time and weather data for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditions {
  /**
   * Start time of flight plan. Relevant is the UTC part, so
   *    consider setting this date in UTC.
   */
  time: Date = new Date();

  /**
   * Current wind state
   */
  wind: AeroflyMissionConditionsWind = {
    direction: 0,
    speed: 0,
    gusts: 0,
  };

  /**
   * 0..1, percentage
   */
  turbulenceStrength: number = 0;

  /**
   * 0..1, percentage
   */
  thermalStrength: number = 0;

  /**
   * Visibility in meters
   */
  visibility: number = 25_000;

  clouds: AeroflyMissionConditionsCloud[] = [];

  /**
   * @param additionalAttributes allows to set additional attributes on creation
   */
  constructor(
    additionalAttributes: {
      time?: Date;
      wind?: {
        direction?: number;
        speed?: number;
        gusts?: number;
      };
      turbulenceStrength?: number;
      thermalStrength?: number;
      visibility?: number;
      clouds?: AeroflyMissionConditionsCloud[];
    } = {},
  ) {
    this.time = additionalAttributes.time ?? this.time;
    this.wind.direction = additionalAttributes.wind?.direction ?? this.wind.direction;
    this.wind.speed = additionalAttributes.wind?.speed ?? this.wind.speed;
    this.wind.gusts = additionalAttributes.wind?.gusts ?? this.wind.gusts;
    this.turbulenceStrength = additionalAttributes.turbulenceStrength ?? this.turbulenceStrength;
    this.visibility = additionalAttributes.visibility ?? this.visibility;
    this.clouds = additionalAttributes.clouds ?? this.clouds;
  }

  /**
   * @returns the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
   */
  get time_hours(): number {
    return this.time.getUTCHours() + this.time.getUTCMinutes() / 60 + this.time.getUTCSeconds() / 3600;
  }

  /**
   * @returns Time representation like "20:15:00"
   */
  get time_presentational(): string {
    return [this.time.getUTCHours(), this.time.getUTCMinutes(), this.time.getUTCSeconds()]
      .map((t) => {
        return String(t).padStart(2, "0");
      })
      .join(":");
  }

  /**
   * @param visibility_sm `this.visibility` in statute miles instead of meters
   */
  set visibility_sm(visibility_sm: number) {
    this.visibility = visibility_sm * meterPerStatuteMile;
  }

  /**
   * @returns
   */
  getCloudsString(): string {
    return this.clouds
      .map((c: AeroflyMissionConditionsCloud, index: number): string => {
        return c.toString(index);
      })
      .join("\n");
  }

  /**
   * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
   */
  toString(): string {
    if (this.clouds.length < 1) {
      this.clouds = [new AeroflyMissionConditionsCloud(0, 0)];
    }

    return `                <[tmmission_conditions][conditions][]
                    <[tm_time_utc][time][]
                        <[int32][time_year][${this.time.getUTCFullYear()}]>
                        <[int32][time_month][${this.time.getUTCMonth() + 1}]>
                        <[int32][time_day][${this.time.getUTCDate()}]>
                        <[float64][time_hours][${this.time_hours}]> // ${this.time_presentational} UTC
                    >
                    <[float64][wind_direction][${this.wind.direction}]>
                    <[float64][wind_speed][${this.wind.speed}]> // kts
                    <[float64][wind_gusts][${this.wind.gusts}]> // kts
                    <[float64][turbulence_strength][${this.turbulenceStrength}]>
                    <[float64][thermal_strength][${this.thermalStrength}]>
                    <[float64][visibility][${this.visibility}]> // ${this.visibility / meterPerStatuteMile} SM
${this.getCloudsString()}
                >`;
  }
}

/**
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditionsCloud {
  /**
   * 0..1, percentage
   */
  cover: number;

  /**
   * in meters AGL
   */
  base: number;

  /**
   * @param cover 0..1, percentage
   * @param base in meters AGL
   */
  constructor(cover: number, base: number) {
    this.cover = cover;
    this.base = base;
  }

  /**
   * @param cover 0..1, percentage
   * @param base_feet base, but in feet AGL instead of meters AGL
   * @returns {AeroflyMissionConditionsCloud}
   */
  static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud {
    return new AeroflyMissionConditionsCloud(cover, base_feet / feetPerMeter);
  }

  /**
   * @param base_feet `this.base` in feet instead of meters
   */
  set base_feet(base_feet: number) {
    this.base = base_feet / feetPerMeter;
  }

  /**
   * @returns Cloud coverage as text representation like "OVC" for `this.cover`
   */
  get cover_code(): AeroflyMissionConditionsCloudCoverCode {
    if (this.cover < 1 / 8) {
      return "CLR";
    } else if (this.cover <= 2 / 8) {
      return "FEW";
    } else if (this.cover <= 4 / 8) {
      return "SCT";
    } else if (this.cover <= 7 / 8) {
      return "BKN";
    }
    return "OVC";
  }

  /**
   * @param index if used in an array will se the array index
   * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
   */
  toString(index: number = 0): string {
    const indexString = index === 0 ? "" : String(index + 1);
    const comment = index === 0 ? "" : "//";

    return `                    ${comment}<[float64][cloud_cover${indexString}][${this.cover ?? 0}]> // ${this.cover_code}
                    ${comment}<[float64][cloud_base${indexString}][${this.base}]> // ${this.base * feetPerMeter} ft AGL`;
  }
}

/**
 * A single way point for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionCheckpoint {
  /**
   * Type of checkpoint, like "departure_runway"
   */
  type: AeroflyMissionCheckpointType;

  /**
   * Visible name of waypoint, like navaid ID or airport ID
   */
  name: string;

  /**
   * Easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   */
  longitude: number;

  /**
   * Northing, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -90..90
   */
  latitude: number;

  /**
   * The height in meters above or below the WGS
   *    84 reference ellipsoid
   */
  altitude: number = 0;

  /**
   * For runways: in degree
   */
  direction: number | null = null;

  /**
   * For runways
   */
  slope: number | null = null;

  /**
   * For runways: in meters
   */
  length: number | null = null;

  /**
   * For runways and navigational aids, in Hz; multiply by 1000 for kHz, 1_000_000 for MHz
   */
  frequency: number | null = null;

  /**
   * @param name ICAO code for airport, runway designator, navaid
   *    designator, fix name, or custom name
   * @param type Type of checkpoint, like "departure_runway"
   * @param longitude easting, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -180..180
   * @param latitude northing, using the World Geodetic
   *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
   *    of decimal degrees; -90..90
   * @param additionalAttributes allows to set additional attributes on creation
   */
  constructor(
    name: string,
    type: AeroflyMissionCheckpointType,
    longitude: number,
    latitude: number,
    additionalAttributes: {
      altitude?: number;
      altitude_feet?: number;
      direction?: number;
      slope?: number;
      length?: number;
      frequency?: number;
    } = {},
  ) {
    this.type = type;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;

    if (additionalAttributes.altitude_feet) {
      additionalAttributes.altitude = additionalAttributes.altitude_feet / feetPerMeter;
    }

    this.altitude = additionalAttributes.altitude ?? this.altitude;
    this.direction = additionalAttributes.direction ?? this.direction;
    this.slope = additionalAttributes.slope ?? this.slope;
    this.length = additionalAttributes.length ?? this.length;
    this.frequency = additionalAttributes.frequency ?? this.frequency;
  }

  /**
   * @param altitude_feet
   */
  set altitude_feet(altitude_feet: number) {
    this.altitude = altitude_feet / feetPerMeter;
  }

  get frequency_string(): string {
    if (!this.frequency) {
      return "None";
    }
    if (this.frequency > 1_000_000) {
      return String(this.frequency / 1_000_000) + " MHz";
    }
    if (this.frequency > 1_000) {
      return String(this.frequency / 1_000) + " kHz";
    }

    return String(this.frequency) + " Hz";
  }

  /**
   * @param index if used in an array will se the array index
   * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
   */
  toString(index: number = 0): string {
    return `                    <[tmmission_checkpoint][element][${index}]
                        <[string8u][type][${this.type}]>
                        <[string8u][name][${this.name}]>
                        <[vector2_float64][lon_lat][${this.longitude} ${this.latitude}]>
                        <[float64][altitude][${this.altitude}]> // ${this.altitude * feetPerMeter} ft
                        <[float64][direction][${this.direction ?? (index === 0 ? -1 : 0)}]>
                        <[float64][slope][${this.slope ?? 0}]>
                        <[float64][length][${this.length ?? 0}]> // ${(this.length ?? 0) * feetPerMeter} ft
                        <[float64][frequency][${this.frequency ?? 0}]> // ${this.frequency_string}
                    >`;
  }
}

export default {
  AeroflyMissionsList,
  AeroflyMission,
  AeroflyMissionConditions,
  AeroflyMissionConditionsCloud,
  AeroflyMissionCheckpoint,
};
