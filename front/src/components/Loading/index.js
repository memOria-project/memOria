import './Loading.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Loading = ({ showModal = false }) => {
  console.log('loading')
  const modalClass = classNames({

  })
  return (
    <div className={showModal ? 'modal' : ''}>
      <div className="spin"></div>
    </div>
  )
}
export default Loading

Loading.propTypes = {
  showModal: PropTypes.bool
}
