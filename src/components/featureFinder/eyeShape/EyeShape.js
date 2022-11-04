import "./eyeShape.css"
import { Link } from "react-router-dom"

export const EyeShape = () => {
    return (
        <center>
        <div className="eyeshape">
            <h2 className="eyeshape__title">Eye Shape Finder</h2>
                <h3>Find Your Eye Shape!</h3>
                <h3>Eye Shapes</h3>
                <div>Eyes come in a variety of shapes. Knowing your eye shape helps determine what styles of eye makeup suit you best! Match your eye shape to the examples below!</div>
                <div className = "all_shapes"> 
                    <section className = "shape__almond">
                        <h3 className="shape"> Almond Eyes </h3>
                        <ul>
                            <li>
                                 Almond eyes resemble the shape of an almond, hence the name
                            </li>
                            <li>
                                This eye shape is perfectly symmetrical with slightly upswept outer corners!
                            </li>

                        </ul>
                        <img className= "image" src={require("./eyeShapeImg/almond.jpeg")} />
                    </section>
                    <section className = "shape__round">
                            <h3 className="shape"> Round Eyes </h3>
                            <ul>
                                <li>
                                   Round eyes are larger and rounder than almond eyes  
                                </li>
                                <li>
                                    The outer edge of the eye is more circular instead of tapered
                                </li>
                            </ul>
                            <img className= "image" src={require("./eyeShapeImg/round.jpeg")} />
                        </section>
                        <section className = "shape__upturned">
                            <h3 className="shape"> Upturned Eyes </h3>
                            <ul>
                                <li>
                                    Upturned eyes have a natural lift that curves upwards toward the outer edge of the eye
                                </li>
                                <li>
                                    Eye lids are a lot more visible
                                </li>
                            </ul>
                            <img className= "image" src={require("./eyeShapeImg/upturned.jpeg")} />
                        </section>
                        <section className = "shape__downturned">
                            <h3 className="shape"> Downturned Eyes </h3>
                            <ul>
                                <li>
                                    Downturned eyes tend to curve in the opposite direction of the Upturned eyes
                                </li>
                                <li>
                                    Eyes appear to be more droopy
                                </li>
                            </ul>
                            <img className= "image" src={require("./eyeShapeImg/downturned.jpeg")} />
                        </section>
                        <section className = "shape__monolid">
                            <h3 className="shape"> Monolid Eyes </h3>
                            <ul>
                                <li>
                                    Monolids are flat and have little to no crease at all for the eyelid
                                </li>
                            </ul>
                            <img className = "monolidImg" src={require("./eyeShapeImg/monolid.jpeg")} />
                        </section>
                        <section className = "shape__hooded">
                            <h3 className="shape"> Hooded Eyes </h3>
                            <ul>
                                <li>
                                    Hooded eyes have a less visible lid and their natural crease has a hidden appearance
                                </li>
                            </ul>
                            <img className= "image" src={require("./eyeShapeImg/hooded.jpeg")} />
                        </section>

                        <div className= "eyeshadow__link">  <center> Curious about which eyeline style suits you best?  <Link to="/eyeliner_generator">Click Here!</Link> </center></div>
                </div>
        </div></center>
    )
}