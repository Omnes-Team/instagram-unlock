/* global MutationObserver */

const targetNode = document.body

// Callback functions to execute when mutations are observed
const presentationObserver = function (mutationsList) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.addedNodes[0].attributes.role.value === 'presentation') {
      // Remove modal and form presentation from DOM
      document
        .querySelectorAll('[role="presentation"]')
        .forEach(function (element) {
          element.remove()
        })
    }
  }
}

const bodyObserver = function (mutationsList) {
  for (const mutation of mutationsList) {
    // Watch <body> changes and change style if is hidden
    if (mutation.target.style.overflow === 'hidden') {
      targetNode.style.overflow = 'initial'
    }
  }
}

// Create an observer instance linked to the callback function
const presentationInstance = new MutationObserver(presentationObserver)
const bodyInstance = new MutationObserver(bodyObserver)

// Start observing the target node for configured mutations
presentationInstance.observe(targetNode, { childList: true })
bodyInstance.observe(targetNode, { attributes: true })
