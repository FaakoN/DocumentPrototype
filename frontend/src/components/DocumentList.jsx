import DocumentCard from './DocumentCard'
import './DocumentList.css'

function DocumentList({ documents = [], loading = false, error = null, onView }) {

  /* ── Загрузка ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="doc-list doc-list--loading" aria-busy="true" aria-label="Загрузка документов">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="doc-list__skeleton" aria-hidden="true">
            <div className="doc-list__skeleton-icon" />
            <div className="doc-list__skeleton-line doc-list__skeleton-line--title" />
            <div className="doc-list__skeleton-line" />
            <div className="doc-list__skeleton-line doc-list__skeleton-line--short" />
          </div>
        ))}
      </div>
    )
  }

  /* ── Ошибка ───────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="doc-list__state" role="alert">
        <span className="doc-list__state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </span>
        <p className="doc-list__state-title">Не удалось загрузить документы</p>
        <p className="doc-list__state-text">{error}</p>
      </div>
    )
  }

  /* ── Пустой список ────────────────────────────────────────── */
  if (documents.length === 0) {
    return (
      <div className="doc-list__state">
        <span className="doc-list__state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </span>
        <p className="doc-list__state-title">Документов пока нет</p>
        <p className="doc-list__state-text">Создайте первый документ, чтобы он появился здесь.</p>
      </div>
    )
  }

  /* ── Список ───────────────────────────────────────────────── */
  return (
    <ul className="doc-list" aria-label="Список документов">
      {documents.map((doc) => (
        <li key={doc.id} className="doc-list__item">
          <DocumentCard document={doc} onView={onView} />
        </li>
      ))}
    </ul>
  )
}

export default DocumentList
