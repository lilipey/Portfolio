/*Caroussel*/
var carouselItems = document.querySelectorAll('.carousel-item');
var prevButton = document.querySelector('#previous-button');
var nextButton = document.querySelector('#next-button');

var activeIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
  carouselItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if (item.classList.contains('active')) {
        setTimeout(function() {
          item.classList.toggle('is-flipped');
        }, 100); 
      }
    });
  });
});

var newArray = [];
i=0;
function createArray() {
  carouselItems.forEach(function(item) {
    newArray.push(item);
    item.classList.add(`class${i}`);
    i++;
  });
  return newArray;
}
createArray();
console.log(newArray);


function updateCarousel() {
  carouselItems.forEach(function(item, index) {
      item.classList.remove('prev', 'active', 'next');
      if (index === 1) {
          item.classList.add('active');
      } else if (index === (1 - 1 + carouselItems.length) % carouselItems.length) {
          item.classList.add('prev');
      } else if (index === (1 + 1) % carouselItems.length) {
          item.classList.add('next');
      }
  });
}
prevButton.addEventListener('click', function(item) {
  let newArray = [...carouselItems]; // clone carouselItems
  activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
  carouselItems.forEach(function(item, index){
    newArray[index] = carouselItems[(index - 1 + carouselItems.length) % carouselItems.length];
    newArray[index].classList.add('transition');
    if (item.classList.contains('is-flipped')) {
      item.classList.remove('is-flipped');
    }
  });
  console.log("voici l'array", newArray);
  carouselItems = newArray; // update carouselItems with the new order

  // Reorder the DOM elements to match the order of carouselItems
  let carousel = document.querySelector('#carousel-container');
  carouselItems.forEach(function(item) {
    carousel.appendChild(item);
  });

  updateCarousel();
});

nextButton.addEventListener('click', function(item) {
  let newArray = [...carouselItems]; // clone carouselItems
  activeIndex = (activeIndex + 1) % carouselItems.length;
  carouselItems.forEach(function(item, index){
    newArray[index] = carouselItems[(index + 1 + carouselItems.length) % carouselItems.length];
    if (item.classList.contains('is-flipped')) {
      item.classList.remove('is-flipped');
    }
  });
  console.log("voici l'array", newArray);
  carouselItems = newArray; // update carouselItems with the new order
  // Reorder the DOM elements to match the order of carouselItems
  let carousel = document.querySelector('#carousel-container');
  carouselItems.forEach(function(item) {
    carousel.appendChild(item);
  });

  updateCarousel();
});


document.querySelector('.burger-menu').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('show');
  document.querySelector('body').classList.toggle('lock-scroll');
});

function doScroll(target) {
  document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
  });
  if  (document.querySelector('nav ul').classList.contains('show')){
      document.querySelector('nav ul').classList.remove('show');
  }
  // document.querySelector('nav ul').classList.toggle('show');
  if (document.querySelector('body').classList.contains('lock-scroll')) {
      document.querySelector('body').classList.remove('lock-scroll');
  }

}

// Obtenez tous les boutons qui ouvrent les pop-ups
var btns = document.querySelectorAll(".plus-techno-cont button");

// Pour chaque bouton, ajoutez un écouteur d'événements
btns.forEach((btn, index) => {
    var popup = document.getElementById("popup" + (index + 1));

    var span = popup.querySelector(".close");

    btn.onclick = function() {
        popup.style.display = "block";
        
    }

    // Lorsque l'utilisateur clique sur <span> (x), fermez la pop-up
    span.onclick = function() {
        popup.style.display = "none";
    }

    // Lorsque l'utilisateur clique n'importe où en dehors de la pop-up, fermez-la
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});