export function AnimatedGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#1e1b4b] to-[#0c4a6e]">
      {/* Gradient cloud blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-400 to-fuchsia-600 rounded-full blur-[120px] opacity-40 animate-blob-1" />
      
      <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[120px] opacity-50 animate-blob-2" />
      
      <div className="absolute bottom-0 left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full blur-[120px] opacity-45 animate-blob-3" />
      
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-[100px] opacity-50 animate-blob-4" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-br from-violet-400 to-pink-500 rounded-full blur-[130px] opacity-40 animate-blob-5" />
      
      <div className="absolute top-10 right-1/3 w-[550px] h-[550px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-[110px] opacity-45 animate-blob-6" />
      
      <div className="absolute bottom-10 right-10 w-[650px] h-[650px] bg-gradient-to-br from-fuchsia-400 to-purple-600 rounded-full blur-[100px] opacity-40 animate-blob-7" />
      
      {/* Sparkling stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}