
let testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

setInterval(() => {
    currentIndex = (currentIndex + 1)})
