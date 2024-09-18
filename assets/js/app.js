(function () {
    "use strict";
    const slideTimeout = 900000000000000000;
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const $slides = document.querySelectorAll('.slide');
    let $dots;
    let intervalId;
    let currentSlide = 1;

    // Informations sur les produits
    const products = [
        {
            title: "T-shirt Homme DeadSec",
            description: "T-shirt noir avec le logo DeadSec pour homme.<br>Cet équipement légendaire vous octroie :<br>+10 en Charisme<br>+5 en Furtivité<br>-20% de chances d'être repéré par la sécurité",
            price: "29,99 €"
        },
        {
            title: "T-shirt Femme DeadSec",
            description: "T-shirt noir avec le logo DeadSec pour femme.<br>Ce vêtement enchanté vous confère :<br>+15 en Piratage<br>+8 en Intimidation<br>100% de chances de faire bugger les caméras de surveillance",
            price: "29,99 €"
        },
        {
            title: "Combinaison Bébé DeadSec",
            description: "Combinaison pour bébé avec le logo DeadSec.<br>Cet artefact rare augmente les statistiques de votre progéniture :<br>+20 en Mignonnerie<br>+10 en Infiltration<br>-50% de résistance aux adults attendris",
            price: "24,99 €"
        },
        {
            title: "Préservatif DeadSec",
            description: "Préservatif avec le logo DeadSec pour une protection maximale.<br>Grâce à ce préservatif connecté, vous aurez :<br>+5 en vitesse de pointe<br>+13 en endurance<br>99% de protection contre les virus (informatiques et autres)",
            price: "99,99 € (pack de 3)"
        },
        {
            title: "Vandal DeadSec",
            description: "Pistolet à eau pour les opérations de vandalisme aquatique.<br>Ce skin vous rapportera :<br>+10 en dégâts<br>x2 en gain RR<br>75% de chances de provoquer un court-circuit sur les systèmes électroniques",
            price: "39,99 €"
        }

    ];

    function updateProductInfo(index) {
        document.getElementById('product-title').textContent = products[index].title;
        document.getElementById('product-description').innerHTML = products[index].description;
        document.getElementById('product-price').textContent = `Prix : ${products[index].price}`;
    }

    function slideTo(index) {
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
        updateProductInfo(currentSlide);
    }

    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }

    // Boucle pour créer les "dots" en fonction du nombre de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    // Récupère tous les "dots"
    $dots = document.querySelectorAll('.dot');
    // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
    // Ajout d'un écouteur d'événement "click" sur le bouton "prev" pour afficher le slide précédent
    prev.addEventListener('click', () => slideTo(--currentSlide))
    // Ajout d'un écouteur d'événement "click" sur le bouton "next" pour afficher le slide suivant
    next.addEventListener('click', () => slideTo(++currentSlide))
    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
    // Boucle sur tous les éléments de type "slide" pour ajouter des écouteurs d'événement pour les interactions avec la souris et le toucher
    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // Réinitialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        // Enregistre la position initiale du toucher lorsque l'utilisateur touche un slide
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        // Enregistre la position finale du toucher lorsque l'utilisateur relâche son doigt
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            // Si la position initiale est plus grande que la position finale, affiche le prochain slide
            if (startX > endX) {
                slideTo(currentSlide + 1);
                // Si la position initiale est plus petite que la position finale, affiche le slide précédent
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })
})()


