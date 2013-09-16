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

abstract sig c3_BerkeleyDbC
{ r_c4_HAVE_CRYPTO : lone c4_HAVE_CRYPTO
, r_c10_HAVE_HASH : lone c10_HAVE_HASH
, r_c16_HAVE_QUEUE : lone c16_HAVE_QUEUE
, r_c22_HAVE_REPLICATION : lone c22_HAVE_REPLICATION
, r_c28_HAVE_VERIFY : lone c28_HAVE_VERIFY
, r_c34_HAVE_SEQUENCE : lone c34_HAVE_SEQUENCE
, r_c40_HAVE_STATISTICS : lone c40_HAVE_STATISTICS
, r_c46_DIAGNOSTIC : lone c46_DIAGNOSTIC
, r_c52_SYNTETHIC_BASE_FEATURE : one c52_SYNTETHIC_BASE_FEATURE
, r_c58_total_footprint : one c58_total_footprint }

sig c4_HAVE_CRYPTO extends c1_IMeasurable
{}
{ one @r_c4_HAVE_CRYPTO.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 10 }

sig c10_HAVE_HASH extends c1_IMeasurable
{}
{ one @r_c10_HAVE_HASH.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 56 }

sig c16_HAVE_QUEUE extends c1_IMeasurable
{}
{ one @r_c16_HAVE_QUEUE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 28 }

sig c22_HAVE_REPLICATION extends c1_IMeasurable
{}
{ one @r_c22_HAVE_REPLICATION.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 44 }

sig c28_HAVE_VERIFY extends c1_IMeasurable
{}
{ one @r_c28_HAVE_VERIFY.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 25 }

sig c34_HAVE_SEQUENCE extends c1_IMeasurable
{}
{ one @r_c34_HAVE_SEQUENCE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 10 }

sig c40_HAVE_STATISTICS extends c1_IMeasurable
{}
{ one @r_c40_HAVE_STATISTICS.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 139 }

sig c46_DIAGNOSTIC extends c1_IMeasurable
{}
{ one @r_c46_DIAGNOSTIC.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 54 }

sig c52_SYNTETHIC_BASE_FEATURE extends c1_IMeasurable
{}
{ one @r_c52_SYNTETHIC_BASE_FEATURE.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 881 }

sig c58_total_footprint
{ c58_total_footprint_ref : one Int }
{ one @r_c58_total_footprint.this
  this.@c58_total_footprint_ref = (((((((((((this.~@r_c58_total_footprint).@r_c4_HAVE_CRYPTO).@r_c2_footprint.@c2_footprint_ref).add[(((this.~@r_c58_total_footprint).@r_c10_HAVE_HASH).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c16_HAVE_QUEUE).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c22_HAVE_REPLICATION).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c28_HAVE_VERIFY).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c34_HAVE_SEQUENCE).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c40_HAVE_STATISTICS).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c46_DIAGNOSTIC).@r_c2_footprint.@c2_footprint_ref)]).add[(((this.~@r_c58_total_footprint).@r_c52_SYNTETHIC_BASE_FEATURE).@r_c2_footprint.@c2_footprint_ref)]) }

one sig c96_simpleConfig extends c3_BerkeleyDbC
{}
{ (((((some this.@r_c10_HAVE_HASH) && (no this.@r_c16_HAVE_QUEUE)) && (no this.@r_c22_HAVE_REPLICATION)) && (some this.@r_c28_HAVE_VERIFY)) && (no this.@r_c34_HAVE_SEQUENCE)) && (some this.@r_c40_HAVE_STATISTICS) }

