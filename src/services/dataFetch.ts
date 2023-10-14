export const getPhoto = (text: string) => {
    try{
        const photo = fetch(`https://cataas.com//cat/says/${text}`).then(res => res)
        console.log(photo)
        return photo;

    } catch (error) {
        console.error(error)
    }
}

export const getText = () => {
    try{
        const text = fetch(`https://catfact.ninja/fact`).then(res => res.json())
        return text;
    } catch (error) {
        console.error(error)
    }
}