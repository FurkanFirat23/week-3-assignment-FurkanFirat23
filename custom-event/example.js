//  custom events kurulumu
const catFound = new CustomEvent("animalfound", {
  detail: {
    name: "köpek",
  },
});
const dogFound = new CustomEvent("animalfound", {
  detail: {
    name: "kuş",
  },
});

// uygun bir event listener eklenimi
obj.addEventListener("animalfound", (e) => console.log(e.detail.name));

// dispatch the events
obj.dispatchEvent(catFound);
obj.dispatchEvent(dogFound);

//  "köpek" ve "kuş" consol'da loglandı.
