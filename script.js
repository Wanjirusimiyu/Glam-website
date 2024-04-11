document.addEventListener("DOMContentLoaded", () => {
    const makeupItems = document.getElementById("makeupItems");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const productDetails = document.getElementById("productDetails");
    const productName = document.getElementById("productName");
    const productDescription = document.getElementById("productDescription");
    const productPrice = document.getElementById("productPrice");

    // Function to render makeup items
    const renderMakeupItems = (items) => {
        makeupItems.innerHTML = "";
        const filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(searchInput.value.trim().toLowerCase())
        ).slice(0, 40);
        if (filteredItems.length === 0) {
            const alert = document.createElement("p");
            alert.classList.add("alert")
            alert.textContent = "there is no matching product!!"
            makeupItems.appendChild(alert);
        } else {
            filteredItems.forEach(item => {
                const makeupItem = document.createElement("div");
                makeupItem.classList.add("makeup-item");

                const image = document.createElement("img");
                image.src = item.image_link;
                image.alt = item.name;
                image.addEventListener("click", () => {
                    showProductDetails(item);
                });

                const name = document.createElement("h2");
                name.textContent = item.name;

                makeupItem.appendChild(image);
                makeupItem.appendChild(name);

                makeupItems.appendChild(makeupItem);
            });
        }
    };

    // Function to display product details
    const showProductDetails = (item) => {
        productName.textContent = item.name;
        productDescription.textContent = item.description;
        productPrice.textContent = `Price: $${item.price ? item.price : 'N/A'}`;
        productDetails.style.display = "block";
    };

    // Event listener for search button
    searchButton.addEventListener("click", async () => {
        const data = await fetchMakeupData();
        renderMakeupItems(data);
    });

    // Function to fetch makeup data from the API
    const fetchMakeupData = async () => {
        try {
            const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching makeup data:", error);
        }
    };

    // Initial rendering of makeup items
    fetchMakeupData().then(data => renderMakeupItems(data));
});