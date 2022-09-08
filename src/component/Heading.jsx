import React from 'react';
import { Link} from 'react-router-dom';

//Service
import AuthentificationService from './AuthentificationService.js';

function Heading(props){   

    function handleLogOut() {
      AuthentificationService.logout();
      props.majLog();
    }
 
    return <header><h1>Name here :)</h1>
         <nav>
            <ul>
              {props.isUserLoggedIn && <li><Link to="/">Home</Link></li>}
              {props.isUserLoggedIn && <li><Link to="/notes">Notes</Link></li>}
              {props.isUserLoggedIn && <li><Link to="/pdf">PDF</Link></li>}
              {!props.isUserLoggedIn && <li><Link to="/login">Login</Link></li>}
              {!props.isUserLoggedIn && <li><Link to="/register">Register</Link></li>}
              {props.isUserLoggedIn && <li><Link to="/logout" onClick={handleLogOut}>Logout</Link></li>}
            </ul>
          </nav>
    </header>;
}

export default Heading ;