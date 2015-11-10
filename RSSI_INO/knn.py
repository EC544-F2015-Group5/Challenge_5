import os
import numpy as np
import math
import json
import operator
from pprint import pprint
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix




def euclideanDistance(inst1,inst2,length){
	distance = 0;
	for x in range(length):
		distance += pow((inst1[x] - inst2[x]),2);
		return math.sqrt(distance)
}

def getNeighbors(trainingSet, testInstance, k):
	distances = []
	length = len(testInstance)-1
	for x in range(len(trainingSet)):
		dist = euclideanDistance(testInstance, trainingSet[x], length)
		distances.append((trainingSet[x], dist))
	distances.sort(key=operator.itemgetter(1))
	neighbors = []
	for x in range(k):
		neighbors.append(distances[x][0])
	return neighbors

	def getResponse(neighbors):
	classVotes = {}
	for x in range(len(neighbors)):
		response = neighbors[x][-1]
		if response in classVotes:
			classVotes[response] += 1
		else:
			classVotes[response] = 1
	sortedVotes = sorted(classVotes.iteritems(), key=operator.itemgetter(1), reverse=True)
	return sortedVotes[0][0]

late accuracy of predictions in PythonPython

def getAccuracy(testSet, predictions):
	correct = 0
	for x in range(len(testSet)):
		if testSet[x][-1] is predictions[x]:
			correct += 1
	return (correct/float(len(testSet))) * 100.0

def getAccuracy(testSet, predictions):
	correct = 0
	for x in range(len(testSet)):
		if testSet[x][-1] is predictions[x]:
			correct += 1
	return (correct/float(len(testSet))) * 100.0

def main():
	trainingset = [];
testset = [];

with open('/views/data.json') as data_file:    
    trainingset = json.load(data_file)

with open('/views/test.json') as data_file:    
    testset = json.load(data_file)

    	predictions=[]
	k = 3
	for x in range(len(testset)):
		neighbors = getNeighbors(trainingSet, testSet[x], k)
		result = getResponse(neighbors)
		predictions.append(result)
	accuracy = getAccuracy(testSet, predictions)
main()