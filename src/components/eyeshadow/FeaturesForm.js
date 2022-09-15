import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const FeaturesForm = () => {

    const [eyeColors, setEyeColors] = useState([])

    const [undertones, setUndertones] = useState([])

    const [features, updateFeatures] = useState({
        "eyeColorId": 0,
        "toneId": 0,
        "userId": 0
    })

    const navigate = useNavigate()

    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)



    useEffect(
        () => {
            fetch(`http://localhost:8088/eyeColor`)
            .then(response => response.json())
            .then((eyeColorsArray) => {
                setEyeColors(eyeColorsArray)
            })
        }, []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/undertone`)
            .then(response => response.json())
            .then((undertonesArray) => {
                setUndertones(undertonesArray)
            })
        }, []
    )

    const handleSaveButtonClick = (event) => {

        event.preventDefault()
        const featuresToSendToAPI = {
            userId: eyeUserObject.id,
            eyeColorId: features.eyeColorId,
            toneId: features.toneId
        }
        return fetch(`http://localhost:8088/featuresSelection`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(featuresToSendToAPI)
        })
        .then(response => response.json())
        .then(() => { 

        })
    }


    const EyeshadowSelections = () => {

        
    }


   return (
        <form className="featuresForm">
            <h2 className="featuresForm__title">Eyeshadow Color Generator</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eyeColor">Eye Color:</label>
                    <select id = "eyeColor" 
                    required autoFocus
                    className="form-control"
                    value={eyeColors.id}
                        onChange={(event) => {
                            const copy = {...features}
                            copy.eyeColorId = event.target.value
                            updateFeatures(copy)
                        }}>                
                        <option value = "0"> Choose Eye Color</option>        
                        {
                        eyeColors.map(eyeColor => {
                            return <option value = {eyeColor.id} key = {`eyeColor--${eyeColor.id}`}> {eyeColor.color}</option>
                        })
                    }
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="undertone">Undertone:</label>
                    <select
                        required autoFocus
                        className="form-control"
                        value={undertones.id}
                        onChange={(event) => {
                                const copy = {...features}
                                copy.toneId = event.target.value
                                updateFeatures(copy)
                            }
                        }>
                        <option value = "0"> Choose Undertone</option>
                        {
                            undertones.map(undertone => {
                            return <option value = {undertone.id} key = {`undertone--${undertone.id}`}> {undertone.tone}</option>})
                        }
                        </select>
                        <section className="link--undertone">
                            Need help finding your undertone?   <Link to="/undertone_finder">Click Here!</Link>
                        </section>
                </div>
            </fieldset>
            <button onClick = {(clickEvent) => handleSaveButtonClick(clickEvent)}  className="btn btn-primary">
                Submit Features
            </button>
        </form>
    )
}