/*
All clafers: 15 | Abstract: 3 | Concrete: 12 | References: 0
Constraints: 14
Goals: 3
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_performance : one c2_performance
, r_c3_cost : one c3_cost }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

sig c3_cost
{ c3_cost_ref : one Int }
{ one @r_c3_cost.this }

abstract sig c4_SecurityFeature extends c1_Feature
{ r_c5_security : one c5_security }

sig c5_security
{ c5_security_ref : one Int }
{ one @r_c5_security.this }

abstract sig c6_MobilePhone
{ r_c7_Connectivity : one c7_Connectivity
, r_c51_PasswordProtection : lone c51_PasswordProtection
, r_c67_total_performance : one c67_total_performance
, r_c74_total_cost : one c74_total_cost
, r_c81_total_security : one c81_total_security }
{ (this.@r_c67_total_performance.@c67_total_performance_ref) = (sum(c1_Feature.@r_c2_performance.@c2_performance_ref))
  (this.@r_c74_total_cost.@c74_total_cost_ref) = (sum(c1_Feature.@r_c3_cost.@c3_cost_ref))
  (this.@r_c81_total_security.@c81_total_security_ref) = (sum(c4_SecurityFeature.@r_c5_security.@c5_security_ref)) }

sig c7_Connectivity extends c1_Feature
{ r_c18_Bluetooth : lone c18_Bluetooth
, r_c29_USB : lone c29_USB
, r_c40_Wifi : lone c40_Wifi }
{ one @r_c7_Connectivity.this
  let children = (r_c18_Bluetooth + r_c29_USB + r_c40_Wifi) | one children
  (this.@r_c2_performance.@c2_performance_ref) = 0
  (this.@r_c3_cost.@c3_cost_ref) = 0 }

sig c18_Bluetooth extends c1_Feature
{}
{ one @r_c18_Bluetooth.this
  (this.@r_c2_performance.@c2_performance_ref) = 300
  (this.@r_c3_cost.@c3_cost_ref) = 150 }

sig c29_USB extends c1_Feature
{}
{ one @r_c29_USB.this
  (this.@r_c2_performance.@c2_performance_ref) = 500
  (this.@r_c3_cost.@c3_cost_ref) = 35 }

sig c40_Wifi extends c1_Feature
{}
{ one @r_c40_Wifi.this
  (this.@r_c2_performance.@c2_performance_ref) = 725
  (this.@r_c3_cost.@c3_cost_ref) = 85 }

sig c51_PasswordProtection extends c4_SecurityFeature
{}
{ one @r_c51_PasswordProtection.this
  (this.@r_c5_security.@c5_security_ref) = 1
  (this.@r_c2_performance.@c2_performance_ref) = 20
  (this.@r_c3_cost.@c3_cost_ref) = 10 }

sig c67_total_performance
{ c67_total_performance_ref : one Int }
{ one @r_c67_total_performance.this }

sig c74_total_cost
{ c74_total_cost_ref : one Int }
{ one @r_c74_total_cost.this }

sig c81_total_security
{ c81_total_security_ref : one Int }
{ one @r_c81_total_security.this }

one sig c88_MyPhone extends c6_MobilePhone
{}

objectives o_global {
maximize c88_MyPhone.@r_c67_total_performance.@c67_total_performance_ref ,
minimize c88_MyPhone.@r_c74_total_cost.@c74_total_cost_ref ,
maximize c88_MyPhone.@r_c81_total_security.@c81_total_security_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 11  + concrete_int_bag -> 21  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 36  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 86  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 105  + concrete_int_bag -> 106  + concrete_int_bag -> 115  + concrete_int_bag -> 116  + concrete_int_bag -> 120  + concrete_int_bag -> 121  + concrete_int_bag -> 130  + concrete_int_bag -> 131  + concrete_int_bag -> 140  + concrete_int_bag -> 141  + concrete_int_bag -> 151  + concrete_int_bag -> 160  + concrete_int_bag -> 161  + concrete_int_bag -> 170  + concrete_int_bag -> 171  + concrete_int_bag -> 180  + concrete_int_bag -> 181  + concrete_int_bag -> 185  + concrete_int_bag -> 186  + concrete_int_bag -> 195  + concrete_int_bag -> 196  + concrete_int_bag -> 205  + concrete_int_bag -> 206  + concrete_int_bag -> 215  + concrete_int_bag -> 216  + concrete_int_bag -> 235  + concrete_int_bag -> 236  + concrete_int_bag -> 245  + concrete_int_bag -> 246  + concrete_int_bag -> 255  + concrete_int_bag -> 256  + concrete_int_bag -> 265  + concrete_int_bag -> 266  + concrete_int_bag -> 270  + concrete_int_bag -> 271  + concrete_int_bag -> 280  + concrete_int_bag -> 281  + concrete_int_bag -> 290  + concrete_int_bag -> 291  + concrete_int_bag -> 301  + concrete_int_bag -> 310  + concrete_int_bag -> 311  + concrete_int_bag -> 320  + concrete_int_bag -> 321  + concrete_int_bag -> 330  + concrete_int_bag -> 331  + concrete_int_bag -> 335  + concrete_int_bag -> 336  + concrete_int_bag -> 345  + concrete_int_bag -> 346  + concrete_int_bag -> 355  + concrete_int_bag -> 356  + concrete_int_bag -> 365  + concrete_int_bag -> 366  + concrete_int_bag -> 385  + concrete_int_bag -> 386  + concrete_int_bag -> 395  + concrete_int_bag -> 396  + concrete_int_bag -> 405  + concrete_int_bag -> 406  + concrete_int_bag -> 415  + concrete_int_bag -> 416  + concrete_int_bag -> 420  + concrete_int_bag -> 421  + concrete_int_bag -> 430  + concrete_int_bag -> 431  + concrete_int_bag -> 440  + concrete_int_bag -> 441  + concrete_int_bag -> 450  + concrete_int_bag -> 451  + concrete_int_bag -> 460  + concrete_int_bag -> 461  + concrete_int_bag -> 470  + concrete_int_bag -> 471  + concrete_int_bag -> 480  + concrete_int_bag -> 481  + concrete_int_bag -> 485  + concrete_int_bag -> 486  + concrete_int_bag -> 495  + concrete_int_bag -> 496  + concrete_int_bag -> 501  + concrete_int_bag -> 505  + concrete_int_bag -> 506  + concrete_int_bag -> 510  + concrete_int_bag -> 511  + concrete_int_bag -> 515  + concrete_int_bag -> 516  + concrete_int_bag -> 520  + concrete_int_bag -> 521  + concrete_int_bag -> 530  + concrete_int_bag -> 531  + concrete_int_bag -> 535  + concrete_int_bag -> 536  + concrete_int_bag -> 545  + concrete_int_bag -> 546  + concrete_int_bag -> 555  + concrete_int_bag -> 556  + concrete_int_bag -> 565  + concrete_int_bag -> 566  + concrete_int_bag -> 570  + concrete_int_bag -> 571  + concrete_int_bag -> 580  + concrete_int_bag -> 581  + concrete_int_bag -> 585  + concrete_int_bag -> 586  + concrete_int_bag -> 590  + concrete_int_bag -> 591  + concrete_int_bag -> 595  + concrete_int_bag -> 596  + concrete_int_bag -> 600  + concrete_int_bag -> 601  + concrete_int_bag -> 605  + concrete_int_bag -> 606  + concrete_int_bag -> 615  + concrete_int_bag -> 616  + concrete_int_bag -> 620  + concrete_int_bag -> 621  + concrete_int_bag -> 630  + concrete_int_bag -> 631  + concrete_int_bag -> 640  + concrete_int_bag -> 641  + concrete_int_bag -> 650  + concrete_int_bag -> 651  + concrete_int_bag -> 660  + concrete_int_bag -> 661  + concrete_int_bag -> 670  + concrete_int_bag -> 671  + concrete_int_bag -> 680  + concrete_int_bag -> 681  + concrete_int_bag -> 685  + concrete_int_bag -> 686  + concrete_int_bag -> 695  + concrete_int_bag -> 696  + concrete_int_bag -> 705  + concrete_int_bag -> 706  + concrete_int_bag -> 715  + concrete_int_bag -> 716  + concrete_int_bag -> 726  + concrete_int_bag -> 735  + concrete_int_bag -> 736  + concrete_int_bag -> 745  + concrete_int_bag -> 746  + concrete_int_bag -> 755  + concrete_int_bag -> 756  + concrete_int_bag -> 760  + concrete_int_bag -> 761  + concrete_int_bag -> 765  + concrete_int_bag -> 766  + concrete_int_bag -> 770  + concrete_int_bag -> 771  + concrete_int_bag -> 780  + concrete_int_bag -> 781  + concrete_int_bag -> 790  + concrete_int_bag -> 791  + concrete_int_bag -> 800  + concrete_int_bag -> 801  + concrete_int_bag -> 810  + concrete_int_bag -> 811  + concrete_int_bag -> 820  + concrete_int_bag -> 821  + concrete_int_bag -> 830  + concrete_int_bag -> 831  + concrete_int_bag -> 835  + concrete_int_bag -> 836  + concrete_int_bag -> 840  + concrete_int_bag -> 841  + concrete_int_bag -> 845  + concrete_int_bag -> 846  + concrete_int_bag -> 855  + concrete_int_bag -> 856  + concrete_int_bag -> 865  + concrete_int_bag -> 866  + concrete_int_bag -> 875  + concrete_int_bag -> 876  + concrete_int_bag -> 885  + concrete_int_bag -> 886  + concrete_int_bag -> 895  + concrete_int_bag -> 896  + concrete_int_bag -> 905  + concrete_int_bag -> 906  + concrete_int_bag -> 910  + concrete_int_bag -> 911  + concrete_int_bag -> 915  + concrete_int_bag -> 916  + concrete_int_bag -> 920  + concrete_int_bag -> 921  + concrete_int_bag -> 930  + concrete_int_bag -> 931  + concrete_int_bag -> 940  + concrete_int_bag -> 941  + concrete_int_bag -> 950  + concrete_int_bag -> 951  + concrete_int_bag -> 960  + concrete_int_bag -> 961  + concrete_int_bag -> 970  + concrete_int_bag -> 971  + concrete_int_bag -> 980  + concrete_int_bag -> 981  + concrete_int_bag -> 985  + concrete_int_bag -> 986  + concrete_int_bag -> 990  + concrete_int_bag -> 991  + concrete_int_bag -> 995  + concrete_int_bag -> 996  + concrete_int_bag -> 1005  + concrete_int_bag -> 1006  + concrete_int_bag -> 1015  + concrete_int_bag -> 1016  + concrete_int_bag -> 1025  + concrete_int_bag -> 1026  + concrete_int_bag -> 1035  + concrete_int_bag -> 1036  + concrete_int_bag -> 1045  + concrete_int_bag -> 1046  + concrete_int_bag -> 1055  + concrete_int_bag -> 1056  + concrete_int_bag -> 1060  + concrete_int_bag -> 1061  + concrete_int_bag -> 1065  + concrete_int_bag -> 1066  + concrete_int_bag -> 1070  + concrete_int_bag -> 1071  + concrete_int_bag -> 1080  + concrete_int_bag -> 1081  + concrete_int_bag -> 1090  + concrete_int_bag -> 1091  + concrete_int_bag -> 1100  + concrete_int_bag -> 1101  + concrete_int_bag -> 1110  + concrete_int_bag -> 1111  + concrete_int_bag -> 1120  + concrete_int_bag -> 1121  + concrete_int_bag -> 1130  + concrete_int_bag -> 1131  + concrete_int_bag -> 1140  + concrete_int_bag -> 1141  + concrete_int_bag -> 1145  + concrete_int_bag -> 1146  + concrete_int_bag -> 1155  + concrete_int_bag -> 1156  + concrete_int_bag -> 1165  + concrete_int_bag -> 1166  + concrete_int_bag -> 1175  + concrete_int_bag -> 1176  + concrete_int_bag -> 1185  + concrete_int_bag -> 1186  + concrete_int_bag -> 1195  + concrete_int_bag -> 1196  + concrete_int_bag -> 1205  + concrete_int_bag -> 1206  + concrete_int_bag -> 1210  + concrete_int_bag -> 1211  + concrete_int_bag -> 1220  + concrete_int_bag -> 1221  + concrete_int_bag -> 1225  + concrete_int_bag -> 1226  + concrete_int_bag -> 1230  + concrete_int_bag -> 1231  + concrete_int_bag -> 1235  + concrete_int_bag -> 1236  + concrete_int_bag -> 1240  + concrete_int_bag -> 1241  + concrete_int_bag -> 1245  + concrete_int_bag -> 1246  + concrete_int_bag -> 1255  + concrete_int_bag -> 1256  + concrete_int_bag -> 1260  + concrete_int_bag -> 1261  + concrete_int_bag -> 1270  + concrete_int_bag -> 1271  + concrete_int_bag -> 1280  + concrete_int_bag -> 1281  + concrete_int_bag -> 1290  + concrete_int_bag -> 1291  + concrete_int_bag -> 1295  + concrete_int_bag -> 1296  + concrete_int_bag -> 1305  + concrete_int_bag -> 1306  + concrete_int_bag -> 1310  + concrete_int_bag -> 1311  + concrete_int_bag -> 1315  + concrete_int_bag -> 1316  + concrete_int_bag -> 1320  + concrete_int_bag -> 1321  + concrete_int_bag -> 1325  + concrete_int_bag -> 1326  + concrete_int_bag -> 1330  + concrete_int_bag -> 1331  + concrete_int_bag -> 1340  + concrete_int_bag -> 1341  + concrete_int_bag -> 1345  + concrete_int_bag -> 1346  + concrete_int_bag -> 1355  + concrete_int_bag -> 1356  + concrete_int_bag -> 1365  + concrete_int_bag -> 1366  + concrete_int_bag -> 1375  + concrete_int_bag -> 1376  + concrete_int_bag -> 1385  + concrete_int_bag -> 1386  + concrete_int_bag -> 1395  + concrete_int_bag -> 1396  + concrete_int_bag -> 1405  + concrete_int_bag -> 1406  + concrete_int_bag -> 1410  + concrete_int_bag -> 1411  + concrete_int_bag -> 1420  + concrete_int_bag -> 1421  + concrete_int_bag -> 1430  + concrete_int_bag -> 1431  + concrete_int_bag -> 1440  + concrete_int_bag -> 1441  + concrete_int_bag -> 1460  + concrete_int_bag -> 1461  + concrete_int_bag -> 1470  + concrete_int_bag -> 1471  + concrete_int_bag -> 1480  + concrete_int_bag -> 1481  + concrete_int_bag -> 1490  + concrete_int_bag -> 1491  + concrete_int_bag -> 1495  + concrete_int_bag -> 1496  + concrete_int_bag -> 1505  + concrete_int_bag -> 1506  + concrete_int_bag -> 1515  + concrete_int_bag -> 1516  + concrete_int_bag -> 1525  + concrete_int_bag -> 1526  + concrete_int_bag -> 1535  + concrete_int_bag -> 1536  + concrete_int_bag -> 1545  + concrete_int_bag -> 1546  + concrete_int_bag -> 1555  + concrete_int_bag -> 1556  + concrete_int_bag -> 1560  + concrete_int_bag -> 1561  + concrete_int_bag -> 1570  + concrete_int_bag -> 1571  + concrete_int_bag -> 1580  + concrete_int_bag -> 1581  + concrete_int_bag -> 1590  + concrete_int_bag -> 1591  + concrete_int_bag -> 1610  + concrete_int_bag -> 1611  + concrete_int_bag -> 1620  + concrete_int_bag -> 1621  + concrete_int_bag -> 1630  + concrete_int_bag -> 1631  + concrete_int_bag -> 1640  + concrete_int_bag -> 1641  + concrete_int_bag -> 1645  + concrete_int_bag -> 1646  + concrete_int_bag -> 1655  + concrete_int_bag -> 1656  + concrete_int_bag -> 1665  + concrete_int_bag -> 1666  + concrete_int_bag -> 1675  + concrete_int_bag -> 1676  + concrete_int_bag -> 1685  + concrete_int_bag -> 1686  + concrete_int_bag -> 1695  + concrete_int_bag -> 1696  + concrete_int_bag -> 1705  + concrete_int_bag -> 1706  + concrete_int_bag -> 1710  + concrete_int_bag -> 1711  + concrete_int_bag -> 1720  + concrete_int_bag -> 1721  + concrete_int_bag -> 1730  + concrete_int_bag -> 1731  + concrete_int_bag -> 1740  + concrete_int_bag -> 1741  + concrete_int_bag -> 1760  + concrete_int_bag -> 1761  + concrete_int_bag -> 1770  + concrete_int_bag -> 1771  + concrete_int_bag -> 1780  + concrete_int_bag -> 1781  + concrete_int_bag -> 1790  + concrete_int_bag -> 1791  + concrete_int_bag -> 1795  + concrete_int_bag -> 1796  + concrete_int_bag -> 1805  + concrete_int_bag -> 1806  + concrete_int_bag -> 1815  + concrete_int_bag -> 1816  + concrete_int_bag -> 1825  + concrete_int_bag -> 1826 
   , c7_Connectivity in partial_c7_Connectivity
   , c18_Bluetooth in partial_c18_Bluetooth
   , c29_USB in partial_c29_USB
   , c40_Wifi in partial_c40_Wifi
   , c51_PasswordProtection in partial_c51_PasswordProtection
    ,  c2_performance in performance_for_c7_Connectivity_of_0 + performance_for_c18_Bluetooth_of_300 + performance_for_c29_USB_of_500 + performance_for_c40_Wifi_of_725 + performance_for_c51_PasswordProtection_of_20
    ,  c3_cost in cost_for_c7_Connectivity_of_0 + cost_for_c18_Bluetooth_of_150 + cost_for_c29_USB_of_35 + cost_for_c40_Wifi_of_85 + cost_for_c51_PasswordProtection_of_10
    ,  c5_security in security_for_c51_PasswordProtection_of_1
    , r_c2_performance in partial_c7_Connectivity->performance_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->performance_for_c18_Bluetooth_of_300 + partial_c29_USB->performance_for_c29_USB_of_500 + partial_c40_Wifi->performance_for_c40_Wifi_of_725 + partial_c51_PasswordProtection->performance_for_c51_PasswordProtection_of_20
    , r_c3_cost in partial_c7_Connectivity->cost_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->cost_for_c18_Bluetooth_of_150 + partial_c29_USB->cost_for_c29_USB_of_35 + partial_c40_Wifi->cost_for_c40_Wifi_of_85 + partial_c51_PasswordProtection->cost_for_c51_PasswordProtection_of_10
    , r_c5_security in partial_c51_PasswordProtection->security_for_c51_PasswordProtection_of_1
    , c2_performance_ref in performance_for_c7_Connectivity_of_0-> 0 + performance_for_c18_Bluetooth_of_300-> 300 + performance_for_c29_USB_of_500-> 500 + performance_for_c40_Wifi_of_725-> 725 + performance_for_c51_PasswordProtection_of_20-> 20
    , c3_cost_ref in cost_for_c7_Connectivity_of_0-> 0 + cost_for_c18_Bluetooth_of_150-> 150 + cost_for_c29_USB_of_35-> 35 + cost_for_c40_Wifi_of_85-> 85 + cost_for_c51_PasswordProtection_of_10-> 10
    , c5_security_ref in security_for_c51_PasswordProtection_of_1-> 1
}
run show for partial_speedup optimize o_global
