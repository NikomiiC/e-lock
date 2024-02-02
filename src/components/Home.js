import NavigationBar from "./NavigationBar";
import { Button } from 'react-bootstrap';
//import BackgroundImage from '../media/dfdffr.jpg';
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div>
                <NavigationBar />
            </div>
            {/* manage button */}
            <div className="Body" style={styles.img}>
                <div style={styles.content}>
                    <div className="Btn-Container">
                        <Button variant="dark" style={styles.btn} onClick={()=>navigate("/exercise-management")}>
                            Manage Exercises
                        </Button>
                        <Button variant="dark" style={styles.btn} onClick={()=>navigate("/workout-management")}>
                            Manage Workouts
                        </Button>
                        <Button variant="dark" style={styles.btn} onClick={()=>navigate("/award-management")}>
                            Manage Awards
                        </Button>
                    </div>
                </div>

            </div>

        </>
    );
}

const styles = {
    content: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    btn: {
        height: '150px',
        width: '150px',
        fontSize: '22px',
        fontWeight: 'bold'
    }

}

export default Home;