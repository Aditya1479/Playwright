const test = require('@playwright/test')
test.describe.configure({
    mode: 'parallel', headless: false
});

test(" test1 ", ()=> {
    console.log("test1");
})

test(" test2 ", ()=> {
    console.log("test2");
})

test(" test3 ", ()=> {
    console.log("test3");
})

