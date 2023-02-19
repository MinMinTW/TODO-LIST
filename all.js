const inputBlank = document.querySelector('.inputBlank');
const inputBtn = document.querySelector('.inputBtn');
const todos = document.querySelector('.todos');
const undoneItems = document.querySelector('.undoneItems');
const checkbox = document.querySelector('.checkbox input');
const deleteItems = document.querySelector('.deleteItems');
const listTab = document.querySelector('.listTab');

let data =[
    {
        todo: "打電話叫媽媽匯錢給我",
        confirm: false,
        id: new Date().getTime()
    },
];

function init(data){
    let str =""; //要記得放在function內，不然清單會一直疊加
    let count = data.length;
    data.forEach(function(item){

    let contentFalse = `<li class="eachTodo" data-id="${item.id}">
    <label class="checkbox" for="" >
        <input type="checkbox" />
        <span>${item.todo}</span>
    </label>
    <a href="#" class="deleteList"></a>                    
    </li>`
    let contentTrue = `<li class="eachTodo" data-id="${item.id}">
    <label class="checkbox" for="" >
        <input type="checkbox" checked/>
        <span>${item.todo}</span>
    </label>
    <a href="#" class="deleteList"></a>                    
    </li>`



    if ((item.confirm == false)){
        str += contentFalse;
    }else if(item.confirm == true){
        str += contentTrue;
        count-=1
    }

});

    todos.innerHTML = str;
    let undone = countUndone()
    undoneItems.textContent = undone;

    let notice = `<p class="notice">找點事情來做吧!</p>`
    if(data==""){
        todos.innerHTML = notice
    };
    
};
init(data);

//將計算待完成數量的程式碼獨立出來，
//並於init()和updateTab分別呼叫，
//才不會因為切換標籤時重複計算而產生問題。
function countUndone(){
    let count = 0;
    data.forEach(function(item){
        if(!item.confirm){  //也可寫成if(item.confirm==false) 
            count++
        }
    })
    return count;
}

//以滑鼠點擊與ENTER鍵輸入待辦事項
inputBlank.addEventListener('keypress', function(e){
    if(e.key =="Enter"){
        addTodo() 
    }
});

inputBtn.addEventListener('click', function(e){
    e.preventDefault();
    addTodo() 

});


function addTodo(){
    let newTodo = {};
    newTodo.todo= inputBlank.value;
    newTodo.confirm=false;
    newTodo.id = new Date().getTime()
    if(newTodo.todo.trim()==""){
        alert("輸入一些代辦事項吧!")
        return
    }else{
        data.push(newTodo);
    }
    inputBlank.value="";
    updateTab()
}


todos.addEventListener('click', function(e){
    let id = parseInt(e.target.closest("li").dataset.id);
    if(e.target.getAttribute("class") == "deleteList"){
        e.preventDefault();
        let index = data.findIndex((item) => item.id === id);
        data.splice(index,1)
    }else if(e.target.nodeName == "INPUT"){
        data.forEach((item) =>{
            if(item.id === id){
                if(item.confirm==true){
                    item.confirm=false
                   } else if(item.confirm==false){
                    item.confirm=true
                  }
            }
        })
        
}
    updateTab()
    })

//清除已完成項目
deleteItems.addEventListener("click", function(e){
    e.preventDefault();
    if(confirm("你確定要清除已完成項目嗎?")===true){
    data=data.filter(function(item){ //讓data內容變成篩選後的內容
        return item.confirm==false
    })
    }
    updateTab()
})

//標籤分類切換

let listStatus = "all"

let listTabs=document.querySelectorAll('.listTab li')
listTab.addEventListener("click", function(e){
    listStatus=e.target.dataset.status;

    listTabs.forEach(function(item){ 
        item.classList.remove("active")
    })
    e.target.classList.add("active")
    updateTab()
})

function updateTab(){
    let tabData =[];
    
    if(listStatus == "all"){
        tabData = data;
    }else if(listStatus == "notDone"){
        tabData = data.filter(function(item){
            return item.confirm == false
        })
    }else if(listStatus == "done"){
        tabData = data.filter(function(item){
        return item.confirm == true
    })
    }
    init(tabData);

}
