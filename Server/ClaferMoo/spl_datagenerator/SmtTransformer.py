'''
Created on Aug 20, 2012

@author: rafaelolaechea
'''


def print_feature_model_converted_to_z3(spl_transformer, fp_out):
    fp_out.write("from z3 import *\n")
    num_features = 0
    # Feature Bitvector  
    fp_out.write("FeatureIndexMap = {}\n")   
    fp_out.write("FeatureVariable = []\n")       
    
    fp_out.write("FeatureIndexMap['%s'] = %s \n" % \
     (spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model()), num_features))
    
    fp_out.write("%s = Bool('%s') \n" %  ( spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model()),
         spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model())))

    fp_out.write("FeatureVariable.append(%s) \n" %  \
         spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model()))

    num_features += 1
    
    for feature in spl_transformer.get_features_as_xml_elements():
        fp_out.write("FeatureIndexMap['%s']=%s\n" % \
                    (spl_transformer.get_clafer_UniqueId(feature), \
                     num_features))
        fp_out.write("%s = Bool('%s') \n" %  ( spl_transformer.get_clafer_UniqueId(feature),\
                                                spl_transformer.get_clafer_UniqueId(feature) ))
        fp_out.write("FeatureVariable.append(%s) \n" %  \
                     spl_transformer.get_clafer_UniqueId(feature))
        num_features += 1         

    
    fp_out.write("s = Solver()\n")
    
    
    # Children Implies Parent Constraint
    for parent_id in spl_transformer.get_parentToChildMapping().keys():
        for child_id in spl_transformer.get_children(parent_id):
            if not spl_transformer.is_product_level_attribute(child_id):                
                fp_out.write("s.add(Implies(%s, %s))\n" % (child_id, parent_id))
                
    # Children Equals Parent Constraint for Mandatory Children
    for parent_id in spl_transformer.get_parentToChildMapping().keys():
        for child_id in spl_transformer.get_children(parent_id):
            if not spl_transformer.is_product_level_attribute(child_id): 
                child_xml = spl_transformer.get_xml_elmenet_from_uniqueId(child_id)
                (intervalMin, intervalMax) =  spl_transformer.get_cardinailty_info(child_xml)
                if (intervalMin > 0):
                    fp_out.write("s.add(%s == %s)\n" % ( child_id, parent_id))
    
    # Exclusive Or Constraints
    for parent_id in spl_transformer.get_exclusive_ors():
        for children_set_to_true_id in spl_transformer.get_children(parent_id):   
            # E.g : s.add(c16_GPS == And(Not(c27_RadioTriangulation), c5_LocationFinding))         
            other_children = [other_child_id for other_child_id in  spl_transformer.get_children(parent_id) if other_child_id != children_set_to_true_id]
            all_other_children_false_array_helper = ['Not(%s)' % other_child  for other_child in other_children]
            
            all_other_other_children_and_parent_array_helper = all_other_children_false_array_helper
            all_other_other_children_and_parent_array_helper.append('%s' % parent_id)
            
            all_other_children_false_and_parent_true = "And(%s)" % ','.join(all_other_other_children_and_parent_array_helper)
            fp_out.write("s.add(%s == %s)\n" % ( children_set_to_true_id, all_other_children_false_and_parent_true))
              
    
    
    # Nonfunctional Variables
    NFP_NameArray = []
    for productlevel_nfp_attribute_unique_id in \
        [spl_transformer.get_non_functional_property_unique_id(nfp_clafer_id) \
         for nfp_clafer_id in spl_transformer.get_non_functional_properties_listing()]:
            fp_out.write("total_%s = Int('total_%s')\n" % (productlevel_nfp_attribute_unique_id, productlevel_nfp_attribute_unique_id))
            NFP_NameArray.append("total_%s" % productlevel_nfp_attribute_unique_id)

    # Contributions of each feature to product level NFP.
    for FeatureType in spl_transformer.FeatureTypes:
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        #print "%s -- " % spl_transformer.getFeatureAttributes(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):
            #print "Feature Attribute %s ||" % non_functional_property_unique_id            
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)
            var_list = []
            for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId): 
                childFeature_unique_id = spl_transformer.get_clafer_UniqueId(childFeature)
                non_functional_property_value = spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id)
                var_list.append("%s*If(%s, 1, 0)\\\n" % \
                              (non_functional_property_value,                               
                              childFeature_unique_id))
            fp_out.write( ("s.add(total_%s==  " % non_functional_property_unique_id) + " + ".join(var_list) + ")\n")
                    
    # There it at least one system.
    fp_out.write("s.add(%s==True)\n" %  spl_transformer.get_clafer_UniqueId(spl_transformer.get_top_level_SPL_model()))
    
    fp_out.write("metrics_variables = [" +  ",".join(NFP_NameArray) + "]\n")
    fp_out.write("from spl_datagenerator.GIAforZ3 import GuidedImprovementAlgorithm\n")
    fp_out.write("GuidedImprovementAlgorithm(s, metrics_variables)")
    # Implementing GIA s.add(Or(And(total_c3_cost < 760, total_c2_RampUpTime <= 53), And(total_c3_cost <= 760, total_c2_RampUpTime < 53))).
    
    for FeatureType in spl_transformer.FeatureTypes:
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        #print "%s -- " % spl_transformer.getFeatureAttributes(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):
            #print "Feature Attribute %s ||" % non_functional_property_unique_id            
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)
            var_list = []
            for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId): 
                childFeature_clafer_id = spl_transformer.get_clafer_Id(childFeature)
                childFeature_unique_id = spl_transformer.get_clafer_UniqueId(childFeature)
                non_functional_property_value = spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id)

                fp_out.write("%s,%s,%s\n" % (childFeature_clafer_id, non_functional_property_clafer_id, non_functional_property_value))

    