import "./UndertoneFinder.css"
import {useEffect, useState} from "react"


export const UndertoneFinder = () => {

    const [veinColor, setVeinColor] = useState([])

    const [undertones, setUndertones] = useState([])

    const[showDiv, setShowDiv] = useState(true)

    const[undertoneTone, setUndertoneTone] = useState('');

    useEffect(
        () => {
            fetch(`http://localhost:8088/tones`)
            .then(response => response.json())
            .then((undertonesArray) => {
                setUndertones(undertonesArray)
            })
        }, []
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/veins`)
            .then(response => response.json())
            .then((veinsArray) => {
                setVeinColor(veinsArray)
            })
        }, []
    )


    
    return (
        <center>
        <section className="undertoneFinder">
            <h2 className="undertoneFinder__title">Undertone Finder</h2>
            <img className = "undertoneImg" src={require("./undetonespngnew.png")} />
            <section className = "undertone__descriptions">
                <article className = "Undertone__description">
                    <div>
                        <h3>Find Your Undertone!</h3>
                        <b>Veins</b>
                            <div className = "undertone_advice">A great way to find out your undertone is to look at your veins. Use the dropdown below to find out your undertone!</div>
                            
                            <label htmlFor="vein_label">What are the color of your veins?</label>
                            <div className = "select_option">
                                <select
                                required autoFocus
                                className="form-control"
                                key = {`vein--${veinColor.id}`}
                                value={veinColor.id}
                                onChange={(event) => {
                                    setShowDiv(true)
                                    const valueParse = parseInt(event.target.value) 
                                    
                                    undertones.map((undertone) => {
                                        if(undertone.veinId === valueParse) {
                                            setShowDiv(false);
                                            setUndertoneTone(undertone.tone);
                                        }
                                        if(valueParse === 0) {
                                            setShowDiv(true)
                                        }
                                    })
                                }
                                }>
                                
                                <option value = "0">Vein Color</option>
                                {
                                    veinColor.map(vein => {
                                        return <option value = {vein.id}>{vein.color}</option>
                                        })
                                    }
                                
                            </select>
                            <div className = "foundUndertone" hidden={showDiv}>You Have a {undertoneTone} Undertone!</div>
                            </div>
                    </div>
                </article>
            </section>
        </section></center>
    )
}