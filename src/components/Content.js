import React from 'react'
import Marked from 'react-markdown'

import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import './Content.css'

const encodeMarkdownURIs = source => {
  const markdownLinkRegex = /\[(?:\[[^\]]*\]|[^[\]])*\]\([ \t]*<?((?:\([^)]*\)|[^()])*?)>?[ \t]*(['"].*?\6[ \t]*)?\)/g
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

export default ({ source, className = '' }) => (
  <Marked
    className={`Content ${className}`}
    source={encodeMarkdownURIs(source)}
    renderers={{
      image: ImageWithSrcset,
      html: HtmlBlock,
      link: Link
    }}
  />
)

const ImageWithSrcset = ({ nodeKey, src, alt, ...props }) => {
  const decodedSrc = decodeURI(src)
  return (
    <img
      className='Content--Image'
      {...props}
      src={getImageSrc(decodedSrc)}
      srcSet={getImageSrcset(decodedSrc)}
      alt={alt}
    />
  )
}

const HtmlBlock = ({ value }) => {
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className={`videoWrapper`}
      dangerouslySetInnerHTML={{
        __html: value
      }}
    />
  )
}

const Link = props => {
  let target = props.href.endsWith('.pdf') ? '_blank' : null
  return (
    <a href={props.href} target={target}>
      {props.children}
    </a>
  )
}
