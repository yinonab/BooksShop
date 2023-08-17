'use strict'
var gCurrLang = 'en'
const gTrans = {
    'filter-search':{
        en:'Search',
        he:'חיפוש',
    },
    'filter-rate':{
        en:'Rate',
        he:'דירוג',
    },
    'filter-price':{
        en:'Price',
        he:'מחיר',
    },
    'sort-by':{
        en:'Sort By',
        he:'מיון לפי',
    },
    'desc':{
        en:'Descending ',
        he:'יורד',
    },
    'searc-button':{
        en:'Search ',
        he:'חיפוש',
    },
    'add-button':{
        en:'Add Book ',
        he:'הוספת ספר',
    },
    'select-sorting': {
        en: 'Select Sorting',
        he: 'בחר מיון',
    },
    'name-sort': {
        en: 'Name',
        he: 'שם'
    },
    'price-sort': {
        en: 'Price',
        he: 'מחיר',
    },
    'rate-sort': {
        en: 'Rate',
        he: 'דירוג',
    },
    'th-id':{
        en:'Id',
        he:`מס' יחודי`
    },
    'th-name':{
        en:'Name',
        he:'שם'
    },
    'th-price':{
        en:'price',
        he:'מחיר'
    },
    'th-rate':{
        en:'Rate',
        he:'דירוג'
    },
    'th-update':{
        en:'Update',
        he:'עדכון'
    },
    'th-read':{
        en:'Read',
        he:'תקציר'
    },
    'th-delate':{
        en:'Delate',
        he:'מחיקה'
    },
    'btn-update':{
        en:'Update',
        he:'עדכן'
    },
    'btn-read':{
        en:'Read',
        he:'עיין'
    },
    'btn-remove':{
        en:'Delate',
        he:'מחק'
    },
    'btn-update':{
        en:'Update',
        he:'עדכן'
    },
    'btn-read':{
        en:'Read',
        he:'עיין'
    },
    'btn-remove':{
        en:'Delate',
        he:'מחק'
    },
    'btn-prev':{
        en:'Prev Page',
        he:'הדף הקודם'
    },
    'btn-card':{
        en:'Cards',
        he:'כרטיסיות'
    },
    'btn-Table':{
        en:'Table',
        he:'טבלה'
    },
    'btn-next':{
        en:'Next Page',
        he:'הדף הבא'
    },
}
function getTrans(transKey) {
    // console.log('transKey:', transKey) // 'sure'
    // get from gTrans
    const transMap = gTrans[transKey] // {'en':,'es:','he':}
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}
function doTrans() {
    // get the data-trans and use getTrans to replace the innerText
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        // console.log('el:', el)
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        // support placeholder 
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}
function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString(gCurrLang)
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric'
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}

function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
