# ./ClaferIR.py
# -*- coding: utf-8 -*-
# PyXB bindings for NM:1fab392ad703c4410e4e27df31dbf1f93b8f2909
# Generated 2013-01-02 16:50:31.971482 by PyXB version 1.2.1
# Namespace http://clafer.org/ir

import pyxb
import pyxb.binding
import pyxb.binding.saxer
import StringIO
import pyxb.utils.utility
import pyxb.utils.domutils
import sys

# Unique identifier for bindings created at the same time
_GenerationUID = pyxb.utils.utility.UniqueIdentifier('urn:uuid:6e1b9233-5526-11e2-a24a-3c0754305f65')

# Import bindings for namespaces imported into schema
import pyxb.binding.datatypes

Namespace = pyxb.namespace.NamespaceForURI(u'http://clafer.org/ir', create_if_missing=True)
Namespace.configureCategories(['typeBinding', 'elementBinding'])
ModuleRecord = Namespace.lookupModuleRecordByUID(_GenerationUID, create_if_missing=True)
ModuleRecord._setModule(sys.modules[__name__])

def CreateFromDocument (xml_text, default_namespace=None, location_base=None):
    """Parse the given XML and use the document element to create a
    Python instance.
    
    @kw default_namespace The L{pyxb.Namespace} instance to use as the
    default namespace where there is no default namespace in scope.
    If unspecified or C{None}, the namespace of the module containing
    this function will be used.

    @keyword location_base: An object to be recorded as the base of all
    L{pyxb.utils.utility.Location} instances associated with events and
    objects handled by the parser.  You might pass the URI from which
    the document was obtained.
    """

    if pyxb.XMLStyle_saxer != pyxb._XMLStyle:
        dom = pyxb.utils.domutils.StringToDOM(xml_text)
        return CreateFromDOM(dom.documentElement)
    if default_namespace is None:
        default_namespace = Namespace.fallbackNamespace()
    saxer = pyxb.binding.saxer.make_parser(fallback_namespace=default_namespace, location_base=location_base)
    handler = saxer.getContentHandler()
    saxer.parse(StringIO.StringIO(xml_text))
    instance = handler.rootObject()
    return instance

def CreateFromDOM (node, default_namespace=None):
    """Create a Python instance from the given DOM node.
    The node tag must correspond to an element declaration in this module.

    @deprecated: Forcing use of DOM interface is unnecessary; use L{CreateFromDocument}."""
    if default_namespace is None:
        default_namespace = Namespace.fallbackNamespace()
    return pyxb.binding.basis.element.AnyCreateFromDOM(node, default_namespace)


