export function citySearch(cities, onSelectCity) {
    const city_autocomplete = document.getElementById("city_autocomplete");

    city_autocomplete.innerHTML = "";

    if (!cities || cities.length === 0) {
        city_autocomplete.innerHTML = "<p>No cities found. Please try another search.</p>";
        return;
    }

    cities.forEach(city => {
        const city_btn = document.createElement("button");

        city_btn.textContent = `${city.name}, ${city.admin1}, ${city.country_code}`;

        city_btn.addEventListener("click", (e) => {
            e.preventDefault();
            try {
                onSelectCity(city);
                city_autocomplete.innerHTML = "";
            } catch(error) {
                console.error("Error selecting city:", error);
                const errorEl = document.getElementById("error_display");
                if (errorEl) {
                    errorEl.textContent = `✖ Error: Failed to load weather for ${city.name}`;
                    errorEl.classList.remove("hidden");
                    setTimeout(() => {
                        errorEl.classList.add("hidden");
                    }, 5000);
                }
            }
        });

        city_autocomplete.appendChild(city_btn);
    });
}