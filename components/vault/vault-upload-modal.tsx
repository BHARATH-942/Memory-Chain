"use client"

import { X, Upload, FileText } from "lucide-react"
import { useState } from "react"

interface VaultUploadModalProps {
  onClose: () => void
}

export default function VaultUploadModal({ onClose }: VaultUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upload Memory</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={() => setDragActive(false)}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          <Upload className="mx-auto mb-4 text-primary/40" size={40} />
          <p className="font-semibold mb-2">Drag and drop your files here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Select Files
          </button>
        </div>

        {/* File Types */}
        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm font-medium mb-2">Supported formats:</p>
          <div className="flex flex-wrap gap-2">
            {["JPG", "PNG", "MP4", "PDF", "DOC"].map((format) => (
              <span key={format} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                {format}
              </span>
            ))}
          </div>
        </div>

        {/* Encryption Info */}
        <div className="mt-6 p-4 border border-border rounded-lg flex gap-3">
          <FileText className="text-primary flex-shrink-0" size={20} />
          <div className="text-sm">
            <p className="font-medium mb-1">End-to-End Encrypted</p>
            <p className="text-muted-foreground">Your files are encrypted locally before upload</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
