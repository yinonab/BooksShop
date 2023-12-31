'use strict'



var gHammerMOdal
var gRead
function onInit() {
    renderStatistic()
    renderBooks()
    onSwipe()

}
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onSwipe() {
    const elMOdal = document.querySelector('.modal')
    gHammerMOdal = new Hammer(elMOdal)
    console.log('elMOdal:', elMOdal)
    gHammerMOdal.on('swipeleft swiperight', ev => {
        if (ev.type === 'swiperight') {
            renderNextBookModal()
        }
        if (ev.type === 'swipeleft') { 
            rendePrevBookModal() }
    })
}
function renderNextBookModal() {
    const bookNextIdx = getNextBook(gBookIdx)
    if (bookNextIdx>gBooks.length-1) return
    const bookid = getBookByIdx(bookNextIdx)
    onReadBook(bookid)
}
function rendePrevBookModal() {
    const bookPrevIdx = getPrevBook(gBookIdx)
    if (bookPrevIdx<0) return
    const bookid = getBookByIdx(bookPrevIdx)
    onReadBook(bookid)
}


function renderBooks() {
    var books = getBooks()
    var strCardHtml = books.map(book => `
    <div class="user-card">
        <p><strong data-trans="th-id-card">ID:</strong> ${book.id}</p>
        <p><strong data-trans="th-name-card">NAME:</strong> ${book.name}</p>
        <p><strong data-trans="th-price-card">PRICE:</strong> ${book.Price}</p>
        <p><strong data-trans="th-rate-card">RATE:</strong> ${book.rate}</p>
        
        <button class="btcard" onclick="onUpdateBook('${book.id}')" data-trans="btn-update">Update</button>
        <button data-trans="btn-remove" title="Delete Book" class="btn-remove btcard " onclick="onRemoveBook('${book.id}')">X</button>
        <button data-trans="btn-read" class="btcard" onclick="onReadBook('${book.id}')">Details</button>
        
        </div>
    `).join('')

    setElHtml('user-list', strCardHtml)
    var strHtml = books.map(book =>
        `
          <tr>
            <td>${book.id}<br><button data-trans="btn-update" onclick="onUpdateBook('${book.id}')">Update</button><button data-trans="btn-read" onclick="onReadBook('${book.id}')">Read</button><button data-trans="btn-remove" title="Delete Book" class="btn-remove" onclick="onRemoveBook('${book.id}')">X</button></td>
            <td>${book.name}</td>
            <td>${book.Price}</td>
            <td>${book.rate}</td>
          </tr>   
    `).join('')
    setElHtml('table-body', strHtml)
    doTrans()
}
function onGrid() {
    console.log('hi');
    addClass('hidden', 'table-body')
    addClass('hidden', 'head')
    removeClass('hidden', 'card-container')
}
function onTable() {
    removeClass('hidden', 'head')
    addClass('hidden', 'card-container')
    removeClass('hidden', 'table-body')
}
function onAddBook(name, price) {
    var name = prompt('enter new book name :')
    var price = prompt('enter new price :')
    if (name && price) {
        const book = addBook(name, price)
        renderBooks()
        renderStatistic()
        toggleMenu()
    }
}
function onReadBook(bookId) {
    findBookIdx(bookId)
    console.log('gBookIdx:', gBookIdx)
    const book = getBookById(bookId)
    const elModal = document.querySelector('.modal')

    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.Price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.remove('hidden')
    // onSwipe()
}
function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('please enter new price', book.Price)
    if (newPrice && book.Price !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
    }
}
function renderStatistic() {
    var stat = getBookCountByPriceMap()
    console.log('statistics:', stat)
    var strHtml =
        `
          <tr>
            <td>In Discount: ${stat.cheep}</td>
            <td> Affordable Price: ${stat.normal}</td>
            <td> Expensive: ${stat.expensive}</td>
          </tr>   
    `
    setElHtml('diagram', strHtml)
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    renderStatistic()
    flashMsg('Book Removed')
}
// function onNextPage() {
//     nextPage()
//     renderBooks()
// }

// function onPrevPage() {
//     prevPage()
//     renderBooks()
// }
function onChangePage(diff) {
    changePage(diff)
    renderBooks()
    renderStatistic
}
function onSetFilterBy(ev, filterBy) {
    console.log('filterBy:', filterBy)
    ev.preventDefault()
    filterBy = setBookFilter(filterBy)
    renderBooks()
    toggleMenu()
    var elInput = document.getElementById('searchInput')
    console.log('elInput:', elInput)
    elInput.value = ''
    const queryParams = `?name=${filterBy.name}&price=${filterBy.price}&rate=${filterBy.rate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryParams

    window.history.pushState({ path: newUrl }, '', newUrl)


}
function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    if (!prop) return

    const sortBy = {}
    sortBy[prop] = (isDesc) ? 1 : -1 // { maxSpeed: 1 }

    console.log('sortBy', sortBy)

    // Shorter Syntax:
    // const sortBy = {
    //     [prop] : (isDesc)? -1 : 1
    // }

    setBookSort(sortBy)
    renderBooks()
    toggleMenu()

}

function flashMsg(msg) {
    const elMsg = document.querySelector('.user-msg')

    elMsg.innerText = msg
    elMsg.classList.add('open')
    setTimeout(() => elMsg.classList.remove('open'), 3000)

}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}
function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks()
    doTrans()
    toggleMenu()

}
