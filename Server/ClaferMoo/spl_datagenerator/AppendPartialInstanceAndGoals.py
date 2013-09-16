'''
Created on Jul 29, 2012

@author: rafaelolaechea
'''
import argparse
from xml.etree import ElementTree

from xml_parser_helper import load_xml_model
import spl_claferanalyzer
import math

_namespaces = {'c1': 'http://gsd.uwaterloo.ca/clafer', 'xsi': 'http://www.w3.org/2001/XMLSchema-instance'}


def generate_and_append_partial_instances_and_goals(xml_filename, als_filehandle):
        
    spl_transformer =  spl_claferanalyzer.SPL_ClaferAnalyzer(xml_filename)

    als_filehandle.write("sig bag_extra_ints{\n")
    als_filehandle.write("  extra_ints : set Int\n")
    als_filehandle.write("}\n")

    als_filehandle.write("inst partial_speedup {\n")
    als_filehandle.write("    1\n")
      
    extra_integers = spl_transformer.get_set_extra_integers_from_feature_model()        
    als_filehandle.write("    ,bag_extra_ints = concrete_int_bag\n")
    als_filehandle.write("    , extra_ints = ")
    als_filehandle.write(' + '.join(["concrete_int_bag -> %s " % (extra_integer,)  for extra_integer in extra_integers]) + "\n")

    write_partial_instance_element_for_each_feature(als_filehandle, spl_transformer)
    write_partial_instance_elements_for_each_non_functional_property(als_filehandle, spl_transformer)
    write_partial_instance_elements_for_each_non_functional_property_rel(als_filehandle, spl_transformer)

    write_partial_instance_number_container_to_number_rel(als_filehandle, spl_transformer)

    als_filehandle.write("}\n")
    als_filehandle.write("run show for partial_speedup optimize o_global\n")
            
def write_partial_instance_element_for_each_feature(als_filehandle, spl_transformer):
    for clafer_features in spl_transformer.get_features_as_xml_elements():
        als_filehandle.write("   , %s in partial_%s\n" %  (spl_transformer.get_clafer_UniqueId(clafer_features), spl_transformer.get_clafer_UniqueId(clafer_features) ))        


def write_partial_instance_elements_for_each_non_functional_property(als_filehandle, spl_transformer):
    for FeatureType in spl_transformer.FeatureTypes:
        #print spl_transformer.get_clafer_UniqueId(FeatureType)
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):   
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)
            als_filehandle.write("    ,  %s in " % non_functional_property_unique_id)
            FeatureTypeChildren_pattern = []
            for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId):
                FeatureTypeChildren_pattern.append("%s_for_%s_of_%s" % (non_functional_property_clafer_id, \
                                                                    spl_transformer.get_clafer_UniqueId(childFeature), \
                                                                    spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id).replace('-', 'minus')))                       
            als_filehandle.write(' + '.join(FeatureTypeChildren_pattern) + "\n")
            
            #print "Children of FeatureType %s,  %s " % (FeatureType, \
            #                                            str([spl_transformer.get_clafer_UniqueId(x) for x in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId)]))
    
def write_partial_instance_elements_for_each_non_functional_property_rel(als_filehandle, spl_transformer):
    for FeatureType in spl_transformer.FeatureTypes:
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)
            als_filehandle.write('    , r_%s in '  % non_functional_property_unique_id)
            als_filehandle.write(' + '.join([ "partial_%s->%s_for_%s_of_%s" % (spl_transformer.get_clafer_UniqueId(childFeature), \
                                                                non_functional_property_clafer_id, \
                                                                spl_transformer.get_clafer_UniqueId(childFeature) , \
                                                                spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id).replace('-', 'minus') )   \
                     for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId)]) + "\n")            

def write_partial_instance_number_container_to_number_rel(als_filehandle, spl_transformer):
    for FeatureType in spl_transformer.FeatureTypes:
        FeatureType_UniqueId = spl_transformer.get_clafer_UniqueId(FeatureType)
        for non_functional_property_unique_id in spl_transformer.getFeatureAttributes(FeatureType):            
            non_functional_property_clafer_id = spl_transformer.convert_ClaferUniqueId_to_ClaferId(non_functional_property_unique_id)

            als_filehandle.write('    , r_%s in ' % non_functional_property_unique_id)

            als_filehandle.write(' + '.join([ "%s_for_%s_of_%s-> %s" % ( non_functional_property_clafer_id , \
                                                          spl_transformer.get_clafer_UniqueId(childFeature), \
                                                          spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id).replace('-', 'minus'),  \
                                                          spl_transformer.get_property_value(childFeature, non_functional_property_clafer_id) )   \
                     for childFeature in spl_transformer.get_features_as_xml_elements(FeatureType_UniqueId)]) + "\n")    
            
def fix_refs(als_read, als_write, xml_filename):
    spl_transformer =  spl_claferanalyzer.SPL_ClaferAnalyzer(xml_filename)

    filters = []
    for non_functional_property in spl_transformer.non_functional_properties:
        filters.append(spl_transformer.get_non_functional_property_unique_id(non_functional_property))

    for goal in spl_transformer.get_goals_unique_id():
        filters.append(goal)

    for line in als_read:
        for filt in filters:
            line = line.replace(filt + "_ref", "ref")
        als_write.write(line)


