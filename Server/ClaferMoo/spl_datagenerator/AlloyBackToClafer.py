'''
Created on Aug 14, 2012

@author: rafaelolaechea
'''
import re, os
from xml_parser_helper import load_xml_model

def show_clafer(element, tab_count,  instance_xml, preserve_clafer_names, spl_transformer):
    """
    Recursively shows clafer, as well as return a set of values for product-level attributes.
    """
    element_sig, element_atom = element
    
    for i in range(tab_count):
        print "\t",
        
    ProductLevelAttribute_Values = set()
    
    print convert_ClaferUniqueIdLabel_to_ClaferName(element_sig.get('label'), preserve_clafer_names, spl_transformer),
    
    if is_value_clafer(element, instance_xml):
        print " =  %s" % get_value_clafer(element, instance_xml),
        if spl_transformer.is_product_level_attribute(convert_ClaferUniqueIdLabel_toUnquiID(element_sig.get('label')))== True:
            ProductLevelAttribute_Values.add(int(get_value_clafer(element, instance_xml)))
    elif has_super_clafer(element, instance_xml):
        print ": %s" %  get_super_clafer(element, instance_xml, preserve_clafer_names),
        
    print ""
    
    
    for children in get_children(element, instance_xml, spl_transformer):
        child_ProductLevelAttribute_Values = show_clafer(children, tab_count+1, instance_xml, preserve_clafer_names, spl_transformer)
        ProductLevelAttribute_Values = ProductLevelAttribute_Values.union(child_ProductLevelAttribute_Values)
    return ProductLevelAttribute_Values

def get_super_clafer(element, instance_xml, preserve_clafer_names):
        element_sig, element_atom = element
        parent_sig = instance_xml.find(".instance/sig[@ID='%s']" % element_sig.get('parentID'))  
        return convert_ClaferUniqueIdLabel_to_ClaferName( parent_sig.get('label'), preserve_clafer_names)
                                                              
def has_super_clafer(element, instance_xml):
    return is_value_clafer(element, instance_xml) == False

def get_value_clafer(element, instance_xml):
    """
    Extracting Clafer value from:  
        <field label="cx_claferid_ref">
            <tuple> <atom label="element_atom_label"> <atom label="#"> <tuple>
        </field>
    """
    element_sig, element_atom = element
    element_sig_unique_id = convert_ClaferUniqueIdLabel_toUnquiID(element_sig.get('label'))
    element_atom_label = element_atom.get('label')

    #find correct element
    elem_is_value = False
    check_next_elem = False
    for elem in instance_xml.findall(".instance/*"): 
        if check_next_elem == True and len(elem.findall(".[@label='ref']"))>0:
            element_found = elem
            break
        
        check_next_elem = False
        
        if elem == instance_xml.find(".instance/sig[@label='%s']" % ("this/" + element_sig_unique_id)):
            check_next_elem = True

    ret_val = None
    for field_tuple in element_found.findall("./tuple"):        
        tuple_atom_from_element = field_tuple.find("atom[@label='%s']" % element_atom_label)
        if tuple_atom_from_element != None:
            tuple_atom_to_integer = field_tuple.findall('atom')[1]
            ret_val      = tuple_atom_to_integer.get('label')
            break
    
    return ret_val

def is_value_clafer(element, instance_xml):
    element_sig, element_atom = element
    element_sig_unique_id = convert_ClaferUniqueIdLabel_toUnquiID(element_sig.get('label'))

    #find correct element
    elem_is_value = False
    check_next_elem = False
    for elem in instance_xml.findall(".instance/*"): 
        if check_next_elem == True and len(elem.findall(".[@label='ref']"))>0:
            elem_is_value = True
            break
        
        check_next_elem = False

        if elem == instance_xml.find(".instance/sig[@label='%s']" % ("this/" + element_sig_unique_id)):
            check_next_elem = True

    return elem_is_value

def get_children(element, instance_xml, spl_transformer):
    element_sig, element_atom = element
    element_atom_label = element_atom.get('label')
    children = []
    for sig in instance_xml.findall(".instance/sig"):
        if sig.get('label') != None \
                    and sig.get('label').startswith("this") \
                    and not sig.get('label').startswith("this/bag_extra_ints"):                
                for sig_atom in sig.findall('./atom'):                                    
                    field_query_string = "./instance/field[@label='%s']" %  ("r_"+  sig.get('label')[len("this/"):])
                    sig_atom_label = sig_atom.get('label')
                    
                    if len( instance_xml.findall(field_query_string)) > 0:
                        field_relationship = instance_xml.findall(field_query_string)[0]
                        field_types = field_relationship.findall("./types/type")
                        if len(field_types) >= 2:
                            for field_tuple in field_relationship.findall('./tuple'):
                                field_tuple_atoms = field_tuple.findall('./atom')
                                if len(field_tuple_atoms) >= 2:
                                    first_atom_label = field_tuple_atoms[0].get('label')                                                        
                                    second_atom_label = field_tuple_atoms[1].get('label')                                
                                    if first_atom_label == element_atom_label and \
                                        sig_atom_label == second_atom_label:
                                            children.append((sig, sig_atom))
    return children                                    

def convert_ClaferUniqueIdLabel_toUnquiID(UniqueIdLabel):
    regex_remove_pre = re.compile(r'this/')
    match = regex_remove_pre.search(UniqueIdLabel)
    return UniqueIdLabel.replace(match.group(0), '')
    
def convert_ClaferUniqueIdLabel_to_ClaferName(UniqueIdLabel, PreserveIDs, spl_transformer=None):  
    regex_remove_pre = re.compile(r'this/c\d+_')
    if PreserveIDs:
        regex_remove_pre = re.compile(r'this/')
    match = regex_remove_pre.search(UniqueIdLabel)
    return UniqueIdLabel.replace(match.group(0), '')

def show_clafers_from_alloy_solutions(preserve_clafer_names, spl_transformer):
    """
    Write Back Alloy Answer as Clafer, 
        : and return a list of sets for product-level attributes in the pareto front.    
    """
    configured_product_UniqueId = spl_transformer.get_clafer_UniqueId(spl_transformer.get_concrete_instance_as_xml_element())
    configured_product_label = "this/" + configured_product_UniqueId  
    product_level_values_list =[]
    i = 1
    while(os.path.exists("alloy_solutions_" + str(i)+ ".xml")):
        
        instance_xml = load_xml_model("alloy_solutions_"+ str(i) + ".xml")
        
        top_level_product_sig = instance_xml.find("./instance/sig[@label='%s']" % configured_product_label)
        top_level_product_atom = top_level_product_sig.find("./atom")
    
        product_level_values_list.append(show_clafer((top_level_product_sig, top_level_product_atom), 0, instance_xml, preserve_clafer_names, spl_transformer))
        #print "\n\n Product Level Values %s " % str(product_level_values) 
        i += 1
    return product_level_values_list