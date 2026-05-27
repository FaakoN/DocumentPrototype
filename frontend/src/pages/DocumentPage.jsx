import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDocumentById } from '../api/documentApi'
import './DocumentPage.css'

function DocumentPage() {
  const { id } = useParams()
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    getDocumentById(id)
      .then((data) => {
        if (!cancelled) setDocument(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="doc-page">
        <p className="doc-page__status">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="doc-page">
        <p className="doc-page__error">{error}</p>
        <Link to="/" className="doc-page__back">Back</Link>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="doc-page">
        <p className="doc-page__error">Document not found.</p>
        <Link to="/" className="doc-page__back">Back</Link>
      </div>
    )
  }

  const { title, description, createdAt, updatedAt, type } = document

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="doc-page">
      <Link to="/" className="doc-page__back">&larr; Back</Link>

      <article className="doc-page__card">
        <div className="doc-page__header">
          <span className="doc-card__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </span>

          <h1 className="doc-page__title">{title}</h1>

          {type && <span className="doc-card__badge">{type}</span>}
        </div>

        {description && (
          <p className="doc-page__description">{description}</p>
        )}

        <div className="doc-page__meta">
          {createdAt && (
            <span className="doc-page__meta-item">
              Created: {formatDate(createdAt)}
            </span>
          )}
          {updatedAt && (
            <span className="doc-page__meta-item">
              Updated: {formatDate(updatedAt)}
            </span>
          )}
        </div>
      </article>
    </div>
  )
}

export default DocumentPage
