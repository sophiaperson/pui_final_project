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
  const searchInput = document.getElementById('search-input');
  const inputValue = searchInput.value;

  simpInputValue = simplifyStr(inputValue)
  compareInputData(simpInputValue, inputValue)
}

// when the user clicks search on the profile page, save the input text as input Value 
function searchButtonOnClickLog() {
  const searchInput = document.getElementById('search-input');
  const inputValue = searchInput.value;

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
    let simpPrereqs = prereqs.map(simplifyStr).join(" ")
    let simpNicknames = nicknames.map(simplifyStr).join(" ")

    // compare simpInputValue to these strings, and add the name to matches if there is a match
    if (simpName.includes(simpInputValue)) {
      matches.push(trick)
    } else if (difficulty.includes(simpInputValue)) {
      matches.push(trick)
    } else if (otherDifficulties.includes(simpInputValue)) {
      if (simpInputValue.includes("easy") && (difficulty == "basic")) {
        matches.push(trick)
      } else if (simpInputValue.includes("medium") && (difficulty == "intermediate")) {
        matches.push(trick)
      } else if ((simpInputValue.includes("hard") || (simpInputValue.includes("difficult"))) && (difficulty == "advanced")) {
        matches.push(trick)
      }
    } else if (simpPrereqs.includes(simpInputValue)) {
      matches.push(trick)
    } else if (simpNicknames.includes(simpInputValue)) {
      matches.push(trick)
    }
  }
  console.log("doing seomthing sus")

  sessionStorage.setItem("searchResults", JSON.stringify(matches))
  sessionStorage.setItem("searchInput", inputValue)

  displaySearchResults()
}

// compare the input string to entries in json file (difficulty, name, nicknames, prerequisites)
function compareInputData(simpInputValue, inputValue) {
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
      matches.push(trick)
    } else if (difficulty.includes(simpInputValue)) {
      matches.push(trick)
    } else if (otherDifficulties.includes(simpInputValue)) {
      if (simpInputValue.includes("easy") && (difficulty == "basic")) {
        matches.push(trick)
      } else if (simpInputValue.includes("medium") && (difficulty == "intermediate")) {
        matches.push(trick)
      } else if ((simpInputValue.includes("hard") || (simpInputValue.includes("difficult"))) && (difficulty == "advanced")) {
        matches.push(trick)
      }
    } else if (simpPrereqs.includes(simpInputValue)) {
      matches.push(trick)
    } else if (simpNicknames.includes(simpInputValue)) {
      matches.push(trick)
    } 
  }


  console.log("doing sus")
  sessionStorage.setItem("searchResults", JSON.stringify(matches))
  sessionStorage.setItem("searchInput", inputValue)

  window.location.href = "search.html"
}

// sort search results
function sortSearchResults() {
  let allDifficulties = ["easy", "medium", "hard", "difficult", "basic", "intermediate", "advanced"]
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
      let trick = arrResults[i]
      if (trick.name == simpInput) {
        priority1.push(trick)
      } else if (trick.nicknames.includes(simpInput)) {
        priority2.push(trick)
      } else if (trick.name.includes(simpInput)) {
        priority3.push(trick)
      } else if (trick.nicknames.includes(simpInput)) {
        priority4.push(trick)
      } else {
        priority5.push(trick)
      }
    }
  }

  let sortedResults = priority1.concat(priority2, priority3, priority4, priority5)
  let strSortedResults = JSON.stringify(sortedResults)

  sessionStorage.setItem("searchResults", strSortedResults)

  console.log("sortResults is running hella")
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
}