# Complex type {http://clafer.org/ir}IType with content type EMPTY
class IType (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IType with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = True
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IType')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 29, 2)
    # Base type is pyxb.binding.datatypes.anyType

    _ElementMap = {
        
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IType', IType)


# Complex type {http://clafer.org/ir}IModule with content type ELEMENT_ONLY
class IModule (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IModule with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IModule')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 69, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}Name uses Python identifier Name
    __Name = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Name'), 'Name', '__httpclafer_orgir_IModule_httpclafer_orgirName', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 71, 10), )

    
    Name = property(__Name.value, __Name.set, None, None)

    
    # Element {http://clafer.org/ir}Declaration uses Python identifier Declaration
    __Declaration = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), 'Declaration', '__httpclafer_orgir_IModule_httpclafer_orgirDeclaration', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 124, 2), )

    
    Declaration = property(__Declaration.value, __Declaration.set, None, None)


    _ElementMap = {
        __Name.name() : __Name,
        __Declaration.name() : __Declaration
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IModule', IModule)


# Complex type {http://clafer.org/ir}IElement with content type EMPTY
class IElement (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IElement with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = True
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IElement')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 123, 2)
    # Base type is pyxb.binding.datatypes.anyType

    _ElementMap = {
        
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IElement', IElement)


# Complex type {http://clafer.org/ir}ISuper with content type ELEMENT_ONLY
class ISuper (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}ISuper with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'ISuper')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 161, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IsOverlapping uses Python identifier IsOverlapping
    __IsOverlapping = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsOverlapping'), 'IsOverlapping', '__httpclafer_orgir_ISuper_httpclafer_orgirIsOverlapping', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 163, 8), )

    
    IsOverlapping = property(__IsOverlapping.value, __IsOverlapping.set, None, None)

    
    # Element {http://clafer.org/ir}Super uses Python identifier Super
    __Super = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Super'), 'Super', '__httpclafer_orgir_ISuper_httpclafer_orgirSuper', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 164, 8), )

    
    Super = property(__Super.value, __Super.set, None, None)


    _ElementMap = {
        __IsOverlapping.name() : __IsOverlapping,
        __Super.name() : __Super
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'ISuper', ISuper)


# Complex type {http://clafer.org/ir}IGroupCard with content type ELEMENT_ONLY
class IGroupCard (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IGroupCard with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IGroupCard')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 176, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IsKeyword uses Python identifier IsKeyword
    __IsKeyword = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsKeyword'), 'IsKeyword', '__httpclafer_orgir_IGroupCard_httpclafer_orgirIsKeyword', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 178, 8), )

    
    IsKeyword = property(__IsKeyword.value, __IsKeyword.set, None, None)

    
    # Element {http://clafer.org/ir}Interval uses Python identifier Interval
    __Interval = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Interval'), 'Interval', '__httpclafer_orgir_IGroupCard_httpclafer_orgirInterval', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 179, 8), )

    
    Interval = property(__Interval.value, __Interval.set, None, None)


    _ElementMap = {
        __IsKeyword.name() : __IsKeyword,
        __Interval.name() : __Interval
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IGroupCard', IGroupCard)


# Complex type {http://clafer.org/ir}IInterval with content type ELEMENT_ONLY
class IInterval (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IInterval with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IInterval')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 186, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}Min uses Python identifier Min
    __Min = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Min'), 'Min', '__httpclafer_orgir_IInterval_httpclafer_orgirMin', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 188, 10), )

    
    Min = property(__Min.value, __Min.set, None, None)

    
    # Element {http://clafer.org/ir}Max uses Python identifier Max
    __Max = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Max'), 'Max', '__httpclafer_orgir_IInterval_httpclafer_orgirMax', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 195, 10), )

    
    Max = property(__Max.value, __Max.set, None, None)


    _ElementMap = {
        __Min.name() : __Min,
        __Max.name() : __Max
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IInterval', IInterval)


# Complex type [anonymous] with content type ELEMENT_ONLY
class CTD_ANON (pyxb.binding.basis.complexTypeDefinition):
    """Complex type [anonymous] with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = None
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 189, 12)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IntLiteral uses Python identifier IntLiteral
    __IntLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), 'IntLiteral', '__httpclafer_orgir_CTD_ANON_httpclafer_orgirIntLiteral', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1), )

    
    IntLiteral = property(__IntLiteral.value, __IntLiteral.set, None, None)


    _ElementMap = {
        __IntLiteral.name() : __IntLiteral
    }
    _AttributeMap = {
        
    }



# Complex type [anonymous] with content type ELEMENT_ONLY
class CTD_ANON_ (pyxb.binding.basis.complexTypeDefinition):
    """Complex type [anonymous] with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = None
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 196, 12)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IntLiteral uses Python identifier IntLiteral
    __IntLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), 'IntLiteral', '__httpclafer_orgir_CTD_ANON__httpclafer_orgirIntLiteral', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1), )

    
    IntLiteral = property(__IntLiteral.value, __IntLiteral.set, None, None)


    _ElementMap = {
        __IntLiteral.name() : __IntLiteral
    }
    _AttributeMap = {
        
    }



# Complex type {http://clafer.org/ir}IPosition with content type ELEMENT_ONLY
class IPosition (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IPosition with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IPosition')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 207, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}Start uses Python identifier Start
    __Start = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Start'), 'Start', '__httpclafer_orgir_IPosition_httpclafer_orgirStart', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 209, 22), )

    
    Start = property(__Start.value, __Start.set, None, None)

    
    # Element {http://clafer.org/ir}End uses Python identifier End
    __End = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'End'), 'End', '__httpclafer_orgir_IPosition_httpclafer_orgirEnd', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 216, 22), )

    
    End = property(__End.value, __End.set, None, None)


    _ElementMap = {
        __Start.name() : __Start,
        __End.name() : __End
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IPosition', IPosition)


# Complex type [anonymous] with content type ELEMENT_ONLY
class CTD_ANON_2 (pyxb.binding.basis.complexTypeDefinition):
    """Complex type [anonymous] with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = None
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 210, 26)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IntLiteral uses Python identifier IntLiteral
    __IntLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), 'IntLiteral', '__httpclafer_orgir_CTD_ANON_2_httpclafer_orgirIntLiteral', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1), )

    
    IntLiteral = property(__IntLiteral.value, __IntLiteral.set, None, None)


    _ElementMap = {
        __IntLiteral.name() : __IntLiteral
    }
    _AttributeMap = {
        
    }



# Complex type [anonymous] with content type ELEMENT_ONLY
class CTD_ANON_3 (pyxb.binding.basis.complexTypeDefinition):
    """Complex type [anonymous] with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = None
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 217, 26)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IntLiteral uses Python identifier IntLiteral
    __IntLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), 'IntLiteral', '__httpclafer_orgir_CTD_ANON_3_httpclafer_orgirIntLiteral', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1), )

    
    IntLiteral = property(__IntLiteral.value, __IntLiteral.set, None, None)


    _ElementMap = {
        __IntLiteral.name() : __IntLiteral
    }
    _AttributeMap = {
        
    }



