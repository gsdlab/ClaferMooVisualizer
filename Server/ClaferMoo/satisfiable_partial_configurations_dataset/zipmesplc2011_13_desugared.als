/*
All clafers: 14 | Abstract: 2 | Concrete: 12 | References: 0
Constraints: 11
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

abstract sig c3_ZipMeSPL
{ r_c4_base : one c4_base
, r_c22_zipMeCRC : lone c22_zipMeCRC
, r_c28_zipMearchiveCheck : lone c28_zipMearchiveCheck
, r_c34_zipMeGZIP : lone c34_zipMeGZIP
, r_c40_zipMeadaptation : lone c40_zipMeadaptation
, r_c46_zipMeadler32Chcksum : lone c46_zipMeadler32Chcksum
, r_c52_zipMeextract : lone c52_zipMeextract
, r_c58_total_footprint : one c58_total_footprint }

sig c4_base extends c1_IMeasurable
{ r_c10_zipMe : one c10_zipMe
, r_c16_zipMecompress : one c16_zipMecompress }
{ one @r_c4_base.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 796 }

sig c10_zipMe extends c1_IMeasurable
{}
{ one @r_c10_zipMe.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c16_zipMecompress extends c1_IMeasurable
{}
{ one @r_c16_zipMecompress.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c22_zipMeCRC extends c1_IMeasurable
{}
{ one @r_c22_zipMeCRC.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 16 }

sig c28_zipMearchiveCheck extends c1_IMeasurable
{}
{ one @r_c28_zipMearchiveCheck.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c34_zipMeGZIP extends c1_IMeasurable
{}
{ one @r_c34_zipMeGZIP.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 58 }

sig c40_zipMeadaptation extends c1_IMeasurable
{}
{ one @r_c40_zipMeadaptation.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3 }

sig c46_zipMeadler32Chcksum extends c1_IMeasurable
{}
{ one @r_c46_zipMeadler32Chcksum.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0 }

sig c52_zipMeextract extends c1_IMeasurable
{}
{ one @r_c52_zipMeextract.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 69 }

sig c58_total_footprint
{ c58_total_footprint_ref : one Int }
{ one @r_c58_total_footprint.this
  this.@c58_total_footprint_ref = (((((((((((this.~@r_c58_total_footprint).@r_c4_base).@r_c2_footprint.@c2_footprint_ref).add[((((this.~@r_c58_total_footprint).@r_c4_base).@r_c10_zipMe).@r_c2_footprint.@c2_footprint_ref)]).add[((((this.~@r_c58_total_footprint).@r_c4_base).@r_c16_zipMecompress).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c22_zipMeCRC).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c28_zipMearchiveCheck).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c34_zipMeGZIP).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c40_zipMeadaptation).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c46_zipMeadler32Chcksum).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c52_zipMeextract).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c96_simpleConfig extends c3_ZipMeSPL
{}
{ (((((some this.@r_c4_base) && (some this.@r_c22_zipMeCRC)) && (some this.@r_c28_zipMearchiveCheck)) && (some this.@r_c34_zipMeGZIP)) && (some this.@r_c40_zipMeadaptation)) && (no this.@r_c52_zipMeextract) }

objectives o_global {
minimize c96_simpleConfig.@r_c58_total_footprint.@c58_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 130  + concrete_int_bag -> 133  + concrete_int_bag -> 6  + concrete_int_bag -> 143  + concrete_int_bag -> 146  + concrete_int_bag -> 19  + concrete_int_bag -> 149  + concrete_int_bag -> 22  + concrete_int_bag -> 923  + concrete_int_bag -> 926  + concrete_int_bag -> 799  + concrete_int_bag -> 929  + concrete_int_bag -> 802  + concrete_int_bag -> 939  + concrete_int_bag -> 812  + concrete_int_bag -> 942  + concrete_int_bag -> 815  + concrete_int_bag -> 945  + concrete_int_bag -> 818  + concrete_int_bag -> 61  + concrete_int_bag -> 64  + concrete_int_bag -> 72  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 77  + concrete_int_bag -> 80  + concrete_int_bag -> 85  + concrete_int_bag -> 854  + concrete_int_bag -> 88  + concrete_int_bag -> 857  + concrete_int_bag -> 91  + concrete_int_bag -> 860  + concrete_int_bag -> 865  + concrete_int_bag -> 868  + concrete_int_bag -> 870  + concrete_int_bag -> 871  + concrete_int_bag -> 873  + concrete_int_bag -> 876  + concrete_int_bag -> 881  + concrete_int_bag -> 884  + concrete_int_bag -> 887  + concrete_int_bag -> 127 
   , c4_base in partial_c4_base
   , c10_zipMe in partial_c10_zipMe
   , c16_zipMecompress in partial_c16_zipMecompress
   , c22_zipMeCRC in partial_c22_zipMeCRC
   , c28_zipMearchiveCheck in partial_c28_zipMearchiveCheck
   , c34_zipMeGZIP in partial_c34_zipMeGZIP
   , c40_zipMeadaptation in partial_c40_zipMeadaptation
   , c46_zipMeadler32Chcksum in partial_c46_zipMeadler32Chcksum
   , c52_zipMeextract in partial_c52_zipMeextract
    ,  c2_footprint in footprint_for_c4_base_of_796 + footprint_for_c10_zipMe_of_0 + footprint_for_c16_zipMecompress_of_0 + footprint_for_c22_zipMeCRC_of_16 + footprint_for_c28_zipMearchiveCheck_of_3 + footprint_for_c34_zipMeGZIP_of_58 + footprint_for_c40_zipMeadaptation_of_3 + footprint_for_c46_zipMeadler32Chcksum_of_0 + footprint_for_c52_zipMeextract_of_69
    , r_c2_footprint in partial_c4_base->footprint_for_c4_base_of_796 + partial_c10_zipMe->footprint_for_c10_zipMe_of_0 + partial_c16_zipMecompress->footprint_for_c16_zipMecompress_of_0 + partial_c22_zipMeCRC->footprint_for_c22_zipMeCRC_of_16 + partial_c28_zipMearchiveCheck->footprint_for_c28_zipMearchiveCheck_of_3 + partial_c34_zipMeGZIP->footprint_for_c34_zipMeGZIP_of_58 + partial_c40_zipMeadaptation->footprint_for_c40_zipMeadaptation_of_3 + partial_c46_zipMeadler32Chcksum->footprint_for_c46_zipMeadler32Chcksum_of_0 + partial_c52_zipMeextract->footprint_for_c52_zipMeextract_of_69
    , c2_footprint_ref in footprint_for_c4_base_of_796-> 796 + footprint_for_c10_zipMe_of_0-> 0 + footprint_for_c16_zipMecompress_of_0-> 0 + footprint_for_c22_zipMeCRC_of_16-> 16 + footprint_for_c28_zipMearchiveCheck_of_3-> 3 + footprint_for_c34_zipMeGZIP_of_58-> 58 + footprint_for_c40_zipMeadaptation_of_3-> 3 + footprint_for_c46_zipMeadler32Chcksum_of_0-> 0 + footprint_for_c52_zipMeextract_of_69-> 69
}
run show for partial_speedup optimize o_global
