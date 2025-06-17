import React, { useRef } from 'react';

export default function FileUploader({ onChange, accept, multiple = false, className = '' }) {
  const inputRef = useRef();
  const handleDrop = e => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      onChange && onChange(e.dataTransfer.files);
    }
  };
  return (
    <div
      className={`border-2 border-dashed border-primary rounded-xl p-6 text-center cursor-pointer bg-glass dark:bg-glassDark hover:bg-primary/10 dark:hover:bg-primary/20 transition-all ${className}`}
      onClick={() => inputRef.current.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        onChange={e => onChange && onChange(e.target.files)}
      />
      <div className="text-lg font-semibold mb-2">Drag & drop or click to upload</div>
      <div className="text-xs text-gray-500">{accept || 'Any file type'}</div>
    </div>
  );
}
