import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { fadeUp, staggerContainer, scaleIn } from '@/utils/animations'
import { CERTIFICATIONS } from '@/utils/data'
import type { Certification } from '@/types'

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-surface text-xs font-medium border border-border text-secondary">
      {label}
    </span>
  )
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="md:col-span-4 group"
    >
      <article className="bg-surface/50 border border-border h-full rounded-xl overflow-hidden p-8 flex flex-col space-y-6 relative hover:border-accent/40 hover:shadow-lg transition-all duration-400">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20" aria-hidden="true">
            <span className="material-symbols-outlined text-accent">{cert.logo}</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Issued: {cert.issued}</div>
            {cert.expires && (
              <div className="text-[10px] font-bold text-secondary/70 uppercase tracking-widest mt-1">Expires: {cert.expires}</div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <span className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-accent">
            {cert.organization}
          </span>
          <h3 className="text-xl font-bold mt-2 text-primary leading-tight">{cert.title}</h3>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-medium text-secondary">ID:</span>
            <span className="text-xs font-mono text-primary/80 bg-background px-2 py-0.5 rounded border border-border">
              {cert.credentialId}
            </span>
          </div>
        </div>

        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {cert.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </div>
        )}

        <div className="pt-4 mt-auto border-t border-border/50">
          {cert.url ? (
            <a 
              href={cert.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 rounded-lg bg-background text-primary text-sm font-bold tracking-wide border border-border hover:bg-surface hover:text-accent hover:border-accent/30 transition-all flex items-center justify-center gap-2 group-hover:bg-accent group-hover:text-background"
            >
              <span>Show Credential</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          ) : (
            <button disabled className="w-full py-3 rounded-lg bg-background text-primary text-sm font-bold tracking-wide border border-border flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
              <span>Show Credential</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          )}
        </div>
      </article>
    </motion.div>
  )
}

export default function CertificationsSection() {
  const { ref, inView } = useScrollReveal()

  return (
    <section
      id="certifications"
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
      aria-labelledby="certifications-heading"
    >
      {/* Header */}
      <motion.header
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border mb-6">
           <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
           <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">Continuous Learning</span>
        </motion.div>

        <motion.h2 id="certifications-heading" variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight text-primary">
          Professional <br />
          <span className="text-secondary">Certifications.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="max-w-2xl text-secondary text-lg leading-relaxed">
          Validating expertise through industry-recognized accomplishments across Artificial Intelligence, Data Engineering, and Cloud Technologies.
        </motion.p>
      </motion.header>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {CERTIFICATIONS.map((cert) => (
          <CertificationCard key={cert.credentialId} cert={cert} />
        ))}
      </motion.div>
    </section>
  )
}
