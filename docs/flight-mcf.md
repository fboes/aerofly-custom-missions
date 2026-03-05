# Aerofly FS4 flight plan file `flight.mcf`

[Aerofly Flight Simulator 4](https://www.aerofly.com/) has a main configuration file called `main.mcf`, which is automatically loaded on simulator startup. This file contains all settings, including aircraft, weather and flight plan settings.

As this file is way to big, there is a proposal to have a smaller version called `flight.mcf`, which is a stripped-down version of the `main.mcf` which only contains all information necessary for flight set-up.

This library provides an interface to create this `flight.mcf`.
