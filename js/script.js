$(document).ready(function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    $(".cover").on("click", function() {
        const weddingId = $(this).data("wedding");
        openPhotosGallery(weddingId);
    });

    $("#close").on("click", closeModal);
    $(document).on("click", "#prev", () => navigateImages('prev'));
    $(document).on("click", "#next", () => navigateImages('next'));
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        document.getElementById('next').click();
    } else if (event.key === 'ArrowLeft') {
        document.getElementById('prev').click();
    }
});

function openPhotosGallery(weddingId) {
    const gallery = $("#photos-gallery").empty();
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen cuando está cerca de ser visible
                observer.unobserve(img); // Deja de observar una vez cargada
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px', // Carga imágenes cuando están a 200px de entrar en el viewport
        threshold: 0.01
    });

    // Carga imágenes de forma dinámica
    for (let i = 1; i <= 100; i++) { // Asumiendo que hay 100 imágenes
        const imageSrc = `images/${weddingId}/${i}.png`;
        const img = $("<img>")
            .attr("data-src", imageSrc)
            .addClass("gallery-image")
            .toggleClass("active", i === 1)
            .on('error', function() {
                $(this).remove(); // Elimina la imagen que no pudo cargarse
            })
            .appendTo(gallery)[0]; // Añade al DOM para que el observer pueda observarlo

        observer.observe(img); // Observa la nueva imagen para lazy loading
    }

    $("#modal").fadeIn();
}

function closeModal() {
    $("#modal").fadeOut();
}

function navigateImages(direction) {
    const currentImage = $(".gallery-image.active");
    const targetImage = (direction === 'prev') ? currentImage.prev('.gallery-image') : currentImage.next('.gallery-image');

    if (targetImage.length) {
        switchImage(currentImage, targetImage);
    } else {
        // Si no hay más imágenes en la dirección seleccionada, vuelve a la primera o última imagen dependiendo de la dirección
        const fallbackImage = (direction === 'prev') ? $(".gallery-image").last() : $(".gallery-image").first();
        switchImage(currentImage, fallbackImage);
    }
}

function switchImage(currentImage, targetImage) {
    currentImage.fadeOut('fast', () => {
        currentImage.removeClass("active");
        targetImage.fadeIn('fast').addClass("active");
    });
}