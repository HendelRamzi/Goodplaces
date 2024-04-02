document.addEventListener('DOMContentLoaded', function () {
    const month__picker = document.querySelector('.month__picker--container');
    const placeholder = document.querySelector('.month__select--container').getAttribute('data-placeholder')
    let current__year = (new Date()).getFullYear()
    let from = "";
    let to = "";
    const months = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvn', 'srp', 'zář', 'říj', 'lis', 'pro']
    // Handle update the top of the calender
    const updateTopCalender = (month__picker) => {
        month__picker.querySelector('.year__display').textContent = current__year;
    }
    const zeros = (text, size) => {
        var temp = text + '';
        while (temp.length < size) {
            temp = '0' + temp;
        }
        return temp;
    }
    const createMonthList = (index) => {
        var month__list = document.createElement('div');
        month__list.classList.add(...[`row--${index}`, "month__list--row", "d-flex", "align-items-center"])
        return month__list;
    }
    const createMonthItem = (month, month__index) => {
        const button = document.createElement('button');
        button.classList.add(`month__item`)
        button.setAttribute('data-value', month)
        button.innerText = months[month__index]
        return button;
    }


    const displayToScreen = ()=>{
        if(to == ""){
            document.getElementById('month__display--select')
            .classList.remove('span__display--placeholder')
            document.getElementById('month__display--select')
            .innerText= from
            document.querySelector('input[name="month_range"]').setAttribute('value', from) 
        }else{
            document.getElementById('month__display--select')
            .classList.remove('span__display--placeholder')
            document.getElementById('month__display--select')
            .innerText= from + " to " + to
            document.querySelector('input[name="month_range"]').setAttribute('value', from+","+to)
        }

        if(to == "" && from == ""){ 
            console.log("fefe")
            document.getElementById('month__display--select')
            .classList.add('span__display--placeholder')
            document.getElementById('month__display--select')
            .innerText= placeholder
        }
    }

    const setMonthRange = (e) => {
        if (from == "" && to == "") { //from is not set and to is not set
            // si les deux sans vide
            from = e.target.getAttribute('data-value')
        } else if (from !== "" && to == "") { //From set and to not
            if (from == e.target.getAttribute('data-value')) {
                from = "";
            } else {
                if (e.target.getAttribute('data-value') < from) {
                    from = e.target.getAttribute('data-value')
                } else {
                    to = e.target.getAttribute('data-value')
                }
            }

        } else if (from !== "" && to !== "") { // from is set and not is set
            // Handle the case here the two are not empty 
            // If it's value is one of the two, one of them will be removed
            if (e.target.getAttribute('data-value') == from) {
                to = "";
            } else if (e.target.getAttribute('data-value') == to) {
                from = to;
                to = "";
            }

            // In case we click a value diff then to and from 
            // While they are set
            if (e.target.getAttribute('data-value') > from) {
                // the to will take the new value 
                to = e.target.getAttribute('data-value')
            }

            if(e.target.getAttribute('data-value') < from){
                from = e.target.getAttribute('data-value') 
            }

        }

        displayToScreen()

    }
    const setMonthRangeStyle = () => {
        document.querySelectorAll('.month__item--active').forEach(item => {item.classList.remove('month__item--active')})
        document.querySelectorAll('.month__item--sub').forEach(item => {item.classList.remove('month__item--sub')})

        if(document.querySelector(`button[data-value="${from}"]`)){document.querySelector(`button[data-value="${from}"]`).classList.add('month__item--active')}    
        if (document.querySelector(`button[data-value="${to}"]`)){document.querySelector(`button[data-value="${to}"]`).classList.add('month__item--active')}

        document.querySelectorAll('button.month__item:not(.month__item--active)[data-value]')
        .forEach(item => {
            let x = item.getAttribute('data-value')
            if (x > from && x < to) {
                // Do something with the button, like adding a class or executing a function
                item.classList.add('month__item--sub');
            }
        })
    }


    // Initiate the year and the input checkboxs
    const updateMonthsDisplay = () => {
        updateTopCalender(month__picker)
        const month__body = month__picker.querySelector('.month__picker--body');

        if(month__body.querySelectorAll('.month__list--row').length > 0){
            month__body.querySelectorAll('.month__list--row')
            .forEach(item => {
                month__body.removeChild(item);
            })
        }

        for (var i = 0; i < 4; i++) {
            month__body.appendChild(createMonthList(i));
            for (var j = 0; j < 3; j++) {
                var month = current__year + '-' + zeros(1 + j + 3 * i, 2);
                month__body.querySelector(`.row--${i}`).appendChild(createMonthItem(month, j + 3 * i))
            }
        }

        month__body.querySelectorAll('.month__item')
            .forEach(button => {
                button.addEventListener('click', e => {
                    e.preventDefault(); 
                    setMonthRange(e); 
                    setMonthRangeStyle(); 
                })
            })

        setMonthRangeStyle()
        displayToScreen()


    }


    month__picker.querySelector('.previous__button').addEventListener('click', e => {
        current__year--;
        updateMonthsDisplay()

    })

    month__picker.querySelector('.next__button').addEventListener('click', e => {
        current__year++;
        updateMonthsDisplay()
    })

    

    document.querySelector('.select__container').addEventListener('click', e => {
        e.preventDefault()
        document.querySelector('.month__picker--container').classList.toggle('month__picker--container--active')
    })


    updateMonthsDisplay()
})