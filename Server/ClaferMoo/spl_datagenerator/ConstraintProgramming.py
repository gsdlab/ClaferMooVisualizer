'''
Created on Aug 20, 2012

@author: rafaelolaechea
'''
def print_conversion_to_constraints(spl_transformer, fp_out):
    c_index = 1

    # Mandatory features.    
    for mandatory_features in spl_transformer.get_mandatory_features():
        print "Adding Mandatory Feature %s" % mandatory_features
        fp_out.write("ConstraintMandatoryFeatures:c%s:Choco.eq(%s, 1)\n" %  (c_index, mandatory_features))
        c_index += 1
      

    for parent_id in spl_transformer.get_parentToChildMapping().keys():
        for child_id in spl_transformer.get_children(parent_id):
            if not spl_transformer.is_product_level_attribute(child_id):           
                # Child Implies Parent Constraint.
                fp_out.write("ConstraintChildrenImpliesParent:c%s:Choco.implies(Choco.eq(%s, 1), Choco.eq(%s, 1))\n" % (c_index, child_id, parent_id))
                c_index += 1
                
                # Child Equals Parent for Mandatory Child.
                child_xml = spl_transformer.get_xml_elmenet_from_uniqueId(child_id)
                (intervalMin, intervalMax) =  spl_transformer.get_cardinailty_info(child_xml)
                if (intervalMin > 0):
                    fp_out.write("ConstraintMandatoryChildEqualParent:c%s:Choco.eq(%s, %s)\n" % (c_index, child_id, parent_id))
                    c_index += 1

            
    # Exclusive Or Constraint.
    for parent_id in spl_transformer.get_exclusive_ors():
        for children_set_to_true_id in spl_transformer.get_children(parent_id):            
            other_children = [other_child_id for other_child_id in  spl_transformer.get_children(parent_id) if other_child_id != children_set_to_true_id]
            all_other_children_false_array_helper = ['Choco.not(Choco.eq(%s, 1))' % other_child  for other_child in other_children]
            
            all_other_other_children_and_parent_array_helper = all_other_children_false_array_helper
            all_other_other_children_and_parent_array_helper.append('Choco.eq(%s, 1)' % parent_id)
            
            all_other_children_false_and_parent_true = "Choco.and(%s)" % ','.join(all_other_other_children_and_parent_array_helper)
            fp_out.write("ConstraintExclusiveOr:c%s:Choco.ifOnlyIf(Choco.eq(%s, 1), %s)\n" % (c_index, children_set_to_true_id, all_other_children_false_and_parent_true))
            c_index += 1            
    
    # Or Constraint
    for parent_id in spl_transformer.get_ors():
        group_vars = 'GROUPVARS(%s)' % (','.join(spl_transformer.get_children(parent_id)))
        fp_out.write("ConstraintOr:c%s:Choco.ifOnlyIf(Choco.or(%s), Choco.eq(%s, 1))\n" % (c_index, group_vars, parent_id))
        c_index += 1
        
    # Cross Tree Constraints
    for ((claferIdImplicator,claferIdImplicatorValue), (claferIdImplied,claferIdImpliedValue))  in spl_transformer.get_crosstree_constraints():
        fp_out.write("ConstraintCrossTree:c%s:Choco.implies(Choco.eq(%s, %s), Choco.eq(%s, %s))\n" % \
                      (c_index, claferIdImplicator, claferIdImplicatorValue, claferIdImplied, claferIdImpliedValue))
        c_index += 1
                
    # Binary Variables.        
    for feature in spl_transformer.get_features_as_xml_elements():
        fp_out.write("BinaryVariable:%s\n" %  spl_transformer.get_clafer_UniqueId(feature)) 

    fp_out.write("BinaryVariable:%s\n" % spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model()))
    
    # Non Functional Requirements.            
    for productlevel_nfp_attribute_unique_id in \
        [spl_transformer.get_non_functional_property_unique_id(nfp_clafer_id) \
         for nfp_clafer_id in spl_transformer.get_non_functional_properties_listing()]:
            fp_out.write("ProductLevelNfpAttribute:%s\n" % productlevel_nfp_attribute_unique_id)
    
    # Contributions of each feature to product level NFP.
    for FeatureType in spl_transformer.FeatureTypes:
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):            
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)
            for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId): 
                childFeature_unique_id = spl_transformer.get_clafer_UniqueId(childFeature)
                non_functional_property_value = spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id)
                fp_out.write("ProductLevelNfpFeatureContribution:%s,%s,%s\n" % \
                              (productlevel_nfp_attribute_unique_id, 
                              childFeature_unique_id,
                              non_functional_property_value))

    for Objective, IsMaximize in spl_transformer.get_goals_as_tuple_xml_is_maximize(): 
        fp_out.write("ObjectiveSense:%s\n" %  IsMaximize)        
                