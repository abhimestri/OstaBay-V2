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
    let categoryName = document.querySelector('.categoryInput').value;
    let description = document.querySelector('.descriptionInput').value;
    let tags = document.querySelector('.tagsInput').value;
    let ul = document.querySelector('.categoryDataList');
    let select = document.querySelector('.parentCategory');
    let parent = select.value
    let newClass = categoryName.split(' ').join('');
    let output = `<div class="OuterShell">
                    <img class="dragLogo" src="drag.png"/>
                    <ion-icon class="arrowIcon1" id="show${++counter}" onclick="show(id)" name="caret-forward-outline"></ion-icon>
                    <ion-icon class="arrowIcon2" id="hideshow${++counter2}" onclick="hide(id)"  name="caret-down-outline"></ion-icon>
                    <div class="IMG"></div>
                    <div class="ListelementsDisplay">
                        <p class="categoryName">${categoryName}</p>
                        <p class="descriptionForCategory"> ${description}</p>
                        <p class="tagsForCategory"> ${tags} </p>
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
    if(parent == 'none'){
        UL = document.createElement('ul')
        UL.setAttribute('class' , 'subCategoryHidden')
        UL.className += ' '+newClass
        option.textContent = categoryName
        select.appendChild(option)
        li.innerHTML = output;
        li.appendChild(UL)
        li.setAttribute('class' , 'categoryNameInList');
        ul.appendChild(li);
    }
    else{
        let hiddenli = document.createElement('li')
        hiddenli.innerHTML = output 
        hiddenli.setAttribute('class','subCategoryNameInList')
        let parentEle = document.querySelector('.'+parent.split(' ').join(''));
        parentEle.appendChild(hiddenli)
    }
    console.log(li)
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

