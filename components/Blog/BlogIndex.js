'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Meta = ({ post }) => (
  <div className='idx-meta'>
    <span className='topic'>{post.frontmatter.topic}</span>
    <span>{post.frontmatter.date}</span>
    <span>{post.read} min read</span>
  </div>
)

export default function BlogIndex({ posts }) {
  const topics = ['All', ...Array.from(new Set(posts.map(p => p.frontmatter.topic)))]
  const [topic, setTopic] = useState('All')

  const [featured, ...rest] = posts
  const shown = rest.filter(p => topic === 'All' || p.frontmatter.topic === topic)

  return (
    <div className='idx-b'>
      <div className='head--filters'>
        <div className='filters'>
          {topics.map(t => (
            <button
              key={t}
              className='chip'
              data-on={topic === t}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className='rule' />

      {featured && (
        <Link className='feature' href={`/blogs/${featured.slug}`}>
          <span className='feature__tag'>Featured</span>
          <div className='fimg'>
            <img src={featured.frontmatter.cover_image} alt={featured.frontmatter.title} />
          </div>
          <div className='fbody'>
            <Meta post={featured} />
            <h2>{featured.frontmatter.title}</h2>
            <p className='dek'>{featured.frontmatter.description}</p>
            <span className='more'>
              Read the story <ArrowRight />
            </span>
          </div>
        </Link>
      )}

      <div className='grid'>
        {shown.map(p => (
          <Link className='card' key={p.slug} href={`/blogs/${p.slug}`}>
            <div className='cimg'>
              <img src={p.frontmatter.cover_image} alt={p.frontmatter.title} loading='lazy' />
              <span className='ctopic'>{p.frontmatter.topic}</span>
            </div>
            <div className='cbody'>
              <h3>{p.frontmatter.title}</h3>
              <p className='cdek'>{p.frontmatter.description}</p>
              <div className='cfoot'>
                <span>
                  {p.frontmatter.date} · {p.read} min
                </span>
                <span className='arr'>
                  <ArrowRight />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
