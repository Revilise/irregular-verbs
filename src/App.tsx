import {type FormEvent, useCallback, useMemo, useState} from 'react'
import {
  FORM_LABELS,
  IRREGULAR_VERBS,
  type IrregularVerb,
  type VerbFormIndex,
  getForm,
} from './data/verbs'
import {
  type ExerciseKind,
  buildChoiceOptions,
  formsMatch,
  pickRandomExerciseKind,
  pickRandomFormIndex,
  pickPromptShown,
  pickRandomVerb,
} from './lib/quiz'
import './App.css'

type RoundState =
  | { status: 'idle' }
  | { status: 'answered'; correct: boolean; reveal: string }

interface Round {
  kind: ExerciseKind
  verb: IrregularVerb
  targetForm: VerbFormIndex
  /** Form shown in the prompt (V2/V3 when asking for V1; V1 when asking for V2/V3). */
  promptShown: VerbFormIndex
  options?: string[]
}

function createRound(): Round {
  const verb = pickRandomVerb()
  const kind = pickRandomExerciseKind()
  if (kind === 'phonemic') {
    return { kind, verb, targetForm: 0, promptShown: 0 }
  }
  const targetForm = pickRandomFormIndex()
  const promptShown = pickPromptShown(targetForm)
  const options =
    kind === 'choice' ? buildChoiceOptions(verb, targetForm) : undefined
  return { kind, verb, targetForm, promptShown, options }
}

export default function App() {
  const [round, setRound] = useState<Round>(() => createRound())
  const [roundState, setRoundState] = useState<RoundState>({ status: 'idle' })
  const [score, setScore] = useState({ right: 0, total: 0 })
  const [textInput, setTextInput] = useState('')

  const correctAnswer = useMemo(
    () => getForm(round.verb, round.targetForm),
    [round],
  )

  const nextRound = useCallback(() => {
    setRound(createRound())
    setRoundState({ status: 'idle' })
    setTextInput('')
  }, [])

  const recordResult = useCallback((correct: boolean, reveal: string) => {
    setRoundState({ status: 'answered', correct, reveal })
    setScore((s) => ({
      right: s.right + (correct ? 1 : 0),
      total: s.total + 1,
    }))
  }, [])

  const onChooseOption = (option: string) => {
    if (roundState.status !== 'idle' || round.kind !== 'choice') return
    const ok = formsMatch(correctAnswer, option)
    recordResult(ok, correctAnswer)
  }

  const onSubmitWritten = (e: FormEvent) => {
    e.preventDefault()
    if (roundState.status !== 'idle' || round.kind === 'choice') return
    const ok = formsMatch(correctAnswer, textInput)
    recordResult(ok, correctAnswer)
  }

  const title =
    round.kind === 'phonemic'
      ? 'Guess the verb (infinitive)'
      : round.kind === 'choice'
        ? 'Choose the correct form'
        : 'Type the correct form'

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Irregular verbs</h1>
        <p className="subtitle">
          Random drills: multiple choice, typing, and phonemic transcription
        </p>
        <div className="stats" aria-live="polite">
          <span className="stats__score">
            Score: {score.right}/{score.total}
          </span>
          {score.total > 0 && (
            <span className="stats__pct">
              {Math.round((100 * score.right) / score.total)}% correct
            </span>
          )}
        </div>
      </header>

      <main className="card">
        <p className="exercise-type">{title}</p>

        {round.kind === 'phonemic' && (
          <div className="prompt-block">
            <p className="prompt-label">Phonemic (BrE IPA)</p>
            <p className="ipa" lang="en">
              {round.verb.ipa}
            </p>
            <p className="hint">Enter the infinitive without &quot;to&quot;.</p>
          </div>
        )}

        {round.kind === 'choice' && (
          <div className="prompt-block">
            {round.targetForm === 0 ? (
              <p className="prompt-main">
                Pick the correct <strong>{FORM_LABELS[0]}</strong>. Clue —{' '}
                {FORM_LABELS[round.promptShown]}:{' '}
                <em>{getForm(round.verb, round.promptShown)}</em>
              </p>
            ) : (
              <p className="prompt-main">
                Pick the correct <strong>{FORM_LABELS[round.targetForm]}</strong>{' '}
                for <em>{round.verb.v1}</em>.
              </p>
            )}
          </div>
        )}

        {round.kind === 'write' && (
          <div className="prompt-block">
            {round.targetForm === 0 ? (
              <p className="prompt-main">
                Write the <strong>{FORM_LABELS[0]}</strong> when the{' '}
                {FORM_LABELS[round.promptShown]} is{' '}
                <em>{getForm(round.verb, round.promptShown)}</em>.
              </p>
            ) : (
              <p className="prompt-main">
                Write the <strong>{FORM_LABELS[round.targetForm]}</strong> of{' '}
                <em>{round.verb.v1}</em>.
              </p>
            )}
          </div>
        )}

        {round.kind === 'choice' && round.options && (
          <div className="choices" role="group" aria-label="Answer options">
            {round.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="choice-btn"
                disabled={roundState.status !== 'idle'}
                onClick={() => onChooseOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {(round.kind === 'write' || round.kind === 'phonemic') && (
          <form className="write-form" onSubmit={onSubmitWritten}>
            <label className="sr-only" htmlFor="answer-input">
              Your answer
            </label>
            <input
              id="answer-input"
              className="text-input"
              autoComplete="off"
              spellCheck={false}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={roundState.status !== 'idle'}
              placeholder="Type the verb form…"
            />
            <button
              type="submit"
              className="primary-btn"
              disabled={roundState.status !== 'idle' || !textInput.trim()}
            >
              Check
            </button>
          </form>
        )}

        {roundState.status === 'answered' && (
          <div
            className={`feedback ${roundState.correct ? 'feedback--ok' : 'feedback--bad'}`}
            role="status"
          >
            <p className="feedback__title">
              {roundState.correct ? 'Correct!' : 'Not quite.'}
            </p>
            {!roundState.correct && (
              <p className="feedback__answer">
                Answer: <strong>{roundState.reveal}</strong>
              </p>
            )}
            <button type="button" className="primary-btn" onClick={nextRound}>
              Next exercise
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          {IRREGULAR_VERBS.length} verbs in the deck · IPA in British English
        </p>
      </footer>
    </div>
  )
}
