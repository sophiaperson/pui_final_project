/* script.js */

/* popover functions */
function initializePopover() {
  $(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  });
}

function dismissPopover() {
  $('.popover-dismiss').popover({
  trigger: 'focus'
  });
}

// initialize popovers and dismiss them when user clicks outside
function handlePopover() {
  initializePopover()
  dismissPopover()
}

// capitalize first letter of string
function capitalizeFirstLetter(str) {
  let firstLetter = str.slice(0, 1)
  let restStr = str.slice(1)
  return firstLetter.toUpperCase() + restStr
}

// return string as lowercase, concatenated (no spaces or dashes)
function simplifyStr(str) {
  let lowerStr = str.toLowerCase()
  let concatStr = lowerStr.replace(/\W/, "")
  return str
}

// when the user clicks search, save the input text as inputValue
function searchButtonOnClick() {
  let searchInput = document.getElementById('search-input');
  let inputValue = searchInput.value
  if (inputValue == null) {
    inputValue = sessionStorage.getItem("searchInput")
  }

  simpInputValue = simplifyStr(inputValue)
  compareInputData(simpInputValue, inputValue)
}

// when the user clicks search on the profile page, save the input text as input Value 
function searchButtonOnClickLog() {
  let searchInput = document.getElementById('search-input');
  let inputValue = searchInput.value
  if (inputValue == null) {
    inputValue = sessionStorage.getItem("searchInput")
  }

  simpInputValue = simplifyStr(inputValue)
  compareInputDataLog(simpInputValue, inputValue)
}

