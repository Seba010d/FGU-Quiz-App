const myDataName = "Data";

export function saveData(data) {
  localStorage.setItem(myDataName, JSON.stringify(data));
}

export function loadData() {
  const data = localStorage.getItem(myDataName);

  if (!data) {
    console.warn("Ingen data fundet i localStorage!");
    return null;
  }

  return JSON.parse(data);
}
