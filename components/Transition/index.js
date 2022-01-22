import React from 'react'
import {
  TransitionGroup as ReactTransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group'

const TIMEOUT = 300

const defaultStyle = {
  transition: `opacity ${TIMEOUT}ms ease`,
  opacity: 0,
}

const transitionStyles = {
  entering: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    opacity: 1,
  },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const Transition = ({ children, location }) => {
  const test = React.useRef(null)

  return (
    <ReactTransitionGroup style={{ position: 'relative' }}>
      <ReactTransition key={location} timeout={TIMEOUT} nodeRef={test}>
        {(status) => (
          <div
            ref={test}
            style={{
              ...defaultStyle,
              ...transitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </ReactTransitionGroup>
  )
}

export default Transition
