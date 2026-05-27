import { useEffect, useState } from 'react'
import { getAllDocuments } from '../api/documentApi'
import DocumentList from '../components/DocumentList'
import SearchBar from '../components/SearchBar'
import CreateDocumentForm from '../components/CreateDocumentForm'

function HomePage() {
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
        (doc.title ?? '').toLowerCase().includes(query.toLowerCase()),
      )
    : documents

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Отмена' : '+ Создать документ'}
        </button>
      </div>
      {showForm && (
        <CreateDocumentForm onSuccess={handleDocumentCreated} />
      )}
      <SearchBar onSearch={setQuery} />
      <DocumentList documents={filtered} loading={loading} error={error} />
    </div>
  )
}

export default HomePage