# Complex type {http://clafer.org/ir}IParentExp with content type ELEMENT_ONLY
class IParentExp (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IParentExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IParentExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 236, 2)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}Type uses Python identifier Type
    __Type = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Type'), 'Type', '__httpclafer_orgir_IParentExp_httpclafer_orgirType', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 238, 10), )

    
    Type = property(__Type.value, __Type.set, None, None)

    
    # Element {http://clafer.org/ir}ParentId uses Python identifier ParentId
    __ParentId = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'ParentId'), 'ParentId', '__httpclafer_orgir_IParentExp_httpclafer_orgirParentId', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 239, 10), )

    
    ParentId = property(__ParentId.value, __ParentId.set, None, None)

    
    # Element {http://clafer.org/ir}Position uses Python identifier Position
    __Position = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Position'), 'Position', '__httpclafer_orgir_IParentExp_httpclafer_orgirPosition', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 240, 10), )

    
    Position = property(__Position.value, __Position.set, None, None)

    
    # Element {http://clafer.org/ir}Exp uses Python identifier Exp
    __Exp = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Exp'), 'Exp', '__httpclafer_orgir_IParentExp_httpclafer_orgirExp', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 241, 10), )

    
    Exp = property(__Exp.value, __Exp.set, None, None)


    _ElementMap = {
        __Type.name() : __Type,
        __ParentId.name() : __ParentId,
        __Position.name() : __Position,
        __Exp.name() : __Exp
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IParentExp', IParentExp)


# Complex type {http://clafer.org/ir}IExp with content type EMPTY
class IExp (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IExp with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = True
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 261, 2)
    # Base type is pyxb.binding.datatypes.anyType

    _ElementMap = {
        
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IExp', IExp)


# Complex type {http://clafer.org/ir}IDeclaration with content type ELEMENT_ONLY
class IDeclaration (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IDeclaration with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IDeclaration')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 338, 3)
    # Base type is pyxb.binding.datatypes.anyType
    
    # Element {http://clafer.org/ir}IsDisjunct uses Python identifier IsDisjunct
    __IsDisjunct = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsDisjunct'), 'IsDisjunct', '__httpclafer_orgir_IDeclaration_httpclafer_orgirIsDisjunct', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 340, 11), )

    
    IsDisjunct = property(__IsDisjunct.value, __IsDisjunct.set, None, None)

    
    # Element {http://clafer.org/ir}LocalDeclaration uses Python identifier LocalDeclaration
    __LocalDeclaration = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'LocalDeclaration'), 'LocalDeclaration', '__httpclafer_orgir_IDeclaration_httpclafer_orgirLocalDeclaration', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 341, 11), )

    
    LocalDeclaration = property(__LocalDeclaration.value, __LocalDeclaration.set, None, None)

    
    # Element {http://clafer.org/ir}Body uses Python identifier Body
    __Body = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Body'), 'Body', '__httpclafer_orgir_IDeclaration_httpclafer_orgirBody', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 342, 11), )

    
    Body = property(__Body.value, __Body.set, None, None)


    _ElementMap = {
        __IsDisjunct.name() : __IsDisjunct,
        __LocalDeclaration.name() : __LocalDeclaration,
        __Body.name() : __Body
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IDeclaration', IDeclaration)


# Complex type {http://clafer.org/ir}IQuantifier with content type EMPTY
class IQuantifier (pyxb.binding.basis.complexTypeDefinition):
    """Complex type {http://clafer.org/ir}IQuantifier with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = True
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IQuantifier')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 355, 3)
    # Base type is pyxb.binding.datatypes.anyType

    _ElementMap = {
        
    }
    _AttributeMap = {
        
    }
Namespace.addCategoryObject('typeBinding', u'IQuantifier', IQuantifier)


# Complex type {http://clafer.org/ir}IBoolean with content type EMPTY
class IBoolean (IType):
    """Complex type {http://clafer.org/ir}IBoolean with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IBoolean')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 32, 2)
    # Base type is IType

    _ElementMap = IType._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IType._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IBoolean', IBoolean)


# Complex type {http://clafer.org/ir}IString with content type EMPTY
class IString (IType):
    """Complex type {http://clafer.org/ir}IString with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IString')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 38, 2)
    # Base type is IType

    _ElementMap = IType._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IType._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IString', IString)


# Complex type {http://clafer.org/ir}IInteger with content type EMPTY
class IInteger (IType):
    """Complex type {http://clafer.org/ir}IInteger with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IInteger')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 44, 2)
    # Base type is IType

    _ElementMap = IType._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IType._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IInteger', IInteger)


# Complex type {http://clafer.org/ir}IReal with content type EMPTY
class IReal (IType):
    """Complex type {http://clafer.org/ir}IReal with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IReal')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 50, 2)
    # Base type is IType

    _ElementMap = IType._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IType._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IReal', IReal)


# Complex type {http://clafer.org/ir}ISet with content type EMPTY
class ISet (IType):
    """Complex type {http://clafer.org/ir}ISet with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'ISet')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 56, 2)
    # Base type is IType

    _ElementMap = IType._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IType._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'ISet', ISet)


# Complex type {http://clafer.org/ir}IClafer with content type ELEMENT_ONLY
class IClafer (IElement):
    """Complex type {http://clafer.org/ir}IClafer with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IClafer')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 92, 2)
    # Base type is IElement
    
    # Element {http://clafer.org/ir}Position uses Python identifier Position
    __Position = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Position'), 'Position', '__httpclafer_orgir_IClafer_httpclafer_orgirPosition', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 96, 16), )

    
    Position = property(__Position.value, __Position.set, None, None)

    
    # Element {http://clafer.org/ir}IsAbstract uses Python identifier IsAbstract
    __IsAbstract = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsAbstract'), 'IsAbstract', '__httpclafer_orgir_IClafer_httpclafer_orgirIsAbstract', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 97, 16), )

    
    IsAbstract = property(__IsAbstract.value, __IsAbstract.set, None, None)

    
    # Element {http://clafer.org/ir}GroupCard uses Python identifier GroupCard
    __GroupCard = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'GroupCard'), 'GroupCard', '__httpclafer_orgir_IClafer_httpclafer_orgirGroupCard', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 98, 16), )

    
    GroupCard = property(__GroupCard.value, __GroupCard.set, None, None)

    
    # Element {http://clafer.org/ir}Id uses Python identifier Id
    __Id = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Id'), 'Id', '__httpclafer_orgir_IClafer_httpclafer_orgirId', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 99, 16), )

    
    Id = property(__Id.value, __Id.set, None, None)

    
    # Element {http://clafer.org/ir}UniqueId uses Python identifier UniqueId
    __UniqueId = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'UniqueId'), 'UniqueId', '__httpclafer_orgir_IClafer_httpclafer_orgirUniqueId', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 100, 16), )

    
    UniqueId = property(__UniqueId.value, __UniqueId.set, None, None)

    
    # Element {http://clafer.org/ir}Supers uses Python identifier Supers
    __Supers = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Supers'), 'Supers', '__httpclafer_orgir_IClafer_httpclafer_orgirSupers', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 101, 16), )

    
    Supers = property(__Supers.value, __Supers.set, None, None)

    
    # Element {http://clafer.org/ir}Card uses Python identifier Card
    __Card = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Card'), 'Card', '__httpclafer_orgir_IClafer_httpclafer_orgirCard', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 102, 16), )

    
    Card = property(__Card.value, __Card.set, None, None)

    
    # Element {http://clafer.org/ir}GlobalCard uses Python identifier GlobalCard
    __GlobalCard = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'GlobalCard'), 'GlobalCard', '__httpclafer_orgir_IClafer_httpclafer_orgirGlobalCard', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 103, 16), )

    
    GlobalCard = property(__GlobalCard.value, __GlobalCard.set, None, None)

    
    # Element {http://clafer.org/ir}Declaration uses Python identifier Declaration
    __Declaration = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), 'Declaration', '__httpclafer_orgir_IClafer_httpclafer_orgirDeclaration', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 124, 2), )

    
    Declaration = property(__Declaration.value, __Declaration.set, None, None)


    _ElementMap = IElement._ElementMap.copy()
    _ElementMap.update({
        __Position.name() : __Position,
        __IsAbstract.name() : __IsAbstract,
        __GroupCard.name() : __GroupCard,
        __Id.name() : __Id,
        __UniqueId.name() : __UniqueId,
        __Supers.name() : __Supers,
        __Card.name() : __Card,
        __GlobalCard.name() : __GlobalCard,
        __Declaration.name() : __Declaration
    })
    _AttributeMap = IElement._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IClafer', IClafer)


# Complex type {http://clafer.org/ir}IConstraint with content type ELEMENT_ONLY
class IConstraint (IElement):
    """Complex type {http://clafer.org/ir}IConstraint with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IConstraint')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 130, 2)
    # Base type is IElement
    
    # Element {http://clafer.org/ir}IsHard uses Python identifier IsHard
    __IsHard = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsHard'), 'IsHard', '__httpclafer_orgir_IConstraint_httpclafer_orgirIsHard', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 134, 14), )

    
    IsHard = property(__IsHard.value, __IsHard.set, None, None)

    
    # Element {http://clafer.org/ir}ParentExp uses Python identifier ParentExp
    __ParentExp = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'ParentExp'), 'ParentExp', '__httpclafer_orgir_IConstraint_httpclafer_orgirParentExp', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 135, 14), )

    
    ParentExp = property(__ParentExp.value, __ParentExp.set, None, None)


    _ElementMap = IElement._ElementMap.copy()
    _ElementMap.update({
        __IsHard.name() : __IsHard,
        __ParentExp.name() : __ParentExp
    })
    _AttributeMap = IElement._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IConstraint', IConstraint)


# Complex type {http://clafer.org/ir}IGoal with content type ELEMENT_ONLY
class IGoal (IElement):
    """Complex type {http://clafer.org/ir}IGoal with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IGoal')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 142, 2)
    # Base type is IElement
    
    # Element {http://clafer.org/ir}IsMaximize uses Python identifier IsMaximize
    __IsMaximize = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsMaximize'), 'IsMaximize', '__httpclafer_orgir_IGoal_httpclafer_orgirIsMaximize', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 146, 14), )

    
    IsMaximize = property(__IsMaximize.value, __IsMaximize.set, None, None)

    
    # Element {http://clafer.org/ir}ParentExp uses Python identifier ParentExp
    __ParentExp = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'ParentExp'), 'ParentExp', '__httpclafer_orgir_IGoal_httpclafer_orgirParentExp', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 147, 14), )

    
    ParentExp = property(__ParentExp.value, __ParentExp.set, None, None)


    _ElementMap = IElement._ElementMap.copy()
    _ElementMap.update({
        __IsMaximize.name() : __IsMaximize,
        __ParentExp.name() : __ParentExp
    })
    _AttributeMap = IElement._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IGoal', IGoal)


# Complex type {http://clafer.org/ir}IDeclarationParentExp with content type ELEMENT_ONLY
class IDeclarationParentExp (IExp):
    """Complex type {http://clafer.org/ir}IDeclarationParentExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IDeclarationParentExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 263, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}Quantifier uses Python identifier Quantifier
    __Quantifier = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Quantifier'), 'Quantifier', '__httpclafer_orgir_IDeclarationParentExp_httpclafer_orgirQuantifier', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 267, 18), )

    
    Quantifier = property(__Quantifier.value, __Quantifier.set, None, None)

    
    # Element {http://clafer.org/ir}Declaration uses Python identifier Declaration
    __Declaration = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), 'Declaration', '__httpclafer_orgir_IDeclarationParentExp_httpclafer_orgirDeclaration', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 268, 18), )

    
    Declaration = property(__Declaration.value, __Declaration.set, None, None)

    
    # Element {http://clafer.org/ir}BodyParentExp uses Python identifier BodyParentExp
    __BodyParentExp = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'BodyParentExp'), 'BodyParentExp', '__httpclafer_orgir_IDeclarationParentExp_httpclafer_orgirBodyParentExp', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 269, 18), )

    
    BodyParentExp = property(__BodyParentExp.value, __BodyParentExp.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __Quantifier.name() : __Quantifier,
        __Declaration.name() : __Declaration,
        __BodyParentExp.name() : __BodyParentExp
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IDeclarationParentExp', IDeclarationParentExp)


# Complex type {http://clafer.org/ir}IFunctionExp with content type ELEMENT_ONLY
class IFunctionExp (IExp):
    """Complex type {http://clafer.org/ir}IFunctionExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IFunctionExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 275, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}Operation uses Python identifier Operation
    __Operation = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Operation'), 'Operation', '__httpclafer_orgir_IFunctionExp_httpclafer_orgirOperation', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 279, 18), )

    
    Operation = property(__Operation.value, __Operation.set, None, None)

    
    # Element {http://clafer.org/ir}Argument uses Python identifier Argument
    __Argument = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Argument'), 'Argument', '__httpclafer_orgir_IFunctionExp_httpclafer_orgirArgument', True, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 280, 18), )

    
    Argument = property(__Argument.value, __Argument.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __Operation.name() : __Operation,
        __Argument.name() : __Argument
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IFunctionExp', IFunctionExp)


# Complex type {http://clafer.org/ir}IIntExp with content type ELEMENT_ONLY
class IIntExp (IExp):
    """Complex type {http://clafer.org/ir}IIntExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IIntExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 286, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}IntLiteral uses Python identifier IntLiteral
    __IntLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), 'IntLiteral', '__httpclafer_orgir_IIntExp_httpclafer_orgirIntLiteral', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1), )

    
    IntLiteral = property(__IntLiteral.value, __IntLiteral.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __IntLiteral.name() : __IntLiteral
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IIntExp', IIntExp)


# Complex type {http://clafer.org/ir}IDoubleExp with content type ELEMENT_ONLY
class IDoubleExp (IExp):
    """Complex type {http://clafer.org/ir}IDoubleExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IDoubleExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 296, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}DoubleLiteral uses Python identifier DoubleLiteral
    __DoubleLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'DoubleLiteral'), 'DoubleLiteral', '__httpclafer_orgir_IDoubleExp_httpclafer_orgirDoubleLiteral', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 390, 1), )

    
    DoubleLiteral = property(__DoubleLiteral.value, __DoubleLiteral.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __DoubleLiteral.name() : __DoubleLiteral
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IDoubleExp', IDoubleExp)


# Complex type {http://clafer.org/ir}IStringExp with content type ELEMENT_ONLY
class IStringExp (IExp):
    """Complex type {http://clafer.org/ir}IStringExp with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IStringExp')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 306, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}StringLiteral uses Python identifier StringLiteral
    __StringLiteral = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'StringLiteral'), 'StringLiteral', '__httpclafer_orgir_IStringExp_httpclafer_orgirStringLiteral', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 391, 1), )

    
    StringLiteral = property(__StringLiteral.value, __StringLiteral.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __StringLiteral.name() : __StringLiteral
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IStringExp', IStringExp)


# Complex type {http://clafer.org/ir}IClaferId with content type ELEMENT_ONLY
class IClaferId (IExp):
    """Complex type {http://clafer.org/ir}IClaferId with content type ELEMENT_ONLY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_ELEMENT_ONLY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IClaferId')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 317, 2)
    # Base type is IExp
    
    # Element {http://clafer.org/ir}ModuleName uses Python identifier ModuleName
    __ModuleName = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'ModuleName'), 'ModuleName', '__httpclafer_orgir_IClaferId_httpclafer_orgirModuleName', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 321, 18), )

    
    ModuleName = property(__ModuleName.value, __ModuleName.set, None, None)

    
    # Element {http://clafer.org/ir}Id uses Python identifier Id
    __Id = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'Id'), 'Id', '__httpclafer_orgir_IClaferId_httpclafer_orgirId', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 322, 18), )

    
    Id = property(__Id.value, __Id.set, None, None)

    
    # Element {http://clafer.org/ir}IsTop uses Python identifier IsTop
    __IsTop = pyxb.binding.content.ElementDeclaration(pyxb.namespace.ExpandedName(Namespace, u'IsTop'), 'IsTop', '__httpclafer_orgir_IClaferId_httpclafer_orgirIsTop', False, pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 323, 18), )

    
    IsTop = property(__IsTop.value, __IsTop.set, None, None)


    _ElementMap = IExp._ElementMap.copy()
    _ElementMap.update({
        __ModuleName.name() : __ModuleName,
        __Id.name() : __Id,
        __IsTop.name() : __IsTop
    })
    _AttributeMap = IExp._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IClaferId', IClaferId)


# Complex type {http://clafer.org/ir}INo with content type EMPTY
class INo (IQuantifier):
    """Complex type {http://clafer.org/ir}INo with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'INo')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 357, 3)
    # Base type is IQuantifier

    _ElementMap = IQuantifier._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IQuantifier._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'INo', INo)


# Complex type {http://clafer.org/ir}ILone with content type EMPTY
class ILone (IQuantifier):
    """Complex type {http://clafer.org/ir}ILone with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'ILone')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 363, 3)
    # Base type is IQuantifier

    _ElementMap = IQuantifier._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IQuantifier._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'ILone', ILone)


# Complex type {http://clafer.org/ir}IOne with content type EMPTY
class IOne (IQuantifier):
    """Complex type {http://clafer.org/ir}IOne with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IOne')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 369, 3)
    # Base type is IQuantifier

    _ElementMap = IQuantifier._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IQuantifier._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IOne', IOne)


# Complex type {http://clafer.org/ir}ISome with content type EMPTY
class ISome (IQuantifier):
    """Complex type {http://clafer.org/ir}ISome with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'ISome')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 375, 3)
    # Base type is IQuantifier

    _ElementMap = IQuantifier._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IQuantifier._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'ISome', ISome)


# Complex type {http://clafer.org/ir}IAll with content type EMPTY
class IAll (IQuantifier):
    """Complex type {http://clafer.org/ir}IAll with content type EMPTY"""
    _TypeDefinition = None
    _ContentTypeTag = pyxb.binding.basis.complexTypeDefinition._CT_EMPTY
    _Abstract = False
    _ExpandedName = pyxb.namespace.ExpandedName(Namespace, u'IAll')
    _XSDLocation = pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 381, 3)
    # Base type is IQuantifier

    _ElementMap = IQuantifier._ElementMap.copy()
    _ElementMap.update({
        
    })
    _AttributeMap = IQuantifier._AttributeMap.copy()
    _AttributeMap.update({
        
    })
Namespace.addCategoryObject('typeBinding', u'IAll', IAll)


IntLiteral = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1))
Namespace.addCategoryObject('elementBinding', IntLiteral.name().localName(), IntLiteral)

