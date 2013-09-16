/*
All clafers: 10 | Abstract: 2 | Concrete: 8 | References: 0
Constraints: 8
Goals: 2
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_RampUpTime : one c2_RampUpTime
, r_c3_cost : one c3_cost }

sig c2_RampUpTime
{ c2_RampUpTime_ref : one Int }
{ one @r_c2_RampUpTime.this }

sig c3_cost
{ c3_cost_ref : one Int }
{ one @r_c3_cost.this }

abstract sig c4_SearchAndRescueFM
{ r_c5_LocationFinding : one c5_LocationFinding
, r_c38_total_cost : one c38_total_cost
, r_c52_total_RampUpTime : one c52_total_RampUpTime }

sig c5_LocationFinding extends c1_Feature
{ r_c16_GPS : lone c16_GPS
, r_c27_RadioTriangulation : lone c27_RadioTriangulation }
{ one @r_c5_LocationFinding.this
  let children = (r_c16_GPS + r_c27_RadioTriangulation) | one children
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 0
  (this.@r_c3_cost.@c3_cost_ref) = 0 }

sig c16_GPS extends c1_Feature
{}
{ one @r_c16_GPS.this
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 6
  (this.@r_c3_cost.@c3_cost_ref) = 80 }

sig c27_RadioTriangulation extends c1_Feature
{}
{ one @r_c27_RadioTriangulation.this
  (this.@r_c2_RampUpTime.@c2_RampUpTime_ref) = 8
  (this.@r_c3_cost.@c3_cost_ref) = 0 }

sig c38_total_cost
{ c38_total_cost_ref : one Int }
{ one @r_c38_total_cost.this
  this.@c38_total_cost_ref = (((((this.~@r_c38_total_cost).@r_c5_LocationFinding).@r_c3_cost.@c3_cost_ref).add[((((this.~@r_c38_total_cost).@r_c5_LocationFinding).@r_c16_GPS).@r_c3_cost.@c3_cost_ref)]).add[((((this.~@r_c38_total_cost).@r_c5_LocationFinding).@r_c27_RadioTriangulation).@r_c3_cost.@c3_cost_ref)]) }

sig c52_total_RampUpTime
{ c52_total_RampUpTime_ref : one Int }
{ one @r_c52_total_RampUpTime.this
  this.@c52_total_RampUpTime_ref = (((((this.~@r_c52_total_RampUpTime).@r_c5_LocationFinding).@r_c2_RampUpTime.@c2_RampUpTime_ref).add[((((this.~@r_c52_total_RampUpTime).@r_c5_LocationFinding).@r_c16_GPS).@r_c2_RampUpTime.@c2_RampUpTime_ref)]).add[((((this.~@r_c52_total_RampUpTime).@r_c5_LocationFinding).@r_c27_RadioTriangulation).@r_c2_RampUpTime.@c2_RampUpTime_ref)]) }

one sig c66_concreteSearchAndRescueSystem extends c4_SearchAndRescueFM
{}

objectives o_global {
minimize c66_concreteSearchAndRescueSystem.@r_c38_total_cost.@c38_total_cost_ref ,
minimize c66_concreteSearchAndRescueSystem.@r_c52_total_RampUpTime.@c52_total_RampUpTime_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 88  + concrete_int_bag -> 94  + concrete_int_bag -> 86  + concrete_int_bag -> 14 
   , c5_LocationFinding in partial_c5_LocationFinding
   , c16_GPS in partial_c16_GPS
   , c27_RadioTriangulation in partial_c27_RadioTriangulation
    ,  c2_RampUpTime in RampUpTime_for_c5_LocationFinding_of_0 + RampUpTime_for_c16_GPS_of_6 + RampUpTime_for_c27_RadioTriangulation_of_8
    ,  c3_cost in cost_for_c5_LocationFinding_of_0 + cost_for_c16_GPS_of_80 + cost_for_c27_RadioTriangulation_of_0
    , r_c2_RampUpTime in partial_c5_LocationFinding->RampUpTime_for_c5_LocationFinding_of_0 + partial_c16_GPS->RampUpTime_for_c16_GPS_of_6 + partial_c27_RadioTriangulation->RampUpTime_for_c27_RadioTriangulation_of_8
    , r_c3_cost in partial_c5_LocationFinding->cost_for_c5_LocationFinding_of_0 + partial_c16_GPS->cost_for_c16_GPS_of_80 + partial_c27_RadioTriangulation->cost_for_c27_RadioTriangulation_of_0
    , c2_RampUpTime_ref in RampUpTime_for_c5_LocationFinding_of_0-> 0 + RampUpTime_for_c16_GPS_of_6-> 6 + RampUpTime_for_c27_RadioTriangulation_of_8-> 8
    , c3_cost_ref in cost_for_c5_LocationFinding_of_0-> 0 + cost_for_c16_GPS_of_80-> 80 + cost_for_c27_RadioTriangulation_of_0-> 0
}
run show for partial_speedup optimize o_global
