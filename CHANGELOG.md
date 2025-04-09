# Changelog

This changelog documents all notable changes to the Aerofly Custom Missions project. Each version entry includes a list of changes, with the most recent version at the top.

## 1.2.3

- Internal restructuring of mission generation logic
- Optimized waypoint handling and validation
- Improved error handling for mission parsing

## 1.2.2

- Added altitude constraint property for waypoints
- Improved handling of cloud layers with better validation

## 1.2.1

- Changed handling of checkpoints to support missions without checkpoints
- Improved file generation for programmatic mission creation
- Added new properties:
  - `is_scheduled` for mission scheduling
  - `tutorial_name` for tutorial identification
- Enhanced cloud handling with better validation
- Improved handling of unset values with default fallbacks
- Added new flight settings:
  - `cold_and_dark`
  - `before_start`
  - `pushback`

## 1.2.0

- Added new cloud level properties:
  - `cirrus_cover` for high-altitude cloud coverage
  - `cirrus_base` for cirrus cloud base altitude
- Added new waypoint property `fly_over` for precise waypoint navigation
- Added `finish` property to mark mission completion points

## 1.1.1

- Fixed styling issues in mission display
- Improved UI consistency across different mission types
- Enhanced error message formatting

## 1.1.0

- Added new mission metadata properties:
  - `tags` for mission categorization
  - `isFeatured` for highlighting special missions
  - `difficulty` for mission complexity rating
  - `distance` for mission length in kilometers
  - `duration` for estimated completion time
  - Multi-language support for mission descriptions
- Added new flight settings:
  - `winch_launch` for glider operations
  - `aerotow` for towed aircraft operations
- Improved temperature property with better unit handling

## 1.0.4

- Added comprehensive documentation for known issues and workarounds
- Added `AeroflyMissionConditions.temperature` property with Celsius support
- Improved error handling for weather conditions

## 1.0.3

- Enhanced API documentation with examples
- Added detailed parameter descriptions
- Improved code documentation

## 1.0.2

- Added shorthand properties for common mission parameters
- Improved property access methods
- Enhanced mission validation

## 1.0.1

- Added initial API documentation
- Improved code comments
- Added basic usage examples

## 1.0.0

- Initial release of Aerofly Custom Missions
- Basic mission creation and editing functionality
- Support for essential mission parameters
