import { motion } from 'framer-motion';
import './Guidelines.css';

export default function Guidelines({ onClose }) {
  return (
    <motion.div
      className="guidelines-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="guidelines-modal"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="guidelines-scroll">
          <h2>Santa Claude is coming to town 🎅</h2>

          <section>
            <h3>1. Daily Submission</h3>
            <ul>
              <li>All submissions must be submitted via the <a href="https://tally.so/r/Xxr2gz" target="_blank" rel="noopener noreferrer">Tally Form</a> by 11:59 PM (local time) each day.</li>
              <li>Each daily submission must include:
                <ul>
                  <li>A post in the <strong>#building</strong> channel on Slack (required)</li>
                  <li>Optional but highly recommended, share on social media:
                    <ul>
                      <li>X (Twitter)</li>
                      <li>LinkedIn</li>
                      <li>Personal website / portfolio</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>A live link to your app, website, or project demo</li>
              <li>A brief project description (at least a sentence)</li>
            </ul>
          </section>

          <section>
            <h3>2. Daily Prompts</h3>
            <ul>
              <li>Each day's prompt will be released at 12:01 AM on this page.</li>
              <li>Prompts act as themes, not strict requirements — interpretation is up to you.</li>
            </ul>
          </section>

          <section>
            <h3>3. Creative Freedom</h3>
            <ul>
              <li>You may use any programming language, framework, or tool.</li>
              <li>Projects can be new builds or extensions of previous days' work, as long as:
                <ul>
                  <li>You ship something new each day</li>
                  <li>The update clearly relates to that day's theme</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3>4. Judging + Prizes</h3>
            <ul>
              <li>All submissions will be reviewed and rated daily.</li>
              <li>To be eligible for the final prize, participants must:
                <ul>
                  <li>Ship a project every day of the challenge</li>
                  <li>Submit the Tally Form on time each day</li>
                </ul>
              </li>
              <li>Final winners will be selected based on:
                <ul>
                  <li>Creativity</li>
                  <li>Functionality / execution</li>
                  <li>Alignment with the day's theme</li>
                  <li>Consistency across the challenge</li>
                </ul>
              </li>
            </ul>
          </section>

          <div className="guidelines-footer">
            <p>This challenge is about <strong>building, creativity, and community</strong> — not perfection.</p>
            <p>Ship something small. Have fun. Support each other.</p>
            <p className="closing">Hope you all enjoy — and happy building! 🎄🚀</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        className="guidelines-back-button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        ← Back
      </motion.button>
    </motion.div>
  );
}
