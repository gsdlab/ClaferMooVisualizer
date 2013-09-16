'''
Created on Jul 28, 2012

@author: rafaelolaechea
'''
from xml_parser_helper import load_xml_model
from xml.etree import ElementTree

import subprocess
import re
import collections

_namespaces = {'c1': 'http://clafer.org/ir', 
     'xsi': 'http://www.w3.org/2001/XMLSchema-instance'}

class SPL_ClaferAnalyzer(object):
    def __init__(self, feature_model_filename, load_from_xml_file=True):                    
        if load_from_xml_file == True:
            self.xml_model = load_xml_model(feature_model_filename)            
        else:
            #Run clafer on "feature_model_xml_filename"
            subprocess.check_output(["clafer", "--mode=xml", feature_model_filename], stderr=subprocess.STDOUT)
            self.xml_model = load_xml_model(feature_model_filename[:-4] + ".xml")        


        self.SPL = self.get_top_level_SPL_model()
        self.SPL_concrete = self.get_concrete_SPL_configuration()
        self._non_functional_properties =  None
        self._FeatureTypes = None
        self._xml_element_from_uniqueID ={}        
        self._parentToChild = {}
        self._childToParent = {}
        self._initialize_childParentMappings()
        assert self.SPL != None

    def get_top_level_SPL_model(self):
        """
        Assume  SPL feature model is the last top level abstract clafer.
        """
        top_level_spl_model = None
        assert len (self.xml_model.findall('./c1:Declaration', _namespaces)) > 0
        
        for top_level_clafer in self.xml_model.findall('./c1:Declaration', _namespaces):
            if top_level_clafer.find('c1:IsAbstract', _namespaces)!= None and \
                top_level_clafer.find('c1:IsAbstract', _namespaces).text == 'true' :
                top_level_spl_model = top_level_clafer
        return top_level_spl_model

    def get_concrete_SPL_configuration(self):
        """
        Assume SPL concrete instance, is the last top level concrete model.
        """
        top_level_concrete_spl_model = None
        assert len (self.xml_model.findall('./c1:Declaration', _namespaces)) > 0
        
        for top_level_clafer in self.xml_model.findall('./c1:Declaration', _namespaces):
            if top_level_clafer.find('c1:IsAbstract', _namespaces)!= None and \
                top_level_clafer.find('c1:IsAbstract', _namespaces).text == 'false' :
                top_level_concrete_spl_model = top_level_clafer
        return top_level_concrete_spl_model
    
    def get_ConcreteLevelConstraints(self):
        """
        Returns a set of constraints for the partially configured SPL.
        """
            
    def get_clafer_Id(self, element):
        return element.find('c1:Id',_namespaces).text

    def get_clafer_UniqueId(self, element):
        return element.find('c1:UniqueId',_namespaces).text

    def get_abstract_top_level_clafers(self):
        abstract_top_level_clafers = []
        for top_level_clafer in self.xml_model.findall('./c1:Declaration', _namespaces):
            if top_level_clafer.find('c1:IsAbstract', _namespaces)!= None and \
                top_level_clafer.find('c1:IsAbstract', _namespaces).text == 'true' :
                abstract_top_level_clafers.append(top_level_clafer)
        return abstract_top_level_clafers

    @property
    def FeatureTypes(self):
        if self._FeatureTypes == None:
            self._FeatureTypes = self.get_abstract_top_level_clafers()[:-1]
        #print "Returing _FeatureTypes= %s " % (str(self._FeatureTypes),)
        return self._FeatureTypes
    
    def getFeatureAttributes(self, FeatureType):
        ret_attributes =  []
        for nonfunctional_property in FeatureType.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces):
            ret_attributes.append(self.get_clafer_UniqueId(nonfunctional_property))
        return ret_attributes
            
    @property
    def non_functional_properties(self):
        if self._non_functional_properties == None:
            self._non_functional_properties = {}
            for FeatureType in self.FeatureTypes:            
                for nonfunctional_property in FeatureType.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces):
                    self._non_functional_properties[self.get_clafer_Id(nonfunctional_property)] = self.get_clafer_UniqueId(nonfunctional_property)
        return self._non_functional_properties        

    def get_non_functional_properties_listing(self):
        return self.non_functional_properties.keys()
    
    def get_parentToChildMapping(self):
        return self._parentToChild
    
    def get_non_functional_property_unique_id(self, non_functional_property):
        return self.non_functional_properties.get(non_functional_property)
                
    def extract_integer(self, element):
        """
        Extracts an integer from the second argument for the constraint of form [this.property = <number>]  or [this.property = - <number>]
        
        E.g Element must be either -<number> or just <number>.
        """
        extacted_integer = 10
        if element.find("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Operation", _namespaces)!=None and \
            element.find("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Operation", _namespaces).text =='-':
                # we have this.footprint = - <number>
                extacted_integer = '-' + element.find("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp/c1:IntLiteral", _namespaces).text
        else:
            # we have just <number>
            extacted_integer = element.find("c1:Exp/c1:IntLiteral", _namespaces).text
        return extacted_integer


    def get_property_value(self, element, property):
        property_val = 0
        for constraint in element.findall("./c1:Declaration[@xsi:type='cl:IConstraint']", _namespaces):
            constraint_operation = constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Operation", _namespaces)
            constraint_arguments = constraint.findall("c1:ParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument", _namespaces)
    
            if constraint_operation != None and constraint_operation.text == '=' and  len(constraint_arguments)==2:
                first_argument =  constraint_arguments[0]
                second_argument = constraint_arguments[1]
    
                first_argument_sub_arguments = first_argument.findall("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument", _namespaces)
                first_argument_sub_operation = first_argument.findall("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Operation", _namespaces)                

                if len(first_argument_sub_arguments) == 2 and \
                    len(first_argument_sub_operation)>0 and  first_argument_sub_operation[0] != None and first_argument_sub_operation[0].text == '.' and \
                    \
                    first_argument_sub_arguments[0].find("c1:Exp[@xsi:type='cl:IClaferId']/c1:Id", _namespaces) != None and \
                    first_argument_sub_arguments[0].find("c1:Exp[@xsi:type='cl:IClaferId']/c1:Id", _namespaces).text == 'this' and \
                    \
                    first_argument_sub_arguments[1].find("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp[@xsi:type='cl:IClaferId']c1:Id", _namespaces) != None and \
                    first_argument_sub_arguments[1].find("c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp[@xsi:type='cl:IClaferId']c1:Id", _namespaces).text == self.get_non_functional_property_unique_id(property)  and \
                    second_argument.find("c1:Type[@xsi:type='cl:IInteger']", _namespaces)!= None:
                    
                        property_val = self.extract_integer(second_argument)
        return str(property_val)

    def get_max_value_property(self):
            """
            Returns the maximum integer value for a nonfunctional in the Software Product Line Feature Model.
            """
            max_integer = 0
            for feature in self.get_features_as_xml_elements():
                for nonfunctional_property in self.get_non_functional_properties_listing():
                    nonfunctional_property_value = self.get_property_value(feature, nonfunctional_property)
                                                
                    max_integer = max_integer + max(int(nonfunctional_property_value), 0)
            return max_integer

    def get_concrete_instance_as_xml_element(self):
        top_level_clafers = self.xml_model.findall("./c1:Declaration[@xsi:type='cl:IClafer']", _namespaces)
        concrete_top_level_clafers = [clafer for clafer in top_level_clafers if  \
                              clafer.find('c1:IsAbstract', _namespaces) !=None and \
                              clafer.find('c1:IsAbstract', _namespaces).text == 'false']
        
        assert len (concrete_top_level_clafers) > 0                                      
        return concrete_top_level_clafers[0]
 
    def get_xml_elmenet_from_uniqueId(self, uniqueID):
        if self._xml_element_from_uniqueID.get(uniqueID) == None:
