const CodeEditor = ({ value, readOnly = false, language = 'javascript' }) => {
  return (
    <div className="w-full h-full">
      <textarea
        value={value}
        readOnly={readOnly}
        className="w-full h-full font-mono text-sm bg-dark-800 text-dark-100 p-6 rounded-lg border border-dark-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none outline-none"
        style={{ 
          fontFamily: 'JetBrains Mono, Fira Code, Monaco, Consolas, monospace',
          lineHeight: '1.6'
        }}
      />
    </div>
  )
}

export default CodeEditor
