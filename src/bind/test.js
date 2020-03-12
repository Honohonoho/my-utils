// currify(addTwo)(1)(2) => 3
addTwo = (a, b) => a+b
currify = (fn, params = []) => {
    return (arg)=> {
        params.push(arg)
        if(params.length === fn.length) {
            return fn(...params)
        } else {
            return currify(fn, params)
        }
    }
}

newAddTwo = currify(addTwo)
console.log(newAddTwo(1)(2))

var xhr = new XMLHttprequest()
xhr.open('GET', 'api/xxx')
request.onreadystatechange = function () {
    if(request.readyState === 4) {
        console.log('done')
        if(request.reponse.state >= 200 && request.reponse.state < 300) {
            console.log('good')
        }    
    }
}
request.send()