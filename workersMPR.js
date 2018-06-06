
// permanent non-worker createable: theImagesData, oD
// permanent: stackNo, slices0, iSlicesZ, stacks0Width, stacks0Height, sWidth, sHeight, addXY, addZ
// remove stackArray
//function getImagesDataSwivelAxial(theImagesData, oD, stackNo, slices0, imgIteration, iSlicesZ, stacks0Width, stacks0Height, cProjectionWidth, firstNode, secondNode, sliceVector, heightVector, sWidth, sHeight, addXY, addZ, ip, centerRot) {

var theImagesData; 
var oD;
var stackNo;
var slices0;
var iSlicesZ;
var stacks0Width;
var stacks0Height;
var sWidth;
var sHeight;
var addXY;
var addZ;
var projections;
var zFactor;

onmessage = function(e) {
    
if (e.data[0] == "setup") {
    
        
    //console.log("Starting worker "+e.data[3]+"!");
    theImagesData = e.data[1];
    oD = e.data[2];
    stackNo = e.data[3];
    slices0 = e.data[4];
    iSlicesZ = e.data[5];
    stacks0Width = e.data[6];
    stacks0Height = e.data[7];
    sWidth = e.data[8];
    sHeight = e.data[9];
    addXY = e.data[10];
    addZ = e.data[11];
    projections = e.data[12]; 
    zFactor = (iSlicesZ-1)/(slices0-1);
    
    
    postMessage(["ready", "Worker "+e.data[3] + " ready!", stackNo]);
}   

if (e.data[0] == "swivel") {
    //stacks[2].worker.postMessage(["swivel", stacks[2].imgIteration, stacks[2].cProjectionWidth, node0, node1, vector0_4, vector0_3, false, ""]);
    getImagesDataSwivelAxial(theImagesData, oD, stackNo, slices0, e.data[1], iSlicesZ, stacks0Width, stacks0Height, e.data[2], e.data[3], e.data[4], e.data[5], e.data[6], sWidth, sHeight, addXY, addZ, e.data[7], e.data[8], e.data[9], e.data[10], e.data[11], zFactor);
    
    
}

    
    
};

