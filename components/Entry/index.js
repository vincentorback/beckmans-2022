import styles from './entry.module.css'

const Entry = ({ doc }) => {
  return (
    <div className={styles.entry}>
      <p>
        Mitt <strong>examensarbete</strong> är ett
        <em>självutforskande</em> av identitet ur ett posthumanistiskt
        perspektiv. <a href="#/">Resultatet</a> är tre självporträtt där jag
        gestaltar min mångfacetterade identitet i form av en avatar.
      </p>
      <h2>Rubrik 2</h2>
      <p>
        Mitt examensarbete är ett självutforskande av identitet ur ett
        posthumanistiskt perspektiv. Resultatet är tre självporträtt där jag
        gestaltar min mångfacetterade identitet i form av en avatar.
      </p>
      <h3>Rubrik 3</h3>
      <p>
        Mitt examensarbete är ett självutforskande av identitet ur ett
        posthumanistiskt perspektiv. Resultatet är tre självporträtt där jag
        gestaltar min mångfacetterade identitet i form av en avatar.
      </p>
      <ul>
        <li>Lista med saker</li>
        <li>Kan vara vadsom</li>
        <li>helst?</li>
      </ul>
      <h4>Rubrik 4</h4>
      <p>
        Mitt examensarbete är ett självutforskande av identitet ur ett
        posthumanistiskt perspektiv. Resultatet är tre självporträtt där jag
        gestaltar min mångfacetterade identitet i form av en avatar.
      </p>
      <ol>
        <li>Lista med saker</li>
        <li>Kan vara vadsom</li>
        <li>helst?</li>
      </ol>
      <p>
        Mitt examensarbete är ett självutforskande av identitet ur ett
        posthumanistiskt perspektiv. Resultatet är tre självporträtt där jag
        gestaltar min mångfacetterade identitet i form av en avatar.
      </p>
    </div>
  )
}

export default Entry
