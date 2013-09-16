/*
All clafers: 15 | Abstract: 3 | Concrete: 12 | References: 0
Constraints: 14
Goals: 2
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
, r_c51_PasswordProtection : one c51_PasswordProtection
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
  (this.@r_c2_performance.@c2_performance_ref) = 3
  (this.@r_c3_cost.@c3_cost_ref) = 1 }

sig c29_USB extends c1_Feature
{}
{ one @r_c29_USB.this
  (this.@r_c2_performance.@c2_performance_ref) = 5
  (this.@r_c3_cost.@c3_cost_ref) = 3 }

sig c40_Wifi extends c1_Feature
{}
{ one @r_c40_Wifi.this
  (this.@r_c2_performance.@c2_performance_ref) = 7
  (this.@r_c3_cost.@c3_cost_ref) = 5 }

sig c51_PasswordProtection extends c4_SecurityFeature
{}
{ one @r_c51_PasswordProtection.this
  (this.@r_c5_security.@c5_security_ref) = 1
  (this.@r_c2_performance.@c2_performance_ref) = 1
  (this.@r_c3_cost.@c3_cost_ref) = 1 }

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
minimize c88_MyPhone.@r_c74_total_cost.@c74_total_cost_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 2  + concrete_int_bag -> 4  + concrete_int_bag -> 6  + concrete_int_bag -> 8  + concrete_int_bag -> 9  + concrete_int_bag -> 10  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 15  + concrete_int_bag -> 16  + concrete_int_bag -> 17  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 22  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27 
   , c7_Connectivity in partial_c7_Connectivity
   , c18_Bluetooth in partial_c18_Bluetooth
   , c29_USB in partial_c29_USB
   , c40_Wifi in partial_c40_Wifi
   , c51_PasswordProtection in partial_c51_PasswordProtection
    ,  c2_performance in performance_for_c7_Connectivity_of_0 + performance_for_c18_Bluetooth_of_3 + performance_for_c29_USB_of_5 + performance_for_c40_Wifi_of_7 + performance_for_c51_PasswordProtection_of_1
    ,  c3_cost in cost_for_c7_Connectivity_of_0 + cost_for_c18_Bluetooth_of_1 + cost_for_c29_USB_of_3 + cost_for_c40_Wifi_of_5 + cost_for_c51_PasswordProtection_of_1
    ,  c5_security in security_for_c51_PasswordProtection_of_1
    , r_c2_performance in partial_c7_Connectivity->performance_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->performance_for_c18_Bluetooth_of_3 + partial_c29_USB->performance_for_c29_USB_of_5 + partial_c40_Wifi->performance_for_c40_Wifi_of_7 + partial_c51_PasswordProtection->performance_for_c51_PasswordProtection_of_1
    , r_c3_cost in partial_c7_Connectivity->cost_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->cost_for_c18_Bluetooth_of_1 + partial_c29_USB->cost_for_c29_USB_of_3 + partial_c40_Wifi->cost_for_c40_Wifi_of_5 + partial_c51_PasswordProtection->cost_for_c51_PasswordProtection_of_1
    , r_c5_security in partial_c51_PasswordProtection->security_for_c51_PasswordProtection_of_1
    , c2_performance_ref in performance_for_c7_Connectivity_of_0-> 0 + performance_for_c18_Bluetooth_of_3-> 3 + performance_for_c29_USB_of_5-> 5 + performance_for_c40_Wifi_of_7-> 7 + performance_for_c51_PasswordProtection_of_1-> 1
    , c3_cost_ref in cost_for_c7_Connectivity_of_0-> 0 + cost_for_c18_Bluetooth_of_1-> 1 + cost_for_c29_USB_of_3-> 3 + cost_for_c40_Wifi_of_5-> 5 + cost_for_c51_PasswordProtection_of_1-> 1
    , c5_security_ref in security_for_c51_PasswordProtection_of_1-> 1
}
run show for partial_speedup optimize o_global