DoubleLiteral = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'DoubleLiteral'), pyxb.binding.datatypes.double, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 390, 1))
Namespace.addCategoryObject('elementBinding', DoubleLiteral.name().localName(), DoubleLiteral)

StringLiteral = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'StringLiteral'), pyxb.binding.datatypes.string, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 391, 1))
Namespace.addCategoryObject('elementBinding', StringLiteral.name().localName(), StringLiteral)

Type = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Type'), IType, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 30, 2))
Namespace.addCategoryObject('elementBinding', Type.name().localName(), Type)

Module = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Module'), IModule, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 76, 2))
Namespace.addCategoryObject('elementBinding', Module.name().localName(), Module)

Declaration = pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), IElement, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 124, 2))
Namespace.addCategoryObject('elementBinding', Declaration.name().localName(), Declaration)



IModule._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Name'), pyxb.binding.datatypes.string, scope=IModule, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 71, 10)))

IModule._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), IElement, scope=IModule, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 124, 2)))

def _BuildAutomaton ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton
    del _BuildAutomaton
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 72, 10))
    counters.add(cc_0)
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IModule._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Name')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 71, 10))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_0, False))
    symbol = pyxb.binding.content.ElementUse(IModule._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Declaration')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 72, 10))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, True) ]))
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IModule._Automaton = _BuildAutomaton()




ISuper._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsOverlapping'), pyxb.binding.datatypes.boolean, scope=ISuper, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 163, 8)))

ISuper._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Super'), IParentExp, scope=ISuper, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 164, 8)))

def _BuildAutomaton_ ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_
    del _BuildAutomaton_
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 164, 8))
    counters.add(cc_0)
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(ISuper._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsOverlapping')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 163, 8))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_0, False))
    symbol = pyxb.binding.content.ElementUse(ISuper._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Super')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 164, 8))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, True) ]))
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
ISuper._Automaton = _BuildAutomaton_()




IGroupCard._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsKeyword'), pyxb.binding.datatypes.boolean, scope=IGroupCard, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 178, 8)))

IGroupCard._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Interval'), IInterval, scope=IGroupCard, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 179, 8)))

def _BuildAutomaton_2 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_2
    del _BuildAutomaton_2
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IGroupCard._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsKeyword')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 178, 8))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IGroupCard._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Interval')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 179, 8))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IGroupCard._Automaton = _BuildAutomaton_2()




