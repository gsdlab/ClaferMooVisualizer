/*
 * Apollo 13 Architecture Example 
 * Chapter 4, PhD thesis, Williard Simmons, Course 16, MIT
 */

/* 
 * There are 9 decision variables in this problem
 * EOR, LOR, EarthLaunch, MoonArrival, MoonDeparture, CMCrew, LMCrew, SMFuel, LMFuel 
 */ 

// Decision variables
one sig Vars {
	EOR : RendezvousDecision,
	LOR : RendezvousDecision,
	earthLaunch : OrbitDecision,
	moonArrival : OrbitDecision,
	moonDeparture : OrbitDecision,
	cmCrew : Int,
	lmCrew : Int,	
	smFuel : FuelType,
	lmFuel : FuelType
}
{
	cmCrew = 2 or cmCrew = 3
	lmCrew >= 0 and lmCrew <= 3
	smFuel in Cryogenic + Storable
	lmFuel in NA + Cryogenic + Storable
}

// Rendezvous decisions
abstract sig RendezvousDecision {}

one sig Yes, No extends RendezvousDecision {}
// Orbit modes during three different stages: 
abstract sig OrbitDecision {}

one sig Orbit, Direct extends OrbitDecision {}

// Fuel types
abstract sig FuelType {}

one sig NA, Cryogenic, Storable extends FuelType {}

/* Constraints on decision variables */
fact EORConstraint {
	(Vars.EOR = Yes and Vars.earthLaunch = Orbit) or
	Vars.EOR = No
}

fact LORConstraint {
	(Vars.LOR = Yes and Vars.moonArrival = Orbit) or
	Vars.LOR = No
}

fact moonLeaving {
	(Vars.LOR = Yes and Vars.moonDeparture = Orbit) or
	Vars.LOR = No
}

fact lmcmcrew {
	Vars.cmCrew >= Vars.lmCrew
}

fact lmexists {
	(Vars.LOR = No and Vars.lmCrew = 0) or
	(Vars.LOR = Yes and Vars.lmCrew > 0)	
}

fact lmFuelConstraint {
	(Vars.LOR = No and Vars.lmFuel = NA) or
	(Vars.LOR = Yes and Vars.lmFuel != NA)	
}

run {} for 10

