import sys
import string
for line in sys.stdin:
    line = line.translate(str.maketrans('', '', string.punctuation))
    print(line,end="")
