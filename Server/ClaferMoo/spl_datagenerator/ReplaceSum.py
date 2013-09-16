'''
Created on Jul 28, 2012

@author: rafaelolaechea
'''
import argparse
from xml.etree import ElementTree

import spl_claferanalyzer
from spl_claferanalyzer import SPL_ClaferAnalyzer
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
          "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_1.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_2.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_3.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_7.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_9.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_10.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_11.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_12.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_13.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/apacheicse212_14.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_5.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_16.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_17.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_19.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_20.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_25.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_27.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_30.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_32.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbqualityjournal_40.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_1.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_2.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_4.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_5.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_6.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_8.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_11.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_13.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_14.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/berkeleydbsplc2011_15.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_14.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_18.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_19.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_24.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_33.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_37.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_38.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_40.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_46.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/pkjabsplc2011_50.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_1.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_3.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_4.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_5.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_6.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_10.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_11.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_12.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_13.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/prevaylersplc2011_15.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_22.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_27.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_31.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_52.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_94.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_104.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_123.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_129.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_148.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/sqlitesplc2011_192.cfr"        
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_1.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_2.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_6.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_8.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_11.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_12.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_13.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_17.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_31.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/zipmesplc2011_32.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_9.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_16.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_42.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_46.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_98.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_137.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_170.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_239.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_276.cfr"
        ,  "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/satisfiable_partial_configurations_dataset/linkedlistsplc2011_283.cfr"
                                         ] 
    
    for filename in files_to_fix:                
        source_fp = open(filename, "r")

        lines_source = source_fp.readlines()
        source_fp.close()
        
        
        print filename
        subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], stderr=subprocess.STDOUT)        
        subprocess.check_output(["clafer",  '--nr', filename], stderr=subprocess.STDOUT) 
        
        spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")
        
        dest_fp = open(filename, "w")
        for line_source in lines_source:
            if line_source.find('sum IMeasurable')!=-1:
                print line_source,
                
                if line_source.find('sum IMeasurable.footprint') != -1:           
                    new_sum = " + ".join([ "%s.footprint" % spl_transformer.get_clafer_Id(feature)  for feature  in spl_transformer.get_features_as_xml_elements()])
                    line_source = line_source.replace('sum IMeasurable.footprint', new_sum)
                    print line_source
                    dest_fp.write(line_source)                    
                elif line_source.find('sum IMeasurable.price')!=-1:
                    new_sum = " + ".join([ "%s.price" % spl_transformer.get_clafer_Id(feature)  for feature  in spl_transformer.get_features_as_xml_elements()])
                    line_source = line_source.replace('sum IMeasurable.price', new_sum)
                    print line_source
                    dest_fp.write(line_source)                    
                elif line_source.find('sum IMeasurable.reliability')!=-1:
                    new_sum = " + ".join([ "%s.reliability" % spl_transformer.get_clafer_Id(feature)  for feature  in spl_transformer.get_features_as_xml_elements()])
                    line_source = line_source.replace('sum IMeasurable.reliability', new_sum)
                    print line_source
                    dest_fp.write(line_source)                    
                elif line_source.find('sum IMeasurable.performance')!=-1:
                    new_sum = " + ".join([ "%s.performance" % spl_transformer.get_clafer_Id(feature)  for feature  in spl_transformer.get_features_as_xml_elements()])
                    line_source = line_source.replace('sum IMeasurable.performance', new_sum)
                    print line_source
                    dest_fp.write(line_source)
                else:
                    dest_fp.write(line_source)
            else:
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