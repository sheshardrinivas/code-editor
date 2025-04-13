const { ipcRenderer } = require('electron');
const { exec } = require("child_process");
const path = require("path");
const textArea = document.getElementById("fastTextArea");
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


});





