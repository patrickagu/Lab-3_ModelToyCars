// ToyCar constructor takes individual parameters for each property
function ToyCar(
  brand,
  model,
  year,
  scale,
  color,
  finish,
  materialBody,
  hasRubberTires,
  openingParts,
  sku,
  series,
  packaging,
  lengthInches,
  weightGrams,
  price
) {
  // Identity
  this.brand = brand;
  this.model = model;
  this.year = Number(year);
  this.scale = scale;

  // Appearance & materials
  this.color = color;
  this.finish = finish;
  this.materialBody = materialBody;
  this.hasRubberTires = hasRubberTires; // true or false
  this.openingParts = Number(openingParts);

  // Packaging & identifiers
  this.sku = sku;
  this.series = series;
  this.packaging = packaging;

  // Dimensions & price
  this.lengthInches = Number(lengthInches);
  this.weightGrams = Number(weightGrams);
  this.price = Number(price);

  // readable display name
  this.displayName = this.year + " " + this.model + " (" + this.scale + ")";
}

// Instance methods on the prototype
ToyCar.prototype.summary = function () {
  return (
    this.displayName +
    " — " +
    this.color +
    " " +
    this.finish +
    " • " +
    this.materialBody +
    " • $" +
    this.price.toFixed(2)
  );
};

ToyCar.prototype.updateColor = function (newColor) {
  if (newColor && newColor.trim().length > 0) {
    this.color = newColor.trim();
  }
};

ToyCar.prototype.updatePrice = function (newPrice) {
  const p = Number(newPrice);
  if (!isNaN(p) && p >= 0) {
    this.price = p;
  }
};

// Instance methods on the prototype
ToyCar.prototype.summary = function () {
  return (
    this.displayName +
    " — " +
    this.color +
    " " +
    this.finish +
    " • " +
    this.materialBody +
    " • $" +
    this.price.toFixed(2)
  );
};

ToyCar.prototype.updateColor = function (newColor) {
  if (newColor && newColor.trim().length > 0) {
    this.color = newColor.trim();
  }
};

ToyCar.prototype.updatePrice = function (newPrice) {
  const p = Number(newPrice);
  if (!isNaN(p) && p >= 0) {
    this.price = p;
  }
};

// list of created cars and selected index for editor
const cars = [];
let selectedIndex = null;

// DOM references for form and display areas
const form = document.getElementById("carForm");
const carList = document.getElementById("carList");
const editor = document.getElementById("editor");
const editColor = document.getElementById("editColor");
const editPrice = document.getElementById("editPrice");
const applyEdit = document.getElementById("applyEdit");

// Handle form submission to create a new ToyCar and render
form.addEventListener("submit", function (e) {
  e.preventDefault();

// Collect values from the form
  const car = new ToyCar(
    document.getElementById("brand").value,
    document.getElementById("model").value,
    document.getElementById("year").value,
    document.getElementById("scale").value,
    document.getElementById("color").value,
    document.getElementById("finish").value,
    document.getElementById("materialBody").value,
    document.getElementById("hasRubberTires").checked,
    document.getElementById("openingParts").value,
    document.getElementById("sku").value,
    document.getElementById("series").value,
    document.getElementById("packaging").value,
    document.getElementById("lengthInches").value,
    document.getElementById("weightGrams").value,
    document.getElementById("price").value
  );

  // Add car to list
  cars.push(car);

  // Reset selection and form
  selectedIndex = null;
  editor.hidden = true;
  form.reset();

  // Call the Re-render list function to update display
  renderList();
});

// Render the list of cars
function renderList() {
  carList.innerHTML = "";

  cars.forEach(function (car, index) {
    const li = document.createElement("li");
    li.className = "car-card";

    // Title
    const title = document.createElement("h4");
    title.textContent = car.brand + " " + car.summary();
    li.appendChild(title);

    // Meta details
    const meta = document.createElement("div");
    meta.className = "car-meta";
    meta.textContent =
      "SKU: " +
      (car.sku || "—") +
      " • Series: " +
      (car.series || "—") +
      " • Packaging: " +
      car.packaging;
    li.appendChild(meta);

    // Actions
    const actions = document.createElement("div");
    actions.className = "card-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      selectedIndex = index;
      editColor.value = car.color;
      editPrice.value = car.price.toFixed(2);
      editor.hidden = false;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      cars.splice(index, 1);
      if (selectedIndex === index) {
        selectedIndex = null;
        editor.hidden = true;
      }
      renderList();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    carList.appendChild(li);
  });
}

// Apply edits to selected car using the editor form
applyEdit.addEventListener("click", function () {
  if (selectedIndex == null) return;
  const car = cars[selectedIndex];

  car.updateColor(editColor.value);
  car.updatePrice(editPrice.value);

  renderList();
});
