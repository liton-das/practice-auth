const skuGenerator=(title)=>{
    const cleaned = title.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const prefix = cleaned.slice(0,3);
    const uniqCode = Math.floor(1000 + Math.random() * 9000)
    return `${prefix}-${uniqCode}`
}
// slug generator function 
const slugGenerator=(text)=>{
    return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")   // replace spaces & special chars with -
    .replace(/^-+|-+$/g, "");      // remove starting & ending hyphens
}

module.exports = {
    skuGenerator,
    slugGenerator
}