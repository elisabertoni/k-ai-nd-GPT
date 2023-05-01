import Chat from './Chat'

function App() {

  return (
    <>
    <div className="container is-fullheight">
      <div className="columns">
        <div className="column pb-6">
        </div>
        <div className="column is-half">
          <h1 className="has-text-centered is-size-1 mt-4">
            Welcome to K-ai-ndGPT
          </h1>
          <h2 className="has-text-centered is-size-6 mb-6">
            Kind Gestures Powered by Tech
          </h2>
          <Chat />
        </div>
        <div className="column is-flex is-horizontal-center is-vcentered">
          <img className="image is-vcentered"  src="./bmo-gif.gif" alt="bmo pic" />
        </div>
      </div>
      <div>
        <footer className="has-text-centered mt-6">
          <div>&copy; BMO 2023</div>
          <div>
            Full Disclaimer: This website does not provide medical advice.
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}

export default App