// remove trick from log
function onClickRemove() {
  // attach function to buttons to remove tricks
  $(document).ready(function(){
    $('.remove-trick-btn').click(function() {
      // find parent that has class  list-group-item
      let listGroup = $(this).closest('.list-group-item')
      // find its child that has class trick-name
      let trickName = $(listGroup).find('.trick-name').text()
      // find out which column this is 
      let column = $(listGroup).closest('.trick-col')
      let colName = $(column).find('.trick-col-name').text()
      colName = colName.toLowerCase()
      // find the tricks already in this column in local storage
      let storedTricks = JSON.parse(localStorage.getItem(colName))
      // remove trick associated with this name from the value associated with the key (colName) in local storage
      trickName = trickName.toLowerCase()
      let trickIndex = strArrTricks().indexOf(trickName)
      let list1 = storedTricks.slice(0, trickIndex)
      let list2 = storedTricks.slice(trickIndex+1)
      storedTricks = list1.concat(list2)
      storedTricksJSON = JSON.stringify(storedTricks)
      localStorage.setItem(colName, storedTricks)

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

// removes duplicate tricks in an array
function removeDupes(arr) {
  if (arr.length <= 1) return arr
  let arrNames = []
  for (let i=0; i<arr.length; i++) {
    arrNames = arr[i].name
  }
  let resultArr = []
  let dummyArr =[]
  let numArr = []
  for (let i=1; arrNames.length; i++) {
    if (dummyArr.includes(arrNames[i])) {
      numArr.push(arrNames[i])
    }
    dummyArr.push(arrNames[i])
  }
  for (let i=0; i<numArr.length; i++) {
    let dupeIndex = numArr[i]
    arr.splice(dupeIndex)
  }
  console.log("removeDupes is running hella")
  return arr
}

// add trick to log (landed, target), only works for the buttons on the cards
function onClickAdd() {
  $(document).ready(function() {
    $(".add-landed-btn").click(function() {
      let landedTricks = JSON.parse(localStorage.getItem("landed"))
      // find name of trick associated with add to landed button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "landed" in local storage
      let arrStrTrickNames = strArrTricks()
      trickName = trickName.toLowerCase()
      let trickIndex = arrStrTrickNames.indexOf(trickName)
      landedTricks.push(tricks[trickIndex])

      let landedTricksJsonStr = JSON.stringify(landedTricks)
      localStorage.setItem("landed", landedTricksJsonStr)
      alert(trickName + " added to landed")
    })
    $(".add-target-btn").click(function() {
      let targetTricks = JSON.parse(localStorage.getItem("target"))
      // find name of trick associated with add to target button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "target" in local storage
      trickName = trickName.toLowerCase()
      let arrStrTrickNames = strArrTricks()
      let trickIndex = arrStrTrickNames.indexOf(trickName)
      targetTricks.push(tricks[trickIndex])

      let targetTricksJsonStr = JSON.stringify(targetTricks)
      localStorage.setItem("target", targetTricksJsonStr)
      alert(trickName + " added to target")
    })
  })
  console.log("onClickAdd is running hela")
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
    $(".add-landedl-log-btn").click(function() {
      let landedTricks = JSON.parse(localStorage.getItem("landed"))
      // find name of trick associated with add to landed button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "landed" in local storage
      let arrStrTrickNames = strArrTricks()
      trickName = trickName.toLowerCase()
      let trickIndex = arrStrTrickNames.indexOf(trickName)
      let landedTricksStrArr = trickArrToStrArr(landedTricks)
      if (!landedTricksStrArr.includes(trickName)) {
        landedTricks.push(tricks[trickIndex])
        let landedTricksJsonStr = JSON.stringify(landedTricks)
        localStorage.setItem("landed", landedTricksJsonStr)
        alert(trickName + " added to landed")
      } else {
        alert("tried to add dupe trick to landed")
      }
    })
    $(".add-target-log-btn").click(function() {
      let targetTricks = JSON.parse(localStorage.getItem("target"))
      // find name of trick associated with add to target button
      let trickName = $(this).closest('.card-body').find('.trick-name').text()
      // add trick associated with this name into the value associated with the key "target" in local storage
      trickName = trickName.toLowerCase()
      let arrStrTrickIndex = strArrTricks()
      let trickIndex = arrStrTrickNames.indexOf(trickName)
      targetTricks.push(tricks[trickIndex])

      let targetTricksJsonStr = JSON.stringify(targetTricks)
      localStorage.setItem("target", targetTricksJsonStr)
      alert(trickName + " added to target")
    })
  })
}

// initialize localStorage data
function initLocalStorage() {
  // create localStorage for personal log data if does not exist
  const landed = localStorage.getItem("landed")
  const target = localStorage.getItem("target")
  const recommended = localStorage.getItem("recommended")
  const searchInput = sessionStorage.getItem("searchInput")
  const searchResults = sessionStorage.getItem("searchResults")
  const sessionResults = sessionStorage.getItem("sessionResults")
  if (landed == null) {
    localStorage.setItem("landed", JSON.stringify([]))
  } 
  if (target == null) localStorage.setItem("target", JSON.stringify([]))
  if (recommended == null) localStorage.setItem("recommended", JSON.stringify([]))
  if (searchInput == null) {
    sessionStorage.setItem("searchInput", "")
    
  } if (sessionResults == null) {
    sessionStorage.setItem("searchResults", JSON.stringify([]))
  }
}

/* onload functions */
function onLoadHome() {
  // create localStorage for personal log data if does not exist
  initLocalStorage()
  // display current targets
  
  // search bar functionality (done with html onclick already)

  // attach function to buttons to add tricks
  onClickAdd()
}

function onLoadProfile() {
  handlePopover()
  // attach function to buttons to add tricks
  onClickAdd()
  // attach function to buttons to remove tricks
  onClickRemove()
}

function onLoadSearch() {
  displaySearchResults()
  // attach function to buttons to add tricks
  onClickAdd()
  
}

function onLoadTrickDetail() {
  // attach function to buttons to add tricks
  onClickAdd()
}

function onLoadBrowse() {
  // attach function to buttons to add tricks
  onClickAdd()
}


const ollie = {name: "ollie", 
    difficulty: "basic",
    prereqs: [], 
    description: "Pop the board off the ground with your back foot and level it out with your front foot.", 
    nicknames: []
  }

const bs_shuv = {name: "backside pop shove-it", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it towards your body across the ground with your back foot so that it rotates 180 degrees.", 
    nicknames: ["backside 180 shove-it", "backside shove-it", "backside shove", "shove-it", "shove", "shuvit", "shuv"]
  }

const fs_shuv = {name: "frontside pop shove-it", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground away from your body with your back foot so that it rotates 180 degrees.", 
    nicknames: ["frontside 180 shove-it", "frontside shove-it", "frontside shove", "front shove", "shove-it"]
  }

const bs_180 = {name: "backside 180", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground towards your body with your back foot as you guide the board to rotate 180 degrees backside with your body and front foot.", 
    nicknames: ["180", "back 180"]
  }

const fs_180 = {name: "frontside 180", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground and scoop it across the ground away from your body with your back foot as you guide the board to rotate 180 degrees frontside with your body and front foot.", 
    nicknames: ["front 180"]
  }

const kickflip = {name: "kickflip", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the heelside edge with your front foot to make the board rotate 360 degrees.", 
    nicknames: ["magic flip", "ollie kickflip"]
  }

const heelflip = {name: "heelflip", 
    difficulty: "basic",
    prereqs: ["ollie"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the toeside edge with your front foot to make the board rotate 360 degrees.", 
    nicknames: []
  }

const v_kickflip = {name: "varial kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "kickflip", "backside pop shove-it"], 
    description: "Pop the board like a backside pop shove-it with your back foot and flick off the nose like a kickflip to make the board rotate 180 degrees backside and flip 360 degrees.", 
    nicknames: ["backside shove-it kickflip", "varial flip"]
  }

const v_heelflip = {name: "varial heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "heelflip", "frontside pop shove-it"], 
    description: "Pop the board like a frontside pop shove-it with your back foot and flick off the nose like a heelflip to make the board rotate 180 degrees frontside and flip 360 degrees.", 
    nicknames: ["frontisde shove-it heelflip", "varial heel"]
  }

const fs_180_kickflip = {name: "frontside 180 kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "frontside 180", "kickflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees frontside with the board and flick off the heelside edge of the board to flip it 360 degrees.", 
    nicknames: ["frontside flip", "frontside kickflip"]
  }

const bs_180_kickflip = {name: "backside 180 kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "kickflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the heelside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside flip", "backside kickflip"]
  }

const fs_180_heelflip = {name: "frontside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "frontside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees frontside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["frontside heel", "frontside heelflip"]
  }

const bs_180_heelflip = {name: "backside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside heel", "frontside heelflip"]
  }

const d_kickflip = {name: "double kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "kickflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the heelside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double flip", "doubleflip"]
  }

const d_heelflip = {name: "double heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "heelflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the toeside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double heel", "doubleheel", "doubleheelflip"]
  }

const tricks = [ollie, bs_shuv, fs_shuv, bs_180, fs_180, kickflip, heelflip, v_kickflip, v_heelflip, bs_180_kickflip, fs_180_kickflip, bs_180_heelflip, fs_180_heelflip, d_kickflip, d_heelflip]
