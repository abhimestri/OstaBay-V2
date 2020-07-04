document.querySelector('.btnToAddNewCategory').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "block"
    document.querySelector('.MainBody').style.display = "none"
 
})

document.querySelector('.BackArrow').addEventListener('click',function(){
    document.querySelector('.HiddenAddNewCategory').style.display = "none"
    document.querySelector('.MainBody').style.display = "block"
})