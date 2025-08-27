'use client'

import { useState } from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/Heading'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  sources?: string[]
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [customDocuments, setCustomDocuments] = useState<string[]>([
    "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  ])
  const [newDocumentUrl, setNewDocumentUrl] = useState('')
  const [showDocumentInput, setShowDocumentInput] = useState(false)

  const placeholders = [
    "What is Article 21 of the Constitution?",
    "Explain the Preamble of the Constitution",
    "What are the fundamental rights?",
    "Tell me about the Right to Equality",
    "What is the Right to Constitutional Remedies?",
    "Explain the directive principles of state policy",
  ]

  const onChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input changes if needed
  }

  const addDocument = () => {
    const url = newDocumentUrl.trim()
    if (!url) return
    
    // Basic URL validation
    try {
      new URL(url)
    } catch {
      alert('Please enter a valid URL')
      return
    }
    
    if (!customDocuments.includes(url)) {
      setCustomDocuments(prev => [...prev, url])
      setNewDocumentUrl('')
      setShowDocumentInput(false)
    }
  }

  const removeDocument = (url: string) => {
    setCustomDocuments(prev => prev.filter(doc => doc !== url))
  }


  const onSubmit = (value: string) => {
    if (!value.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: value,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Use all custom documents for the query
    const documentsToQuery = customDocuments.length > 0 ? customDocuments[0] : "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions: [value],
        documents: documentsToQuery
      }),
    })
    .then(response => response.json())
    .then(data => {
      const answer = data.answers?.[0] || "I couldn't find an answer to your question."
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: answer,
        isUser: false,
        timestamp: new Date(),
        sources: customDocuments
      }
      setMessages(prev => [...prev, aiMessage])
    })
    .catch(() => {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while processing your question. Please try again.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 flex">
            <h1 className="text-lg lg:text-xl font-black mx-6 quantico-regular">Constitution AI Assistant</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDocumentInput(!showDocumentInput)}
          >
            📄 Manage Documents ({customDocuments.length})
          </Button>
        </div>
      </div>

      {/* Document Management Panel */}
      {showDocumentInput && (
        <div className="border-b border-border/40 bg-muted/30 p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="document-url" className="text-sm font-medium">
                Add Document URL:
              </Label>
              <Input
                id="document-url"
                type="url"
                placeholder="https://example.com/document.pdf"
                value={newDocumentUrl}
                onChange={(e) => setNewDocumentUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addDocument} size="sm">
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Current Documents:</Label>
              <div className="space-y-2">
                {customDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-background rounded-md p-2 border">
                    <span className="text-sm truncate flex-1 mr-2">
                      {doc.length > 60 ? `${doc.substring(0, 60)}...` : doc}
                    </span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeDocument(doc)}
                      disabled={customDocuments.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="mb-8">
                  {/* <h2 className="text-2xl font-bold mb-2">Welcome to Constitution AI</h2> */}
                  <Heading title='Welcome to Constitution AI' />
                  <p className=" mt-4 text-gray-500">
                    Ask me anything about the Indian Constitution. I can help you understand articles, 
                    fundamental rights, directive principles, and more.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <Card key={message.id} className={`p-4 ${message.isUser ? 'ml-12 bg-primary text-primary-foreground' : 'mr-12'}`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.isUser ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.isUser ? 'U' : 'AI'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-border/20">
                          <p className="text-xs text-muted-foreground mb-1">Sources used:</p>
                          <div className="space-y-1">
                            {message.sources.map((source, index) => (
                              <div key={index} className="text-xs text-blue-600 dark:text-blue-400 truncate">
                                📄 {source.length > 50 ? `${source.substring(0, 50)}...` : source}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
            
            {isLoading && (
              <Card className="mr-12 p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-muted text-muted-foreground">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
          <div className="max-w-3xl mx-auto">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
