import networkx as nx
import matplotlib.pyplot as plt

G=nx.DiGraph()

with open("a.txt","r") as f:
    for i in f.readlines():
        [a,b,c] = i.split(",")
        G.add_edge(a,b,weight=c)
f.close()

pos = nx.spring_layout(G,k=0.15, iterations=20)
nx.draw(G,pos,with_labels=True,node_color=range(G.number_of_nodes()))
labels = nx.get_edge_attributes(G,'weight')
nx.draw_networkx_edge_labels(G,pos,edge_labels=labels)
plt.show()
