/*
All clafers: 14 | Abstract: 2 | Concrete: 12 | References: 0
Constraints: 12
Goals: 1
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IMeasurable
{ r_c2_performance : one c2_performance }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

abstract sig c3_Apache
{ r_c4_Base : one c4_Base
, r_c10_HostnameLookups : lone c10_HostnameLookups
, r_c17_KeepAlive : lone c17_KeepAlive
, r_c23_EnableSendfile : lone c23_EnableSendfile
, r_c29_FollowSymLinks : lone c29_FollowSymLinks
, r_c35_AccessLog : lone c35_AccessLog
, r_c42_ExtendedStatus : lone c42_ExtendedStatus
, r_c49_InMemory : lone c49_InMemory
, r_c57_Handle : lone c57_Handle
, r_c63_total_performance : one c63_total_performance }
{ (this.@r_c63_total_performance.@c63_total_performance_ref) = ((((((((((this.@r_c4_Base).@r_c2_performance.@c2_performance_ref).add[((this.@r_c10_HostnameLookups).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c17_KeepAlive).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c23_EnableSendfile).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c29_FollowSymLinks).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c35_AccessLog).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c42_ExtendedStatus).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c49_InMemory).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c57_Handle).@r_c2_performance.@c2_performance_ref)]) }

sig c4_Base extends c1_IMeasurable
{}
{ one @r_c4_Base.this
  (this.@r_c2_performance.@c2_performance_ref) = 150 }

sig c10_HostnameLookups extends c1_IMeasurable
{}
{ one @r_c10_HostnameLookups.this
  (this.@r_c2_performance.@c2_performance_ref) = (-26) }

sig c17_KeepAlive extends c1_IMeasurable
{}
{ one @r_c17_KeepAlive.this
  (this.@r_c2_performance.@c2_performance_ref) = 105 }

sig c23_EnableSendfile extends c1_IMeasurable
{}
{ one @r_c23_EnableSendfile.this
  (this.@r_c2_performance.@c2_performance_ref) = 15 }

sig c29_FollowSymLinks extends c1_IMeasurable
{}
{ one @r_c29_FollowSymLinks.this
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c35_AccessLog extends c1_IMeasurable
{}
{ one @r_c35_AccessLog.this
  (this.@r_c2_performance.@c2_performance_ref) = (-15) }

sig c42_ExtendedStatus extends c1_IMeasurable
{}
{ one @r_c42_ExtendedStatus.this
  (this.@r_c2_performance.@c2_performance_ref) = (-11) }

sig c49_InMemory extends c1_IMeasurable
{}
{ one @r_c49_InMemory.this
  no (this.~@r_c49_InMemory).@r_c57_Handle
  (this.@r_c2_performance.@c2_performance_ref) = 26 }

sig c57_Handle extends c1_IMeasurable
{}
{ one @r_c57_Handle.this
  (this.@r_c2_performance.@c2_performance_ref) = 4 }

sig c63_total_performance
{ c63_total_performance_ref : one Int }
{ one @r_c63_total_performance.this }

one sig c101_simpleConfig extends c3_Apache
{}
{ (((some this.@r_c10_HostnameLookups) && (some this.@r_c17_KeepAlive)) && (no this.@r_c49_InMemory)) && (no this.@r_c57_Handle) }

objectives o_global {
maximize c101_simpleConfig.@r_c63_total_performance.@c63_total_performance_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 128  + concrete_int_bag -> 259  + concrete_int_bag -> 132  + concrete_int_bag -> 263  + concrete_int_bag -> 8  + concrete_int_bag -> 266  + concrete_int_bag -> 11  + concrete_int_bag -> 270  + concrete_int_bag -> 143  + concrete_int_bag -> 222  + concrete_int_bag -> 274  + concrete_int_bag -> 19  + concrete_int_bag -> 218  + concrete_int_bag -> 281  + concrete_int_bag -> 154  + concrete_int_bag -> 285  + concrete_int_bag -> 30  + concrete_int_bag -> 237  + concrete_int_bag -> 289  + concrete_int_bag -> 34  + concrete_int_bag -> -37  + concrete_int_bag -> 165  + concrete_int_bag -> 146  + concrete_int_bag -> 296  + concrete_int_bag -> 41  + concrete_int_bag -> 135  + concrete_int_bag -> 300  + concrete_int_bag -> 45  + concrete_int_bag -> 176  + concrete_int_bag -> 180  + concrete_int_bag -> 53  + concrete_int_bag -> -41  + concrete_int_bag -> 184  + concrete_int_bag -> 57  + concrete_int_bag -> 244  + concrete_int_bag -> 191  + concrete_int_bag -> 64  + concrete_int_bag -> 139  + concrete_int_bag -> 68  + concrete_int_bag -> 158  + concrete_int_bag -> 72  + concrete_int_bag -> 233  + concrete_int_bag -> 203  + concrete_int_bag -> -52  + concrete_int_bag -> 79  + concrete_int_bag -> -48  + concrete_int_bag -> 248  + concrete_int_bag -> 83  + concrete_int_bag -> 214  + concrete_int_bag -> 87  + concrete_int_bag -> 90  + concrete_int_bag -> 207  + concrete_int_bag -> 94  + concrete_int_bag -> -33  + concrete_int_bag -> 98  + concrete_int_bag -> 131  + concrete_int_bag -> 229  + concrete_int_bag -> 102  + concrete_int_bag -> 161  + concrete_int_bag -> -22  + concrete_int_bag -> 109  + concrete_int_bag -> -18  + concrete_int_bag -> 240  + concrete_int_bag -> 113  + concrete_int_bag -> 116  + concrete_int_bag -> 117  + concrete_int_bag -> 169  + concrete_int_bag -> 120  + concrete_int_bag -> -7  + concrete_int_bag -> 255  + concrete_int_bag -> 124  + concrete_int_bag -> 195 
   , c4_Base in partial_c4_Base
   , c10_HostnameLookups in partial_c10_HostnameLookups
   , c17_KeepAlive in partial_c17_KeepAlive
   , c23_EnableSendfile in partial_c23_EnableSendfile
   , c29_FollowSymLinks in partial_c29_FollowSymLinks
   , c35_AccessLog in partial_c35_AccessLog
   , c42_ExtendedStatus in partial_c42_ExtendedStatus
   , c49_InMemory in partial_c49_InMemory
   , c57_Handle in partial_c57_Handle
    ,  c2_performance in performance_for_c4_Base_of_150 + performance_for_c10_HostnameLookups_of_minus26 + performance_for_c17_KeepAlive_of_105 + performance_for_c23_EnableSendfile_of_15 + performance_for_c29_FollowSymLinks_of_0 + performance_for_c35_AccessLog_of_minus15 + performance_for_c42_ExtendedStatus_of_minus11 + performance_for_c49_InMemory_of_26 + performance_for_c57_Handle_of_4
    , r_c2_performance in partial_c4_Base->performance_for_c4_Base_of_150 + partial_c10_HostnameLookups->performance_for_c10_HostnameLookups_of_minus26 + partial_c17_KeepAlive->performance_for_c17_KeepAlive_of_105 + partial_c23_EnableSendfile->performance_for_c23_EnableSendfile_of_15 + partial_c29_FollowSymLinks->performance_for_c29_FollowSymLinks_of_0 + partial_c35_AccessLog->performance_for_c35_AccessLog_of_minus15 + partial_c42_ExtendedStatus->performance_for_c42_ExtendedStatus_of_minus11 + partial_c49_InMemory->performance_for_c49_InMemory_of_26 + partial_c57_Handle->performance_for_c57_Handle_of_4
    , c2_performance_ref in performance_for_c4_Base_of_150-> 150 + performance_for_c10_HostnameLookups_of_minus26-> -26 + performance_for_c17_KeepAlive_of_105-> 105 + performance_for_c23_EnableSendfile_of_15-> 15 + performance_for_c29_FollowSymLinks_of_0-> 0 + performance_for_c35_AccessLog_of_minus15-> -15 + performance_for_c42_ExtendedStatus_of_minus11-> -11 + performance_for_c49_InMemory_of_26-> 26 + performance_for_c57_Handle_of_4-> 4
}
run show for partial_speedup optimize o_global
