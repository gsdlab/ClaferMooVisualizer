'''
Created on Aug 13, 2012

@author: rafaelolaechea
'''
import subprocess

def execute_main():
    subprocess.check_output(["java", '-Xss3m', '-Xms512m', '-Xmx1024m',  '-jar','../tools/multiobjective_alloy_cmd.jar', "../testset/mobilephone_desugared.als" ])
    print "Finished Running alloy on generated als."    
    show_clafers_from_alloy_solutions(spl_transformer)
                              
if __name__ == '__main__':
    execute_main()