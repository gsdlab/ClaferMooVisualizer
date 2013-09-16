'''
Created on Jul 28, 2012

@author: rafaelolaechea
'''
import argparse
from xml.etree import ElementTree

import spl_claferanalyzer
import random
import subprocess

_namespaces = {'c1': 'http://gsd.uwaterloo.ca/clafer', 'xsi': 'http://www.w3.org/2001/XMLSchema-instance'}


def execute_main():

    """
    Creates 99 partial configurations for the clafer models given.
    """       
    #list_of_files = ["../dataset/apacheicse212.cfr", "../dataset/berkeleydbqualityjournal.cfr", "../dataset/berkeleydbsplc2011.cfr", 
    #                 "../dataset/linkedlistsplc2011.cfr", "../dataset/pkjabsplc2011.cfr", "../dataset/prevaylersplc2011.cfr", "../dataset/sqlitesplc2011.cfr",
    #                 "../dataset/violetsplc2011.cfr", "../dataset/zipmesplc2011.cfr"]
    
    
    for clafer_filename in ["../dataset/linkedlistsplc2011.cfr" ]: # "../dataset/sqlitesplc2011.cfr", "../dataset/violetsplc2011.cfr" ]:
        spl_transformer =  spl_claferanalyzer.SPL_ClaferAnalyzer(clafer_filename, load_from_xml_file=False)
        
    
        clafer_model_name = clafer_filename[clafer_filename.rfind('/')+1:-4]
        
        clafer_model_no_attributes = open(clafer_filename[:-4] + "_noattributes.cfr").readlines()
        output_folder = "../partial_configurations_dataset/"
        
        for i in range(200,500):
            output_fname = output_folder + clafer_model_name + "_" + str(i) +".cfr"
            file_ouptut = open( output_folder + clafer_model_name + "_" + str(i) +".cfr", "w")
            for line in clafer_model_no_attributes:
                file_ouptut.write(line)
            file_ouptut.write("simpleConfig : %s \n" % spl_transformer.get_clafer_Id(spl_transformer.get_top_level_SPL_model()))
            undecided, true, false = 0, 1, 2
            file_ouptut.write("\t[ ")
            
            FeaturesFacts = []
            # Print partial instances of individual features, children of IMeasurable.
            for clafer_features in spl_transformer.get_features_as_xml_elements():
                 feature_value = random.choice([undecided, true, false])
                 if feature_value == true:
                     FeaturesFacts.append(spl_transformer.get_clafer_Id(clafer_features))
                 elif feature_value == false:
                     FeaturesFacts.append("!" + spl_transformer.get_clafer_Id(clafer_features))
            file_ouptut.write(" && ".join(FeaturesFacts))
            file_ouptut.write(" ]\n")
            file_ouptut.close()
            
            subprocess.check_output(["clafer", '--nr', output_fname], stderr=subprocess.STDOUT)
            
            als_fp = open(output_fname[:-4] + ".als", "a")
            als_fp.write("\nrun show for 1 \n")
            als_fp.close()
   

execute_main()