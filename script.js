document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const form = document.getElementById("report-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const business = document.getElementById("business").value.trim();
        const email = document.getElementById("email").value.trim();
        const website = document.getElementById("website").value.trim();
        const message = document.getElementById("message").value.trim();

        const subject = encodeURIComponent(
            `Free Website Report Request - ${business}`
        );

        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Business: ${business}\n` +
            `Email: ${email}\n` +
            `Website: ${website}\n\n` +
            `What they want to improve:\n${message || "Not supplied"}`
        );

        window.location.href =
            `mailto:hello@fiftysixgrowth.co.uk?subject=${subject}&body=${body}`;
    });
});