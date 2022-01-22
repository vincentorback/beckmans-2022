import styles from './person.module.css'

const Person = ({ data }) => {
  return (
    <div className={styles.person}>
      <h1>{data.name}</h1>
      <p>{data.category}</p>
      <p>{data.title}</p>
      <div>{data.body}</div>
      {data.links ? (
        <div>{data.links.map((link, index) => <a href={link.href} key={index}>{link.label}</a>)}</div>
      ) : null}
      <figure>
        <img src={data.image} alt="" />
      </figure>
      {/* <figure>{data.images.map(image => <img src={image} />)}</figure> */}
    </div>
  )
}

export default Person
