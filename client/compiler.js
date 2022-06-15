const host= "http://localhost:4000/";
const runurl= `${host}`;
var editor;

function createTextEditor(){
    editor= CodeMirror(document.querySelector("#editor"),
    {
        placeholder: "Write your code here and execute it",
        mode: "text/x-csrc",
        theme: "shadowfox",
        lineNumbers:true,
        screenReaderLabel: "Write you code",
        autofocus: true,
        autoCloseBrackets: true,
        styleSelectedText: true,
        styleActiveLine: true,
    });
    editor.setSize(700,630);
    setTimeout(function() {
        editor.refresh();
       }, 100);
}

function changelang(){
    var option= document.querySelector("#langdropdown").value;
    if(option=='c')
       editor.mode= "text/x-csrc";
    else if(option=='cpp')
        editor.mode= "text/x-c++src";
    else if(option=='cs')
        editor.mode= "text/x-csharp";
    else if(option=='java')
        editor.mode= "text/x-java";
    else if(option=='py')
        editor.mode= "text/x-python";
    // else if(option=='rb')
    //     editor.mode= "text/x-ruby";
    // else if(option=='kt')
    //     editor.mode= "text/x-kotlin";
    // else if(option=='swift')
    //     editor.mode= "text/x-swift";          
}

function changetheme(){
    var option= document.querySelector("#themedropdown").value;
    console.log(option)
    editor.setOption("theme",option);    
}

function changeSize(){

    var textEditor= document.querySelector("#editor");
    var option= document.querySelector("#fontdropdown").value;
    if(option==14)
       textEditor.style.fontSize= "14px";
    else if(option==16)
       textEditor.style.fontSize= "16px";
    else if(option==18)
       textEditor.style.fontSize= "18px";
    else if(option==20)
       textEditor.style.fontSize= "20px";
    else if(option==22)
       textEditor.style.fontSize= "22px";
    else if(option==24)
       textEditor.style.fontSize= "24px";
    else if(option==26)
       textEditor.style.fontSize= "26px";
    else if(option==28)
       textEditor.style.fontSize= "28px";
    else if(option==30)
       textEditor.style.fontSize= "30px";
    else if(option==32)
       textEditor.style.fontSize= "32px";
    else 
       textEditor.style.fontSize= "13px";   
}

function clickbtn(){
    document.querySelector("#uploadbtn").click();
}

function upload(){

    console.log("upload function");
    const uploadbtn= document.querySelector("#uploadbtn");
    console.log("upload btn:", uploadbtn);
    
    const input= uploadbtn.files[0];
    console.log("input:", input);
    //var input = event.target;
    var fr= new FileReader();
    fr.onload= ()=>{
        editor.setValue(fr.result);
    }

    //fr.readAsText(input.files[0]);
    fr.readAsText(input);

}

function download(){

    console.log("download function");
    const filename = document.getElementById('filename').value;
    const content = editor.getValue();
    if (!filename || !content)
    {
        showToast("Unable to download! Please fill all the fields and try again.")
        return;
    } 
            
    const anchor= document.createElement('a');
    const blob= new Blob([content], {type: 'plain/text'});

    const fileurl= URL.createObjectURL(blob);
    anchor.setAttribute("href", fileurl);
    anchor.setAttribute("download", filename);
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

function cleartxt(){
    
    input= document.querySelector("#input");
    output= document.querySelector("#output");
    editor.setValue("");
    input.value= "";
    output.value= "";
}

function run(){
    console.log("RUN FUCTION")
    const code= editor.getValue();
    const input= document.getElementById('input').value;
    const lang= document.querySelector("#langdropdown").value;
    var output= document.querySelector("#output");

    if (lang=='none' || !code)
    {
        showToast("Unable to execute code! Please fill all the fields and try again.")
        return;
    }

    const data= {
        code,
        input,
        language: lang
    };

    fetch(runurl, {
        method: "POST",
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    })
     .then((res)=> {
        console.log("res json: ",res)
        return res.json();
    })
     .then(data=> {
        console.log("DATA:",data);
        output.innerHTML= data.output;
     })
     .then(err=> console.log("ERR: ", err))
};

let toastTimer;
const showToast= (msg)=>{
  
  const toast= document.querySelector(".alert");
  clearTimeout(toastTimer);
  toast.innerText = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

