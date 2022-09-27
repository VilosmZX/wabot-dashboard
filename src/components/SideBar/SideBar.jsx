import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <NavLink
                        end
                        to='/'
                        role={'button'}
                        className={({isActive}) => (isActive ? `${styles.button} ${styles.active}` : styles.button)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='groups'
                        role={'button'}
                        className={({isActive}) => (isActive ? `${styles.button} ${styles.active}` : styles.button)}
                    >
                        Groups
                    </NavLink>
                    <NavLink
                        to='send'
                        role={'button'}
                        className={({isActive}) => (isActive ? `${styles.button} ${styles.active}` : styles.button)}
                    >
                        Send 
                    </NavLink>
                    <NavLink
                        to='autoreply'
                        role={'button'}
                        className={({isActive}) => (isActive ? `${styles.button} ${styles.active}` : styles.button)}
                    >
                        Auto Reply
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default SideBar;