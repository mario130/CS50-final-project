// Splash screen
document.querySelector('.control-buttons span').onclick = function () {
    let yourName = prompt('What\'s your name?')
    if (yourName == null || yourName == '') {
        document.querySelector('.name span').innerHTML = 'Unknown'
    } else {
        document.querySelector('.name span').innerHTML = yourName    
    }
    document.querySelector('.control-buttons').remove();
}

// preparing array with blocks' length
let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys())

shuffle(orderRange) // DECLARED BENEATH

//Adding order property to blocks
blocks.forEach((block, idx) => {
    block.style.order = orderRange[idx];
    
    block.addEventListener('click', function () {
        flipIt(block)
    })
})

// Flipping add class
function flipIt(selectedBlock) {
    
    selectedBlock.classList.add('is-flipped')

    // collect all flipped cards for comparison
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

    // if there's 2 selected blocks
    if (allFlippedBlocks.length == 2) {

        // stop further flipping
        stopClicking();

        // check if match
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
    
}

// stop clicking further after 2
function stopClicking() {
    
    //add class no clicking on main container
    blocksContainer.classList.add('no-clicking')

    // removing the class
    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking')
    }, duration)
}

// Check matching blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
    // adding a try 
    let triesEl = document.querySelector('.tries span')

    if (firstBlock.dataset.tech === secondBlock.dataset.tech) { // IMP!! .dataset is js' version of data('name')
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
    
        firstBlock.classList.add('matched')
        secondBlock.classList.add('matched')
    } else {
        triesEl.innerHTML = parseInt(triesEl.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)

    }

}

// Shuffle F
function shuffle(array) {
    // setting vars
    let current = array.length;
    let temp,
        random;
    
    while (current > 0) {
        // Get random number
        random = Math.floor(Math.random() * current);

        // decrease length (-1)
        current--;

        /*
         STEPS for randomizing
         [1]Save current element idx (the last one) in stash
         [2]Get random number then assign it to the element
         [3]Random element = stashed number
        */
        temp = array[current]; //1
        array[current] = array[random]; //2
        array[random] = temp //3
    }
    return array;
}
