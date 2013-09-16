/*
All clafers: 16 | Abstract: 2 | Concrete: 14 | References: 0
Constraints: 20
Goals: 2
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IMeasurable
{ r_c2_cost : one c2_cost
, r_c3_performance : one c3_performance }

sig c2_cost
{ c2_cost_ref : one Int }
{ one @r_c2_cost.this }

sig c3_performance
{ c3_performance_ref : one Int }
{ one @r_c3_performance.this }

abstract sig c4_BikeModel
{ r_c5_Frame : one c5_Frame
, r_c38_Forks : one c38_Forks
, r_c71_HandleBars : one c71_HandleBars
, r_c104_total_performance : one c104_total_performance
, r_c130_total_cost : one c130_total_cost }

sig c5_Frame extends c1_IMeasurable
{ r_c16_Aluminum : lone c16_Aluminum
, r_c27_Steel : lone c27_Steel }
{ one @r_c5_Frame.this
  let children = (r_c16_Aluminum + r_c27_Steel) | one children
  (this.@r_c2_cost.@c2_cost_ref) = 0
  (this.@r_c3_performance.@c3_performance_ref) = 0 }

sig c16_Aluminum extends c1_IMeasurable
{}
{ one @r_c16_Aluminum.this
  (this.@r_c2_cost.@c2_cost_ref) = 7
  (this.@r_c3_performance.@c3_performance_ref) = 5 }

sig c27_Steel extends c1_IMeasurable
{}
{ one @r_c27_Steel.this
  (this.@r_c2_cost.@c2_cost_ref) = 2
  (this.@r_c3_performance.@c3_performance_ref) = 3 }

sig c38_Forks extends c1_IMeasurable
{ r_c49_regular : lone c49_regular
, r_c60_shocks : lone c60_shocks }
{ one @r_c38_Forks.this
  let children = (r_c49_regular + r_c60_shocks) | one children
  (this.@r_c2_cost.@c2_cost_ref) = 0
  (this.@r_c3_performance.@c3_performance_ref) = 0 }

sig c49_regular extends c1_IMeasurable
{}
{ one @r_c49_regular.this
  (this.@r_c2_cost.@c2_cost_ref) = 1
  (this.@r_c3_performance.@c3_performance_ref) = 2 }

sig c60_shocks extends c1_IMeasurable
{}
{ one @r_c60_shocks.this
  (this.@r_c2_cost.@c2_cost_ref) = 5
  (this.@r_c3_performance.@c3_performance_ref) = 6 }

sig c71_HandleBars extends c1_IMeasurable
{ r_c82_Standard : lone c82_Standard
, r_c93_Racing : lone c93_Racing }
{ one @r_c71_HandleBars.this
  let children = (r_c82_Standard + r_c93_Racing) | one children
  (this.@r_c2_cost.@c2_cost_ref) = 0
  (this.@r_c3_performance.@c3_performance_ref) = 0 }

sig c82_Standard extends c1_IMeasurable
{}
{ one @r_c82_Standard.this
  (this.@r_c2_cost.@c2_cost_ref) = 1
  (this.@r_c3_performance.@c3_performance_ref) = 3 }

sig c93_Racing extends c1_IMeasurable
{}
{ one @r_c93_Racing.this
  (this.@r_c2_cost.@c2_cost_ref) = 6
  (this.@r_c3_performance.@c3_performance_ref) = 7 }

sig c104_total_performance
{ c104_total_performance_ref : one Int }
{ one @r_c104_total_performance.this
  this.@c104_total_performance_ref = (((((((((this.~@r_c104_total_performance).@r_c71_HandleBars).@r_c82_Standard).@r_c3_performance.@c3_performance_ref).add[((((this.~@r_c104_total_performance).@r_c71_HandleBars).@r_c93_Racing).@r_c3_performance.@c3_performance_ref)]).add[((((this.~@r_c104_total_performance).@r_c38_Forks).@r_c49_regular).@r_c3_performance.@c3_performance_ref)]).add[((((this.~@r_c104_total_performance).@r_c38_Forks).@r_c60_shocks).@r_c3_performance.@c3_performance_ref)]).add[((((this.~@r_c104_total_performance).@r_c5_Frame).@r_c27_Steel).@r_c3_performance.@c3_performance_ref)]).add[((((this.~@r_c104_total_performance).@r_c5_Frame).@r_c16_Aluminum).@r_c3_performance.@c3_performance_ref)]) }

sig c130_total_cost
{ c130_total_cost_ref : one Int }
{ one @r_c130_total_cost.this
  this.@c130_total_cost_ref = (((((((((this.~@r_c130_total_cost).@r_c71_HandleBars).@r_c82_Standard).@r_c2_cost.@c2_cost_ref).add[((((this.~@r_c130_total_cost).@r_c71_HandleBars).@r_c93_Racing).@r_c2_cost.@c2_cost_ref)]).add[((((this.~@r_c130_total_cost).@r_c38_Forks).@r_c49_regular).@r_c2_cost.@c2_cost_ref)]).add[((((this.~@r_c130_total_cost).@r_c38_Forks).@r_c60_shocks).@r_c2_cost.@c2_cost_ref)]).add[((((this.~@r_c130_total_cost).@r_c5_Frame).@r_c27_Steel).@r_c2_cost.@c2_cost_ref)]).add[((((this.~@r_c130_total_cost).@r_c5_Frame).@r_c16_Aluminum).@r_c2_cost.@c2_cost_ref)]) }

one sig c156_simpleBike extends c4_BikeModel
{}

objectives o_global {
minimize c156_simpleBike.@r_c130_total_cost.@c130_total_cost_ref ,
maximize c156_simpleBike.@r_c104_total_performance.@c104_total_performance_ref 
}