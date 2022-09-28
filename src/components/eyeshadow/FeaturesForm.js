import { click } from "@testing-library/user-event/dist/click"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./FeaturesForm.css"

export const FeaturesForm = () => {

    const [eyeColors, setEyeColors] = useState([])

    const [undertones, setUndertones] = useState([])

    const [features, updateFeatures] = useState({
        "eyeColorId": 0,
        "toneId": 0
    })

    const [featuresData, updateFeaturesData] = useState([])



    const [colorCategory, setColorCategory] = useState([])
    
    const [eyeshadowColors, setEyeshadowColors] = useState([])

    const [eyeshadowEyeColor, setEyeshadowEyeColor] = useState([])

    const [colorsBasedOnSelections, updateColorsBasedOnSelections] = useState([])




    const [filteredEyeshadows, setFilteredEyeshadows] = useState([])

    const [selectedEyeshadows, updateSelectedEyeShadows] = useState(new Set())

    const [colorAndFeatureId, updateColorAndFeatureId] = useState(0)

    const [showEyeshadows, setShowEyeshadows] = useState(false)

    const navigate = useNavigate()

    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)


    const getEyeColors = ()=> {
        fetch(`http://localhost:8088/eyeColors`)
            .then(response => response.json())
            .then((eyeColorsArray) => {
                setEyeColors(eyeColorsArray)
            })
    }
    useEffect(
        () => {
            getEyeColors()
            
        }, []
    )
    
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
            fetch(`http://localhost:8088/colorCategories`)
            .then(response => response.json())
            .then((colorCategoryArray) => {
                setColorCategory(colorCategoryArray)
            })
        }, []
        )
        
        
        useEffect(
            () => {
                fetch(`http://localhost:8088/eyeshadowColors?_expand=colorCategory`)
                .then(response => response.json())
                .then((eyeshadowArray) => {
                    setEyeshadowColors(eyeshadowArray)
                })
            }, []
            )

            useEffect(
                () => {
                    fetch(`http://localhost:8088/featuresSelections`)
                    .then(response => response.json())
                    .then((featuresArray) => {
                        updateFeaturesData(featuresArray)
                    })
                }, [updateFeatures]
                )
            
        
        const getEyeShadowEyeColors = () => {
            fetch(`http://localhost:8088/eyeshadowEyeColors?_expand=eyeColor&_expand=eyeshadowColor`)
                .then(response => response.json())
                .then((data) => {
                    setEyeshadowEyeColor(data)
                })
        }
        useEffect(
            () => {
               getEyeShadowEyeColors()
            }, []
            )
        
        useEffect(() => {

           const eyeshadowMatch = eyeshadowEyeColor.filter(eyeshadow => {
                    return ((features.toneId === eyeshadow.eyeshadowColor.toneId) && (features.eyeColorId === eyeshadow.eyeColorId)  )
                })
            
            setFilteredEyeshadows(eyeshadowMatch)

        }, [features])
                





    const handleSaveButtonClick = (event) => {

        event.preventDefault()
        
        const featuresToSendToAPI = {
            userId: parseInt(eyeUserObject.id),
            eyeColorId: parseInt(features.eyeColorId),
            toneId: parseInt(features.toneId)
        }

        
        setShowEyeshadows(true)

        return fetch(`http://localhost:8088/featuresSelections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(featuresToSendToAPI)
        })
        .then(response => response.json())
        .then((newFeatureThatWasCreated) => { 
            updateColorAndFeatureId(newFeatureThatWasCreated.id)
           
        })
    }



    const eyeshadowSaveButtonClick = (event) => {

       event.preventDefault()

       const eyeshadowArray = Array.from(selectedEyeshadows)
        const promiseArray = eyeshadowArray.map((eyeshadowId) => {
            const objectToPost = {
                "eyeshadowEyeColorId": eyeshadowId,
                "featuresSelectionId": colorAndFeatureId
            }
            return fetch(`http://localhost:8088/colorsBasedOnSelections`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objectToPost)
            })
            .then(response => response.json())
        })
            Promise.all(promiseArray)                                           //promise.all allows to send multiple fetch request at the same time                      
            .then((responseArray)=>{
                setShowEyeshadows(false)
                updateFeatures({
                    "eyeColorId": 0,
                    "toneId": 0
                })
            } )



    }






    const eyeshadowSelections = () => {
        
        let html = []
        if (showEyeshadows)
        {
            html.push(<>
                <div>
                    <h2 className="eyeshadow__title">Eyeshadow Colors Made For You</h2>
                </div>
                <div>
                    <h3 className="colors__title"> Pick Out Your Favorite Eyeshadow Colors!</h3>
                </div>
                </>)
            colorCategory.map(category => {
                html.push(<div className = "color_categories"><h4>{category.color}</h4></div>)
                filteredEyeshadows.map(eye => {
                    if (eye.eyeshadowColor.colorCategoryId === category.id)
                    {
                        
                        html.push( <div className = "color_categories"><ul className= "eyeshadow_color"><label htmlFor="eyeshadowColor">
                         
                        <input 
                        type = "checkbox" 
                        key = {`eyeshadowEyeColor--${eye?.id}`}
                        value = {parseInt(eye.id)} 
                       
                            onChange={(event) => {
                                const copy = new Set(selectedEyeshadows)
                                if (copy.has(eye.id)){
                                    copy.delete(eye.id)
                                }
                                else {
                                    copy.add(eye.id)
                                }
                                
                                updateSelectedEyeShadows(copy)
                            }
                            }
                            />
                            
                           <img className = "eyeshadow_img" src={eye?.eyeshadowColor?.image} />
                            {eye.eyeshadowColor?.name}
                            </label></ul>
                           
                             </div>)
                        
                        
                    }   
                        
                else {
                    <div></div>
                }
            }
            )
        }
        )
            html.push(<div><button value = {features.id} id = "btn" onClick = {(clickEvent) => {eyeshadowSaveButtonClick(clickEvent);}} className="btn btn-primary">
                    Submit Eyeshadows
                </button></div>)
    }

        else {
            <div></div>
        }
        
        
        
        return html
    }
        
            
            
    
    
    
    
    return (
        <form className="featuresForm">
            <h2 className="featuresForm__title">Eyeshadow Color Generator</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eyeColor">Eye Color:</label>
                    <select id = "eyeColor" 
                    required autoFocus
                    key = {`eyeColor--${eyeColors.id}`}
                    className="form-control"
                    value={features.eyeColorId}
                    onChange={(event) => {
                            const copy = {...features}
                            copy.eyeColorId = parseInt(event.target.value)
                            updateFeatures(copy)
                        }}>                
                        <option value = "0"> Choose Eye Color</option>        
                        {
                            eyeColors.map(eyeColor => {
                                return <option value = {eyeColor.id} > {eyeColor.color}</option>
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
                        key = {`undertone--${undertones.id}`}
                        value={features.toneId}
                        onChange={(event) => {
                            const copy = {...features}
                            copy.toneId = parseInt(event.target.value)
                            updateFeatures(copy)
                        }
                    }>
                        <option value = "0"> Choose Undertone</option>
                        {
                            undertones.map(undertone => {
                                return <option value = {undertone.id}> {undertone.tone}</option>})
                            }
                        </select>
                        <section className="link--undertone">
                            Need help finding your undertone?   <Link to="/undertone_finder">Click Here!</Link>
                        </section>
                </div>
            </fieldset>
            <button onClick = {(clickEvent) => {handleSaveButtonClick(clickEvent);}} className="btn btn-primary">
                Submit Features
            </button>
            {eyeshadowSelections()}
        </form>
    )
}






























// eyeshadowEyeColor.eyeColorId === eyeColors.id && eyeshadowEyeColor.eyeShadowColorId === eyeshadowColors.id