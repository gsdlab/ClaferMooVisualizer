'''
Created on Aug 13, 2012

@author: rafaelolaechea
'''
import argparse
import subprocess
import os
from xml_parser_helper import load_xml_model
from spl_claferanalyzer import SPL_ClaferAnalyzer
from AppendPartialInstanceAndGoals import generate_and_append_partial_instances_and_gaols  
from AlloyBackToClafer import show_clafer
from ExpandSumOperator import expand_feature_types_sum
from ConstraintProgramming import print_conversion_to_constraints


def execute_main():
    parser = argparse.ArgumentParser(description="Generates optimal instances" \
                                     "out of an attributed feature model" )
									 
    parser.add_argument('clafer_feature_model_filename', metavar='F', type=str, nargs=1,
                       help='Attributed Feature Model in clafer filename')
					   
    args = parser.parse_args()
    filename = args.clafer_feature_model_filename[0]
	
    preserve_clafer_names = True
	
    subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], \
                            stderr=subprocess.STDOUT)       
							
    spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")    
    expand_feature_types_sum(filename, spl_transformer)


    filename = filename[:-4] +  "_desugared.cfr"

    subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], \
                            stderr=subprocess.STDOUT)    
    spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")     
    subprocess.check_output(["clafer",  '--nr', filename], stderr=subprocess.STDOUT)

    als_fp = open(filename[:-4] + ".als", "a")
    generate_and_append_partial_instances_and_gaols(filename[:-4] + ".xml", als_fp)
    als_fp.close()
    
    remove_alloy_solutions()   

    choco_fp = open(filename[:-4] + ".choco", "w")
    print_conversion_to_constraints(spl_transformer, choco_fp)
    choco_fp.close()



    print "Runing  alloy on generated als "

    subprocess.check_output(["java", '-Xss3m', '-Xms512m', '-Xmx1024m',  '-jar', 'ClaferMoo/spl_datagenerator/../tools/multiobjective_alloy_cmd.jar', (filename[:-4] + ".als")], \
                            stderr=subprocess.STDOUT)
    print "Finished Running alloy on generated als."    
    print "====="

    show_clafers_from_alloy_solutions(preserve_clafer_names, spl_transformer)
     

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

def remove_alloy_solutions():
    j =1;
    while(os.path.exists("alloy_solutions_" + str(j)+ ".xml") or j < 10):
        if os.path.exists("alloy_solutions_" + str(j)+ ".xml"):
            os.remove("alloy_solutions_" + str(j)+ ".xml")        
        j += 1
                              
if __name__ == '__main__':
    execute_main()