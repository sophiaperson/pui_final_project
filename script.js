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

// compare the input string to entries in json file (difficulty, name, nicknames, prerequisites)
function compareInputData(simpInputValue, inputValue) {
  // loop through names, nicknames, difficulty, prereqs in data and save the names of the tricks that match
  let allDifficulties = ["basic", "intermediate", "advanced", "easy", "medium", "hard", "difficult"]

  let matches = []

  for (let i=0; i<tricks.length; i++) {
    // get trick information
    let name = tricks[i].name
    let difficulty = tricks[i].difficulty
    let prereqs = tricks[i].prereqs
    let nicknames = tricks[i].nicknames

    // simplify strings
    let simpName = simplifyStr(name)
    let simpPrereqs = prereqs.map(simplifyStr).join(" ")
    let simpNicknames = nicknames.map(simplifyStr).join(" ")

    // compare simpInputValue to these strings, and add the name to matches if there is a match
    if (simpName.includes(simpInputValue)) {
      matches.push(name)
    } else if (difficulty.includes(simpInputValue)) {
      matches.push(name)
    } else if (simpPrereqs.includes(simpInputValue)) {
      matches.push(name)
    } else if (simpNicknames.includes(simpInputValue)) {
      matches.push(name)
    }
  }

  sessionStorage.setItem("searchResults", matches.toString())
  sessionStorage.setItem("searchInput", inputValue)
  window.location.href = "search.html"
}

function displaySearchResultsHeader() {
  let header = document.getElementById("search-results")

  let strSearchResults = sessionStorage.getItem("searchResults")
  let inputValue = sessionStorage.getItem("searchInput")

  let arrSearchResults = strSearchResults.split(",")
  let numSearchResults = arrSearchResults.length
  let strNumSearchResults = numSearchResults.toString()

  let message = strNumSearchResults + " results for \"" +  inputValue + "\""

  header.innerHTML = message
}

/* onload functions */
function onLoadHome() {
  // create localStorage for personal log data if does not exist
  const landed = localStorage.getItem("landed")
  const target = localStorage.getItem("target")
  const recommended = localStorage.getItem("recommended")
  if (landed == null) {
    localStorage.setItem("landed", [])
    localStorage.setItem("target", [])
    localStorage.setItem("recommended", [])
  } 
  // display three current targets
  
  // search bar functionality
}

function onLoadProfile() {
  handlePopover()
}

function onLoadSearch() {
  displaySearchResultsHeader()
}

function onLoadTrickDetail() {

}

function onLoadBrowse() {

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
    nicknames: ["frontside flip"]
  }

const bs_180_kickflip = {name: "backside 180 kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "kickflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the heelside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside flip"]
  }

const fs_180_heelflip = {name: "frontside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "frontside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees frontside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["frontside heel"]
  }

const bs_180_heelflip = {name: "backside 180 heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "backside 180", "heelflip"], 
    description: "Pop and scoop the board with your back foot as you rotate 180 degrees backside with the board and flick off the toeside edge of the board to flip it 360 degrees.", 
    nicknames: ["backside heel"]
  }

const d_kickflip = {name: "double kickflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "kickflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the heelside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double flip"]
  }

const d_heelflip = {name: "double heelflip", 
    difficulty: "intermediate",
    prereqs: ["ollie", "heelflip"], 
    description: "Pop the board off the ground with your back foot and flick off the side of the nose towards the toeside edge with your front foot to make the board rotate 720 degrees.", 
    nicknames: ["double heel"]
  }

const tricks = [ollie, bs_shuv, fs_shuv, bs_180, fs_180, kickflip, heelflip, v_kickflip, v_heelflip, bs_180_kickflip, fs_180_kickflip, bs_180_heelflip, fs_180_heelflip, d_kickflip, d_heelflip]
