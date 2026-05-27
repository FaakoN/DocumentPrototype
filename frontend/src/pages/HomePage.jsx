import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDocuments } from '../api/documentApi'
import DocumentList from '../components/DocumentList'
import SearchBar from '../components/SearchBar'
import CreateDocumentForm from '../components/CreateDocumentForm'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    getAllDocuments()
      .then((data) => {
        if (!cancelled) setDocuments(data)
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
  }, [])

  function handleDocumentCreated(newDocument) {
    setDocuments((prev) => [newDocument, ...prev])
    setShowForm(false)
  }

  const filtered = query
    ? documents.filter((doc) =>
        (doc.title ?? '').toLowerCase().startsWith(query.toLowerCase()),
      )
    : documents

  return (
    <div className="hp">
      <div className="hp__header">
        <h2 className="hp__title">Документы</h2>
        <button
          className={showForm ? 'hp__btn hp__btn--ghost' : 'hp__btn hp__btn--primary'}
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? 'Отмена' : '+ Создать документ'}
        </button>
      </div>
      {showForm && (
        <CreateDocumentForm onSuccess={handleDocumentCreated} />
      )}
      <SearchBar onSearch={setQuery} />
      <DocumentList documents={filtered} loading={loading} error={error} onView={(id) => navigate(`/documents/${id}`)} />
    </div>
  )
}

export default HomePage
