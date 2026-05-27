import { useState } from 'react'
import { createDocument } from '../api/documentApi'
import './CreateDocumentForm.css'

const INITIAL_FIELDS = { title: '', author: '', description: '', content: '', type: '' }
const INITIAL_ERRORS = { title: '', author: '', description: '', content: '', type: '' }

/**
 * @param {{ onSuccess?: (document: object) => void }} props
 */
function CreateDocumentForm({ onSuccess }) {
  const [fields, setFields]       = useState(INITIAL_FIELDS)
  const [fieldErrors, setFieldErrors] = useState(INITIAL_ERRORS)
  const [serverError, setServerError] = useState(null)
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)

  /* ── Изменение поля ───────────────────────────────────────── */
  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // сбрасываем ошибку поля при вводе
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (serverError) setServerError(null)
  }

  /* ── Клиентская валидация ─────────────────────────────────── */
  function validate() {
    const errors = { ...INITIAL_ERRORS }
    let valid = true

    if (!fields.title.trim()) {
      errors.title = 'Название обязательно.'
      valid = false
    } else if (fields.title.trim().length > 255) {
      errors.title = 'Название не должно превышать 255 символов.'
      valid = false
    }

    if (!fields.author.trim()) {
      errors.author = 'Автор обязателен.'
      valid = false
    } else if (fields.author.trim().length > 255) {
      errors.author = 'Имя автора не должно превышать 255 символов.'
      valid = false
    }

    if (fields.description.length > 1000) {
      errors.description = 'Описание не должно превышать 1000 символов.'
      valid = false
    }

    if (fields.type.length > 100) {
      errors.type = 'Тип не должен превышать 100 символов.'
      valid = false
    }

    setFieldErrors(errors)
    return valid
  }

  /* ── Отправка формы ───────────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setServerError(null)

    const payload = {
      title:  fields.title.trim(),
      author: fields.author.trim(),
      ...(fields.description.trim() && { description: fields.description.trim() }),
      ...(fields.content.trim()     && { content: fields.content.trim() }),
      ...(fields.type.trim()        && { type: fields.type.trim() }),
    }

    try {
      const newDocument = await createDocument(payload)
      setFields(INITIAL_FIELDS)
      setSubmitted(true)
      onSuccess?.(newDocument)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Сброс после успешной отправки ───────────────────────── */
  function handleReset() {
    setSubmitted(false)
    setServerError(null)
    setFieldErrors(INITIAL_ERRORS)
  }

  /* ── Успех ────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="cdf cdf--success" role="status">
        <span className="cdf__state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </span>
        <p className="cdf__state-title">Документ создан!</p>
        <p className="cdf__state-text">Вы можете создать ещё один документ.</p>
        <button type="button" className="cdf__btn cdf__btn--primary" onClick={handleReset}>
          Создать ещё
        </button>
      </div>
    )
  }

  /* ── Форма ────────────────────────────────────────────────── */
  return (
    <form className="cdf" onSubmit={handleSubmit} noValidate aria-label="Создание документа">

      {/* Название */}
      <div className={`cdf__field ${fieldErrors.title ? 'cdf__field--invalid' : ''}`}>
        <label className="cdf__label" htmlFor="doc-title">
          Название <span className="cdf__required" aria-hidden="true">*</span>
        </label>
        <input
          id="doc-title"
          className="cdf__input"
          type="text"
          name="title"
          value={fields.title}
          placeholder="Введите название документа"
          maxLength={255}
          autoComplete="off"
          aria-required="true"
          aria-describedby={fieldErrors.title ? 'doc-title-error' : undefined}
          aria-invalid={!!fieldErrors.title}
          onChange={handleChange}
        />
        {fieldErrors.title && (
          <span id="doc-title-error" className="cdf__field-error" role="alert">
            {fieldErrors.title}
          </span>
        )}
      </div>

      {/* Автор */}
      <div className={`cdf__field ${fieldErrors.author ? 'cdf__field--invalid' : ''}`}>
        <label className="cdf__label" htmlFor="doc-author">
          Автор <span className="cdf__required" aria-hidden="true">*</span>
        </label>
        <input
          id="doc-author"
          className="cdf__input"
          type="text"
          name="author"
          value={fields.author}
          placeholder="Введите имя автора"
          maxLength={255}
          autoComplete="off"
          aria-required="true"
          aria-describedby={fieldErrors.author ? 'doc-author-error' : undefined}
          aria-invalid={!!fieldErrors.author}
          onChange={handleChange}
        />
        {fieldErrors.author && (
          <span id="doc-author-error" className="cdf__field-error" role="alert">
            {fieldErrors.author}
          </span>
        )}
      </div>

      {/* Тип */}
      <div className={`cdf__field ${fieldErrors.type ? 'cdf__field--invalid' : ''}`}>
        <label className="cdf__label" htmlFor="doc-type">
          Тип
        </label>
        <input
          id="doc-type"
          className="cdf__input"
          type="text"
          name="type"
          value={fields.type}
          placeholder="Например: Отчёт, Инструкция, Договор…"
          maxLength={100}
          autoComplete="off"
          aria-describedby={fieldErrors.type ? 'doc-type-error' : undefined}
          aria-invalid={!!fieldErrors.type}
          onChange={handleChange}
        />
        {fieldErrors.type && (
          <span id="doc-type-error" className="cdf__field-error" role="alert">
            {fieldErrors.type}
          </span>
        )}
      </div>

      {/* Описание */}
      <div className={`cdf__field ${fieldErrors.description ? 'cdf__field--invalid' : ''}`}>
        <label className="cdf__label" htmlFor="doc-description">
          Описание
        </label>
        <textarea
          id="doc-description"
          className="cdf__textarea"
          name="description"
          value={fields.description}
          placeholder="Краткое описание документа (необязательно)"
          rows={4}
          maxLength={1000}
          aria-describedby={fieldErrors.description ? 'doc-description-error' : undefined}
          aria-invalid={!!fieldErrors.description}
          onChange={handleChange}
        />
        <span className="cdf__counter" aria-live="polite">
          {fields.description.length} / 1000
        </span>
        {fieldErrors.description && (
          <span id="doc-description-error" className="cdf__field-error" role="alert">
            {fieldErrors.description}
          </span>
        )}
      </div>

      {/* Содержимое */}
      <div className={`cdf__field ${fieldErrors.content ? 'cdf__field--invalid' : ''}`}>
        <label className="cdf__label" htmlFor="doc-content">
          Содержимое
        </label>
        <textarea
          id="doc-content"
          className="cdf__textarea cdf__textarea--content"
          name="content"
          value={fields.content}
          placeholder="Введите содержимое документа (необязательно)"
          rows={8}
          aria-describedby={fieldErrors.content ? 'doc-content-error' : undefined}
          aria-invalid={!!fieldErrors.content}
          onChange={handleChange}
        />
        {fieldErrors.content && (
          <span id="doc-content-error" className="cdf__field-error" role="alert">
            {fieldErrors.content}
          </span>
        )}
      </div>

      {/* Серверная ошибка */}
      {serverError && (
        <div className="cdf__server-error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {serverError}
        </div>
      )}

      {/* Действия */}
      <div className="cdf__actions">
        <button
          type="button"
          className="cdf__btn cdf__btn--ghost"
          disabled={submitting}
          onClick={handleReset}
        >
          Сбросить
        </button>
        <button
          type="submit"
          className="cdf__btn cdf__btn--primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting
            ? <><span className="cdf__spinner" aria-hidden="true" /> Создание…</>
            : 'Создать документ'}
        </button>
      </div>

    </form>
  )
}

export default CreateDocumentForm
