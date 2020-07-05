let counter = 0,counter2 = 0
// navigate into pages 
document.querySelector('.btnToAddNewCategory').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "block"
    document.querySelector('.MainBody').style.display = "none"
 
})
document.querySelector('.BackArrow').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "none"
    document.querySelector('.MainBody').style.display = "block"
})

// add List to UL
document.querySelector('.SavebtnForFooter').addEventListener('click', appendingList);

function appendingList(){
    let categoryName = document.querySelector('.categoryInput');
    let description = document.querySelector('.descriptionInput');
    let tags = document.querySelector('.tagsInput');
    let ul = document.querySelector('.categoryDataList');
    let select = document.querySelector('.parentCategory');
    let parent = select
    let newClass = categoryName.value.split(' ').join('');
    let output = `<div class="OuterShell">
                    <img class="dragLogo" id=${newClass} ondragstart="dragStart(event)" draggable="true" ondragover="dragOver(event)" src="drag.png"/>
                    <ion-icon class="arrowIcon1" id="show${++counter}" onclick="show(id)" name="caret-forward-outline"></ion-icon>
                    <ion-icon class="arrowIcon2" id="hideshow${++counter2}" onclick="hide(id)"  name="caret-down-outline"></ion-icon>
                    <div class="IMG"  ></div>
                    <div class="ListelementsDisplay">
                        <p class="categoryName">${categoryName.value}</p>
                        <p class="descriptionForCategory"> ${description.value}</p>
                        <p class="tagsForCategory"> ${tags.value} </p>
                        <p class="subCategoryOrProductsForCategory">2</p>
                        <div class="ActiveDeactiveTogglerSwitch" onclick="this.classList.toggle('active')">
                            <div class="ActiveDeactiveToggler "></div>
                        </div>
                    </div>
                    <ion-icon class="iconForDeleteandEdit" name="ellipsis-vertical-outline"></ion-icon>
                </div>`
    let li = document.createElement('li');
    let option = document.createElement('option');
    let UL
    if(parent.value == 'none'){
        UL = document.createElement('ul')
        UL.setAttribute('class' , 'subCategoryHidden')
        UL.className += ' '+newClass
        option.textContent = categoryName.value
        select.appendChild(option)
        li.innerHTML = output;
        li.appendChild(UL)
        li.setAttribute('class' , 'categoryNameInList');
        li.setAttribute('id',counter)
        li.setAttribute('ondrop',"dragDrop(event)")
        ul.appendChild(li);
        categoryName.value = "";
        description.value = "";
        tags.value = "";
        parent.value = "none";
    }
    else{
        let hiddenli = document.createElement('li')
        hiddenli.innerHTML = output 
        hiddenli.childNodes[0].childNodes[3].setAttribute('class','HideIt')
        hiddenli.childNodes[0].childNodes[5].setAttribute('class','HideIt')
        hiddenli.setAttribute('class','subCategoryNameInList')
        let parentEle = document.querySelector('.'+parent.value.split(' ').join(''));
        parentEle.appendChild(hiddenli)
        categoryName.value = "";
        description.value = "";
        tags.value = "";
        parent.value = "none";
    }
}

function show(id){
    let sideArrow = document.getElementById(id);
    let parent = sideArrow.parentElement.parentElement
    let classname = parent.lastChild.classList[1]
    let ArrowDown = document.getElementById('hide'+id);
    let displayHiddenSubList = document.querySelector('.'+classname)
    sideArrow.style.display = "none"
    ArrowDown.style.display = "block"
    displayHiddenSubList.style.display = "block"
}
function hide(id){
    let idupdated = id.slice(4,id.length)
    let sideArrow = document.getElementById(idupdated);
    let ClassName = sideArrow.parentElement.parentElement.lastChild.classList[1]
    let ArrowDown = document.getElementById(id);
    let displayHiddenSubList = document.querySelector('.'+ClassName)
    sideArrow.style.display = "block"
    ArrowDown.style.display = "none"
    displayHiddenSubList.style.display = "none"
}


let LIs = document.querySelectorAll('.categoryNameInList');


function dragStart(e){
    e.dataTransfer.setData("id", e.target.id);
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){
    console.log(e.target.className)
    e.preventDefault();
    let data = e.dataTransfer.getData("id");
    // let temp1 = document.getElementById(data)
    // let temp2 = document.getElementById(e.target.id);

    let first = document.getElementById(document.getElementById(data).parentElement.parentElement.id)
    let second = document.getElementById(document.getElementById(e.target.id).parentElement.parentElement.id)

    let tempr = second.innerHTML 
    second.innerHTML = first.innerHTML
    first.innerHTML = tempr

}







