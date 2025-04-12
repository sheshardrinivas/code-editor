const { ipcRenderer } = require('electron');
const { exec } = require("child_process");




const path = require("path");
const textArea = document.getElementById("fastTextArea");



function auto_fill(input_string,data_set,Threshold,index){

    for(let w=0;w<data_set.length;w++){
        let filltered_input_string=input_string.replace(/ /g,"");
        let filltered_data=data_set[w].replace(/ /g,"");
        

        if (filltered_input_string.length > filltered_data.length) {
            filltered_data = filltered_data + "_";
        }
        if (filltered_input_string.length < filltered_data.length) {
            filltered_input_string = filltered_data + "_";
        }
        let  confidence =0;
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

document.addEventListener("DOMContentLoaded", () => {


    textArea.addEventListener("keydown", (event) => {
        if (event.metaKey || event.ctrlKey) { 
            switch (event.key.toLowerCase()) {
                case 'a': 
                    event.preventDefault();
                    textArea.select();
                    break;
                case 'c':
                    event.preventDefault();
                    document.execCommand("copy");
                    break;
                case 'v':
                    event.preventDefault();
                    navigator.clipboard.readText().then((clipText) => {
                        const start = textArea.selectionStart;
                        const end = textArea.selectionEnd;
                        const text = textArea.value;
                        textArea.value = text.slice(0, start) + clipText + text.slice(end);
                        textArea.setSelectionRange(start + clipText.length, start + clipText.length);
                    }).catch(err => console.error("Failed to paste: ", err));
                    break;
            }
        }
    });
    textArea.addEventListener("keydown",(event)=>{
        if(event.key==="Tab"){
        
            const ul = document.getElementById("auto_fill_list");
            const li = document.createElement("li");
            const autoFill = document.getElementById("auto-fill");
            ul.innerHTML=""
            autoFill.style.opacity=1;

              
  
            
            let list_count=0;
            let data_set1=["hello","world","cursor","python"]
            let data_input=textArea.value;
            let index2=[]
            auto_fill(data_input,data_set1,40,index2)
            for(let x=0;x<index2.length;x++){
                
                li.textContent = data_set1[index2[x]];
                li.classList.add("item"+list_count);  
                ul.appendChild(li);
                list_count++;
            }   
        }
        if(event.key=="Escape"){
            const autoFill = document.getElementById("auto-fill");
            autoFill.style.opacity=0;
         
        }
    });

});





