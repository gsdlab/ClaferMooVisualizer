/*
All clafers: 24 | Abstract: 3 | Concrete: 21 | References: 0
Constraints: 29
Goals: 2
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_Component
{ r_c2_performance : one c2_performance }

sig c2_performance
{ c2_performance_ref : one Int }
{ one @r_c2_performance.this }

abstract sig c3_ComponentWithEnergy extends c1_Component
{ r_c4_energy : one c4_energy }

sig c4_energy
{ c4_energy_ref : one Int }
{ one @r_c4_energy.this }

abstract sig c5_androidPhone
{ r_c6_hardware : one c6_hardware
, r_c132_software : one c132_software
, r_c153_total_performance : one c153_total_performance
, r_c215_total_energy : one c215_total_energy }

sig c6_hardware extends c1_Component
{ r_c12_screen : one c12_screen
, r_c18_material : one c18_material
, r_c24_oled : one c24_oled
, r_c36_amoled : one c36_amoled
, r_c48_lcd : one c48_lcd
, r_c60_keyboard : lone c60_keyboard
, r_c71_keyboardLight : lone c71_keyboardLight
, r_c85_cpu : one c85_cpu
, r_c96_extra_cpu : lone c96_extra_cpu
, r_c107_location : lone c107_location
, r_c120_wifitriangulation : one c120_wifitriangulation }
{ one @r_c6_hardware.this
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c12_screen extends c1_Component
{}
{ one @r_c12_screen.this
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c18_material extends c1_Component
{}
{ one @r_c18_material.this
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c24_oled extends c3_ComponentWithEnergy
{}
{ one @r_c24_oled.this
  (this.@r_c4_energy.@c4_energy_ref) = 3
  (this.@r_c2_performance.@c2_performance_ref) = (-3) }

sig c36_amoled extends c3_ComponentWithEnergy
{}
{ one @r_c36_amoled.this
  (this.@r_c4_energy.@c4_energy_ref) = 2
  (this.@r_c2_performance.@c2_performance_ref) = (-5) }

sig c48_lcd extends c3_ComponentWithEnergy
{}
{ one @r_c48_lcd.this
  (this.@r_c4_energy.@c4_energy_ref) = 4
  (this.@r_c2_performance.@c2_performance_ref) = (-2) }

sig c60_keyboard extends c3_ComponentWithEnergy
{}
{ one @r_c60_keyboard.this
  (this.@r_c4_energy.@c4_energy_ref) = 1
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c71_keyboardLight extends c3_ComponentWithEnergy
{}
{ one @r_c71_keyboardLight.this
  (this.@r_c4_energy.@c4_energy_ref) = 2
  (this.@r_c2_performance.@c2_performance_ref) = (-1)
  some (this.~@r_c71_keyboardLight).@r_c60_keyboard }

sig c85_cpu extends c3_ComponentWithEnergy
{}
{ one @r_c85_cpu.this
  (this.@r_c4_energy.@c4_energy_ref) = 1
  (this.@r_c2_performance.@c2_performance_ref) = 10 }

sig c96_extra_cpu extends c3_ComponentWithEnergy
{}
{ one @r_c96_extra_cpu.this
  (this.@r_c4_energy.@c4_energy_ref) = 2
  (this.@r_c2_performance.@c2_performance_ref) = 15 }

sig c107_location
{ r_c108_gps : lone c108_gps }
{ one @r_c107_location.this
  let children = (r_c108_gps) | some children }

sig c108_gps extends c3_ComponentWithEnergy
{}
{ one @r_c108_gps.this
  (this.@r_c4_energy.@c4_energy_ref) = 5
  (this.@r_c2_performance.@c2_performance_ref) = (-1) }

sig c120_wifitriangulation extends c3_ComponentWithEnergy
{}
{ one @r_c120_wifitriangulation.this
  (this.@r_c4_energy.@c4_energy_ref) = 2
  (this.@r_c2_performance.@c2_performance_ref) = (-3) }

sig c132_software extends c1_Component
{ r_c138_browser : lone c138_browser
, r_c146_mediaplayer : lone c146_mediaplayer }
{ one @r_c132_software.this
  (this.@r_c2_performance.@c2_performance_ref) = 0 }

sig c138_browser extends c1_Component
{}
{ one @r_c138_browser.this
  (this.@r_c2_performance.@c2_performance_ref) = 0
  some (((this.~@r_c138_browser).~@r_c132_software).@r_c6_hardware).@r_c96_extra_cpu }

sig c146_mediaplayer extends c1_Component
{}
{ one @r_c146_mediaplayer.this
  (this.@r_c2_performance.@c2_performance_ref) = (-2) }

sig c153_total_performance
{ c153_total_performance_ref : one Int }
{ one @r_c153_total_performance.this
  this.@c153_total_performance_ref = (((((((((((((((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c2_performance.@c2_performance_ref).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c12_screen).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c18_material).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c24_oled).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c36_amoled).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c48_lcd).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c60_keyboard).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c71_keyboardLight).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c85_cpu).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c96_extra_cpu).@r_c2_performance.@c2_performance_ref)]).add[(((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c107_location).@r_c108_gps).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c6_hardware).@r_c120_wifitriangulation).@r_c2_performance.@c2_performance_ref)]).add[(((this.~@r_c153_total_performance).@r_c132_software).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c132_software).@r_c138_browser).@r_c2_performance.@c2_performance_ref)]).add[((((this.~@r_c153_total_performance).@r_c132_software).@r_c146_mediaplayer).@r_c2_performance.@c2_performance_ref)]) }

sig c215_total_energy
{ c215_total_energy_ref : one Int }
{ one @r_c215_total_energy.this
  this.@c215_total_energy_ref = ((((((((((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c24_oled).@r_c4_energy.@c4_energy_ref).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c36_amoled).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c48_lcd).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c60_keyboard).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c71_keyboardLight).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c85_cpu).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c96_extra_cpu).@r_c4_energy.@c4_energy_ref)]).add[(((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c107_location).@r_c108_gps).@r_c4_energy.@c4_energy_ref)]).add[((((this.~@r_c215_total_energy).@r_c6_hardware).@r_c120_wifitriangulation).@r_c4_energy.@c4_energy_ref)]) }

one sig c253_aPhone extends c5_androidPhone
{}
{ some (this.@r_c132_software).@r_c146_mediaplayer }

objectives o_global {
minimize c253_aPhone.@r_c215_total_energy.@c215_total_energy_ref ,
maximize c253_aPhone.@r_c153_total_performance.@c153_total_performance_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 6  + concrete_int_bag -> 7  + concrete_int_bag -> 8  + concrete_int_bag -> 9  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 16  + concrete_int_bag -> 17  + concrete_int_bag -> 18  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 22  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 45  + concrete_int_bag -> 46  + concrete_int_bag -> 47  + concrete_int_bag -> -17  + concrete_int_bag -> -16  + concrete_int_bag -> -15  + concrete_int_bag -> -14  + concrete_int_bag -> -13  + concrete_int_bag -> -12  + concrete_int_bag -> -11  + concrete_int_bag -> -10  + concrete_int_bag -> -9  + concrete_int_bag -> -8  + concrete_int_bag -> -7  + concrete_int_bag -> -6  + concrete_int_bag -> -4 
   , c6_hardware in partial_c6_hardware
   , c12_screen in partial_c12_screen
   , c18_material in partial_c18_material
   , c24_oled in partial_c24_oled
   , c36_amoled in partial_c36_amoled
   , c48_lcd in partial_c48_lcd
   , c60_keyboard in partial_c60_keyboard
   , c71_keyboardLight in partial_c71_keyboardLight
   , c85_cpu in partial_c85_cpu
   , c96_extra_cpu in partial_c96_extra_cpu
   , c107_location in partial_c107_location
   , c108_gps in partial_c108_gps
   , c120_wifitriangulation in partial_c120_wifitriangulation
   , c132_software in partial_c132_software
   , c138_browser in partial_c138_browser
   , c146_mediaplayer in partial_c146_mediaplayer
    ,  c2_performance in performance_for_c6_hardware_of_0 + performance_for_c12_screen_of_0 + performance_for_c18_material_of_0 + performance_for_c24_oled_of_minus3 + performance_for_c36_amoled_of_minus5 + performance_for_c48_lcd_of_minus2 + performance_for_c60_keyboard_of_0 + performance_for_c71_keyboardLight_of_minus1 + performance_for_c85_cpu_of_10 + performance_for_c96_extra_cpu_of_15 + performance_for_c108_gps_of_minus1 + performance_for_c120_wifitriangulation_of_minus3 + performance_for_c132_software_of_0 + performance_for_c138_browser_of_0 + performance_for_c146_mediaplayer_of_minus2
    ,  c4_energy in energy_for_c24_oled_of_3 + energy_for_c36_amoled_of_2 + energy_for_c48_lcd_of_4 + energy_for_c60_keyboard_of_1 + energy_for_c71_keyboardLight_of_2 + energy_for_c85_cpu_of_1 + energy_for_c96_extra_cpu_of_2 + energy_for_c108_gps_of_5 + energy_for_c120_wifitriangulation_of_2
    , r_c2_performance in partial_c6_hardware->performance_for_c6_hardware_of_0 + partial_c12_screen->performance_for_c12_screen_of_0 + partial_c18_material->performance_for_c18_material_of_0 + partial_c24_oled->performance_for_c24_oled_of_minus3 + partial_c36_amoled->performance_for_c36_amoled_of_minus5 + partial_c48_lcd->performance_for_c48_lcd_of_minus2 + partial_c60_keyboard->performance_for_c60_keyboard_of_0 + partial_c71_keyboardLight->performance_for_c71_keyboardLight_of_minus1 + partial_c85_cpu->performance_for_c85_cpu_of_10 + partial_c96_extra_cpu->performance_for_c96_extra_cpu_of_15 + partial_c108_gps->performance_for_c108_gps_of_minus1 + partial_c120_wifitriangulation->performance_for_c120_wifitriangulation_of_minus3 + partial_c132_software->performance_for_c132_software_of_0 + partial_c138_browser->performance_for_c138_browser_of_0 + partial_c146_mediaplayer->performance_for_c146_mediaplayer_of_minus2
    , r_c4_energy in partial_c24_oled->energy_for_c24_oled_of_3 + partial_c36_amoled->energy_for_c36_amoled_of_2 + partial_c48_lcd->energy_for_c48_lcd_of_4 + partial_c60_keyboard->energy_for_c60_keyboard_of_1 + partial_c71_keyboardLight->energy_for_c71_keyboardLight_of_2 + partial_c85_cpu->energy_for_c85_cpu_of_1 + partial_c96_extra_cpu->energy_for_c96_extra_cpu_of_2 + partial_c108_gps->energy_for_c108_gps_of_5 + partial_c120_wifitriangulation->energy_for_c120_wifitriangulation_of_2
    , c2_performance_ref in performance_for_c6_hardware_of_0-> 0 + performance_for_c12_screen_of_0-> 0 + performance_for_c18_material_of_0-> 0 + performance_for_c24_oled_of_minus3-> -3 + performance_for_c36_amoled_of_minus5-> -5 + performance_for_c48_lcd_of_minus2-> -2 + performance_for_c60_keyboard_of_0-> 0 + performance_for_c71_keyboardLight_of_minus1-> -1 + performance_for_c85_cpu_of_10-> 10 + performance_for_c96_extra_cpu_of_15-> 15 + performance_for_c108_gps_of_minus1-> -1 + performance_for_c120_wifitriangulation_of_minus3-> -3 + performance_for_c132_software_of_0-> 0 + performance_for_c138_browser_of_0-> 0 + performance_for_c146_mediaplayer_of_minus2-> -2
    , c4_energy_ref in energy_for_c24_oled_of_3-> 3 + energy_for_c36_amoled_of_2-> 2 + energy_for_c48_lcd_of_4-> 4 + energy_for_c60_keyboard_of_1-> 1 + energy_for_c71_keyboardLight_of_2-> 2 + energy_for_c85_cpu_of_1-> 1 + energy_for_c96_extra_cpu_of_2-> 2 + energy_for_c108_gps_of_5-> 5 + energy_for_c120_wifitriangulation_of_2-> 2
}
run show for partial_speedup optimize o_global
