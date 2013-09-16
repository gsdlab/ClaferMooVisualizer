'''
Created on Nov 14, 2012

@author: rafaelolaechea
'''

class ComputeRelaxedBoundsGoalsCls(object):
    '''
    Given a clafer Model of a SPL (inside an instance of SPLClaferAnalyzer)  computes  a set of bounds 
    for the values of the goals contained in the clafer model.
    
    Note in case of a partially configured SPL, bounds are tighter as we also take into account feature that have been made mandatory/optional.     
    '''

    
    def __init__(self, SPL_ClaferAnalyzerInstance):
        '''
        Constructor
        '''
        self._spl_transformer = SPL_ClaferAnalyzerInstance
        self._computedBounds = False
        self._Bounds = []
        
    def getSimpleBounds(self):
        """
        This bounds don't take into account either the partial configurations of an SPL to get tighter bounds        
        nor do they mandatory/exclusive/etc to get tighter bounds.
        """
        if self._computedBounds == True:
            return self._Bounds

        
        for nonfunctional_property in self._spl_transformer.get_non_functional_properties_listing():
            upper_bound = 0
            lower_bound = 0
            for feature in self._spl_transformer.get_features_as_xml_elements():
                nonfunctional_property_value = self._spl_transformer.get_property_value(feature, nonfunctional_property)
                
                upper_bound = upper_bound + max(int(nonfunctional_property_value), 0)
                lower_bound = lower_bound + min(int(nonfunctional_property_value), 0)
                
                #print "NonFunctional Property Value %s" %  nonfunctional_property_value
                
            self._Bounds.append((lower_bound, upper_bound))
                
        return self._Bounds