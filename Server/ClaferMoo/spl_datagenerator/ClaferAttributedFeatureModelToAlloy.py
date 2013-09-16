'''
Created on Jul 29, 2012

@author: rafaelolaechea
'''
import subprocess
from AppendPartialInstanceAndGoals import generate_and_append_partial_instances_and_goals  
from spl_claferanalyzer import SPL_ClaferAnalyzer

def execute_main():
    spl_names = ["apacheicse212", "berkeleydbqualityjournal", "berkeleydbsplc2011", 
                     "linkedlistsplc2011", "pkjabsplc2011", "prevaylersplc2011", "sqlitesplc2011",
                      "zipmesplc2011"]
    satisfiable_partialconfigurations = [
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
    
    satisfiable_partialconfigurations =  [ 
        "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/apacheicse212.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/berkeleydbqualityjournal.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/berkeleydbsplc2011.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/linkedlistsplc2011.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/pkjabsplc2011.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/prevaylersplc2011.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/sqlitesplc2011.cfr"
        ,"/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/zipmesplc2011.cfr"]

    satisfiable_partialconfigurations =  [ 
        "/Users/rafaelolaechea/Documents/workspace/2012-models-clafermultiobjective-data-generator/non_configured_dataset/sqlitesplc2011_no_omit.cfr"]

    for clafer_fname in satisfiable_partialconfigurations:    
        print ",  \"%s\"" % clafer_fname
        subprocess.check_output(["clafer",  '--mode=xml','--nr', clafer_fname], stderr=subprocess.STDOUT)        
        subprocess.check_output(["clafer",  '--nr', clafer_fname], stderr=subprocess.STDOUT)    
                
        als_fp = open(clafer_fname[:-4] + ".als", "a")
        generate_and_append_partial_instances_and_gaols(clafer_fname[:-4] + ".xml", als_fp)
        als_fp.close()
             
""" 
REWRITE ZIPME   
    for clafer_fname in satisfiable_partialconfigurations:
        if clafer_fname.find("zipmesplc2011")!=-1:
            fd_clafer = open(clafer_fname, "r")
            zipme_contents = fd_clafer.readlines()
            fd_clafer.close()
            fd_rewrite_clafer = open(clafer_fname, "w")
            for line in zipme_contents:
                if line.find("simpleZip : simpleConfig") != -1:
                    fd_rewrite_clafer.write("simpleConfig : ZipMeSPL\n")
                elif line.find("<< min simpleZip.total_footprint >>") != -1:
                    fd_rewrite_clafer.write("<< min simpleConfig.total_footprint >>\n")
                else :
                    fd_rewrite_clafer.write(line)
            fd_rewrite_clafer.close()
"""


execute_main()    