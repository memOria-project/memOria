
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { CHECK_TOKEN } from '../../actions';

const CheckSession = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({ type:CHECK_TOKEN })
    })

    return <p style={{visibility:"hidden"}}>token verifiée</p>
}
export default CheckSession
