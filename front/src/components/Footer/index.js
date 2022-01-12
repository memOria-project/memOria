import { NavLink } from 'react-router-dom'
import './Footer.scss'
import './Footer_Desktop.scss'

const Footer = () => {
  return (
  <footer className="footer">
    <NavLink style={{ padding: '0.5rem 1rem 0.5rem 1rem' }}
to="/team">Team</NavLink>
    <NavLink style={{ padding: '0.5rem 1rem 0.5rem 1rem' }} to="/contact">Contact</NavLink>
    <NavLink style={{ padding: '0.5rem 1rem 0.5rem 1rem' }}to="/rights">Droits</NavLink>
  </footer>
  )
}
export default Footer
