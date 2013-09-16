/*
All clafers: 16 | Abstract: 2 | Concrete: 14 | References: 0
Constraints: 13
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

abstract sig c3_PKJab
{ r_c4_Base : one c4_Base
, r_c10_ContactListSource : one c10_ContactListSource
, r_c22_XEP0085 : lone c22_XEP0085
, r_c40_History : lone c40_History
, r_c46_Timestamps : lone c46_Timestamps
, r_c52_XEP0092 : lone c52_XEP0092
, r_c64_ThemeSelection : lone c64_ThemeSelection
, r_c70_total_footprint : one c70_total_footprint }

sig c4_Base extends c1_IMeasurable
{}
{ one @r_c4_Base.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 696 }

sig c10_ContactListSource extends c1_IMeasurable
{ r_c16_ServerRoster : one c16_ServerRoster }
{ one @r_c10_ContactListSource.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c16_ServerRoster extends c1_IMeasurable
{}
{ one @r_c16_ServerRoster.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c22_XEP0085 extends c1_IMeasurable
{ r_c28_Composing : one c28_Composing
, r_c34_SendComposing : lone c34_SendComposing }
{ one @r_c22_XEP0085.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 27 }

sig c28_Composing extends c1_IMeasurable
{}
{ one @r_c28_Composing.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c34_SendComposing extends c1_IMeasurable
{}
{ one @r_c34_SendComposing.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 13 }

sig c40_History extends c1_IMeasurable
{}
{ one @r_c40_History.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 5 }

sig c46_Timestamps extends c1_IMeasurable
{}
{ one @r_c46_Timestamps.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c52_XEP0092 extends c1_IMeasurable
{ r_c58_SendVersion : lone c58_SendVersion }
{ one @r_c52_XEP0092.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c58_SendVersion extends c1_IMeasurable
{}
{ one @r_c58_SendVersion.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 5 }

sig c64_ThemeSelection extends c1_IMeasurable
{}
{ one @r_c64_ThemeSelection.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 58 }

sig c70_total_footprint
{ c70_total_footprint_ref : one Int }
{ one @r_c70_total_footprint.this
  this.@c70_total_footprint_ref = (((((((((((((this.~@r_c70_total_footprint).@r_c4_Base).@r_c2_footprint.@c2_footprint_ref).add[(((this.~@r_c70_total_footprint).@r_c10_ContactListSource).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c70_total_footprint).@r_c10_ContactListSource).@r_c16_ServerRoster).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c70_total_footprint).@r_c22_XEP0085).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c70_total_footprint).@r_c22_XEP0085).@r_c28_Composing).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c70_total_footprint).@r_c22_XEP0085).@r_c34_SendComposing).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c70_total_footprint).@r_c40_History).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c70_total_footprint).@r_c46_Timestamps).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c70_total_footprint).@r_c52_XEP0092).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c70_total_footprint).@r_c52_XEP0092).@r_c58_SendVersion).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c70_total_footprint).@r_c64_ThemeSelection).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c116_simpleConfig extends c3_PKJab
{}
{ ((((((some this.@r_c4_Base) && (some this.@r_c22_XEP0085)) && (some (this.@r_c22_XEP0085).@r_c28_Composing)) && (some (this.@r_c22_XEP0085).@r_c34_SendComposing)) && (no this.@r_c40_History)) && (no this.@r_c46_Timestamps)) && (no this.@r_c64_ThemeSelection) }

objectives o_global {
minimize c116_simpleConfig.@r_c70_total_footprint.@c70_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 770  + concrete_int_bag -> 772  + concrete_int_bag -> 775  + concrete_int_bag -> 8  + concrete_int_bag -> 777  + concrete_int_bag -> 10  + concrete_int_bag -> 791  + concrete_int_bag -> 780  + concrete_int_bag -> 781  + concrete_int_bag -> 749  + concrete_int_bag -> 16  + concrete_int_bag -> 728  + concrete_int_bag -> 18  + concrete_int_bag -> 21  + concrete_int_bag -> 23  + concrete_int_bag -> 26  + concrete_int_bag -> 797  + concrete_int_bag -> 30  + concrete_int_bag -> 799  + concrete_int_bag -> 32  + concrete_int_bag -> 802  + concrete_int_bag -> 35  + concrete_int_bag -> 804  + concrete_int_bag -> 37  + concrete_int_bag -> 807  + concrete_int_bag -> 40  + concrete_int_bag -> 794  + concrete_int_bag -> 43  + concrete_int_bag -> 45  + concrete_int_bag -> 733  + concrete_int_bag -> 48  + concrete_int_bag -> 50  + concrete_int_bag -> 53  + concrete_int_bag -> 706  + concrete_int_bag -> 699  + concrete_int_bag -> 61  + concrete_int_bag -> 63  + concrete_int_bag -> 704  + concrete_int_bag -> 701  + concrete_int_bag -> 66  + concrete_int_bag -> 68  + concrete_int_bag -> 709  + concrete_int_bag -> 731  + concrete_int_bag -> 71  + concrete_int_bag -> 712  + concrete_int_bag -> 74  + concrete_int_bag -> 76  + concrete_int_bag -> 717  + concrete_int_bag -> 79  + concrete_int_bag -> 81  + concrete_int_bag -> 722  + concrete_int_bag -> 723  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 726  + concrete_int_bag -> 88  + concrete_int_bag -> 90  + concrete_int_bag -> 719  + concrete_int_bag -> 93  + concrete_int_bag -> 95  + concrete_int_bag -> 736  + concrete_int_bag -> 784  + concrete_int_bag -> 98  + concrete_int_bag -> 739  + concrete_int_bag -> 101  + concrete_int_bag -> 103  + concrete_int_bag -> 744  + concrete_int_bag -> 714  + concrete_int_bag -> 106  + concrete_int_bag -> 108  + concrete_int_bag -> 786  + concrete_int_bag -> 111  + concrete_int_bag -> 754  + concrete_int_bag -> 741  + concrete_int_bag -> 757  + concrete_int_bag -> 759  + concrete_int_bag -> 762  + concrete_int_bag -> 767  + concrete_int_bag -> 764  + concrete_int_bag -> 746  + concrete_int_bag -> 789 
   , c4_Base in partial_c4_Base
   , c10_ContactListSource in partial_c10_ContactListSource
   , c16_ServerRoster in partial_c16_ServerRoster
   , c22_XEP0085 in partial_c22_XEP0085
   , c28_Composing in partial_c28_Composing
   , c34_SendComposing in partial_c34_SendComposing
   , c40_History in partial_c40_History
   , c46_Timestamps in partial_c46_Timestamps
   , c52_XEP0092 in partial_c52_XEP0092
   , c58_SendVersion in partial_c58_SendVersion
   , c64_ThemeSelection in partial_c64_ThemeSelection
    ,  c2_footprint in footprint_for_c4_Base_of_696 + footprint_for_c10_ContactListSource_of_0 + footprint_for_c16_ServerRoster_of_0 + footprint_for_c22_XEP0085_of_27 + footprint_for_c28_Composing_of_0 + footprint_for_c34_SendComposing_of_13 + footprint_for_c40_History_of_5 + footprint_for_c46_Timestamps_of_3 + footprint_for_c52_XEP0092_of_0 + footprint_for_c58_SendVersion_of_5 + footprint_for_c64_ThemeSelection_of_58
    , r_c2_footprint in partial_c4_Base->footprint_for_c4_Base_of_696 + partial_c10_ContactListSource->footprint_for_c10_ContactListSource_of_0 + partial_c16_ServerRoster->footprint_for_c16_ServerRoster_of_0 + partial_c22_XEP0085->footprint_for_c22_XEP0085_of_27 + partial_c28_Composing->footprint_for_c28_Composing_of_0 + partial_c34_SendComposing->footprint_for_c34_SendComposing_of_13 + partial_c40_History->footprint_for_c40_History_of_5 + partial_c46_Timestamps->footprint_for_c46_Timestamps_of_3 + partial_c52_XEP0092->footprint_for_c52_XEP0092_of_0 + partial_c58_SendVersion->footprint_for_c58_SendVersion_of_5 + partial_c64_ThemeSelection->footprint_for_c64_ThemeSelection_of_58
    , c2_footprint_ref in footprint_for_c4_Base_of_696-> 696 + footprint_for_c10_ContactListSource_of_0-> 0 + footprint_for_c16_ServerRoster_of_0-> 0 + footprint_for_c22_XEP0085_of_27-> 27 + footprint_for_c28_Composing_of_0-> 0 + footprint_for_c34_SendComposing_of_13-> 13 + footprint_for_c40_History_of_5-> 5 + footprint_for_c46_Timestamps_of_3-> 3 + footprint_for_c52_XEP0092_of_0-> 0 + footprint_for_c58_SendVersion_of_5-> 5 + footprint_for_c64_ThemeSelection_of_58-> 58
}
run show for partial_speedup optimize o_global
