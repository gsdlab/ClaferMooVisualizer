/*
All clafers: 18 | Abstract: 3 | Concrete: 15 | References: 0
Constraints: 24
Goals: 4
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_performance : one c2_performance
, r_c3_energy : one c3_energy
, r_c4_mass : one c4_mass }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

sig c3_energy
{ c3_energy_ref : one Int }
{ one @r_c3_energy.this }

sig c4_mass
{ c4_mass_ref : one Int }
{ one @r_c4_mass.this }

abstract sig c5_SecurityFeature extends c1_Feature
{ r_c6_security : one c6_security }

sig c6_security
{ c6_security_ref : one Int }
{ one @r_c6_security.this }

abstract sig c7_MobilePhone
{ r_c8_Connectivity : one c8_Connectivity
, r_c72_PasswordProtection : lone c72_PasswordProtection
, r_c93_FingerprintProtection : lone c93_FingerprintProtection
, r_c114_total_performance : one c114_total_performance
, r_c140_total_energy : one c140_total_energy
, r_c166_total_security : one c166_total_security
, r_c176_total_mass : one c176_total_mass }
{ (this.@r_c114_total_performance.@c114_total_performance_ref) = (((((((this.@r_c8_Connectivity).@r_c2_performance.@c2_performance_ref).add[(((this.@r_c8_Connectivity).@r_c24_Bluetooth).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c8_Connectivity).@r_c40_USB).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c8_Connectivity).@r_c56_Wifi).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c72_PasswordProtection).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c93_FingerprintProtection).@r_c2_performance.@c2_performance_ref)])
  (this.@r_c140_total_energy.@c140_total_energy_ref) = (((((((this.@r_c8_Connectivity).@r_c3_energy.@c3_energy_ref).add[(((this.@r_c8_Connectivity).@r_c24_Bluetooth).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c8_Connectivity).@r_c40_USB).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c8_Connectivity).@r_c56_Wifi).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c72_PasswordProtection).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c93_FingerprintProtection).@r_c3_energy.@c3_energy_ref)])
  (this.@r_c166_total_security.@c166_total_security_ref) = (((this.@r_c72_PasswordProtection).@r_c6_security.@c6_security_ref).add[((this.@r_c93_FingerprintProtection).@r_c6_security.@c6_security_ref)])
  (this.@r_c176_total_mass.@c176_total_mass_ref) = (((this.@r_c72_PasswordProtection).@r_c4_mass.@c4_mass_ref).add[((this.@r_c93_FingerprintProtection).@r_c4_mass.@c4_mass_ref)]) }

sig c8_Connectivity extends c1_Feature
{ r_c24_Bluetooth : lone c24_Bluetooth
, r_c40_USB : lone c40_USB
, r_c56_Wifi : lone c56_Wifi }
{ one @r_c8_Connectivity.this
  let children = (r_c24_Bluetooth + r_c40_USB + r_c56_Wifi) | some children
  (this.@r_c2_performance.@c2_performance_ref) = 0
  (this.@r_c3_energy.@c3_energy_ref) = 0
  (this.@r_c4_mass.@c4_mass_ref) = 0 }

sig c24_Bluetooth extends c1_Feature
{}
{ one @r_c24_Bluetooth.this
  (this.@r_c2_performance.@c2_performance_ref) = 9
  (this.@r_c3_energy.@c3_energy_ref) = 10
  (this.@r_c4_mass.@c4_mass_ref) = 2 }

sig c40_USB extends c1_Feature
{}
{ one @r_c40_USB.this
  (this.@r_c2_performance.@c2_performance_ref) = 15
  (this.@r_c3_energy.@c3_energy_ref) = 7
  (this.@r_c4_mass.@c4_mass_ref) = 1 }

sig c56_Wifi extends c1_Feature
{}
{ one @r_c56_Wifi.this
  (this.@r_c2_performance.@c2_performance_ref) = 22
  (this.@r_c3_energy.@c3_energy_ref) = 17
  (this.@r_c4_mass.@c4_mass_ref) = 6 }

sig c72_PasswordProtection extends c5_SecurityFeature
{}
{ one @r_c72_PasswordProtection.this
  (this.@r_c6_security.@c6_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 1
  (this.@r_c3_energy.@c3_energy_ref) = 2
  (this.@r_c4_mass.@c4_mass_ref) = 0 }

sig c93_FingerprintProtection extends c5_SecurityFeature
{}
{ one @r_c93_FingerprintProtection.this
  (this.@r_c4_mass.@c4_mass_ref) = 0
  (this.@r_c6_security.@c6_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 2
  (this.@r_c3_energy.@c3_energy_ref) = 4 }

sig c114_total_performance
{ c114_total_performance_ref : one Int }
{ one @r_c114_total_performance.this }

sig c140_total_energy
{ c140_total_energy_ref : one Int }
{ one @r_c140_total_energy.this }

sig c166_total_security
{ c166_total_security_ref : one Int }
{ one @r_c166_total_security.this }

sig c176_total_mass
{ c176_total_mass_ref : one Int }
{ one @r_c176_total_mass.this }

one sig c186_MyPhone extends c7_MobilePhone
{}

objectives o_global {
minimize c186_MyPhone.@r_c140_total_energy.@c140_total_energy_ref ,
maximize c186_MyPhone.@r_c114_total_performance.@c114_total_performance_ref ,
maximize c186_MyPhone.@r_c166_total_security.@c166_total_security_ref ,
minimize c186_MyPhone.@r_c176_total_mass.@c176_total_mass_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 3  + concrete_int_bag -> 8  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 16  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> 48  + concrete_int_bag -> 49  + concrete_int_bag -> 50  + concrete_int_bag -> 51  + concrete_int_bag -> 52  + concrete_int_bag -> 53  + concrete_int_bag -> 54  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 57  + concrete_int_bag -> 58  + concrete_int_bag -> 59  + concrete_int_bag -> 60  + concrete_int_bag -> 61  + concrete_int_bag -> 62  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 67  + concrete_int_bag -> 68  + concrete_int_bag -> 69  + concrete_int_bag -> 70  + concrete_int_bag -> 71  + concrete_int_bag -> 72  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 76  + concrete_int_bag -> 77  + concrete_int_bag -> 78  + concrete_int_bag -> 79  + concrete_int_bag -> 80  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 83  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 86  + concrete_int_bag -> 87  + concrete_int_bag -> 88  + concrete_int_bag -> 89  + concrete_int_bag -> 90  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 93  + concrete_int_bag -> 94  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 97  + concrete_int_bag -> 98  + concrete_int_bag -> 99  + concrete_int_bag -> 100  + concrete_int_bag -> 101  + concrete_int_bag -> 102  + concrete_int_bag -> 103  + concrete_int_bag -> 104  + concrete_int_bag -> 105  + concrete_int_bag -> 106  + concrete_int_bag -> 107  + concrete_int_bag -> 108 
   , c8_Connectivity in partial_c8_Connectivity
   , c24_Bluetooth in partial_c24_Bluetooth
   , c40_USB in partial_c40_USB
   , c56_Wifi in partial_c56_Wifi
   , c72_PasswordProtection in partial_c72_PasswordProtection
   , c93_FingerprintProtection in partial_c93_FingerprintProtection
    ,  c2_performance in performance_for_c8_Connectivity_of_0 + performance_for_c24_Bluetooth_of_9 + performance_for_c40_USB_of_15 + performance_for_c56_Wifi_of_22 + performance_for_c72_PasswordProtection_of_1 + performance_for_c93_FingerprintProtection_of_2
    ,  c3_energy in energy_for_c8_Connectivity_of_0 + energy_for_c24_Bluetooth_of_10 + energy_for_c40_USB_of_7 + energy_for_c56_Wifi_of_17 + energy_for_c72_PasswordProtection_of_2 + energy_for_c93_FingerprintProtection_of_4
    ,  c4_mass in mass_for_c8_Connectivity_of_0 + mass_for_c24_Bluetooth_of_2 + mass_for_c40_USB_of_1 + mass_for_c56_Wifi_of_6 + mass_for_c72_PasswordProtection_of_0 + mass_for_c93_FingerprintProtection_of_0
    ,  c6_security in security_for_c72_PasswordProtection_of_5 + security_for_c93_FingerprintProtection_of_5
    , r_c2_performance in partial_c8_Connectivity->performance_for_c8_Connectivity_of_0 + partial_c24_Bluetooth->performance_for_c24_Bluetooth_of_9 + partial_c40_USB->performance_for_c40_USB_of_15 + partial_c56_Wifi->performance_for_c56_Wifi_of_22 + partial_c72_PasswordProtection->performance_for_c72_PasswordProtection_of_1 + partial_c93_FingerprintProtection->performance_for_c93_FingerprintProtection_of_2
    , r_c3_energy in partial_c8_Connectivity->energy_for_c8_Connectivity_of_0 + partial_c24_Bluetooth->energy_for_c24_Bluetooth_of_10 + partial_c40_USB->energy_for_c40_USB_of_7 + partial_c56_Wifi->energy_for_c56_Wifi_of_17 + partial_c72_PasswordProtection->energy_for_c72_PasswordProtection_of_2 + partial_c93_FingerprintProtection->energy_for_c93_FingerprintProtection_of_4
    , r_c4_mass in partial_c8_Connectivity->mass_for_c8_Connectivity_of_0 + partial_c24_Bluetooth->mass_for_c24_Bluetooth_of_2 + partial_c40_USB->mass_for_c40_USB_of_1 + partial_c56_Wifi->mass_for_c56_Wifi_of_6 + partial_c72_PasswordProtection->mass_for_c72_PasswordProtection_of_0 + partial_c93_FingerprintProtection->mass_for_c93_FingerprintProtection_of_0
    , r_c6_security in partial_c72_PasswordProtection->security_for_c72_PasswordProtection_of_5 + partial_c93_FingerprintProtection->security_for_c93_FingerprintProtection_of_5
    , c2_performance_ref in performance_for_c8_Connectivity_of_0-> 0 + performance_for_c24_Bluetooth_of_9-> 9 + performance_for_c40_USB_of_15-> 15 + performance_for_c56_Wifi_of_22-> 22 + performance_for_c72_PasswordProtection_of_1-> 1 + performance_for_c93_FingerprintProtection_of_2-> 2
    , c3_energy_ref in energy_for_c8_Connectivity_of_0-> 0 + energy_for_c24_Bluetooth_of_10-> 10 + energy_for_c40_USB_of_7-> 7 + energy_for_c56_Wifi_of_17-> 17 + energy_for_c72_PasswordProtection_of_2-> 2 + energy_for_c93_FingerprintProtection_of_4-> 4
    , c4_mass_ref in mass_for_c8_Connectivity_of_0-> 0 + mass_for_c24_Bluetooth_of_2-> 2 + mass_for_c40_USB_of_1-> 1 + mass_for_c56_Wifi_of_6-> 6 + mass_for_c72_PasswordProtection_of_0-> 0 + mass_for_c93_FingerprintProtection_of_0-> 0
    , c6_security_ref in security_for_c72_PasswordProtection_of_5-> 5 + security_for_c93_FingerprintProtection_of_5-> 5
}
run show for partial_speedup optimize o_global