IInterval._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Min'), CTD_ANON, scope=IInterval, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 188, 10)))

IInterval._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Max'), CTD_ANON_, scope=IInterval, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 195, 10)))

def _BuildAutomaton_3 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_3
    del _BuildAutomaton_3
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IInterval._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Min')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 188, 10))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IInterval._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Max')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 195, 10))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IInterval._Automaton = _BuildAutomaton_3()




CTD_ANON._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, scope=CTD_ANON, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1)))

def _BuildAutomaton_4 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_4
    del _BuildAutomaton_4
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(CTD_ANON._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 191, 20))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
CTD_ANON._Automaton = _BuildAutomaton_4()




CTD_ANON_._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, scope=CTD_ANON_, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1)))

def _BuildAutomaton_5 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_5
    del _BuildAutomaton_5
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(CTD_ANON_._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 198, 20))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
CTD_ANON_._Automaton = _BuildAutomaton_5()




IPosition._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Start'), CTD_ANON_2, scope=IPosition, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 209, 22)))

IPosition._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'End'), CTD_ANON_3, scope=IPosition, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 216, 22)))

def _BuildAutomaton_6 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_6
    del _BuildAutomaton_6
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IPosition._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Start')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 209, 22))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IPosition._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'End')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 216, 22))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IPosition._Automaton = _BuildAutomaton_6()




