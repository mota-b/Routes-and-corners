
routers = []
for i in range(0, 6):
    routers.append("R{0}".format(i))
print routers 

arcs = [
    # R0 R1 R2 R3 R4 R5
    [ 0 ],              #R0
    [ 0, 0],            #R1
    [ 0, 0, 0],         #R2
    [ 0, 0, 0, 0],      #R3
    [ 0, 0, 0, 0, 0],   #R4
    [ 0, 0, 0, 0, 0, 0] #R5
]