objectives o_global {
minimize c96_simpleConfig.@r_c58_total_footprint.@c58_total_footprint_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 1024  + concrete_int_bag -> 1026  + concrete_int_bag -> 1027  + concrete_int_bag -> 1029  + concrete_int_bag -> 1030  + concrete_int_bag -> 1032  + concrete_int_bag -> 1034  + concrete_int_bag -> 1035  + concrete_int_bag -> 1036  + concrete_int_bag -> 955  + concrete_int_bag -> 1039  + concrete_int_bag -> 1040  + concrete_int_bag -> 1042  + concrete_int_bag -> 20  + concrete_int_bag -> 1045  + concrete_int_bag -> 1048  + concrete_int_bag -> 1052  + concrete_int_bag -> 1054  + concrete_int_bag -> 1055  + concrete_int_bag -> 1058  + concrete_int_bag -> 35  + concrete_int_bag -> 1060  + concrete_int_bag -> 38  + concrete_int_bag -> 1063  + concrete_int_bag -> 1064  + concrete_int_bag -> 1065  + concrete_int_bag -> 1068  + concrete_int_bag -> 45  + concrete_int_bag -> 1070  + concrete_int_bag -> 48  + concrete_int_bag -> 1073  + concrete_int_bag -> 1074  + concrete_int_bag -> 179  + concrete_int_bag -> 1076  + concrete_int_bag -> 53  + concrete_int_bag -> 1080  + concrete_int_bag -> 1083  + concrete_int_bag -> 1084  + concrete_int_bag -> 1086  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 1089  + concrete_int_bag -> 66  + concrete_int_bag -> 1092  + concrete_int_bag -> 69  + concrete_int_bag -> 1094  + concrete_int_bag -> 97  + concrete_int_bag -> 1096  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 1099  + concrete_int_bag -> 76  + concrete_int_bag -> 1101  + concrete_int_bag -> 1102  + concrete_int_bag -> 79  + concrete_int_bag -> 1104  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 84  + concrete_int_bag -> 1109  + concrete_int_bag -> 1111  + concrete_int_bag -> 1112  + concrete_int_bag -> 89  + concrete_int_bag -> 1114  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 1117  + concrete_int_bag -> 1118  + concrete_int_bag -> 1119  + concrete_int_bag -> 1120  + concrete_int_bag -> 1121  + concrete_int_bag -> 98  + concrete_int_bag -> 99  + concrete_int_bag -> 100  + concrete_int_bag -> 101  + concrete_int_bag -> 102  + concrete_int_bag -> 1127  + concrete_int_bag -> 1128  + concrete_int_bag -> 1129  + concrete_int_bag -> 1130  + concrete_int_bag -> 107  + concrete_int_bag -> 108  + concrete_int_bag -> 109  + concrete_int_bag -> 110  + concrete_int_bag -> 957  + concrete_int_bag -> 104  + concrete_int_bag -> 1138  + concrete_int_bag -> 1139  + concrete_int_bag -> 1140  + concrete_int_bag -> 117  + concrete_int_bag -> 118  + concrete_int_bag -> 1143  + concrete_int_bag -> 120  + concrete_int_bag -> 1145  + concrete_int_bag -> 1146  + concrete_int_bag -> 123  + concrete_int_bag -> 1148  + concrete_int_bag -> 125  + concrete_int_bag -> 1150  + concrete_int_bag -> 127  + concrete_int_bag -> 128  + concrete_int_bag -> 1153  + concrete_int_bag -> 130  + concrete_int_bag -> 1155  + concrete_int_bag -> 1156  + concrete_int_bag -> 133  + concrete_int_bag -> 1158  + concrete_int_bag -> 135  + concrete_int_bag -> 136  + concrete_int_bag -> 138  + concrete_int_bag -> 1163  + concrete_int_bag -> 1165  + concrete_int_bag -> 1166  + concrete_int_bag -> 143  + concrete_int_bag -> 1168  + concrete_int_bag -> 145  + concrete_int_bag -> 146  + concrete_int_bag -> 195  + concrete_int_bag -> 148  + concrete_int_bag -> 149  + concrete_int_bag -> 1174  + concrete_int_bag -> 1175  + concrete_int_bag -> 153  + concrete_int_bag -> 154  + concrete_int_bag -> 155  + concrete_int_bag -> 1181  + concrete_int_bag -> 158  + concrete_int_bag -> 159  + concrete_int_bag -> 1184  + concrete_int_bag -> 161  + concrete_int_bag -> 163  + concrete_int_bag -> 164  + concrete_int_bag -> 1137  + concrete_int_bag -> 1193  + concrete_int_bag -> 1194  + concrete_int_bag -> 171  + concrete_int_bag -> 173  + concrete_int_bag -> 174  + concrete_int_bag -> 1199  + concrete_int_bag -> 177  + concrete_int_bag -> 1202  + concrete_int_bag -> 1203  + concrete_int_bag -> 182  + concrete_int_bag -> 183  + concrete_int_bag -> 184  + concrete_int_bag -> 1209  + concrete_int_bag -> 187  + concrete_int_bag -> 1212  + concrete_int_bag -> 189  + concrete_int_bag -> 192  + concrete_int_bag -> 193  + concrete_int_bag -> 1219  + concrete_int_bag -> 1222  + concrete_int_bag -> 199  + concrete_int_bag -> 202  + concrete_int_bag -> 203  + concrete_int_bag -> 205  + concrete_int_bag -> 207  + concrete_int_bag -> 208  + concrete_int_bag -> 211  + concrete_int_bag -> 212  + concrete_int_bag -> 213  + concrete_int_bag -> 215  + concrete_int_bag -> 217  + concrete_int_bag -> 218  + concrete_int_bag -> 220  + concrete_int_bag -> 221  + concrete_int_bag -> 1014  + concrete_int_bag -> 1247  + concrete_int_bag -> 1147  + concrete_int_bag -> 228  + concrete_int_bag -> 230  + concrete_int_bag -> 231  + concrete_int_bag -> 233  + concrete_int_bag -> 236  + concrete_int_bag -> 237  + concrete_int_bag -> 238  + concrete_int_bag -> 1149  + concrete_int_bag -> 240  + concrete_int_bag -> 241  + concrete_int_bag -> 243  + concrete_int_bag -> 126  + concrete_int_bag -> 246  + concrete_int_bag -> 247  + concrete_int_bag -> 248  + concrete_int_bag -> 249  + concrete_int_bag -> 1237  + concrete_int_bag -> 256  + concrete_int_bag -> 257  + concrete_int_bag -> 258  + concrete_int_bag -> 259  + concrete_int_bag -> 262  + concrete_int_bag -> 129  + concrete_int_bag -> 264  + concrete_int_bag -> 265  + concrete_int_bag -> 266  + concrete_int_bag -> 267  + concrete_int_bag -> 94  + concrete_int_bag -> 269  + concrete_int_bag -> 272  + concrete_int_bag -> 274  + concrete_int_bag -> 275  + concrete_int_bag -> 277  + concrete_int_bag -> 282  + concrete_int_bag -> 284  + concrete_int_bag -> 285  + concrete_int_bag -> 287  + concrete_int_bag -> 1017  + concrete_int_bag -> 290  + concrete_int_bag -> 292  + concrete_int_bag -> 293  + concrete_int_bag -> 294  + concrete_int_bag -> 297  + concrete_int_bag -> 300  + concrete_int_bag -> 302  + concrete_int_bag -> 303  + concrete_int_bag -> 310  + concrete_int_bag -> 312  + concrete_int_bag -> 313  + concrete_int_bag -> 223  + concrete_int_bag -> 318  + concrete_int_bag -> 321  + concrete_int_bag -> 322  + concrete_int_bag -> 328  + concrete_int_bag -> 331  + concrete_int_bag -> 338  + concrete_int_bag -> 227  + concrete_int_bag -> 341  + concrete_int_bag -> 346  + concrete_int_bag -> 356  + concrete_int_bag -> 366  + concrete_int_bag -> 1171  + concrete_int_bag -> 268  + concrete_int_bag -> 891  + concrete_int_bag -> 1173  + concrete_int_bag -> 1088  + concrete_int_bag -> 901  + concrete_int_bag -> 119  + concrete_int_bag -> 906  + concrete_int_bag -> 151  + concrete_int_bag -> 909  + concrete_int_bag -> 916  + concrete_int_bag -> 919  + concrete_int_bag -> 239  + concrete_int_bag -> 1178  + concrete_int_bag -> 926  + concrete_int_bag -> 1093  + concrete_int_bag -> 929  + concrete_int_bag -> 1122  + concrete_int_bag -> 934  + concrete_int_bag -> 935  + concrete_int_bag -> 937  + concrete_int_bag -> 925  + concrete_int_bag -> 944  + concrete_int_bag -> 945  + concrete_int_bag -> 947  + concrete_int_bag -> 950  + concrete_int_bag -> 953  + concrete_int_bag -> 954  + concrete_int_bag -> 1183  + concrete_int_bag -> 1098  + concrete_int_bag -> 1044  + concrete_int_bag -> 960  + concrete_int_bag -> 962  + concrete_int_bag -> 963  + concrete_int_bag -> 965  + concrete_int_bag -> 167  + concrete_int_bag -> 970  + concrete_int_bag -> 972  + concrete_int_bag -> 973  + concrete_int_bag -> 975  + concrete_int_bag -> 978  + concrete_int_bag -> 979  + concrete_int_bag -> 980  + concrete_int_bag -> 981  + concrete_int_bag -> 982  + concrete_int_bag -> 983  + concrete_int_bag -> 985  + concrete_int_bag -> 988  + concrete_int_bag -> 989  + concrete_int_bag -> 990  + concrete_int_bag -> 991  + concrete_int_bag -> 1124  + concrete_int_bag -> 72  + concrete_int_bag -> 998  + concrete_int_bag -> 999  + concrete_int_bag -> 1000  + concrete_int_bag -> 1001  + concrete_int_bag -> 1191  + concrete_int_bag -> 1004  + concrete_int_bag -> 1006  + concrete_int_bag -> 1007  + concrete_int_bag -> 1008  + concrete_int_bag -> 1009  + concrete_int_bag -> 1010  + concrete_int_bag -> 1011  + concrete_int_bag -> 1227  + concrete_int_bag -> 1016  + concrete_int_bag -> 1108  + concrete_int_bag -> 1019  + concrete_int_bag -> 1020 
   , c4_HAVE_CRYPTO in partial_c4_HAVE_CRYPTO
   , c10_HAVE_HASH in partial_c10_HAVE_HASH
   , c16_HAVE_QUEUE in partial_c16_HAVE_QUEUE
   , c22_HAVE_REPLICATION in partial_c22_HAVE_REPLICATION
   , c28_HAVE_VERIFY in partial_c28_HAVE_VERIFY
   , c34_HAVE_SEQUENCE in partial_c34_HAVE_SEQUENCE
   , c40_HAVE_STATISTICS in partial_c40_HAVE_STATISTICS
   , c46_DIAGNOSTIC in partial_c46_DIAGNOSTIC
   , c52_SYNTETHIC_BASE_FEATURE in partial_c52_SYNTETHIC_BASE_FEATURE
    ,  c2_footprint in footprint_for_c4_HAVE_CRYPTO_of_10 + footprint_for_c10_HAVE_HASH_of_56 + footprint_for_c16_HAVE_QUEUE_of_28 + footprint_for_c22_HAVE_REPLICATION_of_44 + footprint_for_c28_HAVE_VERIFY_of_25 + footprint_for_c34_HAVE_SEQUENCE_of_10 + footprint_for_c40_HAVE_STATISTICS_of_139 + footprint_for_c46_DIAGNOSTIC_of_54 + footprint_for_c52_SYNTETHIC_BASE_FEATURE_of_881
    , r_c2_footprint in partial_c4_HAVE_CRYPTO->footprint_for_c4_HAVE_CRYPTO_of_10 + partial_c10_HAVE_HASH->footprint_for_c10_HAVE_HASH_of_56 + partial_c16_HAVE_QUEUE->footprint_for_c16_HAVE_QUEUE_of_28 + partial_c22_HAVE_REPLICATION->footprint_for_c22_HAVE_REPLICATION_of_44 + partial_c28_HAVE_VERIFY->footprint_for_c28_HAVE_VERIFY_of_25 + partial_c34_HAVE_SEQUENCE->footprint_for_c34_HAVE_SEQUENCE_of_10 + partial_c40_HAVE_STATISTICS->footprint_for_c40_HAVE_STATISTICS_of_139 + partial_c46_DIAGNOSTIC->footprint_for_c46_DIAGNOSTIC_of_54 + partial_c52_SYNTETHIC_BASE_FEATURE->footprint_for_c52_SYNTETHIC_BASE_FEATURE_of_881
    , c2_footprint_ref in footprint_for_c4_HAVE_CRYPTO_of_10-> 10 + footprint_for_c10_HAVE_HASH_of_56-> 56 + footprint_for_c16_HAVE_QUEUE_of_28-> 28 + footprint_for_c22_HAVE_REPLICATION_of_44-> 44 + footprint_for_c28_HAVE_VERIFY_of_25-> 25 + footprint_for_c34_HAVE_SEQUENCE_of_10-> 10 + footprint_for_c40_HAVE_STATISTICS_of_139-> 139 + footprint_for_c46_DIAGNOSTIC_of_54-> 54 + footprint_for_c52_SYNTETHIC_BASE_FEATURE_of_881-> 881
}
run show for partial_speedup optimize o_global
