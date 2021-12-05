import DOMPurify from 'dompurify'

export const clean = (dirty) => {
  const cleant = DOMPurify.sanitize(dirty)
  console.log(cleant)
  return cleant
}
export const cleanObject = (object = ({ login: 'login', password: 'password <script></script>' })) => {
  const cleantObject = Object.entries(object).map(([key, value]) => {
    const cleantValue = clean(value)
    console.log(cleantValue)
    return [key, cleantValue]
  }).reduce((previousValue, currentValue) => ({ [previousValue[0]]: previousValue[1], [currentValue[0]]: currentValue[1] }))

  return cleantObject
}
