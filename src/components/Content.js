import React from 'react'
import Marked from 'react-markdown'

import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import './Content.css'

export default ({ source, className = '' }) => (
  <Marked
    className={`Content ${className}`}
    source={source}
    renderers={{
      Image: ImageWithSrcset,
      HtmlBlock: HtmlBlock
    }}
  />
)

const ImageWithSrcset = ({ nodeKey, src, alt, ...props }) => (
  <img
    className='Content--Image'
    {...props}
    src={getImageSrc(src)}
    srcSet={getImageSrcset(src)}
    alt={alt}
  />
)

const HtmlBlock = ({ literal }) => (
  <div
    className={literal.indexOf('iframe') ? `videoWrapper` : ``}
    dangerouslySetInnerHTML={{
      __html: literal
    }}
  />
)
