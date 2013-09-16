/*
All clafers: 21 | Abstract: 3 | Concrete: 18 | References: 0
Constraints: 25
Goals: 3
Global scope: 1..*
All names unique: False
*/
open util/integer
pred show {}


abstract sig c1_IFeature
{ r_c2_footprint : one c2_footprint
, r_c3_usability : one c3_usability }

sig c2_footprint
{ c2_footprint_ref : one Int }
{ one @r_c2_footprint.this }

sig c3_usability
{ c3_usability_ref : one Int }
{ one @r_c3_usability.this }

abstract sig c4_PortabilityFeature
{ r_c5_portability : one c5_portability }

sig c5_portability
{ c5_portability_ref : one Int }
{ one @r_c5_portability.this }

abstract sig c6_Violet
{ r_c7_VioletDef : one c7_VioletDef
, r_c143_total_footprint : one c143_total_footprint
, r_c150_total_usability : one c150_total_usability
, r_c157_total_portability : one c157_total_portability }
{ (this.@r_c143_total_footprint.@c143_total_footprint_ref) = (sum(c1_IFeature.@r_c2_footprint.@c2_footprint_ref))
  (this.@r_c150_total_usability.@c150_total_usability_ref) = (sum(c1_IFeature.@r_c3_usability.@c3_usability_ref))
  (this.@r_c157_total_portability.@c157_total_portability_ref) = (sum(c4_PortabilityFeature.@r_c5_portability.@c5_portability_ref)) }

