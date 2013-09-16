'''
Created on Jul 28, 2012

@author: rafaelolaechea
'''

from xml.etree import ElementTree

def load_xml_model(filename):
    fp = open(filename)
    xml_model_string = ''.join(fp.readlines())
    fp.close()
    return ElementTree.fromstring(xml_model_string)