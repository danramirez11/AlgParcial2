import { getPhoto, getText } from "../../services/dataFetch";

export enum Attribute {
    "text" = "text",
    "photo" = "photo",
}

class Card extends HTMLElement {

    text?: string;
    photo?: string;

    static get observedAttributes(){
        const attrs: Record <Attribute, null> = {
            text: null,
            photo: null,
        }
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.render()
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined){
        switch(propName){
            default:
                this[propName] = newValue;
                break;
        }
    }

    async connectedCallback() {
        
        const button = this.shadowRoot?.querySelector("button");
        button?.addEventListener("click", async () => {
            var phrase = await getText();
            var phraseArray = phrase.fact.split(" ");
            var phraseShort = ""
            for (let i = 0 ; i < 4 ; i++){
                phraseShort += ` ${phraseArray[i]}`
            }

            var image = await getPhoto(phraseShort);

            this.refresh(image?.url, phrase.fact)
        })
    }

    refresh(img: any, fact:string){
            this.photo = img
            this.text = fact
            this.render()
    }

    
    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <img src="${this.photo}" alt="photo">
            <p>${this.text || "click to generate fact"}</p>
            <button>Random cat fact</button>
            `
        }
    }
}

customElements.define("my-card", Card)
export default Card;