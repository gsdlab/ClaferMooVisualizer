/*
All clafers: 16 | Abstract: 3 | Concrete: 13 | References: 0
Constraints: 18
Goals: 3
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_performance : one c2_performance
, r_c3_energy : one c3_energy }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

sig c3_energy
{ c3_energy_ref : one Int }
{ one @r_c3_energy.this }

abstract sig c4_SecurityFeature extends c1_Feature
{ r_c5_security : one c5_security }

sig c5_security
{ c5_security_ref : one Int }
{ one @r_c5_security.this }

abstract sig c6_MobilePhone
{ r_c7_Connectivity : one c7_Connectivity
, r_c51_PasswordProtection : lone c51_PasswordProtection
, r_c67_FingerprintProtection : lone c67_FingerprintProtection
, r_c83_total_performance : one c83_total_performance
, r_c109_total_energy : one c109_total_energy
, r_c135_total_security : one c135_total_security }
{ (this.@r_c83_total_performance.@c83_total_performance_ref) = (((((((this.@r_c7_Connectivity).@r_c2_performance.@c2_performance_ref).add[(((this.@r_c7_Connectivity).@r_c18_Bluetooth).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c7_Connectivity).@r_c29_USB).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c7_Connectivity).@r_c40_Wifi).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c51_PasswordProtection).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c67_FingerprintProtection).@r_c2_performance.@c2_performance_ref)])
  (this.@r_c109_total_energy.@c109_total_energy_ref) = (((((((this.@r_c7_Connectivity).@r_c3_energy.@c3_energy_ref).add[(((this.@r_c7_Connectivity).@r_c18_Bluetooth).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c7_Connectivity).@r_c29_USB).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c7_Connectivity).@r_c40_Wifi).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c51_PasswordProtection).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c67_FingerprintProtection).@r_c3_energy.@c3_energy_ref)])
  (this.@r_c135_total_security.@c135_total_security_ref) = (((this.@r_c51_PasswordProtection).@r_c5_security.@c5_security_ref).add[((this.@r_c67_FingerprintProtection).@r_c5_security.@c5_security_ref)]) }

sig c7_Connectivity extends c1_Feature
{ r_c18_Bluetooth : lone c18_Bluetooth
, r_c29_USB : lone c29_USB
, r_c40_Wifi : lone c40_Wifi }
{ one @r_c7_Connectivity.this
  let children = (r_c18_Bluetooth + r_c29_USB + r_c40_Wifi) | some children
  (this.@r_c2_performance.@c2_performance_ref) = 0
  (this.@r_c3_energy.@c3_energy_ref) = 0 }

sig c18_Bluetooth extends c1_Feature
{}
{ one @r_c18_Bluetooth.this
  (this.@r_c2_performance.@c2_performance_ref) = 9
  (this.@r_c3_energy.@c3_energy_ref) = 10 }

sig c29_USB extends c1_Feature
{}
{ one @r_c29_USB.this
  (this.@r_c2_performance.@c2_performance_ref) = 15
  (this.@r_c3_energy.@c3_energy_ref) = 7 }

sig c40_Wifi extends c1_Feature
{}
{ one @r_c40_Wifi.this
  (this.@r_c2_performance.@c2_performance_ref) = 22
  (this.@r_c3_energy.@c3_energy_ref) = 17 }

sig c51_PasswordProtection extends c4_SecurityFeature
{}
{ one @r_c51_PasswordProtection.this
  (this.@r_c5_security.@c5_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 1
  (this.@r_c3_energy.@c3_energy_ref) = 2 }

sig c67_FingerprintProtection extends c4_SecurityFeature
{}
{ one @r_c67_FingerprintProtection.this
  (this.@r_c5_security.@c5_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 2
  (this.@r_c3_energy.@c3_energy_ref) = 4 }

sig c83_total_performance
{ c83_total_performance_ref : one Int }
{ one @r_c83_total_performance.this }

sig c109_total_energy
{ c109_total_energy_ref : one Int }
{ one @r_c109_total_energy.this }

sig c135_total_security
{ c135_total_security_ref : one Int }
{ one @r_c135_total_security.this }

one sig c145_MyPhone extends c6_MobilePhone
{}
{ (some (this.@r_c7_Connectivity).@r_c18_Bluetooth) && (no (this.@r_c7_Connectivity).@r_c29_USB) }

objectives o_global {
minimize c145_MyPhone.@r_c109_total_energy.@c109_total_energy_ref ,
maximize c145_MyPhone.@r_c83_total_performance.@c83_total_performance_ref ,
maximize c145_MyPhone.@r_c135_total_security.@c135_total_security_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 3  + concrete_int_bag -> 6  + concrete_int_bag -> 8  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 16  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> 48  + concrete_int_bag -> 49  + concrete_int_bag -> 50  + concrete_int_bag -> 51  + concrete_int_bag -> 52  + concrete_int_bag -> 53  + concrete_int_bag -> 54  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 57  + concrete_int_bag -> 58  + concrete_int_bag -> 59  + concrete_int_bag -> 60  + concrete_int_bag -> 61  + concrete_int_bag -> 62  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 67  + concrete_int_bag -> 68  + concrete_int_bag -> 69  + concrete_int_bag -> 70  + concrete_int_bag -> 71  + concrete_int_bag -> 72  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 76  + concrete_int_bag -> 77  + concrete_int_bag -> 78  + concrete_int_bag -> 79  + concrete_int_bag -> 80  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 83  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 86  + concrete_int_bag -> 87  + concrete_int_bag -> 88  + concrete_int_bag -> 89  + concrete_int_bag -> 90  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 93  + concrete_int_bag -> 94  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 97  + concrete_int_bag -> 98  + concrete_int_bag -> 99 
   , c7_Connectivity in partial_c7_Connectivity
   , c18_Bluetooth in partial_c18_Bluetooth
   , c29_USB in partial_c29_USB
   , c40_Wifi in partial_c40_Wifi
   , c51_PasswordProtection in partial_c51_PasswordProtection
   , c67_FingerprintProtection in partial_c67_FingerprintProtection
    ,  c2_performance in performance_for_c7_Connectivity_of_0 + performance_for_c18_Bluetooth_of_9 + performance_for_c29_USB_of_15 + performance_for_c40_Wifi_of_22 + performance_for_c51_PasswordProtection_of_1 + performance_for_c67_FingerprintProtection_of_2
    ,  c3_energy in energy_for_c7_Connectivity_of_0 + energy_for_c18_Bluetooth_of_10 + energy_for_c29_USB_of_7 + energy_for_c40_Wifi_of_17 + energy_for_c51_PasswordProtection_of_2 + energy_for_c67_FingerprintProtection_of_4
    ,  c5_security in security_for_c51_PasswordProtection_of_5 + security_for_c67_FingerprintProtection_of_5
    , r_c2_performance in partial_c7_Connectivity->performance_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->performance_for_c18_Bluetooth_of_9 + partial_c29_USB->performance_for_c29_USB_of_15 + partial_c40_Wifi->performance_for_c40_Wifi_of_22 + partial_c51_PasswordProtection->performance_for_c51_PasswordProtection_of_1 + partial_c67_FingerprintProtection->performance_for_c67_FingerprintProtection_of_2
    , r_c3_energy in partial_c7_Connectivity->energy_for_c7_Connectivity_of_0 + partial_c18_Bluetooth->energy_for_c18_Bluetooth_of_10 + partial_c29_USB->energy_for_c29_USB_of_7 + partial_c40_Wifi->energy_for_c40_Wifi_of_17 + partial_c51_PasswordProtection->energy_for_c51_PasswordProtection_of_2 + partial_c67_FingerprintProtection->energy_for_c67_FingerprintProtection_of_4
    , r_c5_security in partial_c51_PasswordProtection->security_for_c51_PasswordProtection_of_5 + partial_c67_FingerprintProtection->security_for_c67_FingerprintProtection_of_5
    , c2_performance_ref in performance_for_c7_Connectivity_of_0-> 0 + performance_for_c18_Bluetooth_of_9-> 9 + performance_for_c29_USB_of_15-> 15 + performance_for_c40_Wifi_of_22-> 22 + performance_for_c51_PasswordProtection_of_1-> 1 + performance_for_c67_FingerprintProtection_of_2-> 2
    , c3_energy_ref in energy_for_c7_Connectivity_of_0-> 0 + energy_for_c18_Bluetooth_of_10-> 10 + energy_for_c29_USB_of_7-> 7 + energy_for_c40_Wifi_of_17-> 17 + energy_for_c51_PasswordProtection_of_2-> 2 + energy_for_c67_FingerprintProtection_of_4-> 4
    , c5_security_ref in security_for_c51_PasswordProtection_of_5-> 5 + security_for_c67_FingerprintProtection_of_5-> 5
}
run show for partial_speedup optimize o_global