function getImagesDataSwivelAxial(theImagesData, oD, stackNo, slices0, imgIteration, iSlicesZ, stacks0Width, stacks0Height, cProjectionWidth, firstNode, secondNode, sliceVector, heightVector, sWidth, sHeight, addXY, addZ, ip, centerRot, cProjection, gain, bias, zFactor) {

    startTime2 =  new Date().getTime();

    sliceStart = imgIteration;
    sliceNoBegin = imgIteration-Math.floor(cProjectionWidth/2);
    endSlice = imgIteration+Math.ceil(cProjectionWidth/2);
   
    if (cProjection == "Avg") 
        extraData = new Uint16Array(oD.data);
    else
        extraData = new Uint8Array(oD.data);
        
    var vectorTransverse;
    
    vectorTransverse = new Float32Array(3);
    vectorTransverse[0] = (secondNode[0]-firstNode[0])/(stacks0Width-1);
    vectorTransverse[1] = (secondNode[1]-firstNode[1])/(stacks0Width-1);
    vectorTransverse[2] = (secondNode[2]-firstNode[2])/(stacks0Width-1);
    
    for(s=sliceNoBegin;s<endSlice;s++) {
        
        currentIteration = 0;
        //console.log(oD);
       
        
      
        var startCoords1 = new Float32Array([firstNode[0]+s*sliceVector[3]+(addXY),firstNode[1]+s*sliceVector[4]+(addXY),firstNode[2]+s*sliceVector[5]+(addZ)]);
        //startCoords2 = new Float32Array([secondNode[0]+s*sliceVector[3]+(addXY),secondNode[1]+s*sliceVector[4]+(addXY),secondNode[2]+s*sliceVector[5]+(addZ)]);
       
        
     
     
    for(i=0;i<sHeight;i++) {
        
        var x1 =  (startCoords1[0]+i*heightVector[3]);
        var y1 =  (startCoords1[1]+i*heightVector[4]);
        var z1 =  (startCoords1[2]+i*heightVector[5]);
        
        for(l=0;l<sWidth;l++) {
            var iData;
            var xT = x1 + vectorTransverse[0]*l;
            var yT = y1 + vectorTransverse[1]*l;
            var zT = z1 + vectorTransverse[2]*l;
            
                                                            if (ip) {
                                                            
                                                                xF_C = [Math.floor(xT), Math.ceil(xT)];
                                                                yF_C = [Math.floor(yT), Math.ceil(yT)];
                                                               
                                                                zF_C = [Math.floor(zT/zFactor)*zFactor, Math.ceil(zT/zFactor)*zFactor];
                                                                
                                                                x0y0z0 = [xF_C[0],yF_C[0]];
                                                                x1y0z0 = [xF_C[1],yF_C[0]];
                                                                x0y1z0 = [xF_C[0],yF_C[1]];
                                                                x0y0z1 = [xF_C[0],yF_C[0]];
                                                                x1y0z1 = [xF_C[1],yF_C[0]];
                                                                x0y1z1 = [xF_C[0],yF_C[1]];
                                                                x1y1z0 = [xF_C[1],yF_C[1]];
                                                                x1y1z1 = [xF_C[1],yF_C[1]];
                                                                
                                                                x0y0z0[3] = (stacks0Width*4*(x0y0z0[1])+(x0y0z0[0])*4);
                                                                x1y0z0[3] = (stacks0Width*4*(x1y0z0[1])+(x1y0z0[0])*4);
                                                                x0y1z0[3] = (stacks0Width*4*(x0y1z0[1])+(x0y1z0[0])*4);
                                                                x0y0z1[3] = (stacks0Width*4*(x0y0z1[1])+(x0y0z1[0])*4);
                                                                x1y0z1[3] = (stacks0Width*4*(x1y0z1[1])+(x1y0z1[0])*4);
                                                                x0y1z1[3] = (stacks0Width*4*(x0y1z1[1])+(x0y1z1[0])*4);
                                                                x1y1z0[3] = (stacks0Width*4*(x1y1z0[1])+(x1y1z0[0])*4);
                                                                x1y1z1[3] = (stacks0Width*4*(x1y1z1[1])+(x1y1z1[0])*4);
                                                              
                                                                z0Slice = (Math.floor(zT/zFactor)); 
                                                                z1Slice = (Math.ceil(zT/zFactor));
                                                        
                                                            } // end ip
                                                            else {
                                                                z0Slice = z1Slice = (Math.floor(zT/zFactor)+1); 
                                                            }
            
            if (z0Slice < 0 || z0Slice >= theImagesData.length || z1Slice < 0 || z1Slice >= theImagesData.length || xT >= stacks0Width || xT < 0 || yT >= stacks0Height || yT < 0) {
                iData = 0;
            }
            else {
                                                            if (ip) {
                                                        
                                                                inData0 = theImagesData[z0Slice];
                                                                inData1 = theImagesData[z1Slice];
                                                                
                                                                x0y0z0[4] = inData0[x0y0z0[3]];
                                                                 x1y0z0[4] = inData0[x1y0z0[3]];
                                                                x0y1z0[4] = inData0[x0y1z0[3]];
                                                                 x0y0z1[4] = inData1[x0y0z1[3]];
                                                                 x1y0z1[4] = inData1[x1y0z1[3]];
                                                                 x0y1z1[4] = inData1[x0y1z1[3]];
                                                                 x1y1z0[4] = inData0[x1y1z0[3]];
                                                                 x1y1z1[4] = inData1[x1y1z1[3]];
                                                                 
                                                                xd = (xT-xF_C[0])/(xF_C[1]-xF_C[0]);
                                                                yd = (yT-yF_C[0])/(yF_C[1]-yF_C[0]);
                                                                zd = (zT-zF_C[0])/(zF_C[1]-zF_C[0]);
                                                                
                                                                c00 = x0y0z0[4]*(1-xd)+x1y0z0[4]*xd;
                                                                c01 = x0y0z1[4]*(1-xd)+x1y0z1[4]*xd;
                                                                c10 = x0y1z0[4]*(1-xd)+x1y1z0[4]*xd;
                                                                c11 = x0y1z1[4]*(1-xd)+x1y1z1[4]*xd;
                                                                
                                                                 c0 =c00*(1-yd)+c10*yd;
                                                                 c1 =c01*(1-yd)+c11*yd;
                                                                
                                                                 c = c0*(1-zd)+c1*zd;
                                                                
                                                                 
                                                                 iData = c;
                                                            }
                                                            else {
                                                                inData = theImagesData[z0Slice];
                                                                iData = (stacks0Width*4*(Math.floor(yT))+(Math.floor(xT))*4);
                                                                iData = inData[iData];
                                                            }
            }
            
            iData = gain*iData+bias;
            iData = Math.round(iData);
            
            
            if (iData < 0)
                iData = 0;
            if (iData > 255)
                iData = 255;
                
            //iData = iData & 0xff;
            
            
            if (cProjection == "VR") {
                if (iData >= 50 && extraData[currentIteration] == 0) {
                    
                
                    extraData[currentIteration] = iData;
                    
                }
                
                
            }  
             
            
            if (cProjection == "MIP") {
                if (iData > extraData[currentIteration]) {
                    
                
                    extraData[currentIteration] = iData;
                    
                }
                
                
            }  
            if (cProjection == "MinIP") {
                if (s == sliceNoBegin)
                    extraData[currentIteration] = 255;
                if (iData < extraData[currentIteration]) {
                    
                
                    extraData[currentIteration] = iData;
                  
                }
            }  
            
            if (cProjection == "Avg") {
                extraData[currentIteration] =  extraData[currentIteration]+iData;
               
                       
                if (s == (endSlice-1)) {
                    extraData[currentIteration] = Math.floor(extraData[currentIteration]/(endSlice-sliceNoBegin));
                  
                }
            }
            
            
            currentIteration+=4;
        } // end l
    } // end i
        //console.log("s "+s);
        
        //aggregateArray.push(outData);
    
    } // end s


    //console.log(aggregateArray);
    //postMessage([theImagesData, oD, stackNo, slices0, imgIteration, iSlicesZ, stacks0Width, stacks0Height, cProjectionWidth, firstNode, secondNode, sliceVector, heightVector, sWidth, sHeight, addXY, addZ, ip, centerRot]);
    //function updateImage(aggregateArray, stackNo, sliceStart, centerRot, n) {

    
    
   








    endTime2 =  parseInt(new Date().getTime())-parseInt(startTime2);
    console.log("2: "+endTime2);
    //postMessage(["swivel", aggregateArray, stackNo, sliceStart, centerRot, 0]);
    postMessage(["swivel", extraData, stackNo, sliceStart, centerRot, 0]);

}

//function getImagesDataSwivelAxial() {
    
    
    
//}




    
    
