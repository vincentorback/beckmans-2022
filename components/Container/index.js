const Container = ({ ref, children }) => {
  return (
    <div ref={ref} className="Container">
      {children}
    </div>
  )
}

export default Container
