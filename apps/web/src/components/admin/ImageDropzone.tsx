"use client";

import { useEffect, useRef, useState } from "react";
import { FIELD_LABEL } from "@/lib/adminStyles";

export default function ImageDropzone({
  files,
  onChange,
  label = "Images",
  maxFiles,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  label?: string;
  /** When set to 1, a new selection replaces the current file instead of appending. */
  maxFiles?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    if (maxFiles === 1) {
      onChange([list[0]]);
      return;
    }
    onChange([...files, ...Array.from(list)]);
  }

  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className={FIELD_LABEL}>{label}</label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging ? "border-gold bg-ivory" : "border-gold-light/70 bg-ivory/40 hover:border-gold-light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 text-gold-dark"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M17 8l-5-5-5 5" />
          <path d="M12 3v12" />
        </svg>
        <p className="font-body text-sm text-charcoal">
          <span className="text-gold-dark underline underline-offset-2">Tap to upload</span> or drag
          and drop
        </p>
        <p className="font-body text-xs text-muted-foreground">PNG or JPG</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={maxFiles !== 1}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          cameraInputRef.current?.click();
        }}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-gold-light/60 bg-white px-4 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-ivory"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        Take Photo
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </button>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {previews.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded bg-ivory">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image doesn't support it */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/70 text-white transition-colors hover:bg-charcoal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
