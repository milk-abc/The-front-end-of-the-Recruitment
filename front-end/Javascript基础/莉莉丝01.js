function render(template, context) {
  let arr = template.match(/{{(.*?)}}/g);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(".")) {
      let l1 = arr[i].split(".")[0].slice(2);
      let l2 = arr[i].split(".")[1].slice(0, -2);
      template = template.replace(arr[i], context[l1][l2]);
    } else {
      let l1 = arr[i].slice(2, -2);
      template = template.replace(arr[i], context[l1]);
    }
  }
  return template;
}
let word = new String(
  "{{name}}很厉害，趁着{{info.school}}放暑假，去{{info.city}}获得了{{info.gold}}个金牌！",
  { name: "杨倩", info: { age: 21, school: "清华大学", city: "东京", gold: 2 } }
);

let template = word.match(/"(.*?)"/g);
for (let i = 0; i < template.length; i++) {
  console.log("tem", template);
}

// console.log(render(template, context));
