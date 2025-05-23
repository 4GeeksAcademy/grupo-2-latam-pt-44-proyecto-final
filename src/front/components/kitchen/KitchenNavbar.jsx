import { Link } from "react-router-dom"
import { LogOut, Bell } from "lucide-react"
import useGlobalReducer from "../../hooks/useGlobalReducer"


function KitchenNavbar() {
    const {store, dispatch} = useGlobalReducer()
    
      function handleLogout() {
        dispatch({type: "logout"})
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#0b2139" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" style={{ color: " #a9b9c9" }} to="/kitchen">
                    <i class="fa-solid fa-house-user"></i> Dashboard de Cocina
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#kitchenNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="kitchenNavbar">
                    <ul className="navbar-nav me-auto ms-5">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/kitchen">
                                <i class="fa-solid fa-kitchen-set"></i> Órdenes
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-light position-relative me-3">
                            <Bell size={18} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                3<span className="visually-hidden">notificaciones no leídas</span>
                            </span>
                        </button>

                        <div className="text-light me-3 d-none d-md-block">
                            <div>Cocinero: Juan Pérez</div>
                            <div className="small text-muted">Turno: 8:00 - 16:00</div>
                        </div>

                        <button className="btn btn-outline-light d-flex align-items-center">
                            <LogOut size={18} className="me-1" />
                            {store.isAuthenticated &&  <span className="d-none d-md-inline" onClick={handleLogout}>Cerrar Sesión</span>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default KitchenNavbar