#            print"Finding clafer with id %s of " % uniqueID
#            iterate_over =   [claferDecl for claferDecl  in self.xml_model.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces) \
#                           if claferDecl.find('./c1:UniqueId', _namespaces) != None ]
#            for x in iterate_over:
#                print x.find('./c1:UniqueId', _namespaces).text       
#            print "Clafer id's available were those."
#            print "getting %s " % uniqueID
#            print "Found %s " % str(claferDecl for claferDecl  in self.xml_model.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces))
            xml_element = [claferDecl for claferDecl  in self.xml_model.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces) \
                           if claferDecl.find('./c1:UniqueId', _namespaces) != None and \
                           claferDecl.find('./c1:UniqueId', _namespaces).text == uniqueID ][0]
            self._xml_element_from_uniqueID[uniqueID] =  xml_element #c
        return self._xml_element_from_uniqueID.get(uniqueID)
            

    def get_supers(self, clafer):
        """
        Returns a list of all transitive features of a clafer, as a list of unique names.
        """
        #print "Getting supers of %s " % self.get_clafer_UniqueId(clafer)
        ret_supers = []               
        
        element_super = clafer.find('./c1:Supers/c1:Super/c1:Exp/c1:Id', _namespaces)
        element_super_uniqueId = element_super.text
        ret_supers.append(element_super_uniqueId) 
               
        while(element_super_uniqueId != 'clafer'):
            element_super_xml = self.get_xml_elmenet_from_uniqueId(element_super_uniqueId)
            element_super = element_super_xml.find('./c1:Supers/c1:Super/c1:Exp/c1:Id', _namespaces)
            element_super_uniqueId = element_super.text
            
            ret_supers.append(element_super_uniqueId)        
                    
        return ret_supers
    
    def is_product_level_attribute(self, UniqueId):
        """
        Returns true if  unique_id represents a product-level quality attribute such as total_fooptrint, total_performance, etc.
        """
        return self.get_clafer_Id(self.get_xml_elmenet_from_uniqueId(UniqueId)) in \
              ["total_%s" % nonfunctional_property for nonfunctional_property  in self.get_non_functional_properties_listing()]
    
    def get_features_as_xml_elements(self, feature_type_unique_id=None):
        """
        Returns a list of all features that inherit from feature_type_unique_id, or all features if feature_type_unique_id = None.
        """
        #print "Called get_features_as_xml_elements"
        #print "Returning list of features, which aren't in %s  " % (str(["total_%s" % nonfunctional_property for nonfunctional_property  in self.get_non_functional_properties_listing()]),)
        #raw_features = [ self.get_clafer_Id(feature)  for feature in self.SPL.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces) ]        
        #print "Start raw_features"
        #print raw_features        
        #print "End raw_features"
        
        ret_list_features  = [feature for feature in self.SPL.findall(".//c1:Declaration[@xsi:type='cl:IClafer']", _namespaces) if \
            self.get_clafer_Id(feature) not in  ["total_%s" % nonfunctional_property for nonfunctional_property  in self.get_non_functional_properties_listing()]]         

        # print "Start ret_list_features"
        # print [ self.get_clafer_Id(feature) for feature in ret_list_features]
        # print "End ret_list_features"
        
        if feature_type_unique_id != None:
            ret_list_features = [ feature for feature in ret_list_features if feature_type_unique_id in self.get_supers(feature) ]
        return ret_list_features
    
    def _initialize_childParentMappings(self):
        breadthFirstSearchQueue = collections.deque()
        breadthFirstSearchQueue.append(self.SPL)
        while(len(breadthFirstSearchQueue) > 0):
            parent = breadthFirstSearchQueue.popleft()  
            parent_id = self.get_clafer_UniqueId(parent)
            self._parentToChild[parent_id] = []
            for childfeature in parent.findall("./c1:Declaration[@xsi:type='cl:IClafer']", _namespaces):
                childfeature_id = self.get_clafer_UniqueId(childfeature)
                
                self._parentToChild.get(parent_id).append(childfeature_id)
                # Only one parent per child, so no need to use list for this mapping.
                self._childToParent[childfeature_id] = parent_id 
                
                breadthFirstSearchQueue.append(childfeature)
        
    def get_children(self, feature_id):
        """
        Returns a list of children's unique ids.
        """
        return self._parentToChild.get(feature_id)
    def get_parent(self, feature_id):
        """
        Returns the unique id of parent.
        """
        return self._childToParent.get(feature_id)

    def get_group_cardinality_info(self, feature):
        """
        Returns a tuple (isKeywordCardinality, intervalMin, intervalMax)  to represent group cardinality of the group of feature that would be children of of feature.
        """
        isKeywordCardinality = feature.find('.//c1:GroupCard/c1:IsKeyword', _namespaces).text == 'true' 
        intervalMin =  int(feature.find('.//c1:GroupCard/c1:Interval/c1:Min/c1:IntLiteral', _namespaces).text)
        intervalMax =  int(feature.find('.//c1:GroupCard/c1:Interval/c1:Max/c1:IntLiteral', _namespaces).text)
        return (isKeywordCardinality, intervalMin, intervalMax)
 
    def get_cardinailty_info(self, feature):
        """
        Returns a tuple  (Min, Max) representing the cardinality of feature. (e.g mandatory is min=1).
        """        
        intervalMin =  int(feature.find('.//c1:Card/c1:Min/c1:IntLiteral', _namespaces).text)
        intervalMax =  int(feature.find('.//c1:Card/c1:Max/c1:IntLiteral', _namespaces).text)
        return (intervalMin, intervalMax)

    def get_exclusive_ors(self):
        """
        Get a set of feature that have an exclusive or for their children.
        For example in:
            xor AbstractIterator
                ForwardIterator
                backwardIterator
            would return [AbstractIterator_UniqueId]
        """
        xor_features = []
        for feature in self.get_features_as_xml_elements():
            (isKeywordCardinality, intervalMin, intervalMax) =  self.get_group_cardinality_info(feature)            
            if isKeywordCardinality==True and intervalMin==1 and intervalMax==1:
                xor_features.append(self.get_clafer_UniqueId(feature))

        return xor_features
    def get_ors(self):
        """
        Get a set of feature that have an "or" for their children.
        For example in:
            or AbstractIterator
                ForwardIterator
                backwardIterator
            would return [AbstractIterator]
        """
        or_features = []
        for feature in self.get_features_as_xml_elements():
            (isKeywordCardinality, intervalMin, intervalMax) =  self.get_group_cardinality_info(feature)            
            if isKeywordCardinality==True and intervalMin==1 and intervalMax==-1:
                or_features.append(self.get_clafer_UniqueId(feature))

        return or_features
    
    def get_mandatory_features(self):
        """
        Returns a list of features that any configuration must have.        
        """
        top_level_uniqueid = self.get_clafer_UniqueId(self.SPL)
        BFSQueue = collections.deque()
        BFSQueue.append(top_level_uniqueid)
        mandatory_features = []
        
        mandatory_features.append(top_level_uniqueid)
        while(len(BFSQueue) > 0):
            parent_uniqueid = BFSQueue.popleft()
            for child_id in self.get_children(parent_uniqueid):
                child_xml = self.get_xml_elmenet_from_uniqueId(child_id)
                (intervalMin, intervalMax) =  self.get_cardinailty_info(child_xml)
                if (intervalMin > 0):
                    mandatory_features.append(child_id)
                    BFSQueue.append(child_id)
        return [feature for feature in mandatory_features if \
               self.get_clafer_Id((self.get_xml_elmenet_from_uniqueId(feature))) not in \
               ["total_%s" % nonfunctional_property for nonfunctional_property  in self.get_non_functional_properties_listing()]]
                
    def get_set_extra_integers_from_feature_model(self):
        """
        Returns a set of all integers that are not referenced in the feature model, but that might be
        needed to represent the quality properties of a configuration of the feature model.
        """
        from collections import Counter
        
        bag_integers_in_spl_model = Counter()
        for clafer_features in self.get_features_as_xml_elements():
                # Eg add the integer to the bag.
            for nonfunctional_property in self.get_non_functional_properties_listing():                        
                bag_integers_in_spl_model.update([int(self.get_property_value(clafer_features, nonfunctional_property))])
        
        set_integers_derived_from_spl_model = set()
        
        for feature_number in bag_integers_in_spl_model.elements(): # expand the bag (e.g BAG = {1, 1 , 1, 2} expands to 1,1,1,2 .
            tmp_numbers_to_add = set()
            for existing_numbers in set_integers_derived_from_spl_model:
                tmp_numbers_to_add.add(existing_numbers + feature_number)
            tmp_numbers_to_add.add(feature_number)
            # For each number of the bag x, 
            #     set_integers_derived_from_spl_model += x + each element of  set_integers_derived_from_spl_model .
            set_integers_derived_from_spl_model.update(tmp_numbers_to_add)
    
        return set_integers_derived_from_spl_model.difference(set(bag_integers_in_spl_model))

    def convert_ClaferUniqueId_to_ClaferId(self, UniqueIdLabel):
        """
        Function to clafer unique id to clafer id. 
            Used also in translation alloy answer to clafer.
        """
        regex_remove_pre = re.compile(r'c\d+_')
        match = regex_remove_pre.search(UniqueIdLabel)
        return UniqueIdLabel.replace(match.group(0), '')

    def has_SomeQuantifierAsCrossTree(self, constraint):
        return constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:Quantifier[@xsi:type='cl:ISome']", _namespaces) != None
        
    def has_NoQuantifierAsCrossTree(self, constraint):
        return constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:Quantifier[@xsi:type='cl:INo']", _namespaces) != None
        
    def is_cross_tree_constraint(self, element, constraint):
        element_id =  self.get_clafer_UniqueId(element)
        if element_id == "c49_InMemory":
            print "is_cross_tree_constraint: %s" % element_id
        has_SomeQuantifier = False
        has_NoQuantifier = False
        isNotAttributeAssignment = constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']", _namespaces) == None
        if isNotAttributeAssignment == True:
            if element_id == "c49_InMemory":
                print "Yes isNotAttributeAssignment for c49_InMemory"            
            has_SomeQuantifier = self.has_SomeQuantifierAsCrossTree(constraint)
            has_NoQuantifier = self.has_NoQuantifierAsCrossTree(constraint)
        else:
            if element_id == "c49_InMemory":
                print "Not isNotAttributeAssignment for c49_InMemory"
        return has_SomeQuantifier or has_NoQuantifier