CTD_ANON_2._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, scope=CTD_ANON_2, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1)))

def _BuildAutomaton_7 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_7
    del _BuildAutomaton_7
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=2L, max=2L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 212, 34))
    counters.add(cc_0)
    states = []
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_0, False))
    symbol = pyxb.binding.content.ElementUse(CTD_ANON_2._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 212, 34))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    transitions.append(fac.Transition(st_0, [
        fac.UpdateInstruction(cc_0, True) ]))
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
CTD_ANON_2._Automaton = _BuildAutomaton_7()




CTD_ANON_3._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, scope=CTD_ANON_3, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1)))

def _BuildAutomaton_8 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_8
    del _BuildAutomaton_8
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=2L, max=2L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 219, 34))
    counters.add(cc_0)
    states = []
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_0, False))
    symbol = pyxb.binding.content.ElementUse(CTD_ANON_3._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 219, 34))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    transitions.append(fac.Transition(st_0, [
        fac.UpdateInstruction(cc_0, True) ]))
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
CTD_ANON_3._Automaton = _BuildAutomaton_8()




IParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Type'), IType, scope=IParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 238, 10)))

IParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'ParentId'), pyxb.binding.datatypes.string, scope=IParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 239, 10)))

IParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Position'), IPosition, scope=IParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 240, 10)))

IParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Exp'), IExp, scope=IParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 241, 10)))

def _BuildAutomaton_9 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_9
    del _BuildAutomaton_9
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=1L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 238, 10))
    counters.add(cc_0)
    cc_1 = fac.CounterCondition(min=0L, max=1L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 239, 10))
    counters.add(cc_1)
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Type')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 238, 10))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'ParentId')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 239, 10))
    st_1 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Position')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 240, 10))
    st_2 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_2)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Exp')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 241, 10))
    st_3 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_3)
    transitions = []
    transitions.append(fac.Transition(st_0, [
        fac.UpdateInstruction(cc_0, True) ]))
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, False) ]))
    transitions.append(fac.Transition(st_2, [
        fac.UpdateInstruction(cc_0, False) ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_1, True) ]))
    transitions.append(fac.Transition(st_2, [
        fac.UpdateInstruction(cc_1, False) ]))
    st_1._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_3, [
         ]))
    st_2._set_transitionSet(transitions)
    transitions = []
    st_3._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IParentExp._Automaton = _BuildAutomaton_9()




IDeclaration._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsDisjunct'), pyxb.binding.datatypes.boolean, scope=IDeclaration, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 340, 11)))

IDeclaration._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'LocalDeclaration'), pyxb.binding.datatypes.string, scope=IDeclaration, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 341, 11)))

IDeclaration._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Body'), IParentExp, scope=IDeclaration, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 342, 11)))

def _BuildAutomaton_10 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_10
    del _BuildAutomaton_10
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 341, 11))
    counters.add(cc_0)
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IDeclaration._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsDisjunct')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 340, 11))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IDeclaration._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'LocalDeclaration')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 341, 11))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IDeclaration._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Body')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 342, 11))
    st_2 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_2)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    transitions.append(fac.Transition(st_2, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, True) ]))
    transitions.append(fac.Transition(st_2, [
        fac.UpdateInstruction(cc_0, False) ]))
    st_1._set_transitionSet(transitions)
    transitions = []
    st_2._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IDeclaration._Automaton = _BuildAutomaton_10()




IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Position'), IPosition, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 96, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsAbstract'), pyxb.binding.datatypes.boolean, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 97, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'GroupCard'), IGroupCard, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 98, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Id'), pyxb.binding.datatypes.string, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 99, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'UniqueId'), pyxb.binding.datatypes.string, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 100, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Supers'), ISuper, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 101, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Card'), IInterval, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 102, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'GlobalCard'), IInterval, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 103, 16)))

IClafer._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), IElement, scope=IClafer, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 124, 2)))

def _BuildAutomaton_11 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_11
    del _BuildAutomaton_11
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=1L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 98, 16))
    counters.add(cc_0)
    cc_1 = fac.CounterCondition(min=0L, max=1L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 102, 16))
    counters.add(cc_1)
    cc_2 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 104, 16))
    counters.add(cc_2)
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Position')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 96, 16))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsAbstract')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 97, 16))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'GroupCard')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 98, 16))
    st_2 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_2)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Id')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 99, 16))
    st_3 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_3)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'UniqueId')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 100, 16))
    st_4 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_4)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Supers')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 101, 16))
    st_5 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_5)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Card')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 102, 16))
    st_6 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_6)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'GlobalCard')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 103, 16))
    st_7 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_7)
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_2, False))
    symbol = pyxb.binding.content.ElementUse(IClafer._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Declaration')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 104, 16))
    st_8 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_8)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_2, [
         ]))
    transitions.append(fac.Transition(st_3, [
         ]))
    st_1._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_2, [
        fac.UpdateInstruction(cc_0, True) ]))
    transitions.append(fac.Transition(st_3, [
        fac.UpdateInstruction(cc_0, False) ]))
    st_2._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_4, [
         ]))
    st_3._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_5, [
         ]))
    st_4._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_6, [
         ]))
    transitions.append(fac.Transition(st_7, [
         ]))
    st_5._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_6, [
        fac.UpdateInstruction(cc_1, True) ]))
    transitions.append(fac.Transition(st_7, [
        fac.UpdateInstruction(cc_1, False) ]))
    st_6._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_8, [
         ]))
    st_7._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_8, [
        fac.UpdateInstruction(cc_2, True) ]))
    st_8._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IClafer._Automaton = _BuildAutomaton_11()




IConstraint._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsHard'), pyxb.binding.datatypes.boolean, scope=IConstraint, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 134, 14)))

IConstraint._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'ParentExp'), IParentExp, scope=IConstraint, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 135, 14)))

def _BuildAutomaton_12 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_12
    del _BuildAutomaton_12
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IConstraint._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsHard')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 134, 14))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IConstraint._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'ParentExp')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 135, 14))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IConstraint._Automaton = _BuildAutomaton_12()




