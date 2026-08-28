import React, { useState, useEffect } from "react"

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Get the article element
      const article = document.querySelector(".blog-post")
      if (!article) return

      // Get scroll position
      const scrollTop = window.scrollY

      // Get article position and height
      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight

      // Calculate the viewable content height (subtract viewport height)
      const viewportHeight = window.innerHeight
      const scrollableHeight = articleHeight - viewportHeight

      // Calculate progress percentage
      const articleScrollTop = scrollTop - articleTop
      const scrollPercentage = (articleScrollTop / scrollableHeight) * 100

      // Clamp between 0 and 100
      const clampedProgress = Math.min(100, Math.max(0, scrollPercentage))

      setProgress(clampedProgress)
    }

    // Update on scroll
    window.addEventListener("scroll", updateProgress)
    // Update on resize
    window.addEventListener("resize", updateProgress)
    // Initial update
    updateProgress()

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#0066cc",
            width: `${progress}%`,
            transition: "width 0.1s ease-out",
          }}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "8px 12px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "500",
          zIndex: 1000,
          opacity: progress > 0 && progress < 100 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {Math.round(progress)}% read
      </div>
    </>
  )
}

export default ReadingProgress
