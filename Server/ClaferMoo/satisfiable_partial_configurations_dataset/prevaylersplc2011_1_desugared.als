/*
All clafers: 11 | Abstract: 2 | Concrete: 9 | References: 0
Constraints: 9
Goals: 1
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IMeasurable
{ r_c2_footprint : one c2_footprint }

sig c2_footprint
{ c2_footprint_ref : one Int }
{ one @r_c2_footprint.this }

abstract sig c3_Prevayler
{ r_c4_PrevaylerSPL : one c4_PrevaylerSPL
, r_c10_Replication : lone c10_Replication
, r_c16_GZip : lone c16_GZip
, r_c22_Censor : lone c22_Censor
, r_c30_Monitor : lone c30_Monitor
, r_c36_Snapshot : lone c36_Snapshot
, r_c42_total_footprint : one c42_total_footprint }

sig c4_PrevaylerSPL extends c1_IMeasurable
{}
{ one @r_c4_PrevaylerSPL.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 873 }

sig c10_Replication extends c1_IMeasurable
{}
{ one @r_c10_Replication.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 523 }

sig c16_GZip extends c1_IMeasurable
{}
{ one @r_c16_GZip.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 54 }

sig c22_Censor extends c1_IMeasurable
{}
{ one @r_c22_Censor.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 50
  some (this.~@r_c22_Censor).@r_c36_Snapshot }

sig c30_Monitor extends c1_IMeasurable
{}
{ one @r_c30_Monitor.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 77 }

sig c36_Snapshot extends c1_IMeasurable
{}
{ one @r_c36_Snapshot.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 108 }

sig c42_total_footprint
{ c42_total_footprint_ref : one Int }
{ one @r_c42_total_footprint.this
  this.@c42_total_footprint_ref = ((((((((this.~@r_c42_total_footprint).@r_c4_PrevaylerSPL).@r_c2_footprint.@c2_footprint_ref).add[(((this.~@r_c42_total_footprint).@r_c10_Replication).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c42_total_footprint).@r_c16_GZip).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c42_total_footprint).@r_c22_Censor).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c42_total_footprint).@r_c30_Monitor).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c42_total_footprint).@r_c36_Snapshot).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c68_simpleConfig extends c3_Prevayler
{}
{ (((some this.@r_c4_PrevaylerSPL) && (no this.@r_c16_GZip)) && (no this.@r_c22_Censor)) && (no this.@r_c36_Snapshot) }

objectives o_global {
minimize c68_simpleConfig.@r_c42_total_footprint.@c42_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 131  + concrete_int_bag -> 1031  + concrete_int_bag -> 650  + concrete_int_bag -> 1035  + concrete_int_bag -> 654  + concrete_int_bag -> 1581  + concrete_int_bag -> 600  + concrete_int_bag -> 1554  + concrete_int_bag -> 1685  + concrete_int_bag -> 1558  + concrete_int_bag -> 923  + concrete_int_bag -> 158  + concrete_int_bag -> 927  + concrete_int_bag -> 289  + concrete_int_bag -> 1058  + concrete_int_bag -> 1446  + concrete_int_bag -> 1577  + concrete_int_bag -> 1450  + concrete_int_bag -> 812  + concrete_int_bag -> 685  + concrete_int_bag -> 1523  + concrete_int_bag -> 1054  + concrete_int_bag -> 950  + concrete_int_bag -> 631  + concrete_int_bag -> 185  + concrete_int_bag -> 1631  + concrete_int_bag -> 573  + concrete_int_bag -> 181  + concrete_int_bag -> 704  + concrete_int_bag -> 1473  + concrete_int_bag -> 708  + concrete_int_bag -> 1608  + concrete_int_bag -> 1527  + concrete_int_bag -> 577  + concrete_int_bag -> 162  + concrete_int_bag -> 977  + concrete_int_bag -> 1108  + concrete_int_bag -> 981  + concrete_int_bag -> 1162  + concrete_int_bag -> 1112  + concrete_int_bag -> 1500  + concrete_int_bag -> 735  + concrete_int_bag -> 1504  + concrete_int_bag -> 1635  + concrete_int_bag -> 1000  + concrete_int_bag -> 235  + concrete_int_bag -> 1004  + concrete_int_bag -> 1085  + concrete_int_bag -> 104  + concrete_int_bag -> 627  + concrete_int_bag -> 1396  + concrete_int_bag -> 758  + concrete_int_bag -> 681  + concrete_int_bag -> 212  + concrete_int_bag -> 762  + concrete_int_bag -> 239  + concrete_int_bag -> 127 
   , c4_PrevaylerSPL in partial_c4_PrevaylerSPL
   , c10_Replication in partial_c10_Replication
   , c16_GZip in partial_c16_GZip
   , c22_Censor in partial_c22_Censor
   , c30_Monitor in partial_c30_Monitor
   , c36_Snapshot in partial_c36_Snapshot
    ,  c2_footprint in footprint_for_c4_PrevaylerSPL_of_873 + footprint_for_c10_Replication_of_523 + footprint_for_c16_GZip_of_54 + footprint_for_c22_Censor_of_50 + footprint_for_c30_Monitor_of_77 + footprint_for_c36_Snapshot_of_108
    , r_c2_footprint in partial_c4_PrevaylerSPL->footprint_for_c4_PrevaylerSPL_of_873 + partial_c10_Replication->footprint_for_c10_Replication_of_523 + partial_c16_GZip->footprint_for_c16_GZip_of_54 + partial_c22_Censor->footprint_for_c22_Censor_of_50 + partial_c30_Monitor->footprint_for_c30_Monitor_of_77 + partial_c36_Snapshot->footprint_for_c36_Snapshot_of_108
    , c2_footprint_ref in footprint_for_c4_PrevaylerSPL_of_873-> 873 + footprint_for_c10_Replication_of_523-> 523 + footprint_for_c16_GZip_of_54-> 54 + footprint_for_c22_Censor_of_50-> 50 + footprint_for_c30_Monitor_of_77-> 77 + footprint_for_c36_Snapshot_of_108-> 108
}
run show for partial_speedup optimize o_global
