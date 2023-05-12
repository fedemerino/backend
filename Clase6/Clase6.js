let obj = {};
for (let i = 0; i < 10000; i++) {
    let number = Math.ceil(Math.random() * 20)
    if (!obj[number]) {
        obj[number] = 1
    }
    else obj[number] +=1;
}
console.log(obj)