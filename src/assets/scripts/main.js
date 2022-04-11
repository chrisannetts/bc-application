// Ensure the HTML document has been completely loaded and parsed.
document.addEventListener('DOMContentLoaded', function () {

  const backToTop = document.querySelector('.back-to-top');
  const body = document.querySelector('body');
  const cardGrid = document.querySelector('.card-grid');
  const cards = document.querySelectorAll('.card-grid__item');
  const filters = document.querySelectorAll('.filter__button');
  const filterButtonDefault = document.getElementById('filterButtonDefault');
  const filterButtonPinned = document.getElementById('filterButtonPinned');
  const filterButtonProjects = document.getElementById('filterButtonProjects');
  const filterButtonRecent = document.getElementById('filterButtonRecent');
  const filterButtonTeams = document.getElementById('filterButtonTeams');
  const items = document.getElementsByClassName("card-grid__item"); 
  const modal = document.getElementById('dialog');
  const modalContent = document.querySelector('.modal__content');
  const navbar = document.querySelector('.navbar');
  const searchClearButton = document.querySelector('.search-form__button');
  const searchInput = document.querySelector('.search-form__input');
  const unfilteredButtons = document.querySelectorAll('.filter__button--unfiltered');

  // Show and hide project/team cards depending on whether or not they match the user-entered input.
  filterCards = (event, tag) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset.tags.includes(tag)) {
        items[i].classList.remove('card-grid__item--hidden');
      } else {
        items[i].classList.add('card-grid__item--hidden');
      }
    }
  }

  // Remove the hidden modifier from every card.
  function showAllCards(e) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('card-grid__item--hidden');
    }
  }

  // When the user clicks either the 'Show all' or 'Recently viewed' button, show all of the cards.
  for (const buttons of unfilteredButtons) {
    buttons.addEventListener('click', showAllCards);
  }

  // Listen for clicks on the three 'reducing' filter buttons, and filter by their respective tag.
  filterButtonPinned.addEventListener('click', (e) => filterCards(e, 'pinned'));
  filterButtonProjects.addEventListener('click', (e) => filterCards(e, 'project'));
  filterButtonTeams.addEventListener('click', (e) => filterCards(e, 'team'));

  // When a filter button is clicked, remove any active classes, and apply the active class to the targetted button.
  function handleFiltersClick(e) {
    filters.forEach(node => {
      node.classList.remove('filter__button--active');
      e.currentTarget.classList.add('filter__button--active');

      // If the filter button clicked was the 'Recently viewed' button, add a modifier to re-order the cards.
      if (e.currentTarget == filterButtonRecent) {
        cardGrid.classList.add('card-grid--recent');
      }
      else {
        cardGrid.classList.remove('card-grid--recent');
      }

      // If the filter button clicked was either the 'Show all' or 'Recently viewed' button, add a modifier.
      if (e.currentTarget == filterButtonDefault || e.currentTarget == filterButtonRecent) {
        cardGrid.classList.add('card-grid--unfiltered');
      }
      else {
        cardGrid.classList.remove('card-grid--unfiltered');
      }
    });
  }

  // Listen for clicks on the all of the filter buttons.
  for (const filter of filters) {
    filter.addEventListener('click', handleFiltersClick);
  }

  // If no cards are visible, and an empty state doesn't already exist, inject a message before the empty card container. 
  function toggleEmptyState() {
    let cardsEmptyState = document.querySelector('.empty-state');

    if (cardGrid.scrollHeight === 0 && !cardsEmptyState) {
      cardGrid.insertAdjacentHTML('beforebegin', '<p class="empty-state">No matching projects or teams.</p>');
    }

    // Where a new search query allows us to displays cards, and an empty state exists, remove the message.
    if (cardGrid.scrollHeight != 0 && cardsEmptyState) {
      cardsEmptyState.remove();
    }
  }

  // Listen for changes to the search term.
  searchInput.addEventListener('keyup', function () {
  
    // If the search input is empty, disable the 'reset' button.
    if (searchInput.value == '') {
      searchClearButton.setAttribute('disabled', '');
    }
    else {
      searchClearButton.removeAttribute('disabled', '');
    }

    let filterRegex = new RegExp('\\b' + this.value, 'gi');

    // Check each card in turn to see whether the current search term matches any text in either the heading or description.
    cards.forEach(function (item) {
      item.classList.toggle('card-grid__item--hidden', !item.querySelector('.card__content').innerText.match(filterRegex));
    });
    
    // Check whether we need to create or remove an empty state.
    toggleEmptyState();

  });

  // If a browser doesn't support the modal, then hide the modal contents.
  if ( typeof modal.showModal !== 'function' ) {
    modal.hidden = true;
  }

  function displayModal(e) {
    if (typeof modal.showModal === 'function') {
      modal.showModal();
      body.classList.add('u-overflow-hidden');
    }
  }

  const modalKey = document.getElementById('modalKey');

  modalKey.addEventListener('click', displayModal);

  // When the user hits cmd/ctrl + J, display the modal and stop the body being scrolled.
  document.addEventListener('keydown', function(e) {
    if (e.code === 'KeyJ' && (e.ctrlKey || e.metaKey) && !(e.shiftKey || e.altKey)) {
      displayModal(e);
    }
  });

  // Close the modal when the user clicks on the backdrop.
  modal.addEventListener('click', function () {
    modal.close();
  }, false);
  modalContent.addEventListener('click', function (e) {
    e.stopPropagation();
  }, false);

  // When the modal is closed, allow the body to be scrolled again.
  modal.addEventListener('close', (e) => {
    body.classList.remove('u-overflow-hidden');
  });

  // Listen for the user scrolling.
  document.addEventListener('scroll', function(e) {

    // Add a border to the navbar when the user is anywhere but at the very top of the viewport.
    if (window.scrollY !== 0) {
      navbar.classList.add('navbar--scrolled');
    }
    else {
      navbar.classList.remove('navbar--scrolled');
    }

    // Display a 'back to top' link when the user scrolls more than 400px from the top of the viewport.
    if (window.scrollY > 400) {
      backToTop.classList.add('back-to-top--visible');
    }
    else {
      backToTop.classList.remove('back-to-top--visible');
    }
  });

  // Listen for clicks on the search result button.
  searchClearButton.addEventListener('click', () => {
    
    // Clear the search field.
    searchInput.value = '';

    // Display all of the cards.
    cards.forEach(function(item) {
      item.classList.remove('card-grid__item--hidden');
    });

    // Disabled the result button.
    searchClearButton.setAttribute('disabled', '');

    // Check whether we need to create or remove an empty state.
    toggleEmptyState();
  })

  // Turn the cards object into an array, and hide all but the first six items on mobile.
  let excessCards = Array.prototype.slice.call(cards);
  excessCards = excessCards.slice(6);
  
  excessCards.forEach(function(item) {
    item.classList.add('card-grid__item--hide-mobile');
  });

  buttonShowAll.addEventListener('click', () => {
    cardGrid.classList.add('card-grid--expanded');
    buttonShowAll.remove();
  })

}, false);
