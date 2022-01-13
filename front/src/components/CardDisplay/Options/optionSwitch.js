import { PICK_ORDER, PICK_NEW_GAME } from '../../../actions'

const optionSwitch = (userChoice, dispatch) => {
  switch (userChoice) {
    case 'recto': {
      break
    }
    case 'allCards': {
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })

      break
    }
    case 'NOT_MASTERED': {
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'NOT_MASTERED' })
      break
    }
    case 'RANDOM': {
      dispatch({ type: PICK_ORDER, value: 'RANDOM' })
      break
    }

    case 'REVERSE_CHRONO': {
      dispatch({ type: PICK_ORDER, value: 'REVERSE_CHRONO' })
      break
    }

    case 'CHRONO': {
      dispatch({ type: PICK_ORDER, value: '' })
      break
    }

    default: {
      console.log('no valid button selected')
    }
  }
}

export default optionSwitch
