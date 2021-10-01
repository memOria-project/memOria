import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom'





// if user is disconnected, redirect to the login page
const DisconnectedRedirect = () => {
  const currentURL = useLocation();
  console.log("currentURL", currentURL)


  const userIsConnected = useSelector(state => state.user.isConnected);
  console.log("userIsConnected", userIsConnected)


  //Checks if user is connected, redirect to /signin if not
  if(userIsConnected) {
    return ( <Redirect from={`${currentURL}`} to="/signin"  />)
  } else {
    return null
  }
    
}

export default DisconnectedRedirect;