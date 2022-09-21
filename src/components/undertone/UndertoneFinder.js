import "./UndertoneFinder.css"



export const UndertoneFinder = () => {
    return (
        <section className="undertoneFinder">
            <h2 className="undertoneFinder__title">Undertone Finder</h2>
            <div> Find Your Undertone!</div>
            <img src={require('./undertonespng.png')} />
            <section className = "undertone__descriptions">
                <article className = "warmUndertone__description">
                    {/* <h3>Warm Undertone</h3> */}
                    <div></div>
                </article>
            </section>
        </section>
    )
}