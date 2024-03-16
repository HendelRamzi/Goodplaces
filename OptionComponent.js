document.addEventListener('DOMContentLoaded', function(){
    const maxTagToShow = 4; 
    const constomSelects = document.querySelectorAll('.custom--select'); 

    console.log(constomSelects)


    function updateSelectedOptions(customSelect){
        const selectedOptions = Array.from(customSelect.querySelectorAll(".option__item.option__item--active"))
            .filter(opt => opt !== customSelect.querySelector(".option__item.all-tags"))
            .map(opt => {
                return {
                    value : opt.getAttribute('data-value'), 
                    text: opt.textContent.trim(),
                };
            })


        // Get only the value of the selected option
        // Fill the input feild with the value of the selected options
        customSelect.querySelector('.tags_input').value = 
        selectedOptions.map(opt => {return opt.value}).join(', '); 


        const placeholder = customSelect.getAttribute('data-placeholder'); 
        let tagHTML = ""; 
        if(selectedOptions.length === 0){
            tagHTML = `<span class="select__box--placeholder"> ${placeholder} </span>`; 
        } else{
            let additionalTagCount = 0 ; 
            selectedOptions.forEach((opt, index) => {
                if(index < maxTagToShow){
                    tagHTML += ` <span class="tag"> ${opt.text} <span class=" remove-tag" data-value="${opt.value}">&times;</span></span>`
                }else{
                    additionalTagCount++
                }
            })

            if(additionalTagCount > 0 ){
                tagHTML += `<span class="tag">+${additionalTagCount}</span>`
            }
        }

        customSelect.querySelector('.selected--options').innerHTML= tagHTML;

    }



    // Handle the searching bar
    constomSelects.forEach(function(customSelect){
        const searchInput = customSelect.querySelector('.search-tags')
        const optionsContainer = customSelect.querySelector('.options')
        const option__items = customSelect.querySelectorAll('.option__item')
        const all__options = customSelect.querySelector('.option__item.all-tags')
        const clear__btn  = customSelect.querySelector('.clear--button')


        // Select all handler
        all__options.addEventListener('click', () => {
            const isActive = all__options.classList.contains('option__item--active'); 
            option__items.forEach(opt =>{
                if(opt !== all__options){
                    opt.classList.toggle('option__item--active', !isActive)
                }
            })

            updateSelectedOptions(customSelect)
        })

        // Clear button handler
        clear__btn.addEventListener('click', ()=>{
            searchInput.value =""; 
            option__items.forEach(opt =>{
                opt.style.display = "block"; 
            });
        })


        // Search for value handler
        searchInput.addEventListener('input', ()=>{
            const searchTerm = searchInput.value.toLowerCase(); 

            option__items.forEach(opt => {
                const optText = opt.textContent.trim().toLocaleLowerCase();
                const shouldShow = optText.includes(searchTerm);
                opt.style.display = shouldShow ? "block" : "none"; 
            });
            
            const anyOptionsMath = Array.from(option__items)
            .some(opt => opt.style.display === "block")

            if(searchTerm){
                optionsContainer.classList.add('option-search-active')
            }else{
                optionsContainer.classList.remove('option-search-active')
            }
        })

    })




    // Click options handler
    constomSelects.forEach(function(customSelect){
         const options = customSelect.querySelectorAll('.option__item')
         options.forEach(function(opt){
            opt.addEventListener('click', function(){
                opt.classList.toggle('option__item--active')
                updateSelectedOptions(customSelect);
            })
         })
    })


    // Handle the delete tag button
    document.addEventListener('click', function(e){
        const removeTag = e.target.closest('.remove-tag');
        if(removeTag){
            const customSelect = removeTag.closest('.custom--select');
            const valueToRemove = removeTag.getAttribute('data-value');
            console.log(valueToRemove)
            customSelect.querySelector(`.option__item[data-value="${valueToRemove}"]`).classList.remove('option__item--active')

            updateSelectedOptions(customSelect)
        }

    })


    const selectBoxes = document.querySelectorAll('.select--box')
    selectBoxes.forEach(selectBox => {
        selectBox.addEventListener('click', e => {
            if(!e.target.closest('.tag')){
                selectBox.parentNode.classList.toggle('open')
            }
        })
    })

    document.addEventListener('click', e =>{
        if(!e.target.closest('.custom--select') && !e.target.classList.contains('remove-tag')){
            constomSelects.forEach(cs => {
                cs.classList.remove('open')
            });
        }
    })


    function resetCustomSelects(){
        constomSelects.forEach( cs =>{
            cs.querySelectorAll('.option__item.option__item--active').forEach(opt =>{
                opt.classList.remove('option__item--active')
            });
            cs.querySelector('.option__item.all-tags').classList.remove('option__item--active')
            updateSelectedOptions(cs)
            
        }); 
    }

    constomSelects.forEach(cs => {
        updateSelectedOptions(cs)
    })
})