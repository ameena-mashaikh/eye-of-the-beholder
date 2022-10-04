import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Account.css"


export const Account = () => {

    const [profile, updateProfile] = useState({
        fullName: "",
        email: ""        
    })
    const [users, setUsers] = useState({
        fullName: "",
        email: ""        
    })
    const [showUpdateProfile, setShowUpdateProfile] = useState(false)
    
    
    const [featuresAndEyeshadowSelections, setFeaturesAndEyeshadowSelections] = useState([])
    const [userFeatures, setUserFeature] = useState([])
    const [eyeshadowEyeColors, setEyeshadowEyeColors] = useState([])
    const [filteredEyeshadows, setFilteredEyeshadows] = useState([])
    
    const [eyeShapeFeature, setEyeShapeFeature] = useState([])
    const [eyeShapeEyeliner, setEyeShapeEyeliner] = useState([])

    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/eyeshadowEyeColors?_expand=eyeColor&_expand=eyeshadowColor`)
                .then(response => response.json())
                .then((data) => {
                    setEyeshadowEyeColors(data)
                })
            }, []
        
        )


    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${eyeUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const userObj = data[0]
                    setUsers(userObj)
                })
            }, []
        )

    useEffect(
        () => {
            fetch(`http://localhost:8088/colorsBasedOnSelections?_expand=featuresSelection&_expand=eyeshadowEyeColor`)
                .then(response => response.json())
                .then((selectionsArray) => {
                    setFeaturesAndEyeshadowSelections(selectionsArray)
                })

        }, [])

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/eyeShapeFeatures?_expand=eyeShape&_embed=eyelinerBasedOnSelections`)
    //             .then(response => response.json())
    //             .then((eyelinerSelectionsArray) => {
    //                 setEyeShapeEyeliner(eyelinerSelectionsArray)
    //             })

    //     }, [])

        useEffect(
            () => {
                fetch(`http://localhost:8088/eyelinerEyeShapes?_expand=eyeShape&_expand=eyelinerStyle`)
                    .then(response => response.json())
                    .then((eyelinerEyeShapeSelectionsArray) => {
                        setEyeShapeEyeliner(eyelinerEyeShapeSelectionsArray)
                    })
    
            }, [])


//& Get all of the Features

        const getAllFeaturesColors = () => {
            fetch(`http://localhost:8088/featuresSelections?_expand=eyeColor&_expand=tone&_embed=colorsBasedOnSelections`)
                .then(response => response.json())
                .then((selectionsArray) => {
                    setUserFeature(selectionsArray)
                })
        }


        useEffect(
            () => 
                getAllFeaturesColors()
            
            , [])


        const getAllEyeShapeLiners = () => {
            fetch(`http://localhost:8088/eyeShapeFeatures?_expand=eyeShape&_embed=eyelinerBasedOnSelections`)
                .then(response => response.json())
                .then((selectionsArray) => {
                    setEyeShapeFeature(selectionsArray)
                })
        }

        useEffect(
            () => 
                getAllEyeShapeLiners()
               
            , [])



    const deleteButton = (id) => {
        return <button onClick={() => {
        fetch(`http://localhost:8088/featuresSelections/${id}`, {
            method: "DELETE",
            header: {
                "Content-Type": 'application/json'
            }
        })
        .then(getAllFeaturesColors)

        }} 
        className = "featuresDelete"> Delete Color Profile</button>
    }



    const deleteEyelinerButton = (id) => {
        return <button onClick={() => {
        fetch(`http://localhost:8088/eyeShapeFeatures/${id}`, {
            method: "DELETE",
            header: {
                "Content-Type": 'application/json'
            }
        })
        .then(getAllEyeShapeLiners)

        }} 
        className = "eyelinerDelete"> Delete Eyeliner Profile</button>
    }
        




    return (     
        <>
            <h2 className="accountForm__title">Account Information</h2> 
            <>
                <article className = "featuresAndColors">
                    <section className = "user_info">
                        <div className="user_name_email">
                            <h3>User Details</h3>
                            <label htmlFor="name"> Name: </label>
                            {users.fullName}
                        </div>
                        <div>
                            <label htmlFor= "email"> Email: </label>
                            {users.email}
                        </div>
                </section> 

                {
                userFeatures.map(features => { 
                    if (features.userId === eyeUserObject.id)
                    {
                        return (
                            <section className = "features_colors">
                                <section className = "features_selected">
                                <div className = "eye_color_feature">
                                    <h4> Facial Features</h4>
                                    <label htmlFor = "eyeColor"> Your Eye Color: </label>
                                    {features.eyeColor?.color}
                                </div>
                                <div className ="undertone_feature">
                                        <label htmlFor = "tone"> Your Undertone: </label>
                                        {features.tone?.tone}
                                </div>
                                </section>
                                <section className = "colors_selected">
                                <div className = "selected_colors">
                                        <h4> Color Selections</h4>
                                       
                                        {
                                            features.colorsBasedOnSelections.map((eyeColorShadowId) => {
                                                return eyeshadowEyeColors.map((color) => {
                                                    if (eyeColorShadowId.eyeshadowEyeColorId === color.id) {
                                                        return (<div>{color.eyeshadowColor?.name}
                                                        </div>)
                                                    }
                                                })
                                            })
                                                
                                                
                                        }
                                </div>
                                        </section>
                                                        {deleteButton(features.id)}
                                        </section>
                            )
                        }
                        
                    

                })
                }
                </article>
            </>
            <>
                
                    {
                        eyeShapeFeature.map((selected) => {
                            if (selected.userId === eyeUserObject.id) 
                            {
                                return (
                                    <div className = "eyeliner_eyeShape" >
                                        <div className = "eyeShape"> 
                                            <h4 className = "eyeliner_selections"> Eye Shape</h4>
                                            <label htmlFor = "eyeShape"> Your Eye Shape: </label>
                                            {selected.eyeShape?.shape}
                                        </div>

                                        <div className = "eyeliner_style"> 
                                            <h4 className = "eyeliner"> Eyeliner Styles</h4>
                                            {
                                                selected.eyelinerBasedOnSelections.map((selectedEyeliner) => {
                                                    return eyeShapeEyeliner.map((eyeliner) => {
                                                        if(selectedEyeliner.eyelinerStyleId === eyeliner.id) {
                                                            return (<div>{eyeliner.eyelinerStyle?.style}
                                                                </div>)
                                                        }
                                                    })
                                                })
                                            }
                                        </div>
                                        
                                            {deleteEyelinerButton(selected.id)}
                                       
                                        </div>
                                    )
                            }
                        })
                    }
                
            </>    
                
           
            
    </>
    )
}
        