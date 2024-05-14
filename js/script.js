$(document).ready(function() {
    // Inicializa los oyentes de eventos y anima los elementos de entrada al cargar el documento
    initializeEventListeners();
    animateEntryElements(); // Animación inicial para elementos de la página
});

// Función para inicializar los oyentes de eventos en varios elementos de la interfaz
function initializeEventListeners() {
    // Oyente para abrir la galería de fotos al hacer clic en una portada
    $(".cover").on("click", function() {
        const weddingId = $(this).data("wedding");
        openPhotosGallery(weddingId);
    });

    // Oyentes para cerrar el modal y navegar entre imágenes
    $("#close").on("click", closeModal);
    $(document).on("click", "#prev", () => navigateImages('prev'));
    $(document).on("click", "#next", () => navigateImages('next'));
    $("#modal").on("click", function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
}

// Oyente para la navegación de imágenes con teclas de flecha
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        document.getElementById('next').click();
    } else if (event.key === 'ArrowLeft') {
        document.getElementById('prev').click();
    }
});

// Función para abrir la galería de fotos, cargar imágenes y observar su intersección
function openPhotosGallery(weddingId) {
    const gallery = $("#photos-gallery").empty();
    const maxImages = 50;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 10px 0px',
        threshold: 0.01
    });

    // Carga y observa cada imagen en la galería
    for (let i = 1; i <= maxImages; i++) {
        const imageSrc = `images/${weddingId}/${i}.png`;
        const img = $("<img>")
            .attr("data-src", imageSrc)
            .addClass("gallery-image")
            .toggleClass("active", i === 1)
            .on('error', function() {
                $(this).remove();
            })
            .appendTo(gallery)[0];

        observer.observe(img);
    }

    $("#modal").fadeIn();
}

// Función para cerrar el modal
function closeModal() {
    $("#modal").fadeOut();
}

// Función para navegar entre imágenes en la galería
function navigateImages(direction) {
    const currentImage = $(".gallery-image.active");
    let targetImage = (direction === 'prev') ? currentImage.prev('.gallery-image') : currentImage.next('.gallery-image');

    if (!targetImage.length) {
        closeModal();
        return;
    }

    switchImage(currentImage, targetImage);
}

// Función para cambiar la imagen actual por la imagen objetivo
function switchImage(currentImage, targetImage) {
    currentImage.removeClass("active").fadeOut('fast', () => {
        targetImage.fadeIn('fast').addClass("active");
    });
}

// Función para animar los elementos de entrada en la página
function animateEntryElements() {
    gsap.from(".cover", { duration: 1, opacity: 0, y: 50, stagger: 0.2 });
    gsap.from("#navigation-bar", { duration: 1.5, opacity: 0, y: -50 });
}

function showCustomMessage(message) {
    $("#message-text").text(message);
    $("#message-container").fadeIn(300).delay(3000).fadeOut(300); // Aparece, se mantiene 3 segundos y desaparece
}
