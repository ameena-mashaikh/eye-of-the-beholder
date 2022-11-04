import { click } from "@testing-library/user-event/dist/click"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Eyeliner.css"

export const Eyeliner = () => {
    const [eyeShapes, setEyeShapes] = useState([])

    const [eyelinerStyles, setEyelinerStyles] = useState([])

    const [eyelinerEyeShape, setEyelinerEyeShape] = useState([])

    const [filteredEyeliner, setFilteredEyeliner] = useState([])

    const [showEyeliner, setShowEyeliner] = useState(false)
    
    const [selectedEyeliners, updateSelectedEyeliners] = useState(new Set())

    const [linerAndShapeId, updateLinerAndShapeId] = useState(0)

    const [eyeShapeFeatures, updateEyeShapeFeatures] = useState({
        "eyeShapeId": 0
    })

    const [eyeShapeFeaturesData, updateEyeShapeFeaturesData] = useState([])

    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)

    useEffect(() => {
        fetch(`http://localhost:8088/eyelinerEyeShapes?_expand=eyeShape&_expand=eyelinerStyle`)
        .then(response => response.json())
        .then((eyelinerArray) => {
            setEyelinerEyeShape(eyelinerArray)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/eyeShapes`)
        .then(response => response.json())
        .then((eyeShapeArray) => {
            setEyeShapes(eyeShapeArray)
        })
    }, [])


    
    useEffect(
        () => {
            fetch(`http://localhost:8088/eyeShapeFeatures`)
            .then(response => response.json())
            .then((featuresArray) => {
                updateEyeShapeFeaturesData(featuresArray)
            })
        }, [updateEyeShapeFeatures]
        )




    useEffect(() => {

        const eyelinerMatch = eyelinerEyeShape.filter(eyeliner => {
                    return ((eyeShapeFeatures.eyeShapeId === eyeliner.eyeShapeId))
            })
            setFilteredEyeliner(eyelinerMatch)
        }, [eyeShapeFeatures])   


 


    const handleSaveButtonClick = (event) => {

        event.preventDefault()
        
        const featuresToSendToAPI = {
            userId: parseInt(eyeUserObject.id),
            eyeShapeId: parseInt(eyeShapeFeatures.eyeShapeId)
        }

        
        setShowEyeliner(true)

        return fetch(`http://localhost:8088/eyeShapeFeatures`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(featuresToSendToAPI)
        })
        .then(response => response.json())
        .then((newFeatureThatWasCreated) => { 
            updateLinerAndShapeId(newFeatureThatWasCreated.id)
            
        })
    }



        const eyelinerSaveButtonClick = (event) => {

     
            const eyelinerArray = Array.from(selectedEyeliners)
             const promiseArray = eyelinerArray.map((eyelinerId) => {
                 const objectToPost = {
                     "eyeShapeFeatureId": linerAndShapeId,
                     "eyelinerStyleId": eyelinerId
                 }
                 return fetch(`http://localhost:8088/eyelinerBasedOnSelections`, {
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
                     setShowEyeliner(false)
                     updateEyeShapeFeatures({
                         "eyeShapeFeatureId": 0,
                         
                     })
                 } )
     
     
     
         }








    const eyelinerSelections = ()  => {
        let html = []
        if (showEyeliner) {
            filteredEyeliner.map(liner => {
                html.push(<div className = "eyeliner_styles"><ul className= "eyeliner_list">
                    <label htmlFor="eyeliner">
                    
                    <input
                    className = "eyelinerStyles" 
                    type = "checkbox" 
                    key = {`eyeliner--${liner.id}`}
                    value = {parseInt(liner.id)} 
                
                        onChange={(event) => {
                            const copy = new Set(selectedEyeliners)
                            if (copy.has(liner.eyelinerStyle?.id)){
                                copy.delete(liner.eyelinerStyle?.id)
                            }
                            else {
                                copy.add(liner.eyelinerStyle?.id)
                            }
                            
                            updateSelectedEyeliners(copy)
                        }
                        }
                        />
                        
                        {liner.eyelinerStyle?.style}
                    <img className = "eyeliner_img" src={liner.eyelinerStyle?.image} />
                        </label></ul>
                    
                        </div>
                        
                        )
                
                    }
                    )
                    html.push(<div><center><button value = {eyeShapeFeatures.id} id = "btn" onClick = {(clickEvent) => {eyelinerSaveButtonClick(clickEvent);}} className="btn eyelinerSave">
                Submit Eyeliner Styles
                </button></center></div>)
                }
               
                    
            else {
                <div></div>
            }
        return html
        }
        

    return (
        <form className="eyeShapeFeaturesForm">

            <center><h2 className="eyeShapeFeaturesForm__title">Eyeliner Generator</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eyeShape">Eye Shape:</label>
                    <select id = "eyeShape" 
                    required autoFocus
                    key = {`eyeShape--${eyeShapes.id}`}
                    className="form-control"
                    value={eyeShapeFeatures.eyeShapeId}
                    onChange={(event) => {
                            const copy = {...eyeShapeFeatures}
                            copy.eyeShapeId = parseInt(event.target.value)
                            updateEyeShapeFeatures(copy)
                        }}>                
                        <option value = "0"> Choose your Eye Shape</option>        
                        {
                            eyeShapes.map(eyeShape => {
                                return <option value = {eyeShape.id} > {eyeShape.shape}</option>
                            })
                        }
                        </select>
                </div>
                </fieldset></center>
                <center><button onClick = {(clickEvent) => {handleSaveButtonClick(clickEvent)}} className="btn btn-eyeShape">
                Submit Eye Shape
            </button></center>
            {eyelinerSelections()}
                </form>
    )
}