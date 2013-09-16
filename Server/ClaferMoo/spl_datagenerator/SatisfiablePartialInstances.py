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
    list_of_files = ["../dataset/apacheicse212.cfr", "../dataset/berkeleydbqualityjournal.cfr", "../dataset/berkeleydbsplc2011.cfr", 
                     "../dataset/linkedlistsplc2011.cfr", "../dataset/pkjabsplc2011.cfr", "../dataset/prevaylersplc2011.cfr", "../dataset/sqlitesplc2011.cfr",
                     "../dataset/violetsplc2011.cfr", "../dataset/zipmesplc2011.cfr"]
    
    satisfiable_partial_instances = [ "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_1.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_2.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_3.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_7.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_9.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_10.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_11.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_12.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_13.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/apacheicse212_14.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_5.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_16.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_17.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_19.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_20.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_25.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_27.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_30.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_32.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbqualityjournal_40.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_1.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_2.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_4.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_5.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_6.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_8.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_11.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_13.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_14.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/berkeleydbsplc2011_15.als"
                ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_14.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_18.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_19.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_24.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_33.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_37.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_38.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_40.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_46.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/pkjabsplc2011_50.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_1.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_3.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_4.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_5.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_6.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_10.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_11.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_12.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_13.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/prevaylersplc2011_15.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_22.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_27.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_31.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_52.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_94.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_1.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_2.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_6.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_8.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_11.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_12.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_13.als", 
                "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_17.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_31.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/zipmesplc2011_32.als"
                ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_104.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_123.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_129.als", "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_148.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/sqlitesplc2011_192.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_9.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_16.als"
                ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_42.als"
                ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_46.als"
                ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_98.als" 
                ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_137.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_170.als"    
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_239.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_276.als"
                , "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/partial_configurations_dataset/linkedlistsplc2011_283.als"]
    
    for filename in satisfiable_partial_instances:
        
        clafer_filename_satisfiable = filename[:-4] + ".cfr"
        clafer_satisfiable_model = open(filename[:-4] + ".cfr")
        source_file =  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/dataset/" + clafer_filename_satisfiable[clafer_filename_satisfiable.rfind("/")+1:clafer_filename_satisfiable.rfind("_")] + ".cfr"

#        print "SourceFile: " + source_file
        dest_file  = clafer_filename_satisfiable.replace("partial_configurations_dataset", "satisfiable_partial_configurations_dataset")
        print "\"" + dest_file + "\", "
        
        
#        print "DestFile" + dest_file

        subprocess.check_output(["cp", source_file , dest_file]) 
        source_fp = open(source_file, "r")
        dest_fp = open(dest_file, "w")
        
        for line_source in source_fp.readlines():
            dest_fp.write(line_source)
            if line_source.find('simpleConfig')!=-1:
                print_next = False
                for line in clafer_satisfiable_model.readlines():
                    if line.find('simpleConfig')!=-1:
                        print_next = True
                    elif print_next == True:
                        dest_fp.write(line)
                        print_next = False
        dest_fp.write("\n")
        dest_fp.close()
        print clafer_filename_satisfiable

            
        
        

                    

execute_main()