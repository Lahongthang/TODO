export const encode = (body) => {
    let formBody = []
    for (let item in body) {
        let encodedKey = encodeURIComponent(item)
        let encodedValue = encodeURIComponent(body[item])
        formBody.push(encodedKey + "=" + encodedValue)
    }
    formBody = formBody.join("&")
    return formBody
}