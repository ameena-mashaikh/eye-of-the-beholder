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




    const deleteButton = (id) => {
        return <button onClick={() => {
            //     selections.map((selection) => {
            //     fetch(`http://localhost:8088/colorsBasedOnSelections/${selection.id}`, {
            //     method: "DELETE",
            // })
            
        
            //     .then(() => { 
                    
            //         navigate("/eyeshadow_generator")
                
            //     })
            
        
        fetch(`http://localhost:8088/featuresSelections/${id}`, {
            method: "DELETE",
            header: {
                "Content-Type": 'application/json'
            }
        })
        .then(getAllFeaturesColors)

        }} 
        className = "featuresDelete"> Delete Colors</button>
    }
        




    return (     
        <>
            <h2 className="accountForm__title">Account Information</h2> 
            <>
                <article>
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
                        {/* <button 
                            // onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                            className="btn btn-primary">
                Update Information
            </button> */}
                </section> 

                {
                userFeatures.map(features => { 
                    if (features.userId === eyeUserObject.id)
                    {
                        return (
                            <section className = "features-colors">
                                <section className = "features_selected">
                                <div className = "eye_color_feature">
                                    <h4> Facial Features</h4>
                                    <label htmlFor = "eyeColor"> Eye Color: </label>
                                    {features.eyeColor?.color}
                                </div>
                                <div className ="undertone_feature">
                                        <label htmlFor = "tone"> Undertone: </label>
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
                
                
           
            
    </>
    )
}
        