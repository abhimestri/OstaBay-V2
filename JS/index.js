// global decleration part
let counter = 0,counter2 = 0;


// navigate into pages 
document.querySelector('.btnToAddNewCategory').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "block"
    document.querySelector('.MainBody').style.display = "none"
 
})
document.querySelector('.BackArrow').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "none"
    document.querySelector('.MainBody').style.display = "block"
})



// to check if its a edit functionality to edit selected element or add new list element
function additionOfList(id){
    let categoryName,description,tags;
    categoryName = document.querySelector('.categoryInput');
    description = document.querySelector('.descriptionInput');
    tags = document.querySelector('.tagsInput');
    if(id){
        console.log('inside id')
        let DATA = [...document.getElementById(id).childNodes[9].childNodes]
        DATA[1].innerText = categoryName.value;
        DATA[3].innerText = description.value;
        DATA[5].innerText = tags.value;
        categoryName.value = "";
        description.value = "";
        tags.value = "";
        parent.value = "none";
        document.querySelector('.SectionForDirectDeleteAndEdit').style.display = "none"
        let SAVEBTNFTR = document.querySelector('.SavebtnForFooter');
        SAVEBTNFTR.setAttribute('onclick' , `additionOfList()`)
    }else{
        appendingList();
    }
}

// add List to UL
// append list element to admin panel
function appendingList(){
    let categoryName,description,tags;
    categoryName = document.querySelector('.categoryInput');
    description = document.querySelector('.descriptionInput');
    tags = document.querySelector('.tagsInput');
    if(categoryName.value == 0){
        alert('Category Name is Required')
    }else{
    let ul = document.querySelector('.categoryDataList');
    let select = document.querySelector('.parentCategory');
    let unique =Math.random() * Math.random();
    let parent = select
    let newClass = categoryName.value.split(' ').join('');
    let output = `<div class="OuterShell" id=${unique}>
                    <img class="dragLogo" id=${newClass} ondragstart="dragStart(event)" draggable="true" ondragover="dragOver(event)" src="./Assets/drag.png"/>
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
                    <div class="SectionForDirectDeleteAndEdit" id=${unique+unique}>
                        <p class="PEdit" onclick="EditListCategory(${unique})" >Edit</p>
                        <p class="PDelete" onclick="DeleteListCategory(${unique})">Delete</p>
                    </div>
                    <ion-icon class="iconForDeleteandEdit" onclick=DisplayEditSec(${unique+unique}) name="ellipsis-vertical-outline"></ion-icon>
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
                li.setAttribute('id' , 'parentELE')
                li.id += ' '+counter;
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
                hiddenli.setAttribute('id' , 'childELE')
                hiddenli.id += ' '+newClass+counter;
                hiddenli.setAttribute('ondrop',"dragDrop(event)")
                hiddenli.childNodes[0].childNodes[3].setAttribute('class','HideIt')
                hiddenli.childNodes[0].childNodes[5].setAttribute('class','HideIt')
                hiddenli.setAttribute('class','subCategoryNameInList')
                let parentEle = document.querySelector('.'+parent.value.split(' ').join(''));
                parentEle.appendChild(hiddenli)
                parentEle.className += ' '+parent.value.split(' ').join('')
                categoryName.value = "";
                description.value = "";
                tags.value = "";
                parent.value = "none";
            }
    }
}


// show and hide sub category for main category
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

// drag and drop list elements
function dragStart(e){
    e.dataTransfer.setData("id", e.target.parentElement.parentElement.id);
    console.log(e.target.parentElement.parentElement.id.startsWith('parentELE'))
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(e){
    e.preventDefault();
    let data = e.dataTransfer.getData("id");

    if(data.startsWith('parentELE') == true && e.target.parentElement.parentElement.id.startsWith('childELE') == true){
        alert("ERROR!! can't add Main Category to Sub Category ")
    }else if(data.startsWith('childELE') == true && e.target.parentElement.parentElement.id.startsWith('parentELE') == true){
        alert("ERROR!! can't add Sub Category to Main Category ")
    }else{
        let first = document.getElementById(data);
        let second = document.getElementById(e.target.parentElement.parentElement.id);
        let tempr = second.innerHTML 
        second.innerHTML = first.innerHTML
        first.innerHTML = tempr
    }
}

// display box for edit and delete option
function DisplayEditSec(id){
    let showHiddenBox = document.getElementById(id)
    if(showHiddenBox.style.display == "block"){
        showHiddenBox.style.display = "none";
    }else{
        showHiddenBox.style.display = "block";
    }
}


// edit list element
function EditListCategory(id){
    document.getElementById(id+id).style.display = "none"
   let DATA = [...document.getElementById(id).childNodes[9].childNodes]
   let CategoryValue = DATA[1].innerHTML;
   let DescriptionValue = DATA[3].innerHTML;
   let TagsValue = DATA[5].innerHTML;
    document.querySelector('.categoryInput').value = CategoryValue
    document.querySelector('.descriptionInput').value = DescriptionValue
    document.querySelector('.tagsInput').value = TagsValue;

    document.querySelector('.HiddenAddNewCategory').style.display = "block"
    document.querySelector('.MainBody').style.display = "none"

    let SAVEBTNFTR = document.querySelector('.SavebtnForFooter');
    SAVEBTNFTR.setAttribute('onclick' , `additionOfList(${id})`)

}

// delete list element
function DeleteListCategory(id){
    let deleteLi = document.getElementById(id).parentElement;
    deleteLi.outerHTML = ""
}


// add quality
function AddQuality(){
    let inputDisplay =  document.querySelector('.addNewQuality');
    let AddBtnDisplay = document.querySelector('.addNewQualityBtn');
    if(inputDisplay.style.display == 'block' && AddBtnDisplay.style.display == 'block'){
        inputDisplay.style.display = 'none';
        AddBtnDisplay.style.display = 'none';
    }else{
        inputDisplay.style.display = 'block';
        AddBtnDisplay.style.display = 'block';
    }
}

function addQualityBtn(e){
    e.preventDefault();
    let parenToBeAppended = document.querySelector('.addQualityList');
    let liValueAdded = document.querySelector('.addNewQuality').value;
    let CLASS = liValueAdded
    if(liValueAdded == 0){
        alert('please add quality')
    }else{
    let OutPut = `<div class="eachSectionOfQuality">
                        <img draggable="true" id=${liValueAdded}${liValueAdded}${Math.random()+Math.random()} class="Image" src="./Assets/drag.png" />
                        <p class="Quality">${liValueAdded}</p>
                        <ion-icon data-toggle="tooltip" title="Delete" onclick="deleteQuality(${CLASS})" class="iconForDeleteQuality" name="ellipsis-vertical-outline"></ion-icon>
                    </div>`
    let li = document.createElement('li');
    li.setAttribute('ondrop' ,"dragDropforQualityList(event)");
    li.setAttribute('ondragover' ,"dragOverforQualityList(event)");
    li.setAttribute('ondragstart',"dragStartforQualityList(event)")
    li.setAttribute('id',liValueAdded);
    li.innerHTML = OutPut;
    console.log(li)
    parenToBeAppended.appendChild(li);
    document.querySelector('.addNewQuality').value = "";
    document.querySelector('.addNewQuality').style.display = "none";
    document.querySelector('.addNewQualityBtn').style.display = "none";
    }
}


// drag and drop list elements
function dragStartforQualityList(e){
    e.dataTransfer.setData('id',e.target.id);
}
function dragOverforQualityList(e){
    e.preventDefault()
}
function dragDropforQualityList(e){
    let dragged = e.dataTransfer.getData('id');

    let FirstLI = document.getElementById(dragged).parentElement.parentElement;
    let secondLI = document.getElementById(e.target.id).parentElement.parentElement;

    let temps = secondLI.innerHTML;
    secondLI.innerHTML = FirstLI.innerHTML;
    FirstLI.innerHTML = temps;
} 


// delete quality list element
function deleteQuality(ClassName){
    ClassName.outerHTML = "";
}



// add activation class to link 
function LinkActivation(id){
    console.log(id)
    let EachElementShown = [...document.querySelector(".asideSectionList").children]
    // console.log(EachElement)
    EachElementShown.map( (ele)=> {
        console.log(ele)
       if(id == ("Shown" + EachElementShown.indexOf(ele))){
        document.getElementById(id).setAttribute('class' , 'SelectedAsideElement')
       }else{
        document.getElementById("Shown" + EachElementShown.indexOf(ele)).setAttribute('class' , 'asideSection')
       }
   })    
}