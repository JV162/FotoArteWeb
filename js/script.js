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

// Verifica si el dispositivo es un móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Función para manejar la navegación del modal según el tipo de dispositivo
function handleModalNavigation() {
    if (isMobile) {
        // Ocultar las flechas en dispositivos móviles
        document.getElementById('prev').style.display = 'none';
        document.getElementById('next').style.display = 'none';

        let touchStartX = 0;
        let touchEndX = 0;

        document.getElementById('modal').addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].clientX;
        });

        document.getElementById('modal').addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 10) { // Cambiar el umbral según la sensibilidad deseada
                navigateImages(diff > 0 ? 'next' : 'prev');
            }
        });

        // Mostrar el icono animado de deslizar en la primera imagen
        const firstImage = $(".gallery-image").first();
        const swipeIcon = $("<div>")
            .addClass("swipe-icon")
            .html('images/desliza-a-la-derecha.gif" alt="Desliza para pasar la página">')
            .appendTo(firstImage);
    } else {
        // Mantener la navegación con flechas para laptops
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowRight') {
                document.getElementById('next').click();
            } else if (event.key === 'ArrowLeft') {
                document.getElementById('prev').click();
            }
        });
    }
}

// Llama a la función para manejar la navegación del modal
handleModalNavigation();

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
        rootMargin: '0px 0px 200px 0px', // Carga imágenes cuando están a 200px de entrar en el viewport
        threshold: 0.01
    });

    // Carga y observa cada imagen en la galería
    for (let i = 1; i <= maxImages; i++) {
        const imageSrc = `images/${weddingId}/${i}.webp`;
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
// Función para animar elementos de entrada al cargar el documento
function animateEntryElements() {
    // Código para animar elementos de entrada
}

