document.addEventListener('DOMContentLoaded', () => {
    const logoText = document.querySelector('[data-typewriter]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (logoText && !reduceMotion) {
        const name = logoText.textContent.trim();
        logoText.textContent = '';

        let characterIndex = 0;
        let deleting = false;

        const animateName = () => {
            logoText.textContent = name.slice(0, characterIndex);

            if (!deleting && characterIndex === name.length) {
                deleting = true;
                window.setTimeout(animateName, 1300);
                return;
            }

            if (deleting && characterIndex === 0) {
                deleting = false;
                window.setTimeout(animateName, 350);
                return;
            }

            characterIndex += deleting ? -1 : 1;
            window.setTimeout(animateName, deleting ? 70 : 125);
        };

        window.setTimeout(animateName, 250);
    }

    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const subject = encodeURIComponent(`Nuevo contacto web de ${name}`);
            const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);

            window.location.href = `mailto:wilfredo.a.a.f@gmail.com?subject=${subject}&body=${body}`;
            alert('¡Gracias por tu mensaje! Se abrirá tu cliente de correo para confirmar el envío.');
            form.reset();
        });
    }

    const orbScene = document.querySelector('[data-orb-scene]');
    const orbStage = orbScene?.querySelector('.orb-stage');
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (orbScene && orbStage && supportsFinePointer) {
        orbScene.addEventListener('pointermove', (event) => {
            const bounds = orbScene.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            orbStage.style.setProperty('--scene-x', `${-y * 9}deg`);
            orbStage.style.setProperty('--scene-y', `${x * 12}deg`);
        });

        orbScene.addEventListener('pointerleave', () => {
            orbStage.style.setProperty('--scene-x', '0deg');
            orbStage.style.setProperty('--scene-y', '0deg');
        });
    }

    if (supportsFinePointer) {
        document.querySelectorAll('.stack-card, .project-card').forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                const bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;

                card.style.setProperty('--tilt-x', `${-y * 2.5}deg`);
                card.style.setProperty('--tilt-y', `${x * 2.5}deg`);
            });

            card.addEventListener('pointerleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            });
        });
    }

    const revealItems = document.querySelectorAll('.section-header, .stack-card, .project-card, .contact-form, .footer');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item, index) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${Math.min(index % 6, 4) * 70}ms`;
            revealObserver.observe(item);
        });
    }

    const navLinks = document.querySelectorAll('.navbar__link');
    const linkedSections = [...navLinks]
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && linkedSections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('is-active', isActive);
                });
            });
        }, { rootMargin: '-35% 0px -55% 0px' });

        linkedSections.forEach((section) => sectionObserver.observe(section));
    }
});
