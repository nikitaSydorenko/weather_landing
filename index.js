// let burger = document.getElementById('menuToggle')
// let menu = document.getElementById('menu');
// burger.onclick = function () {
//
//     burger.classList.toggle("isActive");
//
//     if (burger.className === 'isActive') {
//         menu.classList.add("activeMenu")
//         document.body.style.overflow = 'hidden'
//     } else {
//         menu.classList.remove("activeMenu");
//         document.body.style.overflow = "auto"
//         document.body.style.overflowX = "hidden"
//     }
//
//     burger.id = 'menuToggle'
// }

console.log('hello');

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {

            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');

        });

        this.carouselArray.slice(0, 3).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }


    setCurrentState(direction) {

        if (direction.className === 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }

        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('img')).className = `gallery-controls-${control}`;
            let controls = document.querySelector(`.gallery-controls-${control}`)
            if(control === 'previous'){
                controls.setAttribute('src', 'images/left_arrow.png')
            }else {
                controls.setAttribute('src', 'images/right_arrow.png')
            }
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                if (control.className === 'gallery-controls-add') {
                    const newItem = document.createElement('img');
                    const latestItem = this.carouselArray.length;
                    const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') === this.carouselArray.length) + 1;


                    Object.assign(newItem, {
                        className: 'gallery-item',
                        src: `http://fakeimg.pl/300/?text=${this.carouselArray.length + 1}`
                    });
                    newItem.setAttribute('data-index', this.carouselArray.length + 1);

                    this.carouselArray.splice(latestIndex, 0, newItem);
                    document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
                    this.updateGallery();

                } else {
                    this.setCurrentState(control);
                }

            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();



