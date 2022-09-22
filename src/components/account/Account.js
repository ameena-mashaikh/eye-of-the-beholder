import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

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


    useEffect(
        () => {
            fetch(`http://localhost:8088/featuresSelections?_expand=eyeColor&_expand=tone&_embed=colorsBasedOnSelections`)
                .then(response => response.json())
                .then((selectionsArray) => {
                    setUserFeature(selectionsArray)
                })
        }, [])



    const handleUpdateButtonClick = (event) => {
        setShowUpdateProfile(true)
        let html = []

        if(setShowUpdateProfile) {
            html.push(<>
            <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={users.fullName}
                        // onChange={
                        //     (evt) => {
                        //         // TODO: Update specialty property
                        //     }
                        // } 
                        />
                </div>
            </fieldset></form>
            </>)
        }
        return html

        


        
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
                        <button 
                            onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                            className="btn btn-primary">
                Update Information
            </button>
                </section> 

                {
                userFeatures.map(features => { 
                    if (features.userId === eyeUserObject.id)
                    {
                        return (
                            <section className = "features_selected_colors">
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
                                        <label htmlFor ="colors"> Saved Colors: </label>
                                        {
                                            features.colorsBasedOnSelections.map((eyeColorShadowId) => {
                                                return eyeshadowEyeColors.map((color) => {
                                                    if (eyeColorShadowId.eyeshadowEyeColorId === color.id) {
                                                        return (<div>{color.eyeshadowColor?.name}</div>)
                                                    }
                                                })
                                            })
                                                
                                                
                                        }
                                </div>
                                </section>
                                <button 
                                    
                                    className="btn btn-primary">
                                Delete Selections
                                </button>
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
        