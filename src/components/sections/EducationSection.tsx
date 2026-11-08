import React from 'react';
import { Award, BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_DATA } from '../../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="portfolio-section education-section"
      aria-labelledby="education-heading"
    >
      <div className="section-container">
        <div className="section-header">
          <span className="telemetry-badge">07 // ACADEMIC ENGINEERING FOUNDATION</span>
          <h2 id="education-heading" className="section-title">
            Artificial Intelligence &amp; Data Science Foundations.
          </h2>
        </div>

        <div className="education-monolith">
          <div className="education-monolith__primary">
            <div className="education-degree-badge">
              <GraduationCap size={18} />
              <span>BACHELOR OF TECHNOLOGY (B.TECH)</span>
            </div>

            <h3 className="education-degree-title">{EDUCATION_DATA.degree}</h3>
            <p className="education-institution">{EDUCATION_DATA.institution}</p>

            <div className="education-telemetry-row">
              <div className="education-telemetry-stat">
                <Calendar size={15} />
                <div>
                  <span className="stat-label">ACADEMIC TENURE</span>
                  <span className="stat-val">{EDUCATION_DATA.duration}</span>
                </div>
              </div>

              <div className="education-telemetry-stat">
                <Award size={15} />
                <div>
                  <span className="stat-label">CUMULATIVE GPA</span>
                  <span className="stat-val stat-val--highlight">
                    CGPA: {EDUCATION_DATA.cgpa}
                  </span>
                </div>
              </div>

              <div className="education-telemetry-stat">
                <MapPin size={15} />
                <div>
                  <span className="stat-label">CAMPUS</span>
                  <span className="stat-val">Nagpur, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>

          <div className="education-monolith__pillars">
            {EDUCATION_DATA.highlights.map((item, idx) => (
              <div key={item.title} className="education-pillar-card">
                <div className="education-pillar-card__top">
                  <span className="education-pillar-card__idx">0{idx + 1}</span>
                  <BookOpen size={15} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
