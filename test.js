function createModule(str1, str2) {
  return {
    greeting: str1,
    name: str2,
    saylt: function() {
      return greeting + "," + name
    }
  }
}

let a = createModule("a", "b")
let greeting = "aa"
console.log(a.saylt());