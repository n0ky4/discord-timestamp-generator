export async function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        try {
            const input = document.createElement('input')
            input.style.position = 'fixed'
            input.style.opacity = 0
            input.width = 1
            input.value = text
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}
