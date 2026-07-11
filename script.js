document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("current-year");
    const form = document.getElementById("report-form");
    const statusElement = document.getElementById("form-status");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (!form || !statusElement) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const websiteField = document.getElementById("website");

        statusElement.textContent = "";
        statusElement.className = "form-status";

        let websiteValue = websiteField.value.trim();

        if (
            websiteValue &&
            !websiteValue.startsWith("http://") &&
            !websiteValue.startsWith("https://")
        ) {
            websiteValue = `https://${websiteValue}`;
        }

            websiteField.value = websiteValue;
        
        if (!websiteField) {
            statusElement.textContent =
                "The website address field could not be found.";
            statusElement.classList.add("form-status-error");
            return;
        }

        let websiteValue = websiteField.value.trim();

        if (
            websiteValue &&
            !websiteValue.startsWith("http://") &&
            !websiteValue.startsWith("https://")
        ) {
            websiteValue = `https://${websiteValue}`;
        }

        websiteField.value = websiteValue;

        submitButton.disabled = true;
        submitButton.textContent = "Sending request...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Form submission failed: ${response.status}`);
            }

            form.reset();

            statusElement.textContent =
                "Thank you. Your request has been sent successfully.";
            statusElement.classList.add("form-status-success");
        } catch (error) {
            console.error(error);

            statusElement.textContent =
                "Sorry, your request could not be sent. Please try again or email hello@fiftysixgrowth.co.uk.";
            statusElement.classList.add("form-status-error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent =
                "Request My Free AI Growth Report";
        }
    });
});