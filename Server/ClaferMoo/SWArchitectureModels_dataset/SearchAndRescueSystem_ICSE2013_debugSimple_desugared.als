/*
All clafers: 11 | Abstract: 3 | Concrete: 8 | References: 0
Constraints: 6
Goals: 2
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_RampUpTime : one c2_RampUpTime }

sig c2_RampUpTime
{ c2_RampUpTime_ref : one Int }
{ one @r_c2_RampUpTime.this }

abstract sig c3_FeatureWithCost extends c1_Feature
{ r_c4_cost : one c4_cost }

sig c4_cost
{ c4_cost_ref : one Int }
{ one @r_c4_cost.this }

abstract sig c5_SearchAndRescueFM
{ r_c6_LocationFinding : one c6_LocationFinding
, r_c29_total_cost : one c29_total_cost
, r_c35_total_RampUpTime : one c35_total_RampUpTime }

sig c6_LocationFinding extends c1_Feature
{ r_c12_GPS : lone c12_GPS
, r_c23_RadioTriangulation : lone c23_RadioTriangulation }
{ one @r_c6_LocationFinding.this
  let children = (r_c12_GPS + r_c23_RadioTriangulation) | one children
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 0 }

sig c12_GPS extends c3_FeatureWithCost
{}
{ one @r_c12_GPS.this
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 6
  (this.@r_c4_cost.@c4_cost_ref) = 80 }

sig c23_RadioTriangulation extends c1_Feature
{}
{ one @r_c23_RadioTriangulation.this
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 8 }

sig c29_total_cost
{ c29_total_cost_ref : one Int }
{ one @r_c29_total_cost.this
  this.@c29_total_cost_ref = ((((this.~@r_c29_total_cost).@r_c6_LocationFinding).@r_c12_GPS).@r_c4_cost.@c4_cost_ref) }

sig c35_total_RampUpTime
{ c35_total_RampUpTime_ref : one Int }
{ one @r_c35_total_RampUpTime.this
  this.@c35_total_RampUpTime_ref = (((((this.~@r_c35_total_RampUpTime).@r_c6_LocationFinding).@r_c2_RampUpTime.@c2_RampUpTime_ref).add[((((this.~@r_c35_total_RampUpTime).@r_c6_LocationFinding).@r_c12_GPS).@r_c2_RampUpTime.@c2_RampUpTime_ref)]).add[((((this.~@r_c35_total_RampUpTime).@r_c6_LocationFinding).@r_c23_RadioTriangulation).@r_c2_RampUpTime.@c2_RampUpTime_ref)]) }

one sig c49_concreteSearchAndRescueSystem extends c5_SearchAndRescueFM
{}

objectives o_global {
minimize c49_concreteSearchAndRescueSystem.@r_c29_total_cost.@c29_total_cost_ref ,
minimize c49_concreteSearchAndRescueSystem.@r_c35_total_RampUpTime.@c35_total_RampUpTime_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 88  + concrete_int_bag -> 94  + concrete_int_bag -> 86  + concrete_int_bag -> 14 
   , c6_LocationFinding in partial_c6_LocationFinding
   , c12_GPS in partial_c12_GPS
   , c23_RadioTriangulation in partial_c23_RadioTriangulation
    ,  c2_RampUpTime in RampUpTime_for_c6_LocationFinding_of_0 + RampUpTime_for_c12_GPS_of_6 + RampUpTime_for_c23_RadioTriangulation_of_8
    ,  c4_cost in cost_for_c12_GPS_of_80
    , r_c2_RampUpTime in partial_c6_LocationFinding->RampUpTime_for_c6_LocationFinding_of_0 + partial_c12_GPS->RampUpTime_for_c12_GPS_of_6 + partial_c23_RadioTriangulation->RampUpTime_for_c23_RadioTriangulation_of_8
    , r_c4_cost in partial_c12_GPS->cost_for_c12_GPS_of_80
    , c2_RampUpTime_ref in RampUpTime_for_c6_LocationFinding_of_0-> 0 + RampUpTime_for_c12_GPS_of_6-> 6 + RampUpTime_for_c23_RadioTriangulation_of_8-> 8
    , c4_cost_ref in cost_for_c12_GPS_of_80-> 80
}
run show for partial_speedup optimize o_global