IGoal._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsMaximize'), pyxb.binding.datatypes.boolean, scope=IGoal, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 146, 14)))

IGoal._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'ParentExp'), IParentExp, scope=IGoal, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 147, 14)))

def _BuildAutomaton_13 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_13
    del _BuildAutomaton_13
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IGoal._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsMaximize')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 146, 14))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IGoal._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'ParentExp')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 147, 14))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IGoal._Automaton = _BuildAutomaton_13()




IDeclarationParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Quantifier'), IQuantifier, scope=IDeclarationParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 267, 18)))

IDeclarationParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Declaration'), IDeclaration, scope=IDeclarationParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 268, 18)))

IDeclarationParentExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'BodyParentExp'), IParentExp, scope=IDeclarationParentExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 269, 18)))

def _BuildAutomaton_14 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_14
    del _BuildAutomaton_14
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 268, 18))
    counters.add(cc_0)
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IDeclarationParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Quantifier')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 267, 18))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IDeclarationParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Declaration')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 268, 18))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IDeclarationParentExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'BodyParentExp')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 269, 18))
    st_2 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_2)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    transitions.append(fac.Transition(st_2, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, True) ]))
    transitions.append(fac.Transition(st_2, [
        fac.UpdateInstruction(cc_0, False) ]))
    st_1._set_transitionSet(transitions)
    transitions = []
    st_2._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IDeclarationParentExp._Automaton = _BuildAutomaton_14()




IFunctionExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Operation'), pyxb.binding.datatypes.string, scope=IFunctionExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 279, 18)))

IFunctionExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Argument'), IParentExp, scope=IFunctionExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 280, 18)))

def _BuildAutomaton_15 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_15
    del _BuildAutomaton_15
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=None, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 280, 18))
    counters.add(cc_0)
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IFunctionExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Operation')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 279, 18))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = set()
    final_update.add(fac.UpdateInstruction(cc_0, False))
    symbol = pyxb.binding.content.ElementUse(IFunctionExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Argument')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 280, 18))
    st_1 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    transitions = []
    transitions.append(fac.Transition(st_1, [
         ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, True) ]))
    st_1._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IFunctionExp._Automaton = _BuildAutomaton_15()




IIntExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral'), pyxb.binding.datatypes.integer, scope=IIntExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 389, 1)))

def _BuildAutomaton_16 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_16
    del _BuildAutomaton_16
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IIntExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IntLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 290, 17))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IIntExp._Automaton = _BuildAutomaton_16()




IDoubleExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'DoubleLiteral'), pyxb.binding.datatypes.double, scope=IDoubleExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 390, 1)))

def _BuildAutomaton_17 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_17
    del _BuildAutomaton_17
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IDoubleExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'DoubleLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 300, 17))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IDoubleExp._Automaton = _BuildAutomaton_17()




IStringExp._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'StringLiteral'), pyxb.binding.datatypes.string, scope=IStringExp, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 391, 1)))

def _BuildAutomaton_18 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_18
    del _BuildAutomaton_18
    import pyxb.utils.fac as fac

    counters = set()
    states = []
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IStringExp._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'StringLiteral')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 310, 17))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    transitions = []
    st_0._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IStringExp._Automaton = _BuildAutomaton_18()




IClaferId._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'ModuleName'), pyxb.binding.datatypes.string, scope=IClaferId, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 321, 18)))

IClaferId._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'Id'), pyxb.binding.datatypes.string, scope=IClaferId, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 322, 18)))

IClaferId._AddElement(pyxb.binding.basis.element(pyxb.namespace.ExpandedName(Namespace, u'IsTop'), pyxb.binding.datatypes.boolean, scope=IClaferId, location=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 323, 18)))

def _BuildAutomaton_19 ():
    # Remove this helper function from the namespace after it's invoked
    global _BuildAutomaton_19
    del _BuildAutomaton_19
    import pyxb.utils.fac as fac

    counters = set()
    cc_0 = fac.CounterCondition(min=0L, max=1L, metadata=pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 321, 18))
    counters.add(cc_0)
    states = []
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClaferId._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'ModuleName')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 321, 18))
    st_0 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_0)
    final_update = None
    symbol = pyxb.binding.content.ElementUse(IClaferId._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'Id')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 322, 18))
    st_1 = fac.State(symbol, is_initial=True, final_update=final_update, is_unordered_catenation=False)
    states.append(st_1)
    final_update = set()
    symbol = pyxb.binding.content.ElementUse(IClaferId._UseForTag(pyxb.namespace.ExpandedName(Namespace, u'IsTop')), pyxb.utils.utility.Location('/Users/rafaelolaechea/Downloads/ClaferIR.xsd', 323, 18))
    st_2 = fac.State(symbol, is_initial=False, final_update=final_update, is_unordered_catenation=False)
    states.append(st_2)
    transitions = []
    transitions.append(fac.Transition(st_0, [
        fac.UpdateInstruction(cc_0, True) ]))
    transitions.append(fac.Transition(st_1, [
        fac.UpdateInstruction(cc_0, False) ]))
    st_0._set_transitionSet(transitions)
    transitions = []
    transitions.append(fac.Transition(st_2, [
         ]))
    st_1._set_transitionSet(transitions)
    transitions = []
    st_2._set_transitionSet(transitions)
    return fac.Automaton(states, counters, False, containing_state=None)
IClaferId._Automaton = _BuildAutomaton_19()

