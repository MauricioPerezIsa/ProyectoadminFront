import styles from "../styles/gridLoyout.module.css"
import FooterCustom from "./FooterCustom"
import NavBarCustom from "./NavBarCustom"
import SideBarLateral from "./SideBarLateral"


function GridLoyout({ props_content, destroyJwt }) {

    const userName = "Nombre User"

    return (
        <div className={styles["grid-container"]}>
            <div className={styles["navbar-grid"]}>
                <NavBarCustom name_user={userName} destroyJwt={destroyJwt} />
            </div>
            <div className={styles["container-center"]}>
                <div className={styles["sidebar-grid"]}>
                    <SideBarLateral />
                </div>

                <div className={styles["content-grid"]}>
                    {props_content}
                </div>
            </div>

            <div className={styles["footer-grid"]}>
                <FooterCustom />
            </div>
        </div>
    )
}

export default GridLoyout