'''
Created on Dec 12, 2012

@author: rafaelolaechea
'''
from z3 import *
from time import time

METRICS_MAXIMIZE = 1
METRICS_MINIMIZE = 2

def GuidedImprovementAlgorithm(s,  metrics_variables, metrics_objective_direction, verbose=False):
    count_paretoPoints = 0
    ParetoFront = []
    start_time = time()
    if s.check() == sat:
        prev_solution = s.model()

        s.push()
        FirstParetoPoint = ranToParetoFront(s, prev_solution, metrics_variables, metrics_objective_direction, verbose)
        ParetoFront.append(FirstParetoPoint)
        s.pop()
        s.add(ConstraintNotDominatedByX(FirstParetoPoint, metrics_variables, metrics_objective_direction))        
        while(s.check() == sat):
            prev_solution = s.model()
            s.push()
            NextParetoPoint = ranToParetoFront(s, prev_solution, metrics_variables, metrics_objective_direction,  verbose)
            count_paretoPoints = count_paretoPoints + 1
            s.pop()
            ParetoFront.append(NextParetoPoint)
            s.add(ConstraintNotDominatedByX(NextParetoPoint, metrics_variables, metrics_objective_direction))
   
    end_time = time()     
    print "ParetoFront has size of %s " % len(ParetoFront)
    print "Time taken is %s " % (end_time - start_time)
    
    for ParetoPoint in ParetoFront:
        print_solution(ParetoPoint, metrics_variables)

def print_solution(solution, metrics_variables):
    SolutionSpacePoint = []
    for metric in metrics_variables:
        SolutionSpacePoint.append(solution[metric])
    print SolutionSpacePoint
    
def ranToParetoFront(s, prev_solution, metrics_variables, metrics_objective_direction,  verbose=False):
    if verbose == True:
        print prev_solution
        print_solution(prev_solution, metrics_variables)
    s.add(ConstraintMustDominatesX(prev_solution,metrics_variables, metrics_objective_direction))
    while (s.check() == sat):
        if verbose == True:
            print_solution(prev_solution, metrics_variables)
        prev_solution = s.model()
        s.add(ConstraintMustDominatesX(prev_solution,metrics_variables, metrics_objective_direction))    
    if verbose == True:
        print_solution(prev_solution, metrics_variables)
    return prev_solution

def ConstraintNotDominatedByX(model, metrics_variables, metrics_objective_direction):
    DisjunctionOrLessMetrics  = list()
    for i in range(len(metrics_variables)):
        if metrics_objective_direction[i] == METRICS_MAXIMIZE:
            DisjunctionOrLessMetrics.append(metrics_variables[i] >  model[metrics_variables[i]])
        else :
            DisjunctionOrLessMetrics.append(metrics_variables[i] <  model[metrics_variables[i]])
    return Or(DisjunctionOrLessMetrics)

def ConstraintMustDominatesX(model, metrics_variables, metrics_objective_direction):
    dominationDisjunction= []
    i = 0
    for dominatedByMetric in metrics_variables:        
        dominationConjunction = []
        j = 0
        if  metrics_objective_direction[i] == METRICS_MAXIMIZE :
            dominationConjunction.append(dominatedByMetric > model[dominatedByMetric])             
        else:
            dominationConjunction.append(dominatedByMetric < model[dominatedByMetric]) 
        for AtLeastEqualInOtherMetric in metrics_variables:
            if j != i:
                if metrics_objective_direction[j] == METRICS_MAXIMIZE:
                    dominationConjunction.append(AtLeastEqualInOtherMetric >= model[AtLeastEqualInOtherMetric])
                else:
                    dominationConjunction.append(AtLeastEqualInOtherMetric <= model[AtLeastEqualInOtherMetric])                    
            j = 1 + j
        i = 1 + i    
        dominationDisjunction.append(And(dominationConjunction))         
    constraintDominateX = Or(dominationDisjunction)
    return constraintDominateX