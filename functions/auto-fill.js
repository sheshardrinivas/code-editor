function auto_fill(input_string,data_set,Threshold,index){

    for(let w=0;w<data_set.length;w++){

        let filltered_input_string=input_string.replace(/ /g,"");

        let filltered_data=data_set[w].replace(/ /g,"");

        let  confidence =0;
        
        if (filltered_input_string.length > filltered_data.length) {

            filltered_data = filltered_data + "_";
        }

        if (filltered_input_string.length < filltered_data.length) {

            filltered_input_string = filltered_data + "_";
        }
        
        for(let x=0;x<filltered_data.length;x++){

            if(filltered_input_string[x]===filltered_data[x]){

                confidence++;
            }
        }
        
        let confidence_in_precentage=Math.round((confidence/filltered_data.length)*100);
        
        if(confidence_in_precentage>Threshold){

            index.push(w);

        }

    }
}

let index1=[];

let data_set1=["make","hello","thank you","school","home"];

auto_fill("hell0o",data_set1,40,index1);

console.log(data_set1[index1[0]]);

