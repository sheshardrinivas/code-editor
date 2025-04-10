let index =[];
function auto_fill(input_string,data_set,Threshold){

    for(let w=0;w<data_set.length;w++){
        let filltered_input_string=input_string.replace(/ /g,"");
        let filltered_data=data_set[w].replace(/ /g,"");
        let confidence =0;

        if (filltered_input_string.length > filltered_data.length) {
            filltered_data = filltered_data + "/";
        }
        if (filltered_input_string.length < filltered_data.length) {
            filltered_input_string = filltered_data + "/";
        }
        for(let x=0;x<filltered_data.length;x++){
            if(filltered_input_string[x]===filltered_data[x]){
                confidence++;
            }
        }
        let confidence_in_precentage=Math.round((confidence/filltered_data.length)*100);
        
        if(confidence_in_precentage>Threshold){
            console.log(confidence_in_precentage);
            index.push(w);
        }

    }
}
let data_set1=["hello","world","cursor","cursoor"]

index.push(auto_fill("cursoor",data_set1,80));
console.log(data_set1[index[index.length-2]])
console.log(index)