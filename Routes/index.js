import admin from "./adminRoutes.js"
import auth from "./auth.js"

const Router = (server) => {
    server.get('/', (req, res) => {
        res.send("This is good")
    })

    server.use('/auth', auth)
    server.use("/admin", admin)
}


export default Router