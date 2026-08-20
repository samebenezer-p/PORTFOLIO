import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://samebenezer.dev/#person",
        "name": "Sam Ebenezer P",
        "jobTitle": "Software Engineer & AI Enthusiast",
        "url": "https://samebenezer.dev",
        "sameAs": [
          "https://github.com/samebenezer-p",
          "https://linkedin.com/in/samebenezer"
        ],
        "knowsAbout": [
          "Java Development",
          "Python",
          "SQL",
          "Artificial Intelligence",
          "Internet of Things",
          "Full Stack Web Development",
          "Cloud Infrastructure"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Karunya Institute of Technology and Sciences"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://samebenezer.dev/#website",
        "url": "https://samebenezer.dev",
        "name": "SAM EBENEZER P // NEXUS AI OS",
        "description": "Futuristic AI Operating System portfolio of Sam Ebenezer P",
        "publisher": {
          "@id": "https://samebenezer.dev/#person"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
