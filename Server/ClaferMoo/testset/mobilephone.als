/*
All clafers: 15 | Abstract: 3 | Concrete: 12 | References: 0
Constraints: 14
Goals: 3
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}
run  show for 1 but 2 c1_Feature, 2 c2_performance, 2 c3_cost, 1 c5_security, 1 c67_total_performance, 1 c6_MobilePhone, 1 c74_total_cost, 1 c81_total_security

abstract sig c1_Feature
{ r_c2_performance : one c2_performance
, r_c3_cost : one c3_cost }

sig c2_performance
{ ref : one Int }
{ one @r_c2_performance.this }

sig c3_cost
{ ref : one Int }
{ one @r_c3_cost.this }

abstract sig c4_SecurityFeature extends c1_Feature
{ r_c5_security : one c5_security }

sig c5_security
{ ref : one Int }
{ one @r_c5_security.this }

abstract sig c6_MobilePhone
{ r_c7_Connectivity : one c7_Connectivity
, r_c51_PasswordProtection : one c51_PasswordProtection
, r_c67_total_performance : one c67_total_performance
, r_c74_total_cost : one c74_total_cost
, r_c81_total_security : one c81_total_security }
{ (this.@r_c67_total_performance.@ref) = (sum(c1_Feature.@r_c2_performance.@ref))
  (this.@r_c74_total_cost.@ref) = (sum(c1_Feature.@r_c3_cost.@ref))
  (this.@r_c81_total_security.@ref) = (sum(c4_SecurityFeature.@r_c5_security.@ref)) }

sig c7_Connectivity extends c1_Feature
{ r_c18_Bluetooth : lone c18_Bluetooth
, r_c29_USB : lone c29_USB
, r_c40_Wifi : lone c40_Wifi }
{ one @r_c7_Connectivity.this
  let children = (r_c18_Bluetooth + r_c29_USB + r_c40_Wifi) | some children
  (this.@r_c2_performance.@ref) = 0
  (this.@r_c3_cost.@ref) = 0 }

sig c18_Bluetooth extends c1_Feature
{}
{ one @r_c18_Bluetooth.this
  (this.@r_c2_performance.@ref) = 9
  (this.@r_c3_cost.@ref) = 10 }

sig c29_USB extends c1_Feature
{}
{ one @r_c29_USB.this
  (this.@r_c2_performance.@ref) = 15
  (this.@r_c3_cost.@ref) = 7 }

sig c40_Wifi extends c1_Feature
{}
{ one @r_c40_Wifi.this
  (this.@r_c2_performance.@ref) = 22
  (this.@r_c3_cost.@ref) = 17 }

sig c51_PasswordProtection extends c4_SecurityFeature
{}
{ one @r_c51_PasswordProtection.this
  (this.@r_c5_security.@ref) = 1
  (this.@r_c2_performance.@ref) = 1
  (this.@r_c3_cost.@ref) = 2 }

sig c67_total_performance
{ ref : one Int }
{ one @r_c67_total_performance.this }

sig c74_total_cost
{ ref : one Int }
{ one @r_c74_total_cost.this }

sig c81_total_security
{ ref : one Int }
{ one @r_c81_total_security.this }

one sig c88_MyPhone extends c6_MobilePhone
{}

objectives o_global {
maximize c88_MyPhone.@r_c67_total_performance.@ref ,
minimize c88_MyPhone.@r_c74_total_cost.@ref ,
maximize c88_MyPhone.@r_c81_total_security.@ref 
}