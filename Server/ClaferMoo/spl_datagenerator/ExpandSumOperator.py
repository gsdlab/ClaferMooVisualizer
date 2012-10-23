'''
Created on Aug 15, 2012

@author: rafaelolaechea
'''
import re

def expand_feature_types_sum(filename, spl_transformer):
    """
    Write Desugared Clafer, where sum FeatureType.property is transformed into FeatureX.proprty + FeatureY.property .... .    
    """    
    source_fp = open(filename, "r")
    lines_source = source_fp.readlines()
    source_fp.close()
    
    feature_types = ['IMeasurable']
    dest_desugared_fp = open(filename[:-4] + "_desugared.cfr", "w")
    for line_source in lines_source:
        for feature_type in feature_types:
            # TODO replace line_source.find with search in regex sum[whitespace]feature_type
            search_string = 'sum' + ' ' + feature_type
            if line_source.find(search_string)!=-1:                                                                 
                quality_property = extract_quality_property(line_source, search_string)

                newsum = " + ".join([ "%s.%s" % (spl_transformer.get_clafer_Id(feature), quality_property)  for feature  in spl_transformer.get_features_as_xml_elements()])
                
                new_line = line_source.replace(search_string + '.' + quality_property, newsum)
                                               
                dest_desugared_fp.write(new_line)                
            else:
                dest_desugared_fp.write(line_source)    
    dest_desugared_fp.close()
    
def extract_quality_property(line_source, search_string):
    """
    Given a line [ xxx = sum FeatureType.property ] , returns property
    """
    quality_property_regex = re.compile(r'\.\w+')
    match = quality_property_regex.search(line_source[line_source.find(search_string) + len(search_string):])
    quality_property =  match.group(0)[1:]
    return quality_property