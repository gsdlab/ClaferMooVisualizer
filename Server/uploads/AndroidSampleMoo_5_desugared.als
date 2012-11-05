/*
All clafers: 20 | Abstract: 3 | Concrete: 17 | References: 0
Constraints: 32
Goals: 5
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Feature
{ r_c2_performance : one c2_performance
, r_c3_energy : one c3_energy
, r_c4_mass : one c4_mass
, r_c5_cost : one c5_cost }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

sig c3_energy
{ c3_energy_ref : one Int }
{ one @r_c3_energy.this }

sig c4_mass
{ c4_mass_ref : one Int }
{ one @r_c4_mass.this }

sig c5_cost
{ c5_cost_ref : one Int }
{ one @r_c5_cost.this }

abstract sig c6_SecurityFeature extends c1_Feature
{ r_c7_security : one c7_security }

sig c7_security
{ c7_security_ref : one Int }
{ one @r_c7_security.this }

abstract sig c8_MobilePhone
{ r_c9_Connectivity : one c9_Connectivity
, r_c93_PasswordProtection : lone c93_PasswordProtection
, r_c124_FingerprintProtection : lone c124_FingerprintProtection
, r_c150_total_performance : one c150_total_performance
, r_c176_total_energy : one c176_total_energy
, r_c202_total_security : one c202_total_security
, r_c212_total_mass : one c212_total_mass
, r_c238_total_cost : one c238_total_cost }
{ (this.@r_c150_total_performance.@c150_total_performance_ref) = (((((((this.@r_c9_Connectivity).@r_c2_performance.@c2_performance_ref).add[(((this.@r_c9_Connectivity).@r_c30_Bluetooth).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c9_Connectivity).@r_c51_USB).@r_c2_performance.@c2_performance_ref)]).add[(((this.@r_c9_Connectivity).@r_c72_Wifi).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c93_PasswordProtection).@r_c2_performance.@c2_performance_ref)]).add[((this.@r_c124_FingerprintProtection).@r_c2_performance.@c2_performance_ref)])
  (this.@r_c176_total_energy.@c176_total_energy_ref) = (((((((this.@r_c9_Connectivity).@r_c3_energy.@c3_energy_ref).add[(((this.@r_c9_Connectivity).@r_c30_Bluetooth).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c9_Connectivity).@r_c51_USB).@r_c3_energy.@c3_energy_ref)]).add[(((this.@r_c9_Connectivity).@r_c72_Wifi).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c93_PasswordProtection).@r_c3_energy.@c3_energy_ref)]).add[((this.@r_c124_FingerprintProtection).@r_c3_energy.@c3_energy_ref)])
  (this.@r_c202_total_security.@c202_total_security_ref) = (((this.@r_c93_PasswordProtection).@r_c7_security.@c7_security_ref).add[((this.@r_c124_FingerprintProtection).@r_c7_security.@c7_security_ref)])
  (this.@r_c212_total_mass.@c212_total_mass_ref) = (((((((this.@r_c9_Connectivity).@r_c4_mass.@c4_mass_ref).add[(((this.@r_c9_Connectivity).@r_c30_Bluetooth).@r_c4_mass.@c4_mass_ref)]).add[(((this.@r_c9_Connectivity).@r_c51_USB).@r_c4_mass.@c4_mass_ref)]).add[(((this.@r_c9_Connectivity).@r_c72_Wifi).@r_c4_mass.@c4_mass_ref)]).add[((this.@r_c93_PasswordProtection).@r_c4_mass.@c4_mass_ref)]).add[((this.@r_c124_FingerprintProtection).@r_c4_mass.@c4_mass_ref)])
  (this.@r_c238_total_cost.@c238_total_cost_ref) = (((((((this.@r_c9_Connectivity).@r_c5_cost.@c5_cost_ref).add[(((this.@r_c9_Connectivity).@r_c30_Bluetooth).@r_c5_cost.@c5_cost_ref)]).add[(((this.@r_c9_Connectivity).@r_c51_USB).@r_c5_cost.@c5_cost_ref)]).add[(((this.@r_c9_Connectivity).@r_c72_Wifi).@r_c5_cost.@c5_cost_ref)]).add[((this.@r_c93_PasswordProtection).@r_c5_cost.@c5_cost_ref)]).add[((this.@r_c124_FingerprintProtection).@r_c5_cost.@c5_cost_ref)]) }

sig c9_Connectivity extends c1_Feature
{ r_c30_Bluetooth : lone c30_Bluetooth
, r_c51_USB : lone c51_USB
, r_c72_Wifi : lone c72_Wifi }
{ one @r_c9_Connectivity.this
  let children = (r_c30_Bluetooth + r_c51_USB + r_c72_Wifi) | some children
  (this.@r_c2_performance.@c2_performance_ref) = 0
  (this.@r_c3_energy.@c3_energy_ref) = 0
  (this.@r_c4_mass.@c4_mass_ref) = 0
  (this.@r_c5_cost.@c5_cost_ref) = 12 }

sig c30_Bluetooth extends c1_Feature
{}
{ one @r_c30_Bluetooth.this
  (this.@r_c2_performance.@c2_performance_ref) = 9
  (this.@r_c3_energy.@c3_energy_ref) = 10
  (this.@r_c4_mass.@c4_mass_ref) = 2
  (this.@r_c5_cost.@c5_cost_ref) = 3 }

sig c51_USB extends c1_Feature
{}
{ one @r_c51_USB.this
  (this.@r_c2_performance.@c2_performance_ref) = 10
  (this.@r_c3_energy.@c3_energy_ref) = 5
  (this.@r_c4_mass.@c4_mass_ref) = 3
  (this.@r_c5_cost.@c5_cost_ref) = 5 }

sig c72_Wifi extends c1_Feature
{}
{ one @r_c72_Wifi.this
  (this.@r_c2_performance.@c2_performance_ref) = 22
  (this.@r_c3_energy.@c3_energy_ref) = 17
  (this.@r_c4_mass.@c4_mass_ref) = 6
  (this.@r_c5_cost.@c5_cost_ref) = 5 }

sig c93_PasswordProtection extends c6_SecurityFeature
{}
{ one @r_c93_PasswordProtection.this
  (this.@r_c7_security.@c7_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 1
  (this.@r_c3_energy.@c3_energy_ref) = 2
  (this.@r_c4_mass.@c4_mass_ref) = 0
  (this.@r_c5_cost.@c5_cost_ref) = 12
  (this.@r_c5_cost.@c5_cost_ref) = 2 }

sig c124_FingerprintProtection extends c6_SecurityFeature
{}
{ one @r_c124_FingerprintProtection.this
  (this.@r_c4_mass.@c4_mass_ref) = 0
  (this.@r_c7_security.@c7_security_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = 2
  (this.@r_c3_energy.@c3_energy_ref) = 4
  (this.@r_c5_cost.@c5_cost_ref) = 2 }

sig c150_total_performance
{ c150_total_performance_ref : one Int }
{ one @r_c150_total_performance.this }

sig c176_total_energy
{ c176_total_energy_ref : one Int }
{ one @r_c176_total_energy.this }

sig c202_total_security
{ c202_total_security_ref : one Int }
{ one @r_c202_total_security.this }

sig c212_total_mass
{ c212_total_mass_ref : one Int }
{ one @r_c212_total_mass.this }

sig c238_total_cost
{ c238_total_cost_ref : one Int }
{ one @r_c238_total_cost.this }

one sig c264_MyPhone extends c8_MobilePhone
{}

objectives o_global {
minimize c264_MyPhone.@r_c176_total_energy.@c176_total_energy_ref ,
maximize c264_MyPhone.@r_c150_total_performance.@c150_total_performance_ref ,
maximize c264_MyPhone.@r_c202_total_security.@c202_total_security_ref ,
minimize c264_MyPhone.@r_c212_total_mass.@c212_total_mass_ref ,
minimize c264_MyPhone.@r_c238_total_cost.@c238_total_cost_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 7  + concrete_int_bag -> 8  + concrete_int_bag -> 11  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 15  + concrete_int_bag -> 16  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> 48  + concrete_int_bag -> 49  + concrete_int_bag -> 50  + concrete_int_bag -> 51  + concrete_int_bag -> 52  + concrete_int_bag -> 53  + concrete_int_bag -> 54  + concrete_int_bag -> 55  + concrete_int_bag -> 56  + concrete_int_bag -> 57  + concrete_int_bag -> 58  + concrete_int_bag -> 59  + concrete_int_bag -> 60  + concrete_int_bag -> 61  + concrete_int_bag -> 62  + concrete_int_bag -> 63  + concrete_int_bag -> 64  + concrete_int_bag -> 65  + concrete_int_bag -> 66  + concrete_int_bag -> 67  + concrete_int_bag -> 68  + concrete_int_bag -> 69  + concrete_int_bag -> 70  + concrete_int_bag -> 71  + concrete_int_bag -> 72  + concrete_int_bag -> 73  + concrete_int_bag -> 74  + concrete_int_bag -> 75  + concrete_int_bag -> 76  + concrete_int_bag -> 77  + concrete_int_bag -> 78  + concrete_int_bag -> 79  + concrete_int_bag -> 80  + concrete_int_bag -> 81  + concrete_int_bag -> 82  + concrete_int_bag -> 83  + concrete_int_bag -> 84  + concrete_int_bag -> 85  + concrete_int_bag -> 86  + concrete_int_bag -> 87  + concrete_int_bag -> 88  + concrete_int_bag -> 89  + concrete_int_bag -> 90  + concrete_int_bag -> 91  + concrete_int_bag -> 92  + concrete_int_bag -> 93  + concrete_int_bag -> 94  + concrete_int_bag -> 95  + concrete_int_bag -> 96  + concrete_int_bag -> 97  + concrete_int_bag -> 98  + concrete_int_bag -> 99  + concrete_int_bag -> 100  + concrete_int_bag -> 101  + concrete_int_bag -> 102  + concrete_int_bag -> 103  + concrete_int_bag -> 104  + concrete_int_bag -> 105  + concrete_int_bag -> 106  + concrete_int_bag -> 107  + concrete_int_bag -> 108  + concrete_int_bag -> 109  + concrete_int_bag -> 110  + concrete_int_bag -> 111  + concrete_int_bag -> 112  + concrete_int_bag -> 113  + concrete_int_bag -> 114  + concrete_int_bag -> 115  + concrete_int_bag -> 116  + concrete_int_bag -> 117  + concrete_int_bag -> 118  + concrete_int_bag -> 119  + concrete_int_bag -> 120  + concrete_int_bag -> 121  + concrete_int_bag -> 122  + concrete_int_bag -> 123  + concrete_int_bag -> 124  + concrete_int_bag -> 125  + concrete_int_bag -> 126  + concrete_int_bag -> 127  + concrete_int_bag -> 128  + concrete_int_bag -> 129  + concrete_int_bag -> 130  + concrete_int_bag -> 131  + concrete_int_bag -> 132 
   , c9_Connectivity in partial_c9_Connectivity
   , c30_Bluetooth in partial_c30_Bluetooth
   , c51_USB in partial_c51_USB
   , c72_Wifi in partial_c72_Wifi
   , c93_PasswordProtection in partial_c93_PasswordProtection
   , c124_FingerprintProtection in partial_c124_FingerprintProtection
    ,  c2_performance in performance_for_c9_Connectivity_of_0 + performance_for_c30_Bluetooth_of_9 + performance_for_c51_USB_of_10 + performance_for_c72_Wifi_of_22 + performance_for_c93_PasswordProtection_of_1 + performance_for_c124_FingerprintProtection_of_2
    ,  c3_energy in energy_for_c9_Connectivity_of_0 + energy_for_c30_Bluetooth_of_10 + energy_for_c51_USB_of_5 + energy_for_c72_Wifi_of_17 + energy_for_c93_PasswordProtection_of_2 + energy_for_c124_FingerprintProtection_of_4
    ,  c4_mass in mass_for_c9_Connectivity_of_0 + mass_for_c30_Bluetooth_of_2 + mass_for_c51_USB_of_3 + mass_for_c72_Wifi_of_6 + mass_for_c93_PasswordProtection_of_0 + mass_for_c124_FingerprintProtection_of_0
    ,  c5_cost in cost_for_c9_Connectivity_of_12 + cost_for_c30_Bluetooth_of_3 + cost_for_c51_USB_of_5 + cost_for_c72_Wifi_of_5 + cost_for_c93_PasswordProtection_of_2 + cost_for_c124_FingerprintProtection_of_2
    ,  c7_security in security_for_c93_PasswordProtection_of_5 + security_for_c124_FingerprintProtection_of_5
    , r_c2_performance in partial_c9_Connectivity->performance_for_c9_Connectivity_of_0 + partial_c30_Bluetooth->performance_for_c30_Bluetooth_of_9 + partial_c51_USB->performance_for_c51_USB_of_10 + partial_c72_Wifi->performance_for_c72_Wifi_of_22 + partial_c93_PasswordProtection->performance_for_c93_PasswordProtection_of_1 + partial_c124_FingerprintProtection->performance_for_c124_FingerprintProtection_of_2
    , r_c3_energy in partial_c9_Connectivity->energy_for_c9_Connectivity_of_0 + partial_c30_Bluetooth->energy_for_c30_Bluetooth_of_10 + partial_c51_USB->energy_for_c51_USB_of_5 + partial_c72_Wifi->energy_for_c72_Wifi_of_17 + partial_c93_PasswordProtection->energy_for_c93_PasswordProtection_of_2 + partial_c124_FingerprintProtection->energy_for_c124_FingerprintProtection_of_4
    , r_c4_mass in partial_c9_Connectivity->mass_for_c9_Connectivity_of_0 + partial_c30_Bluetooth->mass_for_c30_Bluetooth_of_2 + partial_c51_USB->mass_for_c51_USB_of_3 + partial_c72_Wifi->mass_for_c72_Wifi_of_6 + partial_c93_PasswordProtection->mass_for_c93_PasswordProtection_of_0 + partial_c124_FingerprintProtection->mass_for_c124_FingerprintProtection_of_0
    , r_c5_cost in partial_c9_Connectivity->cost_for_c9_Connectivity_of_12 + partial_c30_Bluetooth->cost_for_c30_Bluetooth_of_3 + partial_c51_USB->cost_for_c51_USB_of_5 + partial_c72_Wifi->cost_for_c72_Wifi_of_5 + partial_c93_PasswordProtection->cost_for_c93_PasswordProtection_of_2 + partial_c124_FingerprintProtection->cost_for_c124_FingerprintProtection_of_2
    , r_c7_security in partial_c93_PasswordProtection->security_for_c93_PasswordProtection_of_5 + partial_c124_FingerprintProtection->security_for_c124_FingerprintProtection_of_5
    , c2_performance_ref in performance_for_c9_Connectivity_of_0-> 0 + performance_for_c30_Bluetooth_of_9-> 9 + performance_for_c51_USB_of_10-> 10 + performance_for_c72_Wifi_of_22-> 22 + performance_for_c93_PasswordProtection_of_1-> 1 + performance_for_c124_FingerprintProtection_of_2-> 2
    , c3_energy_ref in energy_for_c9_Connectivity_of_0-> 0 + energy_for_c30_Bluetooth_of_10-> 10 + energy_for_c51_USB_of_5-> 5 + energy_for_c72_Wifi_of_17-> 17 + energy_for_c93_PasswordProtection_of_2-> 2 + energy_for_c124_FingerprintProtection_of_4-> 4
    , c4_mass_ref in mass_for_c9_Connectivity_of_0-> 0 + mass_for_c30_Bluetooth_of_2-> 2 + mass_for_c51_USB_of_3-> 3 + mass_for_c72_Wifi_of_6-> 6 + mass_for_c93_PasswordProtection_of_0-> 0 + mass_for_c124_FingerprintProtection_of_0-> 0
    , c5_cost_ref in cost_for_c9_Connectivity_of_12-> 12 + cost_for_c30_Bluetooth_of_3-> 3 + cost_for_c51_USB_of_5-> 5 + cost_for_c72_Wifi_of_5-> 5 + cost_for_c93_PasswordProtection_of_2-> 2 + cost_for_c124_FingerprintProtection_of_2-> 2
    , c7_security_ref in security_for_c93_PasswordProtection_of_5-> 5 + security_for_c124_FingerprintProtection_of_5-> 5
}
run show for partial_speedup optimize o_global
