import { RichText } from 'prismic-reactjs'
import Image from '../../components/Image'
import styles from './slices.module.css'
import { linkResolver } from '../../prismicConfiguration'

const Slices = ({ slices, doc }) => {
  return slices.map((slice, sliceIndex) => {
    switch (slice.slice_type) {
      case 'text':
        if (!slice.primary.text) return null
        return (
          <div className={styles.text} key={sliceIndex}>
            {RichText.render(slice.primary.text, () => linkResolver(doc))}
          </div>
        )
      case 'image':
        if (!slice.primary.image) return null
        return (
          <div className={styles.image} key={sliceIndex}>
            <Image
              src={slice.primary.image.url}
              alt={slice.primary.image.alt}
              width={slice.primary.image.dimensions.width}
              height={slice.primary.image.dimensions.height}
            />
          </div>
        )
      case 'video':
        if (!slice.primary.url) return null
        return (
          <div className={styles.video} key={sliceIndex}>
            <div
              style={{
                paddingBottom: `${
                  (slice.primary.url.height / slice.primary.url.width) * 100
                }%`,
                backgroundImage: `url(${slice.primary.url.thumbnail_url})`,
              }}
              dangerouslySetInnerHTML={{
                __html: slice.primary.url.html,
              }}
            />
          </div>
        )
    }
  })

  // return slices.map((slice, sliceIndex) => {
  //   if (slice.primary.text) {

  //   }

  //   if (slice.items) {
  //     return slice.items.map((item, itemIndex) => {
  //       if (item.image) {
  //         return (
  //           <div className={styles.image} key={itemIndex}>
  //             <Image
  //               src={item.image.url}
  //               alt={item.image.alt}
  //               width={item.image.dimensions.width}
  //               height={item.image.dimensions.height}
  //             />
  //           </div>
  //         )
  //       }

  //       if (item.embed_url) {
  //         return (
  //           <div className={styles.video} key={itemIndex}>
  //             <div
  //               style={{
  //                 paddingBottom: `${
  //                   (item.embed_url.height / item.embed_url.width) * 100
  //                 }%`,
  //                 backgroundImage: `url(${item.embed_url.thumbnail_url})`,
  //               }}
  //               dangerouslySetInnerHTML={{
  //                 __html: item.embed_url.html,
  //               }}
  //             />
  //           </div>
  //         )
  //       }
  //     })
  //   }
  // })
}

export default Slices
