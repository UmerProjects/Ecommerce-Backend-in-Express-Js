import admin from "./adminRoutes.js"
import auth from "./auth.js"
import manager from "./managerRoutes.js"
import salesMan from "./salesmanRoutes.js"
import user from "./userRoutes.js"

const Router = (server) => {
    server.get('/', (req, res) => {
        res.send("This is good")
    })

    server.use('/auth', auth)
    server.use("/admin", admin)
    server.use('/manager', manager)

    server.use('/salesman', salesMan)
    server.use('/user', user)
}


export default Router