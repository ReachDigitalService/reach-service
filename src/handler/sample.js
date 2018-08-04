//sample handler

const sample = (d, c) => {
    //call back with http status code, and call back
    c(406, { name: 'sampleHandler' })
}
export{sample}