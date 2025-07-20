"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, X, FileVideo } from "lucide-react"

interface MediaUploaderProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedTypes?: string
}

export default function MediaUploader({
  onFilesChange,
  maxFiles = 10,
  acceptedTypes = "image/*,video/*",
}: MediaUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = droppedFiles.filter((file) => {
        if (acceptedTypes.includes("image/*") && file.type.startsWith("image/")) return true
        if (acceptedTypes.includes("video/*") && file.type.startsWith("video/")) return true
        return false
      })

      const newFiles = [...files, ...validFiles].slice(0, maxFiles)
      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, maxFiles, acceptedTypes, onFilesChange],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles)
      setFiles(newFiles)
      onFilesChange(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-400" />
          Загрузка медиа файлов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-600 hover:border-slate-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-slate-400" />
              </div>
            </div>
            <div>
              <p className="text-white font-medium mb-2">Перетащите файлы сюда или нажмите для выбора</p>
              <p className="text-slate-400 text-sm">Поддерживаются: JPG, PNG, MP4, MOV (до {maxFiles} файлов)</p>
            </div>
            <input
              type="file"
              multiple
              accept={acceptedTypes}
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" className="border-slate-600 text-slate-300">
              <label htmlFor="file-upload" className="cursor-pointer">
                Выбрать файлы
              </label>
            </Button>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">
                Загруженные файлы ({files.length}/{maxFiles})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFiles([])
                  onFilesChange([])
                }}
                className="text-slate-400 hover:text-white"
              >
                Очистить все
              </Button>
            </div>
            <div className="grid gap-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex-shrink-0">
                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="h-8 w-8 text-blue-400" />
                    ) : (
                      <FileVideo className="h-8 w-8 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {file.type.startsWith("image/") ? "Изображение" : "Видео"}
                      </Badge>
                      <span className="text-slate-400 text-xs">{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
