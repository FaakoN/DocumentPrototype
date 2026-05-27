import './DocumentCard.css'

/**
 * @param {{ document: {
 *   id: number | string,
 *   title: string,
 *   description?: string,
 *   createdAt?: string,
 *   updatedAt?: string,
 *   type?: string,
 * }, onView?: (id: number | string) => void }} props
 */
function DocumentCard({ document, onView }) {
  const { id, title, description, createdAt, updatedAt, type } = document

  const dateLabel = updatedAt ?? createdAt
  const formattedDate = dateLabel
    ? new Date(dateLabel).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <article className="doc-card" aria-label={`Документ: ${title}`}>
      <div className="doc-card__header">
        {/* Иконка документа */}
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

        {type && <span className="doc-card__badge">{type}</span>}
      </div>

      <div className="doc-card__body">
        <h3 className="doc-card__title" title={title}>
          {title}
        </h3>

        {description && (
          <p className="doc-card__description">{description}</p>
        )}
      </div>

      <div className="doc-card__footer">
        {formattedDate && (
          <time
            className="doc-card__date"
            dateTime={dateLabel}
            title={updatedAt ? 'Обновлён' : 'Создан'}
          >
            {updatedAt ? '✎ ' : ''}
            {formattedDate}
          </time>
        )}

        {onView && (
          <button
            type="button"
            className="doc-card__btn"
            onClick={() => onView(id)}
            aria-label={`Открыть документ «${title}»`}
          >
            Открыть
          </button>
        )}
      </div>
    </article>
  )
}

export default DocumentCard
