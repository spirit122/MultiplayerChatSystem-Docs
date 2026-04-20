const sectionLinks = Array.from(document.querySelectorAll(".toc a"));
const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if (sectionLinks.length && sections.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) {
                return;
            }

            const id = `#${visible.target.id}`;
            sectionLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
        },
        {
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0.15, 0.35, 0.6]
        }
    );

    sections.forEach((section) => observer.observe(section));
}