#           print constraint
#           for x in constraint.iter():
#               print x.tag
#           print constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:Quantifier[@xsi:type='cl:ISome']", _namespaces)
#           print dir(constraint)

    def extract_implied_feature(self, element, constraint):
        """
        Given a Constraint, it returns the unique id of the feature that is implied by the constraint.
        Either uniqueId, 1 if uniqueId is implied, or uniqueId, 0 if  !uniqueID is implied.
        
        precondition : self.is_cross_tree_constraint(element, constraint) == True
        """
        #print constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:BodyParentExp", _namespaces)        
        arguments = constraint.findall("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:BodyParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument", _namespaces)
        #print len(arguments)
        assert(len(arguments) >= 2) # Should have two arguments, this.parent and  someFeature.
        ArgumentThis = arguments[0]
        ArgumentImpliedFeature = arguments [1]
        ImpliedElement = ArgumentImpliedFeature.find("./c1:Exp/c1:Id", _namespaces).text
        
        ImpliedElementValue = 1
        if self.has_SomeQuantifierAsCrossTree(constraint):
            ImpliedElementValue = 1
        elif self.has_NoQuantifierAsCrossTree(constraint):
            ImpliedElementValue = 0
        return (ImpliedElement, ImpliedElementValue)
    
        #self.printAllChildrenTags(ArgumentImpliedFeature.find("./c1:Exp", _namespaces))
        #self.printAllChildrenTags(constraint.find("c1:ParentExp/c1:Exp[@xsi:type='cl:IDeclarationParentExp']/c1:BodyParentExp/Exp", _namespaces))
    
    def get_goals_unique_id(self):
        """
        Returns a list of goals as uniqueIDs       
        """   
        ret = []     
        goal_declarations = self.xml_model.findall("./c1:Declaration[@xsi:type='cl:IGoal']",  _namespaces)
        for goal_declaration in goal_declarations:
            goals = goal_declaration.findall("./c1:ParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Argument/c1:Exp[@xsi:type='cl:IClaferId']",  _namespaces)
            for goal in goals:
                if self.get_clafer_Id(goal) != "ref":
                    ret.append( self.get_clafer_Id(goal) )
        return ret


    def get_goals_as_tuple_xml_is_maximize(self):
        """
        Returns a list of goals as tuple [(XMLDeclarationGoal, IsMax[true/false])]        
        """
        goals = self.xml_model.findall("./c1:Declaration[@xsi:type='cl:IGoal']",  _namespaces)
        return [ (goal, goal.find("./c1:ParentExp/c1:Exp[@xsi:type='cl:IFunctionExp']/c1:Operation",  _namespaces).text=="max") for goal in goals ]
    
    def get_crosstree_constraints(self):
        """
        Returns a list of cross-tree constraints as a list of tuples 
            ((FeatureA, 0/1), (FeatureB, 0/1))
        to represent FeatureA of value 0/1 implies FeatureB of value 0/1.        
        """        
        # Method Stub: return [(("c83_Measurement", 1), ("c47_AbstractSort", 1))]
        print "get_corsstree_constraints"
        list_implications = []
        for element in [x for x in self.get_features_as_xml_elements() if not self.is_product_level_attribute(self.get_clafer_UniqueId(x))]:
            element_id =  self.get_clafer_UniqueId(element)
            might_have_crosstree_constraint = False
            for constraint in  element.findall("./c1:Declaration[@xsi:type='cl:IConstraint']", _namespaces):
                if self.is_cross_tree_constraint(element, constraint):
                    print "Adding Cross Tree for element_id %s " % element_id
                    list_implications.append(((element_id, 1), self.extract_implied_feature(element, constraint)))
                    might_have_crosstree_constraint = True
            if might_have_crosstree_constraint == True:
                print self.get_clafer_Id(element)
            
        return list_implications
    
    def printAllChildrenTags(self, element):
        for x in element.iter():
            print x.tag,
            print ""
        
    