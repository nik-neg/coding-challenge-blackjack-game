import os
#print(os.getcwd())
directory = os.getcwd()+os.path.sep+"cards";
#print(os.listdir(directory))

imageList = os.listdir(directory)
for i in range(1, len(imageList)+1):
    os.rename(directory+os.path.sep+imageList[i-1], directory+os.path.sep+str(i)+".jpg")