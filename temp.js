let o = [
  {
    _id: "68ea21ef8d8089ef8d4c73fa",
    title: "New AI Model Revolutionizes Healthcare",
    description:
      "A new AI model is changing the landscape of medical diagnostics by improving early disease detection.",
    subdescription:
      "Experts believe this advancement will greatly enhance healthcare accessibility worldwide.",
    categories: ["Technology", "Healthcare", "AI"],
    createdAt: "2025-10-14T09:22:55.112Z",
    updatedAt: "2025-10-11T09:22:55.112Z",
    __v: 0,
  },
];

let d = new Date();
let date = d.toLocaleDateString();
console.table(typeof date.slice(0, 2));
let f = o.filter(
  (e) =>
    new Date(e.createdAt).toLocaleDateString().slice(0, 2) == date.slice(0, 2)
);
console.log(f);
