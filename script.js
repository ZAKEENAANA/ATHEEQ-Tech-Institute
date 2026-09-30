document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. MOBILE MENU LOGIC (All Pages)
    // =========================================
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');

    if (menuBtn && mobileMenu && closeBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Close menu when a link inside the mobile menu is clicked
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // =========================================
    // 2. IMAGE SLIDER LOGIC (Homepage Only)
    // =========================================
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots');

    if (slider && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // =========================================
    // 3. FAQ ACCORDION LOGIC (Courses Page)
    // =========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = header.nextElementSibling;
                
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    }
                });

                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }

    // =========================================
    // 4. FORM TAB SWITCHING LOGIC (Contact Page)
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const submitBtn = document.querySelector('#enrollmentForm button[type="submit"]');
                if (submitBtn) {
                    if (btn.dataset.target === 'repair') {
                        submitBtn.textContent = 'Send Repair Inquiry via WhatsApp';
                    } else if (btn.dataset.target === 'tool') {
                        submitBtn.textContent = 'Send Tool Inquiry via WhatsApp';
                    } else {
                        submitBtn.textContent = 'Send Enrollment via WhatsApp';
                    }
                }
            });
        });
    }

    // =========================================
    // 5. CONTACT FORM TO WHATSAPP LOGIC (Contact Page)
    // =========================================
    const enrollmentForm = document.getElementById('enrollmentForm');

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const email = document.getElementById('email').value;
            const courseSelect = document.getElementById('course');
            
            let course = "";
            if (courseSelect) {
                course = courseSelect.options[courseSelect.selectedIndex].text;
            }
            
            const location = document.getElementById('location').value;
            const experience = document.getElementById('experience').value;
            const message = document.getElementById('message').value;

            if (!name || !phone) {
                alert("Please fill in at least your Full Name and Phone number.");
                return;
            }

            const myWhatsAppNumber = "94759241310";
            
            let text = `*New Inquiry from Website*%0A%0A`;
            text += `*Name:* ${name}%0A`;
            text += `*Phone:* ${phone}%0A`;
            if (whatsapp) text += `*WhatsApp:* ${whatsapp}%0A`;
            if (email) text += `*Email:* ${email}%0A`;
            if (course) text += `*Course:* ${course}%0A`;
            if (location) text += `*Location:* ${location}%0A`;
            if (experience) text += `*Experience:* ${experience}%0A`;
            if (message) text += `%0A*Message:*%0A${message}`;

            const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${text}`;
            window.open(whatsappURL, '_blank');
            enrollmentForm.reset();
        });
    }

});