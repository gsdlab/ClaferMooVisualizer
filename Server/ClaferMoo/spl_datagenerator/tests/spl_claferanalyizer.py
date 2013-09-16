'''
Created on Aug 28, 2012

@author: rafaelolaechea
'''
import unittest
import subprocess
from spl_datagenerator.spl_claferanalyzer import SPL_ClaferAnalyzer
from spl_datagenerator.ExpandSumOperator import expand_feature_types_sum
from spl_datagenerator.AppendPartialInstanceAndGoals import generate_and_append_partial_instances_and_goals  
from spl_datagenerator.IntegratedFeatureModelOptimizer import remove_alloy_solutions, show_clafers_from_alloy_solutions
from spl_datagenerator.ConstraintProgramming import print_conversion_to_constraints
from spl_datagenerator.xml_parser_helper import load_xml_model

class Test(unittest.TestCase):
    src_filenames = ["../../testset/linkedlistsplc2011.cfr", \
                      "../../testset/apacheicse2012.cfr",  \
                      "../../testset/sqlitesplc2011.cfr"] 
    
    src_filenames_FeatureHierarchy =  [ "../../testset/SearchAndRescueSystem_IlustrateFeatureHierarchyBug.cfr" ]
    
    src_parsers = []   
    src_parsers_FeatureHierarchy = []

    src_DirectChildrenOfRootElement = [["AbstractElement" , "AbstractIterator", "AbstractSort", "print", "Measurement", "Base", "total_footprint"],\
                                       ["Base", "HostnameLookups", "KeepAlive", "EnableSendfile",   "FollowSymLinks", "AccessLog", "ExtendedStatus", "InMemory", "Handle", "total_performance"], 
                                       ["OperatingSystemCharacteristics", "EnableFeatures", "DisableFeatures", "OmitFeatures", "SQLITE_DEBUG", "SQLITE_MEMDEBUG", "total_footprint"] ]

    src_ExclusiveOrs_InList = [["AbstractElement", "AbstractIterator", "AbstractSort"], \
                               [], \
                               ["ChooseSQLITE_TEMP_STORE", "ChooseMemSys" ]]
    src_ExclusiveOrs_NotInList = [["SyntheticPerformanceOrMemorySize"], [], ["SQLITE_SECURE_DELETE"]]
   
    src_CrossTreeConstraint_InList = [[(("Measurement", 1), ("AbstractSort", 1))], \
                                       [(("InMemory", 1), ("Handle", 0))], \
                                       [(("SQLITE_ENABLE_COLUMN_METADATA", 1), ("SQLITE_OMIT_DECLTYPE", 0)), \
                                                (("SQLITE_OMIT_DECLTYPE", 1), ("SQLITE_ENABLE_COLUMN_METADATA", 0)) ]]
   
    src_NonFunctionalProperties_InList = [["footprint"], \
                                          ["performance"], \
                                          ["footprint"]]
                                        
    src_GoalSize = [1, 1, 1]
    src_GoalDirectionIsMax = [[False], [True], [False]]
    
    src_ParetoFrontProductLevelAttributeValues = [set([443]), set([296]), set([-299])]
    src_ParetoFrontProductLevelAttributeValues_FeatureHierarchy = [set([80,6,8,0])]
    
    def setUp(self):
        self.src_parsers = []
        all_files = list(self.src_filenames)
        all_files.extend(self.src_filenames_FeatureHierarchy)
        
        for filename in all_files:
            original_filename = filename
            subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], \
                                    stderr=subprocess.STDOUT)       
           
            
            spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml")    
            expand_feature_types_sum(filename, spl_transformer)
        
        
            filename = filename[:-4] +  "_desugared.cfr"
        
            subprocess.check_output(["clafer",  '--mode=xml','--nr', filename], \
                                    stderr=subprocess.STDOUT)    
            spl_transformer = SPL_ClaferAnalyzer(filename[:-4] + ".xml") 
            subprocess.check_output(["clafer",  '--nr', filename], \
                                    stderr=subprocess.STDOUT)    
            

            als_fp = open(filename[:-4] + ".als", "a")
            generate_and_append_partial_instances_and_goals(filename[:-4] + ".xml", als_fp)
            als_fp.close()
            
            if original_filename in self.src_filenames:
                print "Adding %s to parsers " %  original_filename
                print "filenames is %s " % self.src_filenames
                self.src_parsers.append(spl_transformer)                
            else:
                print "Adding %s to parsers Feature Hierarchy " %  original_filename                
                self.src_parsers_FeatureHierarchy.append(spl_transformer)

    def test_featurechildren(self):
        i = 0
        for spl_transformer in self.src_parsers:
            top_level_model = spl_transformer.get_top_level_SPL_model()
            children_unique_ids = spl_transformer.get_children(spl_transformer.get_clafer_UniqueId( top_level_model))
            self.assert_(((len(self.src_DirectChildrenOfRootElement[i]) == len(children_unique_ids), \
                          "Incorrect Length of obtained direct children of root. We have %s elements but expected  %s." %  \
                            ((len(self.src_DirectChildrenOfRootElement[i])), len(children_unique_ids)) \
                          )))
            self.assert_([spl_transformer.convert_ClaferUniqueId_to_ClaferId(x) for x in children_unique_ids] == self.src_DirectChildrenOfRootElement[i], \
                         "Different direct children for %s . Expected %s, received %s " % \
                         (self.src_filenames[i] , str(self.src_DirectChildrenOfRootElement[i]), str([spl_transformer.convert_ClaferUniqueId_to_ClaferId(x) for x in children_unique_ids])  ) )
            i += 1

    def test_get_goals_as_tuple_xml_is_maximize(self):
        i = 0
        for spl_transformer in self.src_parsers:
            current_gaols = spl_transformer.get_goals_as_tuple_xml_is_maximize()
            self.assert_(len(current_gaols) == self.src_GoalSize[i], \
                         "Number of goals for %s  was %s, expected %s " % \
                         (self.src_filenames[i], len(current_gaols) , self.src_GoalSize[i]))
            j = 0
            for element, isMaximize in current_gaols:
                self.assertEqual(isMaximize, self.src_GoalDirectionIsMax[i][j], "Goal direction for %s didn't match" % \
                                   (self.src_filenames[i],) )
                j += 1
                #print "Goalelement=%s , isMaximize=%s" % (element, isMaximize)
            i += 1
            
    def test_get_exclusive_ors(self): 
        i = 0
        for spl_transformer in self.src_parsers:
            list_exclusive_ors = spl_transformer.get_exclusive_ors()
            list_eclusive_ors_as_clafer_ids = [spl_transformer.convert_ClaferUniqueId_to_ClaferId(x) for x in list_exclusive_ors]
            for claferElementIn in self.src_ExclusiveOrs_InList[i]:
                print list_eclusive_ors_as_clafer_ids          
                print claferElementIn   
                self.assertIn(claferElementIn, list_eclusive_ors_as_clafer_ids, "Checking listing of Exclusive Ors is complete.")   

            for claferElementOut in self.src_ExclusiveOrs_NotInList[i]:
                self.assertNotIn(claferElementOut, list_eclusive_ors_as_clafer_ids, "Checking listing of Exclusive Ors is sound")
            i += 1
    def test_crossTreeConstraints(self):
        i = 0
        for spl_transformer in self.src_parsers:
            list_implications = []
            for ((claferIdImplicator,claferIdImplicatorValue), (claferIdImplied,claferIdImpliedValue))  in spl_transformer.get_crosstree_constraints():
                list_implications.append(((spl_transformer.convert_ClaferUniqueId_to_ClaferId(claferIdImplicator),claferIdImplicatorValue),\
                                           (spl_transformer.convert_ClaferUniqueId_to_ClaferId(claferIdImplied),claferIdImpliedValue)))
            
            #print list_implications
            for TupleInCrossTreeConstraints in self.src_CrossTreeConstraint_InList[i]:
                #print "Checking %s" % str(TupleInCrossTreeConstraints)
                self.assertIn(TupleInCrossTreeConstraints, list_implications, "Cross Tree Constraint Listing is complete")
            i += 1

    def test_non_functional_properties(self):
        i = 0
        for spl_transformer in self.src_parsers:
            nfp_claferids = spl_transformer.non_functional_properties.keys()
            for nfp_claferid in self.src_NonFunctionalProperties_InList[i]:
                self.assertIn(nfp_claferid, nfp_claferids, "File %s, missing nfp %s, only have %s"  % \
                              (self.src_filenames[i], nfp_claferid, nfp_claferids) )
            i += 1
                    
    def test_IntegratedClaferUsingConstraintSolverBackend(self):        
        i = 0
        for filename in self.src_filenames:
            filename = filename[:-4] +  "_desugared.cfr"
            choco_fp = open(filename[:-4] + ".choco", "w")
            print "Running with i %s" % i
            print_conversion_to_constraints(self.src_parsers[i], choco_fp)
            choco_fp.close()
            subprocess.check_output(["java", '-Xss3m', '-Xms512m', '-Xmx4096m',  '-jar','../../tools/constraint_solver_backend.jar', \
                                      (filename[:-4] + ".choco")])
            spl_transfomer = self.src_parsers[i]
            
            xml_solution = load_xml_model(filename[:-4] + ".chocosolution")
            nfp_optimal_values = set()
            print "Checking nfp_optimal_values"
            for nfp_uniqueid in [spl_transfomer.get_non_functional_property_unique_id(nfp) \
                                  for nfp in spl_transfomer.get_non_functional_properties_listing()]:
                #print xml_solution.findall("./instance/variable")
                #print "./instance/variable[@id='%s']" % nfp_uniqueid
                print "Looking up for %s, search string %s ." %  (nfp_uniqueid, "./instance/variable[@id='%s']/value" % nfp_uniqueid )
                nfp_value = int(xml_solution.find("./instance/variable[@id='%s']/value" % nfp_uniqueid).text)
                nfp_optimal_values.add(nfp_value)
            print nfp_optimal_values
            self.assertEqual(self.src_ParetoFrontProductLevelAttributeValues[i], nfp_optimal_values)
            i += 1

                
    def test_IntegratedClaferUsingMoolloyBackend(self):
        i = 0
        j = 0
        all_files =  list(self.src_filenames)
        all_files.extend(self.src_filenames_FeatureHierarchy)
        
        for filename in all_files:
            original_filename = filename
            if filename.find("sqlitesplc2011") == -1:
                print "i  | %s" % i
                # E.G in all but sqlitesplc 2001.
                if filename in self.src_filenames:    
                    parser = self.src_parsers[i]
                    ParetoFrontProductLevelAttributeValues = self.src_ParetoFrontProductLevelAttributeValues[i]
                else:
                    parser = self.src_parsers_FeatureHierarchy[j]
                    ParetoFrontProductLevelAttributeValues = self.src_ParetoFrontProductLevelAttributeValues_FeatureHierarchy[j]                    
                remove_alloy_solutions() 
                filename = filename[:-4] +  "_desugared.cfr"
                subprocess.check_output(["java", '-Xss3m', '-Xms512m', '-Xmx4096m',  '-jar','../../tools/multiobjective_alloy_cmd.jar', (filename[:-4] + ".als")])
                print "Will Get Solution Parser from %s " %    filename             
                list_values = show_clafers_from_alloy_solutions(parser)
                self.assertIn(ParetoFrontProductLevelAttributeValues, \
                              list_values,\
                            "Pareto front product level attribute of %s expected, only got %s " \
                            % (ParetoFrontProductLevelAttributeValues, list_values ))
            if original_filename in self.src_filenames:
                i += 1
            else:
                j += 1
    def tearDown(self):
        """
        """
        pass


    def testName(self):
        return "SplClafer Analyzer"


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()