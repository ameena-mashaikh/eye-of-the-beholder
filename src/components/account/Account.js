import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const Account = () => {

    const [account, updateAccount] = useState([])
    const [featuresAndEyeshadowSelections, setFeaturesAndEyeshadowSelections] = useState([])
    const [users, setUsers] = useState([])


    const [userFeatures, setUserFeature] = useState([])
    const [eyeshadowEyeColor, setEyeshadowEyeColor] = useState([])



    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/eyeshadowEyeColors?_expand=eyeColor&_expand=eyeshadowColor`)
                .then(response => response.json())
                .then((data) => {
                    setEyeshadowEyeColor(data)
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
            fetch(`http://localhost:8088/featuresSelections?_expand=eyeColor&_expand=tone`)
                .then(response => response.json())
                .then((selectionsArray) => {
                    setUserFeature(selectionsArray)
                })
        }, [])




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
                        <button className="btn btn-primary">
                Update Information
            </button>
                </section> 

                {
                userFeatures.map(features => { 
                    if (features.userId === eyeUserObject.id)
                    {
                        return (
                            <section>
                                <div className = "eye_color_feature">
                                    <h4> Facial Features</h4>
                                    <label htmlFor = "eyeColor"> Eye Color: </label>
                                    {features.eyeColor?.color}
                                </div>
                                <div className ="undertone_feature">
                                        <label htmlFor = "tone"> Undertone: </label>
                                        {features.tone?.tone}
                                </div>
                                <div className = "selected_colors">
                                        <h4> Color Selections</h4>
                                        <label htmlFor ="colors"> Colors: </label>
                                        {
                                            featuresAndEyeshadowSelections.map((selection) => {
                                                if (selection.featuresSelectionId === features.id) {
                                                    return (
                                                        <div>

                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                </div>
                                </section>
                            )
                        }
                        
                    

                })
                }




                </article>  
            </>
                
                
           
            <button className="btn btn-primary">
                Delete Features
            </button>
    </>
    )
}
        