sig c7_VioletDef extends c1_IFeature
{ r_c18_base : one c18_base
, r_c29_MenuResources : lone c29_MenuResources
, r_c40_GraphUtility : lone c40_GraphUtility
, r_c51_ExtensionFilter : lone c51_ExtensionFilter
, r_c62_FileUtility : lone c62_FileUtility
, r_c73_InternalFrame : lone c73_InternalFrame
, r_c84_Read : lone c84_Read
, r_c90_FileMenu : lone c90_FileMenu
, r_c101_NewFile : lone c101_NewFile
, r_c132_UseCaseD : lone c132_UseCaseD }
{ one @r_c7_VioletDef.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 18
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c18_base extends c1_IFeature
{}
{ one @r_c18_base.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c29_MenuResources extends c1_IFeature
{}
{ one @r_c29_MenuResources.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c40_GraphUtility extends c1_IFeature
{}
{ one @r_c40_GraphUtility.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c51_ExtensionFilter extends c1_IFeature
{}
{ one @r_c51_ExtensionFilter.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c62_FileUtility extends c1_IFeature
{}
{ one @r_c62_FileUtility.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c73_InternalFrame extends c1_IFeature
{}
{ one @r_c73_InternalFrame.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c84_Read extends c4_PortabilityFeature
{}
{ one @r_c84_Read.this
  (this.@r_c5_portability.@c5_portability_ref) = 4 }

sig c90_FileMenu extends c1_IFeature
{}
{ one @r_c90_FileMenu.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 3
  (this.@r_c3_usability.@c3_usability_ref) = 0 }

sig c101_NewFile extends c1_IFeature
{}
{ one @r_c101_NewFile.this
  ((((((some (this.~@r_c101_NewFile).@r_c51_ExtensionFilter) && (some (this.~@r_c101_NewFile).@r_c73_InternalFrame)) && (some (this.~@r_c101_NewFile).@r_c84_Read)) && (some (this.~@r_c101_NewFile).@r_c40_GraphUtility)) && (some (this.~@r_c101_NewFile).@r_c29_MenuResources)) && (some (this.~@r_c101_NewFile).@r_c90_FileMenu)) && (some (this.~@r_c101_NewFile).@r_c62_FileUtility)
  (this.@r_c2_footprint.@c2_footprint_ref) = 0
  (this.@r_c3_usability.@c3_usability_ref) = 1 }

sig c132_UseCaseD extends c1_IFeature
{}
{ one @r_c132_UseCaseD.this
  (this.@r_c2_footprint.@c2_footprint_ref) = 0
  (this.@r_c3_usability.@c3_usability_ref) = 3 }

sig c143_total_footprint
{ c143_total_footprint_ref : one Int }
{ one @r_c143_total_footprint.this }

sig c150_total_usability
{ c150_total_usability_ref : one Int }
{ one @r_c150_total_usability.this }

sig c157_total_portability
{ c157_total_portability_ref : one Int }
{ one @r_c157_total_portability.this }

one sig c164_simpleConfig extends c6_Violet
{}

objectives o_global {
maximize c164_simpleConfig.@r_c150_total_usability.@c150_total_usability_ref ,
minimize c164_simpleConfig.@r_c143_total_footprint.@c143_total_footprint_ref ,
maximize c164_simpleConfig.@r_c157_total_portability.@c157_total_portability_ref 
}sig bag_extra_ints{
  extra_ints : set Int
}
inst partial_speedup {
    1
    ,bag_extra_ints = concrete_int_bag
    , extra_ints = concrete_int_bag -> 5  + concrete_int_bag -> 6  + concrete_int_bag -> 7  + concrete_int_bag -> 8  + concrete_int_bag -> 9  + concrete_int_bag -> 10  + concrete_int_bag -> 11  + concrete_int_bag -> 12  + concrete_int_bag -> 13  + concrete_int_bag -> 14  + concrete_int_bag -> 15  + concrete_int_bag -> 16  + concrete_int_bag -> 17  + concrete_int_bag -> 19  + concrete_int_bag -> 20  + concrete_int_bag -> 21  + concrete_int_bag -> 22  + concrete_int_bag -> 23  + concrete_int_bag -> 24  + concrete_int_bag -> 25  + concrete_int_bag -> 26  + concrete_int_bag -> 27  + concrete_int_bag -> 28  + concrete_int_bag -> 29  + concrete_int_bag -> 30  + concrete_int_bag -> 31  + concrete_int_bag -> 32  + concrete_int_bag -> 33  + concrete_int_bag -> 34  + concrete_int_bag -> 35  + concrete_int_bag -> 36  + concrete_int_bag -> 37  + concrete_int_bag -> 38  + concrete_int_bag -> 39  + concrete_int_bag -> 40  + concrete_int_bag -> 41  + concrete_int_bag -> 42  + concrete_int_bag -> 43  + concrete_int_bag -> 44  + concrete_int_bag -> 46  + concrete_int_bag -> 47 
   , c7_VioletDef in partial_c7_VioletDef
   , c18_base in partial_c18_base
   , c29_MenuResources in partial_c29_MenuResources
   , c40_GraphUtility in partial_c40_GraphUtility
   , c51_ExtensionFilter in partial_c51_ExtensionFilter
   , c62_FileUtility in partial_c62_FileUtility
   , c73_InternalFrame in partial_c73_InternalFrame
   , c84_Read in partial_c84_Read
   , c90_FileMenu in partial_c90_FileMenu
   , c101_NewFile in partial_c101_NewFile
   , c132_UseCaseD in partial_c132_UseCaseD
    ,  c2_footprint in footprint_for_c7_VioletDef_of_18 + footprint_for_c18_base_of_3 + footprint_for_c29_MenuResources_of_3 + footprint_for_c40_GraphUtility_of_3 + footprint_for_c51_ExtensionFilter_of_3 + footprint_for_c62_FileUtility_of_3 + footprint_for_c73_InternalFrame_of_3 + footprint_for_c90_FileMenu_of_3 + footprint_for_c101_NewFile_of_0 + footprint_for_c132_UseCaseD_of_0
    ,  c3_usability in usability_for_c7_VioletDef_of_0 + usability_for_c18_base_of_0 + usability_for_c29_MenuResources_of_0 + usability_for_c40_GraphUtility_of_0 + usability_for_c51_ExtensionFilter_of_0 + usability_for_c62_FileUtility_of_0 + usability_for_c73_InternalFrame_of_0 + usability_for_c90_FileMenu_of_0 + usability_for_c101_NewFile_of_1 + usability_for_c132_UseCaseD_of_3
    ,  c5_portability in portability_for_c84_Read_of_4
    , r_c2_footprint in partial_c7_VioletDef->footprint_for_c7_VioletDef_of_18 + partial_c18_base->footprint_for_c18_base_of_3 + partial_c29_MenuResources->footprint_for_c29_MenuResources_of_3 + partial_c40_GraphUtility->footprint_for_c40_GraphUtility_of_3 + partial_c51_ExtensionFilter->footprint_for_c51_ExtensionFilter_of_3 + partial_c62_FileUtility->footprint_for_c62_FileUtility_of_3 + partial_c73_InternalFrame->footprint_for_c73_InternalFrame_of_3 + partial_c90_FileMenu->footprint_for_c90_FileMenu_of_3 + partial_c101_NewFile->footprint_for_c101_NewFile_of_0 + partial_c132_UseCaseD->footprint_for_c132_UseCaseD_of_0
    , r_c3_usability in partial_c7_VioletDef->usability_for_c7_VioletDef_of_0 + partial_c18_base->usability_for_c18_base_of_0 + partial_c29_MenuResources->usability_for_c29_MenuResources_of_0 + partial_c40_GraphUtility->usability_for_c40_GraphUtility_of_0 + partial_c51_ExtensionFilter->usability_for_c51_ExtensionFilter_of_0 + partial_c62_FileUtility->usability_for_c62_FileUtility_of_0 + partial_c73_InternalFrame->usability_for_c73_InternalFrame_of_0 + partial_c90_FileMenu->usability_for_c90_FileMenu_of_0 + partial_c101_NewFile->usability_for_c101_NewFile_of_1 + partial_c132_UseCaseD->usability_for_c132_UseCaseD_of_3
    , r_c5_portability in partial_c84_Read->portability_for_c84_Read_of_4
    , c2_footprint_ref in footprint_for_c7_VioletDef_of_18-> 18 + footprint_for_c18_base_of_3-> 3 + footprint_for_c29_MenuResources_of_3-> 3 + footprint_for_c40_GraphUtility_of_3-> 3 + footprint_for_c51_ExtensionFilter_of_3-> 3 + footprint_for_c62_FileUtility_of_3-> 3 + footprint_for_c73_InternalFrame_of_3-> 3 + footprint_for_c90_FileMenu_of_3-> 3 + footprint_for_c101_NewFile_of_0-> 0 + footprint_for_c132_UseCaseD_of_0-> 0
    , c3_usability_ref in usability_for_c7_VioletDef_of_0-> 0 + usability_for_c18_base_of_0-> 0 + usability_for_c29_MenuResources_of_0-> 0 + usability_for_c40_GraphUtility_of_0-> 0 + usability_for_c51_ExtensionFilter_of_0-> 0 + usability_for_c62_FileUtility_of_0-> 0 + usability_for_c73_InternalFrame_of_0-> 0 + usability_for_c90_FileMenu_of_0-> 0 + usability_for_c101_NewFile_of_1-> 1 + usability_for_c132_UseCaseD_of_3-> 3
    , c5_portability_ref in portability_for_c84_Read_of_4-> 4
}
run show for partial_speedup optimize o_global
