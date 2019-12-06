const main = async () => {
    const getResponse = await fetch('https://postman-echo.com/get', {
        headers: {
            'User-Agent': 'test'
        }
    })

    console.log('GET response:', await getResponse.text())

    const postResponse = await fetch('https://postman-echo.com/post', {
        method: "POST",
        headers: { 'User-Agent': 'test' }
    })

    console.log('POST response:', await postResponse.text())
}

main().catch(err => {
    console.error(err)
})