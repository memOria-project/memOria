import DOMPurify from 'dompurify'

export const clean = (dirty) => {
  const cleant = DOMPurify.sanitize(dirty)
  console.log(cleant)
  return cleant
}
export const cleanObject = (object = ({ login: 'login', password: 'password <script></script>' })) => {
  const mappedObject = Object.entries(object).map(([key, value]) => {
    const cleantValue = clean(value)
    console.log(cleantValue)
    return [key, cleantValue]
  })

  const cleantObject = mappedObject.reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue[0]]: currentValue[1] }), { [mappedObject[0][0]]: mappedObject[0][1] })
  return cleantObject
}
