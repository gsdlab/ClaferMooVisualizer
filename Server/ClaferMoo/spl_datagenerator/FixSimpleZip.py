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
    
    files_to_fix = [
        "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_1.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_2.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_6.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_8.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_11.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_12.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_13.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_17.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_31.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_32.cfr"                    
                    ]
    
    for filename in files_to_fix:                
        source_fp = open(filename, "r")

        lines_source = source_fp.readlines()
        source_fp.close()
        
        dest_fp = open(filename, "w")
        
        print filename
        for line_source in lines_source:
            if line_source.find('ZipMeSPL.total_footprint')==-1:
                dest_fp.write(line_source)
            else:
                line_source = line_source.replace("ZipMeSPL", "simpleConfig")
                dest_fp.write(line_source)
        dest_fp.close()        
        

"""
                if line_source.find('simpleZip')==-1:
                    print "preserving %s" %  line_source                   
                    dest_fp.write(line_source)
                else:
                    print "DOING REPLACEMENT"
                    line_source = line_source.replace("simpleZip", "simpleConfig")
                    print "TO GET %s " % line_source
                    dest_fp.write(line_source)                    
            else:
                line_source = line_source.replace("simpleConfig", "ZipMeSPL")
                dest_fp.write(line_source)
"""        

            
        
        

                    

execute_main()