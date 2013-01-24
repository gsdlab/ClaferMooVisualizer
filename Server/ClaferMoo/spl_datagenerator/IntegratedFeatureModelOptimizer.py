'''
Created on Aug 13, 2012

@author: rafaelolaechea
'''
import argparse
import subprocess
import os
from xml_parser_helper import load_xml_model
from spl_claferanalyzer import SPL_ClaferAnalyzer
from ComputeRelaxedBoundsGoals import ComputeRelaxedBoundsGoalsCls
from AppendPartialInstanceAndGoals import generate_and_append_partial_instances_and_goals  
from AlloyBackToClafer import show_clafers_from_alloy_solutions
from ExpandSumOperator import expand_feature_types_sum
from ConstraintProgramming import print_conversion_to_constraints


def execute_main():
    parser = argparse.ArgumentParser(description="Generates optimal instances" \
                                     "out of an attributed feature model" )
									 
    parser.add_argument('clafer_feature_model_filename', metavar='F', type=str, nargs=1,
                       help='Attributed Feature Model in clafer filename')
					   
    parser.add_argument('--onlycomputerelaxedbounds',   dest='onlycomputerelaxedbounds',  action='store_true',
                       default=False, help='Only show a set of bounds for goals and dont do anything else')
        
    parser.add_argument('--noexecution',   dest='noexecution',  action='store_true',
                       default=False, help='Do not execute generated als file')
    
    parser.add_argument('--preservenames',   dest='preserve_clafer_names',  action='store_true',
                       default=False, help='Keep unique clafer names')
    
    args = parser.parse_args()
    filename = args.clafer_feature_model_filename[0]
	
    subprocess.check_output(["clafer",  '--mode=xml','--nr', filename])
#                           stderr=subprocess.STDOUT)       
							
    spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")
    

    if  args.onlycomputerelaxedbounds:
        BoundsGoalComputer =  ComputeRelaxedBoundsGoalsCls(spl_transformer)
        for lowerBound, UpperBound in BoundsGoalComputer.getSimpleBounds():
            print "%s,%s" % (lowerBound, UpperBound)
    else:
    	expand_feature_types_sum(filename, spl_transformer)
        filename = filename[:-4] +  "_desugared.cfr"

        subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], \
    	                        stderr=subprocess.STDOUT)    
    	
    	spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")     
    	subprocess.check_output(["clafer",  '--nr', filename], stderr=subprocess.STDOUT)

    	als_fp = open(filename[:-4] + ".als", "a")
    	generate_and_append_partial_instances_and_goals(filename[:-4] + ".xml", als_fp)
    	als_fp.close()
    
        remove_alloy_solutions()   
    
    	if not args.noexecution:
    		print "Running  alloy on generated als "

    		subprocess.check_output(["java", '-Xss3m', '-Xms512m', '-Xmx4096m',  '-jar', __file__[:-34] + '../tools/multiobjective_alloy_cmd.jar', (filename[:-4] + ".als")])
    		print "Finished Running alloy on generated als."    
    		print "====="
    		show_clafers_from_alloy_solutions(args.preserve_clafer_names, spl_transformer)
    



def remove_alloy_solutions():
    j =1;
    while(os.path.exists("alloy_solutions_" + str(j)+ ".xml") or j < 10):
        if os.path.exists("alloy_solutions_" + str(j)+ ".xml"):
            os.remove("alloy_solutions_" + str(j)+ ".xml")        
        j += 1
                              
if __name__ == '__main__':
    execute_main()