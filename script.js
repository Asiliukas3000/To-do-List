let mainBox = document.getElementById("mainBox");
let addListButton = document.getElementById("addListButton");
let inputField = document.getElementById("inputField");

let autoSaveButton = document.getElementById("autoSaveButton");
let downloadButton = document.getElementById("downloadButton");
let uploadButton = document.getElementById("uploadButton");

downloadButton.addEventListener("click",DownloadData);
uploadButton.addEventListener("click",UploadData);

let lists = new Array()

let autoSave=false;
autoSave = localStorage.getItem("autoSave");
if(!autoSave)autoSaveButton.innerHTML= "Auto save <b>Off</b>";
if(autoSave)UploadData();


autoSaveButton.addEventListener("click", function()
{
    if(autoSave)
    {
        autoSave=false;
        autoSaveButton.innerHTML= "Auto save <b>Off</b>"
        localStorage.setItem("autoSave",autoSave);
    }
    else
    {
        autoSave=true;
        autoSaveButton.innerHTML= "Auto save <b>On</b>" 
        localStorage.setItem("autoSave",autoSave);
        localStorage.setItem("data",JSON.stringify(lists));
    }
})

addListButton.addEventListener("click", function () {
    if(inputField.value!="")
    {
    lists.push(
        {
            name: inputField.value,
            items: new Array()
        })
    updateList();
    if(autoSave)DownloadData();
    inputField.value = "";
    }
    else alert("Please type in the name of the list")
})

function updateList() {
    if(autoSave)DownloadData();
    mainBox.innerHTML = "";
    for (let i = 0; i < lists.length; i++) {
        //new list box
        let listBox = document.createElement("div");
        listBox.className = "listBox";

        //new delete list button
        let deleteListButton = document.createElement("button");
        deleteListButton.innerHTML = "X";
        deleteListButton.addEventListener("click", function () {
            lists.splice(i, 1);
            updateList();
        })
        //name of the list
        let name = document.createElement("h2");
        name.textContent = lists[i].name;
        deleteListButton.className="deleteButton";
        //the input field
        let input = document.createElement("input");
        let addItemButton = document.createElement("button");
        addItemButton.innerHTML = "Add Item";
        input.placeholder = "Name of the item";

        addItemButton.addEventListener("click", function () {
            if(input.value!="")
            {
            lists[i].items.push(
                {
                    text: input.value,
                    priority: 0,
                    date: new Date().toDateString().split(' ')[1] + " "+ new Date().toDateString().split(' ')[2]
                })
            
            updateList();
            }
            else alert("Please enter the name of the item")
        })
        let list = document.createElement("ul");
        for (let j = 0; j < lists[i].items.length;j++)
        {
            let item = document.createElement("div");
            let deleteItemButton = document.createElement("button");
            let date = document.createElement("b");
            if(lists[i].items[j].priority == 0)date.className="notImportant";
            if(lists[i].items[j].priority == 1)date.className="important";
            if(lists[i].items[j].priority == 2)date.className="veryImportant";
            let text = document.createElement("p");

            deleteItemButton.addEventListener("click", function()
            {
              lists[i].items.splice(j,1);  
              updateList();
            })
            deleteItemButton.textContent="X";
            deleteItemButton.className="deleteButton";
            

            date.textContent=lists[i].items[j].date;
            text.textContent=lists[i].items[j].text;

            let priority0Button = document.createElement("button");
            let priority1Button = document.createElement("button");
            let priority2Button = document.createElement("button");
            priority0Button.className="whiteButton";
            priority1Button.className="orangeButton";
            priority2Button.className="redButton";

            priority0Button.addEventListener("click",function()
            {
                lists[i].items[j].priority=0;
                date.className="notImportant";
                lists[i].items.sort(compare);
                updateList();
            })
            priority1Button.addEventListener("click",function()
            {
                lists[i].items[j].priority=1;
                date.className="important";
                lists[i].items.sort(compare);
                updateList();
            })
            priority2Button.addEventListener("click",function()
            {
                lists[i].items[j].priority=2;
                date.className="veryImportant";
                lists[i].items.sort(compare);
                updateList();
            })


            item.append(deleteItemButton);
            item.append(priority2Button);
            item.append(priority1Button);
            item.append(priority0Button);
            item.append(date);
            item.append(text);

            

            item.className="item";

            list.append(item);  
        }

        listBox.append(deleteListButton);
        listBox.append(name);
        listBox.append(input);
        listBox.append(addItemButton);
        listBox.append(list);

        mainBox.append(listBox);
    }
}
function compare( a, b ) {
    if ( a.priority > b.priority ){
      return -1;
    }
    if ( a.priority < b.priority ){
      return 1;
    }
    return 0;
}
function UploadData()
{
    lists=JSON.parse(localStorage.getItem("data"));
    updateList();
    //alert("uploaded!");
}
function DownloadData()
{
    localStorage.setItem("data",JSON.stringify(lists));
    //alert("downloaded");
}
