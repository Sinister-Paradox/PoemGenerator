import sys
import string
for line in sys.stdin:
    line = line.replace(",","")
    line = line.replace(".","")
    line = line.replace("\"","")
    line=line.replace ("\'","")
    line=line.replace("!","")
    line = line.replace("?","")
    line = line.replace("(","")
    line=line.replace(")","")
    line = line.replace(" - "," ")
    
    print(line,end="")
