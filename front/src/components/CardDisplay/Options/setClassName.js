
import classNames from 'classnames'
const setClassName = (isActive, className = 'information-alt', classNameActive = 'information') => {
  const myClassName = classNames({
    [classNameActive]: isActive,
    [className]: !isActive
  })
  return myClassName
}

export default setClassName