// compare the input string to entries in json file (difficulty, name, nicknames, prerequisites)
function compareInputDataLog(simpInputValue, inputValue) {
  // loop through names, nicknames, difficulty, prereqs in data and save the names of the tricks that match
  let otherDifficulties = ["easy", "medium", "hard", "difficult"]

  let matches = []

  for (let i=0; i<tricks.length; i++) {
    // get trick information
    let name = tricks[i].name
    let difficulty = tricks[i].difficulty
    let prereqs = tricks[i].prereqs
    let nicknames = tricks[i].nicknames
    let trick = tricks[i]

    // simplify strings
    let simpName = simplifyStr(name)

    let arrSimpPrereqs = prereqs.map(simplifyStr)
    let arrSimpNicknames = nicknames.map(simplifyStr)
    let simpPrereqs = arrSimpPrereqs.join(" ")
    let simpNicknames = arrSimpNicknames.join(" ")

    let arrInputValue = inputValue.split(" ")

    // compare simpInputValue to these strings, and add the name to matches if there is a match
    if (simpName.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (difficulty.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (otherDifficulties.includes(simpInputValue)) {
      if (simpInputValue.includes("easy") && (difficulty == "basic")) {
        matches.push(trick.name)
      } else if (simpInputValue.includes("medium") && (difficulty == "intermediate")) {
        matches.push(trick.name)
      } else if ((simpInputValue.includes("hard") || (simpInputValue.includes("difficult"))) && (difficulty == "advanced")) {
        matches.push(trick.name)
      }
    } else if (simpPrereqs.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (simpNicknames.includes(simpInputValue)) {
      matches.push(trick.name)
    } 
  }


  sessionStorage.setItem("searchResults", JSON.stringify(matches))
  sessionStorage.setItem("searchInput", inputValue)

  displaySearchResultsLog()
}

// compare the input string to entries in json file (difficulty, name, nicknames, prerequisites)
function compareInputData(simpInputValue, inputValue) {
  // loop through names, nicknames, difficulty, prereqs in data and save the names of the tricks that match
  let otherDifficulties = ["easy", "medium", "hard", "difficult", "all"]

  let matches = []

  for (let i=0; i<tricks.length; i++) {
    console.log("yoho")
    // get trick information
    let name = tricks[i].name
    let difficulty = tricks[i].difficulty
    let prereqs = tricks[i].prereqs
    let nicknames = tricks[i].nicknames
    let trick = tricks[i]

    // simplify strings
    let simpName = simplifyStr(name)

    let arrSimpPrereqs = prereqs.map(simplifyStr)
    let arrSimpNicknames = nicknames.map(simplifyStr)
    let simpPrereqs = arrSimpPrereqs.join(" ")
    let simpNicknames = arrSimpNicknames.join(" ")

    let arrInputValue = inputValue.split(" ")

    // compare simpInputValue to these strings, and add the name to matches if there is a match
    if (simpName.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (difficulty.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (otherDifficulties.includes(simpInputValue)) {
      if ((simpInputValue.includes("easy") || simpInputValue.includes("basic"))  && (difficulty == "basic")) {
        matches.push(trick.name)
      } else if ((simpInputValue.includes("medium") || simpInputValue.includes("intermediate")) && (difficulty == "intermediate")) {
        matches.push(trick.name)
      } else if ((simpInputValue.includes("hard") || (simpInputValue.includes("difficult") || (simpInputValue.includes("advanced")) && (difficulty == "advanced")))) {
        matches.push(trick.name)
      } else if (simpInputValue.includes("all")) {
        matches.push(trick.name)
      } 
    } else if (simpPrereqs.includes(simpInputValue)) {
      matches.push(trick.name)
    } else if (simpNicknames.includes(simpInputValue)) {
      matches.push(trick.name)
    } 
  }


  sessionStorage.setItem("searchResults", JSON.stringify(matches))
  sessionStorage.setItem("searchInput", inputValue)

  window.location.href = "search.html"
}

function findTrickFromTrickName(trickName) {
  for (let i=0; i<tricks.length; i++) {
    let trick = tricks[i]
    if (trick.name == trickName) {
      return trick
    }
  } 
}

// sort search results
function sortSearchResults() {
  if (sessionStorage.searchInput == "") {
    return
  }


  let allDifficulties = ["easy", "medium", "hard", "difficult", "basic", "intermediate", "advanced", "all"]
  let priority1 = []
  let priority2 = []
  let priority3 = []
  let priority4 = []
  let priority5 = []

  let strResults = sessionStorage.getItem("searchResults")

  let arrResults = JSON.parse(strResults)

  let strInput = sessionStorage.getItem("searchInput")
  let simpInput = simplifyStr(strInput)

  // order: if difficulty -> don't have to sort
  // order: if trick name -> 1. match name, 2. match nickname, 3. match prerequisites
  if (allDifficulties.includes(strInput) == false) {
    for (let i=0; i<arrResults.length; i++) {
      let trickName = arrResults[i]
      let trick = findTrickFromTrickName(trickName)
      console.log(trick)
      if (trick.name == simpInput) {
        priority1.push(trick.name)
      } else if (trick.nicknames.includes(simpInput)) {
        priority2.push(trick.name)
      } else if (trick.name.includes(simpInput)) {
        priority3.push(trick.name)
      } else if (trick.nicknames.includes(simpInput)) {
        priority4.push(trick.name)
      } else {
        priority5.push(trick.name)
      }
    }
  }

  let sortedResults = priority1.concat(priority2, priority3, priority4, priority5)
  let strSortedResults = JSON.stringify(sortedResults)

  sessionStorage.setItem("searchResults", strSortedResults)

}

// display number of results and search input
function displaySearchResultsHeader() {
  let header = document.getElementById("search-results")

  let strSearchResults = sessionStorage.getItem("searchResults")
  let inputValue = sessionStorage.getItem("searchInput")

  if (inputValue == "") {
    return
  }

  let arrSearchResults = JSON.parse(strSearchResults)
  let numSearchResults = arrSearchResults.length
  let strNumSearchResults = numSearchResults.toString()

  let message = strNumSearchResults + " results for \"" +  inputValue + "\""

  header.innerHTML = message
}


// display search results
function displaySearchResults() {

  // sort results before displaying them
  sortSearchResults()
  displaySearchResultsHeader()
  displaySearchedTricks()
}

// display search results
function displaySearchResultsLog() {

  // sort results before displaying them
  sortSearchResults()
  displaySearchResultsHeader()
  displaySearchedTricksLog()
}

// remove trick from log
function onClickRemove() {
  // attach function to buttons to remove tricks
  alert("onClickRemove running")
  $(document).ready(function(){
    $('.remove-trick-btn').click(function() {
      alert("trying to remove")
      // find parent that has class  list-group-item
      let listGroup = $(this).closest('.list-group-item')
      // find its child that has class trick-name
      let trickName = $(listGroup).find('.trick-name').text()
      // find out which column this is 
      let column = $(listGroup).closest('.trick-col')
      let colName = $(column).find('.trick-col-name').text()
      colName = colName.toLowerCase()
      if (colName == "landed tricks") colName = "landed"
      if (colName == "target tricks") colName ="target"
      if (colName == "suggested tricks") colName = "recommended"
      // find the tricks already in this column in local storage
      let storedTricks = JSON.parse(localStorage.getItem(colName))
      // remove trick associated with this name from the value associated with the key (colName) in local storage
      trickName = trickName.toLowerCase()
      let trickIndex = storedTricks.indexOf(trickName)
      let l1 = storedTricks.slice(0, trickIndex)
      
      let l2 = storedTricks.slice(trickIndex+1)
      storedTricks = l1.concat(l2)
      
      storedTricksJSON = JSON.stringify(storedTricks)
      
      localStorage.setItem(colName, storedTricksJSON)

      alert(trickName + " removed from " + colName)
    })
  })
}

// return array of names of tricks as strings
function strArrTricks() {
  let strTricksArr = []
  for (let i=0; i<tricks.length; i++) {
    strTricksArr.push(tricks[i].name)
  }
  return strTricksArr
}

// add trick to log (landed, target), only works for the buttons on the cards
function onClickAdd() {
  $(document).ready(function() {
    $(".add-landed-btn").click(function() {
      let landedTricks = JSON.parse(localStorage.getItem("landed"))
      // find name of trick associated with add to landed button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick name into value array of "landed" in local storage
      trickName = trickName.toLowerCase()
      if (!landedTricks.includes(trickName)) {
        landedTricks.push(trickName)
        let landedTricksStr = JSON.stringify(landedTricks)
        localStorage.setItem("landed", landedTricksStr)
        alert(trickName + " added to landed")
      } else {
        alert("tried to add dupe trick to landed")
      }
    })
    $(".add-target-btn").click(function() {
      let targetTricks = JSON.parse(localStorage.getItem("target"))
      // find name of trick associated with add to target button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "target" in local storage
      trickName = trickName.toLowerCase()
      if (!targetTricks.includes(trickName)) {
        targetTricks.push(trickName)
        let targetTricksStr = JSON.stringify(targetTricks)
        localStorage.setItem("target", targetTricksStr)
        
        alert(trickName + " added to target")
      } else {
        alert("tried to add dupe trick to landed")
      }
      
    })
  })
}

function trickArrToStrArr(trickArr) {
  let res = []
  for (let i=0; i<trickArr.length; i++) {
    res.push(trickArr[i].name)
  }
  return res
}

// add trick to log (landed, target)
function onClickAddLog() {
  $(document).ready(function() {
    $(".add-landed-log-btn").click(function() {
      let landedTricks = JSON.parse(localStorage.getItem("landed"))
      // find name of trick associated with add to landed button
      let trickName = $(this).closest('.list-group-item').find('.trick-name').text()
      // add trick name into value array of "landed" in local storage
      trickName = trickName.toLowerCase()
      if (!landedTricks.includes(trickName)) {
        landedTricks.push(trickName)
        let landedTricksStr = JSON.stringify(landedTricks)
        localStorage.setItem("landed", landedTricksStr)
        alert(trickName + " added to landed")
      } else {
        alert("tried to add dupe trick to landed")
      }
    })
    $(".add-target-log-btn").click(function() {
      let targetTricks = JSON.parse(localStorage.getItem("target"))
      // find name of trick associated with add to target button
      let trickName = $(this).closest('.list-group-item').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "target" in local storage
      trickName = trickName.toLowerCase()
      if (!targetTricks.includes(trickName)) {
        targetTricks.push(trickName)
        let targetTricksStr = JSON.stringify(targetTricks)
        localStorage.setItem("target", targetTricksStr)
        
        alert(trickName + " added to target")
      } else {
        alert("tried to add dupe trick to landed")
      }
      
    })
  })
}

function findHref(trickName) {
  let trick = findTrickFromTrickName(trickName)
  let link = trick.link
  return link
}

function createSearchEntryLog(trickName) {
  let trick = findTrickFromTrickName(trickName)

  const lgi = document.createElement("li")
  lgi.classList.add("list-group-item")

  const card = document.createElement("div")
  card.classList.add("card")

  const row = document.createElement("div")
  row.classList.add("row")
  row.classList.add("g-0")

  const link = document.createElement("a")
  link.href = findHref(trickName)

  const col2 = document.createElement("div")
  col2.classList.add("col-md-12")

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  cardBody.classList.add("search-entry")
  cardBody.classList.add("text")

  const header = document.createElement("h5")
  header.classList.add("card-title", "search-entry", "trick-name")
  header.textContent = capitalizeFirstLetter(trickName)
  link.appendChild(header)

  const cardTitle = document.createElement("div")
  cardTitle.classList.add("card-title", "search-entry", "trick-difficulty")
  cardTitle.textContent = capitalizeFirstLetter(trick.difficulty)

  const cont = document.createElement("div")
  cont.classList.add("container", "trick-tag-container")

  for (let i=0; i<trick.prereqs.length; i++) {
    const tag = document.createElement("div")
    tag.classList.add("trick-tag")
    tag.textContent = capitalizeFirstLetter(trick.prereqs[i])
    cont.appendChild(tag)
  }

  const desc = document.createElement("p")
  desc.textContent = trick.description

  const div = document.createElement("div")

  const addLanded = document.createElement("button")
  addLanded.type = "submit"
  addLanded.classList.add("btn", "btn-primary", "add-landed-btn")
  addLanded.textContent = "Add to landed"

  const addTarget = document.createElement("button")
  addTarget.type = "submit"
  addTarget.classList.add("btn", "btn-primary", "add-target-btn")
  addTarget.textContent = "Add to target"

  const whitespace = document.createElement("textContent")
  whitespace.textContent = '\u00A0'

  div.appendChild(addLanded)
  div.appendChild(addTarget)

  cardBody.appendChild(link)
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cont)
  cardBody.appendChild(desc)
  cardBody.append(div)
  col2.appendChild(cardBody)
  row.appendChild(col2)
  card.appendChild(row)
  lgi.appendChild(card)

  return lgi
}

function createSearchEntry(trickName) {
  let trick = findTrickFromTrickName(trickName)

  const lgi = document.createElement("li")
  lgi.classList.add("list-group-item")

  const card = document.createElement("div")
  card.classList.add("card")

  const row = document.createElement("div")
  row.classList.add("row")
  row.classList.add("g-0")

  const col = document.createElement("div")
  col.classList.add("col-md-4")

  const link = document.createElement("a")
  link.href = findHref(trickName)

  const linkHeader = document.createElement("a")
  linkHeader.href = findHref(trickName)

  const dummy = document.createElement("div")
  dummy.classList.add("dummy")
  const image = document.createElement("img")
  image.src = "images/" + (link.href).slice(0, -4) + "jpg"
  image.classList.add("img-fluid", "rounded-start")
  image.alt = "person doing " + trickName

  link.appendChild(image)
  link.appendChild(dummy)
  col.appendChild(link)

  const col2 = document.createElement("div")
  col2.classList.add("col-md-8")

  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  cardBody.classList.add("search-entry")
  cardBody.classList.add("text")

  const header = document.createElement("h5")
  header.classList.add("card-title", "search-entry", "trick-name")
  header.textContent = capitalizeFirstLetter(trickName)
  linkHeader.appendChild(header)

  const cardTitle = document.createElement("div")
  cardTitle.classList.add("card-title", "search-entry", "trick-difficulty")
  cardTitle.textContent = capitalizeFirstLetter(trick.difficulty)

  const cont = document.createElement("div")
  cont.classList.add("container", "trick-tag-container")

  for (let i=0; i<trick.prereqs.length; i++) {
    const tag = document.createElement("div")
    tag.classList.add("trick-tag")
    tag.textContent = capitalizeFirstLetter(trick.prereqs[i])
    cont.appendChild(tag)
  }

  const desc = document.createElement("p")
  desc.textContent = trick.description

  const div = document.createElement("div")

  const addLanded = document.createElement("button")
  addLanded.type = "submit"
  addLanded.classList.add("btn", "btn-primary", "add-landed-btn")
  addLanded.textContent = "Add to landed"

  const addTarget = document.createElement("button")
  addTarget.type = "submit"
  addTarget.classList.add("btn", "btn-primary", "add-target-btn")
  addTarget.textContent = "Add to target"

  const whitespace = document.createElement("textContent")
  whitespace.textContent = '\u00A0'

  div.appendChild(addLanded)
  div.appendChild(addTarget)

  cardBody.appendChild(linkHeader)
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cont)
  cardBody.appendChild(desc)
  cardBody.append(div)
  col2.appendChild(cardBody)
  row.appendChild(col)
  row.appendChild(col2)
  card.appendChild(row)
  lgi.appendChild(card)

  return lgi

}

function addSearchEntryToDom(elem, trickName) {
  const entry = createSearchEntry(trickName)
  elem.appendChild(entry)
}

function addSearchEntryLogToDom(elem, trickName) {
  const entry = createSearchEntryLog(trickName)
  elem.appendChild(entry)
}

function foo() {
  let elem  = document.getElementsByClassName("list-group-flush")[0]
  let trickName = "kickflip"
  addSearchEntryToDom(elem, trickName)
}

function foo1() {
  let elem  = document.getElementsByClassName("list-group-flush")[0]
  let trickName = "kickflip"
  const entry = createSearchEntryLog(trickName)
  elem.appendChild(entry)
  onClickAdd()
}

function foo3() {
  createQuickEntryLanded("kickflip")
  createQuickEntryTarget("kickflip")
  createQuickEntryRecommended("kickflip")
  onClickAddLog()
  onClickRemove()
}

function createQuickEntryLanded(trickName) {
  let col = "landed"
  let entry = createQuickEntry(col, trickName)
  let list = document.getElementsByClassName("list-group")[0]
  list.appendChild(entry)
}

function createQuickEntryTarget(trickName) {
  let col = "target"
  let entry = createQuickEntry(col, trickName)
  let list = document.getElementsByClassName("list-group")[1]
  list.appendChild(entry)
}

function createQuickEntryRecommended(trickName) {
  let col = "recommended"
  let entry = createQuickEntry(col, trickName)
  let list = document.getElementsByClassName("list-group")[2]
  list.appendChild(entry)
}

function createQuickEntry(col, trickName) {
  const lgi = document.createElement("div")
  lgi.classList.add("list-group-item")

  const header = document.createElement("span")
  header.classList.add("trick-name")
  header.textContent = capitalizeFirstLetter(trickName)

  const dropright = document.createElement("div")
  dropright.classList.add("btn-group", "dropright", "float-right")

  const btn = document.createElement("button")
  btn.type = "button"
  btn.classList.add("btn", "btn-light", "dropdown-toggle", "caret-off")
  btn.setAttribute("data-toggle", "dropdown")
  btn.setAttribute("aria-haspopup", "true")
  btn.setAttribute("aria-expanded", "false")

  const icon = document.createElement("span")
  icon.classList.add("material-icons")
  icon.innerHTML = "more_vert"
  const dropdown = createDropdownMenu(col, trickName)

  btn.appendChild(icon)
  dropright.appendChild(btn)
  dropright.appendChild(dropdown)
  
  lgi.appendChild(header)
  lgi.appendChild(dropright)

  return lgi
}

function createDropdownMenu(col, trickName) {
  if (col == "landed") {
    const dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-menu")

    const divider = document.createElement("div")
    divider.classList.add("dropdown-divider")

    const details = createDetailsOption(trickName)
    const remove = createRemoveOption()

    dropdown.appendChild(details)
    dropdown.appendChild(divider)
    dropdown.appendChild(remove)
    return dropdown
  } else if (col == "target") {
    const dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-menu")

    const divider = document.createElement("div")
    divider.classList.add("dropdown-divider")

    const addLanded = createAddLandedOption()
    const details = createDetailsOption(trickName)
    const remove = createRemoveOption()

    dropdown.appendChild(addLanded)
    dropdown.appendChild(details)
    dropdown.appendChild(divider)
    dropdown.appendChild(remove)
    return dropdown
  } else {
    const dropdown = document.createElement("div")
    dropdown.classList.add("dropdown-menu")

    const divider = document.createElement("div")
    divider.classList.add("dropdown-divider")

    const addTarget = createAddTargetOption()
    const addLanded = createAddLandedOption()
    const details = createDetailsOption(trickName)

    dropdown.appendChild(addTarget)
    dropdown.appendChild(addLanded)
    dropdown.appendChild(details)
    return dropdown
  }
}

function createDetailsOption(trickName) {
  let trick = findTrickFromTrickName(trickName)

  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-item")
  const btn = document.createElement("button")
  btn.classList.add("btn", "p-0", "m-0")
  const link = document.createElement("a")
  link.href = trick.link
  const cont = document.createElement("div")
  cont.classList.add("container")
  const row = document.createElement("div")
  row.classList.add("row")
  const col = document.createElement("div")
  col.classList.add("col", "mr-3")
  const icon = document.createElement("span")
  icon.classList.add("material-icons")
  icon.innerHTML = "read_more"
  const col2 = document.createElement("div")
  col2.classList.add("col")
  col2.textContent = "Details"

  col.appendChild(icon)
  row.appendChild(col)
  row.appendChild(col2)
  cont.appendChild(row)
  link.appendChild(cont)
  btn.appendChild(link)
  dropdown.appendChild(btn)

  return dropdown
}

function createAddTargetOption() {
  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-item")
  const btn = document.createElement("button")
  btn.classList.add("btn", "p-0", "m-0", "add-target-log-btn")
  const cont = document.createElement("div")
  cont.classList.add("container")
  const row = document.createElement("div")
  row.classList.add("row")
  const col = document.createElement("div")
  col.classList.add("col", "mr-3")
  const icon = document.createElement("span")
  icon.classList.add("material-icons")
  icon.innerHTML = "outlined_flag"
  const col2 = document.createElement("div")
  col2.classList.add("col")
  col2.textContent = "Add to target"

  col.appendChild(icon)
  row.appendChild(col)
  row.appendChild(col2)
  cont.appendChild(row)
  btn.appendChild(cont)
  dropdown.appendChild(btn)

  return dropdown
}

function createAddLandedOption() {
  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-item")
  const btn = document.createElement("button")
  btn.classList.add("btn", "p-0", "m-0", "add-landed-log-btn")
  const cont = document.createElement("div")
  cont.classList.add("container")
  const row = document.createElement("div")
  row.classList.add("row")
  const col = document.createElement("div")
  col.classList.add("col", "mr-3")
  const icon = document.createElement("span")
  icon.classList.add("material-icons")
  icon.innerHTML = "task_alt"
  const col2 = document.createElement("div")
  col.classList.add("col")
  col2.textContent = "Add to landed"

  col.appendChild(icon)
  row.appendChild(col)
  row.appendChild(col2)
  cont.appendChild(row)
  btn.appendChild(cont)
  dropdown.appendChild(btn)

  return dropdown
}

function createRemoveOption() {
  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown-item")
  const btn = document.createElement("button")
  btn.classList.add("btn", "p-0", "m-0", "remove-trick-btn")
  const cont = document.createElement("div")
  cont.classList.add("container")
  const row = document.createElement("div")
  row.classList.add("row")
  const col = document.createElement("div")
  col.classList.add("col", "mr-3")
  const icon = document.createElement("span")
  icon.classList.add("material-icons")
  icon.innerHTML = "remove_circle_outline"
  const col2 = document.createElement("div")
  col2.classList.add("col")
  col2.textContent = "Remove"

  col.appendChild(icon)
  row.appendChild(col)
  row.appendChild(col2)
  cont.appendChild(row)
  btn.appendChild(cont)
  dropdown.appendChild(btn)

  return dropdown
}

// display search result entries in personal log modal
function displaySearchedTricksLog() {
  let searchResults = JSON.parse(sessionStorage.getItem("searchResults"))
  let elem = document.getElementsByClassName("list-group-flush")[0]
  for (let i=0; i<searchResults.length; i++) {
    let trickName = searchResults[i]
    addSearchEntryLogToDom(elem, trickName)
  }
  onClickAdd()

}


// display search result entries
function displaySearchedTricks() {
  let searchResults = JSON.parse(sessionStorage.getItem("searchResults"))
  let elem = document.getElementsByClassName("list-group-flush")[0]
  for (let i=0; i<searchResults.length; i++) {
    let trickName = searchResults[i]
    addSearchEntryToDom(elem, trickName)
  }
  onClickAdd()

}

// display all tricks on trick catalog page
function displayAllTricks() {
  let elem  = document.getElementsByClassName("list-group-flush")[0]
  for (let i=0; i<tricks.length; i++) {
    let trickName = tricks[i].name
    addSearchEntryToDom(elem, trickName)
  }
  onClickAdd()
}

// display all tricks that were added to personal log
function displayLogTricks() {
  let landed = JSON.parse(localStorage.getItem("landed"))
  let target = JSON.parse(localStorage.getItem("target"))
  let recommended = JSON.parse(localStorage.getItem("recommended"))
  for (let i= 0; i<landed.length; i++) {
    let trickName = landed[i]
    createQuickEntryLanded(trickName)
  }
  for (let i= 0; i<target.length; i++) {
    let trickName = target[i]
    createQuickEntryTarget(trickName)
  }
  for (let i= 0; i<recommended.length; i++) {
    let trickName = recommended[i]
    createQuickEntryRecommended(trickName)
  }
  onClickAdd()
  onClickRemove()
}


// initialize all local storage and session storage data
function initAllStorage() {
  let locStor = ["landed", "target", "recommended"]
  for (let i=0; i<locStor.length; i++) {
    let key = locStor[i]
    if (localStorage.getItem(locStor[i]) == null) {
      localStorage.setItem(key, JSON.stringify([]))
    }
  }
  sessionStorage.setItem("searchResults", JSON.stringify([]))
  sessionStorage.setItem("searchInput", "")
}

/* onload functions */
function onLoadHome() {
  // create localStorage for personal log data if does not exist
  initAllStorage()
  // display current targets
  
  // search bar functionality (done with html onclick already)

  // attach function to buttons to add tricks
  onClickAdd()
}

function onLoadProfile() {
  // attach function to buttons to add tricks
  displayLogTricks()
  onClickAddLog()
  sessionStorage.setItem("searchResults", JSON.stringify([]))
  sessionStorage.setItem("searchInput", "")
}

function onLoadSearch() {
  displaySearchResults()
  // attach function to buttons to add tricks
}

function onLoadTrickDetail() {
  // attach function to buttons to add tricks
  onClickAddLog()
  onClickAdd()
}

function onLoadBrowse() {
  displayAllTricks()
}

function init() {
  localStorage.clear()
  sessionStorage.clear()
  initAllStorage()
}

const ollie = {name: "ollie", 
    difficulty: "basic",
    prereqs: [], 
    description: "Pop the board off the ground with your back foot and level it out with your front foot.", 
    nicknames: [],
    link: "ollie.html"
  }

const bs_shuv = {name: "backside pop shove-it", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it towards your body across the ground with your back foot so that it rotates 180 degrees.", 
    nicknames: ["backside 180 shove-it", "backside shove-it", "backside shove", "shove-it", "shove", "shuvit", "shuv"],
    link: "bs_shuv.html"
  }

const fs_shuv = {name: "frontside pop shove-it", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground away from your body with your back foot so that it rotates 180 degrees.", 
    nicknames: ["frontside 180 shove-it", "frontside shove-it", "frontside shove", "front shove", "shove-it"], 
    link: "fs_shuv.html"
  }

const bs_180 = {name: "backside 180", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground towards your body with your back foot as you guide the board to rotate 180 degrees backside with your body and front foot.", 
    nicknames: ["180", "back 180"],
    link: "bs_180.html"
  }

const fs_180 = {name: "frontside 180", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground away from your body with your back foot as you guide the board to rotate 180 degrees frontside with your body and front foot.", 
    nicknames: ["front 180"],
    link: "fs_180.html"
  }

const kickflip = {name: "kickflip", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the heelside edge with your front foot to make the board rotate 360 degrees.", 
    nicknames: ["magic flip", "ollie kickflip"],
    link: "kickflip.html"
  }

const heelflip = {name: "heelflip", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the toeside edge with your front foot to make the board rotate 360 degrees.", 
    nicknames: [],
    link: "heelflip.html"
  }

const v_kickflip = {name: "varial kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "kickflip", "backside pop shove-it"], 
    description: "Pop the board like a backside pop shove-it with your back foot and flick off the nose like a kickflip to make the board rotate 180 degrees backside and flip 360 degrees.", 
    nicknames: ["backside shove-it kickflip", "varial flip"],
    link: "v_kickflip.html"
  }

const v_heelflip = {name: "varial heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "heelflip", "frontside pop shove-it"], 
    description: "Pop the board like a frontside pop shove-it with your back foot and flick off the nose like a heelflip to make the board rotate 180 degrees frontside and flip 360 degrees.", 
    nicknames: ["frontside shove-it heelflip", "varial heel"],
    link: "v_heelflip.html"
  }

const fs_180_kickflip = {name: "frontside 180 kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "frontside 180", "kickflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees frontside with the board and flick off the heelside edge of the board to flip it 360 degrees.", 
    nicknames: ["frontside flip", "frontside kickflip"], 
    link: "fs_180_kickflip.html"
  }

const bs_180_kickflip = {name: "backside 180 kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "kickflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the heelside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside flip", "backside kickflip"], 
    link: "bs_180_kickflip.html"
  }

const fs_180_heelflip = {name: "frontside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "frontside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees frontside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["frontside heel", "frontside heelflip"],
    link: "fs_180_heelflip.html"
  }

const bs_180_heelflip = {name: "backside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside heel", "frontside heelflip"], 
    link: "bs_180_heelflip.html"
  }

const d_kickflip = {name: "double kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "kickflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the heelside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double flip", "doubleflip"],
    link: "d_kickflip.html"
  }

const d_heelflip = {name: "double heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "heelflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the toeside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double heel", "doubleheel", "doubleheelflip"],
    link: "d_heelflip.html"
  }

const tre_flip = {name: "360 kickflip", 
    difficulty: "advanced",
    prereqs: ["ollie", "kickflip", "backside pop shove-it", "varial kickflip"], 
    description: "Pop the board like a backside pop shove-it with your back foot and flick off the nose like a kickflip to make the board rotate 360 degrees backside and flip 360 degrees.", 
    nicknames: ["360 flip", "3 flip", "tre flip", "tre"],
    link: "tre_flip.html"
  }

const laserflip = {name: "laserflip", 
    difficulty: "advanced",
    prereqs: ["ollie", "heelflip", "frontside pop shove-it", "varial heelflip"], 
    description: "Pop the board like a frontside pop shove-it with your back foot and flick off the nose like a heelflip to make the board rotate 360 degrees frontside and flip 360 degrees.", 
    nicknames: ["360 frontside shove-it heelflip", "360 heeflip", "lazerflip", "laser", "lazer"],
    link: "laserflip.html"
  }

const tricks = [ollie, bs_shuv, fs_shuv, bs_180, fs_180, kickflip, heelflip, v_kickflip, v_heelflip, bs_180_kickflip, fs_180_kickflip, bs_180_heelflip, fs_180_heelflip, d_kickflip, d_heelflip, tre_flip, laserflip]
